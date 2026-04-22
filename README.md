# Landing System

A minimal, production-quality static landing page — built to deploy on **Cloudflare Pages** with zero configuration.

## Project structure

```
landingsystem/
├── index.html          # Main landing page
├── css/
│   └── styles.css      # All styles (custom properties, layout, responsive)
├── js/
│   └── app.js          # Boot script (year, header scroll, form stub)
├── functions/          # Cloudflare Pages Functions (empty — add later)
│   └── .gitkeep
├── .gitignore
└── README.md
```

## Local development

No build step required. Open `index.html` directly in a browser, or use any static server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## Deploy to Cloudflare Pages

### 1 — Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial landing page"
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

### 2 — Connect in the Cloudflare dashboard

| Setting | Value |
|---|---|
| **Framework preset** | `None` |
| **Build command** | *(leave empty)* |
| **Build output directory** | `/` (root) |
| **Root directory** | *(leave empty)* |
| **Environment variables** | *(none needed)* |

That's it. Cloudflare Pages will serve `index.html` from the repo root automatically.

## Adding Cloudflare Pages Functions later

Drop `.js` files inside `/functions` to create serverless endpoints that run on Cloudflare's edge.  
Example: `functions/api/submit.js` → accessible at `/api/submit`.

No changes to the build settings are needed — Cloudflare detects the folder automatically.
