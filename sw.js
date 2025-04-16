// Service Worker for handling Cloudflare requests
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

// Intercept fetch requests
self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);
  
  // Handle speculation rules requests
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
  
  // Handle RUM POST requests
  if (url.pathname === '/cdn-cgi/rum' && event.request.method === 'POST') {
    event.respondWith(
      new Response(
        JSON.stringify({
          "success": true,
          "errors": [],
          "messages": ["RUM data received"]
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      )
    );
    return;
  }
});
