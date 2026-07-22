import { useEffect, useState } from "react";
import { readConsent, writeConsent, clearConsent } from "@/lib/consent";

// Modal copy uses functional UI labels plus verbatim excerpts from the
// approved Section 4 privacy text. No invented brand voice.

export function CookiePreferencesModal({ open, onClose, onSaved }) {
    const [ga, setGa] = useState(false);
    const [clarity, setClarity] = useState(false);

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

    if (!open) return null;

    const save = () => {
        writeConsent({ ga, clarity });
        if (onSaved) onSaved();
    };
    const reset = () => {
        clearConsent();
        setGa(false);
        setClarity(false);
    };

    return (
        <div
            className="fixed inset-0 z-[60] flex items-end md:items-center justify-center"
            data-testid="cookie-prefs-modal"
            aria-modal="true"
            role="dialog"
        >
            <div className="absolute inset-0 bg-tl-ink/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
            <div className="relative bg-tl-bg w-full md:max-w-[600px] rounded-t-lg md:rounded-md p-8 md:p-10 border border-tl-ink/10 max-h-[92vh] overflow-auto">
                <div className="flex items-start justify-between gap-6">
                    <h2 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight">
                        Cookie preferences
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full border border-tl-ink/15 flex items-center justify-center"
                        aria-label="Close preferences"
                        data-testid="cookie-prefs-close"
                    >
                        ✕
                    </button>
                </div>

                <p className="mt-4 text-tl-ink2 text-[15px] leading-relaxed">
                    You can accept everything, decline everything, or turn Google Analytics and Microsoft Clarity on or off
                    independently. No analytics cookies are set, and no analytics scripts load, until you give consent for that
                    specific provider.
                </p>

                <div className="mt-8 space-y-6">
                    <Toggle
                        title="Google Analytics"
                        checked={ga}
                        onChange={setGa}
                        testId="toggle-ga"
                    />
                    <Toggle
                        title="Microsoft Clarity"
                        checked={clarity}
                        onChange={setClarity}
                        testId="toggle-clarity"
                    />
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-3 justify-between">
                    <button
                        onClick={reset}
                        className="text-[13px] uppercase tracking-widest font-semibold text-tl-ink2 hover:text-tl-ink"
                        data-testid="cookie-prefs-reset"
                    >
                        Reset choice
                    </button>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="tl-btn tl-btn-ghost" data-testid="cookie-prefs-cancel">
                            Cancel
                        </button>
                        <button onClick={save} className="tl-btn" data-testid="cookie-prefs-save">
                            Save preferences
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Toggle({ title, checked, onChange, testId }) {
    return (
        <div className="flex items-center justify-between gap-6 py-4 border-t border-tl-ink/10 first:border-t-0">
            <p className="font-serif text-xl leading-snug text-tl-ink">{title}</p>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                aria-label={title}
                data-testid={testId}
                onClick={() => onChange(!checked)}
                className={`relative shrink-0 w-14 h-8 rounded-full transition-colors duration-300 ${
                    checked ? "bg-tl-navy" : "bg-tl-ink/15"
                }`}
            >
                <span
                    className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-tl-bg transition-transform duration-300 ${
                        checked ? "translate-x-6" : "translate-x-0"
                    }`}
                />
            </button>
        </div>
    );
}
