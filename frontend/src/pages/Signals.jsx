import { Reveal } from "@/components/motion/Reveal";
import { QuietCta } from "@/components/brand/QuietCta";
import { SignalMark } from "@/components/brand/SignalMark";
import { useSeo } from "@/lib/seo";
import { SITE } from "@/content/site";
import { SIGNALS, signalsFaqSchema } from "@/content/signals";

export default function Signals() {
    useSeo({
        title: "Signals · Thrumline",
        description: "Short, true answers to real questions. Built to be scanned by a person and cited by an AI.",
        path: "/signals",
        jsonLd: signalsFaqSchema(SIGNALS),
    });

    return (
        <main data-testid="page-signals">
            {/* Header — approved copy verbatim */}
            <section className="pt-16 md:pt-24 pb-12 md:pb-16">
                <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                    <SignalMark className="mb-8" />
                    <h1 className="font-serif text-[clamp(2.6rem,7vw,6rem)] leading-[0.98] tracking-[-0.03em] text-tl-ink font-medium">
                        Signals
                    </h1>
                    <Reveal delay={0.15}>
                        <p className="mt-10 max-w-3xl text-[18px] md:text-[20px] leading-relaxed text-tl-ink2">
                            Straight answers to the questions business owners actually ask about marketing and the agencies
                            they hire. One question. One or two sentences. If that is not enough to answer it, we are not
                            doing our job.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Signals — question as heading, answer immediately below. Nothing else. */}
            <section className="border-t border-tl-ink/10">
                {SIGNALS.map((s, i) => (
                    <article
                        key={s.id}
                        className="border-b border-tl-ink/10 py-14 md:py-20"
                        data-testid={`signal-${i}`}
                    >
                        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                            <div className="max-w-3xl">
                                <Reveal>
                                    <h2 className="font-serif text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-[-0.01em] text-tl-ink">
                                        {s.question}
                                    </h2>
                                </Reveal>
                                <Reveal delay={0.1}>
                                    <p className="mt-6 text-[17px] md:text-[19px] leading-relaxed text-tl-ink2">
                                        {s.answer}
                                    </p>
                                </Reveal>
                            </div>
                        </div>
                    </article>
                ))}
            </section>

            {/* Standing call to action */}
            <section className="py-24 md:py-36">
                <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                    <Reveal>
                        <QuietCta to="/fit" testId="signals-cta-fit">
                            {SITE.ctaLabel}
                        </QuietCta>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
