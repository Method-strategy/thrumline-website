# Thrumline — Cloudflare Pages handoff notes

The site is a React (CRA/craco) app built to be prerendered to static HTML for
Cloudflare Pages, matching the SEO Playbook's "static-HTML-first" requirement.

## What is already correct for static hosting

- All copy lives in code (`/src/content/site.js`, `/src/content/signals.js`).
  There is no CMS.
- `robots.txt` and `sitemap.xml` exist in `/frontend/public` and reference
  `https://thrumline.com/sitemap.xml`. AI crawlers (GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended) are NOT blocked.
- `public/index.html` contains the base `Organization` + `WebSite` JSON-LD.
  Person entity is intentionally absent (brand-first).
- The `FAQPage` JSON-LD for `/signals` is generated from the same `signals.js`
  source of truth as the visible headings — they cannot drift.
- Canonical URLs are written without a trailing slash (except `/`).
- Consent architecture is opt-in only, stored in `localStorage` key
  `thrumline_consent_v1`. The consent-gated GA4 + Clarity loader lives in the
  `<head>` of `public/index.html`, hostname-guarded to `thrumline.com` /
  `www.thrumline.com` so it never fires in dev.
- Animated brand mark ships inline via `<AnimatedLogo>` with:
    - locked `aspect-ratio` container (no CLS)
    - full SMIL animation preserved
    - `prefers-reduced-motion` strips animate tags at mount
- Font preload can be added once we self-host Fraunces + Manrope woff2 files
  (currently loaded from Google Fonts CSS).

## What is a build-time step to add on Cloudflare

1. **Prerender** — swap CRA build with a step that snapshots each route
   (`/`, `/what-we-do`, `/how-it-works`, `/signals`, `/fit`, `/privacy-policy`)
   into static HTML files with the correct per-page `<title>`, meta description,
   canonical, and JSON-LD baked into the head instead of being written from
   `useSeo` at runtime. The runtime helper stays in place as a fallback.
   Suggested tool: `react-snap` or a small Puppeteer script that hits each route
   on `localhost:3000`, saves the HTML, and rewrites the canonicals.
2. **IndexNow** — generate a per-deploy `<key>.txt` in `public/`, and run a
   diff-based ping script that submits changed URLs to
   `api.indexnow.org/indexnow`.
3. **OG image** — drop a `public/og-default.png` (1200×630, <5 MB) referenced
   already by `og:image`.
4. **Font preload** — self-host `Fraunces-VariableFont_SOFT,WONK,opsz,wght.woff2`
   and `Manrope-VariableFont_wght.woff2` under `/fonts/` and add
   `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the hero
   font in `public/index.html`.
5. **Analytics IDs** — replace `G-XXXXXXXXXX` and Clarity `xxxxxxxxxx` in
   `public/index.html` with real IDs.
6. **LinkedIn URL** — replace `REPLACE-THRUMLINE-LINKEDIN` in
   `src/content/site.js` and in the JSON-LD in `public/index.html`.
7. **Fit form endpoint** — the FastAPI endpoint `POST /api/fit/submit` is a
   preview-only stand-in. On Cloudflare, replace it with a Cloudflare Function
   (`/functions/api/fit/submit.js`) that:
    - validates the same shape (`name`, `business`, `email`, `prompt`,
      `referrer`)
    - forwards to the `conversation@thrumline.com` inbox via Resend/Postmark
    - optionally logs to KV/D1
   The frontend uses `${REACT_APP_BACKEND_URL}/api/fit/submit`; on Cloudflare
   Pages, set that env var to empty string so the browser hits the same origin
   `/api/fit/submit`.
8. **Trailing-slash redirects** — configure Cloudflare Pages to 301 every
   `/path/` to `/path` (except `/`).

## Acceptance tests before ship

Run these from the SEO playbook once deployed:

```bash
# Canonicals
for p in /what-we-do /how-it-works /signals /fit /privacy-policy; do
  curl -sI "https://thrumline.com$p/" | grep -i "^HTTP\|^location"
  curl -sI "https://thrumline.com$p"  | grep -i "^HTTP"
done

# FAQPage JSON-LD
curl -sL https://thrumline.com/signals | \
  grep -o '<script type="application/ld+json"[^>]*>[^<]*</script>'

# 404
curl -sI "https://thrumline.com/nope" | grep "^HTTP"
```
