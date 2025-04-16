// Cloudflare Speculation Rules
self.addEventListener('fetch', event => {
  if (event.request.url.endsWith('/cdn-cgi/speculation')) {
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
                "href_matches": "https://voltifygroup.com/(.*)"
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
  }
});
