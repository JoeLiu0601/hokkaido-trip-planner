(() => {
  const version = "hokkaido-shell-20261109-main-routes-evening";
  const status = document.getElementById("offline-status");
  let ready = false;
  const paint = () => {
    if (!status) return;
    status.textContent = ready
      ? `${navigator.onLine ? "離線頁面已備妥" : "目前離線，使用本機已存行程"}；完成進度只存本機。地圖導航、官方連結與雲端同步仍需網路；另可儲存 PDF。`
      : "離線頁面準備中；完成前請保留網路，或先儲存 PDF。";
  };
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.addEventListener("message", event => {
    if (event.data?.type === "OFFLINE_READY" && event.data.version === version) { ready = true; paint(); }
  });
  const check = () => navigator.serviceWorker.controller?.postMessage({ type: "CHECK_OFFLINE" });
  navigator.serviceWorker.addEventListener("controllerchange", check);
  window.addEventListener("online", paint);
  window.addEventListener("offline", paint);
  paint();
  navigator.serviceWorker.register(new URL("sw.js", document.baseURI), { updateViaCache: "none" })
    .then(() => navigator.serviceWorker.ready)
    .then(registration => { registration.active?.postMessage({ type: "CHECK_OFFLINE" }); check(); })
    .catch(() => { if (status) status.textContent = "離線準備未完成；請先儲存 PDF。行程仍可在連線時使用。"; });
})();
