import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedLogo } from "@/components/brand/AnimatedLogo";
import { KineticText } from "@/components/motion/KineticText";
import { Reveal } from "@/components/motion/Reveal";
import { useSeo } from "@/lib/seo";
import { SITE } from "@/content/site";

export default function Home() {
    useSeo({
        title: "Thrumline · Marketing execution and momentum",
        description: "A truer signal in a noisy market. Marketing execution and momentum for growing businesses done being oversold.",
        path: "/",
    });

    return (
        <main data-testid="page-home">
            <Hero />
            <PainNamed />
            <WhyNow />
            <WhatWeDoBrief />
            <ThePromise />
            <HowItWorksBrief />
            <TheClose />
        </main>
    );
}

/* ─── HERO ─────────────────────────────────────────────────────────── */
/**
 * Logo-hero: no top header, the animated mark is the centerpiece. Given real
 * presence but intentionally not oversized. Below the mark: the approved
 * tagline, a short subhead paragraph, and a quiet inline invitation.
 */
function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const parY = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const parOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);

    return (
        <section
            ref={ref}
            className="relative min-h-[92vh] pt-16 md:pt-24 pb-24 md:pb-32 flex flex-col justify-center overflow-hidden"
            data-testid="home-hero"
        >
            {/* Content is left-aligned with generous side padding so the pinned
                right nav has calm empty air, not fighting the copy. */}
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 relative z-10">
                {/* Animated mark — intentional size, not big for its own sake */}
                <motion.div
                    style={{ y: parY, opacity: parOpacity }}
                    className="max-w-[420px] md:max-w-[520px]"
                >
                    <AnimatedLogo tilt className="w-full" />
                </motion.div>

                {/* Tagline (approved, verbatim) — no SignalMark here; the hero
                    logo already carries the pulsing three-bar signal. */}
                <div className="mt-16 md:mt-20 max-w-4xl">
                    <KineticText
                        as="h1"
                        className="font-serif text-[clamp(2.2rem,5.6vw,4.6rem)] leading-[1.05] tracking-[-0.02em] text-tl-ink font-medium"
                        lines={["The sound of your message connecting loud and clear."]}
                    />
                </div>

                {/* Subhead + quiet inline invitation. No button, no pill. */}
                <div className="mt-10 md:mt-14 max-w-2xl">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[17px] md:text-[19px] leading-relaxed text-tl-ink2"
                    >
                        Marketing execution and momentum for businesses that are done being oversold. We find the true thing
                        about your business and build the connection that carries it.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-10"
                    >
                        <QuietCta to="/fit" testId="hero-cta">
                            {SITE.ctaLabel}
                        </QuietCta>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ─── Section blocks ───────────────────────────────────────────────── */
function PainNamed() {
    return (
        <section className="py-28 md:py-40 border-t border-tl-ink/10" data-testid="section-pain-named">
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                <div className="max-w-4xl">
                    <Reveal>
                        <p className="font-serif text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[1.18] tracking-[-0.01em] text-tl-ink">
                            You have hired agencies before. They promised the world, showed you dashboards that told you nothing,
                            and billed you for hours you could not verify. Somewhere in there, the actual work got handed to
                            someone junior. You are not looking for more of that. You are looking for someone who does the work,
                            proves it, and tells you the truth.
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

function WhyNow() {
    return (
        <section className="py-28 md:py-40 border-t border-tl-ink/10" data-testid="section-why-now">
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                <div className="max-w-4xl">
                    <Reveal>
                        <p className="font-serif text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[1.18] tracking-[-0.01em] text-tl-ink">
                            The market is louder than it has ever been. AI made noise free and infinite, and every business is
                            shouting for the same attention. The answer was never to shout back. It is to find the one true
                            thing worth saying and send it clean, so it rises above the noise instead of joining it.
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

function WhatWeDoBrief() {
    return (
        <section className="py-28 md:py-40 bg-tl-bg2 border-y border-tl-ink/10" data-testid="section-what-we-do-brief">
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                <div className="max-w-4xl">
                    <Reveal>
                        <p className="font-serif text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[1.18] tracking-[-0.01em] text-tl-ink">
                            We build fast, findable websites and the campaigns that carry them. We keep the whole system running,
                            measured, and moving forward, month after month. Experienced senior hands on the work, not juniors.
                            And a monthly bill you can actually read.
                        </p>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className="mt-10">
                            <Link to="/what-we-do" className="tl-arrow-link" data-testid="home-what-we-do-link">
                                See what we do <span className="tl-arrow">→</span>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

function ThePromise() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

    return (
        <section
            ref={ref}
            className="relative py-36 md:py-56 bg-tl-navy text-tl-bg overflow-hidden tl-grain tl-grain-dark"
            data-testid="section-the-promise"
            data-tl-theme="dark"
        >
            <motion.div aria-hidden style={{ y: bgY }} className="absolute inset-0 pointer-events-none opacity-60">
                <div className="absolute right-[-10%] top-[10%] w-[60vw] h-[60vw] rounded-full blur-[120px]"
                     style={{ background: "radial-gradient(closest-side, #41ADE2 0%, transparent 70%)" }} />
                <div className="absolute left-[-15%] bottom-[-20%] w-[50vw] h-[50vw] rounded-full blur-[120px]"
                     style={{ background: "radial-gradient(closest-side, #5a86c8 0%, transparent 70%)" }} />
            </motion.div>
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 relative z-10">
                <div className="max-w-4xl">
                    <Reveal>
                        <p className="font-serif text-[clamp(1.8rem,3.4vw,2.9rem)] leading-[1.2] tracking-[-0.01em]">
                            Your monthly bill will reflect exactly the work we did. No padded retainers. No hours you cannot
                            verify. A clear, provable account of what you paid for and what you got, every month.
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

function HowItWorksBrief() {
    return (
        <section className="py-28 md:py-40 border-t border-tl-ink/10" data-testid="section-how-it-works-brief">
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                <div className="max-w-4xl">
                    <Reveal>
                        <p className="font-serif text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[1.18] tracking-[-0.01em] text-tl-ink">
                            It starts by understanding your business, because no one should build your marketing without that.
                            We find what is true, figure out exactly what you need, and if you do not need us, we will tell you.
                        </p>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className="mt-10">
                            <Link to="/how-it-works" className="tl-arrow-link" data-testid="home-how-it-works-link">
                                How we work <span className="tl-arrow">→</span>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

function TheClose() {
    return (
        <section className="py-32 md:py-48 border-t border-tl-ink/10" data-testid="section-the-close">
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                <div className="max-w-4xl">
                    <Reveal>
                        <p className="font-serif text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.18] tracking-[-0.01em] text-tl-ink">
                            If any of this sounds like what you have been missing, the next step is simple: a short conversation
                            to see if we are the right fit. No pitch, no pressure. Just a chance to find out.
                        </p>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className="mt-12">
                            <QuietCta to="/fit" testId="close-cta-fit">
                                {SITE.ctaLabel}
                            </QuietCta>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* ─── Quiet CTA — a text invitation, not a button ──────────────────── */
import { QuietCta as _QuietCta } from "@/components/brand/QuietCta";
function QuietCta(props) { return <_QuietCta {...props} />; }
