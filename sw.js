const CACHE_NAME = 'cool-cache';
// Karena aplikasi kamu hanya berupa 1 file index.html tunggal, ubah precache-nya menjadi seperti ini:
const PRECACHE_ASSETS = [
  './index.html',
  './'
];

// Listener untuk event install - menyimpan aset ke cache
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll(PRECACHE_ASSETS);
  })());
});

// Listener untuk mengambil data dari cache saat offline
self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return fetch(event.request);
  })());
});
