param(
    [Parameter(Mandatory)][string]$InputPath,
    [string]$OutputPath,
    [string[]]$BackgroundSeeds = @(),
    [int]$WhiteThreshold = 240,
    [int]$NeutralTolerance = 18,
    [int]$Padding = 3,
    [int]$MaxEdge = 512,
    [switch]$Analyze
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
if (-not ('TripWhiteMatte' -as [type])) {
    Add-Type -TypeDefinition @'
using System;
using System.Collections.Generic;

public sealed class MatteRegion {
    public int Id, Pixels, Left, Top, Right, Bottom, SeedX, SeedY;
    public bool Border;
}

public sealed class MatteResult {
    public byte[] Pixels;
    public int Width, Height, Left, Top, Removed, Transparent;
    public List<MatteRegion> Regions;
}

public static class TripWhiteMatte {
    public static MatteResult Process(byte[] source, int width, int height, int threshold, int tolerance, int[] seeds, int padding) {
        int count = width * height;
        var candidate = new bool[count];
        var labels = new int[count];
        for (int i = 0; i < count; i++) {
            int offset = i * 4;
            int min = Math.Min(source[offset], Math.Min(source[offset + 1], source[offset + 2]));
            int max = Math.Max(source[offset], Math.Max(source[offset + 1], source[offset + 2]));
            candidate[i] = source[offset + 3] == 0 || (min >= threshold && max - min <= tolerance);
        }
        var regions = new List<MatteRegion>();
        var queue = new int[count];
        for (int start = 0; start < count; start++) {
            if (!candidate[start] || labels[start] != 0) continue;
            var region = new MatteRegion { Id = regions.Count + 1, Left = width, Top = height, Right = -1, Bottom = -1, SeedX = start % width, SeedY = start / width };
            int head = 0, tail = 0;
            queue[tail++] = start;
            labels[start] = region.Id;
            while (head < tail) {
                int current = queue[head++], x = current % width, y = current / width;
                region.Pixels++;
                region.Left = Math.Min(region.Left, x); region.Right = Math.Max(region.Right, x);
                region.Top = Math.Min(region.Top, y); region.Bottom = Math.Max(region.Bottom, y);
                if (x == 0 || y == 0 || x == width - 1 || y == height - 1) region.Border = true;
                if (x > 0) Enqueue(current - 1, candidate, labels, region.Id, queue, ref tail);
                if (x + 1 < width) Enqueue(current + 1, candidate, labels, region.Id, queue, ref tail);
                if (y > 0) Enqueue(current - width, candidate, labels, region.Id, queue, ref tail);
                if (y + 1 < height) Enqueue(current + width, candidate, labels, region.Id, queue, ref tail);
            }
            regions.Add(region);
        }
        var remove = new bool[regions.Count + 1];
        foreach (var region in regions) if (region.Border) remove[region.Id] = true;
        foreach (int seed in seeds) {
            if (seed < 0 || seed >= count || labels[seed] == 0) throw new ArgumentException("An extra seed is not on a near-white background pixel.");
            remove[labels[seed]] = true;
        }
        var pixels = (byte[])source.Clone();
        int removed = 0, left = width, top = height, right = -1, bottom = -1;
        for (int i = 0; i < count; i++) {
            if (remove[labels[i]]) { pixels[i * 4 + 3] = 0; removed++; }
            if (pixels[i * 4 + 3] == 0) continue;
            int x = i % width, y = i / width;
            left = Math.Min(left, x); right = Math.Max(right, x);
            top = Math.Min(top, y); bottom = Math.Max(bottom, y);
        }
        if (right < left) throw new InvalidOperationException("No foreground remains.");
        left = Math.Max(0, left - padding); right = Math.Min(width - 1, right + padding);
        top = Math.Max(0, top - padding); bottom = Math.Min(height - 1, bottom + padding);
        int croppedWidth = right - left + 1, croppedHeight = bottom - top + 1, transparent = 0;
        var cropped = new byte[croppedWidth * croppedHeight * 4];
        for (int y = 0; y < croppedHeight; y++) {
            Array.Copy(pixels, ((y + top) * width + left) * 4, cropped, y * croppedWidth * 4, croppedWidth * 4);
            for (int x = 0; x < croppedWidth; x++) if (cropped[(y * croppedWidth + x) * 4 + 3] == 0) transparent++;
        }
        return new MatteResult { Pixels = cropped, Width = croppedWidth, Height = croppedHeight, Left = left, Top = top, Removed = removed, Transparent = transparent, Regions = regions };
    }

    private static void Enqueue(int index, bool[] candidate, int[] labels, int label, int[] queue, ref int tail) {
        if (!candidate[index] || labels[index] != 0) return;
        labels[index] = label; queue[tail++] = index;
    }
}
'@
}

$sourcePath = (Resolve-Path -LiteralPath $InputPath).Path
$sourceImage = [System.Drawing.Bitmap]::FromFile($sourcePath)
$image = [System.Drawing.Bitmap]::new($sourceImage.Width, $sourceImage.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($image)
$graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
$graphics.DrawImage($sourceImage, [System.Drawing.Rectangle]::new(0,0,$sourceImage.Width,$sourceImage.Height), 0,0,$sourceImage.Width,$sourceImage.Height,[System.Drawing.GraphicsUnit]::Pixel)
$graphics.Dispose()
$sourceImage.Dispose()

try {
    $bounds = [System.Drawing.Rectangle]::new(0, 0, $image.Width, $image.Height)
    $data = $image.LockBits($bounds, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    try {
        $sourceBytes = [byte[]]::new($image.Width * $image.Height * 4)
        for ($row = 0; $row -lt $image.Height; $row++) {
            [System.Runtime.InteropServices.Marshal]::Copy([IntPtr]::Add($data.Scan0, $row * $data.Stride), $sourceBytes, $row * $image.Width * 4, $image.Width * 4)
        }
    } finally { $image.UnlockBits($data) }

    $seedIndexes = [System.Collections.Generic.List[int]]::new()
    foreach ($seed in $BackgroundSeeds) {
        $coordinates = $seed.Split(',')
        if ($coordinates.Length -ne 2) { throw 'Seeds use x,y coordinates.' }
        $seedX = [int]$coordinates[0]; $seedY = [int]$coordinates[1]
        if ($seedX -lt 0 -or $seedY -lt 0 -or $seedX -ge $image.Width -or $seedY -ge $image.Height) { throw 'Seed outside source image.' }
        $seedIndexes.Add($seedY * $image.Width + $seedX)
    }
    $result = [TripWhiteMatte]::Process($sourceBytes, $image.Width, $image.Height, $WhiteThreshold, $NeutralTolerance, $seedIndexes.ToArray(), $Padding)
    if ($Analyze) {
        $result.Regions | Sort-Object Pixels -Descending | Select-Object -First 30 | ConvertTo-Json -Depth 3
        return
    }
    if (-not $OutputPath) { throw 'OutputPath is required when writing a PNG.' }
    $destinationPath = [System.IO.Path]::GetFullPath($OutputPath)
    if ($destinationPath -eq $sourcePath) { throw 'Choose a new PNG path to preserve the original.' }
    if ([System.IO.Path]::GetExtension($destinationPath) -ne '.png') { throw 'Output must be a PNG.' }
    $cropped = [System.Drawing.Bitmap]::new($result.Width, $result.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    try {
        $cropBounds = [System.Drawing.Rectangle]::new(0,0,$cropped.Width,$cropped.Height)
        $cropData = $cropped.LockBits($cropBounds,[System.Drawing.Imaging.ImageLockMode]::WriteOnly,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        try {
            for ($row = 0; $row -lt $cropped.Height; $row++) {
                [System.Runtime.InteropServices.Marshal]::Copy($result.Pixels, $row * $cropped.Width * 4, [IntPtr]::Add($cropData.Scan0, $row * $cropData.Stride), $cropped.Width * 4)
            }
        } finally { $cropped.UnlockBits($cropData) }
        $scale = [Math]::Min(1.0, $MaxEdge / [double][Math]::Max($cropped.Width, $cropped.Height))
        $outputWidth = [Math]::Max(1, [int][Math]::Round($cropped.Width * $scale))
        $outputHeight = [Math]::Max(1, [int][Math]::Round($cropped.Height * $scale))
        $output = [System.Drawing.Bitmap]::new($outputWidth,$outputHeight,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        try {
            $outputGraphics = [System.Drawing.Graphics]::FromImage($output)
            try {
                $outputGraphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
                $outputGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $outputGraphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
                $outputGraphics.DrawImage($cropped,[System.Drawing.Rectangle]::new(0,0,$outputWidth,$outputHeight),0,0,$cropped.Width,$cropped.Height,[System.Drawing.GraphicsUnit]::Pixel)
            } finally { $outputGraphics.Dispose() }
            $output.Save($destinationPath,[System.Drawing.Imaging.ImageFormat]::Png)
        } finally { $output.Dispose() }
        [pscustomobject]@{ Input=$InputPath; Output=$OutputPath; SourceWidth=$image.Width; SourceHeight=$image.Height; CropLeft=$result.Left; CropTop=$result.Top; CropWidth=$result.Width; CropHeight=$result.Height; OutputWidth=$outputWidth; OutputHeight=$outputHeight; RemovedPixels=$result.Removed; TransparentPixelsBeforeResize=$result.Transparent } | ConvertTo-Json
    } finally { $cropped.Dispose() }
} finally { $image.Dispose() }
