# Thrumline — Product Requirements & Build Log

## Original problem statement

> Build a landing page: I am uploading four documents and one .svg file to being the build of a
> complete website. Multiple pages. For the company Thrumline. It appears I can't upload .svg
> files? We have to fix that. I uploaded the brand logo static but the .svg is animated and we need
> that in the build. Review all please then conversation only before building anything. I need to
> know you understand the assignment.
>
> System reminder: Make this genuinely award-worthy — Awwwards Site-of-the-Day level. Kinetic
> hero, masked line-by-line reveal, editorial marquee, manifesto chapters, framer-motion + lenis,
> parallax/3D hero moment. Motion, craft, wow-factor.

## User choices (verbatim)

- Deliver SVG: **paste raw SVG code** into chat (received in-conversation).
- Fit form: **simple form (name, business, prompt) — no third-party scheduler**.
- Deployment: **Cloudflare Pages**.
- Domain: `thrumline.com`. Contact email: `conversation@thrumline.com`.
  Placeholders for GA4 measurement ID and LinkedIn URL.
- Palette: **light theme, soft cool gray (not pure white), blue accents from the logo, editorial
  serif headings + clean sans body, can alternate light/dark sections; header must stay light.**

## Personas

- **Primary reader** — Owner or CEO of a growing business ($5M–$30M) burned by agencies that
  overpromise and underdeliver. Skeptical, time-poor, allergic to hype.
- **Secondary** — AI answer engines (ChatGPT, Claude, Perplexity, Google AI Overviews) crawling
  and citing the site.

## Core (static) requirements

1. **Voice** — "The ranger who knows the ground." Calm, competent, plainspoken, never loud.
2. **Single conversion** — Every page points to `/fit`, the "fit check" intro call.
3. **Static-HTML-first SEO** — Nothing depends on JS at read time. All SEO artifacts baked into
   HTML at build.
4. **Signals page** — Q&A archive marked up as FAQPage JSON-LD; visible text and schema must
   match, one FAQPage block per page.
5. **No `Person` entity in schema** — brand-first.
6. **Consent architecture** — Opt-in GA4 + Microsoft Clarity, stored in localStorage
   `thrumline_consent_v1`, hostname-guarded to production. Consent UI is client-only so
   prerendered HTML stays byte-identical.
7. **Auditable-bill promise** — The strongest trust anchor; deserves dramatic treatment.
8. **Two differentiators** — Senior hands, Bill you can read.
9. **Awwwards-tier motion** — Framer Motion scroll reveals, kinetic line-by-line hero,
   editorial marquee, Lenis smooth scroll, 3D mouse-parallax on the animated brand mark.
10. **Animated brand mark** — Inline SVG with SMIL animations preserved, `prefers-reduced-motion`
    respected, CLS-safe container.

## What's been implemented — 2026-12

- Pages: `/`, `/what-we-do`, `/how-it-works`, `/signals`, `/fit`, `/privacy-policy`, `/404`.
- Animated brand mark inlined as `<AnimatedLogo>` with cursor 3D tilt and reduced-motion fallback.
- Editorial theme: Fraunces (display) + Manrope (body). Soft cool-gray background (`#F4F5F7`).
  Blue palette derived from the logo.
- Motion: framer-motion + lenis. `KineticText` masked line-by-line, `Reveal`/`StaggerParent` for
  scroll animations, `Marquee` slow editorial band, parallax on hero and Promise/Chapter sections.
- Fit form → `POST /api/fit/submit` (FastAPI + Mongo). Placeholder for Cloudflare Function
  swap at deploy.
- Consent banner + Cookie preferences modal (GA + Clarity toggles). localStorage key
  `thrumline_consent_v1`. Load-blocking loader lives in `public/index.html`.
- `robots.txt`, `sitemap.xml`, `Organization + WebSite` JSON-LD in `<head>`.
  Per-page `FAQPage` JSON-LD generated from `signals.js`.
- Cloudflare Pages migration notes in `/app/README-BUILD.md`.

## What's been implemented — 2026-02-23 (fork)

- Cookie preferences modal — added Escape key to close and Tab / Shift+Tab focus trap.
  Focus is captured on open, moved into the dialog, and restored to the previously focused
  element on close. Verified via Playwright screenshot: modal closes on Escape.
