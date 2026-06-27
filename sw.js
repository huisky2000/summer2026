// Simple offline-first cache for the Summer Trip Companion PWA.
// Bump CACHE_NAME whenever you change a cached file so old phones pick up
// the update.
const CACHE_NAME = "summer-trip-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./app.js",
  "./data.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Never cache live weather data — always go to the network for that.
  if (req.url.includes("api.open-meteo.com")) {
    event.respondWith(fetch(req).catch(() => new Response("[]", { status: 503 })));
    return;
  }

  // Network-first for our own app files so updates show up quickly;
  // fall back to cache when offline.
  if (req.method === "GET" && req.url.startsWith(self.location.origin)) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Everything else (maps links, app store links, etc.) — just pass through.
});
