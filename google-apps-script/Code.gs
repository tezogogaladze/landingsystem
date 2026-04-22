/* ============================================================
   Code.gs — Landing Page CMS · Google Apps Script Web App
   ============================================================

   WHAT THIS DOES
   ──────────────
   Reads content from a Google Spreadsheet (3 tabs: Pages,
   Blocks, Items) and returns a complete PAGE_DATA JSON object
   that matches the exact schema used by the frontend renderer.

   HOW TO DEPLOY
   ─────────────
   1. Open your Google Spreadsheet.
   2. Extensions → Apps Script.
   3. Delete any default code, paste this entire file.
   4. Click Save (Ctrl/Cmd+S). Name the project anything.
   5. Click Deploy → New deployment.
      - Type:       Web app
      - Execute as: Me
      - Who has access: Anyone
   6. Click Deploy → copy the Web App URL.
      It looks like:
        https://script.google.com/macros/s/AKfy.../exec
   7. Paste that URL into js/app.js as SHEETS_API_URL.

   EVERY TIME YOU CHANGE THIS FILE you must create a NEW
   deployment (Deploy → New deployment) — not "Manage
   deployments → Edit". Editing the same deployment version
   does not update the live endpoint.

   SPREADSHEET STRUCTURE
   ─────────────────────
   The script expects the ACTIVE spreadsheet (the one that
   has this Apps Script attached) to contain these 3 sheets.
   Column header names are EXACT — case-sensitive.

   ┌─── Sheet: Pages ─────────────────────────────────────────┐
   │ slug | meta_title | meta_description | meta_lang         │
   │ meta_favicon | theme_primaryColor                        │
   │ settings_currency | settings_ctaAnchor                   │
   └──────────────────────────────────────────────────────────┘

   ┌─── Sheet: Blocks ────────────────────────────────────────┐
   │ id | page_slug | type | order | enabled                  │
   │ content | media | config                                 │
   │                                                          │
   │ content / media / config are JSON strings, e.g.:         │
   │   content: {"title":"შავლეგო","badge":"🔥 ..."}          │
   │   media:   {"image":"https://..."}                       │
   │   config:  {"formId":"order-form"}                       │
   └──────────────────────────────────────────────────────────┘

   ┌─── Sheet: Items ─────────────────────────────────────────┐
   │ block_id | field_name | item_order                       │
   │ icon | title | text | number | rating | author           │
   │ name | type | placeholder | required | autocomplete      │
   │ label | href | value                                     │
   │                                                          │
   │ field_name controls which array the row goes into:       │
   │   "items"  → content.items  (features, benefits, etc.)   │
   │   "fields" → content.fields (form inputs)                │
   │   "links"  → content.links  (contact footer links)       │
   └──────────────────────────────────────────────────────────┘

   TESTING (before connecting frontend)
   ─────────────────────────────────────
   After deploying, open this URL in your browser:
     https://script.google.com/macros/s/YOUR_ID/exec?slug=shavlego
   You should see the full PAGE_DATA JSON.

   ============================================================ */


/* ── Entry point ────────────────────────────────────────────
   GET  /exec?slug=shavlego
   GET  /exec?hostname=www.shavlego.one  (derives slug from host)
   ──────────────────────────────────────────────────────────── */
function doGet(e) {
  try {
    const slug = _resolveSlug(e);
    if (!slug) return _jsonError('Missing parameter: ?slug= or ?hostname=');

    const ss       = SpreadsheetApp.getActiveSpreadsheet();
    const pageData = _buildPageData(ss, slug);

    if (!pageData) return _jsonError('Page not found for slug: "' + slug + '"');

    return ContentService
      .createTextOutput(JSON.stringify(pageData))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return _jsonError('Internal error: ' + err.message);
  }
}


/* ── Slug resolution ────────────────────────────────────────
   Priority:
     1. ?slug=shavlego           (explicit, always wins)
     2. ?hostname=shavlego.one   (derive from first domain segment)
   ──────────────────────────────────────────────────────────── */
function _resolveSlug(e) {
  const p = e.parameter || {};

  if (p.slug) return p.slug.toLowerCase().trim();

  if (p.hostname) {
    /* www.shavlego.one → shavlego */
    return p.hostname
      .toLowerCase()
      .replace(/^www\./, '')
      .split('.')[0]
      .trim();
  }

  return null;
}


/* ── Page assembly ──────────────────────────────────────────
   1. Find the page row in Pages sheet.
   2. Load all blocks for that page_slug from Blocks sheet.
   3. Parse content / media / config JSON strings per block.
   4. Load all items from Items sheet, group by field_name,
      inject arrays into block.content.
   5. Return the assembled PAGE_DATA object.
   ──────────────────────────────────────────────────────────── */
