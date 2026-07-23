import { motion } from "framer-motion";

/**
 * SignalMark — a small three-bar accent that echoes the animated brand mark.
 *
 * The three bars pulse in sequence (deep navy → mid blue → sky blue) exactly
 * once when the element enters the viewport, then rest. It's the "whizz bang"
 * ornament on each page: quiet, on-brand, over in half a second. Sits next to
 * page H1s and section landmarks.
 */
export function SignalMark({ className = "", size = "md" }) {
    const dims = {
        sm: { bar: "w-6 h-[3px]", gap: "gap-[3px]" },
        md: { bar: "w-8 h-[4px]", gap: "gap-1" },
        lg: { bar: "w-12 h-[6px]", gap: "gap-[6px]" },
    }[size] || { bar: "w-8 h-[4px]", gap: "gap-1" };

    const bars = [
        { fill: "#184887", delay: 0.0 },
        { fill: "#426FB6", delay: 0.12 },
        { fill: "#41ADE2", delay: 0.24 },
    ];

    return (
        <motion.div
            className={`inline-flex flex-col ${dims.gap} ${className}`}
            data-testid="signal-mark"
            initial="rest"
            whileInView="pulse"
            viewport={{ once: true, amount: 0.6 }}
            aria-hidden
        >
            {bars.map((b, i) => (
                <motion.span
                    key={i}
                    className={`${dims.bar} rounded-full block`}
                    style={{ backgroundColor: b.fill, transformOrigin: "left" }}
                    variants={{
                        rest: { opacity: 0, scaleX: 0.2 },
                        pulse: {
                            opacity: [0, 1, 1, 1],
                            scaleX: [0.2, 1, 1, 1],
                            transition: {
                                delay: b.delay,
                                duration: 0.85,
                                times: [0, 0.35, 0.75, 1],
                                ease: [0.22, 1, 0.36, 1],
                            },
                        },
                    }}
                />
            ))}
        </motion.div>
    );
}
