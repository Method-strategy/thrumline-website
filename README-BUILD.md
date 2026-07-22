# Thrumline — Cloudflare Pages handoff notes

## Build pipeline (already working)

```bash
cd frontend
yarn build     # runs: craco build && node scripts/prerender.js
```

That runs two steps:

1. **`craco build`** — standard CRA production build → `build/static/*.js|.css` + shell HTML.
2. **`node scripts/prerender.js`** — spins up a local static server on the fresh `build/`,
   launches Chromium via Puppeteer, walks every route, waits for `useSeo` effects to
   populate the head, then writes the fully rendered HTML back to
   `build/<route>/index.html`.

Output structure (this is exactly what Cloudflare Pages wants):

```
build/
├── index.html                  ← /
├── what-we-do/index.html       ← /what-we-do
├── how-it-works/index.html     ← /how-it-works
├── signals/index.html          ← /signals   (contains FAQPage JSON-LD)
├── fit/index.html              ← /fit
├── privacy-policy/index.html   ← /privacy-policy
├── 404.html                    ← Cloudflare's default not-found response
├── robots.txt
├── sitemap.xml
└── static/…                    ← hashed JS + CSS
```

Every `index.html` above contains, in the raw response (no JS execution required):

- `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph, Twitter
- Every heading and paragraph the visitor sees
- Base `Organization` + `WebSite` JSON-LD
- On `/signals`: the `FAQPage` / `Question` / `Answer` JSON-LD with `Question.name` and
  `Answer.text` matching the visible headings and body exactly.

## How to verify locally

```bash
cd frontend
yarn build
# then serve the static output — any static server, no Node runtime required
cd build && python3 -m http.server 4200

# in another shell:
curl -s http://localhost:4200/signals/ | grep -c '"@type": "FAQPage"'   # → 1
curl -s http://localhost:4200/signals/ | grep -c '"@type": "Question"'  # → 2
curl -s http://localhost:4200/                  | grep -c "The sound of your message"
curl -s http://localhost:4200/what-we-do/       | grep -c "Websites that work"
curl -s http://localhost:4200/how-it-works/     | grep -c "We diagnose before we prescribe"
curl -s http://localhost:4200/fit/              | grep -c "This is not a sales call"
curl -s http://localhost:4200/privacy-policy/   | grep -c "thrumline_consent_v1"
```

All of those return `≥ 1`. Nothing has to hit JavaScript.

You can also disable JavaScript in Chrome DevTools (⌘⇧P → "Disable JavaScript") and reload
any page — the copy, meta tags, and JSON-LD are all present and readable.

## Cloudflare Pages settings

- **Build command:** `yarn build`
- **Output directory:** `build`
- **Node version:** 20.x
- **404 page:** Cloudflare auto-serves `build/404.html` for missing routes.
- **Trailing-slash policy:** the canonical form has no trailing slash (except `/`).
  Enable Cloudflare Pages' *"Redirect trailing slashes"* rule so `/signals/` 301s to
  `/signals`. Alternatively add a `_redirects` file:
  ```
  /signals/          /signals          301
  /what-we-do/       /what-we-do       301
  /how-it-works/     /how-it-works     301
  /fit/              /fit              301
  /privacy-policy/   /privacy-policy   301
  ```

## What to swap at deploy

1. `public/index.html` — replace `G-XXXXXXXXXX` (GA4 measurement ID) and `xxxxxxxxxx`
   (Clarity project ID) with real values.
2. `public/index.html` and `src/content/site.js` — replace
   `REPLACE-THRUMLINE-LINKEDIN` with the real LinkedIn company URL.
3. `public/og-default.png` — drop a 1200×630 branded card.
4. `public/fonts/*.woff2` — self-host Fraunces + Manrope. Add a
   `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the hero font in
   `public/index.html` to keep LCP inside the "good" band.
5. **Fit form endpoint** — this preview uses `POST /api/fit/submit` (FastAPI + Mongo).
   On Cloudflare Pages, drop a Function at `functions/api/fit/submit.js` that accepts
   the same payload (`name`, `business`, `email`, `prompt`, `referrer`) and forwards to
   `conversation@thrumline.com` via Resend/Postmark. Then set the frontend env var
   `REACT_APP_BACKEND_URL=""` in the Cloudflare Pages project so the browser hits the
   same origin.
6. **IndexNow** — after the first successful deploy, drop `public/<key>.txt` and add
   a small script that submits changed URLs to `api.indexnow.org/indexnow` on each
   deploy.
