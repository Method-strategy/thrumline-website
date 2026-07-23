import { Link } from "react-router-dom";
import { Wordmark } from "@/components/brand/AnimatedLogo";
import { SITE, NAV } from "@/content/site";

// Footer contains only functional navigation and legal/contact links.
// No approved brand copy was provided for the footer.

export function Footer({ onOpenCookiePrefs }) {
    const year = new Date().getFullYear();
    return (
        <footer className="relative bg-tl-bg pt-20 md:pt-28 pb-14 border-t border-tl-ink/10 mt-16" data-testid="site-footer">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-5">
                        <Wordmark />
                    </div>

                    <div className="md:col-span-3">
                        <ul className="space-y-4 text-[15px]">
                            {NAV.map((n) => (
                                <li key={n.href}>
                                    <Link className="tl-drawline-link" to={n.href}>
                                        {n.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link className="tl-drawline-link" to="/privacy-policy">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <ul className="space-y-4 text-[15px]">
                            <li>
                                <a className="tl-drawline-link" href={`mailto:${SITE.email}`} data-testid="footer-email">
                                    {SITE.email}
                                </a>
                            </li>
                            <li>
                                <a
                                    className="tl-drawline-link"
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
                                    className="tl-drawline-link"
                                    data-testid="footer-cookie-prefs"
                                >
                                    Cookie preferences
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="tl-rule my-14" />

                <div className="text-[13px] text-tl-ink2">
                    <p>© {year} {SITE.legalName}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
