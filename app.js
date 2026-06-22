const spots = [
  {
    id: "hokkaido-shrine",
    name: "北海道神宮",
    area: "札幌",
    type: "神社散步",
    season: ["winter"],
    time: "1.5h",
    best: "初詣、雪景、安靜感",
    desc: "冬天很適合放在行程前段，先把北海道的節奏慢慢打開。",
    highlight: "開場地點"
  },
  {
    id: "sapporo-odori",
    name: "大通公園",
    area: "札幌",
    type: "城市散步",
    season: ["winter"],
    time: "1.5h",
    best: "雪祭、城市夜景",
    desc: "適合當作抵達北海道後的第一個節奏點，白天走逛，晚上看燈景。",
    highlight: "雪祭核心區"
  },
  {
    id: "shiroi-koibito-park",
    name: "白色戀人公園",
    area: "札幌",
    type: "觀光工廠",
    season: ["winter"],
    time: "2h",
    best: "甜點、拍照、伴手禮",
    desc: "很適合放在札幌市區日，讓第一天或最後一天都比較有收尾感。",
    highlight: "甜點代表"
  },
  {
    id: "sapporo-susukino",
    name: "薄野美食街",
    area: "札幌",
    type: "美食",
    season: ["winter"],
    time: "2h",
    best: "拉麵、海鮮、居酒屋",
    desc: "把晚餐時間留給這裡最剛好，能把札幌的夜生活一次收進來。",
    highlight: "深夜食堂"
  },
  {
    id: "otaru-canal",
    name: "小樽運河",
    area: "小樽",
    type: "經典景點",
    season: ["winter"],
    time: "2h",
    best: "燈光、運河、倉庫群",
    desc: "適合排在中午到傍晚，光線柔和時最有畫面感。",
    highlight: "必拍地標"
  },
  {
    id: "otaru-sakaimachi",
    name: "堺町通",
    area: "小樽",
    type: "街區散步",
    season: ["winter"],
    time: "2.5h",
    best: "甜點、玻璃工藝、伴手禮",
    desc: "如果你喜歡慢慢逛，這條街可以把甜點和小店安排成一整個下午。",
    highlight: "散步感滿分"
  },
  {
    id: "jozankei-onsen",
    name: "定山溪溫泉",
    area: "札幌郊外",
    type: "溫泉",
    season: ["winter"],
    time: "半日",
    best: "泡湯、山谷、放空",
    desc: "行程中段塞一個溫泉，讓整趟旅程從觀光切換成休息模式。",
    highlight: "修復體力"
  },
  {
    id: "moiwa-yama",
    name: "藻岩山夜景",
    area: "札幌",
    type: "夜景",
    season: ["winter"],
    time: "2h",
    best: "夜景、城市輪廓、傍晚",
    desc: "很適合接在溫泉日後面，用夜景把整天的節奏收住。",
    highlight: "城市夜色"
  },
  {
    id: "niseko-mt",
    name: "新雪谷",
    area: "西部山區",
    type: "雪地活動",
    season: ["winter"],
    time: "全天",
    best: "滑雪、粉雪、山景",
    desc: "冬季核心牌，適合安排成一整天的重點站，節奏會非常純粹。",
    highlight: "粉雪主場"
  },
  {
    id: "asahiyama-zoo",
    name: "旭山動物園",
    area: "旭川",
    type: "親子景點",
    season: ["winter"],
    time: "半日",
    best: "企鵝散步、動物展示",
    desc: "冬天最適合把這裡排進來，企鵝散步的畫面很有北海道感。",
    highlight: "冬季企鵝"
  },
  {
    id: "furano-field",
    name: "富良野雪原",
    area: "富良野",
    type: "自然風景",
    season: ["winter"],
    time: "2.5h",
    best: "雪原、農場、慢旅行",
    desc: "冬天的富良野不是花海，而是大片安靜的雪景，非常適合慢慢拍。",
    highlight: "白色風景"
  },
  {
    id: "biei-blue",
    name: "美瑛青池",
    area: "美瑛",
    type: "自然奇景",
    season: ["winter"],
    time: "1.5h",
    best: "藍色湖面、樹影、靜謐感",
    desc: "很適合搭配富良野一起走，形成一條很完整的冬季景觀路線。",
    highlight: "藍色名景"
  },
  {
    id: "toyako-lake",
    name: "洞爺湖",
    area: "洞爺湖",
    type: "湖景",
    season: ["winter"],
    time: "半日",
    best: "湖景、山景、溫泉飯店",
    desc: "適合放進慢步調的一天，把移動與住宿節奏拉得更舒服。",
    highlight: "住一晚很棒"
  },
  {
    id: "noboribetsu-valley",
    name: "登別地獄谷",
    area: "登別",
    type: "地熱景觀",
    season: ["winter"],
    time: "2h",
    best: "地熱、溫泉、煙霧感",
    desc: "如果你想把冬季行程拉得更有特色，這裡非常適合和溫泉旅館搭配。",
    highlight: "地熱名所"
  },
  {
    id: "morning-market",
    name: "函館朝市",
    area: "函館",
    type: "海鮮早餐",
    season: ["winter"],
    time: "1.5h",
    best: "海鮮丼、早餐、在地味",
    desc: "早上排這裡很順，適合把北海道的海味從第一餐就拉滿。",
    highlight: "早餐首選"
  },
  {
    id: "hakodate-mt",
    name: "函館山夜景",
    area: "函館",
    type: "夜景",
    season: ["winter"],
    time: "2h",
    best: "夜景、海港、收尾感",
    desc: "如果你打算南北串遊，函館山非常適合當整趟旅行的收尾。",
    highlight: "壓軸夜景"
  }
];

