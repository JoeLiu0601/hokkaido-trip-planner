const spots = [
  {
    id: "new-chitose-airport",
    name: "新千歲機場",
    area: "新千歲",
    type: "抵達點",
    season: ["winter"],
    time: "0h",
    best: "抵達北海道第一步",
    desc: "12/23 抵達新千歲機場，搭車前往旭川，車程約 2.5 小時。途中可在高速公路服務區稍作停留。",
    highlight: "旅程起點"
  },
  {
    id: "hokkaido-shrine",
    name: "北海道神宮",
    area: "札幌",
    type: "神社散步",
    season: ["winter"],
    time: "1.5h",
    best: "初詣、雪景、安靜感",
    desc: "12/24 抵達札幌後的第一個景點，冬天很適合先把北海道的節奏慢慢打開。",
    highlight: "札幌開場"
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
    id: "ningle-terrace",
    name: "精靈露臺",
    area: "富良野",
    type: "木屋步道",
    season: ["winter"],
    time: "1.5h",
    best: "森林小屋、燈光、拍照",
    desc: "冬天的精靈露臺很有童話感，適合和富良野一起排成一段慢節奏路線。",
    highlight: "夜色木屋"
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
    id: "yotei-mountain",
    name: "羊蹄山",
    area: "二世谷",
    type: "山景",
    season: ["winter"],
    time: "2h",
    best: "雪山、遠景、攝影",
    desc: "如果你有安排新雪谷或周邊自駕，羊蹄山很適合放進路上當作經典雪山風景。",
    highlight: "雪山地標"
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
    id: "kanemori-warehouse",
    name: "金森紅磚倉庫",
    area: "函館",
    type: "港灣散步",
    season: ["winter"],
    time: "1.5h",
    best: "倉庫群、海港、咖啡",
    desc: "很適合接在函館朝市之後，白天看海港、下午慢慢逛商店和咖啡館。",
    highlight: "港邊經典"
  },
  {
    id: "motomachi",
    name: "元町散步",
    area: "函館",
    type: "街區散步",
    season: ["winter"],
    time: "2h",
    best: "坡道、教會、異國風",
    desc: "函館很適合留一段時間走元町坡道，和夜景一起湊成很完整的城市氣氛。",
    highlight: "函館街景"
  },
  {
    id: "goryokaku",
    name: "五稜郭公園",
    area: "函館",
    type: "歷史景點",
    season: ["winter"],
    time: "2h",
    best: "星形城郭、散步、展望塔",
    desc: "如果想讓函館段落不只看海港，五稜郭可以補進城市的另一個重點。",
    highlight: "城郭代表"
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
  },

  // 余市
  {
    id: "nikka-distillery",
    name: "NIKKA 威士忌余市蒸餾所",
    area: "余市",
    type: "釀造所見學",
    season: ["winter"],
    time: "2h",
    best: "威士忌試飲、廠區散步、建築",
    desc: "日本最具代表性的威士忌蒸餾所，免費入場、可試飲，廠區非常漂亮，搭配小樽一起排最順。",
    highlight: "威士忌名所"
  },
  {
    id: "yoichi-fishing-port",
    name: "余市漁港海鮮市場",
    area: "余市",
    type: "海鮮市場",
    season: ["winter"],
    time: "1.5h",
    best: "螃蟹、牡蠣、在地海味",
    desc: "余市港邊有幾間海鮮直賣店，冬天的牡蠣和螃蟹品質很高，價格比小樽觀光區親民許多。",
    highlight: "在地海味"
  },
  {
    id: "kakizaki-store",
    name: "柿崎商店",
    area: "余市",
    type: "海鮮食堂",
    season: ["winter"],
    time: "1h",
    best: "海鮮丼、性價比、在地人也去",
    desc: "余市在地人也愛去的海鮮食堂，二樓可以吃到現撈海鮮丼，份量大、CP 值極高。",
    highlight: "CP 值爆表"
  },

  // 札幌百貨
  {
    id: "daimaru-sapporo",
    name: "大丸札幌店",
    area: "札幌",
    type: "百貨公司",
    season: ["winter"],
    time: "2h",
    best: "伴手禮、地下食品街、JR Tower",
    desc: "就在札幌車站大樓內，地下食品街是掃伴手禮的最佳據點，北海道限定商品幾乎都在這裡。",
    highlight: "站內最好逛"
  },
  {
    id: "mitsukoshi-sapporo",
    name: "三越札幌店",
    area: "札幌",
    type: "百貨公司",
    season: ["winter"],
    time: "1.5h",
    best: "精品、甜點、食品街",
    desc: "位於大通公園附近，適合逛完公園後順道進來取暖，地下甜點街選擇豐富。",
    highlight: "大通周邊"
  },
  {
    id: "stellar-place",
    name: "Stellar Place",
    area: "札幌",
    type: "購物中心",
    season: ["winter"],
    time: "2h",
    best: "流行服飾、餐廳、景觀",
    desc: "JR 札幌站正上方的購物中心，頂樓餐廳層可以俯瞰城市，適合雨雪天把一整個下午收在這裡。",
    highlight: "車站正上方"
  },
  {
    id: "apa-sogo",
    name: "SOGO 札幌店（LOFT 同棟）",
    area: "札幌",
    type: "百貨公司",
    season: ["winter"],
    time: "1.5h",
    best: "文具、雜貨、生活選品",
    desc: "SOGO 與 LOFT 同棟，LOFT 樓層的北海道限定雜貨很適合挑伴手禮，順遊大通非常方便。",
    highlight: "雜貨控必逛"
  },

  // 札幌美食
  {
    id: "sapporo-ramen-yokocho",
    name: "札幌拉麵橫丁",
    area: "札幌",
    type: "美食街",
    season: ["winter"],
    time: "1h",
    best: "味噌拉麵、昭和風情、薄野",
    desc: "薄野核心的拉麵橫丁，十幾間小店並排，昭和感氛圍加上濃郁味噌湯頭，是冬天最療癒的一餐。",
    highlight: "拉麵名地"
  },
  {
    id: "soup-curry",
    name: "スープカレー（湯咖哩）",
    area: "札幌",
    type: "在地美食",
    season: ["winter"],
    time: "1h",
    best: "北海道蔬菜、雞腿、暖胃",
    desc: "札幌發源的獨特咖哩料理，湯底清爽帶辣、配料豪邁，推薦 Lavi 或奧芝商店，是最具代表性的在地味。",
    highlight: "札幌起源"
  },
  {
    id: "jingisukan",
    name: "成吉思汗烤羊肉",
    area: "札幌",
    type: "在地美食",
    season: ["winter"],
    time: "1.5h",
    best: "羊肉、北海道啤酒、居酒屋氣氛",
    desc: "北海道最代表性的肉料理，推薦薄野周邊的だるま或さっぽろジンギスカン，配生啤非常對味。",
    highlight: "北海道必吃"
  },
  {
    id: "nijo-market",
    name: "二条市場",
    area: "札幌",
    type: "海鮮市場",
    season: ["winter"],
    time: "1h",
    best: "海鮮丼、螃蟹、早餐",
    desc: "札幌市區最老字號的海鮮市場，早餐時段最熱鬧，海鮮丼種類豐富，是把海味直接拉進城市行程的好選擇。",
    highlight: "市區海鮮"
  },
  {
    id: "kaiten-sushi-triton",
    name: "迴轉壽司 根室花丸",
    area: "札幌",
    type: "迴轉壽司",
    season: ["winter"],
    time: "1h",
    best: "新鮮程度高、在地人推薦、CP 值",
    desc: "根室起家的高人氣迴轉壽司，札幌多個據點都很好訂位，北海道鮮魚品質遠超一般迴轉壽司水準。",
    highlight: "在地人首選"
  }
];

