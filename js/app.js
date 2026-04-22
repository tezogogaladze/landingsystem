/**
 * app.js — boot script
 *
 * Handles small UI tasks that require JavaScript.
 * Keep this file lean; move larger features into separate modules under /js.
 */

(function () {
  'use strict';

  /* ── Copyright year ──────────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Scroll-aware header shadow ──────────────────────────── */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── CTA form — placeholder handler ─────────────────────── */
  const ctaForm = document.querySelector('.cta-form');
  if (ctaForm) {
    ctaForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = ctaForm.querySelector('input[type="email"]').value.trim();
      if (!email) return;
      // TODO: replace with real submission logic (e.g. a /functions endpoint)
      console.log('[CTA] email captured:', email);
    });
  }

})();
