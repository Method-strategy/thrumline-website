import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wordmark } from "@/components/brand/AnimatedLogo";
import { NAV } from "@/content/site";

/**
 * SideNav — the primary navigation.
 *
 * Desktop (≥md):
 *   A slim vertical index pinned to the right edge of the viewport.
 *   Five plain text labels stacked vertically. No background panel, no button
 *   styling, no CTA. Reads like a quiet index.
 *
 * Mobile (<md):
 *   Conventional top bar with the animated wordmark on the left and a plain
 *   text menu trigger on the right that opens a full-screen sheet listing the
 *   five links.
 *
 * The old top-header/Nav.jsx is preserved as Nav.legacy.jsx for easy revert.
 */
export function SideNav() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    // Close the mobile sheet on route change.
    useEffect(() => setOpen(false), [location.pathname]);

    // Pause Lenis while the mobile sheet is open (prevents body scroll under it).
    useEffect(() => {
        const l = window.__lenis;
        if (open) {
            if (l) l.stop();
            document.body.style.overflow = "hidden";
        } else {
            if (l) l.start();
            document.body.style.overflow = "";
        }
        return () => {
            if (l) l.start();
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            {/* ─────── Desktop: right-pinned vertical index ─────── */}
            <nav
                className="hidden md:flex fixed top-1/2 right-6 lg:right-10 -translate-y-1/2 z-40 items-stretch gap-5"
                aria-label="Primary"
                data-testid="side-nav"
            >
                {/* Attention-nudge hairline — draws top-down on mount, then rests
                    as a quiet anchor alongside the unconventional right-side nav. */}
                <div
                    aria-hidden
                    className="relative w-px self-stretch overflow-hidden"
                    data-testid="side-nav-rule"
                >
                    <div className="absolute inset-0 bg-tl-ink/10" />
                    <motion.div
                        className="absolute inset-0 origin-top"
                        style={{
                            background:
                                "linear-gradient(to bottom, #184887 0%, #426FB6 55%, #41ADE2 100%)",
                        }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.9, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    {NAV.map((n) => (
                        <NavLink
                            key={n.href}
                            to={n.href}
                            data-testid={`nav-link-${n.href.replace("/", "") || "home"}`}
                            className={({ isActive }) =>
                                `font-overpass text-[13px] tracking-[0.14em] uppercase font-medium leading-none transition-colors duration-500 ` +
                                (isActive
                                    ? "text-tl-ink"
                                    : "text-tl-ink2/70 hover:text-tl-ink")
                            }
                        >
                            {n.label}
                        </NavLink>
                    ))}
                </div>
            </nav>

            {/* ─────── Mobile: top bar with menu trigger ─────── */}
            <header
                className="md:hidden fixed top-0 inset-x-0 z-40 bg-tl-bg/85 backdrop-blur-md border-b border-tl-ink/[0.06]"
                data-testid="mobile-nav"
            >
                <div className="h-[64px] px-6 flex items-center justify-between">
                    <Link to="/" aria-label="Thrumline home" data-testid="mobile-nav-logo-link">
                        <Wordmark />
                    </Link>
                    <button
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        className="font-overpass text-[12px] tracking-[0.16em] uppercase font-semibold text-tl-ink py-2"
                        data-testid="mobile-nav-toggle"
                    >
                        {open ? "Close" : "Menu"}
                    </button>
                </div>
            </header>
            {/* Reserve space so mobile content isn't hidden under the fixed top bar. */}
            <div className="md:hidden h-[64px]" aria-hidden />

            {/* Mobile sheet */}
            <div
                className={`md:hidden fixed inset-0 z-[45] transition-opacity duration-500 ease-out ${
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                aria-hidden={!open}
            >
                <div className="absolute inset-0 bg-tl-bg" />
                <div className="relative h-full flex flex-col">
                    <div className="h-[64px] px-6 flex items-center justify-between border-b border-tl-ink/[0.06]">
                        <Link to="/" aria-label="Thrumline home">
                            <Wordmark />
                        </Link>
                        <button
                            onClick={() => setOpen(false)}
                            aria-label="Close menu"
                            className="text-[12px] tracking-[0.16em] uppercase font-semibold text-tl-ink py-2"
                            data-testid="mobile-nav-close"
                        >
                            Close
                        </button>
                    </div>
                    <nav
                        className="flex-1 px-6 pt-12 pb-16 flex flex-col gap-6"
                        aria-label="Primary"
                    >
                        {NAV.map((n, i) => (
                            <NavLink
                                key={n.href}
                                to={n.href}
                                data-testid={`mobile-nav-link-${n.href.replace("/", "") || "home"}`}
                                className={({ isActive }) =>
                                    `font-serif text-[clamp(2rem,7vw,3rem)] leading-[1] tracking-[-0.01em] transition-opacity ${
                                        isActive ? "text-tl-ink" : "text-tl-ink/85"
                                    }`
                                }
                                style={{
                                    transitionDelay: open ? `${80 + i * 60}ms` : "0ms",
                                    opacity: open ? 1 : 0,
                                    transform: open ? "translateY(0)" : "translateY(8px)",
                                    transitionProperty: "opacity, transform",
                                    transitionDuration: "700ms",
                                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                                }}
                            >
                                {n.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
}