const winterTemplate = {
  1: ["hokkaido-shrine", "sapporo-odori", "shiroi-koibito-park", "sapporo-susukino"],
  2: ["otaru-canal", "otaru-sakaimachi"],
  3: ["jozankei-onsen", "moiwa-yama"],
  4: ["niseko-mt"],
  5: ["asahiyama-zoo"],
  6: ["furano-field", "biei-blue"],
  7: ["toyako-lake"],
  8: ["noboribetsu-valley"],
  9: ["morning-market"],
  10: ["hakodate-mt"]
};

const winterProfile = {
  label: "冬季限定",
  blurb: "雪景、溫泉、夜景",
  weather: "雪天、冷風、熱湯",
  route: "札幌核心，向小樽與函館延伸",
  style: "冬季限定"
};

function buildPlan() {
  return {
    1: [...winterTemplate[1]],
    2: [...winterTemplate[2]],
    3: [...winterTemplate[3]],
    4: [...winterTemplate[4]],
    5: [...winterTemplate[5]],
    6: [...winterTemplate[6]],
    7: [...winterTemplate[7]],
    8: [...winterTemplate[8]],
    9: [...winterTemplate[9]],
    10: [...winterTemplate[10]]
  };
}

const state = {
  selectedDay: 1,
  search: "",
  focusId: spots[0].id,
  plan: buildPlan()
};

const dom = {
  searchInput: document.getElementById("search-input"),
  dayTabs: document.getElementById("day-tabs"),
  itineraryList: document.getElementById("itinerary-list"),
  spotGrid: document.getElementById("spot-grid"),
  dayNote: document.getElementById("day-note"),
  metricDays: document.getElementById("metric-days"),
  metricSpots: document.getElementById("metric-spots"),
  metricSeason: document.getElementById("metric-season"),
  focusArea: document.getElementById("focus-area"),
  focusCopy: document.getElementById("focus-copy"),
  styleValue: document.getElementById("style-value"),
  routeValue: document.getElementById("route-value"),
  weatherValue: document.getElementById("weather-value"),
  updatedValue: document.getElementById("updated-value"),
  focusTitle: document.getElementById("focus-title"),
  focusDesc: document.getElementById("focus-desc"),
  focusMeta: document.getElementById("focus-meta")
};

function spotById(id) {
  return spots.find((spot) => spot.id === id);
}

function applyWinterTemplate() {
  state.plan = buildPlan();
  state.selectedDay = 1;
  state.focusId = state.plan[1][0] || spots[0].id;
  render();
}

function addSpotToDay(spotId, day) {
  const list = state.plan[day];
  if (!list.includes(spotId)) {
    list.push(spotId);
  }
  state.selectedDay = day;
  state.focusId = spotId;
  render();
}

function removeSpotFromDay(spotId, day) {
  state.plan[day] = state.plan[day].filter((id) => id !== spotId);
  if (state.focusId === spotId) {
    state.focusId = state.plan[day][0] || spots[0].id;
  }
  render();
}

function renderDayTabs() {
  dom.dayTabs.innerHTML = Array.from({ length: 10 }, (_, index) => {
    const day = index + 1;
    const places = state.plan[day].length;
    return `
      <button class="day-tab ${state.selectedDay === day ? "active" : ""}" data-day="${day}">
        <strong>Day ${day}</strong>
        <span>${places} 個點位</span>
      </button>
    `;
  }).join("");

  dom.dayTabs.querySelectorAll("[data-day]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedDay = Number(button.dataset.day);
      const firstSpot = state.plan[state.selectedDay][0];
      if (firstSpot) {
        state.focusId = firstSpot;
      }
      render();
    });
  });
}

