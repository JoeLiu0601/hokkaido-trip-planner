# 北海道行程

一個不依賴框架的北海道行程 APP，直接用瀏覽器開啟 `index.html` 就能使用。

## 主要功能
- 冬季模板 10 天游程
- 景點搜尋、加入/移除、順序調整
- 手動儲存與未儲存提醒
- 匯出/匯入 JSON
- Firebase 雲端自動同步（手機/電腦共用同一組同步代碼）

## 開啟方式
1. 直接用瀏覽器打開 `index.html`
2. 或用 VS Code Live Server 開啟

## 雲端自動同步設定（一次性）

### 1. 建立 Firebase 專案
1. 到 Firebase Console 建立新專案
2. 在 `Build -> Firestore Database` 建立資料庫（先用測試模式）
3. 在 `Project settings -> General` 建立 Web App，拿到設定值

### 2. 填寫 sync-config.js
編輯 `sync-config.js`，把下列欄位補齊：

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

### 3. Firestore 規則（先求可用）
先用簡單規則讓你快速驗證同步：

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

注意：這是開放規則，正式上線前建議改成登入驗證或更嚴格規則。

## 使用同步
1. 在工具列輸入一組「同步代碼」
2. 點 `啟用自動同步`
3. 在手機與電腦都輸入同一組代碼
4. 後續編輯會自動同步到雲端

## Git 推送
```bash
git add .
git commit -m "feat: update planner"
git push origin master
git push origin master:main
```
