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

### 3. Firestore 規則

```txt
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    function validSyncCode(syncCode) {
      return syncCode.matches('^[a-z0-9_-]{1,40}$');
    }

    function validTripPlan() {
      return request.resource.data.keys().hasOnly([
          'plan',
          'carModel',
          'updatedAt',
          'updatedBy',
          'version',
          'changes'
        ])
        && request.resource.data.keys().hasAll([
          'plan',
          'updatedAt',
          'updatedBy',
          'version',
          'changes'
        ])
        && request.resource.data.plan is map
        && request.resource.data.updatedAt is number
        && request.resource.data.updatedBy is string
        && request.resource.data.updatedBy.size() <= 64
        && request.resource.data.version is number
        && request.resource.data.changes is list
        && request.resource.data.changes.size() <= 30
        && (!('carModel' in request.resource.data)
          || (request.resource.data.carModel is string
            && request.resource.data.carModel.size() <= 40));
    }

    match /tripPlans/{syncCode} {
      allow get: if validSyncCode(syncCode);
      allow list: if false;
      allow create, update: if validSyncCode(syncCode) && validTripPlan();
      allow delete: if false;
    }
  }
}
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
