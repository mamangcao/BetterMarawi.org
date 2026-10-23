/*
 * BetterMarawi.org service worker.
 * Makes the site installable and shows an offline page when a page cannot load.
 * Pages always come from the network. The worker never serves a saved copy of a page, so nothing
 * shown online can be out of date; offline, every address gets public/offline.html instead.
 *
 * Changing CACHE deletes the old cache on activation (v1 held a stale copy of the home page).
 */
const CACHE = 'bettermarawi-v2';
const OFFLINE_URL = '/offline.html';

const saveOfflinePage = () =>
  caches.open(CACHE).then((cache) => cache.add(new Request(OFFLINE_URL, { cache: 'reload' })));

self.addEventListener('install', (event) => {
  event.waitUntil(saveOfflinePage());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Refresh the saved offline page once per worker start, after a page loads online, so an edited
// offline page reaches visitors even when this file has not changed.
let refreshed = false;

self.addEventListener('fetch', (event) => {
  // Only page navigations; everything else goes straight to the network as usual
  if (event.request.mode !== 'navigate') return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (!refreshed) {
          refreshed = true;
          event.waitUntil(saveOfflinePage().catch(() => {}));
        }
        return response;
      })
      .catch(async () => {
        const cache = await caches.open(CACHE);
        return (await cache.match(OFFLINE_URL)) || Response.error();
      })
  );
});
