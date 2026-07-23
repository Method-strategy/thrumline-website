#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Thrumline — static prerender.
 *
 * Serves the CRA `build/` output on a local port, launches Chromium via
 * Puppeteer, and captures the fully-rendered HTML for every route.
 * Each capture is written back to `build/<route>/index.html`, replacing
 * the SPA shell so:
 *   - every heading, paragraph, and CTA is in the raw HTML the server sends
 *   - the FAQPage JSON-LD on /signals is in the raw HTML
 *   - <title>, <meta description>, canonical, OG/Twitter tags are in the head
 *   - crawlers and AI answer engines see everything without executing JS
 *
 * The script is idempotent: running it twice produces the same output.
 */

const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const http = require("http");
const url = require("url");

const BUILD_DIR = path.resolve(__dirname, "..", "build");
const PORT = 4173;

const MIME = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".txt": "text/plain",
    ".xml": "application/xml",
    ".map": "application/json",
};

// Every route we ship. `path` is the URL; `file` is where to write.
// The 404 route is captured too and written as `build/404.html`, which
// Cloudflare Pages serves as the not-found response automatically.
const ROUTES = [
    { path: "/", file: "index.html" },
    { path: "/what-we-do", file: "what-we-do/index.html" },
    { path: "/how-we-work", file: "how-we-work/index.html" },
    { path: "/signals", file: "signals/index.html" },
    { path: "/fit", file: "fit/index.html" },
    { path: "/privacy-policy", file: "privacy-policy/index.html" },
    { path: "/nonexistent-prerender-404", file: "404.html", is404: true },
];

function startServer() {
    return new Promise((resolve) => {
        const server = http.createServer((req, res) => {
            const pathname = decodeURIComponent(url.parse(req.url).pathname || "/");
            let filePath = path.join(BUILD_DIR, pathname);
            // If it maps to a real file, serve it. Otherwise fall back to
            // index.html so the React router can render the route.
            let stat = null;
            try { stat = fs.statSync(filePath); } catch { /* not found */ }
            if (stat && stat.isDirectory()) {
                filePath = path.join(filePath, "index.html");
                try { stat = fs.statSync(filePath); } catch { stat = null; }
            }
            if (!stat) {
                filePath = path.join(BUILD_DIR, "index.html");
            }
            const ext = path.extname(filePath).toLowerCase();
            const mime = MIME[ext] || "application/octet-stream";
            res.writeHead(200, { "Content-Type": mime, "Cache-Control": "no-store" });
            fs.createReadStream(filePath).pipe(res);
        });
        server.listen(PORT, () => resolve(server));
    });
}

async function capture(page, route) {
    const url = `http://localhost:${PORT}${route.path}`;
    console.log(`   snapshot  ${route.path}`);

    // Tell the app it is being prerendered so client-only widgets stay out
    // of the initial HTML (consent banner, cookie modal). App code reads
    // this at boot via `window.__THRUMLINE_PRERENDER__`.
    await page.evaluateOnNewDocument(() => {
        window.__THRUMLINE_PRERENDER__ = true;
    });

    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

    // Wait for the app to have rendered real content (root has children)
    // and for `useSeo` effects to have populated the <head>.
    await page.waitForFunction(
        () => {
            const root = document.getElementById("root");
            const titled = document.title && document.title.length > 0;
            const canonical = document.querySelector('link[rel="canonical"]');
            return root && root.childNodes.length > 0 && titled && canonical;
        },
        { timeout: 20000 },
    );

    // Give framer-motion effects one more animation frame + a beat.
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 250))));

    // Cleanup: strip runtime-only markers, freeze motion at the visible frame.
    await page.evaluate(() => {
        // Force any element hidden by an initial motion style into a
        // visible resting state so a JS-off human still sees the copy.
        // (Crawlers/AI engines read DOM text regardless — this is for people.)
        document.querySelectorAll("[style]").forEach((el) => {
            const s = el.getAttribute("style") || "";
            if (
                s.includes("opacity: 0") ||
                s.includes("opacity:0") ||
                s.includes("translate") ||
                s.includes("blur(") ||
                s.includes("transform")
            ) {
                // Remove only the transient motion inline styles; keep everything else.
                const cleaned = s
                    .split(";")
                    .map((rule) => rule.trim())
                    .filter((rule) => {
                        if (!rule) return false;
                        const l = rule.toLowerCase();
                        if (l.startsWith("opacity") && l.endsWith(": 0")) return false;
                        if (l.startsWith("opacity:0")) return false;
                        if (l.startsWith("transform")) return false;
                        if (l.startsWith("filter") && l.includes("blur")) return false;
                        return true;
                    })
                    .join("; ");
                if (cleaned) el.setAttribute("style", cleaned);
                else el.removeAttribute("style");
            }
        });

        // Guard: remove any client-only widgets that might have slipped in.
        document.querySelectorAll('[data-testid="consent-banner"]').forEach((n) => n.remove());
        document.querySelectorAll('[data-testid="cookie-prefs-modal"]').forEach((n) => n.remove());
    });

    let html = await page.content();

    // Ensure doctype and <html lang="en"> survive.
    if (!html.startsWith("<!DOCTYPE") && !html.startsWith("<!doctype")) {
        html = "<!doctype html>\n" + html;
    }

    return html;
}

async function writeSnapshot(html, filePath) {
    const abs = path.join(BUILD_DIR, filePath);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, html, "utf8");
    console.log(`   wrote     ${filePath}  (${(html.length / 1024).toFixed(1)} KB)`);
}

async function main() {
    if (!fs.existsSync(BUILD_DIR)) {
        console.error(`✗ build directory missing: ${BUILD_DIR}. Run \`yarn build:cra\` first.`);
        process.exit(1);
    }

    console.log("→ starting static server on port", PORT);
    const server = await startServer();

    console.log("→ launching Chromium");
    const browser = await puppeteer.launch({
        headless: "new",
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/google-chrome",
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
        ],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    try {
        for (const route of ROUTES) {
            const html = await capture(page, route);
            await writeSnapshot(html, route.file);
        }
        console.log("✓ prerender complete");
    } catch (e) {
        console.error("✗ prerender failed:", e);
        process.exitCode = 1;
    } finally {
        await browser.close();
        server.close();
    }
}

main();
