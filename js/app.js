/* ============================================================
   app.js — Boot script

   TWO MODES — controlled by SHEETS_API_URL below:

   ┌─────────────────────────────────────────────────────────┐
   │  SHEETS_API_URL = null  →  LOCAL mode                   │
   │    Reads data/registry.js → injects data/pages/*.js     │
   │    Use during development (no internet needed).         │
   │                                                         │
   │  SHEETS_API_URL = '…'   →  API mode                     │
   │    fetch(url + ?slug=…) → JSON → Renderer.render()      │
   │    Use in production after deploying Apps Script.       │
   └─────────────────────────────────────────────────────────┘

   SWITCHING MODES
   ───────────────
   1. Deploy google-apps-script/Code.gs as a web app.
   2. Copy the deployment URL (ends with /exec).
   3. Replace null below with that URL string.
   4. Deploy to Cloudflare Pages.
   ============================================================ */

/* ── SET THIS to your Apps Script deployment URL ───────────
   Leave as null to stay in local / development mode.
   ──────────────────────────────────────────────────────────── */
const SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycbw0D7jLw5mOl90-tIkBpgQugiQ7IqDi7rC9uoRmfWYl17T-7gwv6qFx7hvSOyd0el1SwA/exec';
// const SHEETS_API_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';


/* ─────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function () {
  var slug = _resolveSlug();

  if (SHEETS_API_URL) {
    _loadFromAPI(slug);
  } else {
    _loadFromRegistry(slug);
  }
});


/* ── API MODE ───────────────────────────────────────────────
   Fetches PAGE_DATA from the Apps Script web app and passes
   it directly to Renderer.render(). The renderer is unchanged.
   ──────────────────────────────────────────────────────────── */
function _loadFromAPI(slug) {
  var url = SHEETS_API_URL + '?slug=' + encodeURIComponent(slug);

  fetch(url, { redirect: 'follow' })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status + ' from API');
      return res.json();
    })
    .then(function (data) {
      if (data.error) throw new Error('API returned error: ' + data.error);
      Renderer.render(data, 'app');
    })
    .catch(function (err) {
      /* If you see CORS errors here, see README for the
         Cloudflare Worker proxy workaround. */
      _showError('[API] ' + err.message);
    });
}


/* ── LOCAL MODE (development) ───────────────────────────────
   Resolves slug → file path via PAGE_REGISTRY, then injects
   the page data file as a <script> tag. Once loaded, PAGE_DATA
   is available globally and passed to Renderer.render().
   ──────────────────────────────────────────────────────────── */
function _loadFromRegistry(slug) {
  if (typeof PAGE_REGISTRY === 'undefined') {
    _showError('PAGE_REGISTRY not found. Make sure data/registry.js is loaded before app.js.');
    return;
  }

  var filePath = PAGE_REGISTRY.pages[slug];

  if (!filePath) {
    _showError(
      'No page registered for slug "' + slug + '". ' +
      'Add it to data/registry.js or pass ?page= in the URL.'
    );
    return;
  }

  var script  = document.createElement('script');
  script.src  = filePath;
  script.async = false;

  script.onload = function () {
    if (typeof PAGE_DATA === 'undefined') {
      _showError(
        'PAGE_DATA was not set by "' + filePath + '". ' +
        'Check that the file ends with: window.PAGE_DATA = { … };'
      );
      return;
    }
    Renderer.render(PAGE_DATA, 'app');
  };

  script.onerror = function () {
    _showError(
      'Could not load page file: "' + filePath + '". ' +
      'Check the path in data/registry.js and run via a local server (not file://).'
    );
  };

  document.head.appendChild(script);
}


/* ── Slug resolution ────────────────────────────────────────
   Priority order:
     1. ?page=shavlego        (URL param — dev override)
     2. PAGE_REGISTRY.default (local fallback from registry.js)
     3. hostname              (www.shavlego.one → "shavlego")
     4. 'shavlego'            (hard fallback)
   ──────────────────────────────────────────────────────────── */
function _resolveSlug() {
  /* 1 — explicit URL param */
  var params   = new URLSearchParams(window.location.search);
  var urlParam = params.get('page');
  if (urlParam) return urlParam.toLowerCase().trim();

  /* 2 — local registry default */
  if (typeof PAGE_REGISTRY !== 'undefined' && PAGE_REGISTRY.default) {
    return PAGE_REGISTRY.default;
  }

  /* 3 — derive from hostname (production)
         www.shavlego.one  →  shavlego
         demo.mysite.com   →  demo               */
  var hostname = window.location.hostname;
  if (hostname && hostname !== 'localhost' && hostname !== '127.0.0.1') {
    return hostname.replace(/^www\./, '').split('.')[0].toLowerCase().trim();
  }

  /* 4 — absolute fallback */
  return 'shavlego';
}


/* ── Error display ──────────────────────────────────────────── */
function _showError(msg) {
  var app = document.getElementById('app');
  if (app) {
    app.innerHTML =
      '<div style="padding:2rem;color:#cc0000;font-family:monospace;line-height:1.6;">' +
      '<strong>[app.js] Page load error</strong><br><br>' + msg +
      '</div>';
  }
  console.error('[app.js]', msg);
}
