/* ============================================================
   utils.js — Shared helpers used by blocks and renderer.
   Loaded first so all other scripts can call Utils.*
   ============================================================ */

const Utils = (() => {
  'use strict';

  /* ── HTML escape ──────────────────────────────────────────
     Prevents XSS when injecting data-driven strings into HTML.
  ──────────────────────────────────────────────────────── */
  function esc(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g,  '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/"/g,  '&quot;')
      .replace(/'/g,  '&#39;');
  }

  /* ── Countdown timer ──────────────────────────────────────
     Persists end time in sessionStorage so the timer does
     not reset on page refresh within the same session.

     Usage:
       Utils.initCountdown('main', 24, timerEl);

     timerEl must contain [data-unit="d/h/m/s"] children.
  ──────────────────────────────────────────────────────── */
  function initCountdown(key, hours, timerEl) {
    const storageKey = 'lp_cd_' + key;
    let endTime = parseInt(sessionStorage.getItem(storageKey), 10);

    if (!endTime || endTime <= Date.now()) {
      endTime = Date.now() + hours * 3600 * 1000;
      try { sessionStorage.setItem(storageKey, String(endTime)); } catch (_) {}
    }

    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function setUnit(unit, val) {
      const el = timerEl.querySelector('[data-unit="' + unit + '"]');
      if (el && el.textContent !== val) el.textContent = val;
    }

    function tick() {
      const diff = endTime - Date.now();

      if (diff <= 0) {
        ['d', 'h', 'm', 's'].forEach(u => setUnit(u, '00'));
        return;
      }

      setUnit('d', pad(Math.floor(diff / 86400000)));
      setUnit('h', pad(Math.floor(diff / 3600000) % 24));
      setUnit('m', pad(Math.floor(diff / 60000) % 60));
      setUnit('s', pad(Math.floor(diff / 1000) % 60));

      setTimeout(tick, 1000);
    }

    tick();
  }

  /* ── Hex → RGBA ───────────────────────────────────────────
     Used by renderer to derive light/dark tints from the
     primary color defined in page meta.
  ──────────────────────────────────────────────────────── */
  function hexToRgba(hex, alpha) {
    const c = parseInt(hex.replace('#', ''), 16);
    return 'rgba(' + (c >> 16) + ',' + ((c >> 8) & 0xff) + ',' + (c & 0xff) + ',' + alpha + ')';
  }

  function hexDarken(hex, pct) {
    try {
      const c = parseInt(hex.replace('#', ''), 16);
      const d = Math.round(255 * pct / 100);
      const r = Math.max(0, (c >> 16) - d);
      const g = Math.max(0, ((c >> 8) & 0xff) - d);
      const b = Math.max(0, (c & 0xff) - d);
      return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
    } catch (_) { return hex; }
  }

  return { esc, initCountdown, hexToRgba, hexDarken };
})();
