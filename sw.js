// Cache version baru - paksa update
const CACHE_NAME = 'nersface-v5-' + Date.now();

// Install - skip waiting langsung
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

// Activate - hapus SEMUA cache lama tanpa terkecuali
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) {
        return caches.delete(k);
      }));
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch - SELALU dari network, tidak pernah dari cache
// Ini memastikan HTML selalu fresh
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return new Response('Offline - please check connection', {
        status: 503,
        statusText: 'Service Unavailable'
      });
    })
  );
});
