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
  const travelTools = window.HOKKAIDO_TRAVEL_TOOLS;
  const viewKey = "hokkaido-planner-view";
  const progressCache = new Map();
  const validModes = ["overview", "edit", "travel"];
  const requestedView = new URLSearchParams(window.location.search).get("view");
  const savedView = readLocalStorage(viewKey);
  const groupRouteKey = "hokkaido-planner-group-route";
  let selectedGroup = readLocalStorage(groupRouteKey) === "B" ? "B" : "A";
  let mode = validModes.includes(requestedView) ? requestedView : validModes.includes(savedView) ? savedView : "overview";
  let feedback = "";
  let undoProgress = null;
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
    const context = `${mode}|${state.selectedDay}|${dayTabs?.clientWidth || 0}`;
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
  }
  function scrollDates(direction) {
    if (!dayTabs) return;
    dayTabs.scrollBy({ left: direction * Math.max(140, dayTabs.clientWidth * .8), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  previousDays?.addEventListener("click", () => scrollDates(-1));
  nextDays?.addEventListener("click", () => scrollDates(1));
  dayTabs?.addEventListener("scroll", updateDayArrows, { passive: true });
  window.addEventListener("resize", refreshDayNavigation);
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

  function dayTenRouteKey() { return `hokkaido-d10-route-${state.syncCode || "local"}`; }

  function stationRouteActive(day = state.selectedDay) {
    return day === 10 && readLocalStorage(dayTenRouteKey()) === "station" && travelTools.stationSupported(state.plan[10] || []);
  }

  function travelIds(day = state.selectedDay) {
    return travelTools.ids(day, state.plan[day] || [], stationRouteActive(day));
  }

  function travelSpot(id) { return travelTools.spot(state.selectedDay, spotById(id), stationRouteActive()); }

  function travelTiming(id) {
    return travelTools.timing(state.selectedDay, id, stationRouteActive()) || getTimingDraftForStop(state.selectedDay, id);
  }

  function routeChoiceHtml() {
    if (state.selectedDay !== 10) return "";
    const active = stationRouteActive();
    const supported = travelTools.stationSupported(state.plan[10] || []);
    return `<section class="travel-route-picker" aria-label="D10 當天路線"><div role="group" aria-label="選擇 D10 路線"><button type="button" data-day-ten-route="main" aria-pressed="${!active}">原路線</button><button type="button" data-day-ten-route="station" aria-pressed="${active}" ${supported ? "" : "disabled"}>車站備案</button></div><p>${active ? "已採用車站備案：下一站與導航已切換，不再前往朝市或元町。" : "朝市未開時可改車站備案。"} 路線選擇只存這支手機，可隨時切回；不改團員共編清單。${supported ? "" : " 此日清單已調整，請先核對備案是否適用。"}</p></section>`;
  }

  function timingNoticeHtml() {
    if (stationRouteActive() || !travelIds().length || isDayTimingDraftApplicable(state.selectedDay)) return "";
    return `<p class="travel-timing-notice" role="status"><strong>這天需重新估時</strong>：景點或順序與原規劃不同。目前只列停留參考，不代表已重算車程、用餐及抵達時刻。</p>`;
  }

  function progressKey(day = state.selectedDay) {
    return travelTools.progressKey(`hokkaido-journey-20261223-${state.syncCode || "local"}`, stationRouteActive(day));
  }

  function progress(day = state.selectedDay) {
    const key = progressKey(day);
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

  function isOptional(id, day = state.selectedDay) {
    const draft = typeof getDailyTimingDraft === "function" ? getDailyTimingDraft(day) : typeof dailyTimingDrafts === "undefined" ? null : dailyTimingDrafts[day];
    if (day === 4) return dayFourOptionalStopIds.includes(id);
    if (day === 9) return id === "hakodate-hachimangu";
    return travelTools.optional(day, id, draft, dayOneTimingDraft);
  }

  function durationText(spot) {
    const hours = /^(\d+(?:\.\d+)?)h$/.exec(spot.time);
    if (!hours) return spot.time || "時間待估";
    const minutes = Math.round(Number(hours[1]) * 60);
    return minutes ? `停留約 ${minutes} 分鐘` : "抵達點";
  }

  function timingText(spot) {
    const timing = travelTiming(spot.id);
    return timing ? `${timing.time}${timing.optional ? "" : " · 預估"}` : `${durationText(spot)} · 時段待估`;
  }

  function summaryText(spot) {
    const summaries = {
      "new-chitose-airport": "BR166 11:00 抵達，先入境、領行李，再留約 1 小時逛機場；13:15 左右前往租車櫃台。",
      "nippon-rentacar-new-chitose": "先在機場櫃台報到，再搭接駁車到營業所取車。",
      "premier-cabin-asahikawa": "機場逛街、取車後約 14:15 出發往旭川，途中補餐、休息；約 17:45 入住放行李；青池另作可略過支線，通常趕不上 17:00。",
      "aeon-mall-asahikawa-ekimae": "步行到站前 AEON，先補雪靴、防滑鞋與保暖配件。",
      "asahikawa-heiwa-dori": "在站前商店街散步、找晚餐，吃完回飯店休息。",
      hachimanzaka: "飯店步行到函館駅前，搭 5 系統往函館どつく前→末廣町（末広町）下車，再上坡拍港景；2 系統不經這站。",
      "kanemori-warehouse": "八幡坂下坡後逛金森；午餐與咖啡安排在海灣周邊，14:15 離開。",
      "hakodate-mt": "14:45 抵達山麓站為目標，預留排隊；下午上山看日景轉夜景，17:00 開始下山。",
      "hakodate-gokoku-shrine": "晚餐後先回飯店休息；僅在午夜開放及往返車輛確認後，23:15 左右搭車前往。",
      "morning-market": "朝市有開才去；未開改函館站內備案，取代元町往返。退房帶著行李去車站採買、吃午餐，13:10 前到機場巴士乘車處。",
      motomachi: "10:15 前退房寄行李；函館駅前搭 2 往谷地頭／5 往函館どつく前→十字街下車。11:45 折返，搭往湯の川→函館駅前。",
      "hakodate-station-airport-bus": "12:15 回 La'gent Stay 取行李，最晚 13:10 到函館站前巴士總站 11 號乘車處。13:30 目標班次待確認；不符就改搭計程車。",
      "hakodate-airport": "14:10 前後到國際線 1F 為目標；JX861 18:00 起飛，星宇櫃檯一般 15:30 開始、17:00 截止報到。"
    };
    const timing = travelTiming(spot.id);
    if (stationRouteActive() && timing) return timing.note;
    if (timing && summaries[spot.id]) return summaries[spot.id];
    if (timing?.note) return timing.note;
    return spot.best || spot.desc;
  }

  function navigationFor(id) {
    if (stationRouteActive()) {
      const destinations = {
        "hokkaido-shikisai-hakodate": "JR函館駅 正面入口 函館市若松町12-13",
        "hakodate-station-airport-bus": "函館駅前 バスターミナル 11番のりば"
      };
      if (destinations[id]) return { url: daySixStepUrl({ destination: destinations[id], mode: "walking" }), label: "步行導航", mode: "walking" };
    }
    const index = (state.plan[state.selectedDay] || []).indexOf(id);
    const nav = getStopNavigation(state.selectedDay, index, spotById(id));
    return { ...nav, url: nav.boardingUrl || nav.url, label: nav.boardingLabel || (nav.label === "地圖" ? "開啟地圖" : nav.label) };
  }

  function companionGroupTransform(x, y) {
    const width = 32;
    const count = companions.length;
    const groupWidth = count * width + (count - 1) * 6;
    const left = Math.max(8, Math.min(380 - groupWidth - 8, x - groupWidth / 2));
    return `translate(${left} ${y - 78})`;
  }

  function mapCompanionsHtml() {
    const pals = companions;
    const point = activeMapPoint(0);
    const width = 32;
    const height = 40;
    return `<g data-pals-marker class="journey-pals-marker" transform="${companionGroupTransform(point.x, point.y)}" aria-hidden="true">${pals.map((pal, index) => `<g data-map-companion="${pal.id}" transform="translate(${index * (width + 6)} 0)"><g class="journey-pal-motion motion-${pal.id}"><image class="journey-pal-${pal.id}" href="${pal.src}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" /></g></g>`).join("")}</g>`;
  }

  function playbackOrigin(ids) {
    const baseDeparture = dayDepartures[state.selectedDay];
    const departure = stationRouteActive() && baseDeparture ? { ...baseDeparture, note: "先吃早餐，09:15 開始整理，10:00 前退房後帶著全部行李步行到函館站，採買、用餐與休息；13:10 前到站前巴士乘車處。" } : baseDeparture;
    if (!departure || !ids.length) return null;
    return { id: `day-${state.selectedDay}-departure`, name: departure.name,
      shortName: departure.hotel.note, type: "飯店出發", departure };
  }

  function playbackSpot(id) {
    return id === playback?.origin?.id ? playback.origin : travelSpot(id);
  }

  function nextPlaybackStop() {
    return playback?.stops.find(stop => !stop.origin && statusFor(stop.id) === "pending");
  }

  function createPlayback(ids) {
    const origin = playbackOrigin(ids);
    const timed = state.selectedDay === 1 && isDayOneTimingDraftApplicable()
      && ids.every((id) => /^\d{2}:\d{2}–\d{2}:\d{2}$/.test(dayOneTimingDraft[id]?.time || ""));
    const stops = ids.map((id, index) => {
      const time = timed && /^(\d{2}):(\d{2})–(\d{2}):(\d{2})$/.exec(dayOneTimingDraft[id]?.time || "");
      return time ? { id, start: Number(time[1]) * 60 + Number(time[2]), end: Number(time[3]) * 60 + Number(time[4]) }
        : { id, start: (index + (origin ? 1 : 0)) * 100, end: (index + (origin ? 1 : 0)) * 100 };
    });
    if (origin) stops.unshift({ id: origin.id, start: 0, end: 0, origin: true });
    return { stops, origin, timed, winter: state.selectedDay === 1 && ids.length > 0 && ids.every((id) => winterStops[id]), min: stops[0]?.start || 0, max: Math.max((stops.at(-1)?.end || 0), (stops[0]?.start || 0) + 1) };
  }

  function timeLabel(value) {
    return `${String(Math.floor(value / 60) % 24).padStart(2, "0")}:${String(Math.floor(value) % 60).padStart(2, "0")}`;
  }

  function playbackPosition() {
    if (!playback?.stops.length) return null;
    const actualNext = nextPlaybackStop();
    const initialPosition = playback.origin && actualNext === playback.stops[1] ? playback.min : actualNext?.start;
    const position = Math.max(playback.min, Math.min(playback.max, previewPosition ?? initialPosition ?? playback.max));
    if (!playback.timed) {
      const index = Math.min(playback.stops.length - 1, Math.floor(position / 100));
      return { position, id: playback.stops[index].id, from: index, to: Math.min(index + 1, playback.stops.length - 1), fraction: (position % 100) / 100, moving: false, label: playback.stops[index].origin ? "出發點" : `第 ${index + (playback.origin ? 0 : 1)} 站` };
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
    if (id && id === playback?.origin?.id) {
      const origin = playback.origin;
      return `<div class="winter-focus-top"><span class="winter-focus-eyebrow">今天從這裡出發</span><span>${escapeHtml(origin.departure.time)} · 日本時間</span></div>
        <h3 id="journey-next-title" tabindex="-1">${escapeHtml(origin.name)}</h3>
        <p class="winter-focus-summary">${escapeHtml(origin.departure.note || (origin.departure.checkout ? "退房、帶齊行李後，前往今天第一站。" : "從飯店出發，遊覽後回同一間飯店休息。"))}</p>
        <div class="winter-focus-actions"><a href="${escapeHtml(getAccommodationMapUrl(origin.departure.hotel))}" target="_blank" rel="noopener noreferrer">↗ 飯店地圖</a></div>
        <button type="button" class="winter-return" data-player-return>↶ 回到實際進度</button>`;
    }
    const spot = travelSpot(id);
    if (!spot) {
      const hasMainStops = Boolean(playback?.stops.length);
      return `<p class="winter-focus-eyebrow">${hasMainStops ? "今天的主要安排已結束" : "今天還沒有主要行程"}</p><h3 id="journey-next-title" tabindex="-1">${hasMainStops ? (state.selectedDay === 10 ? "把回憶帶回家，旅途平安" : "慢慢休息，明天再出發") : "先挑幾個想去的地方"}</h3><p>${hasMainStops ? "可以回顧今天走過的地方，也可以隨體力看看彈性選項。" : "從右上角「更多」選擇編輯行程，加入想去的景點。"}</p>`;
    }
    const preview = previewPosition !== null;
    const nav = navigationFor(id);
    const logistics = stationRouteActive() && id === "lagent-hakodate-ekimae" ? null : getSpotLogistics(id);
    const transportGuide = daySixTransportHtml(state.selectedDay, (state.plan[state.selectedDay] || []).indexOf(id), id);
    return `<div class="winter-focus-top"><span class="winter-focus-eyebrow">${preview ? "正在預覽這一站" : "接下來去哪裡"}</span><span>${escapeHtml(timingText(spot))}</span></div>
      <h3 id="journey-next-title" tabindex="-1">${escapeHtml(spot.name)}</h3><p class="winter-focus-summary">${escapeHtml(summaryText(spot))}</p>

      <div class="winter-focus-actions">${nav.beforeUrl ? `<a href="${escapeHtml(nav.beforeUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(nav.beforeLabel)}</a>` : ""}<a href="${escapeHtml(nav.url)}" target="_blank" rel="noopener noreferrer">↗ ${nav.label}</a><button type="button" data-winter-info aria-expanded="false" aria-controls="winter-focus-info">查看詳情 ⌄</button></div>
      ${transportGuide}
      ${dayTenMorningBackupHtml(state.selectedDay, id)}
      ${state.selectedDay === 10 && id === "hakodate-station-airport-bus" ? airportBusTimetableHtml() : ""}
      <div id="winter-focus-info" class="winter-focus-info" hidden>${nav.note ? `<p>${escapeHtml(nav.note)}</p>` : ""}${id === "morning-market" ? "" : `<p>${escapeHtml(spot.desc)}</p>`}${transportGuide || stationRouteActive() || id === "morning-market" ? "" : `<p>${escapeHtml(getDriveInfoForStop(state.selectedDay, (state.plan[state.selectedDay] || []).indexOf(id), id))}</p>`}${plannedDrivingRouteHtml(state.selectedDay, (state.plan[state.selectedDay] || []).indexOf(id), id)}${logistics?.hours ? `<p><strong>開放／營業：</strong>${escapeHtml(logistics.hours)}</p>` : ""}${logistics?.tickets ? `<p><strong>票券：</strong>${escapeHtml(logistics.tickets)}</p>` : ""}</div>
      ${preview ? `<button type="button" class="winter-return" data-player-return>↶ 回到實際進度</button>` : `<div class="formal-stop-actions"><button type="button" data-journey-status="done" data-journey-id="${id}">✓ 完成，前往下一站</button><button type="button" data-journey-status="skipped" data-journey-id="${id}">略過</button></div>`}`;
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
    const actualNext = nextPlaybackStop()?.id;
    const cardId = previewPosition === null ? actualNext : position.id;
    const cardKey = `${cardId}|${previewPosition === null}`;
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
    if (caption) caption.textContent = `${position.moving ? "前往 " : ""}${playbackSpot(position.id).name}`;
    const slider = host.querySelector("[data-player-slider]");
    const percent = (position.position - playback.min) / (playback.max - playback.min) * 100;
    if (slider) {
      slider.value = String(position.position);
      slider.setAttribute("aria-valuetext", `${position.label} ${position.moving ? "前往" : ""}${playbackSpot(position.id).name}`);
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
    const mapIds = playback.stops.map(stop => stop.id);
    const { points, segments, path } = routeGeometry(mapIds);
    const height = playback.winter ? 394 : Math.ceil(mapIds.length / 2) * 150 + 120;
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
          const origin = point.id === playback.origin?.id;
          const spot = playbackSpot(point.id);
          const status = origin ? "departure" : statusFor(point.id);
          const draft = origin ? null : travelTiming(point.id);
          const stopNumber = index + (playback.origin ? 0 : 1);
          const prefix = origin ? "出發 ·" : draft && playback.timed ? draft.time.slice(0,5) : `${stopNumber} ·`;
          const name = origin ? spot.shortName : point.label || shortNames[point.id] || Array.from(spot.name).slice(0, 6).join("") + (Array.from(spot.name).length > 6 ? "…" : "");
          return `<a href="#journey-next-title" role="button" data-preview-stop="${point.id}" aria-label="預覽${escapeHtml(spot.name)}">
            ${!playback.winter ? scenes.icon(origin ? "city" : scenes.spotIcon(spot), point.x, point.y - 27, .48) : ""}
            <rect class="journey-map-hit-area" x="${point.x - 32}" y="${point.y - 32}" width="64" height="64" rx="22" />
            <g data-map-stop="${point.id}" class="journey-map-stop winter-stop ${point.id === nextId ? "is-next" : ""} is-${status}">
              <circle cx="${point.x}" cy="${point.y}" r="12" /><text x="${point.x}" y="${point.y + 4}" text-anchor="middle" class="winter-stop-number">${origin ? "起" : status === "done" ? "✓" : status === "skipped" ? "↷" : stopNumber}</text>
              <rect x="${point.lx}" y="${point.ly}" width="${point.width}" height="28" rx="14" />
              <text x="${point.lx + point.width / 2}" y="${point.ly + 18}" text-anchor="middle" class="winter-stop-label${playback.winter ? " is-day-one" : ""}">${prefix} ${escapeHtml(name)}</text>
            </g></a>`;
        }).join("")}
        ${!playback.winter ? mapCompanionsHtml() : ""}
      </svg>
      <div class="journey-playback" id="journey-playback"><div class="journey-playback-caption"><strong data-player-time></strong><span data-player-caption></span></div>
        <div class="journey-playback-controls"><button type="button" data-player-toggle aria-label="播放行程" aria-pressed="false">▶</button><input type="range" data-player-slider aria-label="行程播放進度" min="${playback.min}" max="${playback.max}" step="0.1" value="${playback.min}" /><button type="button" data-player-speed aria-label="切換播放速度">×1</button></div>
        <p class="winter-player-note">${playback.timed ? "日本時間" : "依行程順序預覽"} · 預覽不會改動完成紀錄</p>
      </div></section>`;
  }

  function stopHtml(id, index, nextId) {
    const spot = travelSpot(id);
    const status = statusFor(id);
    const nav = navigationFor(id);
    const logistics = stationRouteActive() && id === "lagent-hakodate-ekimae" ? null : getSpotLogistics(id);
    const timing = travelTiming(id);
    const transportGuide = daySixTransportHtml(state.selectedDay, (state.plan[state.selectedDay] || []).indexOf(id), id);
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
            ${id === "morning-market" ? "" : `<p>${escapeHtml(spot.desc)}</p>`}
            ${timing && !transportGuide && !stationRouteActive() && id !== "morning-market" && timing.note !== spot.desc ? `<p>${escapeHtml(timing.note)}</p>` : ""}
            ${transportGuide}
            ${dayTenMorningBackupHtml(state.selectedDay, id)}
            ${plannedDrivingRouteHtml(state.selectedDay, (state.plan[state.selectedDay] || []).indexOf(id), id)}
            ${logistics?.hours ? `<p><strong>開放：</strong>${escapeHtml(logistics.hours)}</p>` : ""}
            ${logistics?.tickets ? `<p><strong>票券：</strong>${escapeHtml(logistics.tickets)}</p>` : ""}
            ${state.selectedDay === 10 && id === "hakodate-station-airport-bus" ? airportBusTimetableHtml() : ""}
            <div class="journey-row-actions">
              ${nav.beforeUrl ? `<a class="small-button map-link" href="${escapeHtml(nav.beforeUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(nav.beforeLabel)}</a>` : ""}
              <a class="small-button map-link" href="${escapeHtml(nav.url)}" target="_blank" rel="noopener noreferrer">${nav.label}</a>
              <button class="small-button" type="button" data-journey-status="${status === "pending" ? "done" : "pending"}" data-journey-id="${escapeHtml(id)}">${status === "pending" ? "標為完成" : "改回待出發"}</button>
              ${status === "pending" ? `<button class="small-button" type="button" data-journey-status="skipped" data-journey-id="${escapeHtml(id)}">略過</button>` : ""}
            </div>
          </div>
        </details>
      </li>`;
  }

  function timelineHtml(ids, nextId) {
    const lunchIndex = state.selectedDay === 3 ? getDayThreeLunchInsertionIndex(ids) : getDayTwoLunchInsertionIndex(ids);
    const dinnerIndex = getDayTwoDinnerInsertionIndex(ids);
    const lunchHtml = () => `<li class="journey-lunch-choice">${state.selectedDay === 3 ? dayThreeLunchOptionsHtml() : dayTwoLunchOptionsHtml()}</li>`;
    const dinnerHtml = () => `<li class="journey-lunch-choice">${dayTwoDinnerOptionsHtml()}</li>`;
    return ids.map((id, index) => `${index === lunchIndex ? lunchHtml() : ""}${index === dinnerIndex ? dinnerHtml() : ""}${stopHtml(id, index, nextId)}`).join("")
      + (lunchIndex === ids.length ? lunchHtml() : "") + (dinnerIndex === ids.length ? dinnerHtml() : "");
  }

  function japanClock() {
    return new Intl.DateTimeFormat("zh-TW", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
  }

  function groupRouteSwitchHtml() {
    const description = mode === "overview"
      ? "D5 約 16:00 白色戀人公園會合；D6 分組行動。其他日期一起走。"
      : state.selectedDay === 5
        ? (selectedGroup === "A" ? "D5 A 線市區觀光，下午搭地鐵去白色戀人公園。" : "D5 B 線自駕滑雪，15:00 從滑雪場出發。") + " 約 16:00 公園入口會合，逛完一起搭車回 APA。"
        : (selectedGroup === "A" ? "D6 A 線市區觀光。" : "D6 B 線自行開車滑雪；結束後回 APA、另約晚餐。");
    return `<section class="group-route-picker" aria-label="分組路線">
      <div class="group-route-switch" role="group" aria-label="選擇要查看的路線">${Object.entries(groupRouteLabels).map(([group, label]) => `<button type="button" data-group-route="${group}" aria-pressed="${selectedGroup === group}">${escapeHtml(label)}</button>`).join("")}</div>
      <p>${escapeHtml(description)}</p>
    </section>`;
  }

  function renderSkiDay() {
    pausePlayback();
    playback = null;
    previewPosition = null;
    const day = state.selectedDay;
    const route = getGroupRouteForDay(day, selectedGroup);
    host.innerHTML = `<header class="winter-heading"><div><p>HOKKAIDO WINTER WALK</p><h2 id="journey-title" tabindex="-1">Day ${day} · ${escapeHtml(route.title)}</h2><span>B 滑雪 · 札幌</span></div><div class="winter-date"><strong>${tripDates[day - 1].replace("/", ".")}</strong><span>日本時間</span></div></header>
      ${groupRouteSwitchHtml()}
      ${typeof dayWeatherSwapHtml === "function" ? dayWeatherSwapHtml() : ""}
      ${dayDepartureHtml(day, "B")}
      <section class="day-timing-draft group-ski-day" aria-labelledby="ski-route-title">
        <h3 id="ski-route-title">B 線 · ${escapeHtml(route.title)}</h3>
        <p class="day-schedule-route">${escapeHtml(route.route)}</p>
        <ol class="group-ski-stages">${route.stages.map(([time, title, note]) => `<li><p><strong>${escapeHtml(time)}</strong></p><h4>${escapeHtml(title)}</h4><p>${escapeHtml(note)}</p></li>`).join("")}</ol>
        <div class="group-ski-actions"><a class="small-button map-link" href="https://sapporo-moiwa.jp/access/" target="_blank" rel="noopener noreferrer">滑雪場入口與官方交通</a></div>
        <p>出發前確認當季營業、課程與租具報到入口；時間未定的項目不代表已預約。</p>
      </section>`;
  }

  function renderOverview() {
    pausePlayback();
    function highlights(places) {
      const route = places.filter(spot => !["入住飯店", "取車"].includes(spot.type));
      const pool = route.length ? route : places;
      if (pool.length <= 3) return pool;
      const featured = new Set(["otaru-tenguyama", "otaru-canal", "moiwa-yama", "goryokaku-tower", "hakodate-mt", "pokemon-center-sapporo", "ningle-terrace", "shiroi-koibito-park"]);
      const chosen = new Set([pool[0].id]);
      pool.filter(spot => featured.has(spot.id)).slice(0, 2).forEach(spot => chosen.add(spot.id));
      if (chosen.size < 3) chosen.add(pool[pool.length - 1].id);
      if (chosen.size < 3) chosen.add(pool[Math.floor((pool.length - 1) / 2)].id);
      return pool.filter(spot => chosen.has(spot.id));
    }
    const shortNames = {
      "sapporo-beer-museum": "啤酒博物館", "toriton-kita8": "Toriton 壽司", "ramen-haruka": "拉麵悠",
      "otaru-tenguyama": "天狗山", "otaru-canal": "小樽運河", "hokkaido-shrine": "北海道神宮",
      "shiroi-koibito-park": "白色戀人公園", "moiwa-yama": "藻岩山夜景", "pokemon-center-sapporo": "寶可夢中心",
      "goryokaku-tower": "五稜郭塔", "lucky-pierrot-goryokaku": "小丑漢堡", "hakodate-mt": "函館山",
      "hakodate-station-airport-bus": "機場巴士", "new-chitose-airport": "新千歲機場", "hakodate-airport": "函館機場",
      "aeon-mall-asahikawa-ekimae": "站前 AEON", "asahikawa-heiwa-dori": "平和通買物公園"
    };
    const days = tripDates.map((date, index) => {
      const day = index + 1;
      const places = travelIds(day).map(id => travelTools.spot(day, spotById(id), stationRouteActive(day))).filter(Boolean);
      const mainPlaces = places.filter(spot => !isOptional(spot.id, day));
      const areas = [...new Set(places.map(spot => spot.area).filter(Boolean))];
      const done = mainPlaces.filter(spot => progress(day)[day]?.[spot.id] === "done").length;
      const skipped = mainPlaces.filter(spot => progress(day)[day]?.[spot.id] === "skipped").length;
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
    const overviewMap = `      <section class="journey-overview-map" aria-label="沿途城市索引">
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
          <g class="journey-pals-marker" aria-hidden="true">${companions.map((pal,index) => `<image href="${pal.src}" x="${14 + index * 37}" y="36" width="32" height="40"/>`).join('')}</g>
        </svg>
        <p class="journey-map-note">城市位置為插畫示意；日期依目前行程顯示。點選城市可查看相關行程。</p>
      </section>`;
    host.innerHTML = `
      <header class="winter-heading winter-overview-heading"><div><p>HOKKAIDO WINTER WALK</p><h2 id="journey-overview-title" tabindex="-1">北海道十日總覽</h2><span>12/23 — 1/1 · 選一天，查看路線與導航</span></div></header>
      ${window.HOKKAIDO_DEPARTURE_PREP?.html() || ""}
      ${groupRouteSwitchHtml()}
      <div class="journey-overview-days formal-overview-days">${days.map(day => {
        const scene = scenes.days[day.day - 1];
        const featured = highlights(day.mainPlaces);
        return `<button type="button" class="journey-overview-card${day.day === state.selectedDay ? ' is-selected' : ''}" data-overview-day="${day.day}" aria-label="查看 Day ${day.day} ${day.date} 的行程">
          <span class="formal-day-badge"><strong>D${day.day}</strong><span>${day.date}</span></span>
          <span class="formal-day-summary"><strong>${escapeHtml(day.groupRoute?.title || scene.title)}</strong><span>${escapeHtml(day.groupRoute ? day.groupRoute.route : featured.map(spot => shortNames[spot.id] || spot.name.replace(/（.*?）|\(.*?\)/g, '')).join(' → ') || '尚未安排')}${!day.groupRoute && day.mainPlaces.length > featured.length ? ` · 另 ${day.mainPlaces.length - featured.length} 站` : ''}</span></span>
          <span class="formal-day-arrow" aria-hidden="true">›</span>
        </button>`;
      }).join('')}</div>
      <details class="formal-overview-map"><summary>查看旅程地圖</summary>${overviewMap}</details>`;
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
    if (progressContext !== context) { feedback = ""; undoProgress = null; }
    const sameDay = progressContext === context;
    progressContext = context;
    const openDetails = new Set(Array.from(host.querySelectorAll("details[data-journey-details][open]")).map((item) => item.dataset.journeyDetails));
    const mapOpen = sameDay && (host.querySelector(".winter-route-details")?.open ?? false);
    const optionalOpen = sameDay && (host.querySelector(".journey-optional")?.open ?? false);
    const ids = travelIds().filter((id) => spotById(id));
    const mainIds = ids.filter((id) => !isOptional(id));
    const optionalIds = ids.filter(id => isOptional(id));
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

    const scene = scenes.days[state.selectedDay - 1];
    const areas = [...new Set(ids.map(id => spotById(id).area).filter(Boolean))];
    const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][new Date(Date.UTC(2026, 11, 22 + state.selectedDay)).getUTCDay()];
    host.innerHTML = `
      <header class="winter-heading"><div><p>HOKKAIDO WINTER WALK</p><h2 id="journey-title" tabindex="-1">Day ${state.selectedDay} · ${scene.title}</h2><span>${escapeHtml(areas.join(" → ") || "今天的路線，等你來安排")}</span></div><div class="winter-date"><strong>${tripDates[state.selectedDay - 1].replace("/", ".")}</strong><span>${weekday} · 日本時間</span></div></header>
      ${dayFlightHtml(state.selectedDay, "journey")}
      ${getGroupRouteForDay(state.selectedDay, "B") ? groupRouteSwitchHtml() : ""}
      ${routeChoiceHtml()}
      ${typeof dayWeatherSwapHtml === "function" ? dayWeatherSwapHtml() : ""}
      <section class="journey-next-card winter-focus-card" aria-labelledby="journey-next-title"></section>
      <div class="journey-feedback" role="status" aria-live="polite" ${feedback ? "" : "hidden"}><span>${escapeHtml(feedback)}</span>${undoProgress ? `<button type="button" class="small-button" data-journey-undo>復原剛才操作</button>` : ""}</div>
      ${dayDepartures[state.selectedDay] ? `<details class="formal-departure"><summary>出發：${escapeHtml(dayDepartures[state.selectedDay].name)}</summary>${stationRouteActive() ? `<p>${escapeHtml(playback.origin.departure.note)}</p>` : dayDepartureHtml(state.selectedDay)}</details>` : ""}
      <div class="winter-day-progress"><span>已完成 ${doneCount} / ${mainIds.length} 站${skippedCount ? ` · 略過 ${skippedCount}` : ""}</span><span>共 ${mainIds.length} 站</span></div>
      <p class="travel-scope-note">行程可共編同步；完成／略過進度只存這支手機。</p>
      ${timingNoticeHtml()}
      ${mainIds.length ? `<section class="journey-timeline-section"><h3>今天這樣走 <span>依序前往 · 時間為預估</span></h3><ol class="journey-timeline">${timelineHtml(mainIds, nextId)}</ol></section>` : ""}
      ${mainIds.length ? `<details class="winter-route-details"><summary>路線地圖與播放 <span>點開查看</span></summary>${mapHtml(mainIds, nextId)}</details>` : ""}
      ${optionalIds.length ? `<details class="journey-optional"><summary>有空再去 <span>${optionalIds.length} 個彈性選項</span></summary><p>隨體力與天候安排，晚到就留給下次。</p><ol class="journey-timeline">${optionalIds.map((id, index) => stopHtml(id, index, null)).join("")}</ol></details>` : ""}
      <p class="winter-footnote">時間為預估，依天候與現場情況調整。</p>`;

    host.querySelectorAll("details[data-journey-details]").forEach((item) => { item.open = openDetails.has(item.dataset.journeyDetails); });
    const map = host.querySelector(".winter-route-details");
    if (map?.matches("details")) map.open = mapOpen;
    const optional = host.querySelector(".journey-optional");
    if (optional) optional.open = optionalOpen;
    if ([2, 3].includes(state.selectedDay)) bindDayOptionButtons(host, state.selectedDay, dayOptionalSpots[state.selectedDay]);
    const flightPanel = host.querySelector(".day-flight-panel");
    if (flightPanel) bindDisclosures(flightPanel);
    if (mainIds.length) paintPlayback();
    else host.querySelector(".journey-next-card").innerHTML = focusCardHtml(null);
  }

  switchButtons.forEach((button) => button.addEventListener("click", () => {
    button.closest("details")?.removeAttribute("open");
    setMode(button.dataset.plannerView);
    renderJourney();
    document.getElementById("trip-title")?.focus();
  }));

  const menu = document.getElementById("planner-menu");
  document.addEventListener("click", event => {
    if (menu?.open && (!menu.contains(event.target) || event.target.closest("a"))) menu.open = false;
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menu?.open) {
      menu.open = false;
      menu.querySelector("summary")?.focus();
    }
  });

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
    const weatherButton = target.closest("[data-weather-swap-mode]");
    if (weatherButton) { applyDayWeatherSwap(weatherButton.dataset.weatherSwapMode); return; }
    const routeButton = target.closest("[data-day-ten-route]");
    if (routeButton) {
      if (state.selectedDay !== 10 || !["main", "station"].includes(routeButton.dataset.dayTenRoute)) return;
      if (routeButton.dataset.dayTenRoute === "station" && !travelTools.stationSupported(state.plan[10] || [])) return;
      try { window.localStorage.setItem(dayTenRouteKey(), routeButton.dataset.dayTenRoute); }
      catch { feedback = "此裝置無法保存路線選擇，請確認瀏覽器允許儲存。"; renderJourney(); return; }
      pausePlayback(); previewPosition = null; undoProgress = null;
      renderJourney();
      host.querySelector("#journey-title")?.focus({ preventScroll: true });
      return;
    }
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
      if (preview.dataset.previewFrom !== "timeline") {
        previewStop(preview.dataset.previewStop);
        host.querySelector("#journey-next-title")?.focus();
      }
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
    const undo = target.closest("[data-journey-undo]") ? undoProgress : null;
    const button = target.closest("[data-journey-status]");
    if (!button && !undo) return;
    if (undo && (undo.day !== state.selectedDay || undo.key !== progressKey())) return;
    const id = undo ? undo.id : button.dataset.journeyId;
    const status = undo ? undo.status : button.dataset.journeyStatus;
    if (!travelIds().includes(id) || !["pending", "done", "skipped"].includes(status)) return;
    pausePlayback();
    previewPosition = null;
    const saved = progress();
    saved[state.selectedDay] ||= {};
    undoProgress = undo ? null : { day: state.selectedDay, key: progressKey(), id, status: saved[state.selectedDay][id] || "pending" };
    if (status === "pending") delete saved[state.selectedDay][id];
    else saved[state.selectedDay][id] = status;
    feedback = `「${travelSpot(id).name}」${status === "done" ? "已完成" : status === "skipped" ? "已略過" : "已改回待出發"}。`;
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
    if (event.key === dayTenRouteKey()) { renderJourney(); return; }
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
