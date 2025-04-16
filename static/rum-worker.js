// Service Worker for handling Cloudflare RUM requests
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
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
  }
});
