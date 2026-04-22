/* ============================================================
   renderer.js — Landing page rendering engine

   Responsibilities:
     1. Apply theme (CSS variables) from page meta
     2. Update document <title> and <meta description>
     3. Render all blocks into #app
     4. Initialise dynamic components (countdown timers, forms)

   How to connect an API later (no other file changes needed):
     In app.js, replace:
       Renderer.render(window.PAGE_DATA, 'app');
     With:
       fetch('/api/page?slug=shavlego')
         .then(r => r.json())
         .then(data => Renderer.render(data, 'app'))
         .catch(err => console.error('[App] Failed to load page data', err));
   ============================================================ */

const Renderer = (() => {
  'use strict';

  /* ── Public: render ───────────────────────────────────────
     Entry point. Call once per page load.
  ──────────────────────────────────────────────────────── */
  function render(pageData, containerId) {
    _applyTheme(pageData.meta);
    _applyMeta(pageData.meta);
    _renderBlocks(pageData.blocks || [], containerId);
    _initCountdowns();
    _initForms();
  }

  /* ── Theme ────────────────────────────────────────────────
     Writes CSS custom properties onto :root so every block
     inherits the page's primary color automatically.
  ──────────────────────────────────────────────────────── */
  function _applyTheme(meta) {
    if (!meta || !meta.primaryColor) return;
    const root  = document.documentElement;
    const color = meta.primaryColor;
    root.style.setProperty('--color-primary',       color);
    root.style.setProperty('--color-primary-dark',  Utils.hexDarken(color, 15));
    root.style.setProperty('--color-primary-light', Utils.hexToRgba(color, 0.1));
  }

  /* ── Meta ─────────────────────────────────────────────────
     Updates <title>, <meta description>, and <html lang>.
  ──────────────────────────────────────────────────────── */
  function _applyMeta(meta) {
    if (!meta) return;
    if (meta.title) document.title = meta.title;
    if (meta.lang)  document.documentElement.setAttribute('lang', meta.lang);
    if (meta.description) {
      const el = document.querySelector('meta[name="description"]');
      if (el) el.setAttribute('content', meta.description);
    }
  }

  /* ── Block rendering ──────────────────────────────────────
     Delegates each block to Blocks.render(), then injects
     the resulting HTML in one assignment (single reflow).
  ──────────────────────────────────────────────────────── */
  function _renderBlocks(blocks, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error('[Renderer] Container #' + containerId + ' not found');
      return;
    }
    container.innerHTML = blocks.map(b => Blocks.render(b)).join('');
  }

  /* ── Dynamic: countdowns ──────────────────────────────────
     Finds every [data-countdown-key] element rendered by the
     countdown block and starts its timer.
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
     Attaches submit handler to every .block-form__form.
     Validates required fields, shows loading state, then
     replaces form with a success message.

     The fetch() call below is stubbed with a setTimeout.
     To go live, replace the setTimeout block with:

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
    const valid = _validateForm(form);
    if (!valid) return;

    const btn   = form.querySelector('button[type="submit"]');
    const label = btn.textContent;
    btn.textContent = 'Submitting…';
    btn.disabled    = true;

    /* ── TODO: replace with real fetch ───────────────────── */
    setTimeout(() => _showFormSuccess(form), 800);
    /* ─────────────────────────────────────────────────────── */
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
        msg.textContent = 'This field is required.';
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
        <h3>Order received!</h3>
        <p>We will call you within 15&nbsp;minutes to confirm.</p>
      </div>`;
  }

  return { render };
})();