const winterTemplate = {
  1: ["new-chitose-airport", "asahiyama-zoo"],
  2: ["hokkaido-shrine", "sapporo-odori"],
  3: ["shiroi-koibito-park", "sapporo-susukino"],
  4: ["jozankei-onsen", "moiwa-yama"],
  5: ["otaru-canal", "otaru-sakaimachi"],
  6: ["niseko-mt"],
  7: ["furano-field", "biei-blue"],
  8: ["toyako-lake", "noboribetsu-valley"],
  9: ["morning-market", "kanemori-warehouse", "motomachi"],
  10: ["goryokaku", "hakodate-mt"]
};

const winterProfile = {
  label: "12/23-1/1",
  blurb: "新千歲 → 旭川 → 札幌 → 洞爺湖 → 函館",
  weather: "冬季粉雪、夜景、溫泉、海港",
  route: "除函館那天還車，其餘天數都開車",
  style: "冬季限定"
};

const accommodations = [
  {
    label: "12/23-12/24 旭川",
    name: "Premier Hotel -CABIN- Asahikawa",
    note: "旭川住宿"
  },
  {
    label: "12/24-12/29 札幌",
    name: "APA Hotel Sapporo Susukino Ekinishi",
    note: "札幌市區住宿"
  },
  {
    label: "12/29-12/30 洞爺湖",
    name: "Toya Kohan Tei",
    note: "湖畔溫泉住宿"
  },
  {
    label: "12/30-1/1 函館",
    name: "La'gent Stay Hakodate Ekimae",
    note: "函館住宿"
  }
];

