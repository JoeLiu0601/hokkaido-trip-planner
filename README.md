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
- 已選景點不可重複加入（避免重複選取）
- 手動儲存與未儲存提醒
- 匯出 / 匯入 JSON
- Firebase 雲端自動同步（手機 / 電腦共用同一組同步代碼）

## 快速開始
1. 直接用瀏覽器打開 `index.html`
2. 或用 VS Code Live Server 開啟

## 同步代碼怎麼用
1. 在工具列輸入一組同步代碼（例如：`trip-2026-hokkaido-lee`）
2. 點 `啟用自動同步`
3. 手機與電腦輸入完全相同的代碼
4. 之後任一裝置修改，另一端會自動更新

注意事項：
- 同步代碼可自訂，但要完全一致（大小寫 / 符號都要一致）
- 不同代碼代表不同雲端資料空間

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

### 3. Firestore 規則（先驗證可用）

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tripPlans/{syncCode} {
      allow read, write: if true;
    }
  }
}
```

注意：上述規則為開放模式，正式上線前建議改成登入驗證或更嚴格規則。

## Git 推送

```bash
git add .
git commit -m "feat: update planner"
git push origin master
git push origin master:main
```
