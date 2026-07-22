import { Link } from "react-router-dom";
import { Wordmark } from "@/components/brand/AnimatedLogo";
import { SITE, NAV } from "@/content/site";

export function Footer({ onOpenCookiePrefs }) {
    const year = new Date().getFullYear();
    return (
        <footer className="relative bg-tl-bg pt-24 md:pt-32 pb-14 border-t border-tl-ink/10 mt-24" data-testid="site-footer">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                {/* Massive quiet closing line */}
                <div className="max-w-4xl">
                    <p className="tl-eyebrow mb-6">Signal, not noise</p>
                    <p className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight text-tl-ink">
                        A short conversation is <em className="text-tl-navy">worth&nbsp;finding out</em>.
                    </p>
                    <Link to="/fit" className="tl-btn mt-8" data-testid="footer-cta-fit">
                        {SITE.ctaLabel}
                        <span aria-hidden>→</span>
                    </Link>
                </div>

                <div className="tl-rule my-16" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-5">
                        <Wordmark />
                        <p className="mt-6 max-w-md text-tl-ink2 text-[15px] leading-relaxed">
                            {SITE.legalName}. Marketing execution and momentum for businesses that are done being oversold.
                        </p>
                    </div>

                    <div className="md:col-span-3">
                        <p className="tl-eyebrow mb-4">Pages</p>
                        <ul className="space-y-3 text-[15px]">
                            {NAV.map((n) => (
                                <li key={n.href}>
                                    <Link className="tl-arrow-link" to={n.href}>
                                        {n.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link className="tl-arrow-link" to="/privacy-policy">
                                    Privacy policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <p className="tl-eyebrow mb-4">Get in touch</p>
                        <ul className="space-y-3 text-[15px]">
                            <li>
                                <a
                                    className="tl-signal-link"
                                    href={`mailto:${SITE.email}`}
                                    data-testid="footer-email"
                                >
                                    {SITE.email}
                                </a>
                            </li>
                            <li>
                                <a
                                    className="tl-signal-link"
                                    href={SITE.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="footer-linkedin"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={onOpenCookiePrefs}
                                    className="tl-signal-link text-left"
                                    data-testid="footer-cookie-prefs"
                                >
                                    Cookie preferences
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="tl-rule my-14" />

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[13px] text-tl-ink2">
                    <p>© {year} {SITE.legalName}. All rights reserved.</p>
                    <p className="tracking-widest uppercase text-xs">{SITE.tagline}</p>
                </div>
            </div>
        </footer>
    );
}