const storageKey = "hokkaido-trip-planner-plan";
const carModelKey = "hokkaido-trip-planner-car-model";
const savedAtKey = "hokkaido-trip-planner-saved-at";
const syncCodeKey = "hokkaido-trip-planner-sync-code";
const syncClientIdKey = "hokkaido-trip-planner-sync-client-id";

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

function createDefaultPlan() {
  return buildPlan();
}

function loadPlan() {
  const stored = window.localStorage.getItem(storageKey);
  if (!stored) {
    return createDefaultPlan();
  }

  try {
    const parsed = JSON.parse(stored);
    const plan = Object.keys(winterTemplate).reduce((accumulator, key) => {
      const day = Number(key);
      accumulator[day] = Array.isArray(parsed[day]) ? parsed[day].filter((id) => spotById(id)) : [];
      return accumulator;
    }, {});

    const hasAnyStops = Object.values(plan).some((dayStops) => dayStops.length > 0);
    return hasAnyStops ? plan : createDefaultPlan();
  } catch {
    return createDefaultPlan();
  }
}

function savePlan() {
  window.localStorage.setItem(storageKey, JSON.stringify(state.plan));
}

function loadCarModel() {
  return window.localStorage.getItem(carModelKey) || "";
}

function saveCarModel() {
  window.localStorage.setItem(carModelKey, state.carModel);
}

function loadSavedAt() {
  return window.localStorage.getItem(savedAtKey) || "";
}

function loadSyncCode() {
  return window.localStorage.getItem(syncCodeKey) || "";
}

function getOrCreateClientId() {
  const existing = window.localStorage.getItem(syncClientIdKey);
  if (existing) {
    return existing;
  }

  const newId = `client-${Math.random().toString(36).slice(2, 10)}`;
  window.localStorage.setItem(syncClientIdKey, newId);
  return newId;
}

const state = {
  selectedDay: 1,
  search: "",
  spotPage: 0,
  focusId: spots[0].id,
  plan: loadPlan(),
  dragging: null,
  carModel: loadCarModel(),
  dirty: false,
  lastSavedAt: loadSavedAt(),
  syncCode: loadSyncCode()
};

const dom = {
  searchInput: document.getElementById("search-input"),
  dayTabs: document.getElementById("day-tabs"),
  itineraryList: document.getElementById("itinerary-list"),
  itineraryDropzone: document.getElementById("itinerary-dropzone"),
  spotGrid: document.getElementById("spot-grid"),
  spotPagination: document.getElementById("spot-pagination"),
  dayNote: document.getElementById("day-note"),
  metricDays: document.getElementById("metric-days"),
  metricSpots: document.getElementById("metric-spots"),
  metricSeason: document.getElementById("metric-season"),
  focusArea: document.getElementById("focus-area"),
  focusCopy: document.getElementById("focus-copy"),
  styleValue: document.getElementById("style-value"),
  routeValue: document.getElementById("route-value"),
  carModelInput: document.getElementById("car-model-input"),
  weatherValue: document.getElementById("weather-value"),
  updatedValue: document.getElementById("updated-value"),
  focusTitle: document.getElementById("focus-title"),
  focusDesc: document.getElementById("focus-desc"),
  focusMeta: document.getElementById("focus-meta"),
  stayGrid: document.getElementById("stay-grid"),
  savePlanBtn: document.getElementById("save-plan-btn"),
  exportPlanBtn: document.getElementById("export-plan-btn"),
  importPlanBtn: document.getElementById("import-plan-btn"),
  importPlanFile: document.getElementById("import-plan-file"),
  saveStatus: document.getElementById("save-status"),
  syncCodeInput: document.getElementById("sync-code-input"),
  connectSyncBtn: document.getElementById("connect-sync-btn"),
  syncStatus: document.getElementById("sync-status")
};

