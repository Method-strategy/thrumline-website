import { useEffect, useState } from "react";
import { toast } from "sonner";
import { readConsent, writeConsent } from "@/lib/consent";
import { CookiePreferencesModal } from "./CookiePreferencesModal";

/**
 * ConsentBanner — full-width, understated. Slim strip along the bottom of
 * the viewport. All visible text is the client-approved verbatim copy.
 */
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
        toast("Noted.");
    };
    const declineAll = () => {
        writeConsent({ ga: false, clarity: false });
        setVisible(false);
    };

    return (
        <>
            {mounted && visible && (
                <div
                    className="fixed z-40 bottom-0 inset-x-0 tl-slide-up"
                    data-testid="consent-banner"
                    role="dialog"
                    aria-labelledby="consent-body"
                >
                    <div className="bg-tl-bg/95 backdrop-blur-md border-t border-tl-ink/10">
                        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 md:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
                            <p
                                id="consent-body"
                                className="text-[13px] md:text-[14px] leading-[1.55] text-tl-ink2 max-w-3xl"
                            >
                                We take your privacy as seriously as we take our work. To understand what lands with our
                                audience and what doesn&apos;t, we use Google Analytics and Microsoft Clarity, but only if you
                                say yes.
                            </p>
                            <div className="flex items-center gap-6 font-overpass text-[12px] tracking-[0.14em] uppercase font-semibold shrink-0">
                                <button
                                    onClick={acceptAll}
                                    className="text-tl-ink hover:text-tl-navy transition-colors"
                                    data-testid="consent-accept-all"
                                >
                                    Accept
                                </button>
                                <span aria-hidden className="w-px h-4 bg-tl-ink/15" />
                                <button
                                    onClick={declineAll}
                                    className="text-tl-ink2 hover:text-tl-navy transition-colors"
                                    data-testid="consent-decline-all"
                                >
                                    Decline
                                </button>
                                <span aria-hidden className="w-px h-4 bg-tl-ink/15" />
                                <button
                                    onClick={() => setPrefsOpen(true)}
                                    className="text-tl-ink2 hover:text-tl-navy transition-colors"
                                    data-testid="consent-preferences"
                                >
                                    Preferences
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <CookiePreferencesModal
                open={prefsOpen}
                onClose={() => setPrefsOpen(false)}
                onSavedAccept={() => {
                    setVisible(false);
                    setPrefsOpen(false);
                    toast("Noted.");
                }}
                onSaved={() => {
                    setVisible(false);
                    setPrefsOpen(false);
                }}
            />
        </>
    );
}
