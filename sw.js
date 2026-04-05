const CACHE_NAME = 'luigy-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './icon.png',
  './pics/star.png',
  './pics/coin.png',
  './pics/LUIGY CODE.png',
  './pics/Luigy Logo - final.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});