const cacheName = 'app-cache-v1';

function preCache() {
  const toCache = self.__precacheManifest.map((resource) => resource.url);

  return caches.open(cacheName)
    .then((cache) => cache.addAll(toCache));
}

function cleanCache() {
  return caches.keys().then((storedCaches) => {
    return Promise.all(
      storedCaches.map((storedCache) => {
        if (storedCache !== cacheName) {
          return caches.delete(storedCache);
        }

        return undefined;
      })
    );
  });
}

function fromCache(request) {
  return caches.open(cacheName)
    .then((cache) => (
      cache.match(request).then((matching) => (
        matching || fetch(request)
      ))
    ));
}

function updateCache(request) {
  return caches.open(cacheName)
    .then((cache) => (
      fetch(request).then((response) => (
        cache.put(request, response)
      ))
    ));
}

self.addEventListener('install', (event) => {
  if (navigator.onLine) {
    event.waitUntil(preCache);
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(cleanCache);
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET')
    return;

  event.respondWith(fromCache(event.request));
  if (navigator.onLine) {
    event.waitUntil(updateCache(event.request));
  }
});
