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
  // Skip non-HTTP(S) requests and chrome-extension requests
  if (!event.request.url.startsWith('http') || event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  // Skip requests for module scripts to avoid MIME type issues
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
          // Only cache successful responses from our own origin
          if (!response || response.status !== 200 || 
              (response.type !== 'basic' && response.type !== 'cors')) {
            return response;
          }

          // Clone the response before caching
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              // Only cache same-origin requests or CORS-enabled resources
              if (response.type === 'basic' || response.type === 'cors') {
                return cache.put(event.request, responseToCache);
              }
              return Promise.resolve();
            })
            .catch(err => {
              console.warn('Cache put failed:', err);
              return Promise.resolve(); // Continue even if caching fails
            });
          return response;
        });
      })
      .catch(error => {
        console.error('Fetch failed:', error);
        return new Response('Network error', { status: 503, statusText: 'Service Unavailable' });
      })
  );
});