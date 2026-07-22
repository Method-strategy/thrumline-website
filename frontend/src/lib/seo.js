// Per-page SEO — writes title, description, canonical, and optional JSON-LD
// into <head> from React. On Cloudflare Pages this will be replaced by a
// build-time prerender that bakes these into static HTML (see build playbook).
// For now the client-side variant gives us dev parity.

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
    // remove previous
    document.querySelectorAll(`script[data-tl-jsonld="${id}"]`).forEach((n) => n.remove());
    if (!obj) return;
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-tl-jsonld", id);
    s.text = JSON.stringify(obj);
    document.head.appendChild(s);
}

export function useSeo({ title, description, path, jsonLd }) {
    useEffect(() => {
        if (title) document.title = title;
        upsertMeta('meta[name="description"]', "name", "description", description);
        upsertMeta('meta[property="og:title"]', "property", "og:title", title);
        upsertMeta('meta[property="og:description"]', "property", "og:description", description);
        const url = `https://thrumline.com${path || ""}`;
        upsertMeta('meta[property="og:url"]', "property", "og:url", url);
        upsertLink("canonical", url);
        if (jsonLd) setJsonLd(path || "page", jsonLd);
        return () => {
            if (jsonLd) setJsonLd(path || "page", null);
        };
    }, [title, description, path, jsonLd]);
}
