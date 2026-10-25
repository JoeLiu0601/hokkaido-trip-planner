(() => {
  "use strict";
  const days = [
    ["初抵旭川", "旭川", "city"],
    ["富良野到札幌", "富良野・札幌", "forest"],
    ["小樽日", "小樽", "canal"],
    ["登別地獄谷", "登別・室蘭", "onsen"],
    ["札幌慢慢走", "札幌", "mountain"],
    ["札幌好食光", "札幌", "city"],
    ["向洞爺湖出發", "洞爺湖", "lake"],
    ["百萬夜景", "函館", "fort"],
    ["港町跨年散步", "函館", "harbor"],
    ["把冬天帶回家", "函館", "airport"]
  ].map(([title, place, theme]) => ({ title, place, theme }));
  const defs = `<defs>
    <g id="winter-icon-pine" stroke="#88a69b" stroke-width="1.4" stroke-linejoin="round"><path d="M0 4v44"/><path d="M0 0-13 22h7l-11 17h34L6 22h7Z" fill="#c9ded2"/><path d="M0 0-8 14h16Z" fill="#fffdf8"/></g>
    <g id="winter-icon-city" stroke="#7d9aa2" stroke-width="1.5" stroke-linejoin="round"><path d="M-39 40V3h22v37m3 0V-16h33v56m4 0V-2h23v42" fill="#e4e9df"/><path d="M-19-16 2-28l20 12Z" fill="#b8d4dd"/><path d="M-9-8H12V6H-9Z" fill="#fffdf7"/><circle cx="2" cy="-1" r="5" fill="#ead7a4"/><path d="M2-4v4l3 2M-32 12h9m-9 10h9m18-7h13m-13 11h13m20-13h9m-9 11h9"/><path d="M-48 42h102" stroke="#fffdf8" stroke-width="5"/></g>
    <g id="winter-icon-canal" stroke="#89999b" stroke-width="1.4" stroke-linejoin="round"><path d="M-60 6h42v31h-42zm46 0h42v31h-42zm46 0h42v31H32Z" fill="#dfbba7"/><path d="m-64 6 25-19L-14 6M-18 6 7-13 32 6M28 6l25-19L78 6" fill="#fffaf0"/><path d="M-45 17h13v17h-13zm46 0h13v17H1zm46 0h13v17H47Z" fill="#a9c9d3"/><path d="M-73 46q70-22 151 6" fill="none" stroke="#b4dce5" stroke-width="17"/><path d="M-72 46q70-22 151 6" fill="none" stroke="#f6fcfc" stroke-dasharray="7 13"/><path d="M-69 34V8m0 8h-9"/><circle cx="-78" cy="13" r="4" fill="#f3d68b"/></g>
    <g id="winter-icon-onsen" stroke="#a28e7d" stroke-width="1.5" stroke-linecap="round"><path d="M-48 21q9-33 31-24t30-9q23-10 40 36" fill="#d8d4bf"/><ellipse cy="27" rx="48" ry="15" fill="#c4e0df"/><path d="M-36 39q38 16 75-1" fill="none"/><path d="M-23 7q-10-11 1-20t0-20M0 2q-10-11 1-20t0-20M23 7q-10-11 1-20t0-20" fill="none" stroke="#99b6b7" opacity=".7"/></g>
    <g id="winter-icon-mountain" stroke="#8da5aa" stroke-width="1.4"><path d="m-65 43 60-75 70 75Z" fill="#ccdee0"/><path d="m-5-32-22 27 18-6L6 2l14-6Z" fill="#fffdf8"/><path d="M-53-20 59-8"/><path d="M17-13v15"/><rect x="8" y="0" width="24" height="20" rx="4" fill="#e4bd86"/><path d="M13 4h14v8H13Z" fill="#e6f3f4"/></g>
    <g id="winter-icon-lake" stroke="#88a7ac" stroke-width="1.3"><path d="m-56 5 46-40 41 40Z" fill="#cbdde0"/><path d="m-10-35-13 12 13-3 13 4Z" fill="#fffdf8"/><ellipse cx="2" cy="23" rx="75" ry="23" fill="#c3e1e8"/><ellipse cx="-9" cy="15" rx="13" ry="5" fill="#c6d5b8"/><path d="M-53 25h28m15 10h31m16-14h21" stroke="#f7ffff"/><path d="M57 11v-31h20v32" fill="#ede5d1"/><path d="m53-20 14-9 14 9Z" fill="#bfced0"/></g>
    <g id="winter-icon-fort" stroke="#88a7a0" stroke-width="1.5"><path d="m0-37 13 26 30-2-20 23 10 29L5 27-20 44l3-31-26-17 29-8Z" fill="#c6ded3"/><path d="m0-26 10 23 23-2-15 17 7 20L5 19-13 31l2-22-21-12 23-4Z" fill="#f7f7e8"/><path d="M57 39 64-30l8 69M57-10h20M54 39h24" fill="none"/><path d="M56-15h21v7H56Z" fill="#b8d8df"/></g>
    <g id="winter-icon-harbor" stroke="#8c9ca4" stroke-width="1.4" stroke-linejoin="round"><path d="m-78 39 39-68 48 68Z" fill="#c5d9de"/><path d="M-48 43h110" stroke="#b9dde7" stroke-width="12"/><path d="M-3 30V-4h29v34m10 0V-17h31v47" fill="#f4e5cf"/><path d="M-8-4 12-17 31-4m0-13 20-16 21 16" fill="#d9ad9b"/><path d="M5 8h12v10H5zm40-14h13V8H45Z" fill="#b6d4df"/><path d="M-56 29h44m-30-13h21m-13-12h9" stroke="#f2d99a" stroke-width="3"/></g>
    <g id="winter-icon-airport" stroke="#819aa5" stroke-width="1.5" stroke-linejoin="round"><path d="M-49 12h80v30h-80Z" fill="#f9f4e6"/><path d="M-42 19h18v12h-18zm27 0H3v12h-18zm27 0h12v12H12Z" fill="#b6d5de"/><path d="M32 39v-57h12v57M28-22h20v9H28Z" fill="#dae8e8"/><path d="m-46-13 32-8 15-18 6 1-7 14 23-5 6 6-32 11-9 17-5 1 4-15-22 3Z" fill="#fffdf9"/></g>
    <g id="winter-icon-torii" stroke="#aa7971" stroke-width="1.7" stroke-linecap="round"><path d="M-25-20v63M25-20v63" stroke-width="7"/><path d="M-35-20q35 8 70 0M-32-8h64M0-17v10" stroke-width="6"/><path d="M-20 8h40" stroke-width="3"/><path d="M-38-24q38 7 76 0" stroke="#fffaf0" stroke-width="4"/></g>
    <g id="winter-icon-shop" stroke="#8e9e98" stroke-width="1.3"><path d="M-27 0h54v40h-54Z" fill="#f4ead3"/><path d="m-31 0 9-17h44l9 17Z" fill="#d4b6a1"/><path d="M-25 0h10v10h-10zm20 0H5v10H-5zm20 0h10v10H15Z" fill="#e9cf97"/><path d="M-19 19h15v13h-15zM7 18h14v22H7Z" fill="#bed8db"/></g>
    <g id="winter-icon-bus" stroke="#819ca4" stroke-width="1.5"><rect x="-31" y="-10" width="62" height="43" rx="7" fill="#e8d69f"/><path d="M-24-3h14v17h-14zm21 0h14v17H-3zm21 0h6v25h-6Z" fill="#d9eef1"/><circle cx="-18" cy="34" r="5" fill="#809398"/><circle cx="19" cy="34" r="5" fill="#809398"/></g>
    </defs>`;
  function icon(theme, x, y, scale = 1) {
    return `<use href="#winter-icon-${theme}" transform="translate(${x} ${y}) scale(${scale})" aria-hidden="true"/>`;
  }
  function background(day, height) {
    const scene = days[day - 1];
    const theme = scene.theme === "forest" ? "mountain" : scene.theme;
    let snow = "";
    for (let y = 170; y < height; y += 155) snow += `<path d="M0 ${y}q90-27 190 0t190-5" fill="none" stroke="#fffdf8" stroke-width="28" opacity=".8"/>${icon("pine", y % 310 ? 20 : 353, y + 17, .48)}`;
    const terrain = {
      canal: `<path d="M12 130C120 185 180 130 243 219S200 ${height - 110} 390 ${height - 68}" fill="none" stroke="#c1dfe6" stroke-width="36"/><path d="M12 130C120 185 180 130 243 219S200 ${height - 110} 390 ${height - 68}" fill="none" stroke="#edf9fa" stroke-width="2" stroke-dasharray="9 16"/>`,
      lake: `<ellipse cx="190" cy="${height * .63}" rx="173" ry="${height * .23}" fill="#d1e8ec"/><path d="M56 ${height * .64}h52m60 39h64m30-64h50" stroke="#f5ffff" stroke-width="3"/>`,
      harbor: `<path d="M0 ${height * .48}Q120 ${height * .7} 199 ${height * .67}T380 ${height * .8}v${height}H0Z" fill="#cce3e9"/>`,
      fort: `<g opacity=".28">${icon("fort",190,height * .6,2.3)}</g>`,
      onsen: `<path d="M0 205 44 160 85 208m225 90 37-43 33 40" fill="#d6decf"/><path d="M22 275q-17-17 0-34t0-34m337 255q-17-17 0-34t0-34" fill="none" stroke="#adc8c6" stroke-width="4"/>`,
      forest: `${icon("pine",37,250,.9)}${icon("pine",346,320,.9)}`,
      city: `<path d="M0 232h25v77H0m355 90v-80h25v80M0 ${height - 130}h23v80H0" fill="#d6e4df"/>`
    }[scene.theme] || "";
    return `${defs}<rect width="380" height="${height}" fill="#eef3ee"/><path d="M0 0h380v115Q270 87 190 112T0 110Z" fill="#e1edf0"/>
      <path d="m0 96 58-60 44 48 54-71 62 79 58-55 104 63v24H0Z" fill="#d3e2e3"/>
      <path d="m156 13-25 33 24-8 19 6Z" fill="#fffdf8"/>
      <path d="M20 35q-4-12 10-12 6-12 18-4 12-4 16 8 12-1 13 9Z" fill="#fffdf7"/>
      <circle cx="324" cy="26" r="11" fill="#f4dd9b"/>
      ${snow}${terrain}${icon(theme, 210, 58, .85)}${icon("pine", 41, 60, .6)}${icon("pine", 345, 73, .46)}
      <text x="15" y="${height - 14}" fill="#536a72" font-family="sans-serif" font-size="11" letter-spacing="2">HOKKAIDO · WINTER WALK</text>`;
  }
  function spotIcon(spot) {
    if (/巴士/.test(spot.type)) return "bus";
    if (/機場/.test(spot.name)) return "airport";
    if (/神社|神宮/.test(spot.name)) return "torii";
    if (/五稜郭/.test(spot.name)) return "fort";
    if (/運河/.test(spot.name)) return "canal";
    if (/地獄|溫泉/.test(spot.name)) return "onsen";
    if (/洞爺湖/.test(spot.name)) return "lake";
    if (/藻岩|函館山|展望/.test(spot.name)) return "mountain";
    if (/八幡坂|元町|倉庫/.test(spot.name)) return "harbor";
    if (/公園|雪原/.test(spot.name)) return "pine";
    return /入住|飯店/.test(spot.type) ? "city" : "shop";
  }
  window.HOKKAIDO_SCENES = { days, defs, icon, background, spotIcon };
})();
