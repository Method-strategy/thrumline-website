import { motion, useScroll, useSpring } from "framer-motion";

/**
 * SignalScroll — the whizz-bang.
 *
 * A slim vertical bar pinned to the left edge of the viewport that fills with
 * the brand's three-blue signal gradient as the reader scrolls the page. It is
 * decorative-only, respects the calm design system, and echoes the animated
 * logo's signal metaphor without competing with the content.
 */
export function SignalScroll() {
    const { scrollYProgress } = useScroll();
    const y = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.4 });

    return (
        <div
            aria-hidden
            className="fixed left-3 md:left-5 top-6 bottom-6 z-30 pointer-events-none hidden md:block"
            data-testid="signal-scroll"
        >
            {/* rail */}
            <div className="relative w-[2px] h-full bg-tl-ink/10 rounded-full overflow-hidden">
                <motion.div
                    style={{ scaleY: y, transformOrigin: "top" }}
                    className="absolute inset-0 rounded-full"
                >
                    <div
                        className="w-full h-full rounded-full"
                        style={{
                            background:
                                "linear-gradient(to bottom, #184887 0%, #426FB6 45%, #41ADE2 100%)",
                        }}
                    />
                </motion.div>
            </div>
        </div>
    );
}
