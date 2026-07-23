import { useEffect, useRef, useState } from "react";
import { readConsent, writeConsent } from "@/lib/consent";

/**
 * CookiePreferencesModal — copy is verbatim client-approved. No paraphrase.
 * Strictly necessary is a static row (no toggle). GA and Clarity each toggle.
 */
export function CookiePreferencesModal({ open, onClose, onSaved, onSavedAccept }) {
    const [ga, setGa] = useState(false);
    const [clarity, setClarity] = useState(false);
    const dialogRef = useRef(null);
    const previouslyFocusedRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const c = readConsent();
        setGa(!!c?.ga);
        setClarity(!!c?.clarity);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const l = window.__lenis;
        if (l) l.stop();
        document.body.style.overflow = "hidden";
        return () => {
            if (l) l.start();
            document.body.style.overflow = "";
        };
    }, [open]);

    // Focus management: capture prior focus, move focus into dialog, restore on close.
    useEffect(() => {
        if (!open) return;
        previouslyFocusedRef.current = document.activeElement;
        // Defer to next tick so the dialog is mounted.
        const t = window.setTimeout(() => {
            const root = dialogRef.current;
            if (!root) return;
            const first = root.querySelector(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (first && typeof first.focus === "function") first.focus();
        }, 0);
        return () => {
            window.clearTimeout(t);
            const prev = previouslyFocusedRef.current;
            if (prev && typeof prev.focus === "function") {
                try { prev.focus(); } catch (e) { /* noop */ }
            }
        };
    }, [open]);

    // Escape key close + Tab focus trap.
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                e.stopPropagation();
                if (onClose) onClose();
                return;
            }
            if (e.key !== "Tab") return;
            const root = dialogRef.current;
            if (!root) return;
            const focusables = Array.from(
                root.querySelectorAll(
                    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                )
            ).filter((el) => !el.hasAttribute("aria-hidden"));
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            const active = document.activeElement;
            if (e.shiftKey) {
                if (active === first || !root.contains(active)) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (active === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener("keydown", onKeyDown, true);
        return () => document.removeEventListener("keydown", onKeyDown, true);
    }, [open, onClose]);

    if (!open) return null;

    const savePrefs = () => {
        writeConsent({ ga, clarity });
        if (onSaved) onSaved();
    };
    const rejectAll = () => {
        writeConsent({ ga: false, clarity: false });
        if (onSaved) onSaved();
    };
    const acceptAll = () => {
        writeConsent({ ga: true, clarity: true });
        if (onSavedAccept) onSavedAccept();
        else if (onSaved) onSaved();
    };

    return (
        <div
            className="fixed inset-0 z-[60] flex items-end md:items-center justify-center"
            data-testid="cookie-prefs-modal"
            aria-modal="true"
            role="dialog"
            aria-labelledby="cookie-prefs-title"
        >
            <div
                className="absolute inset-0 bg-tl-ink/60 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden
            />
            <div
                ref={dialogRef}
                className="relative bg-tl-bg w-full md:max-w-[640px] rounded-t-lg md:rounded-md p-8 md:p-10 border border-tl-ink/10 max-h-[92vh] overflow-auto"
            >
                <div className="flex items-start justify-between gap-6">
                    <h2
                        id="cookie-prefs-title"
                        className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] tracking-[-0.01em] leading-tight text-tl-ink"
                    >
                        Cookie preferences
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-full border border-tl-ink/15 flex items-center justify-center text-tl-ink2 hover:text-tl-ink"
                        aria-label="Close preferences"
                        data-testid="cookie-prefs-close"
                    >
                        ✕
                    </button>
                </div>

                <p className="mt-4 text-tl-ink2 text-[14px] md:text-[15px] leading-[1.65]">
                    We keep this short. One cookie is necessary. It remembers the choice you&apos;re about to make. Everything
                    else is optional, and it stays off until you turn it on.
                </p>

                <div className="mt-8 space-y-1">
                    <Row
                        title="Strictly necessary"
                        body="Remembers your cookie choice so we don't have to ask twice. Lives in your browser, identifies no one, goes no further than this site."
                        alwaysOn
                        testId="row-necessary"
                    />
                    <Row
                        title="Google Analytics"
                        body="The counting kind. Which pages get read, how visitors arrive, how many. Aggregate numbers, no individual profiles. Cookies: _ga, _ga_G-7F2PPZPXSK."
                        checked={ga}
                        onChange={setGa}
                        testId="row-ga"
                        toggleTestId="toggle-ga"
                    />
                    <Row
                        title="Microsoft Clarity"
                        body="The watching kind. Anonymized session recordings and heatmaps that show where the site works and where it snags. More intimate than counting, so we ask for it separately. Cookies: _clck, _clsk, and MUID on bing.com."
                        checked={clarity}
                        onChange={setClarity}
                        testId="row-clarity"
                        toggleTestId="toggle-clarity"
                    />
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-overpass text-[12px] tracking-[0.14em] uppercase font-semibold">
                    <button
                        onClick={rejectAll}
                        className="text-tl-ink2 hover:text-tl-navy transition-colors"
                        data-testid="cookie-prefs-reject-all"
                    >
                        Reject all
                    </button>
                    <span aria-hidden className="w-px h-4 bg-tl-ink/15" />
                    <button
                        onClick={savePrefs}
                        className="text-tl-ink2 hover:text-tl-navy transition-colors"
                        data-testid="cookie-prefs-save"
                    >
                        Save preferences
                    </button>
                    <span aria-hidden className="w-px h-4 bg-tl-ink/15" />
                    <button
                        onClick={acceptAll}
                        className="text-tl-ink hover:text-tl-navy transition-colors"
                        data-testid="cookie-prefs-accept-all"
                    >
                        Accept all
                    </button>
                </div>
            </div>
        </div>
    );
}

function Row({ title, body, alwaysOn = false, checked, onChange, testId, toggleTestId }) {
    return (
        <div
            className="flex items-start justify-between gap-6 py-5 border-t border-tl-ink/10 first:border-t-0"
            data-testid={testId}
        >
            <div className="flex-1">
                <p className="font-serif text-[18px] md:text-[20px] leading-snug text-tl-ink">{title}</p>
                <p className="mt-2 text-[13px] md:text-[14px] leading-[1.6] text-tl-ink2 max-w-lg">{body}</p>
            </div>
            {alwaysOn ? (
                <span
                    className="shrink-0 mt-1 font-overpass text-[11px] tracking-[0.16em] uppercase font-semibold text-tl-ink2"
                    aria-label="Always on"
                >
                    Always on
                </span>
            ) : (
                <button
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    aria-label={title}
                    data-testid={toggleTestId}
                    onClick={() => onChange(!checked)}
                    className={`relative shrink-0 mt-1 w-12 h-7 rounded-full transition-colors duration-300 ${
                        checked ? "bg-tl-navy" : "bg-tl-ink/15"
                    }`}
                >
                    <span
                        className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-tl-bg transition-transform duration-300 ${
                            checked ? "translate-x-5" : "translate-x-0"
                        }`}
                    />
                </button>
            )}
        </div>
    );
}