const cloud = {
  initialized: false,
  connecting: false,
  configured: false,
  db: null,
  modules: null,
  unsubscribe: null,
  activeCode: "",
  pendingTimer: null,
  applyingRemote: false,
  clientId: getOrCreateClientId()
};

function normalizeSyncCode(rawCode) {
  return String(rawCode || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "")
    .slice(0, 40);
}

function isSyncConfigValid() {
  const config = window.HOKKAIDO_SYNC_CONFIG || {};
  const required = ["apiKey", "authDomain", "projectId", "appId"];
  return required.every((field) => typeof config[field] === "string" && config[field].trim());
}

function setSyncStatus(message) {
  if (dom.syncStatus) {
    dom.syncStatus.textContent = `雲端同步：${message}`;
  }
}

function updateSyncUi() {
  if (dom.syncCodeInput) {
    dom.syncCodeInput.value = state.syncCode;
  }

  if (dom.connectSyncBtn) {
    dom.connectSyncBtn.textContent = state.syncCode ? "重新連線同步" : "啟用自動同步";
  }
}

async function ensureCloudInitialized() {
  if (cloud.initialized) {
    return true;
  }

  if (!isSyncConfigValid()) {
    cloud.configured = false;
    setSyncStatus("尚未設定（請先填 sync-config.js）");
    return false;
  }

  cloud.connecting = true;
  setSyncStatus("初始化中...");
  const config = window.HOKKAIDO_SYNC_CONFIG;

  try {
    const [{ initializeApp }, firestoreModule] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js")
    ]);

    const app = initializeApp(config);
    cloud.modules = firestoreModule;
    cloud.db = firestoreModule.getFirestore(app);
    cloud.initialized = true;
    cloud.configured = true;
    setSyncStatus("已就緒");
    return true;
  } catch {
    setSyncStatus("初始化失敗（請檢查 sync-config.js）");
    return false;
  } finally {
    cloud.connecting = false;
  }
}

function buildSyncPayload() {
  return {
    plan: state.plan,
    carModel: state.carModel,
    updatedAt: Date.now(),
    updatedBy: cloud.clientId
  };
}

function applyRemotePayload(payload) {
  const importedPlan = normalizeImportedPlan(payload?.plan || {});
  state.plan = importedPlan;
  state.carModel = typeof payload?.carModel === "string" ? payload.carModel : "";
  state.selectedDay = 1;

  const hasFocus = Object.values(state.plan).some((dayList) => dayList.length > 0);
  const firstId = hasFocus ? Object.values(state.plan).flat()[0] : spots[0].id;
  state.focusId = firstId || spots[0].id;

  const savedIso = typeof payload?.updatedAt === "number" ? new Date(payload.updatedAt).toISOString() : new Date().toISOString();
  state.lastSavedAt = savedIso;
  state.dirty = false;
  savePlan();
  saveCarModel();
  window.localStorage.setItem(savedAtKey, state.lastSavedAt);
  render();
  updateSaveUi();
}

async function pushCloudState() {
  if (!cloud.initialized || !cloud.activeCode || cloud.applyingRemote) {
    return;
  }

  const { doc, setDoc } = cloud.modules;
  const ref = doc(cloud.db, "tripPlans", cloud.activeCode);

  try {
    await setDoc(ref, buildSyncPayload(), { merge: true });
    state.lastSavedAt = new Date().toISOString();
    state.dirty = false;
    savePlan();
    saveCarModel();
    window.localStorage.setItem(savedAtKey, state.lastSavedAt);
    updateSaveUi();
    setSyncStatus("同步完成");
  } catch {
    setSyncStatus("同步失敗，稍後重試");
  }
}

function queueCloudPush(delay = 700) {
  if (!cloud.initialized || !cloud.activeCode || cloud.applyingRemote) {
    return;
  }

  if (cloud.pendingTimer) {
    window.clearTimeout(cloud.pendingTimer);
  }

  cloud.pendingTimer = window.setTimeout(() => {
    cloud.pendingTimer = null;
    pushCloudState();
  }, delay);
}

