(() => {
  "use strict";
  const host = document.getElementById("journey-view");
  if (!host) return;
  const storageKey = "hokkaido-departure-prep-20261223";
  const groups = [
    { id: "documents", title: "證件、入境與預訂", items: [
      { id: "passport", title: "護照正本與效期", note: "確認護照有效、姓名與機票一致，出門前放進隨身包。" },
      { id: "entry", title: "Visit Japan Web 入境資料", note: "可先填入境審查與海關申報資料，出發前確認可登入並顯示 QR code。", url: "https://services.digital.go.jp/visit-japan-web/", link: "Visit Japan Web 官方入口" },
      { id: "bookings", title: "機票與住宿訂單", note: "確認長榮去程、星宇回程的日期、報到資訊，以及每間飯店的入住／退房時間。" },
      { id: "reservations", title: "餐廳、門票與活動預約", note: "已決定要預約的餐廳或活動，存好確認信、入場憑證、取消期限與集合資訊；現場購票的不用先買。" },
      { id: "offline-copies", title: "離線副本與聯絡方式", note: "把訂單、飯店地址、租車及保險聯絡電話存成離線可看的副本；重要證件備份與正本分開保管。" },
      { id: "airport-ride", title: "出發日到桃園機場的交通", note: "去程 06:15 起飛，先安排接送／停車及出門時間，依航空公司的報到截止時間往前留緩衝。" }
    ] },
    { id: "driving", title: "自駕文件與租車", items: [
      { id: "license", title: "台灣駕照正本・每位駕駛", note: "先檢查駕照有效日期；印載日期已過期時，先換照再申請譯本。取車時登錄所有會開車的人。" },
      { id: "translation", title: "駕照日文譯本・每位駕駛", note: "與駕照正本、護照一起帶。申請規費 NT$100；臨櫃隨辦隨領，網路含郵寄約 7–12 個工作天、另付郵資。", url: "https://www.gov.tw/News_Content_2_376856", link: "日文譯本官方申辦" },
      { id: "rental", title: "租車訂單、門市與付款卡", note: "核對取還車時間、門市與聯絡方式；D8 還車是函館站前門市，備妥租車公司要求的付款卡。", url: "https://www.nipponrentacar.co.jp/guide/userguide.html", link: "租車公司取車規定" },
      { id: "drivers", title: "所有駕駛登錄與雪地駕駛確認", note: "確認哪些人會開車，各自帶齊駕照、日文譯本與護照。出發前一起看冬季駕駛注意事項。", url: "https://www.nipponrentacar.co.jp/guide/userguide.html", link: "取車與駕駛登錄說明" },
      { id: "snow-tires", title: "雪胎、車型與冬季設備", note: "向門市確認雪胎、預訂車型／四輪驅動及除雪刷等設備，核對四人與行李是否放得下；不要只看車款照片。", url: "https://www.nipponrentacar.co.jp/car_price/option/studless-tire.html", link: "租車公司雪胎說明" },
      { id: "rental-cover", title: "租車補償內容與救援電話", note: "確認訂單包含的保險、免責補償／營業損失補償、道路救援及不適用情況，存好事故聯絡方式。", url: "https://www.nipponrentacar.co.jp/guide/userguide.html", link: "租車使用規定" },
      { id: "etc", title: "ETC 卡與高速公路付款・按需", note: "確認是否租 ETC 卡、費用與還車結算方式；有 ETC 車機不代表已附卡。" }
    ] },
    { id: "electronics", title: "付款、手機與電源", items: [
      { id: "payment", title: "日圓現金與零錢", note: "小店用餐、停車及臨時支出預留現金，和主要卡片分開放一份備用。" },
      { id: "cards", title: "信用卡與海外付款確認", note: "確認海外交易、額度、密碼及驗證簡訊接收方式，準備另一種付款方式。" },
      { id: "phone", title: "日本網路與啟用方式", note: "準備 eSIM／漫遊或 Wi-Fi，確認手機支援、啟用日期、流量與分享方式；安裝所需資料先存好。" },
      { id: "chargers", title: "充電器與各種充電線", note: "手機、手錶、相機各自確認接頭，四人一起用的插孔數也先算好。" },
      { id: "plug", title: "插頭與電壓相容性", note: "日本為 100V；先看電器標示的輸入電壓與插頭，需轉接時才帶轉接頭。充電器若標示 100–240V，已涵蓋 100V。", url: "https://www.japan.travel/tw/plan/plug-and-electricity/", link: "JNTO 日本電源說明" },
      { id: "powerbank", title: "行動電源與電池標示", note: "本趟往返準備每人最多 2 個、每個不超過 100Wh 且容量標示清楚的行動電源；只隨身攜帶，不託運、不放上方置物箱，機上不使用或充電。", links: [
        { url: "https://www.evaair.com/zh-tw/fly-prepare/baggage/additional-baggage-information/restrictions/", title: "長榮電池規定" },
        { url: "https://www.starlux-airlines.com/en-US/check-in-fly/travel-information/inflight-notice/regulations-on-the-use-of-electronic-devices", title: "星宇電池規定（英文）" }
      ] },
      { id: "car-phone", title: "車用手機架與充電線・按需", note: "先問門市導航／手機連接功能與車上充電孔，再決定自備手機架、車充或 USB 線。" }
    ] },
    { id: "winter-wear", title: "冬季衣物與雪地步行", items: [
      { id: "winter", title: "防風、保暖的冬季外套", note: "挑適合戶外低溫、能擋風且不易吸水的外套，室內暖氣強時方便穿脫。", url: "https://www.sapporo.travel/zh-tw/spot/feature/clothes_winter/", link: "札幌觀光官方冬季穿搭" },
      { id: "base-layers", title: "保暖內衣與內搭褲", note: "依個人體感準備上下身保暖層，搭配可穿脫的外層。" },
      { id: "mid-layers", title: "毛衣／刷毛中層", note: "外套內的保暖層，方便因應戶外、車內與室內溫差。" },
      { id: "trousers", title: "保暖、防風長褲", note: "雪地步行以方便活動的長褲為主，需要時搭配保暖內搭。" },
      { id: "underwear", title: "內衣褲、換洗衣物與睡衣", note: "依十天旅程及飯店洗衣安排準備；睡衣可先確認住宿是否提供。" },
      { id: "snow-shoes", title: "防滑、耐濕的冬季鞋", note: "選適合積雪與結冰路面步行的鞋，出發前先試穿走路，預留厚襪空間。", url: "https://www.sapporo.travel/zh-tw/spot/feature/clothes_winter/", link: "札幌官方鞋底與步行提醒" },
      { id: "socks", title: "厚襪與備用乾襪", note: "鞋襪潮濕時方便替換，確認搭配雪鞋後不會過緊。" },
      { id: "gloves", title: "保暖手套", note: "夜景、神社與戶外步行都會用到；需操作手機可挑觸控款。" },
      { id: "hat", title: "毛帽／耳部保暖", note: "準備能遮住耳朵的帽子，或依需要加耳罩。" },
      { id: "scarf", title: "圍巾／脖圍", note: "擋風與保暖，選不妨礙活動、容易收納的款式。" },
      { id: "traction", title: "可拆式防滑套・按需", note: "先確認與鞋底尺寸相容、練習穿脫，使用方式依產品及場所規定。", url: "https://www.sapporo.travel/zh-tw/spot/feature/clothes_winter/", link: "札幌官方防滑用品介紹" },
      { id: "warmers", title: "暖暖包・按需", note: "依夜景、跨年與戶外停留需求準備，按照產品標示使用。" }
    ] },
    { id: "personal", title: "個人用品與健康", items: [
      { id: "insurance", title: "旅遊保單與協助電話", note: "確認保單日期涵蓋往返，將保單與海外協助電話存成離線副本。" },
      { id: "medicines", title: "個人藥品與處方資料", note: "攜帶平常需要的藥品、原包裝及必要的處方資料；依成分與數量核對日本攜入規定，部分藥品須事先許可。", url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iyakuhin/kojinyunyu/topics/tp010401-1_00001.html", link: "日本厚生勞動省藥品攜入說明" },
      { id: "toiletries", title: "牙刷、盥洗與個人衛生用品", note: "先看飯店備品，再依習慣帶牙刷牙膏、清潔用品、刮鬍用品及生理用品。" },
      { id: "skincare", title: "護唇膏、保濕與防曬用品", note: "依個人習慣準備，小包裝方便隨身補用；液體放隨身包時注意容器容量。" },
      { id: "eyecare", title: "眼鏡、隱形眼鏡與太陽眼鏡・按需", note: "需要時帶備用眼鏡、鏡盒及保養用品；雪地日照時可使用太陽眼鏡。" },
      { id: "tissues", title: "面紙、口罩與隨身小用品", note: "依需要準備面紙、濕紙巾、口罩及小垃圾袋，集中放在容易拿的地方。" }
    ] },
    { id: "luggage", title: "行李整理與登機", items: [
      { id: "baggage", title: "往返行李額度與秤重", note: "分別查看長榮去程與星宇回程訂單的件數、重量、尺寸；伴手禮也預留空間，額度依實際票種。" },
      { id: "liquids", title: "隨身液體與透明夾鏈袋", note: "一般國際線手提液體每個容器不超過 100ml，集中在一個不超過 1L 的透明可重封袋；大瓶盥洗用品放託運。", url: "https://www.kia.gov.tw/filearea/knowledge.html", link: "機場官方手提液體規定" },
      { id: "luggage-tags", title: "行李牌、收納袋與購物袋", note: "行李加上聯絡資訊，準備髒衣／濕物收納及折疊購物袋；鎖具依行李需要。" },
      { id: "carry-on", title: "隨身必需品與備用衣物", note: "護照、錢、手機、必要藥品及貴重物隨身放；可備一套換洗。若帶零食或泡麵，先核對肉製品等檢疫限制。", url: "https://www.maff.go.jp/aqs/languages/bring_meat_cn_han.html", link: "日本動物檢疫官方說明" },
      { id: "day-bag", title: "輕便日用包、水瓶與雨具・按需", note: "每天只帶需要的物品；水瓶、折傘／雨具依習慣準備，過安檢前留意瓶內液體。" }
    ] },
    { id: "ski", title: "滑雪同伴・按需準備", items: [
      { id: "ski-booking", title: "滑雪課程、雪票與租借預訂", note: "確認日期、人數、集合時間、租借與歸還方式；需要預約的先保存確認信。", url: "https://sapporo-moiwa.jp/en/rental/", link: "藻岩山滑雪場租借資訊" },
      { id: "ski-gear", title: "雪衣褲、手套、護目鏡與安全帽", note: "逐項問清楚租借包含什麼、哪些需自備，確認尺寸與是否有庫存。" },
      { id: "ski-cover", title: "滑雪活動的保險適用範圍", note: "滑雪者依實際活動向保險公司確認承保與除外內容，存好協助電話；不滑雪者可勾不適用。" }
    ] }
  ];
  const ids = new Set(groups.flatMap(group => group.items.map(item => item.id)));
  let failed = false;
  let expanded = false;
  const openGroups = new Set();
  let unsaved = {};
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  function readSaved() {
    let raw;
    try { raw = window.localStorage.getItem(storageKey); }
    catch { failed = true; return null; }
    try {
      const saved = JSON.parse(raw || "{}");
      return Object.fromEntries([...ids].filter(id => saved && saved[id] === true).map(id => [id, true]));
    } catch { return {}; }
  }
  let checked = readSaved() || {};
  function applyPending(base) {
    const result = { ...base };
    for (const [id, done] of Object.entries(unsaved)) {
      if (done) result[id] = true;
      else delete result[id];
    }
    return result;
  }
  const countText = () => `${Object.keys(checked).length} / ${ids.size} 已備妥`;
  const groupCount = group => `${group.items.filter(item => checked[item.id]).length} / ${group.items.length}`;
  const statusText = () => failed ? "此瀏覽器目前無法儲存，勾選只保留在本頁；離開或重新整理後請再確認。" : "只存這支手機，團員各自勾選；已備妥或不適用的項目再打勾。";
  function html() {
    return `<details class="departure-prep" id="departure-prep" ${expanded ? "open" : ""}>
      <summary><strong>出發前準備</strong><span data-prep-count aria-live="polite">${countText()}</span><span class="prep-chevron" aria-hidden="true">⌄</span></summary>
      <div class="prep-content"><p class="prep-status" data-prep-status role="status">${statusText()}</p>
        <div class="prep-groups">${groups.map(group => `<details class="prep-group" data-prep-group="${group.id}" ${openGroups.has(group.id) ? "open" : ""}><summary><strong>${escape(group.title)}</strong><span data-prep-group-count="${group.id}">${groupCount(group)}</span><span class="prep-chevron" aria-hidden="true">⌄</span></summary><div class="prep-group-items">${group.items.map(item => `<div class="prep-item"><label><input type="checkbox" data-prep-id="${item.id}" ${checked[item.id] ? "checked" : ""}><span><strong>${escape(item.title)}</strong><small>${escape(item.note)}</small></span></label>${(item.links || (item.url ? [{ url: item.url, title: item.link }] : [])).map(link => `<a href="${escape(link.url)}" target="_blank" rel="noopener noreferrer">${escape(link.title)} ↗</a>`).join("")}</div>`).join("")}</div></details>`).join("")}</div>
        <p class="prep-source-note">官方資訊查閱：2026/11/10。證件、租車、藥品與航空規定，出發前再確認最新公告。此清單為個人準備參考，依需要勾選。</p>
      </div></details>`;
  }
  function paint() {
    host.querySelectorAll("[data-prep-id]").forEach(input => { input.checked = checked[input.dataset.prepId] === true; });
    const count = host.querySelector("[data-prep-count]");
    if (count) count.textContent = countText();
    host.querySelectorAll("[data-prep-group-count]").forEach(node => {
      const group = groups.find(group => group.id === node.dataset.prepGroupCount);
      if (group && node.textContent !== groupCount(group)) node.textContent = groupCount(group);
    });
    const status = host.querySelector("[data-prep-status]");
    if (status && status.textContent !== statusText()) status.textContent = statusText();
  }
  host.addEventListener("change", event => {
    const input = event.target.closest("input[data-prep-id]");
    if (!input || !ids.has(input.dataset.prepId)) return;
    unsaved[input.dataset.prepId] = input.checked;
    checked = applyPending(readSaved() || checked);
    try { window.localStorage.setItem(storageKey, JSON.stringify(checked)); failed = false; unsaved = {}; }
    catch { failed = true; }
    paint();
  });
  host.addEventListener("toggle", event => {
    if (event.target.id === "departure-prep") expanded = event.target.open;
    const groupId = event.target.dataset?.prepGroup;
    if (groups.some(group => group.id === groupId)) {
      if (event.target.open) openGroups.add(groupId);
      else openGroups.delete(groupId);
    }
  }, true);
  window.addEventListener("storage", event => {
    if (event.key !== storageKey && event.key !== null) return;
    checked = applyPending(readSaved() || checked);
    paint();
  });
  window.HOKKAIDO_DEPARTURE_PREP = { html };
})();
