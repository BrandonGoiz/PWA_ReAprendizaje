const CACHE_NAME = 'my-cache-v2'; // Cambiado a una nueva versión de la caché
const dynamicCacheName = 'dynamic-cache';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/',
        './index.html',
        './style.css',
        './index.js',
        './img/icon.png',
        './img/illustracion.png',
        './img/logo.png',
        // Agrega aquí todos los recursos que deseas almacenar en caché
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => {
          return name.startsWith('my-cache') && name !== CACHE_NAME;
        }).map(name => {
          return caches.delete(name);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; // Si está en caché, devuelve la respuesta
      }
      // Si no está en caché, intenta buscarlo en la red y guardarlo en caché dinámicamente
      return fetch(event.request).then(fetchResponse => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(event.request, fetchResponse.clone()); // Almacena la respuesta en la caché dinámica
          return fetchResponse;
        });
      }).catch(() => {
        // En caso de fallo en la red, muestra una página de fallback
        return caches.match('/offline.html');
      });
    })
  );
});
