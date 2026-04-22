/* ============================================================
   app.js — Boot script

   Resolves which page to load, fetches its data file
   dynamically, then hands the data to the Renderer.

   Page selection priority (first match wins):
     1. ?page=slug  URL query parameter
     2. PAGE_REGISTRY.default  (fallback)

   This means index.html never changes between pages.
   The only wiring needed is one entry in data/registry.js.

   ── Future: API-based loading ─────────────────────────────
   Replace _loadPageScript() with a fetch() call:

     fetch('/api/page?slug=' + slug)
       .then(r => { if (!r.ok) throw r; return r.json(); })
       .then(data => Renderer.render(data, 'app'))
       .catch(err => _showError('Failed to load page: ' + err.status));

   ── Future: hostname-based routing ────────────────────────
   Replace _resolveSlug() with:

     const HOST_MAP = PAGE_REGISTRY.hostnames || {};
     return HOST_MAP[location.hostname] || PAGE_REGISTRY.default;

   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof PAGE_REGISTRY === 'undefined') {
    _showError('PAGE_REGISTRY not found. Check that data/registry.js is loaded.');
    return;
  }

  const slug     = _resolveSlug();
  const filePath = PAGE_REGISTRY.pages[slug];

  if (!filePath) {
    _showError('No page registered for slug "' + slug + '". Add it to data/registry.js.');
    return;
  }

  _loadPageScript(filePath, slug);
});

/* ── Slug resolution ──────────────────────────────────────── */
function _resolveSlug() {
  const param = new URLSearchParams(window.location.search).get('page');
  return (param && PAGE_REGISTRY.pages[param]) ? param : PAGE_REGISTRY.default;
}

/* ── Dynamic script loader ────────────────────────────────── */
function _loadPageScript(filePath, slug) {
  const script  = document.createElement('script');
  script.src    = filePath;
  script.async  = false;

  script.onload = () => {
    if (typeof PAGE_DATA === 'undefined') {
      _showError('PAGE_DATA was not set by "' + filePath + '". Check the file exports window.PAGE_DATA.');
      return;
    }
    Renderer.render(PAGE_DATA, 'app');
  };

  script.onerror = () => {
    _showError('Could not load page file: "' + filePath + '". Check the path in data/registry.js.');
  };

  document.head.appendChild(script);
}

/* ── Error display ────────────────────────────────────────── */
function _showError(msg) {
  console.error('[App]', msg);
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML =
      '<div style="padding:40px 24px;font-family:sans-serif;color:#b91c1c;">' +
      '<strong>Page load error</strong><br><br>' + msg + '</div>';
  }
}
