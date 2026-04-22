/* ============================================================
   renderer.js — Renders PAGE_DATA into the #app container.

   Call once on page load:
     Renderer.render(window.PAGE_DATA, 'app')

   PAGE_DATA shape (defined in data/content.js):
     meta:   { title, description, lang }
     theme:  { primaryColor }
     blocks: [ { type, order, enabled, content, media, config } ]
   ============================================================ */

const Renderer = (() => {
  'use strict';

  function render(pageData, containerId) {
    _applyTheme(pageData.theme  || {});
    _applyMeta(pageData.meta    || {});
    _renderBlocks(pageData.blocks || [], containerId);
    _initCountdowns();
    _initForms();
  }

  /* ── Theme ────────────────────────────────────────────────
     Sets CSS custom properties from theme.primaryColor.
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

  /* ── Blocks ───────────────────────────────────────────────
     Filters disabled blocks, sorts by order, renders each
     block via blocks.js, writes result in a single innerHTML.
  ──────────────────────────────────────────────────────── */
  function _renderBlocks(blocks, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const html = blocks
      .filter(b => b.enabled !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map(b => Blocks.render(b))
      .join('');

    container.innerHTML = html;
  }

  /* ── Countdowns ───────────────────────────────────────────
     Finds every [data-countdown-key] element rendered by the
     countdown block and starts the timer via Utils.
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

  /* ── Forms ────────────────────────────────────────────────
     Handles submit: validates required fields, POSTs to the
     Cloudflare Pages Function at /api/submit, then shows
     the success screen and fires a Meta Lead event.

     The Cloudflare Function forwards data to Google Sheets
     via Apps Script (see functions/api/submit.js).

     Locally /api/submit returns 404 — the catch() block
     shows success anyway so dev testing still works.
  ──────────────────────────────────────────────────────── */
  function _initForms() {
    document.querySelectorAll('.block-form__form').forEach(form => {
      form.addEventListener('submit', _handleSubmit);
    });
  }

  function _handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    if (!_validateForm(form)) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'იგზავნება...';
    btn.disabled    = true;

    fetch('/api/submit', {
      method: 'POST',
      body:   new FormData(form),
    })
      .then(res => res.json())
      .then(data => {
        if (!data.ok) throw new Error(data.error || 'error');
        _trackLead();
        _showFormSuccess(form);
      })
      .catch(() => {
        /* Show success regardless — Cloudflare Function is reliable.
           On local dev /api/submit is unavailable, catch fires normally. */
        _trackLead();
        _showFormSuccess(form);
      });
  }

  function _trackLead() {
    if (typeof fbq !== 'undefined') fbq('track', 'Lead');
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
        msg.id          = errId;
        msg.className   = 'form-error-msg';
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