function renderItinerary() {
  const ids = state.plan[state.selectedDay];
  dom.dayNote.textContent = `今天編輯第 ${state.selectedDay} 天的行程，建議保持同區域或同主題移動。`;

  if (!ids.length) {
    dom.itineraryList.innerHTML = `
      <div class="stop-card">
        <div class="stop-top">
          <div>
            <h3>這一天還是空白的</h3>
            <p class="stop-desc">從右邊的景點庫挑一個加入，讓路線先有骨架。</p>
          </div>
        </div>
      </div>
    `;
    return;
  }

  dom.itineraryList.innerHTML = ids
    .map((id, index) => {
      const spot = spotById(id);
      return `
        <article class="stop-card">
          <div class="stop-top">
            <div>
              <h3>${index + 1}. ${spot.name}</h3>
              <p class="stop-desc">${spot.desc}</p>
            </div>
            <span class="tag">${spot.time}</span>
          </div>
          <div class="place-meta">
            <span class="tag">${spot.area}</span>
            <span class="tag">${spot.type}</span>
            <span class="tag">${spot.best}</span>
          </div>
          <div class="stop-actions">
            <button class="small-button alt" data-focus="${spot.id}">看細節</button>
            <button class="small-button" data-remove="${spot.id}">移除</button>
          </div>
        </article>
      `;
    })
    .join("");

  dom.itineraryList.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => removeSpotFromDay(button.dataset.remove, state.selectedDay));
  });

  dom.itineraryList.querySelectorAll("[data-focus]").forEach((button) => {
    button.addEventListener("click", () => {
      state.focusId = button.dataset.focus;
      render();
    });
  });
}

function matchesFilters(spot) {
  const term = state.search.trim().toLowerCase();
  return !term || [spot.name, spot.area, spot.type, spot.desc, spot.best, spot.highlight]
    .join(" ")
    .toLowerCase()
    .includes(term);
}

function renderSpotGrid() {
  const list = spots.filter(matchesFilters);

  dom.spotGrid.innerHTML = list
    .map((spot) => {
      const isSelected = state.plan[state.selectedDay].includes(spot.id);
      return `
        <article class="spot-card ${isSelected ? "selected" : ""}" data-spot="${spot.id}">
          <div class="spot-top">
            <div>
              <h3>${spot.name}</h3>
              <p class="spot-desc">${spot.desc}</p>
            </div>
            <span class="tag">${spot.time}</span>
          </div>
          <div class="place-meta">
            <span class="tag">${spot.area}</span>
            <span class="tag">${spot.type}</span>
            <span class="tag">${spot.highlight}</span>
          </div>
          <div class="stop-actions">
            <button class="small-button alt" data-add="${spot.id}">加入 Day ${state.selectedDay}</button>
            <button class="small-button" data-pin="${spot.id}">看概覽</button>
          </div>
        </article>
      `;
    })
    .join("");

  if (!list.length) {
    dom.spotGrid.innerHTML = `
      <div class="stop-card">
        <div class="stop-top">
          <div>
            <h3>沒有找到符合條件的景點</h3>
            <p class="stop-desc">可以換個關鍵字再找一次。</p>
          </div>
        </div>
      </div>
    `;
    return;
  }

  dom.spotGrid.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      addSpotToDay(button.dataset.add, state.selectedDay);
    });
  });

  dom.spotGrid.querySelectorAll("[data-pin]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      state.focusId = button.dataset.pin;
      render();
    });
  });

  dom.spotGrid.querySelectorAll(".spot-card").forEach((card) => {
    card.addEventListener("click", () => {
      state.focusId = card.dataset.spot;
      render();
    });
  });
}

function renderSummary() {
  const focus = spotById(state.focusId) || spots[0];
  const uniqueAreas = new Set(
    Object.values(state.plan)
      .flat()
      .map((id) => spotById(id)?.area)
      .filter(Boolean)
  );

  dom.metricDays.textContent = String(Object.keys(state.plan).length);
  dom.metricSpots.textContent = String(spots.length);
  dom.metricSeason.textContent = winterProfile.label;
  dom.focusArea.textContent = [...uniqueAreas].slice(0, 3).join(" / ") || "尚未開始排程";
  dom.focusCopy.textContent = `目前行程集中在 ${winterProfile.blurb}，可以把 ${focus.area} 作為下一段節奏延伸。`;
  dom.styleValue.textContent = winterProfile.style;
  dom.routeValue.textContent = winterProfile.route;
  dom.weatherValue.textContent = winterProfile.weather;
  dom.updatedValue.textContent = new Date().toLocaleTimeString("zh-TW", {
    hour: "2-digit",
    minute: "2-digit"
  });

  dom.focusTitle.textContent = focus.name;
  dom.focusDesc.textContent = focus.desc;
  dom.focusMeta.innerHTML = `
    <span class="tag">${focus.area}</span>
    <span class="tag">${focus.type}</span>
    <span class="tag">${focus.best}</span>
    <span class="tag">建議停留 ${focus.time}</span>
  `;
}

function render() {
  renderDayTabs();
  renderItinerary();
  renderSpotGrid();
  renderSummary();
}

function bindGlobalEvents() {
  dom.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderSpotGrid();
  });

  document.querySelector('[data-action="apply-winter"]').addEventListener("click", applyWinterTemplate);
  document.querySelector('[data-action="focus-hakodate"]').addEventListener("click", () => {
    state.focusId = "hakodate-mt";
    state.selectedDay = 10;
    render();
  });
}

bindGlobalEvents();
render();