import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedLogo } from "@/components/brand/AnimatedLogo";
import { KineticText, KineticWords } from "@/components/motion/KineticText";
import { Reveal, StaggerParent, StaggerItem } from "@/components/motion/Reveal";
import { Marquee } from "@/components/brand/Marquee";
import { useSeo } from "@/lib/seo";
import { SITE } from "@/content/site";

export default function Home() {
    useSeo({
        title: "Thrumline — Marketing execution and momentum",
        description: "A truer signal in a noisy market. Marketing execution and momentum for growing businesses done being oversold.",
        path: "/",
    });

    return (
        <main data-testid="page-home">
            <Hero />
            <PainNamed />
            <Marquee text={SITE.tagline} />
            <WhyNow />
            <WhatWeDoBrief />
            <ThePromise />
            <HowItWorksBrief />
            <TheClose />
        </main>
    );
}

/* ─────────────────────────────────────────────────────────── HERO ── */
function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const parY = useTransform(scrollYProgress, [0, 1], [0, -60]);
    const parScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
    const parOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

    return (
        <section
            ref={ref}
            className="relative pt-10 md:pt-14 pb-24 md:pb-32 overflow-hidden tl-grain"
            data-testid="home-hero"
        >
            {/* Faint editorial index in the corner */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
                <div className="flex justify-between items-start text-[11px] tracking-[0.3em] uppercase text-tl-ink2 font-semibold">
                    <motion.span
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05, duration: 0.7 }}
                    >
                        Est. 2026 · {SITE.legalName}
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.7 }}
                    >
                        Signal / Noise · Vol. 001
                    </motion.span>
                </div>

                {/* Animated mark, generous, centered, with mouse parallax */}
                <motion.div
                    style={{ y: parY, scale: parScale, opacity: parOpacity }}
                    className="mt-16 md:mt-24 relative mx-auto max-w-[1100px]"
                >
                    <AnimatedLogo tilt className="w-full" />
                    {/* Subtle glow beneath */}
                    <div
                        aria-hidden
                        className="absolute -inset-x-10 -bottom-16 h-40 blur-[80px] opacity-40 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(60% 100% at 50% 50%, rgba(65,173,226,0.55), transparent 70%)",
                        }}
                    />
                </motion.div>

                {/* Kinetic headline — the tagline verbatim */}
                <div className="mt-20 md:mt-28 grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-11 lg:col-span-10">
                        <KineticText
                            as="h1"
                            className="font-serif text-[clamp(2.6rem,7vw,6rem)] leading-[1.02] tracking-[-0.02em] text-tl-ink font-medium"
                            lines={[
                                "The sound of your message",
                                <>connecting <em className="italic font-serif text-tl-navy">loud and clear</em>.</>,
                            ]}
                        />
                    </div>
                </div>

                <div className="mt-12 md:mt-16 grid grid-cols-12 gap-6 items-end">
                    <div className="col-span-12 md:col-span-7 lg:col-span-6">
                        <motion.p
                            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            className="text-[17px] md:text-[19px] leading-relaxed text-tl-ink2 max-w-xl"
                        >
                            Marketing execution and momentum for businesses that are done being oversold.
                            We find the true thing about your business and build the connection that carries it.
                        </motion.p>
                    </div>
                    <div className="col-span-12 md:col-span-5 lg:col-span-6 md:flex md:justify-end">
                        <motion.div
                            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Link to="/fit" className="tl-btn" data-testid="hero-cta">
                                {SITE.ctaLabel}
                                <span aria-hidden>→</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll cue */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}
                transition={{ delay: 2, duration: 1 }}
                className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-6 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-tl-ink2 font-semibold"
            >
                <span>Scroll</span>
                <span className="w-px h-8 bg-tl-ink/30" />
            </motion.div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────── PAIN NAMED ── */
