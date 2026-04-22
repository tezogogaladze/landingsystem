/* ============================================================
   data/registry.js — Page registry

   Maps page slug keys to their local data file paths.
   This is the ONLY file that needs to change when adding a
   new landing page to the system.

   How app.js uses this:
     1. Reads ?page=slug from the URL
     2. Looks up the slug in PAGE_REGISTRY.pages
     3. Dynamically loads the matching file
     4. Calls Renderer.render(window.PAGE_DATA, 'app')

   ── Adding a new page ─────────────────────────────────────
     1. Create data/pages/my-product.js (copy any existing page)
     2. Add one line here:
          'my-product': 'data/pages/my-product.js'
     3. Visit index.html?page=my-product
     Done. index.html never changes.

   ── Future: hostname-based routing ───────────────────────
     When each page gets its own domain, replace the slug
     lookup in app.js with a hostname lookup:

       // Option A — hostname maps to a slug in this registry
       const HOST_MAP = {
         'shavlego.example.com': 'shavlego',
         'fitplan.example.com':  'demo'
       };
       const slug = HOST_MAP[location.hostname] || PAGE_REGISTRY.default;

       // Option B — hostname drives a backend fetch entirely
       fetch('/api/page?host=' + location.hostname)
         .then(r => r.json())
         .then(data => Renderer.render(data, 'app'));

     Neither change requires touching index.html, CSS, or blocks.
   ============================================================ */

window.PAGE_REGISTRY = {

  /* Slug loaded when no ?page= param is present */
  default: 'shavlego',

  /* slug → relative path from project root */
  pages: {
    'shavlego': 'data/pages/shavlego.js',
    'demo':     'data/pages/demo.js'
  }

};
