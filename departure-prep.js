(() => {
  "use strict";
  const host = document.getElementById("journey-view");
  if (!host) return;
  const storageKey = "hokkaido-departure-prep-20261223";
  const groups = [
    { title: "證件與自駕", items: [
      { id: "passport", title: "護照正本與效期", note: "確認護照有效、姓名與機票一致，出門前放進隨身包。" },
      { id: "license", title: "台灣駕照正本・每位駕駛", note: "先檢查駕照有效日期；印載日期已過期時，先換照再申請譯本。取車時登錄所有會開車的人。" },
      { id: "translation", title: "駕照日文譯本・每位駕駛", note: "與駕照正本、護照一起帶。申請規費 NT$100；臨櫃隨辦隨領，網路含郵寄約 7–12 個工作天、另付郵資。", url: "https://www.gov.tw/News_Content_2_376856", link: "日文譯本官方申辦" },
      { id: "rental", title: "租車訂單、付款卡與車輛確認", note: "存好取還車門市與聯絡方式；確認雪胎、保險／補償內容、ETC 需求，備妥付款用信用卡。", url: "https://www.nipponrentacar.co.jp/guide/userguide.html", link: "租車公司取車規定" }
    ] },
    { title: "入境、訂單與付款", items: [
      { id: "bookings", title: "機票與住宿訂單", note: "備妥航班、飯店地址與聯絡方式，重要訂單及行程 PDF 存一份離線可看的副本。" },
      { id: "entry", title: "Visit Japan Web 入境資料", note: "可先填入境審查與海關申報資料，出發前確認可登入並顯示 QR code。", url: "https://services.digital.go.jp/visit-japan-web/", link: "Visit Japan Web 官方入口" },
      { id: "payment", title: "日圓、信用卡與備用付款", note: "準備部分現金及可在海外使用的卡片，小店用餐與停車也預留現金。" }
    ] },
    { title: "手機與冬季行李", items: [
      { id: "phone", title: "日本網路、充電線與行動電源", note: "準備 eSIM／漫遊或 Wi-Fi，確認啟用方式；電池攜帶規定出發前向航空公司核對。" },
      { id: "winter", title: "保暖衣物與防滑鞋", note: "冬季外套、保暖層、手套、圍巾、帽子、厚襪與適合雪地步行的鞋。" },
      { id: "insurance", title: "旅遊保險與個人常備用品", note: "備好保單、協助電話與平常使用的藥品；滑雪者另確認保單適用的活動範圍。" }
    ] }
  ];
  const ids = new Set(groups.flatMap(group => group.items.map(item => item.id)));
  let failed = false;
  let expanded = false;
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
  const statusText = () => failed ? "此瀏覽器目前無法儲存，勾選只保留在本頁；離開或重新整理後請再確認。" : "只存這支手機，團員各自勾選；已備妥或不適用的項目再打勾。";
  function html() {
    return `<details class="departure-prep" id="departure-prep" ${expanded ? "open" : ""}>
      <summary><strong>出發前準備</strong><span data-prep-count aria-live="polite">${countText()}</span><span class="prep-chevron" aria-hidden="true">⌄</span></summary>
      <div class="prep-content"><p class="prep-status" data-prep-status role="status">${statusText()}</p>
        <div class="prep-groups">${groups.map(group => `<fieldset><legend>${escape(group.title)}</legend>${group.items.map(item => `<div class="prep-item"><label><input type="checkbox" data-prep-id="${item.id}" ${checked[item.id] ? "checked" : ""}><span><strong>${escape(item.title)}</strong><small>${escape(item.note)}</small></span></label>${item.url ? `<a href="${escape(item.url)}" target="_blank" rel="noopener noreferrer">${escape(item.link)} ↗</a>` : ""}</div>`).join("")}</fieldset>`).join("")}</div>
        <p class="prep-source-note">文件資訊查閱：2026/11/10。駕駛文件與租車條件請依官方最新規定確認。</p>
      </div></details>`;
  }
  function paint() {
    host.querySelectorAll("[data-prep-id]").forEach(input => { input.checked = checked[input.dataset.prepId] === true; });
    const count = host.querySelector("[data-prep-count]");
    if (count) count.textContent = countText();
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
  }, true);
  window.addEventListener("storage", event => {
    if (event.key !== storageKey && event.key !== null) return;
    checked = applyPending(readSaved() || checked);
    paint();
  });
  window.HOKKAIDO_DEPARTURE_PREP = { html };
})();