function _buildPageData(ss, slug) {

  /* ── Pages ─────────────────────────────────────────────── */
  const pagesSheet = ss.getSheetByName('Pages');
  if (!pagesSheet) throw new Error('Sheet "Pages" not found in this spreadsheet.');

  const pages = _sheetToObjects(pagesSheet);
  const page  = pages.find(function(p) {
    return String(p.slug || '').toLowerCase() === slug;
  });
  if (!page) return null;


  /* ── Blocks ────────────────────────────────────────────── */
  const blocksSheet = ss.getSheetByName('Blocks');
  if (!blocksSheet) throw new Error('Sheet "Blocks" not found in this spreadsheet.');

  const allBlocks = _sheetToObjects(blocksSheet);
  const blocks    = allBlocks
    .filter(function(b) {
      return String(b.page_slug || '').toLowerCase() === slug;
    })
    .map(function(b) {
      return {
        id:      String(b.id   || ''),
        type:    String(b.type || ''),
        order:   Number(b.order) || 0,
        enabled: _toBool(b.enabled),
        content: _parseJson(b.content),
        media:   _parseJson(b.media),
        config:  _parseJson(b.config),
      };
    });


  /* ── Items ─────────────────────────────────────────────── */
  const itemsSheet = ss.getSheetByName('Items');
  if (itemsSheet) {
    const allItems = _sheetToObjects(itemsSheet);

    blocks.forEach(function(block) {

      /* All item rows for this block, sorted by item_order */
      const rows = allItems
        .filter(function(r) { return String(r.block_id || '') === block.id; })
        .sort(function(a, b) { return Number(a.item_order || 0) - Number(b.item_order || 0); });

      /* Group rows by field_name → which content array they belong to */
      var groups = {};
      rows.forEach(function(row) {
        var fn = String(row.field_name || 'items');
        if (!groups[fn]) groups[fn] = [];
        groups[fn].push(row);
      });

      /* Inject each group into block.content[fieldName] */
      Object.keys(groups).forEach(function(fn) {
        var rowArr = groups[fn];

        if (fn === 'items' && _PLAIN_STRING_TYPES[block.type]) {
          /* specs-list: content.items is string[] not object[] */
          block.content[fn] = rowArr.map(function(r) {
            return String(r.text || '');
          });
        } else {
          block.content[fn] = rowArr.map(_rowToItem);
        }
      });
    });
  }


  /* ── Assemble final PAGE_DATA ───────────────────────────── */
  return {
    slug: String(page.slug),

    meta: {
      title:       String(page.meta_title       || ''),
      description: String(page.meta_description || ''),
      lang:        String(page.meta_lang        || 'ka'),
      favicon:     page.meta_favicon || null,
    },

    theme: {
      primaryColor: String(page.theme_primaryColor || '#e63946'),
    },

    settings: {
      currency:  String(page.settings_currency  || '₾'),
      ctaAnchor: String(page.settings_ctaAnchor || '#order-form'),
    },

    blocks: blocks,
  };
}


/* ── Block types where content.items is string[] ────────────
   Add a type here if its renderer calls e(item) directly
   instead of e(item.someProperty).
   ──────────────────────────────────────────────────────────── */
var _PLAIN_STRING_TYPES = {
  'specs-list': true,
};


/* ── Sheet → array of row objects ───────────────────────────
   Row 1 is treated as the header. Every subsequent row
   becomes a plain object keyed by the header values.
   Empty header cells are skipped.
   ──────────────────────────────────────────────────────────── */
function _sheetToObjects(sheet) {
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];

  var headers = data[0].map(function(h) { return String(h).trim(); });

  return data.slice(1).map(function(row) {
    var obj = {};
    headers.forEach(function(h, i) {
      if (h) obj[h] = row[i];
    });
    return obj;
  });
}


/* ── Items row → clean item object ─────────────────────────
   Strips the metadata columns (block_id, field_name,
   item_order) and removes empty/null values so that the
   resulting object only contains real content.
   ──────────────────────────────────────────────────────────── */
function _rowToItem(row) {
  var SKIP = { block_id: 1, field_name: 1, item_order: 1 };
  var obj  = {};

  Object.keys(row).forEach(function(k) {
    if (SKIP[k]) return;                          /* strip metadata */
    var v = row[k];
    if (v === '' || v === null || v === undefined) return;  /* skip empty */

    if (k === 'required') {
      obj[k] = _toBool(v);                        /* TRUE/FALSE → boolean */
    } else {
      obj[k] = v;
    }
  });

  return obj;
}


/* ── Utilities ──────────────────────────────────────────────── */

function _parseJson(val) {
  if (!val || val === '') return {};
  if (typeof val === 'object') return val;        /* already parsed (rare) */
  try   { return JSON.parse(String(val)); }
  catch (_) { return {}; }
}

function _toBool(val) {
  if (typeof val === 'boolean') return val;
  return String(val).toUpperCase() === 'TRUE';
}

function _jsonError(msg) {
  return ContentService
    .createTextOutput(JSON.stringify({ error: msg }))
    .setMimeType(ContentService.MimeType.JSON);
}
