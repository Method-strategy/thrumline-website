import { useEffect, useState } from "react";
import { readConsent, writeConsent } from "@/lib/consent";
import { CookiePreferencesModal } from "./CookiePreferencesModal";

// Banner body copy is the approved Section 4 "In Short" paragraph from the
// Thrumline Privacy Policy Cookies Section DRAFT, verbatim. Button labels
// come from the same section's approved sentence ("You can accept everything,
// decline everything, or open Preferences...").

export function ConsentBanner({ openTrigger }) {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [prefsOpen, setPrefsOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined" && window.__THRUMLINE_PRERENDER__) return;
        setMounted(true);
        const c = readConsent();
        if (!c) setVisible(true);
    }, []);

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
                    className="fixed z-40 bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:max-w-[560px] tl-slide-up"
                    data-testid="consent-banner"
                    role="dialog"
                    aria-labelledby="consent-title"
                >
                    <div className="bg-tl-ink text-tl-bg rounded-md p-6 md:p-7 border border-tl-ink shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)]">
                        <p id="consent-title" className="font-serif text-[20px] md:text-[22px] leading-[1.25] tracking-tight">
                            Do we use cookies and other tracking technologies?
                        </p>
                        <p className="mt-3 text-[14px] leading-relaxed text-tl-bg/85">
                            Yes, but only if you say yes. We use Google Analytics to understand aggregate traffic and Microsoft
                            Clarity to understand how the site is used. Neither runs until you opt in, and you can change your
                            mind at any time.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                            <button onClick={acceptAll} className="tl-btn tl-btn-inverse" data-testid="consent-accept-all">
                                Accept everything
                            </button>
                            <button
                                onClick={declineAll}
                                className="tl-btn"
                                style={{ background: "transparent", color: "#F4F5F7", borderColor: "rgba(244,245,247,0.3)" }}
                                data-testid="consent-decline-all"
                            >
                                Decline everything
                            </button>
                            <button
                                onClick={() => setPrefsOpen(true)}
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
