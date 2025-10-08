self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('states-cache-v6').then(cache => {
      return cache.addAll([
        './',
        './index.html'
      ]);
    })
  );
});

// ძველი ქეშების წაშლა
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== 'states-cache-v6')
            .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});