(() => {
  "use strict";

  const host = document.getElementById("journey-view");
  const workspace = document.querySelector(".workspace");
  const switchButtons = document.querySelectorAll("[data-planner-view]");
  if (!host || !workspace) return;

  const mascot = "assets/mimikyu-travel.png";
  const companions = [
    { id: "mimikyu", name: "謎擬Ｑ", src: mascot },
    { id: "piplup", name: "波加曼", src: "assets/piplup-travel-cutout.png" },
    { id: "mew", name: "夢幻", src: "assets/mew-travel-cutout.png" }
  ];
  const activeCompanions = new Set(companions.map((pal) => pal.id));
  const winterStops = {
    "new-chitose-airport": { x: 64, y: 320, label: "機場抵達", lx: 12, ly: 350, width: 104 },
    "nippon-rentacar-new-chitose": { x: 146, y: 320, label: "接駁取車", lx: 122, ly: 350, width: 106 },
    "premier-cabin-asahikawa": { x: 300, y: 88, label: "旭川入住", lx: 244, ly: 113, width: 116 },
    "aeon-mall-asahikawa-ekimae": { x: 310, y: 220, label: "AEON 站前", lx: 258, ly: 246, width: 112 },
    "asahikawa-heiwa-dori": { x: 170, y: 186, label: "平和通晚餐", lx: 112, ly: 212, width: 116 }
  };
  const speeds = [1, 2, 4];
  let speedIndex = 0;
  let previewPosition = null;
  let playback = null;
  let playbackContext = "";
  let playing = false;
  let animationFrame = null;
  let previousFrameTime = null;
  let focusedCardKey = "";
  const viewKey = "hokkaido-planner-view";
  const progressCache = new Map();
  const validModes = ["overview", "edit", "travel"];
  const requestedView = new URLSearchParams(window.location.search).get("view");
  const savedView = readLocalStorage(viewKey);
  let mode = validModes.includes(requestedView) ? requestedView : validModes.includes(savedView) ? savedView : "edit";
  let feedback = "";
  let progressContext = "";

  function progressKey() {
    return `hokkaido-journey-20261223-${state.syncCode || "local"}`;
  }

  function progress() {
    const key = progressKey();
    if (progressCache.has(key)) return progressCache.get(key);
    let saved = {};
    try {
      const raw = JSON.parse(readLocalStorage(key) || "{}");
      if (raw && typeof raw === "object" && !Array.isArray(raw)) {
        for (let day = 1; day <= 10; day += 1) {
          saved[day] = {};
          for (const [id, status] of Object.entries(raw[day] || {})) {
            if (spotById(id) && ["done", "skipped"].includes(status)) saved[day][id] = status;
          }
        }
      }
    } catch {
      saved = {};
    }
    progressCache.set(key, saved);
    return saved;
  }

  function statusFor(id) {
    return progress()[state.selectedDay]?.[id] || "pending";
  }

  function isOptional(id) {
    return state.selectedDay === 1 && dayOneTimingDraft[id]?.optional === true;
  }

  function durationText(spot) {
    const hours = /^(\d+(?:\.\d+)?)h$/.exec(spot.time);
    if (!hours) return spot.time || "時間待估";
    const minutes = Math.round(Number(hours[1]) * 60);
    return minutes ? `停留約 ${minutes} 分鐘` : "抵達點";
  }

  function timingText(spot) {
    const timing = getTimingDraftForStop(state.selectedDay, spot.id);
    return timing ? `${timing.time}${timing.optional ? "" : " · 預估"}` : durationText(spot);
  }

  function summaryText(spot) {
    const summaries = {
      "new-chitose-airport": "BR166 抵達後，先入境、領行李，再到租車櫃台報到。",
      "nippon-rentacar-new-chitose": "先在機場櫃台報到，再搭接駁車到營業所取車。",
      "premier-cabin-asahikawa": "13:15 左右出發往旭川，途中午餐、休息；抵達後先入住放行李。",
      "aeon-mall-asahikawa-ekimae": "步行到站前 AEON，先補雪靴、防滑鞋與保暖配件。",
      "asahikawa-heiwa-dori": "在站前商店街散步、找晚餐，吃完回飯店休息。"
    };
    if (getTimingDraftForStop(state.selectedDay, spot.id) && summaries[spot.id]) return summaries[spot.id];
    return spot.best || spot.desc;
  }

  function navigationFor(id) {
    const index = (state.plan[state.selectedDay] || []).indexOf(id);
    const nav = getStopNavigation(state.selectedDay, index, spotById(id));
    return { ...nav, label: nav.label === "地圖" ? "開啟地圖" : nav.label };
  }

  function iconFor(spot) {
    if (/取車|還車/.test(spot.type)) return "🚙";
    if (/巴士/.test(spot.type)) return "🚌";
    if (/機場/.test(spot.name)) return "✈️";
    if (/飯店|入住/.test(spot.type)) return "🏨";
    if (/神社/.test(spot.type)) return "⛩️";
    if (/購物|商場|商店|百貨/.test(spot.type)) return "🛍️";
    if (/餐|美食|食堂|燒肉|拉麵|甜點/.test(spot.type)) return "🍽️";
    if (/纜車|山|展望/.test(spot.type)) return "🏔️";
    if (/公園|湖/.test(spot.type)) return "🌲";
    return "📍";
  }

  function selectedCompanions() {
    return companions.filter((pal) => activeCompanions.has(pal.id));
  }

  function companionImagesHtml() {
    return `<img class="journey-pal-mimikyu" src="${mascot}" width="90" height="100" alt="謎擬Ｑ" />`;
  }

  function companionGroupTransform(x, y) {
    const width = playback?.winter ? 32 : 44;
    const count = selectedCompanions().length;
    const groupWidth = count * width + (count - 1) * 6;
    const left = Math.max(8, Math.min((playback?.winter ? 380 : 360) - groupWidth - 8, x - groupWidth / 2));
    return `translate(${left} ${y - 78})`;
  }

  function mapCompanionsHtml(overview = false) {
    const pals = selectedCompanions();
    if (overview) return pals.map((pal) => {
        const position = { mimikyu: [14, 9], piplup: [194, 9], mew: [100, 396] }[pal.id];
        return `<g class="journey-pals-marker" transform="translate(${position[0]} ${position[1]})" aria-hidden="true"><image class="journey-pal-${pal.id}" href="${pal.src}" width="44" height="48" preserveAspectRatio="xMidYMid meet" /></g>`;
    }).join("");
    const point = activeMapPoint(0);
    const width = playback?.winter ? 32 : 44;
    const height = playback?.winter ? 40 : 48;
    return `<g data-pals-marker class="journey-pals-marker" transform="${companionGroupTransform(point.x, point.y)}" aria-hidden="true">${pals.map((pal, index) => `<g data-map-companion="${pal.id}" transform="translate(${index * (width + 6)} 0)"><g class="journey-pal-motion motion-${pal.id}"><image class="journey-pal-${pal.id}" href="${pal.src}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" /></g></g>`).join("")}</g>`;
  }

  function createPlayback(ids) {
    const timed = state.selectedDay === 1 && isDayOneTimingDraftApplicable()
      && ids.every((id) => /^\d{2}:\d{2}–\d{2}:\d{2}$/.test(dayOneTimingDraft[id]?.time || ""));
    const stops = ids.map((id, index) => {
      const time = timed && /^(\d{2}):(\d{2})–(\d{2}):(\d{2})$/.exec(dayOneTimingDraft[id]?.time || "");
      return time ? { id, start: Number(time[1]) * 60 + Number(time[2]), end: Number(time[3]) * 60 + Number(time[4]) }
        : { id, start: index * 100, end: index * 100 };
    });
    return { stops, timed, winter: state.selectedDay === 1 && ids.length > 0 && ids.every((id) => winterStops[id]), min: stops[0]?.start || 0, max: Math.max((stops.at(-1)?.end || 0), (stops[0]?.start || 0) + 1) };
  }

  function timeLabel(value) {
    return `${String(Math.floor(value / 60) % 24).padStart(2, "0")}:${String(Math.floor(value) % 60).padStart(2, "0")}`;
  }

  function playbackPosition() {
    if (!playback?.stops.length) return null;
    const actualNext = playback.stops.find((stop) => statusFor(stop.id) === "pending");
    const position = Math.max(playback.min, Math.min(playback.max, previewPosition ?? actualNext?.start ?? playback.max));
    if (!playback.timed) {
      const index = Math.min(playback.stops.length - 1, Math.floor(position / 100));
      return { position, id: playback.stops[index].id, from: index, to: Math.min(index + 1, playback.stops.length - 1), fraction: (position % 100) / 100, moving: false, label: `第 ${index + 1} 站` };
    }
    for (let index = 0; index < playback.stops.length; index += 1) {
      const stop = playback.stops[index];
      const previous = playback.stops[index - 1];
      if (position < stop.start && previous) {
        return { position, id: stop.id, from: index - 1, to: index, fraction: (position - previous.end) / (stop.start - previous.end), moving: true, label: timeLabel(position) };
      }
      if (position < stop.end || index === playback.stops.length - 1) {
        return { position, id: stop.id, from: index, to: index, fraction: 0, moving: false, label: timeLabel(position) };
      }
    }
    return null;
  }

  function mapPoint(index, rowHeight = 150) {
    const row = Math.floor(index / 3);
    const column = row % 2 ? 2 - index % 3 : index % 3;
    return { x: 60 + column * 120, y: 88 + row * rowHeight };
  }

  function activeMapPoint(index) {
    return playback?.winter ? winterStops[playback.stops[index]?.id] || mapPoint(index) : mapPoint(index);
  }

  function routeGeometry(ids) {
    const points = ids.map((id, index) => ({ id, ...activeMapPoint(index) }));
    const segments = points.slice(1).map((point, index) => {
      const previous = points[index];
      let curve = `C ${previous.x} ${(previous.y + point.y) / 2} ${point.x} ${(previous.y + point.y) / 2} ${point.x} ${point.y}`;
      if (playback?.winter && previous.id === "nippon-rentacar-new-chitose" && point.id === "premier-cabin-asahikawa") curve = "C 202 312 242 268 230 220 S 250 130 300 88";
      if (playback?.winter && previous.id === "premier-cabin-asahikawa" && point.id === "aeon-mall-asahikawa-ekimae") curve = "C 358 110 356 180 310 220";
      if (playback?.winter && previous.id === "aeon-mall-asahikawa-ekimae" && point.id === "asahikawa-heiwa-dori") curve = "C 270 292 202 260 170 186";
      return { d: `M ${previous.x} ${previous.y} ${curve}`, curve };
    });
    return { points, segments, path: points.length ? `M ${points[0].x} ${points[0].y} ${segments.map((segment) => segment.curve).join(" ")}` : "" };
  }

  function winterFocusCardHtml(id) {
    const spot = spotById(id);
    if (!spot) {
      const hasMainStops = Boolean(playback?.stops.length);
      return `<p class="winter-focus-eyebrow">${hasMainStops ? "今天的主要安排已結束" : "今天還沒有主要行程"}</p><h3 id="journey-next-title">${hasMainStops ? "慢慢休息，明天再出發" : "先挑幾個想去的地方"}</h3><p>${hasMainStops ? "有空再看看彈性選項，也可以直接回飯店泡湯。" : "點上方編輯，加入今天想去的景點。"}</p>`;
    }
    const preview = previewPosition !== null;
    const nav = navigationFor(id);
    const logistics = getSpotLogistics(id);
    return `<div class="winter-focus-top"><span class="winter-focus-eyebrow">${preview ? "正在預覽這一站" : "接下來去哪裡"}</span><span>${escapeHtml(timingText(spot))}</span></div>
      <h3 id="journey-next-title">${escapeHtml(spot.name)}</h3><p class="winter-focus-summary">${escapeHtml(summaryText(spot))}</p>
      <div class="winter-focus-actions"><a href="${escapeHtml(nav.url)}" target="_blank" rel="noopener noreferrer">↗ ${nav.label}</a><button type="button" data-winter-info aria-expanded="false" aria-controls="winter-focus-info">查看詳情 ⌄</button></div>
      <div id="winter-focus-info" class="winter-focus-info" hidden><p>${escapeHtml(spot.desc)}</p>${logistics?.hours ? `<p><strong>開放／營業：</strong>${escapeHtml(logistics.hours)}</p>` : ""}${logistics?.tickets ? `<p><strong>票券：</strong>${escapeHtml(logistics.tickets)}</p>` : ""}</div>
      ${preview ? `<button type="button" class="winter-return" data-player-return>↶ 回到實際進度</button>` : `<details class="winter-progress-tools"><summary>標記這一站</summary><div><button type="button" data-journey-status="done" data-journey-id="${id}">✓ 完成這站</button><button type="button" data-journey-status="skipped" data-journey-id="${id}">略過</button></div></details>`}`;
  }

  function pausePlayback() {
    playing = false;
    previousFrameTime = null;
    if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  function focusCardHtml(id) {
    if (document.body.classList.contains("winter-view-active")) return winterFocusCardHtml(id);
    const spot = spotById(id);
    const nav = spot ? navigationFor(id) : null;
    const preview = previewPosition !== null;
    const index = playback?.stops.findIndex((stop) => stop.id === id) ?? -1;
    const following = preview ? playback?.stops[index + 1]?.id : playback?.stops.slice(index + 1).find((stop) => statusFor(stop.id) === "pending")?.id;
    return `
      <div class="journey-next-main">
        <div class="journey-mascot">${companionImagesHtml()}</div>
        <div class="journey-next-copy"><p class="journey-next-label">${preview ? "正在預覽" : spot ? "下一站" : playback?.stops.length ? "今天的主要安排已結束" : "今天還沒有主要行程"}</p>
          <h3 id="journey-next-title">${escapeHtml(spot?.name || (playback?.stops.length ? "辛苦了，慢慢休息吧" : "先挑幾個想去的地方"))}</h3>
          ${spot ? `<p class="journey-next-time">${escapeHtml(timingText(spot))}</p>` : ""}</div>
      </div>
      <p class="journey-next-summary">${escapeHtml(spot ? summaryText(spot) : "可以看看彈性選項，或切回行程編輯安排想去的地方。")}</p>
      ${spot ? `<div class="journey-next-actions"><a class="journey-navigation" href="${escapeHtml(nav.url)}" target="_blank" rel="noopener noreferrer">↗ ${nav.label}</a>
        ${preview ? `<button type="button" class="journey-complete" data-player-return>回到實際進度</button>` : `<button type="button" class="journey-complete" data-journey-status="done" data-journey-id="${escapeHtml(id)}">✓ 完成這站</button><button type="button" class="journey-skip" data-journey-status="skipped" data-journey-id="${escapeHtml(id)}">略過</button>`}</div>` : ""}
      ${following ? `<p class="journey-following">接著前往 <strong>${escapeHtml(spotById(following).name)}</strong></p>` : ""}`;
  }

  function paintPlayback() {
    if (mode !== "travel" || host.hidden) return;
    const position = playbackPosition();
    if (!position) return;
    const actualNext = playback.stops.find((stop) => statusFor(stop.id) === "pending")?.id;
    const cardId = previewPosition === null ? actualNext : position.id;
    const cardKey = `${cardId}|${previewPosition === null}|${[...activeCompanions].join(",")}`;
    if (focusedCardKey !== cardKey) {
      focusedCardKey = cardKey;
      host.querySelector(".journey-next-card").innerHTML = focusCardHtml(cardId);
    }
    const from = activeMapPoint(position.from);
    const to = activeMapPoint(position.to);
    const fraction = Math.max(0, Math.min(1, position.fraction));
    const segments = [...host.querySelectorAll("[data-route-segment]")];
    const lengths = segments.map((segment) => segment.getTotalLength());
    const segment = position.from !== position.to ? segments[position.from] : null;
    const location = segment ? segment.getPointAtLength(lengths[position.from] * fraction) : { x: from.x + (to.x - from.x) * fraction, y: from.y + (to.y - from.y) * fraction };
    host.querySelector("[data-pals-marker]")?.setAttribute("transform", companionGroupTransform(location.x, location.y));
    host.classList.toggle("is-playing", playing);
    host.querySelectorAll("[data-map-stop]").forEach((node) => node.classList.toggle("is-preview", node.dataset.mapStop === position.id));
    const label = host.querySelector("[data-player-time]");
    if (label) label.textContent = position.label;
    const caption = host.querySelector("[data-player-caption]");
    if (caption) caption.textContent = `${position.moving ? "前往 " : ""}${spotById(position.id).name}`;
    const slider = host.querySelector("[data-player-slider]");
    const percent = (position.position - playback.min) / (playback.max - playback.min) * 100;
    if (slider) {
      slider.value = String(position.position);
      slider.setAttribute("aria-valuetext", `${position.label} ${position.moving ? "前往" : ""}${spotById(position.id).name}`);
      slider.style.setProperty("--playback-fill", `${percent}%`);
    }
    const trail = host.querySelector(".journey-map-trail");
    const totalLength = lengths.reduce((sum, length) => sum + length, 0);
    const travelled = lengths.slice(0, position.from).reduce((sum, length) => sum + length, 0) + (position.from !== position.to ? (lengths[position.from] || 0) * fraction : 0);
    const routePercent = totalLength ? travelled / totalLength * 100 : 0;
    if (trail) trail.setAttribute("stroke-dasharray", `${routePercent} 100`);
    const playButton = host.querySelector("[data-player-toggle]");
    if (playButton) { playButton.textContent = playing ? "Ⅱ" : "▶"; playButton.setAttribute("aria-label", playing ? "暫停行程播放" : "播放行程"); playButton.setAttribute("aria-pressed", String(playing)); }
    const speed = host.querySelector("[data-player-speed]");
    if (speed) speed.textContent = `×${speeds[speedIndex]}`;
  }

  function animatePlayback(timestamp) {
    if (!playing || !playback) return;
    const elapsed = previousFrameTime === null ? 0 : Math.min((timestamp - previousFrameTime) / 1000, 0.25);
    previousFrameTime = timestamp;
    previewPosition = Math.min(playback.max, (previewPosition ?? playback.min) + elapsed * (playback.timed ? 8 : 20) * speeds[speedIndex]);
    if (previewPosition >= playback.max) pausePlayback();
    paintPlayback();
    if (playing) animationFrame = window.requestAnimationFrame(animatePlayback);
  }

  function previewStop(id) {
    const stop = playback?.stops.find((item) => item.id === id);
    if (!stop) return;
    pausePlayback();
    previewPosition = stop.start;
    paintPlayback();
  }

  function winterMapHtml(ids, nextId) {
    const { points, segments, path } = routeGeometry(ids);
    return `<section class="journey-map-shell winter-map-shell" aria-label="Day 1 插畫路線與播放">
      <div class="winter-map-topline"><span>❄ 今天的散步地圖</span><span>${playback.timed ? "日本時間 · 預估" : `${ids.length} 個點位`}</span></div>
      <svg viewBox="0 0 380 394" class="journey-map journey-winter-map" role="group" aria-label="新千歲至旭川的冬日路線示意，點景點可預覽">
        <image href="assets/day1-winter-scene.svg" width="380" height="394" aria-hidden="true" />
        <path class="winter-road-base" d="${path}" />
        <path class="journey-map-road" d="${path}" /><path class="journey-map-trail" d="${path}" pathLength="100" stroke-dasharray="0 100" />
        ${segments.map((segment, index) => `<path d="${segment.d}" data-route-segment="${index}" fill="none" stroke="none" />`).join("")}
        ${mapCompanionsHtml()}
        ${points.map((point, index) => {
          const status = statusFor(point.id);
          const draft = getTimingDraftForStop(state.selectedDay, point.id);
          const time = draft?.time.slice(0,5) || `${index + 1}.`;
          return `<a href="#journey-next-title" role="button" data-preview-stop="${point.id}" aria-label="預覽${escapeHtml(spotById(point.id).name)}">
            <rect class="journey-map-hit-area" x="${point.x - 32}" y="${point.y - 32}" width="64" height="64" rx="22" />
            <g data-map-stop="${point.id}" class="journey-map-stop winter-stop ${point.id === nextId ? "is-next" : ""} is-${status}">
              <circle cx="${point.x}" cy="${point.y}" r="12" /><text x="${point.x}" y="${point.y + 4}" text-anchor="middle" class="winter-stop-number">${status === "done" ? "✓" : status === "skipped" ? "↷" : index + 1}</text>
              <rect x="${point.lx}" y="${point.ly}" width="${point.width}" height="24" rx="12" />
              <text x="${point.lx + point.width / 2}" y="${point.ly + 16}" text-anchor="middle" class="winter-stop-label">${time} ${point.label}</text>
            </g></a>`;
        }).join("")}
      </svg>
      <div class="journey-playback" id="journey-playback"><div class="journey-playback-caption"><strong data-player-time></strong><span data-player-caption></span></div>
        <div class="journey-playback-controls"><button type="button" data-player-toggle aria-label="播放行程" aria-pressed="false">▶</button><input type="range" data-player-slider aria-label="行程播放進度" min="${playback.min}" max="${playback.max}" step="0.1" value="${playback.min}" /><button type="button" data-player-speed aria-label="切換播放速度">×1</button></div>
      </div></section>`;
  }

  function mapHtml(ids, nextId) {
    if (!ids.length) return "";
    if (playback.winter) return winterMapHtml(ids, nextId);
    const shortNames = {
      "nippon-rentacar-new-chitose": "NIPPON 取車",
      "premier-cabin-asahikawa": "旭川入住",
      "aeon-mall-asahikawa-ekimae": "AEON 站前",
      "asahikawa-heiwa-dori": "平和通晚餐",
      "apa-sapporo-susukino-ekinishi": "APA 札幌入住",
      "toya-kohan-tei": "洞爺湖入住",
      "lagent-hakodate-ekimae": "函館入住"
    };
    const { points, segments, path } = routeGeometry(ids);
    const height = Math.ceil(ids.length / 3) * 150 + 18;
    return `
      <details class="journey-map-shell" open>
        <summary>夥伴的今日路線 <span>${ids.length} 站</span></summary>
        <div class="journey-map-board">
          <svg viewBox="0 0 360 ${height}" class="journey-map" role="group" aria-label="依行程順序繪製的路線示意，點站點可預覽">
            <path class="journey-map-road" d="${path}" />
            <path class="journey-map-trail" d="${path}" pathLength="100" stroke-dasharray="0 100" />
            ${segments.map((segment, index) => `<path d="${segment.d}" data-route-segment="${index}" fill="none" stroke="none" />`).join("")}
            ${points.map((point, index) => {
              const spot = spotById(point.id);
              const status = statusFor(point.id);
              const label = shortNames[point.id] || Array.from(spot.name).slice(0, 8).join("") + (Array.from(spot.name).length > 8 ? "…" : "");
              return `<a href="#journey-playback" role="button" data-preview-stop="${point.id}" aria-label="預覽${escapeHtml(spot.name)}">
                <rect class="journey-map-hit-area" x="${point.x - 42}" y="${point.y - 35}" width="84" height="92" />
                <g data-map-stop="${point.id}" class="journey-map-stop ${point.id === nextId ? "is-next" : ""} is-${status}">
                  <circle cx="${point.x}" cy="${point.y}" r="23" />
                  <text class="journey-map-icon" x="${point.x}" y="${point.y + 7}" text-anchor="middle" aria-hidden="true">${iconFor(spot)}</text>
                  <text class="journey-map-label" x="${point.x}" y="${point.y + 43}" text-anchor="middle">${index + 1}. ${escapeHtml(label)}</text>
                  ${status !== "pending" ? `<text class="journey-map-status" x="${point.x + 22}" y="${point.y - 17}" text-anchor="middle">${status === "done" ? "✓" : "↷"}</text>` : ""}
                </g>
              </a>`;
            }).join("")}
            ${mapCompanionsHtml()}
          </svg>
        </div>
        <div class="journey-playback" id="journey-playback">
          <div class="journey-playback-caption"><strong data-player-time></strong><span data-player-caption></span></div>
          <div class="journey-playback-controls">
            <button type="button" data-player-toggle aria-label="播放行程" aria-pressed="false">▶</button>
            <input type="range" data-player-slider aria-label="行程播放進度" min="${playback.min}" max="${playback.max}" step="0.1" value="${playback.min}" />
            <button type="button" data-player-speed aria-label="切換播放速度">×1</button>
          </div>
          <div class="journey-playback-footer"><span>${playback.timed ? "日本時間試排" : "順序播放 · 未排實際開始時間"}</span><button type="button" data-player-return>回到實際進度</button></div>
        </div>
        ${state.selectedDay !== 1 ? `<div class="journey-companion-picker"><span>地圖夥伴</span>${companions.map((pal) => `<button type="button" data-companion="${pal.id}" aria-pressed="${activeCompanions.has(pal.id)}" title="切換${pal.name}"><img src="${pal.src}" width="26" height="26" alt="" />${pal.name}</button>`).join("")}</div>` : ""}
        <p class="journey-map-note">點站點或拖拉播放條，同行夥伴會一起跟著預覽前進；不會修改完成紀錄。路線為順序示意，比例非實際距離。</p>
      </details>`;
  }

  function stopHtml(id, index, nextId) {
    const spot = spotById(id);
    const status = statusFor(id);
    const nav = navigationFor(id);
    const logistics = getSpotLogistics(id);
    const timing = getTimingDraftForStop(state.selectedDay, id);
    return `
      <li class="journey-stop is-${status}${id === nextId ? " is-next" : ""}">
        <span class="journey-stop-dot" aria-hidden="true">${status === "done" ? "✓" : status === "skipped" ? "↷" : index + 1}</span>
        <details data-journey-details="${escapeHtml(id)}">
          <summary data-preview-stop="${id}" data-preview-from="timeline">
            <span class="journey-stop-time">${escapeHtml(timingText(spot))}</span>
            <strong>${escapeHtml(spot.name)}</strong>
            <span class="journey-stop-status">${status === "done" ? "已完成" : status === "skipped" ? "已略過" : id === nextId ? "下一站" : isOptional(id) ? "有空再去" : "待出發"}</span>
          </summary>
          <div class="journey-stop-details">
            <p>${escapeHtml(spot.desc)}</p>
            ${timing ? `<p>${escapeHtml(timing.note)}</p>` : ""}
            ${logistics?.hours ? `<p><strong>開放：</strong>${escapeHtml(logistics.hours)}</p>` : ""}
            ${logistics?.tickets ? `<p><strong>票券：</strong>${escapeHtml(logistics.tickets)}</p>` : ""}
            <div class="journey-row-actions">
              <a class="small-button map-link" href="${escapeHtml(nav.url)}" target="_blank" rel="noopener noreferrer">${nav.label}</a>
              <button class="small-button" type="button" data-journey-status="${status === "pending" ? "done" : "pending"}" data-journey-id="${escapeHtml(id)}">${status === "pending" ? "標為完成" : "改回待出發"}</button>
              ${status === "pending" ? `<button class="small-button" type="button" data-journey-status="skipped" data-journey-id="${escapeHtml(id)}">略過</button>` : ""}
            </div>
          </div>
        </details>
      </li>`;
  }

  function japanClock() {
    return new Intl.DateTimeFormat("zh-TW", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
  }

  function renderOverview() {
    pausePlayback();
    const days = tripDates.map((date, index) => {
      const day = index + 1;
      const places = (state.plan[day] || []).map(spotById).filter(Boolean);
      const mainPlaces = places.filter((spot) => !(day === 1 && dayOneTimingDraft[spot.id]?.optional));
      const areas = [...new Set(places.map((spot) => spot.area).filter(Boolean))];
      const done = mainPlaces.filter((spot) => progress()[day]?.[spot.id] === "done").length;
      const skipped = mainPlaces.filter((spot) => progress()[day]?.[spot.id] === "skipped").length;
      return { day, date, places, mainPlaces, areas, done, skipped, ...mapPoint(index, 116) };
    });
    const path = days.map((day, index) => `${index ? "L" : "M"} ${day.x} ${day.y}`).join(" ");
    host.innerHTML = `
      <header class="journey-heading"><div><p class="panel-kicker">12/23–1/1 · 和夥伴一起出發</p><h2 id="journey-overview-title" tabindex="-1">北海道十日總覽</h2></div><span class="journey-overview-count">${days.reduce((sum, day) => sum + day.places.length, 0)} 個已排點位</span></header>
      <p class="journey-overview-intro">十天的想去清單。點日期或卡片，就能看當天路線與下一站。</p>
      <section class="journey-overview-map" aria-label="十日路線示意">
        <svg viewBox="0 0 360 488" role="group" aria-label="十天行程，依日期連接，點選可開啟當天行程">
          <path class="journey-map-road" d="${path}" />
          ${days.map((day) => `<a href="#journey-title" role="button" data-overview-day="${day.day}" aria-label="開啟 Day ${day.day}，${day.date}，${escapeHtml(day.areas.join('、') || '尚未安排')}">
            <rect class="journey-map-hit-area" x="${day.x - 46}" y="${day.y - 29}" width="92" height="94" rx="18" />
            <g class="journey-overview-node${day.day === state.selectedDay ? ' is-selected' : ''}"><circle cx="${day.x}" cy="${day.y}" r="26" /><text x="${day.x}" y="${day.y + 5}" text-anchor="middle" class="journey-overview-day">D${day.day}</text><text x="${day.x}" y="${day.y + 47}" text-anchor="middle" class="journey-map-label">${day.date} · ${escapeHtml(day.areas.slice(0, 2).join('／') || '待安排')}</text></g>
          </a>`).join('')}
          ${mapCompanionsHtml(true)}
        </svg>
        <p class="journey-map-note">依天數連線的旅程示意，位置與比例非實際地圖。</p>
      </section>
      <div class="journey-overview-days">${days.map((day) => `<button type="button" class="journey-overview-card${day.day === state.selectedDay ? ' is-selected' : ''}" data-overview-day="${day.day}" aria-label="查看 Day ${day.day} ${day.date} 的行程">
        <span class="journey-overview-card-head"><strong>Day ${day.day}</strong><span>${day.date}</span><span aria-hidden="true">↗</span></span>
        <span class="journey-overview-areas">${escapeHtml(day.areas.join(' → ') || '還沒有安排景點')}</span>
        <span class="journey-overview-stops">${escapeHtml(day.places.slice(0, 3).map((spot) => spot.name).join(' · ') || '從行程編輯加入想去的地方。')}${day.places.length > 3 ? ` …另 ${day.places.length - 3} 站` : ''}</span>
        <span class="journey-overview-card-footer">${day.places.length} 個點位${day.places.length !== day.mainPlaces.length ? ` · 含 ${day.places.length - day.mainPlaces.length} 個彈性選項` : ''}<span>已完成 ${day.done}/${day.mainPlaces.length}${day.skipped ? ` · 略過 ${day.skipped}` : ''}</span></span>
      </button>`).join('')}</div>`;
  }

  function setMode(nextMode) {
    mode = validModes.includes(nextMode) ? nextMode : "edit";
    if (mode !== "travel") pausePlayback();
    try { window.localStorage.setItem(viewKey, mode); } catch { /* This view still works for this visit. */ }
  }

  function renderJourney() {
    workspace.classList.toggle("is-travel", mode !== "edit");
    workspace.classList.toggle("is-overview", mode === "overview");
    document.body.classList.toggle("travel-view-active", mode !== "edit");
    document.body.classList.toggle("winter-view-active", mode === "travel" && state.selectedDay === 1);
    host.hidden = mode === "edit";
    host.setAttribute("aria-label", mode === "overview" ? "十日行程總覽" : "旅途中行程");
    switchButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.plannerView === mode)));
    if (host.hidden) return;
    if (mode === "overview") { renderOverview(); return; }

    const context = `${progressKey()}|${state.selectedDay}`;
    if (progressContext !== context) feedback = "";
    progressContext = context;
    const openDetails = new Set(Array.from(host.querySelectorAll("details[data-journey-details][open]")).map((item) => item.dataset.journeyDetails));
    const mapOpen = host.querySelector(".journey-map-shell")?.open ?? true;
    const optionalOpen = host.querySelector(".journey-optional")?.open ?? false;
    const ids = (state.plan[state.selectedDay] || []).filter((id) => spotById(id));
    const mainIds = ids.filter((id) => !isOptional(id));
    const optionalIds = ids.filter(isOptional);
    const newPlaybackContext = `${context}|${mainIds.join(",")}|${isDayOneTimingDraftApplicable()}`;
    if (newPlaybackContext !== playbackContext) {
      pausePlayback();
      previewPosition = null;
      playbackContext = newPlaybackContext;
    }
    playback = createPlayback(mainIds);
    focusedCardKey = "";
    const doneCount = mainIds.filter((id) => statusFor(id) === "done").length;
    const skippedCount = mainIds.filter((id) => statusFor(id) === "skipped").length;
    const nextId = mainIds.find((id) => statusFor(id) === "pending");
    const percentage = mainIds.length ? Math.round((doneCount + skippedCount) / mainIds.length * 100) : 0;

    const winter = state.selectedDay === 1;
    const mapContent = mapHtml(mainIds, nextId);
    host.innerHTML = winter ? `
      <header class="winter-heading"><div><p>HOKKAIDO WINTER WALK</p><h2 id="journey-title" tabindex="-1">Day 1 · 初抵旭川</h2><span>新千歲 → 旭川 · 先入住，再慢慢逛</span></div><div class="winter-date"><strong>12.23</strong><span>WED · 日本時間</span></div></header>
      ${mapContent}
      <section class="journey-next-card winter-focus-card" aria-labelledby="journey-next-title"></section>
      <div class="winter-pals-row" role="group" aria-label="選擇同行夥伴">${companions.map((pal) => `<button type="button" data-companion="${pal.id}" aria-pressed="${activeCompanions.has(pal.id)}"><img src="${pal.src}" width="23" height="26" alt="" />${pal.name}</button>`).join("")}</div>
      <p class="journey-feedback" role="status" aria-live="polite" ${feedback ? "" : "hidden"}>${escapeHtml(feedback)}</p>
      <div class="winter-day-progress"><span>今天已完成 ${doneCount} / ${mainIds.length} 站${skippedCount ? ` · 略過 ${skippedCount}` : ""}</span><span>進度記在此裝置</span></div>
      ${mainIds.length ? `<section class="journey-timeline-section"><h3>今天這樣走 <span>${playback.timed ? "日本時間 · 初步試排" : "依目前行程順序 · 停留時間參考"}</span></h3><ol class="journey-timeline">${mainIds.map((id, index) => stopHtml(id, index, nextId)).join("")}</ol></section>` : ""}
      ${optionalIds.length ? `<details class="journey-optional"><summary>有空再去 <span>${optionalIds.length} 個彈性選項</span></summary><p>常磐公園、上川神社隨體力安排，晚到就留給下次。</p><ol class="journey-timeline">${optionalIds.map((id, index) => stopHtml(id, index, null)).join("")}</ol></details>` : ""}
      <p class="winter-footnote">雪地開車、排隊與天候都可能讓時間順延。插畫是行程示意，導航請點景點卡。</p>` : `
      <header class="journey-heading">
        <div><p class="panel-kicker">和謎擬Ｑ一起出發</p><h2 id="journey-title" tabindex="-1">Day ${state.selectedDay} · ${tripDates[state.selectedDay - 1]}</h2></div>
        <span class="journey-clock">日本時間 <span data-japan-clock>${japanClock()}</span></span>
      </header>
      <div class="journey-progress-copy"><span>已完成 ${doneCount} / ${mainIds.length} 站${skippedCount ? ` · 略過 ${skippedCount} 站` : ""}</span><span>進度記在此裝置</span></div>
      <div class="journey-progress-track" role="progressbar" aria-label="今日處理進度，含完成與略過" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percentage}"><span style="width:${percentage}%"></span></div>
      <section class="journey-next-card" aria-labelledby="journey-next-title"></section>
      <p class="journey-feedback" role="status" aria-live="polite" ${feedback ? "" : "hidden"}>${escapeHtml(feedback)}</p>
      <p class="journey-hint">完成／略過會記錄實際進度；點地圖或拖拉播放條可自由預覽。</p>
      ${mapHtml(mainIds, nextId)}
      ${mainIds.length ? `<section class="journey-timeline-section" aria-labelledby="journey-timeline-title"><h3 id="journey-timeline-title">今天的行程</h3><ol class="journey-timeline">${mainIds.map((id, index) => stopHtml(id, index, nextId)).join("")}</ol></section>` : ""}
      ${optionalIds.length ? `<details class="journey-optional"><summary>有空再去 <span>${optionalIds.length} 個彈性選項</span></summary><p>不用全去；晚到、太冷或疲累就略過。</p><ol class="journey-timeline">${optionalIds.map((id, index) => stopHtml(id, index, null)).join("")}</ol></details>` : ""}`;

    host.querySelectorAll("details[data-journey-details]").forEach((item) => { item.open = openDetails.has(item.dataset.journeyDetails); });
    const map = host.querySelector(".journey-map-shell");
    if (map?.matches("details")) map.open = mapOpen;
    const optional = host.querySelector(".journey-optional");
    if (optional) optional.open = optionalOpen;
    if (mainIds.length) paintPlayback();
    else host.querySelector(".journey-next-card").innerHTML = focusCardHtml(null);
  }

  switchButtons.forEach((button) => button.addEventListener("click", () => {
    setMode(button.dataset.plannerView);
    renderJourney();
  }));

  host.addEventListener("click", (event) => {
    const target = event.target;
    const infoButton = target.closest("[data-winter-info]");
    if (infoButton) {
      const panel = host.querySelector("#winter-focus-info");
      panel.hidden = !panel.hidden;
      infoButton.setAttribute("aria-expanded", String(!panel.hidden));
      infoButton.textContent = panel.hidden ? "查看詳情 ⌄" : "收起詳情 ⌃";
      return;
    }
    const overviewDay = target.closest("[data-overview-day]");
    if (overviewDay) {
      event.preventDefault();
      const day = Number(overviewDay.dataset.overviewDay);
      if (!Number.isInteger(day) || day < 1 || day > tripDates.length) return;
      state.selectedDay = day;
      state.summaryMode = "day";
      setMode("travel");
      render();
      host.querySelector("#journey-title")?.focus();
      return;
    }
    const preview = target.closest("[data-preview-stop]");
    if (preview) {
      if (preview.dataset.previewFrom !== "timeline") event.preventDefault();
      previewStop(preview.dataset.previewStop);
      return;
    }
    if (target.closest("[data-player-toggle]")) {
      if (playing) pausePlayback();
      else {
        const current = playbackPosition();
        if (!current) return;
        previewPosition = current.position >= playback.max ? playback.min : current.position;
        playing = true;
        previousFrameTime = null;
        animationFrame = window.requestAnimationFrame(animatePlayback);
      }
      paintPlayback();
      return;
    }
    if (target.closest("[data-player-speed]")) {
      speedIndex = (speedIndex + 1) % speeds.length;
      paintPlayback();
      return;
    }
    if (target.closest("[data-player-return]")) {
      pausePlayback();
      previewPosition = null;
      paintPlayback();
      return;
    }
    const companion = target.closest("[data-companion]");
    if (companion) {
      const id = companion.dataset.companion;
      if (activeCompanions.has(id)) { if (activeCompanions.size > 1) activeCompanions.delete(id); }
      else activeCompanions.add(id);
      renderJourney();
      host.querySelector(`[data-companion="${id}"]`)?.focus({ preventScroll: true });
      return;
    }
    const button = event.target.closest("[data-journey-status]");
    if (!button) return;
    const id = button.dataset.journeyId;
    const status = button.dataset.journeyStatus;
    if (!(state.plan[state.selectedDay] || []).includes(id) || !["pending", "done", "skipped"].includes(status)) return;
    pausePlayback();
    previewPosition = null;
    const saved = progress();
    saved[state.selectedDay] ||= {};
    if (status === "pending") delete saved[state.selectedDay][id];
    else saved[state.selectedDay][id] = status;
    feedback = `「${spotById(id).name}」${status === "done" ? "已完成" : status === "skipped" ? "已略過" : "已改回待出發"}。`;
    try {
      window.localStorage.setItem(progressKey(), JSON.stringify(saved));
    } catch {
      feedback += " 此裝置無法儲存進度，重新整理後可能遺失。";
    }
    renderJourney();
    host.querySelector("#journey-title")?.focus({ preventScroll: true });
  });

  host.addEventListener("input", (event) => {
    if (!event.target.matches("[data-player-slider]")) return;
    pausePlayback();
    previewPosition = Number(event.target.value);
    paintPlayback();
  });

  host.addEventListener("keydown", (event) => {
    if (event.key !== " " || !event.target.matches("a[data-preview-stop], a[data-overview-day]")) return;
    event.preventDefault();
    event.target.click();
  });

  window.addEventListener("storage", (event) => {
    if (event.key === progressKey() || event.key === null) {
      if (event.key === null) progressCache.clear();
      else progressCache.delete(progressKey());
      renderJourney();
    }
  });

  window.setInterval(() => {
    const clock = host.querySelector("[data-japan-clock]");
    if (clock) clock.textContent = japanClock();
  }, 60000);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { pausePlayback(); paintPlayback(); }
    else renderJourney();
  });
  window.HOKKAIDO_JOURNEY = { render: renderJourney };
  renderJourney();
})();
