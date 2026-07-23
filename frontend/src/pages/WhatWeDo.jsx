import { Link } from "react-router-dom";
import { Reveal, StaggerParent, StaggerItem } from "@/components/motion/Reveal";
import { QuietCta } from "@/components/brand/QuietCta";
import { SignalMark } from "@/components/brand/SignalMark";
import { useSeo } from "@/lib/seo";
import { SITE } from "@/content/site";

// Approved copy — Site Architecture doc, Section "What We Do".
// Each offering is name + one flowing paragraph (what it is + outcome).
const OFFERINGS = [
    {
        name: "Websites that work",
        body:
            "We design, build, and deploy fast, findable websites that are built to be seen, by people and by the AI engines that now answer their questions. Your site becomes the clear signal at the center of everything, not a brochure that sits still.",
    },
    {
        name: "Ongoing care",
        body:
            "Sites are not finished; they are tended. We keep yours fast, current, secure, and improving, so it never quietly falls behind. The work is steady, visible, and always moving the site forward.",
    },
    {
        name: "Social media management",
        body:
            "We run your presence where your buyers actually are, with a steady, deliberate cadence instead of noise for its own sake. Fewer, truer posts that build recognition over time.",
    },
    {
        name: "Paid advertising management",
        body:
            "We plan, run, and tune your paid campaigns against real outcomes, not vanity metrics. Every dollar is accounted for, and every result is something you can see and check.",
    },
    {
        name: "Enriched media",
        body:
            "When the message needs more than words, we produce the visuals, motion, and media that carry it, made to the same standard as everything else: clear, purposeful, and never noise.",
    },
];

const DIFFERENTIATORS = [
    {
        title: "Senior hands, not junior handoffs",
        body:
            "The people who win your trust are the people who do your work. We do not sell you a senior team and hand the work to someone learning on your account.",
    },
    {
        title: "A bill you can read",
        body:
            "Every month, your bill reflects exactly the work we did. No padded retainers, no unverifiable hours. You will always be able to see what you paid for.",
    },
];

export default function WhatWeDo() {
    useSeo({
        title: "What We Do · Thrumline",
        description: "The execution work, framed as outcomes. Senior hands on every account. A bill you can read.",
        path: "/what-we-do",
    });

    return (
        <main data-testid="page-what-we-do">
            {/* Opening frame — approved copy verbatim */}
            <section className="pt-16 md:pt-24 pb-16 md:pb-20">
                <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                    <SignalMark className="mb-8" />
                    <h1 className="font-serif text-[clamp(2.6rem,7vw,6rem)] leading-[0.98] tracking-[-0.03em] text-tl-ink font-medium">
                        What We Do
                    </h1>
                    <Reveal delay={0.15}>
                        <p className="mt-10 max-w-3xl text-[18px] md:text-[20px] leading-relaxed text-tl-ink2">
                            We are the execution arm. We build the things that carry your message and we keep them running.
                            Everything below is done by experienced people, measured honestly, and billed so you can see exactly
                            what you got.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Offerings — approved names and body copy verbatim */}
            <section className="border-t border-tl-ink/10">
                {OFFERINGS.map((o, i) => (
                    <Reveal key={o.name} delay={0.03 * i}>
                        <article className="border-b border-tl-ink/10" data-testid={`offering-${i}`}>
                            <div className="py-14 md:py-20">
                                <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                                    <div className="grid grid-cols-12 gap-8">
                                        <div className="col-span-12 md:col-span-4">
                                            <h2 className="font-serif text-[clamp(1.8rem,3.4vw,2.75rem)] leading-[1.05] tracking-[-0.02em] text-tl-ink">
                                                {o.name}
                                            </h2>
                                        </div>
                                        <div className="col-span-12 md:col-span-8">
                                            <p className="text-[17px] md:text-[19px] leading-relaxed text-tl-ink2 max-w-2xl">
                                                {o.body}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </Reveal>
                ))}
            </section>

            {/* Two differentiators — approved copy verbatim */}
            <section className="py-28 md:py-40 border-t border-tl-ink/10">
                <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                    <StaggerParent className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                        {DIFFERENTIATORS.map((d, i) => (
                            <StaggerItem key={i}>
                                <div>
                                    <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.01em] text-tl-ink">
                                        {d.title}
                                    </h2>
                                    <p className="mt-6 text-[17px] leading-relaxed text-tl-ink2">{d.body}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerParent>
                </div>
            </section>

            {/* Close — approved copy verbatim */}
            <section className="py-28 md:py-40 border-t border-tl-ink/10">
                <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                    <div className="max-w-3xl">
                        <Reveal>
                            <p className="font-serif text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.18] tracking-[-0.01em] text-tl-ink">
                                None of this starts with a pitch. It starts with understanding your business well enough to know
                                what you actually need. That is how it works.
                            </p>
                        </Reveal>
                        <Reveal delay={0.15}>
                            <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-4">
                                <Link to="/how-it-works" className="tl-arrow-link" data-testid="whatwedo-cta-hiw">
                                    How we work <span className="tl-arrow">→</span>
                                </Link>
                                <QuietCta to="/fit" testId="whatwedo-cta-fit">
                                    {SITE.ctaLabel}
                                </QuietCta>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </main>
    );
}
