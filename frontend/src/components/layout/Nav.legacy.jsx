import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/AnimatedLogo";
import { NAV, SITE } from "@/content/site";

export function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => setOpen(false), [location.pathname]);

    return (
        <>
            <header
                className={`fixed top-0 inset-x-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-out ${
                    scrolled
                        ? "bg-tl-bg/85 backdrop-blur-md border-b border-tl-ink/[0.08]"
                        : "bg-tl-bg/60 backdrop-blur-sm border-b border-transparent"
                }`}
                data-testid="site-nav"
            >
                <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
                    <Link to="/" className="flex items-center" data-testid="nav-logo-link" aria-label="Thrumline home">
                        <Wordmark />
                    </Link>

                    <nav className="hidden md:flex items-center gap-9 font-sans text-[14px] tracking-wide">
                        {NAV.slice(0, 4).map((n) => (
                            <NavLink
                                key={n.href}
                                to={n.href}
                                data-testid={`nav-link-${n.href.replace("/", "") || "home"}`}
                                className={({ isActive }) => `tl-nav-link text-tl-ink/80 hover:text-tl-ink ${isActive ? "active text-tl-ink" : ""}`}
                            >
                                {n.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/fit"
                            className="hidden md:inline-flex tl-btn"
                            data-testid="nav-cta-fit"
                        >
                            {SITE.ctaLabel}
                            <span aria-hidden>→</span>
                        </Link>
                        <button
                            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-tl-ink/15"
                            aria-label={open ? "Close menu" : "Open menu"}
                            data-testid="nav-mobile-toggle"
                            onClick={() => setOpen((v) => !v)}
                        >
                            <span className="relative w-4 h-3 block">
                                <span className={`absolute inset-x-0 top-0 h-px bg-tl-ink transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
                                <span className={`absolute inset-x-0 top-[6px] h-px bg-tl-ink transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
                                <span className={`absolute inset-x-0 top-[12px] h-px bg-tl-ink transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile drawer */}
                <div
                    className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
                        open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="px-6 pb-8 pt-2 border-t border-tl-ink/[0.06] bg-tl-bg">
                        <nav className="flex flex-col gap-5 pt-6 font-serif text-3xl leading-tight">
                            {NAV.map((n) => (
                                <NavLink
                                    key={n.href}
                                    to={n.href}
                                    data-testid={`mobile-nav-link-${n.href.replace("/", "") || "home"}`}
                                    className={({ isActive }) => `text-tl-ink/80 hover:text-tl-ink ${isActive ? "text-tl-ink" : ""}`}
                                >
                                    {n.label}
                                </NavLink>
                            ))}
                        </nav>
                        <Link to="/fit" data-testid="mobile-nav-cta" className="tl-btn mt-8 w-full justify-center">
                            {SITE.ctaLabel}
                            <span aria-hidden>→</span>
                        </Link>
                    </div>
                </div>
            </header>
            <div aria-hidden className="h-[72px]" />
        </>
    );
}