async function connectCloudSync(rawCode) {
  const code = normalizeSyncCode(rawCode);
  if (!code) {
    setSyncStatus("請先輸入同步代碼");
    return;
  }

  state.syncCode = code;
  window.localStorage.setItem(syncCodeKey, code);
  updateSyncUi();

  const ready = await ensureCloudInitialized();
  if (!ready) {
    return;
  }

  if (cloud.unsubscribe) {
    cloud.unsubscribe();
    cloud.unsubscribe = null;
  }

  const { doc, getDoc, onSnapshot } = cloud.modules;
  const ref = doc(cloud.db, "tripPlans", code);
  cloud.activeCode = code;
  setSyncStatus("連線中...");

  const snapshot = await getDoc(ref);
  if (snapshot.exists()) {
    cloud.applyingRemote = true;
    applyRemotePayload(snapshot.data());
    cloud.applyingRemote = false;
    setSyncStatus("已連線，自動同步中");
  } else {
    await pushCloudState();
    setSyncStatus("已連線，已建立雲端資料");
  }

  cloud.unsubscribe = onSnapshot(ref, (docSnap) => {
    const data = docSnap.data();
    if (!docSnap.exists() || !data) {
      return;
    }

    if (data.updatedBy === cloud.clientId) {
      return;
    }

    cloud.applyingRemote = true;
    applyRemotePayload(data);
    cloud.applyingRemote = false;
    setSyncStatus("已同步到最新版本");
  });
}

