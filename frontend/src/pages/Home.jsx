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
        title: "Thrumline | Marketing Execution and Momentum",
        description: "Marketing execution and momentum for businesses that are done being oversold. Websites, campaigns, and the steady upkeep that keeps it working.",
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
function LedeBlock({ lead, rest, dark = false }) {
    return (
        <>
            <Reveal>
                <p
                    className={`font-serif font-medium leading-[1.18] tracking-[-0.01em] ${
                        dark
                            ? "text-[clamp(1.8rem,3.6vw,3rem)]"
                            : "text-[clamp(1.6rem,3.2vw,2.75rem)] text-tl-ink"
                    }`}
                >
                    {lead}
                </p>
            </Reveal>
            <Reveal delay={0.1}>
                <p
                    className={`mt-6 md:mt-8 font-sans text-[16px] md:text-[18px] leading-[1.65] max-w-2xl ${
                        dark ? "text-tl-bg/85" : "text-tl-ink2"
                    }`}
                >
                    {rest}
                </p>
            </Reveal>
        </>
    );
}

function PainNamed() {
    return (
        <section className="py-28 md:py-40 border-t border-tl-ink/10" data-testid="section-pain-named">
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                <div className="max-w-3xl">
                    <LedeBlock
                        lead={<>You&rsquo;ve hired agencies before.</>}
                        rest={
                            <>
                                They promised the world, showed you dashboards that told you nothing, and billed you for hours
                                you couldn&rsquo;t verify. Somewhere in there, the actual work got handed to someone junior.
                                You&rsquo;re not looking for more of that. You&rsquo;re looking for someone who does the work,
                                proves it, and tells you the truth.
                            </>
                        }
                    />
                </div>
            </div>
        </section>
    );
}

function WhyNow() {
    return (
        <section className="py-28 md:py-40 border-t border-tl-ink/10" data-testid="section-why-now">
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                <div className="max-w-3xl">
                    <LedeBlock
                        lead={<>The market is louder than it has ever been.</>}
                        rest={
                            <>
                                AI made noise free and infinite, and every business is shouting for the same attention. The
                                answer was never to shout back. It&rsquo;s to find the one true thing worth saying and send it
                                clean, so it rises above the noise instead of joining it.
                            </>
                        }
                    />
                </div>
            </div>
        </section>
    );
}

function WhatWeDoBrief() {
    return (
        <section className="py-28 md:py-40 bg-tl-bg2 border-y border-tl-ink/10" data-testid="section-what-we-do-brief">
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                <div className="max-w-3xl">
                    <LedeBlock
                        lead={<>We build fast, findable websites and the campaigns that carry them.</>}
                        rest={
                            <>
                                We keep the whole system running, measured, and moving forward, month after month. Senior hands
                                on the work, not juniors.
                            </>
                        }
                    />
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
                <div className="max-w-3xl">
                    <LedeBlock
                        dark
                        lead={<>Your monthly bill will reflect exactly the work we did.</>}
                        rest={
                            <>
                                No padded retainers. No unverifiable hours. A clear, provable account of what you paid for and
                                what you got, every month.
                            </>
                        }
                    />
                </div>
            </div>
        </section>
    );
}

function HowItWorksBrief() {
    return (
        <section className="py-28 md:py-40 border-t border-tl-ink/10" data-testid="section-how-we-work-brief">
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                <div className="max-w-3xl">
                    <LedeBlock
                        lead={<>It starts by understanding your business, because no one should build your marketing without that.</>}
                        rest={
                            <>
                                We find what&rsquo;s true, figure out exactly what you need, and if you don&rsquo;t need us,
                                we&rsquo;ll tell you.
                            </>
                        }
                    />
                    <Reveal delay={0.15}>
                        <div className="mt-10">
                            <Link to="/how-we-work" className="tl-arrow-link" data-testid="home-how-we-work-link">
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
                <div className="max-w-3xl">
                    <LedeBlock
                        lead={
                            <>
                                If any of this sounds like what you&rsquo;ve been missing, the next step is simple: a short
                                conversation to see if we&rsquo;re the right fit.
                            </>
                        }
                        rest={<>No pitch, no pressure. Just a chance to find out.</>}
                    />
                    <Reveal delay={0.2}>
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