- OG image `public/og-default.png` (1200×630) generated. Cool-gray background, three-color
  blue signal band, serif "Marketing execution and *momentum.*" headline, sans sub-line,
  `thrumline.com` footer. Wired via existing `<meta property="og:image">` in
  `public/index.html`.
- `text-wrap: balance` on `h1, h2, h3, h4` and `text-wrap: pretty` on `p, li, blockquote`
  sitewide via `src/index.css`. Progressive enhancement, no polyfill.
- `SITE.email` → `hello@thrumline.com` in `src/content/site.js`. Verified sitewide.
- **Overpass expanded tastefully**: `.tl-drawline-link` (all footer nav/meta), consent
  banner action buttons, cookie modal action buttons, cookie "Always on" indicator, and
  footer copyright micro-line. Manrope pulled back to body prose + form input text only.
  Fraunces remains for headings + editorial pull quotes + toasts.
- **Signal-blue hover unification**: SideNav non-active items now tint toward `--tl-navy`
  on light sections and `--tl-sky` on dark; all consent banner + cookie modal action
  buttons unified on `hover:text-tl-navy`. One consistent micro-interaction language
  across all UI chrome.
- **Self-hosted variable fonts** (Latin subset) at `public/fonts/*-Variable.woff2`:
  Fraunces 67 KB, Manrope 25 KB, Overpass 39 KB — ~131 KB total. `@font-face`
  declarations live inline in `public/index.html` (so browser sees them before app CSS
  parses; also avoids CRA/webpack trying to resolve the woff2 paths). `<link rel="preload">`
  for Fraunces (`fetchpriority="high"`) + Manrope. Zero Google Fonts requests on first
  paint (verified).
- **Fit form → Emergent Resend proxy**: `/api/fit/submit` now persists to Mongo AND
  forwards a styled HTML digest to `OWNER_EMAIL` (default `hello@thrumline.com`) via
  the platform-managed Resend integration (`EMERGENT_EMAIL_KEY`, `EMAIL_FROM_NAME`,
  `OWNER_EMAIL` in `backend/.env`). Reply-To is set to the visitor's inbox so replies
  route to the person who submitted the form. Verified end-to-end (HTTP 202 Accepted,
  email id returned). Send failures never block the response — the submission is
  already persisted.
- Deleted unused `Nav.legacy.jsx` (SideNav is finalized).
- **Mobile LCP optimization**: Hero H1 no longer wrapped in `KineticText` (removed
  framer-motion entrance animation that hid the LCP candidate with
  `y:110%, opacity:0, blur(10px)` until JS hydration). Hero subhead + CTA also no
  longer wrapped in `motion.p` / `motion.div` opacity-fade. Result: hero H1 is the
  LCP candidate, painting at **464 ms** on a 390×844 (iPhone-class) viewport with
  fonts already loaded and no invisible state. SVG animations confirmed as pure
  SMIL (no JS). SVG remains inline in the JS bundle → prerendered directly into
  raw HTML by `scripts/prerender.js`.
- **Brand assets wired**:
  - Site favicon updated to the three-bar Thrumline signal glyph. Multi-size
    `favicon.ico` (16/32/48/64), `favicon-32.png`, and `apple-touch-icon.png`
    (180×180 with iOS-safe padding) at `public/`. `<head>` now declares all three.
  - LinkedIn URL wired: `https://www.linkedin.com/company/thrumline/` in
    `SITE.linkedin` + Organization JSON-LD `sameAs`.
  - Footer LinkedIn link now shows the LinkedIn "in" bug logo (16×16, 64×64 native
    for 2x-DPR crispness, ® mark cropped from source) to the left of the text,
    with the drawline underline drawing under the text only.

## Backlog (prioritized)

- **P0** — Wire real GA4 + Clarity IDs; replace LinkedIn URL placeholder (user-owned,
  post-launch).
- **P2** — IndexNow diff-based ping script.
- **P2** — Add more Signals as they are written; each auto-flows to FAQPage schema.
- **P2** — Phase 2 SEO audit once deployed (live analytics validation).