function formatSavedAt(isoText) {
  if (!isoText) {
    return "";
  }

  const date = new Date(isoText);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString("zh-TW", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function updateSaveUi() {
  if (dom.savePlanBtn) {
    dom.savePlanBtn.disabled = !state.dirty;
  }

  if (!dom.saveStatus) {
    return;
  }

  if (state.dirty) {
    dom.saveStatus.textContent = "有未儲存變更";
    return;
  }

  const savedText = formatSavedAt(state.lastSavedAt);
  dom.saveStatus.textContent = savedText ? `已儲存：${savedText}` : "尚未儲存變更";
}

function persistState() {
  savePlan();
  saveCarModel();
  state.lastSavedAt = new Date().toISOString();
  window.localStorage.setItem(savedAtKey, state.lastSavedAt);
  state.dirty = false;
  renderSummary();
  updateSaveUi();
  queueCloudPush(0);
}

function markDirty() {
  state.dirty = true;
  renderSummary();
  updateSaveUi();
  queueCloudPush();
}

function normalizeImportedPlan(rawPlan) {
  const normalized = buildPlan();

  Object.keys(winterTemplate).forEach((key) => {
    const day = Number(key);
    if (!Array.isArray(rawPlan?.[day])) {
      normalized[day] = [];
      return;
    }

    const uniqueIds = new Set();
    normalized[day] = rawPlan[day].filter((id) => {
      if (!spotById(id) || uniqueIds.has(id)) {
        return false;
      }
      uniqueIds.add(id);
      return true;
    });
  });

  return normalized;
}

function exportPlanAsJson() {
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    carModel: state.carModel,
    plan: state.plan
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `hokkaido-plan-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

async function importPlanFromFile(file) {
  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const importedPlan = normalizeImportedPlan(parsed?.plan ?? parsed);
    state.plan = importedPlan;

    const importedCarModel = typeof parsed?.carModel === "string" ? parsed.carModel.trim() : "";
    state.carModel = importedCarModel;

    const hasFocus = Object.values(state.plan).some((dayList) => dayList.length > 0);
    const firstId = hasFocus ? Object.values(state.plan).flat()[0] : spots[0].id;
    state.focusId = firstId || spots[0].id;
    state.selectedDay = 1;
    markDirty();
    render();
  } catch {
    window.alert("匯入失敗：JSON 格式不正確");
  }
}

function spotById(id) {
  return spots.find((spot) => spot.id === id);
}

function applyWinterTemplate() {
  state.plan = createDefaultPlan();
  state.selectedDay = 1;
  state.focusId = state.plan[1][0] || spots[0].id;
  markDirty();
  render();
}

function addSpotToDay(spotId, day, mode = "toggle") {
  const list = state.plan[day];
  if (mode === "toggle" && list.includes(spotId)) {
    state.plan[day] = list.filter((id) => id !== spotId);
  } else if (!list.includes(spotId)) {
    list.push(spotId);
  }
  state.selectedDay = day;
  state.focusId = spotId;
  markDirty();
  render();
}

function removeSpotFromDay(spotId, day) {
  state.plan[day] = state.plan[day].filter((id) => id !== spotId);
  if (state.focusId === spotId) {
    state.focusId = state.plan[day][0] || spots[0].id;
  }
  markDirty();
  render();
}

function removeSpotAtIndex(day, index) {
  const list = state.plan[day];
  if (index < 0 || index >= list.length) {
    return;
  }

  const [removed] = list.splice(index, 1);
  if (state.focusId === removed) {
    state.focusId = list[0] || spots[0].id;
  }
  markDirty();
  render();
}

function moveSpotInDay(day, fromIndex, toIndex) {
  const list = state.plan[day];
  if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= list.length || toIndex >= list.length) {
    return;
  }

  const [moved] = list.splice(fromIndex, 1);
  list.splice(toIndex, 0, moved);
  markDirty();
  renderItinerary();
}

function renderDayTabs() {
  const dates = ["12/23", "12/24", "12/25", "12/26", "12/27", "12/28", "12/29", "12/30", "12/31", "1/1"];
  dom.dayTabs.innerHTML = Array.from({ length: 10 }, (_, index) => {
    const day = index + 1;
    const places = state.plan[day].length;
    return `
      <button class="day-tab ${state.selectedDay === day ? "active" : ""}" data-day="${day}" data-drop-day="${day}">
        <strong>Day ${day} (${dates[index]})</strong>
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

  dom.dayTabs.querySelectorAll("[data-drop-day]").forEach((button) => {
    button.addEventListener("dragover", (event) => {
      if (!Array.from(event.dataTransfer.types || []).includes("application/x-hokkaido-spot")) {
        return;
      }
      event.preventDefault();
      button.classList.add("drop-target");
      event.dataTransfer.dropEffect = "copy";
    });

    button.addEventListener("dragleave", () => {
      button.classList.remove("drop-target");
    });

    button.addEventListener("drop", (event) => {
      event.preventDefault();
      const spotId = event.dataTransfer.getData("application/x-hokkaido-spot");
      if (!spotId) {
        return;
      }
      button.classList.remove("drop-target");
      addSpotToDay(spotId, Number(button.dataset.dropDay), "add");
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
            <p class="stop-desc">從右邊的景點庫拖曳進來，或先點按加入，讓路線先有骨架。</p>
          </div>
        </div>
      </div>
    `;
  } else {
    dom.itineraryList.innerHTML = ids
      .map((id, index) => {
        const spot = spotById(id);
        return `
          <article class="stop-card" draggable="true" data-index="${index}" data-spot-id="${spot.id}">
            <div class="stop-top">
              <div>
                <div class="stop-title-row">
                  <span class="drag-handle" aria-hidden="true">⋮⋮</span>
                  <h3>${index + 1}. ${spot.name}</h3>
                </div>
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
              <button class="small-button" data-move-up="${spot.id}">上移</button>
              <button class="small-button" data-move-down="${spot.id}">下移</button>
              <button class="small-button alt" data-focus="${spot.id}">看細節</button>
              <button class="small-button" data-remove="${spot.id}">移除</button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  dom.itineraryList.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => removeSpotFromDay(button.dataset.remove, state.selectedDay));
  });

  dom.itineraryList.querySelectorAll("[data-move-up]").forEach((button) => {
    button.addEventListener("click", () => {
      if (ids.length < 2) {
        return;
      }
      const index = ids.indexOf(button.dataset.moveUp);
      const toIndex = index <= 0 ? ids.length - 1 : index - 1;
      moveSpotInDay(state.selectedDay, index, toIndex);
    });
  });

  dom.itineraryList.querySelectorAll("[data-move-down]").forEach((button) => {
    button.addEventListener("click", () => {
      if (ids.length < 2) {
        return;
      }
      const index = ids.indexOf(button.dataset.moveDown);
      const toIndex = index >= ids.length - 1 ? 0 : index + 1;
      moveSpotInDay(state.selectedDay, index, toIndex);
    });
  });

  dom.itineraryList.querySelectorAll("[data-focus]").forEach((button) => {
    button.addEventListener("click", () => {
      state.focusId = button.dataset.focus;
      render();
    });
  });

  dom.itineraryList.querySelectorAll(".stop-card[draggable='true']").forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      state.dragging = Number(card.dataset.index);
      card.classList.add("dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("application/x-hokkaido-stop-index", card.dataset.index);
    });

    card.addEventListener("dragend", () => {
      state.dragging = null;
      card.classList.remove("dragging");
      dom.itineraryList.querySelectorAll(".drop-target").forEach((dropCard) => dropCard.classList.remove("drop-target"));
    });

    card.addEventListener("dragover", (event) => {
      event.preventDefault();
      if (state.dragging === null) {
        return;
      }
      card.classList.add("drop-target");
      event.dataTransfer.dropEffect = "move";
    });

    card.addEventListener("dragleave", () => {
      card.classList.remove("drop-target");
    });

    card.addEventListener("drop", (event) => {
      event.preventDefault();
      const fromIndex = Number(event.dataTransfer.getData("application/x-hokkaido-stop-index"));
      const toIndex = Number(card.dataset.index);
      card.classList.remove("drop-target");
      moveSpotInDay(state.selectedDay, fromIndex, toIndex);
    });
  });

  if (!dom.itineraryList.dataset.dropBound) {
    dom.itineraryList.dataset.dropBound = "true";

    dom.itineraryList.addEventListener("dragover", (event) => {
      if (!Array.from(event.dataTransfer.types || []).includes("application/x-hokkaido-spot")) {
        return;
      }
      event.preventDefault();
      dom.itineraryList.classList.add("drop-target");
      event.dataTransfer.dropEffect = "copy";
    });

    dom.itineraryList.addEventListener("dragleave", () => {
      dom.itineraryList.classList.remove("drop-target");
    });

    dom.itineraryList.addEventListener("drop", (event) => {
      const spotId = event.dataTransfer.getData("application/x-hokkaido-spot");
      if (!spotId) {
        return;
      }
      event.preventDefault();
      dom.itineraryList.classList.remove("drop-target");
      addSpotToDay(spotId, state.selectedDay, "add");
    });
  }

  if (!dom.itineraryDropzone.dataset.dropBound) {
    dom.itineraryDropzone.dataset.dropBound = "true";

    dom.itineraryDropzone.addEventListener("dragover", (event) => {
      if (!Array.from(event.dataTransfer.types || []).includes("application/x-hokkaido-stop-index")) {
        return;
      }
      event.preventDefault();
      dom.itineraryDropzone.classList.add("active-dropzone");
      event.dataTransfer.dropEffect = "move";
    });

    dom.itineraryDropzone.addEventListener("dragleave", () => {
      dom.itineraryDropzone.classList.remove("active-dropzone");
    });

    dom.itineraryDropzone.addEventListener("drop", (event) => {
      const fromIndex = Number(event.dataTransfer.getData("application/x-hokkaido-stop-index"));
      if (Number.isNaN(fromIndex)) {
        return;
      }
      event.preventDefault();
      dom.itineraryDropzone.classList.remove("active-dropzone");
      removeSpotAtIndex(state.selectedDay, fromIndex);
    });
  }
}

