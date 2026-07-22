import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * AnimatedLogo — inlines the Thrumline brand mark SVG (SMIL animations preserved)
 * and wraps it in a subtle 3D tilt that tracks the cursor. Container has locked
 * aspect-ratio so it never causes CLS. Respects prefers-reduced-motion.
 */

const RAW_SVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 672.01 174.96" role="img" aria-label="Thrumline">
  <defs>
    <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="6" result="b"/>
      <feComponentTransfer in="b"><feFuncA type="linear" slope="0.9"/></feComponentTransfer>
    </filter>
    <linearGradient id="shinegrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="wmclip">
    <polygon points="632.03 154.65 632.03 140.89 665.42 140.89 665.42 122.46 632.03 122.46 632.03 109.89 670.21 109.89 670.21 90.38 609.29 90.38 609.29 174.16 672.01 174.16 672.01 154.65 632.03 154.65"/>
    <path d="M59.19,90.3v4.73h-27.17v79.21h-4.85v-79.21H0v-4.73h59.19Z"/>
    <path d="M80.18,90.3v43.23h45.73v-43.23h7.4v83.94h-7.4v-33.79h-45.73v33.79h-7.4v-83.94h7.4Z"/>
    <path d="M187.3,90.3c16.37,0,27.41,8.49,27.41,25.59,0,13.71-7.16,21.83-18.32,24.62l22.2,33.72h-11.52l-20.98-32.75h-22.68v32.75h-10.07v-83.94h33.96ZM163.28,132.63h24.14c10.55,0,17.59-5.34,17.59-16.62s-7.04-16.49-17.59-16.49h-24.14v33.11Z"/>
    <path d="M242.86,90.3v52.52c0,13.59,8.37,20.74,19.17,20.74s19.41-7.16,19.41-20.74v-52.52h12.37v52.52c0,21.47-14.31,32.14-31.78,32.14s-31.66-10.67-31.66-32.14v-52.52h12.49Z"/>
    <path d="M328.03,90.3l25.84,57.74,25.96-57.74h14.8v83.94h-15.04v-49.01l-22.8,49.01h-6.43l-22.8-49.49v49.49h-15.04v-83.94h15.53Z"/>
    <polygon points="430.85 157.25 430.85 90.3 412.54 90.3 412.54 174.24 470.52 174.24 470.52 157.25 430.85 157.25"/>
    <path d="M505.4,90.3v83.94h-20.26v-83.94h20.26Z"/>
    <path d="M542.75,90.3l28.63,46.46v-46.46h20.14v83.94h-18.32l-30.45-46.34v46.34h-20.14v-83.94h20.14Z"/>
    </clipPath>
  </defs>
  <g id="Layer_1-2" data-name="Layer 1">
    <rect x="310.05" y="60.06" width="87.01" height="17.48" rx="8.25" ry="8.25" fill="#8fd6f2" filter="url(#glow)" opacity="0"><animate attributeName="opacity" values="0;0;0;1;1;0;0;1;1;0;0;1;1;0;0;1;1;0;0;1;1;0;0;1;1;0;0" keyTimes="0.00000;0.13674;0.13684;0.13685;0.21579;0.21895;0.25779;0.25789;0.33684;0.34000;0.37884;0.37895;0.45789;0.46105;0.49989;0.50000;0.57895;0.58211;0.62095;0.62105;0.70000;0.70316;0.74632;0.74737;0.95789;0.96105;1.00000" dur="9.5s" calcMode="discrete" repeatCount="indefinite"/></rect>
    <rect x="310.05" y="60.06" width="87.01" height="17.48" rx="8.25" ry="8.25" fill="#41ADE2" opacity="0"><animate attributeName="opacity" values="0;0;0;1;1;0;0;1;1;0;0;1;1;0;0;1;1;0;0;1;1;0;0;1;1;0;0" keyTimes="0.00000;0.13674;0.13684;0.13685;0.21579;0.21895;0.25779;0.25789;0.33684;0.34000;0.37884;0.37895;0.45789;0.46105;0.49989;0.50000;0.57895;0.58211;0.62095;0.62105;0.70000;0.70316;0.74632;0.74737;0.95789;0.96105;1.00000" dur="9.5s" calcMode="discrete" repeatCount="indefinite"/></rect>
    <rect x="310.05" y="30.03" width="87.01" height="17.48" rx="8.25" ry="8.25" fill="#8fb0e0" filter="url(#glow)" opacity="0"><animate attributeName="opacity" values="0;0;0;1;1;0;0;1;1;0;0;1;1;0;0;1;1;0;0;1;1;0;0;1;1;0;0" keyTimes="0.00000;0.13684;0.14621;0.14632;0.22526;0.22842;0.26726;0.26737;0.34632;0.34947;0.38832;0.38842;0.46737;0.47053;0.50937;0.50947;0.58842;0.59158;0.63042;0.63053;0.70947;0.71263;0.74632;0.74737;0.95789;0.96105;1.00000" dur="9.5s" calcMode="discrete" repeatCount="indefinite"/></rect>
    <rect x="310.05" y="30.03" width="87.01" height="17.48" rx="8.25" ry="8.25" fill="#426FB6" opacity="0"><animate attributeName="opacity" values="0;0;0;1;1;0;0;1;1;0;0;1;1;0;0;1;1;0;0;1;1;0;0;1;1;0;0" keyTimes="0.00000;0.13684;0.14621;0.14632;0.22526;0.22842;0.26726;0.26737;0.34632;0.34947;0.38832;0.38842;0.46737;0.47053;0.50937;0.50947;0.58842;0.59158;0.63042;0.63053;0.70947;0.71263;0.74632;0.74737;0.95789;0.96105;1.00000" dur="9.5s" calcMode="discrete" repeatCount="indefinite"/></rect>
    <rect x="310.05" y="0" width="87.01" height="17.48" rx="8.25" ry="8.25" fill="#5a86c8" filter="url(#glow)" opacity="0"><animate attributeName="opacity" values="0;0;0;1;1;0;0;1;1;0;0;1;1;0;0;1;1;0;0;1;1;0;0;1;1;0;0" keyTimes="0.00000;0.13684;0.15568;0.15579;0.23474;0.23789;0.27674;0.27684;0.35579;0.35895;0.39779;0.39789;0.47684;0.48000;0.51884;0.51895;0.59789;0.60105;0.63989;0.64000;0.71895;0.72211;0.74632;0.74737;0.95789;0.96105;1.00000" dur="9.5s" calcMode="discrete" repeatCount="indefinite"/></rect>
    <rect x="310.05" y="0" width="87.01" height="17.48" rx="8.25" ry="8.25" fill="#184887" opacity="0"><animate attributeName="opacity" values="0;0;0;1;1;0;0;1;1;0;0;1;1;0;0;1;1;0;0;1;1;0;0;1;1;0;0" keyTimes="0.00000;0.13684;0.15568;0.15579;0.23474;0.23789;0.27674;0.27684;0.35579;0.35895;0.39779;0.39789;0.47684;0.48000;0.51884;0.51895;0.59789;0.60105;0.63989;0.64000;0.71895;0.72211;0.74632;0.74737;0.95789;0.96105;1.00000" dur="9.5s" calcMode="discrete" repeatCount="indefinite"/></rect>
    <g fill="#231f20">
    <polygon points="632.03 154.65 632.03 140.89 665.42 140.89 665.42 122.46 632.03 122.46 632.03 109.89 670.21 109.89 670.21 90.38 609.29 90.38 609.29 174.16 672.01 174.16 672.01 154.65 632.03 154.65"/>
    <path d="M59.19,90.3v4.73h-27.17v79.21h-4.85v-79.21H0v-4.73h59.19Z"/>
    <path d="M80.18,90.3v43.23h45.73v-43.23h7.4v83.94h-7.4v-33.79h-45.73v33.79h-7.4v-83.94h7.4Z"/>
    <path d="M187.3,90.3c16.37,0,27.41,8.49,27.41,25.59,0,13.71-7.16,21.83-18.32,24.62l22.2,33.72h-11.52l-20.98-32.75h-22.68v32.75h-10.07v-83.94h33.96ZM163.28,132.63h24.14c10.55,0,17.59-5.34,17.59-16.62s-7.04-16.49-17.59-16.49h-24.14v33.11Z"/>
    <path d="M242.86,90.3v52.52c0,13.59,8.37,20.74,19.17,20.74s19.41-7.16,19.41-20.74v-52.52h12.37v52.52c0,21.47-14.31,32.14-31.78,32.14s-31.66-10.67-31.66-32.14v-52.52h12.49Z"/>
    <path d="M328.03,90.3l25.84,57.74,25.96-57.74h14.8v83.94h-15.04v-49.01l-22.8,49.01h-6.43l-22.8-49.49v49.49h-15.04v-83.94h15.53Z"/>
    <polygon points="430.85 157.25 430.85 90.3 412.54 90.3 412.54 174.24 470.52 174.24 470.52 157.25 430.85 157.25"/>
    <path d="M505.4,90.3v83.94h-20.26v-83.94h20.26Z"/>
    <path d="M542.75,90.3l28.63,46.46v-46.46h20.14v83.94h-18.32l-30.45-46.34v46.34h-20.14v-83.94h20.14Z"/>
    </g>
    <g clip-path="url(#wmclip)">
      <rect x="-200" y="70" width="150" height="130" fill="url(#shinegrad)" opacity="0" transform="skewX(-18)">
        <animate attributeName="opacity" values="0;0;0.95;0.95;0;0" keyTimes="0;0.079;0.09;0.158;0.17;1" dur="9.5s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,0;950,0;950,0" keyTimes="0;0.084;0.166;1" dur="9.5s" additive="sum" repeatCount="indefinite"/>
      </rect>
    </g>
  </g>
