import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll — Lenis momentum scroll wrapper. Respects prefers-reduced-motion.
 * Also exposes a global window.__lenis so we can pause/resume for modals.
 */
export function SmoothScroll({ children }) {
    const rafRef = useRef();

    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) return; // hand back to native scroll

        const lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.2,
        });
        window.__lenis = lenis;

        const raf = (time) => {
            lenis.raf(time);
            rafRef.current = requestAnimationFrame(raf);
        };
        rafRef.current = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafRef.current);
            lenis.destroy();
            delete window.__lenis;
        };
    }, []);

    return <>{children}</>;
}
