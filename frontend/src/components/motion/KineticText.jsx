import { motion } from "framer-motion";

/**
 * KineticText — masked line-by-line reveal, editorial cadence.
 * Pass `lines` as an array of strings. Each line lives inside an overflow-hidden
 * mask; the inner span slides + fades + un-blurs into place. Staggered.
 *
 * Use for hero headlines. Do NOT use for body copy (too heavy).
 */
export function KineticText({ lines = [], as: Tag = "h1", className = "", stagger = 0.08, initialDelay = 0.15 }) {
    return (
        <Tag className={className}>
            {lines.map((line, i) => (
                <span className="tl-mask" key={i}>
                    <motion.span
                        initial={{ y: "110%", opacity: 0, filter: "blur(10px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        transition={{
                            delay: initialDelay + i * stagger,
                            duration: 1.05,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        {line}
                    </motion.span>
                </span>
            ))}
        </Tag>
    );
}

/**
 * KineticWords — word-level version. Useful for eyebrows and shorter callouts.
 */
export function KineticWords({ text = "", className = "", stagger = 0.04, initialDelay = 0.1 }) {
    const words = text.split(" ");
    return (
        <span className={className}>
            {words.map((w, i) => (
                <span className="tl-mask inline-block align-baseline" key={i} style={{ marginRight: "0.25em" }}>
                    <motion.span
                        className="inline-block"
                        initial={{ y: "110%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: initialDelay + i * stagger, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {w}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}
