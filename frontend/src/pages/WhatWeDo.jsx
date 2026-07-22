import { Link } from "react-router-dom";
import { KineticText } from "@/components/motion/KineticText";
import { Reveal, StaggerParent, StaggerItem } from "@/components/motion/Reveal";
import { Marquee } from "@/components/brand/Marquee";
import { useSeo } from "@/lib/seo";
import { SITE } from "@/content/site";

const OFFERINGS = [
    {
        name: "Websites that work",
        what: "We design, build, and deploy fast, findable websites that are built to be seen — by people and by the AI engines that now answer their questions.",
        outcome: "Your site becomes the clear signal at the center of everything, not a brochure that sits still.",
    },
    {
        name: "Ongoing care",
        what: "Sites are not finished; they are tended. We keep yours fast, current, secure, and improving, so it never quietly falls behind.",
        outcome: "The work is steady, visible, and always moving the site forward.",
    },
    {
        name: "Social media management",
        what: "We run your presence where your buyers actually are, with a steady, deliberate cadence instead of noise for its own sake.",
        outcome: "Fewer, truer posts that build recognition over time.",
    },
    {
        name: "Paid advertising management",
        what: "We plan, run, and tune your paid campaigns against real outcomes, not vanity metrics.",
        outcome: "Every dollar is accounted for, and every result is something you can see and check.",
    },
    {
        name: "Enriched media",
        what: "When the message needs more than words, we produce the visuals, motion, and media that carry it — made to the same standard as everything else: clear, purposeful, and never noise.",
        outcome: null,
    },
];

export default function WhatWeDo() {
    useSeo({
        title: "What we do — Thrumline",
        description: "The execution work, framed as outcomes. Senior hands on every account. A bill you can read.",
        path: "/what-we-do",
    });

    return (
        <main data-testid="page-what-we-do">
            {/* Header */}
            <section className="pt-16 md:pt-24 pb-20 md:pb-28">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                    <Reveal>
                        <p className="tl-eyebrow">The work</p>
                    </Reveal>
                    <KineticText
                        as="h1"
                        className="mt-6 font-serif text-[clamp(2.8rem,8vw,7rem)] leading-[0.98] tracking-[-0.03em] text-tl-ink font-medium"
                        lines={["What we do."]}
                    />
                    <Reveal delay={0.4}>
                        <p className="mt-8 max-w-2xl text-[18px] md:text-[20px] leading-relaxed text-tl-ink2">
                            We are the execution arm. We build the things that carry your message and we keep them running.
                            Everything below is done by experienced people, measured honestly, and billed so you can see exactly
                            what you got.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Offerings — editorial numbered list */}
            <section className="border-t border-tl-ink/10">
                {OFFERINGS.map((o, i) => (
                    <Reveal key={o.name} delay={0.05 * i}>
                        <article className="border-b border-tl-ink/10 group relative overflow-hidden">
                            <Link
                                to="/fit"
                                data-testid={`offering-${i}`}
                                className="block relative py-14 md:py-20 transition-colors duration-500 hover:bg-tl-bg2"
                            >
                                <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                                    <div className="grid grid-cols-12 gap-8 items-start">
                                        <div className="col-span-12 md:col-span-2">
                                            <span className="tl-chapter">{String(i + 1).padStart(2, "0")}</span>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.02em] text-tl-ink">
                                                {o.name}
                                            </h2>
                                            <p className="mt-6 text-[17px] leading-relaxed text-tl-ink2 max-w-xl">
                                                {o.what}
                                            </p>
                                        </div>
                                        <div className="col-span-12 md:col-span-4 md:pl-6 md:border-l md:border-tl-ink/10">
                                            {o.outcome && (
                                                <>
                                                    <p className="tl-eyebrow mb-3">Outcome</p>
                                                    <p className="font-serif text-[clamp(1.25rem,1.9vw,1.5rem)] leading-snug text-tl-ink">
                                                        {o.outcome}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* signal accent that slides in on hover */}
                                <span
                                    aria-hidden
                                    className="absolute left-0 top-0 h-full w-[3px] bg-tl-sky origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                />
                            </Link>
                        </article>
                    </Reveal>
                ))}
            </section>

            <Marquee text="Signal over noise" />

            {/* Two differentiators */}
            <section className="py-28 md:py-40 border-t border-tl-ink/10">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                    <Reveal>
                        <p className="tl-eyebrow">Reasons to believe</p>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="mt-6 font-serif text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-tl-ink max-w-3xl">
                            Two things separate us from the agencies that burned you.
                        </h2>
                    </Reveal>
                    <StaggerParent className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                        {[
                            {
                                title: "Senior hands, not junior handoffs",
                                body: "The people who win your trust are the people who do your work. We do not sell you a senior team and hand the work to someone learning on your account.",
                            },
                            {
                                title: "A bill you can read",
                                body: "Every month, your bill reflects exactly the work we did. No padded retainers, no unverifiable hours. You will always be able to see what you paid for.",
                            },
                        ].map((d, i) => (
                            <StaggerItem key={i}>
                                <div className="border-t border-tl-ink pt-6">
                                    <p className="font-serif text-tl-ink2 text-lg">0{i + 1}</p>
                                    <h3 className="mt-3 font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.01em] text-tl-ink">
                                        {d.title}
                                    </h3>
                                    <p className="mt-6 text-[17px] leading-relaxed text-tl-ink2">{d.body}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerParent>
                </div>
            </section>

            {/* Close */}
            <section className="py-28 md:py-40 border-t border-tl-ink/10">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                    <Reveal>
                        <p className="tl-eyebrow">The bridge</p>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <p className="mt-6 font-serif text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.15] tracking-[-0.01em] text-tl-ink max-w-4xl">
                            None of this starts with a pitch. It starts with understanding your business well enough to know what you
                            actually need. That is how it works.
                        </p>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className="mt-12 flex flex-wrap gap-3">
                            <Link to="/how-it-works" className="tl-btn tl-btn-ghost" data-testid="whatwedo-cta-hiw">
                                How it works <span aria-hidden>→</span>
                            </Link>
                            <Link to="/fit" className="tl-btn" data-testid="whatwedo-cta-fit">
                                {SITE.ctaLabel} <span aria-hidden>→</span>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
