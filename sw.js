const CACHE_NAME = 'luigy-cache-v3'; // ⚠️ תשנה את המספר בכל עדכון

const urlsToCache = [
  './',
  './index.html',
  './icon.png',
  './pics/star.png',
  './pics/coin.png',
  './pics/LUIGY CODE.png',
  './pics/Luigy Logo - final.png'
];

// התקנה
self.addEventListener('install', event => {
  self.skipWaiting(); // מפעיל מיד את הגרסה החדשה

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// הפעלה (ומחיקת קאש ישן)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim(); // משתלט מיד על כל הטאבים
});

// בקשות רשת – NETWORK FIRST (קריטי לעדכונים)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // מעדכן את הקאש עם גרסה חדשה
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => {
        // אם אין אינטרנט – חוזר לקאש
        return caches.match(event.request);
      })
  );
});