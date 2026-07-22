import { motion } from "framer-motion";

/**
 * Reveal — a scroll-triggered enter animation.
 * Understated by default (fade + 24px rise + tiny blur). No bounce, no fanfare.
 */
export function Reveal({ children, className = "", delay = 0, y = 24, once = true, as: Tag = "div" }) {
    const MotionTag = motion[Tag] || motion.div;
    return (
        <MotionTag
            className={className}
            initial={{ opacity: 0, y, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
        >
            {children}
        </MotionTag>
    );
}

/**
 * StaggerParent + Item — for lists that reveal in sequence.
 */
export function StaggerParent({ children, className = "", stagger = 0.08, once = true }) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.15 }}
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className = "", y = 22 }) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y, filter: "blur(6px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
            }}
        >
            {children}
        </motion.div>
    );
}