function matchesFilters(spot) {
  const term = state.search.trim().toLowerCase();
  return !term || [spot.name, spot.area, spot.type, spot.desc, spot.best, spot.highlight]
    .join(" ")
    .toLowerCase()
    .includes(term);
}

const SPOTS_PER_PAGE = 10;

function renderSpotGrid() {
  const list = spots.filter(matchesFilters);
  const totalPages = Math.max(1, Math.ceil(list.length / SPOTS_PER_PAGE));
  if (state.spotPage >= totalPages) {
    state.spotPage = totalPages - 1;
  }
  const pageList = list.slice(state.spotPage * SPOTS_PER_PAGE, (state.spotPage + 1) * SPOTS_PER_PAGE);

  dom.spotGrid.innerHTML = pageList
    .map((spot) => {
      const isSelected = state.plan[state.selectedDay].includes(spot.id);
      const buttonLabel = isSelected ? `移除自 Day ${state.selectedDay}` : `＋ 加入 Day ${state.selectedDay}`;
      return `
        <article class="spot-card ${isSelected ? "selected" : ""}" data-spot="${spot.id}" draggable="true">
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
            <button class="small-button alt" data-add="${spot.id}">${buttonLabel}</button>
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
    dom.spotPagination.innerHTML = "";
    return;
  }

  // 分頁控制列
  dom.spotPagination.innerHTML = `
    <button class="page-btn" id="spot-prev" ${state.spotPage === 0 ? "disabled" : ""}>&#8249;</button>
    <span class="page-info">${state.spotPage + 1} / ${totalPages}</span>
    <button class="page-btn" id="spot-next" ${state.spotPage >= totalPages - 1 ? "disabled" : ""}>&#8250;</button>
  `;
  document.getElementById("spot-prev").addEventListener("click", () => {
    if (state.spotPage > 0) { state.spotPage--; renderSpotGrid(); }
  });
  document.getElementById("spot-next").addEventListener("click", () => {
    if (state.spotPage < totalPages - 1) { state.spotPage++; renderSpotGrid(); }
  });

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
    card.addEventListener("click", (event) => {
      if ((event.target).closest("button")) return;
      state.focusId = card.dataset.spot;
      renderSummary();
    });

    card.addEventListener("dragstart", (event) => {
      state.dragging = card.dataset.spot;
      card.classList.add("dragging");
      event.dataTransfer.effectAllowed = "copy";
      event.dataTransfer.setData("application/x-hokkaido-spot", card.dataset.spot);
      event.dataTransfer.setData("text/plain", card.dataset.spot);
    });

    card.addEventListener("dragend", () => {
      state.dragging = null;
      card.classList.remove("dragging");
      dom.dayTabs.querySelectorAll(".drop-target").forEach((dropButton) => dropButton.classList.remove("drop-target"));
      dom.itineraryList.classList.remove("drop-target");
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
  dom.focusCopy.textContent = `目前是 4 人自駕，行程集中在 ${winterProfile.blurb}，除函館那天會還車，其餘天數都會開車。`;
  dom.styleValue.textContent = winterProfile.style;
  dom.routeValue.textContent = winterProfile.route;
  dom.carModelInput.value = state.carModel;
  dom.weatherValue.textContent = winterProfile.weather;
  if (state.dirty) {
    dom.updatedValue.textContent = "尚未儲存";
  } else {
    dom.updatedValue.textContent = formatSavedAt(state.lastSavedAt) || "尚未儲存";
  }

  dom.focusTitle.textContent = focus.name;
  dom.focusDesc.textContent = focus.desc;
  dom.focusMeta.innerHTML = `
    <span class="tag">${focus.area}</span>
    <span class="tag">${focus.type}</span>
    <span class="tag">${focus.best}</span>
    <span class="tag">建議停留 ${focus.time}</span>
  `;

  dom.stayGrid.innerHTML = accommodations
    .map((hotel) => `
      <article class="stay-card">
        <span class="stay-label">${hotel.label}</span>
        <h3>${hotel.name}</h3>
        <p>${hotel.note}</p>
      </article>
    `)
    .join("");
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
    state.spotPage = 0;
    renderSpotGrid();
  });

  dom.carModelInput.addEventListener("input", (event) => {
    state.carModel = event.target.value;
    markDirty();
    renderSummary();
  });

  dom.savePlanBtn?.addEventListener("click", persistState);
  dom.exportPlanBtn?.addEventListener("click", exportPlanAsJson);
  dom.importPlanBtn?.addEventListener("click", () => dom.importPlanFile?.click());
  dom.connectSyncBtn?.addEventListener("click", () => connectCloudSync(dom.syncCodeInput?.value));
  dom.syncCodeInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      connectCloudSync(dom.syncCodeInput?.value);
    }
  });
  dom.importPlanFile?.addEventListener("change", async (event) => {
    const [file] = event.target.files || [];
    await importPlanFromFile(file);
    event.target.value = "";
  });

  window.addEventListener("beforeunload", (event) => {
    if (!state.dirty) {
      return;
    }
    event.preventDefault();
    event.returnValue = "";
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
      event.preventDefault();
      persistState();
    }
  });

  document.querySelector('[data-action="apply-winter"]').addEventListener("click", applyWinterTemplate);
  document.querySelector('[data-action="focus-sapporo"]').addEventListener("click", () => {
    state.focusId = "moiwa-yama";
    state.selectedDay = 4;
    render();
  });

  document.querySelector('[data-action="focus-hakodate"]').addEventListener("click", () => {
    state.focusId = "hakodate-mt";
    state.selectedDay = 10;
    render();
  });
}

bindGlobalEvents();
render();
updateSaveUi();
updateSyncUi();

if (state.syncCode) {
  connectCloudSync(state.syncCode);
} else {
  setSyncStatus("未啟用");
}