const CACHE_NAME = 'image-shark-v1.0';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.svg',
  'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // First cache the static assets that we know exist
        return cache.addAll(ASSETS_TO_CACHE)
          .then(() => {
            // Then try to cache the dynamic assets
            const dynamicAssets = [
              '/assets/index.css',
              '/assets/index.js',
              '/assets/index.legacy.js'
            ];
            
            // Don't fail if dynamic assets aren't available (development mode)
            return Promise.allSettled(
              dynamicAssets.map(url => 
                fetch(url)
                  .then(response => {
                    if (response.ok) {
                      return cache.put(url, response);
                    }
                    return Promise.resolve();
                  })
                  .catch(() => Promise.resolve()) // Silently continue if asset doesn't exist
              )
            );
          });
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Skip non-HTTP(S) requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  // Skip chrome-extension requests
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  // Skip module script requests to avoid MIME type issues
  if (event.request.destination === 'script' && event.request.mode === 'module') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Don't cache failed responses
          if (!response || response.status !== 200) {
            return response;
          }

          // Don't cache chrome-extension URLs
          if (response.url.startsWith('chrome-extension://')) {
            return response;
          }

          // Clone the response before caching
          const responseToCache = response.clone();

          // Only cache same-origin requests or CORS-enabled resources
          if (response.type === 'basic' || response.type === 'cors') {
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              })
              .catch(() => {
                // Silently handle caching errors
                console.warn('Failed to cache:', event.request.url);
              });
          }

          return response;
        });
      })
      .catch(() => {
        // Return a custom offline response
        return new Response('Network error', { 
          status: 503, 
          statusText: 'Service Unavailable' 
        });
      })
  );
});