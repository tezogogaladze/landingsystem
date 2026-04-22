/* ============================================================
   renderer.js — Landing page rendering engine

   Expected page data shape (pageData):
   ┌──────────────────────────────────────────────────────────┐
   │  {                                                       │
   │    slug:     string   page identifier                    │
   │    meta:     { title, description, lang, favicon }       │
   │    theme:    { primaryColor }                            │
   │    settings: { currency, ctaAnchor }                     │
   │    blocks:   Block[]  (see blocks.js for block schema)   │
   │  }                                                       │
   └──────────────────────────────────────────────────────────┘

   Blocks are filtered (enabled !== false) and sorted by
   block.order before rendering — the data file does NOT need
   to be in order; order numbers drive the sequence.

   ── Future: API-based loading ─────────────────────────────
   In app.js, replace the script-injection call with:

     fetch('/api/page?slug=' + slug)
       .then(r => { if (!r.ok) throw r; return r.json(); })
       .then(data => Renderer.render(data, 'app'))
       .catch(err => _showError('Failed: ' + err.status));

   The shape returned by the API must match the schema above.
   No other file needs to change.
   ============================================================ */

const Renderer = (() => {
  'use strict';

  /* ── Public: render ───────────────────────────────────────
     Single entry point. Call once per page load.
  ──────────────────────────────────────────────────────── */
  function render(pageData, containerId) {
    _applyTheme(pageData.theme || {});
    _applyMeta(pageData.meta  || {});
    _stampSlug(pageData.slug, containerId);
    _renderBlocks(pageData.blocks || [], containerId);
    _initCountdowns();
    _initForms();
  }

  /* ── Theme ────────────────────────────────────────────────
     Reads from pageData.theme (not meta) so theme and
     content concerns are cleanly separated.
  ──────────────────────────────────────────────────────── */
  function _applyTheme(theme) {
    if (!theme.primaryColor) return;
    const root  = document.documentElement;
    const color = theme.primaryColor;
    root.style.setProperty('--color-primary',       color);
    root.style.setProperty('--color-primary-dark',  Utils.hexDarken(color, 15));
    root.style.setProperty('--color-primary-light', Utils.hexToRgba(color, 0.1));
  }

  /* ── Meta ─────────────────────────────────────────────────
     Updates <title>, <meta description>, and <html lang>.
  ──────────────────────────────────────────────────────── */
  function _applyMeta(meta) {
    if (meta.title)       document.title = meta.title;
    if (meta.lang)        document.documentElement.setAttribute('lang', meta.lang);
    if (meta.description) {
      const el = document.querySelector('meta[name="description"]');
      if (el) el.setAttribute('content', meta.description);
    }
  }

  /* ── Slug stamp ───────────────────────────────────────────
     Writes the page slug onto #app as a data attribute.
     Useful for analytics, debugging, and future hostname routing.
  ──────────────────────────────────────────────────────── */
  function _stampSlug(slug, containerId) {
    if (!slug) return;
    const app = document.getElementById(containerId);
    if (app) app.dataset.pageSlug = slug;
  }

  /* ── Block rendering ──────────────────────────────────────
     1. Filter out blocks where enabled === false
     2. Sort ascending by block.order
     3. Delegate each block to Blocks.render()
     4. Inject HTML in one assignment (single reflow)
  ──────────────────────────────────────────────────────── */
  function _renderBlocks(blocks, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error('[Renderer] Container #' + containerId + ' not found');
      return;
    }

    const html = blocks
      .filter(b => b.enabled !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map(b => Blocks.render(b))
      .join('');

    container.innerHTML = html;
  }

  /* ── Dynamic: countdowns ──────────────────────────────────
     config.key  → sessionStorage key (persists across refreshes)
     config.hours → initial duration
  ──────────────────────────────────────────────────────── */
  function _initCountdowns() {
    document.querySelectorAll('[data-countdown-key]').forEach(el => {
      Utils.initCountdown(
        el.dataset.countdownKey,
        parseFloat(el.dataset.countdownHours || 24),
        el
      );
    });
  }

  /* ── Dynamic: forms ───────────────────────────────────────
     Validates required fields, shows loading state, replaces
     form with success message on submit.

     To wire a real backend, replace the setTimeout in
     _handleSubmit with a fetch() call to your Pages Function:

       fetch('/functions/api/submit', {
         method:  'POST',
         headers: { 'Content-Type': 'application/json' },
         body:    JSON.stringify(Object.fromEntries(new FormData(form)))
       })
       .then(res => { if (!res.ok) throw res; return res.json(); })
       .then(() => _showFormSuccess(form))
       .catch(() => _resetFormBtn(btn, label));
  ──────────────────────────────────────────────────────── */
  function _initForms() {
    document.querySelectorAll('.block-form__form').forEach(form => {
      form.addEventListener('submit', _handleSubmit);
    });
  }

  function _handleSubmit(e) {
    e.preventDefault();
    const form  = e.target;
    if (!_validateForm(form)) return;

    const btn   = form.querySelector('button[type="submit"]');
    const label = btn.textContent;
    btn.textContent = 'იგზავნება...';
    btn.disabled    = true;

    /* ── TODO: replace with fetch() when backend is ready ── */
    setTimeout(() => _showFormSuccess(form), 800);
  }

  function _validateForm(form) {
    let ok = true;
    form.querySelectorAll('[required]').forEach(input => {
      const errId = 'err-' + input.name;
      const prev  = form.querySelector('#' + errId);
      if (prev) prev.remove();
      input.classList.remove('is-error');

      if (!input.value.trim()) {
        ok = false;
        input.classList.add('is-error');
        const msg = document.createElement('p');
        msg.id        = errId;
        msg.className = 'form-error-msg';
        msg.textContent = 'ეს ველი სავალდებულოა.';
        input.parentNode.appendChild(msg);
      }
    });
    return ok;
  }

  function _showFormSuccess(form) {
    const wrap = form.closest('.block-form');
    const cont = wrap && wrap.querySelector('.lp-container');
    if (!cont) return;
    cont.innerHTML = `
      <div class="block-form__success">
        <div class="block-form__success-icon">✅</div>
        <h3>შეკვეთა მიღებულია!</h3>
        <p>15&nbsp;წუთში დაგიკავშირდებით დასადასტურებლად.</p>
      </div>`;
  }

  return { render };
})();
