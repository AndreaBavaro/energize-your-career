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
  
  // Handle font file requests that might be 404ing
  if (url.pathname.includes('/fonts/') && !url.pathname.includes('/public/fonts/')) {
    // Redirect to the correct path
    const newUrl = url.pathname.replace('/fonts/', '/public/fonts/');
    event.respondWith(
      fetch(new Request(newUrl, {
        method: event.request.method,
        headers: event.request.headers,
        mode: event.request.mode,
        credentials: event.request.credentials,
        redirect: event.request.redirect
      }))
    );
    return;
  }
});
