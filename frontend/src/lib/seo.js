// Per-page SEO — writes title, description, canonical, OG image, breadcrumbs,
// and any additional structured data into <head>. Runs at prerender time (via
// Puppeteer) so the resulting static HTML has all schema baked in.

import { useEffect } from "react";

function upsertMeta(selector, attrName, attrValue, content) {
    if (!content) return;
    let el = document.head.querySelector(selector);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
}

function upsertLink(rel, href) {
    if (!href) return;
    let el = document.head.querySelector(`link[rel="${rel}"]`);
    if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
    }
    el.setAttribute("href", href);
}

function setJsonLd(id, obj) {
    document.querySelectorAll(`script[data-tl-jsonld="${id}"]`).forEach((n) => n.remove());
    if (!obj) return;
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-tl-jsonld", id);
    s.text = JSON.stringify(obj);
    document.head.appendChild(s);
}

function breadcrumbSchema(items) {
    if (!items || !items.length) return null;
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.name,
            item: it.item.startsWith("http") ? it.item : `https://thrumline.com${it.item}`,
        })),
    };
}

export function useSeo({
    title,
    description,
    path,
    jsonLd,
    ogImage,
    breadcrumbs,
    additionalSchema,
}) {
    useEffect(() => {
        if (title) document.title = title;
        upsertMeta('meta[name="description"]', "name", "description", description);
        upsertMeta('meta[property="og:title"]', "property", "og:title", title);
        upsertMeta('meta[property="og:description"]', "property", "og:description", description);
        upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
        upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

        const url = `https://thrumline.com${path || ""}`;
        upsertMeta('meta[property="og:url"]', "property", "og:url", url);

        if (ogImage) {
            const absOg = ogImage.startsWith("http") ? ogImage : `https://thrumline.com${ogImage}`;
            upsertMeta('meta[property="og:image"]', "property", "og:image", absOg);
            upsertMeta('meta[property="og:image:width"]', "property", "og:image:width", "1200");
            upsertMeta('meta[property="og:image:height"]', "property", "og:image:height", "630");
            upsertMeta('meta[property="og:image:alt"]', "property", "og:image:alt", title || "Thrumline");
            upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", absOg);
        }

        upsertLink("canonical", url);

        if (jsonLd) setJsonLd(path || "page", jsonLd);
        const bc = breadcrumbSchema(breadcrumbs);
        if (bc) setJsonLd((path || "page") + ":bc", bc);
        if (additionalSchema) setJsonLd((path || "page") + ":x", additionalSchema);

        return () => {
            if (jsonLd) setJsonLd(path || "page", null);
            if (bc) setJsonLd((path || "page") + ":bc", null);
            if (additionalSchema) setJsonLd((path || "page") + ":x", null);
        };
    }, [title, description, path, jsonLd, ogImage, breadcrumbs, additionalSchema]);
}