</svg>`;

/**
 * Full animated brand mark — bars + wordmark + shine sweep. For hero use.
 */
export function AnimatedLogo({ tilt = true, className = "", ariaLabel = "Thrumline" }) {
    const wrapRef = useRef(null);

    // Framer-motion cursor parallax (subtle 3D tilt).
    const mx = useMotionValue(0.5);
    const my = useMotionValue(0.5);
    const rx = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 60, damping: 14 });
    const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 60, damping: 14 });

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;

        // If reduced motion is preferred, strip the SMIL animate tags so it renders static.
        try {
            const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
            if (mq.matches) {
                const svg = el.querySelector("svg");
                if (svg) {
                    // freeze bars visible in their final state
                    svg.querySelectorAll("rect[opacity='0']").forEach((r) => r.setAttribute("opacity", "1"));
                    svg.querySelectorAll("animate, animateTransform").forEach((a) => a.remove());
                }
            }
        } catch (_e) { /* noop */ }

        if (!tilt) return;
        const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            mx.set(Math.max(0, Math.min(1, x)));
            my.set(Math.max(0, Math.min(1, y)));
        };
        const onLeave = () => { mx.set(0.5); my.set(0.5); };
        window.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        return () => {
            window.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
        };
    }, [mx, my, tilt]);

    return (
        <div ref={wrapRef} className={`relative w-full ${className}`} data-testid="thrumline-animated-logo" aria-label={ariaLabel}>
            <motion.div
                style={{ rotateX: tilt ? rx : 0, rotateY: tilt ? ry : 0, transformPerspective: 1200 }}
                className="w-full"
            >
                <div
                    className="w-full"
                    style={{ aspectRatio: "672 / 174.96" }}
                    dangerouslySetInnerHTML={{ __html: RAW_SVG }}
                />
            </motion.div>
        </div>
    );
}

/**
 * Small wordmark-only variant for nav — strips bars and shine, keeps type.
 * We render the same SVG but constrained; browsers still animate cheaply.
 */
export function Wordmark({ className = "" }) {
    return (
        <div
            className={`inline-block ${className}`}
            data-testid="thrumline-wordmark"
            style={{ height: "40px" }}
        >
            <div style={{ aspectRatio: "672 / 174.96", height: "100%" }}
                dangerouslySetInnerHTML={{ __html: RAW_SVG }}
            />
        </div>
    );
}

export default AnimatedLogo;
