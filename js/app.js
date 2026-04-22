/* ============================================================
   app.js — Boot script

   Waits for the DOM, then hands PAGE_DATA to the Renderer.
   This is the only place that knows where data comes from.

   Future: swap window.PAGE_DATA for a fetch() call here and
   nothing else in the system needs to change.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof PAGE_DATA === 'undefined') {
    console.error('[App] PAGE_DATA is not defined. Check that data/page.js is loaded.');
    return;
  }
  Renderer.render(PAGE_DATA, 'app');
});
