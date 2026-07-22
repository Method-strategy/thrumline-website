import { useEffect, useState } from "react";
import { readConsent, writeConsent } from "@/lib/consent";
import { CookiePreferencesModal } from "./CookiePreferencesModal";

export function ConsentBanner({ openTrigger }) {
    // Client-only. The prerendered HTML must contain NO banner markup so the
    // static response stays byte-identical to the pre-consent version.
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [prefsOpen, setPrefsOpen] = useState(false);

    // Only mount after hydration, and only on real browsers (not during
    // Puppeteer prerender which sets window.__THRUMLINE_PRERENDER__).
    useEffect(() => {
        if (typeof window !== "undefined" && window.__THRUMLINE_PRERENDER__) return;
        setMounted(true);
        const c = readConsent();
        if (!c) setVisible(true);
    }, []);

    // External trigger from footer button
    useEffect(() => {
        if (openTrigger > 0) setPrefsOpen(true);
    }, [openTrigger]);

    const acceptAll = () => {
        writeConsent({ ga: true, clarity: true });
        setVisible(false);
    };
    const declineAll = () => {
        writeConsent({ ga: false, clarity: false });
        setVisible(false);
    };

    return (
        <>
            {mounted && visible && (
                <div
                    className="fixed z-40 bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:max-w-[520px] tl-slide-up"
                    data-testid="consent-banner"
                    role="dialog"
                    aria-labelledby="consent-title"
                >
                    <div className="bg-tl-ink text-tl-bg rounded-md p-6 md:p-7 border border-tl-ink shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)]">
                        <p id="consent-title" className="tl-eyebrow tl-eyebrow-inverse mb-2">A quiet ask</p>
                        <p className="font-serif text-[22px] md:text-[26px] leading-[1.15] tracking-tight">
                            May we measure how the site is doing?
                        </p>
                        <p className="mt-3 text-[14px] leading-relaxed text-tl-bg/80">
                            We use Google Analytics and Microsoft Clarity to understand aggregate traffic and page use.
                            Nothing loads until you say yes. Not used for advertising or profiling.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                            <button
                                onClick={acceptAll}
                                className="tl-btn tl-btn-inverse"
                                data-testid="consent-accept-all"
                            >
                                Accept all
                            </button>
                            <button
                                onClick={declineAll}
                                className="tl-btn"
                                style={{ background: "transparent", color: "#F4F5F7", borderColor: "rgba(244,245,247,0.3)" }}
                                data-testid="consent-decline-all"
                            >
                                Decline
                            </button>
                            <button
                                onClick={() => { setPrefsOpen(true); }}
                                className="tl-btn"
                                style={{ background: "transparent", color: "#F4F5F7", borderColor: "rgba(244,245,247,0.3)" }}
                                data-testid="consent-preferences"
                            >
                                Preferences
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <CookiePreferencesModal
                open={prefsOpen}
                onClose={() => setPrefsOpen(false)}
                onSaved={() => { setVisible(false); setPrefsOpen(false); }}
            />
        </>
    );
}
