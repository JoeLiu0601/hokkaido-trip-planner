# 北海道行程（12/23~1/1）

純前端行程規劃工具，直接用瀏覽器開啟 `index.html` 即可使用。

目前行程設定：
- 新千歲機場入境
- 旭川 1 天
- 札幌 6 天
- 洞爺湖 1 天
- 函館 2 天（含函館機場離境）

## 主要功能
- 冬季模板 10 天游程
- 景點搜尋、加入/移除、上下移動排序
- 每日午餐與晚餐安排（首選、備選、時間、優先度、訂位狀態與備註）
- 已選景點不可重複加入（避免重複選取）
- 手動儲存與未儲存提醒
- 儲存 PDF（開啟瀏覽器列印，保存當下完整 10 天行程）
- 當日摘要與 Day 2 富良野備案預覽、套用及還原
- 手機版將當日摘要放在日期下方，同步設定可展開，景點篩選可橫滑
- Firebase 雲端自動同步（手機 / 電腦共用同一組同步代碼）

## 快速開始
1. 直接用瀏覽器打開 `index.html`
2. 或用 VS Code Live Server 開啟

## 同步代碼怎麼用
1. 展開「同步與設定」，輸入同步代碼 `py`
2. 點 `啟用自動同步`
3. 手機與電腦輸入完全相同的代碼
4. 之後任一裝置修改，另一端會自動更新

注意事項：
- 同步代碼等同這份行程的存取密鑰；`py` 等短代碼方便使用，但可能被其他人猜到
- 同步代碼要完全一致；頁面會統一轉成小寫
- 不同代碼代表不同雲端資料空間
- Day 2 原行程備份保留在切換方案的裝置，按同步代碼分開保存；套用後的每日行程照常同步。其他裝置沒有原備份時，還原會使用預設 Day 2 行程。

## 儲存 PDF

點「儲存 PDF」開啟系統列印畫面，再選擇 PDF 儲存選項（名稱依裝置與瀏覽器而異）。內容包含封面、住宿及完整 10 天景點／餐食，使用目前畫面的資料，包括尚未儲存的修改。地圖連結需要網路才能開啟。PDF 是當下快照，不會隨雲端更新。

## Firebase 雲端設定（一次性）

### 1. 建立 Firebase 專案
1. 到 Firebase Console 建立專案
2. 在 `Build -> Firestore Database` 建立資料庫（可先選測試模式）
3. 在 `Project settings -> General` 建立 Web App

### 2. 填寫 `sync-config.js`

```js
window.HOKKAIDO_SYNC_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Firestore 規則

專案以根目錄的 `firestore.rules` 為唯一規則來源，避免 README 範例與實際規則不同步。登入 Firebase CLI 後執行：

```bash
firebase deploy --only firestore:rules
```

注意：Firebase Web API key 會出現在前端程式碼與瀏覽器裡，這是 Firebase Web App 的正常設計；不要把它當成後端密鑰。真正要保護的是 Firestore Security Rules、Google Cloud API key restrictions 和 App Check。

建議到 Google Cloud Console -> APIs & Services -> Credentials -> 選擇這把 Firebase Web API key：
- Application restrictions：限制 HTTP referrers，例如 `https://joeliu0601.github.io/*`
- API restrictions：只允許 Firebase 需要的 API，不要把 Gemini、Maps 等其他 API 混用同一把 key
- 如果已經公開過又不放心，可以 rotate key，然後更新 `sync-config.js`

## Git 推送

```bash
git add .
git commit -m "feat: update planner"
git push origin main
```
