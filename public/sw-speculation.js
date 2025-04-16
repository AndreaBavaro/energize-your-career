// Service Worker for handling speculation rules requests
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

// Intercept fetch requests
self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);
  
  // Handle speculation rules requests to prevent 404 errors
  if (url.pathname === '/cdn-cgi/speculation') {
    event.respondWith(
      new Response(
        JSON.stringify({
          "prefetch": [
            {
              "source": "list",
              "urls": ["/", "/contact", "/testimonials", "/charity", "/blog"]
            }
          ],
          "prerender": [
            {
              "source": "document",
              "where": {
                "href_matches": "/*"
              }
            }
          ]
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    );
    return;
  }
  
  // We've moved the font files to the correct location, so no need to redirect
  // This service worker now focuses on handling speculation rules requests
});
