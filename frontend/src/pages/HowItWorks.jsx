import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { KineticText } from "@/components/motion/KineticText";
import { Reveal } from "@/components/motion/Reveal";
import { useSeo } from "@/lib/seo";
import { SITE } from "@/content/site";

const CHAPTERS = [
    {
        n: "01",
        eyebrow: "The posture",
        title: "We diagnose before we prescribe.",
        body:
            "Most agencies sell you a package before they understand your business. We do it the other way around. We start by finding what is true about your business, and we let that decide what you actually need.",
    },
    {
        n: "02",
        eyebrow: "Step one",
        title: "The intro call.",
        body:
            "It begins with a short conversation. We learn about your business and what has not been working. You learn how we think and whether we are the kind of people you want in your corner. If it is not a fit, we will say so. No pitch, no pressure.",
    },
    {
        n: "03",
        eyebrow: "Step two",
        title: "Discovery.",
        body:
            "If it makes sense to go further, the real work starts with discovery: a focused effort to find the one true thing about your business that your customers would buy if they understood it. Discovery is where the signal gets found. It also tells us, honestly, what you need next — whether that is a little or a lot.",
        aside: "Discovery is introduced on the intro call, once there is trust and it can be framed properly. The site's job is to earn the call.",
    },
    {
        n: "04",
        eyebrow: "The honest promise",
        title: "If you do not need us, we will tell you.",
        body:
            "Here is the part no one else will say: if discovery shows you do not need us, we will tell you. We would rather be the people who told you the truth than the people who sold you something you did not need.",
        emphasis: true,
    },
    {
        n: "05",
        eyebrow: "Then the work moves",
        title: "The scope fits the need, not the sales target.",
        body:
            "From there, we build and run exactly what you need, and nothing you do not. Some clients need a new site and steady care. Some need the whole system carried forward month after month. Discovery tells us which, and the work follows the truth.",
    },
];

export default function HowItWorks() {
    useSeo({
        title: "How it works — Thrumline",
        description: "We diagnose before we prescribe. Discovery is the router. The intro call is the door.",
        path: "/how-it-works",
    });

    return (
        <main data-testid="page-how-it-works">
            {/* Header */}
            <section className="pt-16 md:pt-24 pb-16 md:pb-20">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                    <Reveal>
                        <p className="tl-eyebrow">The method</p>
                    </Reveal>
                    <KineticText
                        as="h1"
                        className="mt-6 font-serif text-[clamp(2.8rem,8vw,7rem)] leading-[0.98] tracking-[-0.03em] text-tl-ink font-medium"
                        lines={["How it works."]}
                    />
                    <Reveal delay={0.4}>
                        <p className="mt-8 max-w-2xl text-[18px] md:text-[20px] leading-relaxed text-tl-ink2">
                            We diagnose before we prescribe. Discovery is the router. The intro call is the door.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Manifesto chapters */}
            <section>
                {CHAPTERS.map((c, i) => (
                    <Chapter key={c.n} data={c} last={i === CHAPTERS.length - 1} />
                ))}
            </section>

            {/* Close */}
            <section className="py-28 md:py-40 border-t border-tl-ink/10">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                    <Reveal>
                        <p className="tl-eyebrow">One short conversation</p>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="mt-6 font-serif text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-tl-ink max-w-4xl">
                            It all starts with one short conversation. If you are curious whether we are the right fit,
                            <em className="italic text-tl-navy"> that is exactly what the call is for</em>.
                        </h2>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className="mt-12">
                            <Link to="/fit" className="tl-btn" data-testid="hiw-cta-fit">
                                {SITE.ctaLabel} <span aria-hidden>→</span>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}

function Chapter({ data, last }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

    return (
        <article
            ref={ref}
            className={`relative py-24 md:py-40 border-t border-tl-ink/10 ${data.emphasis ? "bg-tl-navy text-tl-bg tl-grain tl-grain-dark overflow-hidden" : ""}`}
            data-testid={`chapter-${data.n}`}
        >
            {data.emphasis && (
                <div aria-hidden className="absolute inset-0 pointer-events-none opacity-60">
                    <div
                        className="absolute right-[-10%] top-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px]"
                        style={{ background: "radial-gradient(closest-side, #41ADE2 0%, transparent 70%)" }}
                    />
                </div>
            )}
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 md:col-span-4">
                        <motion.div style={{ y }}>
                            <p className={data.emphasis ? "tl-eyebrow tl-eyebrow-inverse" : "tl-eyebrow"}>
                                {data.eyebrow}
                            </p>
                            <p className={`tl-chapter mt-4 ${data.emphasis ? "text-tl-bg" : ""}`}>{data.n}</p>
                        </motion.div>
                    </div>
                    <div className="col-span-12 md:col-span-8 max-w-3xl">
                        <Reveal>
                            <h2 className={`font-serif text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.05] tracking-[-0.02em] ${data.emphasis ? "" : "text-tl-ink"}`}>
                                {data.title}
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className={`mt-8 text-[17px] md:text-[19px] leading-relaxed ${data.emphasis ? "text-tl-bg/85" : "text-tl-ink2"}`}>
                                {data.body}
                            </p>
                        </Reveal>
                        {data.aside && (
                            <Reveal delay={0.2}>
                                <p className="mt-8 border-l-2 border-tl-sky pl-6 py-2 text-[14px] leading-relaxed italic text-tl-ink2">
                                    Note. {data.aside}
                                </p>
                            </Reveal>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
