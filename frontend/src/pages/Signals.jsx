import { Link } from "react-router-dom";
import { KineticText } from "@/components/motion/KineticText";
import { Reveal, StaggerParent, StaggerItem } from "@/components/motion/Reveal";
import { useSeo } from "@/lib/seo";
import { SITE } from "@/content/site";
import { SIGNALS, signalsFaqSchema } from "@/content/signals";

export default function Signals() {
    useSeo({
        title: "Signals — Thrumline",
        description: "Short, true answers to real questions about marketing and the agencies you hire. Built to be scanned by a person and cited by an AI.",
        path: "/signals",
        jsonLd: signalsFaqSchema(SIGNALS),
    });

    return (
        <main data-testid="page-signals">
            {/* Header */}
            <section className="pt-16 md:pt-24 pb-14 md:pb-16">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                    <Reveal>
                        <p className="tl-eyebrow">The archive</p>
                    </Reveal>
                    <KineticText
                        as="h1"
                        className="mt-6 font-serif text-[clamp(2.8rem,8vw,7rem)] leading-[0.98] tracking-[-0.03em] text-tl-ink font-medium"
                        lines={["Signals."]}
                    />
                    <Reveal delay={0.4}>
                        <p className="mt-8 max-w-2xl text-[18px] md:text-[20px] leading-relaxed text-tl-ink2">
                            Straight answers to the questions business owners actually ask about marketing and the agencies they hire.
                            One question. One or two sentences. If that is not enough to answer it, we are not doing our job.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Signals stack — each one is question heading + answer body. */}
            <section className="border-t border-tl-ink/10">
                <StaggerParent className="" stagger={0.06}>
                    {SIGNALS.map((s, i) => (
                        <StaggerItem key={s.id}>
                            <article
                                className="border-b border-tl-ink/10 py-14 md:py-20 hover:bg-tl-bg2 transition-colors duration-500"
                                data-testid={`signal-${i}`}
                            >
                                <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                                    <div className="grid grid-cols-12 gap-8 items-start">
                                        <div className="col-span-12 md:col-span-2">
                                            <p className="font-serif text-tl-ink2 text-lg">{String(i + 1).padStart(2, "0")}</p>
                                        </div>
                                        <div className="col-span-12 md:col-span-7">
                                            <h2 className="font-serif text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-[-0.01em] text-tl-ink">
                                                {s.question}
                                            </h2>
                                            <p className="mt-6 text-[17px] md:text-[19px] leading-relaxed text-tl-ink2 max-w-2xl">
                                                {s.answer}
                                            </p>
                                        </div>
                                        <div className="col-span-12 md:col-span-3 md:pl-4 md:border-l md:border-tl-ink/10">
                                            <p className="tl-eyebrow">Field note</p>
                                            <p className="mt-3 text-[13px] leading-relaxed text-tl-ink2">
                                                A short, true answer. Published here and on LinkedIn — same words, same day.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </StaggerItem>
                    ))}
                </StaggerParent>
            </section>

            {/* Standing CTA */}
            <section className="py-24 md:py-36">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                    <Reveal>
                        <p className="tl-eyebrow">If any of this rhymes</p>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <p className="mt-6 font-serif text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.15] tracking-[-0.01em] text-tl-ink max-w-3xl">
                            A short conversation is worth finding out.
                        </p>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className="mt-10">
                            <Link to="/fit" className="tl-btn" data-testid="signals-cta-fit">
                                {SITE.ctaLabel} <span aria-hidden>→</span>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
