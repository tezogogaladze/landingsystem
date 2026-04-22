/**
 * Cloudflare Pages Function — POST /api/submit
 *
 * Acts as a same-origin proxy between the landing page form
 * and the Google Apps Script web app. This avoids CORS issues
 * that occur when the browser tries to POST directly to
 * script.google.com (which redirects and drops CORS headers).
 *
 * Flow:
 *   Browser → POST /api/submit (same origin, no CORS)
 *     → Cloudflare Function validates fields
 *       → fire-and-forget POST to Apps Script
 *         → Apps Script appends row to "Leads" sheet
 *     → returns { ok: true } to browser immediately
 *
 * SETUP (one-time):
 *   1. Deploy google-apps-script/FormHandler.gs as a web app.
 *   2. Copy the /exec URL.
 *   3. In Cloudflare Pages dashboard:
 *        Settings → Environment variables → Add variable
 *        Name:  FORM_ENDPOINT
 *        Value: https://script.google.com/macros/s/YOUR_ID/exec
 *   4. Redeploy (push any commit, or use "Retry deployment").
 *
 * Local dev:
 *   /api/submit returns 404 locally (no Cloudflare runtime).
 *   The form still shows the success screen via the catch handler.
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const form  = await request.formData();
    const name  = String(form.get('name')  || '').trim();
    const phone = String(form.get('phone') || '').trim();

    /* Basic server-side validation */
    if (!name || !phone) {
      return Response.json(
        { ok: false, error: 'სახელი და ტელეფონი სავალდებულოა.' },
        { status: 400 }
      );
    }

    /* Forward to Google Sheets via Apps Script.
       Fire-and-forget with context.waitUntil so the response
       to the browser is immediate regardless of Apps Script speed. */
    const endpoint = env.FORM_ENDPOINT;
    if (endpoint) {
      context.waitUntil(
        fetch(endpoint, {
          method: 'POST',
          body:   new URLSearchParams({ name, phone, source: 'shavlego' }),
        }).catch(() => { /* swallow — never let Sheets errors affect UX */ })
      );
    }

    return Response.json({ ok: true });

  } catch (err) {
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
