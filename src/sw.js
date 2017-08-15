// @flow

const CACHE_NAME = 'term-cache-v1';
const urlsToCache = [
  '/',
  '/xterm.css',
  '/static/app.css',
  '/static/client.js',
];

self.addEventListener('install', async () => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(urlsToCache);
  return await self.skipWaiting();
});

self.addEventListener('activate', async () => {
  const keys = await caches.keys();
  const promises = [];
  keys.forEach(cacheName => {
    if (CACHE_NAME === cacheName) return;
    promises.push( caches.delete(cacheName) );
  });
  return Promise.all(promises);
});

self.addEventListener('fetch', (ev: FetchEvent) => {
  ev.respondWith(
    caches.match(ev.request)
      .then(res => res || fetch(ev.request))
  );
});
