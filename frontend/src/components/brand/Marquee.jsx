import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Marquee — one slow, editorial horizontal loop. Signal, not noise.
 * Scroll-linked slight speed-up on scroll for a whisper of parallax.
 */
export function Marquee({
    text = "",
    dividerChar = "◆",
    className = "",
    italic = true,
    color = "text-tl-ink/[0.10]",
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

    const items = new Array(4).fill(text);

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden select-none ${className}`}
            data-testid="editorial-marquee"
        >
            <motion.div style={{ x }} className="w-max">
                <div className="tl-marquee-track flex w-max whitespace-nowrap">
                    {items.concat(items).map((t, i) => (
                        <span
                            key={i}
                            className={`font-serif ${italic ? "italic" : ""} ${color} px-6 md:px-10 leading-none`}
                            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 300 }}
                        >
                            {t}
                            <span className="inline-block align-middle mx-6 md:mx-10 text-tl-sky/50" style={{ fontSize: "0.6em" }}>
                                {dividerChar}
                            </span>
                        </span>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
