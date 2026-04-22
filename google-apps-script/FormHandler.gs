/* ============================================================
   FormHandler.gs — Google Apps Script Web App
   Receives lead submissions and appends them to a "Leads" sheet.
   ============================================================

   WHAT THIS DOES
   ──────────────
   Accepts POST requests from the Cloudflare Pages Function
   (/functions/api/submit.js) and writes each lead as a new row
   in a "Leads" tab of the ACTIVE Google Spreadsheet.

   Columns written:
     A — Timestamp  (date/time of submission)
     B — Name       (customer name)
     C — Phone      (customer phone number)
     D — Source     (always "shavlego" — useful if you reuse this sheet)

   HOW TO DEPLOY
   ─────────────
   1. Open (or create) your Google Spreadsheet for leads.
   2. Extensions → Apps Script.
   3. Delete any default code, paste this entire file.
   4. Save (Ctrl/Cmd+S).
   5. Deploy → New deployment
        Type:             Web app
        Execute as:       Me
        Who has access:   Anyone
   6. Click Deploy → copy the /exec URL.
   7. In Cloudflare Pages dashboard:
        Settings → Environment variables → Production
        Name:  FORM_ENDPOINT
        Value: (paste the /exec URL)
   8. Trigger a redeploy (push any commit or "Retry deployment").

   TESTING
   ───────
   Test the endpoint directly with curl before connecting the frontend:

     curl -X POST "https://script.google.com/macros/s/YOUR_ID/exec" \
       -d "name=Test+User&phone=%2B995555123456&source=shavlego"

   A new row should appear in the Leads sheet within a few seconds.

   EVERY TIME you edit this file, create a NEW deployment
   (Deploy → New deployment). Editing an existing version does
   not update the live /exec URL.
   ============================================================ */


/* ── Entry point ────────────────────────────────────────────
   Called by the Cloudflare Pages Function via POST.
   Reads e.parameter fields (URL-encoded form data).
   ──────────────────────────────────────────────────────────── */
function doPost(e) {
  try {
    var sheet = _getOrCreateLeadsSheet();

    sheet.appendRow([
      new Date(),                   /* A: Timestamp  */
      e.parameter.name   || '',     /* B: Name       */
      e.parameter.phone  || '',     /* C: Phone      */
      e.parameter.source || '',     /* D: Source     */
    ]);

  } catch (err) {
    console.error('FormHandler error: ' + err.message);
    /* Never throw — return ok so Cloudflare Function doesn't retry */
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}


/* ── Sheet setup ────────────────────────────────────────────
   Finds "Leads" tab, or creates it with a header row if it
   doesn't exist yet. Safe to call on every submission.
   ──────────────────────────────────────────────────────────── */
function _getOrCreateLeadsSheet() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Leads');

  if (!sheet) {
    sheet = ss.insertSheet('Leads');

    var header = sheet.getRange(1, 1, 1, 4);
    header.setValues([['Timestamp', 'Name', 'Phone', 'Source']]);
    header.setFontWeight('bold');
    header.setBackground('#f3f4f6');

    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 180);  /* Timestamp */
    sheet.setColumnWidth(2, 160);  /* Name      */
    sheet.setColumnWidth(3, 160);  /* Phone     */
    sheet.setColumnWidth(4, 120);  /* Source    */
  }

  return sheet;
}
