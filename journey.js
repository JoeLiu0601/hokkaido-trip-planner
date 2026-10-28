(() => {
  "use strict";

  const host = document.getElementById("journey-view");
  const workspace = document.querySelector(".workspace");
  const switchButtons = document.querySelectorAll("[data-planner-view]");
  if (!host || !workspace) return;
  const scenes = window.HOKKAIDO_SCENES;
  const themeKey = "hokkaido-planner-theme";
  let theme = readLocalStorage(themeKey) === "light" ? "light" : "dark";
  const themeButton = document.getElementById("planner-theme-toggle");
  function applyTheme() {
    document.body.dataset.plannerTheme = theme;
    if (!themeButton) return;
    const nextTheme = theme === "dark" ? "淺色" : "深色";
    themeButton.textContent = `${theme === "dark" ? "☀" : "☾"} ${nextTheme}`;
    themeButton.setAttribute("aria-label", `切換至${nextTheme}模式`);
    themeButton.title = `目前為${theme === "dark" ? "深色" : "淺色"}，點按切換`;
  }
  applyTheme();
  themeButton?.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    applyTheme();
    try { window.localStorage.setItem(themeKey, theme); } catch { /* Keep the selected theme for this visit. */ }
  });
  const hero = document.querySelector(".hero");
  const heroToggle = document.getElementById("hero-summary-toggle");
  heroToggle?.addEventListener("click", () => {
    const expanded = hero.classList.toggle("is-expanded");
    heroToggle.setAttribute("aria-expanded", String(expanded));
    heroToggle.textContent = expanded ? "收起旅程資訊 ⌃" : "旅程資訊 ⌄";
  });

  const companions = [
    { id: "pikachu", name: "皮卡丘", src: "assets/pikachu-travel-cutout.png" },
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
  const groupRouteKey = "hokkaido-planner-group-route";
  let selectedGroup = readLocalStorage(groupRouteKey) === "B" ? "B" : "A";
  let mode = validModes.includes(requestedView) ? requestedView : validModes.includes(savedView) ? savedView : "edit";
  let feedback = "";
  let progressContext = "";
  const dayTabs = document.getElementById("day-tabs");
  const previousDays = document.getElementById("day-tabs-prev");
  const nextDays = document.getElementById("day-tabs-next");
  let dayNavContext = "";
  let dayDrag = null;
  let draggedDates = false;

  function updateDayArrows() {
    if (!dayTabs || !previousDays || !nextDays) return;
    previousDays.disabled = dayTabs.scrollLeft <= 2;
    nextDays.disabled = dayTabs.scrollLeft + dayTabs.clientWidth >= dayTabs.scrollWidth - 2;
  }
  function refreshDayNavigation() {
    window.requestAnimationFrame(() => {
      const context = `${mode}|${state.selectedDay}`;
      if (dayTabs && context !== dayNavContext) {
        dayNavContext = context;
        const active = dayTabs.querySelector(".day-tab.active");
        if (active) {
          const right = active.offsetLeft + active.offsetWidth;
          if (active.offsetLeft < dayTabs.scrollLeft) dayTabs.scrollLeft = Math.max(0, active.offsetLeft - 4);
          else if (right > dayTabs.scrollLeft + dayTabs.clientWidth) dayTabs.scrollLeft = right - dayTabs.clientWidth + 4;
        }
      }
      updateDayArrows();
    });
  }
  function scrollDates(direction) {
    if (!dayTabs) return;
    dayTabs.scrollBy({ left: direction * Math.max(140, dayTabs.clientWidth * .8), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  previousDays?.addEventListener("click", () => scrollDates(-1));
  nextDays?.addEventListener("click", () => scrollDates(1));
  dayTabs?.addEventListener("scroll", updateDayArrows, { passive: true });
  window.addEventListener("resize", updateDayArrows);
  dayTabs?.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    draggedDates = false;
    dayDrag = { x: event.clientX, left: dayTabs.scrollLeft, pointer: event.pointerId };
  });
  dayTabs?.addEventListener("pointermove", (event) => {
    if (!dayDrag || event.pointerId !== dayDrag.pointer) return;
    if (event.buttons === 0) { endDateDrag(event); return; }
    const delta = event.clientX - dayDrag.x;
    if (!draggedDates && Math.abs(delta) < 6) return;
    draggedDates = true;
    dayTabs.classList.add("is-dragging");
    dayTabs.setPointerCapture(event.pointerId);
    dayTabs.scrollLeft = dayDrag.left - delta;
    event.preventDefault();
  });
  function endDateDrag(event) {
    if (!dayDrag || event.pointerId !== dayDrag.pointer) return;
    if (dayTabs.hasPointerCapture(event.pointerId)) dayTabs.releasePointerCapture(event.pointerId);
    dayDrag = null;
    dayTabs.classList.remove("is-dragging");
    updateDayArrows();
  }
  dayTabs?.addEventListener("pointerup", endDateDrag);
  dayTabs?.addEventListener("pointercancel", endDateDrag);
  dayTabs?.addEventListener("lostpointercapture", endDateDrag);
  dayTabs?.addEventListener("click", (event) => {
    if (!draggedDates) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    draggedDates = false;
  }, true);

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
      "new-chitose-airport": "BR166 11:00 抵達，先入境、領行李，再留約 1 小時逛機場；13:15 左右前往租車櫃台。",
      "nippon-rentacar-new-chitose": "先在機場櫃台報到，再搭接駁車到營業所取車。",
      "premier-cabin-asahikawa": "機場逛街、取車後約 14:15 出發往旭川，途中補餐、休息；約 17:45 入住放行李。",
      "aeon-mall-asahikawa-ekimae": "步行到站前 AEON，先補雪靴、防滑鞋與保暖配件。",
      "asahikawa-heiwa-dori": "在站前商店街散步、找晚餐，吃完回飯店休息。",
      hachimanzaka: "09:30 從 La'gent Stay 函館站前出發，搭市電到末廣町再上坡拍港景。",
      "kanemori-warehouse": "八幡坂下坡後逛金森；午餐與咖啡安排在海灣周邊，14:15 離開。",
      "hakodate-mt": "14:45 抵達山麓站為目標，預留排隊；下午上山看日景轉夜景，17:00 開始下山。",
      "hakodate-gokoku-shrine": "晚餐後先回飯店休息；僅在午夜開放及往返車輛確認後，23:15 左右搭車前往。",
      "morning-market": "元旦有店營業才短逛朝市；09:45 回飯店準備退房，別讓早餐拖到後面的交通。",
      motomachi: "10:15 前退房寄行李，從函館駅前搭市電到十字街；元町只散步約一小時，11:45 折返。",
      "hakodate-station-airport-bus": "12:15 回 La'gent Stay 取行李，最晚 13:10 到函館站前巴士總站 11 號乘車處。13:30 目標班次待確認；不符就改搭計程車。",
      "hakodate-airport": "14:10 前後到國際線 1F 為目標；JX861 18:00 起飛，星宇櫃檯一般 15:30 開始、17:00 截止報到。"
    };
    const timing = getTimingDraftForStop(state.selectedDay, spot.id);
    if (timing && summaries[spot.id]) return summaries[spot.id];
    if (timing?.note) return timing.note;
    return spot.best || spot.desc;
  }

  function navigationFor(id) {
    const index = (state.plan[state.selectedDay] || []).indexOf(id);
    const nav = getStopNavigation(state.selectedDay, index, spotById(id));
    return { ...nav, label: nav.label === "地圖" ? "開啟地圖" : nav.label };
  }

  function selectedCompanions() {
    return companions.filter((pal) => activeCompanions.has(pal.id));
  }

  function companionGroupTransform(x, y) {
    const width = 32;
    const count = selectedCompanions().length;
    const groupWidth = count * width + (count - 1) * 6;
    const left = Math.max(8, Math.min(380 - groupWidth - 8, x - groupWidth / 2));
    return `translate(${left} ${y - 78})`;
  }

  function mapCompanionsHtml() {
    const pals = selectedCompanions();
    const point = activeMapPoint(0);
    const width = 32;
    const height = 40;
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

  function activeMapPoint(index) {
    if (playback?.winter) return winterStops[playback.stops[index]?.id];
    const row = Math.floor(index / 2);
    const column = row % 2 ? 1 - index % 2 : index % 2;
    return { x: 94 + column * 192, y: 174 + row * 150, lx: column ? 208 : 16, ly: 202 + row * 150, width: 156 };
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
      return `<p class="winter-focus-eyebrow">${hasMainStops ? "今天的主要安排已結束" : "今天還沒有主要行程"}</p><h3 id="journey-next-title" tabindex="-1">${hasMainStops ? (state.selectedDay === 10 ? "把回憶帶回家，旅途平安" : "慢慢休息，明天再出發") : "先挑幾個想去的地方"}</h3><p>${hasMainStops ? "可以回顧今天走過的地方，也可以隨體力看看彈性選項。" : "點上方編輯，加入今天想去的景點。"}</p>`;
    }
    const preview = previewPosition !== null;
    const nav = navigationFor(id);
    const logistics = getSpotLogistics(id);
    return `<div class="winter-focus-top"><span class="winter-focus-eyebrow">${preview ? "正在預覽這一站" : "接下來去哪裡"}</span><span>${escapeHtml(timingText(spot))}</span></div>
      <h3 id="journey-next-title" tabindex="-1">${escapeHtml(spot.name)}</h3><p class="winter-focus-summary">${escapeHtml(summaryText(spot))}</p>
      ${nav.note ? `<p class="winter-focus-summary">${escapeHtml(nav.note)}</p>` : ""}
      <div class="winter-focus-actions"><a href="${escapeHtml(nav.url)}" target="_blank" rel="noopener noreferrer">↗ ${nav.label}</a><button type="button" data-winter-info aria-expanded="false" aria-controls="winter-focus-info">查看詳情 ⌄</button></div>
      ${state.selectedDay === 10 && id === "hakodate-station-airport-bus" ? airportBusTimetableHtml() : ""}
      <div id="winter-focus-info" class="winter-focus-info" hidden><p>${escapeHtml(spot.desc)}</p><p>${escapeHtml(getDriveInfoForStop(state.selectedDay, (state.plan[state.selectedDay] || []).indexOf(id), id))}</p>${plannedDrivingRouteHtml(state.selectedDay, (state.plan[state.selectedDay] || []).indexOf(id), id)}${logistics?.hours ? `<p><strong>開放／營業：</strong>${escapeHtml(logistics.hours)}</p>` : ""}${logistics?.tickets ? `<p><strong>票券：</strong>${escapeHtml(logistics.tickets)}</p>` : ""}</div>
      ${preview ? `<button type="button" class="winter-return" data-player-return>↶ 回到實際進度</button>` : `<details class="winter-progress-tools"><summary>標記這一站</summary><div><button type="button" data-journey-status="done" data-journey-id="${id}">✓ 完成這站</button><button type="button" data-journey-status="skipped" data-journey-id="${id}">略過</button></div></details>`}`;
  }

  function pausePlayback() {
    playing = false;
    host.classList.remove("is-playing");
    previousFrameTime = null;
    if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  function focusCardHtml(id) {
    return winterFocusCardHtml(id);
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

  function mapHtml(ids, nextId) {
    if (!ids.length) return "";
    const { points, segments, path } = routeGeometry(ids);
    const height = playback.winter ? 394 : Math.ceil(ids.length / 2) * 150 + 120;
    const background = playback.winter
      ? `<image href="assets/day1-winter-scene.svg?v=20261026-contrast" width="380" height="394" aria-hidden="true" />`
      : scenes.background(state.selectedDay, height);
    const shortNames = {
      "apa-sapporo-susukino-ekinishi": "APA 入住", "lagent-hakodate-ekimae": "函館入住",
      "toya-kohan-tei": "洞爺湖入住", "hakodate-station-airport-bus": "機場巴士",
      "sapporo-beer-museum": "啤酒博物館", "muroran-hakucho-bridge-view": "白鳥大橋",
      "lucky-pierrot-goryokaku": "小丑漢堡", "shiroi-koibito-park": "白色戀人公園"
    };
    return `<section class="journey-map-shell winter-map-shell" aria-label="Day ${state.selectedDay} 插畫路線與播放">
      <div class="winter-map-topline"><span>❄ ${escapeHtml(scenes.days[state.selectedDay - 1].place)}的冬日風景</span><span>${playback.timed ? "日本時間 · 預估" : "依行程順序播放"}</span></div>
      <svg viewBox="0 0 380 ${height}" class="journey-map journey-winter-map" role="group" aria-label="北海道主題插畫，路線依行程順序，位置非實際地圖；點景點可預覽">
        ${background}
        <path class="winter-road-base" d="${path}" />
        <path class="journey-map-road" d="${path}" /><path class="journey-map-trail" d="${path}" pathLength="100" stroke-dasharray="0 100" />
        ${segments.map((segment, index) => `<path d="${segment.d}" data-route-segment="${index}" fill="none" stroke="none" />`).join("")}
        ${playback.winter ? mapCompanionsHtml() : ""}
        ${points.map((point, index) => {
          const spot = spotById(point.id);
          const status = statusFor(point.id);
          const draft = getTimingDraftForStop(state.selectedDay, point.id);
          const prefix = draft && playback.timed ? draft.time.slice(0,5) : `${index + 1} ·`;
          const name = point.label || shortNames[point.id] || Array.from(spot.name).slice(0, 6).join("") + (Array.from(spot.name).length > 6 ? "…" : "");
          return `<a href="#journey-next-title" role="button" data-preview-stop="${point.id}" aria-label="預覽${escapeHtml(spot.name)}">
            ${!playback.winter ? scenes.icon(scenes.spotIcon(spot), point.x, point.y - 27, .48) : ""}
            <rect class="journey-map-hit-area" x="${point.x - 32}" y="${point.y - 32}" width="64" height="64" rx="22" />
            <g data-map-stop="${point.id}" class="journey-map-stop winter-stop ${point.id === nextId ? "is-next" : ""} is-${status}">
              <circle cx="${point.x}" cy="${point.y}" r="12" /><text x="${point.x}" y="${point.y + 4}" text-anchor="middle" class="winter-stop-number">${status === "done" ? "✓" : status === "skipped" ? "↷" : index + 1}</text>
              <rect x="${point.lx}" y="${point.ly}" width="${point.width}" height="28" rx="14" />
              <text x="${point.lx + point.width / 2}" y="${point.ly + 18}" text-anchor="middle" class="winter-stop-label${playback.winter ? " is-day-one" : ""}">${prefix} ${escapeHtml(name)}</text>
            </g></a>`;
        }).join("")}
        ${!playback.winter ? mapCompanionsHtml() : ""}
      </svg>
      <div class="journey-playback" id="journey-playback"><div class="journey-playback-caption"><strong data-player-time></strong><span data-player-caption></span></div>
        <div class="journey-playback-controls"><button type="button" data-player-toggle aria-label="播放行程" aria-pressed="false">▶</button><input type="range" data-player-slider aria-label="行程播放進度" min="${playback.min}" max="${playback.max}" step="0.1" value="${playback.min}" /><button type="button" data-player-speed aria-label="切換播放速度">×1</button></div>
        <p class="winter-player-note">${playback.timed ? "日本時間試排" : state.selectedDay >= 2 ? `依目前景點順序播放；D${state.selectedDay} 建議時間與路線請看上方完整試排` : "順序預覽，尚未排實際開始時間"} · 預覽不會改動完成紀錄</p>
      </div></section>`;
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
            ${plannedDrivingRouteHtml(state.selectedDay, (state.plan[state.selectedDay] || []).indexOf(id), id)}
            ${logistics?.hours ? `<p><strong>開放：</strong>${escapeHtml(logistics.hours)}</p>` : ""}
            ${logistics?.tickets ? `<p><strong>票券：</strong>${escapeHtml(logistics.tickets)}</p>` : ""}
            ${state.selectedDay === 10 && id === "hakodate-station-airport-bus" ? airportBusTimetableHtml() : ""}
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

  function groupRouteSwitchHtml() {
    return `<section class="group-route-picker" aria-label="分組路線">
      <div class="group-route-switch" role="group" aria-label="選擇要查看的路線">${Object.entries(groupRouteLabels).map(([group, label]) => `<button type="button" data-group-route="${group}" aria-pressed="${selectedGroup === group}">${escapeHtml(label)}</button>`).join("")}</div>
      <p>${selectedGroup === "A" ? "A 線白天市區觀光；D5 傍晚與滑雪組會合看夜景，搭朋友的車回 APA。" : "B 線自行開車滑雪；D5 傍晚會合看夜景，全員搭車回 APA。D6 是否繼續滑雪待確認。"} 其餘日期兩組共用。</p>
    </section>`;
  }

  function renderSkiDay() {
    pausePlayback();
    playback = null;
    previewPosition = null;
    const day = state.selectedDay;
    const route = getGroupRouteForDay(day, selectedGroup);
    const meetingQuery = getDrivingPlaceQuery(spotById("moiwa-yama"));
    const meetingUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(meetingQuery)}&travelmode=driving&dir_action=navigate`;
    host.innerHTML = `<header class="winter-heading"><div><p>HOKKAIDO WINTER WALK</p><h2 id="journey-title" tabindex="-1">Day ${day} · ${escapeHtml(route.title)}</h2><span>B 滑雪 · 札幌</span></div><div class="winter-date"><strong>${tripDates[day - 1].replace("/", ".")}</strong><span>日本時間</span></div></header>
      ${groupRouteSwitchHtml()}
      ${dayDepartureHtml(day, "B")}
      <section class="day-timing-draft group-ski-day" aria-labelledby="ski-route-title">
        <h3 id="ski-route-title">B 線 · ${escapeHtml(route.title)}</h3>
        <p class="day-schedule-route">${escapeHtml(route.route)}</p>
        <ol class="group-ski-stages">${route.stages.map(([time, title, note]) => `<li><p><strong>${escapeHtml(time)}</strong></p><h4>${escapeHtml(title)}</h4><p>${escapeHtml(note)}</p></li>`).join("")}</ol>
        <div class="group-ski-actions">${day === 5 ? `<a class="small-button map-link" href="${escapeHtml(meetingUrl)}" target="_blank" rel="noopener noreferrer">前往夜景會合點 · 開車導航</a>` : ""}<a class="small-button map-link" href="https://sapporo-moiwa.jp/access/" target="_blank" rel="noopener noreferrer">滑雪場入口與官方交通</a></div>
        <p>出發前確認當季營業、課程與租具報到入口；時間未定的項目不代表已預約。</p>
      </section>`;
  }

  function renderOverview() {
    pausePlayback();
    const days = tripDates.map((date, index) => {
      const day = index + 1;
      const places = (state.plan[day] || []).map(spotById).filter(Boolean);
      const mainPlaces = places.filter(spot => !(day === 1 && dayOneTimingDraft[spot.id]?.optional));
      const areas = [...new Set(places.map(spot => spot.area).filter(Boolean))];
      const done = mainPlaces.filter(spot => progress()[day]?.[spot.id] === "done").length;
      const skipped = mainPlaces.filter(spot => progress()[day]?.[spot.id] === "skipped").length;
      const groupRoute = getGroupRouteForDay(day, selectedGroup);
      return { day, date, places, mainPlaces, areas: groupRoute ? ["札幌"] : areas, done, skipped, groupRoute };
    });
    const cities = [
      { name: "旭川", areas: ["旭川"], x: 272, y: 106, theme: "city" },
      { name: "小樽", areas: ["小樽"], x: 98, y: 182, theme: "canal" },
      { name: "札幌", areas: ["札幌"], x: 264, y: 238, theme: "city" },
      { name: "登別・室蘭", areas: ["登別", "室蘭"], x: 264, y: 356, theme: "onsen" },
      { name: "洞爺湖", areas: ["洞爺湖", "真狩"], x: 98, y: 302, theme: "lake" },
      { name: "函館", areas: ["函館"], x: 94, y: 424, theme: "harbor" }
    ];
    host.innerHTML = `
      <header class="winter-heading winter-overview-heading"><div><p>OUR HOKKAIDO JOURNAL</p><h2 id="journey-overview-title" tabindex="-1">北海道十日總覽</h2><span>12.23 — 01.01 · 雪景、熱湯，還有想一起走的路</span></div><div class="winter-date"><strong>10</strong><span>WINTER DAYS</span></div></header>
      ${groupRouteSwitchHtml()}
      <section class="journey-overview-map" aria-label="沿途城市索引">
        <div class="winter-map-topline"><span>沿途的冬日風景</span><span>點城市查看第一個相關日</span></div>
        <svg viewBox="0 0 380 480" role="group" aria-label="北海道城市插畫索引，位置非實際地圖">
          ${scenes.defs}<rect width="380" height="480" fill="#dceef1"/>
          <path d="M175 20q40 35 90 21l62 56-13 57 37 58-38 63 8 72-53 15-47-20-38 35-18 61-44 22-71-5-10-41 44-36 16-51-43-42 22-48-16-39 49-53-15-44Z" fill="#f5f3e6" stroke="#b5ceca" stroke-width="2"/>
          <path d="M272 106 264 238 98 182 264 238 264 356 98 302 94 424" fill="none" stroke="#b4bdae" stroke-width="3" stroke-dasharray="4 8" stroke-linecap="round"/>
          ${scenes.icon("pine",184,76,.6)}${scenes.icon("pine",198,161,.5)}${scenes.icon("pine",193,284,.48)}
          ${cities.map(city => {
            const related = days.filter(day => day.areas.some(area => city.areas.some(name => area.includes(name))));
            const first = related[0];
            const selected = related.some(day => day.day === state.selectedDay);
            return `${first ? `<a href="#journey-title" role="button" data-overview-day="${first.day}" aria-label="查看${city.name}，Day ${related.map(day => day.day).join('、')}">` : '<g>'}
              <rect class="journey-map-hit-area" x="${city.x - 65}" y="${city.y - 58}" width="130" height="94" rx="18"/>
              ${scenes.icon(city.theme,city.x,city.y - 17,.58)}
              <g class="winter-city-label${selected ? ' is-selected' : ''}"><rect x="${city.x - 63}" y="${city.y + 10}" width="126" height="36" rx="12"/><text x="${city.x}" y="${city.y + 26}" text-anchor="middle">${city.name}</text><text class="winter-city-days" x="${city.x}" y="${city.y + 39}" text-anchor="middle">${related.length ? 'D' + related.map(day => day.day).join(' · D') : '旅程風景'}</text></g>
            ${first ? '</a>' : '</g>'}`;
          }).join('')}
          <g class="journey-pals-marker" aria-hidden="true">${selectedCompanions().map((pal,index) => `<image href="${pal.src}" x="${14 + index * 37}" y="36" width="32" height="40"/>`).join('')}</g>
        </svg>
        <p class="journey-map-note">城市位置為插畫示意；日期依目前行程顯示。下方選一天，開始今天的散步。</p>
      </section>
      <div class="winter-overview-caption"><h3>把十天，一頁頁收藏</h3><span>${selectedGroup === "B" ? "D5／D6 滑雪安排 · 其餘共用" : `${days.reduce((sum,day) => sum + day.places.length,0)} 個已排點位`}</span></div>
      <div class="journey-overview-days">${days.map(day => {
        const scene = scenes.days[day.day - 1];
        const theme = scene.theme === "forest" ? "mountain" : scene.theme;
        return `<button type="button" class="journey-overview-card${day.day === state.selectedDay ? ' is-selected' : ''}" data-overview-day="${day.day}" aria-label="查看 Day ${day.day} ${day.date} 的行程">
          <span class="winter-day-card-art" aria-hidden="true"><svg viewBox="0 0 300 92"><rect width="300" height="92" fill="#e6eff0"/><path d="M0 73q64-33 140-5t160-4v28H0Z" fill="#f7f6eb"/>${scenes.icon(theme,225,45,.85)}${scenes.icon('pine',34,48,.55)}<text x="65" y="44" fill="#577783" font-size="12" letter-spacing="3">DAY ${String(day.day).padStart(2,'0')}</text><text x="65" y="65" fill="#52676b" font-size="15">${escapeHtml(day.groupRoute?.title || scene.title)}</text></svg></span>
          <span class="journey-overview-card-head"><strong>Day ${day.day}</strong><span>${day.date}</span><span aria-hidden="true">↗</span></span>
          <span class="journey-overview-areas">${escapeHtml(day.areas.join(' → ') || '還沒有安排景點')}</span>
          <span class="journey-overview-stops">${day.groupRoute ? escapeHtml(day.groupRoute.route) : `${escapeHtml(day.places.slice(0,3).map(spot => spot.name).join(' · ') || '從行程編輯加入想去的地方。')}${day.places.length > 3 ? ` …另 ${day.places.length - 3} 站` : ''}`}</span>
          ${day.day === 5 && !day.groupRoute ? '<span class="journey-overview-stops">傍晚與 B 線會合看夜景，搭朋友的車回 APA。</span>' : ''}
          <span class="journey-overview-card-footer">${day.groupRoute ? `B 線 · ${day.day === 5 ? "傍晚會合／共乘回 APA" : "是否滑雪待確認"}` : `${day.places.length} 個點位${day.places.length !== day.mainPlaces.length ? ` · 含 ${day.places.length - day.mainPlaces.length} 個彈性選項` : ''}<span>已完成 ${day.done}/${day.mainPlaces.length}${day.skipped ? ` · 略過 ${day.skipped}` : ''}</span>`}</span>
        </button>`;
      }).join('')}</div>`;
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
    document.body.classList.add("winter-view-active");
    document.body.classList.toggle("winter-edit-active", mode === "edit");
    document.body.classList.toggle("winter-travel-active", mode === "travel");
    host.hidden = mode === "edit";
    host.setAttribute("aria-label", mode === "overview" ? "十日行程總覽" : "旅途中行程");
    switchButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.plannerView === mode)));
    refreshDayNavigation();
    if (host.hidden) return;
    if (mode === "overview") { renderOverview(); return; }
    if (getGroupRouteForDay(state.selectedDay, selectedGroup)) { renderSkiDay(); return; }

    const context = `${progressKey()}|${state.selectedDay}`;
    if (progressContext !== context) feedback = "";
    progressContext = context;
    const openDetails = new Set(Array.from(host.querySelectorAll("details[data-journey-details][open]")).map((item) => item.dataset.journeyDetails));
    const mapOpen = host.querySelector(".winter-route-details")?.open ?? true;
    const optionalOpen = host.querySelector(".journey-optional")?.open ?? false;
    const dayScheduleOpen = host.querySelector(".day-schedule")?.open ?? false;
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

    const scene = scenes.days[state.selectedDay - 1];
    const areas = [...new Set(ids.map(id => spotById(id).area).filter(Boolean))];
    const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][new Date(Date.UTC(2026, 11, 22 + state.selectedDay)).getUTCDay()];
    host.innerHTML = `
      <header class="winter-heading"><div><p>HOKKAIDO WINTER WALK</p><h2 id="journey-title" tabindex="-1">Day ${state.selectedDay} · ${scene.title}</h2><span>${escapeHtml(areas.join(" → ") || "今天的路線，等你來安排")}</span></div><div class="winter-date"><strong>${tripDates[state.selectedDay - 1].replace("/", ".")}</strong><span>${weekday} · 日本時間</span></div></header>
      ${state.selectedDay === 5 || state.selectedDay === 6 ? groupRouteSwitchHtml() : ""}
      ${dayDepartureHtml(state.selectedDay)}
      <section class="journey-next-card winter-focus-card" aria-labelledby="journey-next-title"></section>
      <p class="journey-feedback" role="status" aria-live="polite" ${feedback ? "" : "hidden"}>${escapeHtml(feedback)}</p>
      ${state.selectedDay >= 2 && mainIds.length ? `<section class="day-timing-draft daily-timing-draft" aria-labelledby="journey-day-timing-title">${getDayTimingDraftHtml(state.selectedDay, "journey-day-timing-title")}</section>` : ""}
      <div class="winter-day-progress"><span>已完成 ${doneCount} / ${mainIds.length} 站${skippedCount ? ` · 略過 ${skippedCount}` : ""}</span><span>進度記在此裝置</span></div>
      ${mainIds.length ? `<div class="journey-progress-track" role="progressbar" aria-label="今日處理進度，含完成與略過" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percentage}"><span style="width:${percentage}%"></span></div><details class="winter-route-details" open><summary>今天的地圖與播放 <span>${mainIds.length} 站 · 可展開／收合</span></summary>${mapHtml(mainIds, nextId)}</details>` : ""}
      <div class="winter-pals-row" role="group" aria-label="選擇同行夥伴">${companions.map(pal => `<button type="button" data-companion="${pal.id}" aria-pressed="${activeCompanions.has(pal.id)}"><img src="${pal.src}" width="23" height="26" alt="" />${pal.name}</button>`).join("")}</div>
      ${mainIds.length ? `<section class="journey-timeline-section"><h3>今天這樣走 <span>${isDayTimingDraftApplicable(state.selectedDay) ? "日本時間 · 初步試排" : "行程順序 · 停留時間參考"}</span></h3><ol class="journey-timeline">${mainIds.map((id, index) => stopHtml(id, index, nextId)).join("")}</ol></section>` : ""}
      ${optionalIds.length ? `<details class="journey-optional"><summary>有空再去 <span>${optionalIds.length} 個彈性選項</span></summary><p>隨體力與天候安排，晚到就留給下次。</p><ol class="journey-timeline">${optionalIds.map((id, index) => stopHtml(id, index, null)).join("")}</ol></details>` : ""}
      <p class="winter-footnote">北海道主題插畫，路線依目前排序，位置與距離非實際地圖。導航請點景點卡；風雪、排隊可能讓行程順延。</p>`;

    host.querySelectorAll("details[data-journey-details]").forEach((item) => { item.open = openDetails.has(item.dataset.journeyDetails); });
    const map = host.querySelector(".winter-route-details");
    if (map?.matches("details")) map.open = mapOpen;
    const optional = host.querySelector(".journey-optional");
    if (optional) optional.open = optionalOpen;
    const schedule = host.querySelector(".day-schedule");
    if (schedule) schedule.open = dayScheduleOpen;
    if (mainIds.length) paintPlayback();
    else host.querySelector(".journey-next-card").innerHTML = focusCardHtml(null);
  }

  switchButtons.forEach((button) => button.addEventListener("click", () => {
    setMode(button.dataset.plannerView);
    renderJourney();
    document.getElementById("trip-title")?.focus();
  }));

  document.getElementById("day-tabs")?.addEventListener("click", (event) => {
    if (mode === "travel" && event.target.closest("[data-day]")) host.querySelector("#journey-title")?.focus();
  });

  host.addEventListener("toggle", (event) => {
    if (event.target.matches(".winter-route-details") && !event.target.open) {
      pausePlayback();
      paintPlayback();
    }
  }, true);

  host.addEventListener("click", (event) => {
    const target = event.target;
    const groupButton = target.closest("[data-group-route]");
    if (groupButton) {
      const nextGroup = groupButton.dataset.groupRoute;
      if (!Object.hasOwn(groupRouteLabels, nextGroup)) return;
      selectedGroup = nextGroup;
      try { window.localStorage.setItem(groupRouteKey, selectedGroup); } catch { /* Keep this choice for the current visit. */ }
      renderJourney();
      host.querySelector(`[data-group-route="${selectedGroup}"]`)?.focus();
      return;
    }
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
      if (preview.dataset.previewFrom !== "timeline") host.querySelector("#journey-next-title")?.focus();
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
