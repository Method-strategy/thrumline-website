import { useEffect, useState } from "react";
import { readConsent, writeConsent, clearConsent } from "@/lib/consent";

export function CookiePreferencesModal({ open, onClose, onSaved }) {
    const [ga, setGa] = useState(false);
    const [clarity, setClarity] = useState(false);

    useEffect(() => {
        if (!open) return;
        const c = readConsent();
        setGa(!!c?.ga);
        setClarity(!!c?.clarity);
    }, [open]);

    // Pause Lenis while modal open
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
            <div
                className="absolute inset-0 bg-tl-ink/60 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden
            />
            <div className="relative bg-tl-bg w-full md:max-w-[600px] rounded-t-lg md:rounded-md p-8 md:p-10 border border-tl-ink/10 max-h-[92vh] overflow-auto">
                <div className="flex items-start justify-between gap-6">
                    <div>
                        <p className="tl-eyebrow mb-2">Cookie preferences</p>
                        <h2 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight">
                            Turn things on or off.
                        </h2>
                    </div>
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
                    Nothing loads until you say yes. Your choice lives in your browser&apos;s localStorage under{" "}
                    <code className="text-tl-navy">thrumline_consent_v1</code> — not in a cookie, and never shared with anyone.
                </p>

                <div className="mt-8 space-y-6">
                    <Toggle
                        title="Google Analytics 4"
                        subtitle="Aggregate traffic and which pages get read. First-party cookies (_ga, _ga_[id]). No advertising, no remarketing, no Google Signals."
                        checked={ga}
                        onChange={setGa}
                        testId="toggle-ga"
                    />
                    <Toggle
                        title="Microsoft Clarity"
                        subtitle="Anonymized session replay and click/scroll heatmaps. Sensitive fields are masked. No advertising, no profiling."
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
                        <button
                            onClick={onClose}
                            className="tl-btn tl-btn-ghost"
                            data-testid="cookie-prefs-cancel"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={save}
                            className="tl-btn"
                            data-testid="cookie-prefs-save"
                        >
                            Save preferences
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Toggle({ title, subtitle, checked, onChange, testId }) {
    return (
        <div className="flex items-start justify-between gap-6 py-4 border-t border-tl-ink/10 first:border-t-0">
            <div className="flex-1">
                <p className="font-serif text-xl leading-snug text-tl-ink">{title}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-tl-ink2">{subtitle}</p>
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
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
