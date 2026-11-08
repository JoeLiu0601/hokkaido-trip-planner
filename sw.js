const CACHE_NAME = "hokkaido-shell-20261109-main-routes-evening";
const VERSION = "20261109-main-routes-evening";
const SHELL = [
  "./", "./index.html", "./styles.css?v=20261103-day-flights", "./journey.css?v=20261104-sapporo-shopping",
  `./journey-winter.css?v=${VERSION}`, `./timing-drafts.js?v=${VERSION}`, `./app.js?v=${VERSION}`,
  `./travel-tools.js?v=${VERSION}`, "./journey-scenes.js?v=20261026-d9-titles", `./journey.js?v=${VERSION}`,
  `./offline.js?v=${VERSION}`, "./sync-config.js", "./assets/hero-snow-hokkaido-v2.jpg",
  "./assets/pikachu-travel-cutout.png", "./assets/piplup-travel-cutout.png", "./assets/mew-travel-cutout.png", "./assets/mimikyu-cursor.png",
  "./assets/day1-winter-scene.svg?v=20261026-contrast"
];
const knownPaths = new Set(SHELL.map(path => new URL(path, self.registration.scope).pathname));

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith("hokkaido-shell-") && name !== CACHE_NAME).map(name => caches.delete(name)));
    await self.clients.claim();
    const clients = await self.clients.matchAll();
    clients.forEach(client => client.postMessage({ type: "OFFLINE_READY", version: CACHE_NAME }));
  })());
});
self.addEventListener("message", event => {
  if (event.data?.type === "CHECK_OFFLINE") event.source?.postMessage({ type: "OFFLINE_READY", version: CACHE_NAME });
});
self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || !knownPaths.has(url.pathname)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      const response = await fetch(request);
      if (!response.ok) throw new Error("Network response unavailable");
      // A full device cache must not discard a valid online response.
      try { await cache.put(request, response.clone()); } catch {}
      return response;
    } catch {
      const stored = await cache.match(request, { ignoreSearch: true });
      if (stored) return stored;
      if (request.mode === "navigate") return (await cache.match(new URL("./index.html", self.registration.scope))) || Response.error();
      return Response.error();
    }
  })());
});
