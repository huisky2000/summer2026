const CACHE_NAME = 'eurotrip-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install Event: Cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(ASSETS);
      })
  );
});

// Fetch Event: Serve from cache if offline
self.addEventListener('fetch', event => {
  // Exclude weather API from caching so it always tries to get live data
  if (event.request.url.includes('api.open-meteo.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});