function PainNamed() {
    return (
        <section className="py-28 md:py-40 border-t border-tl-ink/10" data-testid="section-pain-named">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                <div className="grid grid-cols-12 gap-8">
                    <Reveal className="col-span-12 md:col-span-3">
                        <p className="tl-eyebrow">01 · The pain, named</p>
                    </Reveal>
                    <div className="col-span-12 md:col-span-9 max-w-4xl">
                        <Reveal>
                            <p className="font-serif text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[1.18] tracking-[-0.01em] text-tl-ink">
                                You have hired agencies before. They promised the world, showed you dashboards that told you nothing,
                                and billed you for hours you could not verify. Somewhere in there, the actual work got handed to
                                someone junior.
                            </p>
                        </Reveal>
                        <Reveal delay={0.15}>
                            <p className="mt-8 font-serif text-[clamp(1.4rem,2.6vw,2.25rem)] leading-[1.2] text-tl-ink2">
                                You are not looking for more of that. You are looking for someone who
                                does&nbsp;the&nbsp;work, proves&nbsp;it, and tells you the truth.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ────────────────────────────────────────────────────────── WHY NOW ── */
function WhyNow() {
    return (
        <section className="relative py-28 md:py-40 border-t border-tl-ink/10" data-testid="section-why-now">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                <div className="grid grid-cols-12 gap-8">
                    <Reveal className="col-span-12 md:col-span-4">
                        <p className="tl-eyebrow">02 · Why now</p>
                        <p className="mt-4 text-tl-ink2 max-w-sm leading-relaxed">
                            The wedge. The market is drowning in AI-generated noise. The answer is not more noise.
                        </p>
                    </Reveal>
                    <div className="col-span-12 md:col-span-8">
                        <Reveal>
                            <h2 className="font-serif text-[clamp(2rem,4.8vw,4rem)] leading-[1.05] tracking-[-0.02em] text-tl-ink">
                                The market is <em className="text-tl-navy">louder</em> than it has ever been.
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="mt-8 text-[17px] md:text-[19px] leading-relaxed text-tl-ink2 max-w-2xl">
                                AI made noise free and infinite, and every business is shouting for the same attention.
                                The answer was never to shout back. It is to find the one true thing worth saying and send it clean —
                                so it rises above the noise instead of joining it.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ──────────────────────────────────────────────── WHAT WE DO (BRIEF) ── */
function WhatWeDoBrief() {
    const bullets = [
        "We build fast, findable websites and the campaigns that carry them.",
        "We keep the whole system running, measured, and moving — month after month.",
        "Experienced senior hands on the work, not juniors.",
        "A monthly bill you can actually read.",
    ];
    return (
        <section className="relative py-28 md:py-40 bg-tl-bg2 border-y border-tl-ink/10" data-testid="section-what-we-do-brief">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                <div className="grid grid-cols-12 gap-8">
                    <Reveal className="col-span-12 md:col-span-4">
                        <p className="tl-eyebrow">03 · What we do, in brief</p>
                    </Reveal>
                    <div className="col-span-12 md:col-span-8">
                        <StaggerParent className="space-y-6">
                            {bullets.map((b, i) => (
                                <StaggerItem key={i}>
                                    <div className="flex items-baseline gap-6 border-b border-tl-ink/10 pb-6">
                                        <span className="font-serif text-tl-ink2 text-xl min-w-[2ch]">{String(i + 1).padStart(2, "0")}</span>
                                        <p className="font-serif text-[clamp(1.3rem,2.4vw,1.9rem)] leading-[1.25] text-tl-ink">
                                            {b}
                                        </p>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerParent>
                        <Reveal delay={0.15}>
                            <div className="mt-10">
                                <Link to="/what-we-do" className="tl-arrow-link" data-testid="home-what-we-do-link">
                                    See what we do <span className="tl-arrow">→</span>
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────── THE PROMISE ── */
function ThePromise() {
    // Dark inverse section — the auditable-bill anchor. The strongest trust moment.
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

    return (
        <section
            ref={ref}
            className="relative py-36 md:py-56 bg-tl-navy text-tl-bg overflow-hidden tl-grain tl-grain-dark"
            data-testid="section-the-promise"
        >
            {/* Signal glow */}
            <motion.div
                aria-hidden
                style={{ y: bgY }}
                className="absolute inset-0 pointer-events-none opacity-60"
            >
                <div className="absolute right-[-10%] top-[10%] w-[60vw] h-[60vw] rounded-full blur-[120px]"
                     style={{ background: "radial-gradient(closest-side, #41ADE2 0%, transparent 70%)" }} />
                <div className="absolute left-[-15%] bottom-[-20%] w-[50vw] h-[50vw] rounded-full blur-[120px]"
                     style={{ background: "radial-gradient(closest-side, #5a86c8 0%, transparent 70%)" }} />
            </motion.div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
                <div className="grid grid-cols-12 gap-8">
                    <Reveal className="col-span-12 md:col-span-3">
                        <p className="tl-eyebrow tl-eyebrow-inverse">04 · The promise</p>
                    </Reveal>
                    <div className="col-span-12 md:col-span-9 max-w-5xl">
                        <Reveal>
                            <h2 className="font-serif text-[clamp(2.4rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.02em]">
                                A monthly bill you can <em className="italic">actually read</em>.
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="mt-10 text-[18px] md:text-[22px] leading-relaxed text-tl-bg/85 max-w-3xl">
                                Your monthly bill will reflect exactly the work we did.
                                No padded retainers. No hours you cannot verify. A clear, provable account of what you paid for
                                and what you got, every month.
                            </p>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
                                {[
                                    ["Measured", "Every dollar accounted for."],
                                    ["Senior hands", "The people who win your trust are the people who do your work."],
                                    ["Auditable", "You will always see exactly what you paid for."],
                                ].map(([h, s], i) => (
                                    <div key={i} className="border-t border-tl-bg/25 pt-5">
                                        <p className="font-serif text-2xl">{h}</p>
                                        <p className="mt-2 text-tl-bg/70 text-[14px] leading-relaxed">{s}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────── HOW IT WORKS (BRIEF) ── */
function HowItWorksBrief() {
    return (
        <section className="py-28 md:py-40 border-t border-tl-ink/10" data-testid="section-how-it-works-brief">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                <div className="grid grid-cols-12 gap-8">
                    <Reveal className="col-span-12 md:col-span-4">
                        <p className="tl-eyebrow">05 · How it works, in brief</p>
                    </Reveal>
                    <div className="col-span-12 md:col-span-8">
                        <Reveal>
                            <h2 className="font-serif text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.15] tracking-[-0.01em] text-tl-ink">
                                It starts by understanding your business, because no one should build your marketing without that.
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="mt-6 text-[17px] md:text-[19px] leading-relaxed text-tl-ink2 max-w-2xl">
                                We find what is true, figure out exactly what you need, and if you do not need us — we will tell you.
                            </p>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div className="mt-10">
                                <Link to="/how-it-works" className="tl-arrow-link" data-testid="home-how-it-works-link">
                                    How it works <span className="tl-arrow">→</span>
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ────────────────────────────────────────────────────────── THE CLOSE ── */
function TheClose() {
    return (
        <section className="py-32 md:py-48 border-t border-tl-ink/10" data-testid="section-the-close">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 md:col-span-10 md:col-start-2">
                        <Reveal>
                            <p className="tl-eyebrow">06 · The close</p>
                        </Reveal>
                        <Reveal delay={0.05}>
                            <h2 className="mt-6 font-serif text-[clamp(2.4rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.02em] text-tl-ink">
                                If any of this sounds like what you have been missing, the next step is <em className="text-tl-navy">simple</em>.
                            </h2>
                        </Reveal>
                        <Reveal delay={0.15}>
                            <p className="mt-10 max-w-2xl text-[17px] md:text-[19px] leading-relaxed text-tl-ink2">
                                A short conversation to see if we are the right fit. No pitch, no pressure. Just a chance to find out.
                            </p>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div className="mt-12">
                                <Link to="/fit" className="tl-btn" data-testid="close-cta-fit">
                                    {SITE.ctaLabel}
                                    <span aria-hidden>→</span>
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
