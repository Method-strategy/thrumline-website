import { useState } from "react";
import { Link as LinkIcon, Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { QuietCta } from "@/components/brand/QuietCta";
import { SignalMark } from "@/components/brand/SignalMark";
import { useSeo } from "@/lib/seo";
import { SITE } from "@/content/site";
import { SIGNALS, signalsFaqSchema } from "@/content/signals";

/** Copy-link button next to each Signal question. Appears on hover of the
 *  article on desktop, always visible on touch. Copies the deep-anchor URL. */
function CopyAnchorButton({ id, index }) {
    const [copied, setCopied] = useState(false);
    const onClick = async () => {
        const url = `https://thrumline.com/signals#${id}`;
        try {
            await navigator.clipboard.writeText(url);
        } catch {
            // graceful degradation — the anchor <a> still works if clipboard fails
        }
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
    };
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={copied ? "Link copied" : "Copy link to this signal"}
            title={copied ? "Copied" : "Copy link"}
            data-testid={`signal-copy-${index}`}
            className="inline-flex items-center gap-1.5 shrink-0 transition-opacity duration-200 font-overpass text-[11px] tracking-[0.14em] uppercase font-semibold text-tl-ink2 hover:text-tl-navy opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
        >
            {copied ? (
                <>
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copied</span>
                </>
            ) : (
                <>
                    <LinkIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copy link</span>
                </>
            )}
        </button>
    );
}

export default function Signals() {
    useSeo({
        title: "Signals | Thrumline",
        description: "Straight answers to the questions business owners actually ask about marketing and the agencies they hire. One question, one or two sentences.",
        path: "/signals",
        jsonLd: signalsFaqSchema(SIGNALS),
        ogImage: "/og-signals.png",
        breadcrumbs: [
            { name: "Home", item: "/" },
            { name: "Signals", item: "/signals" },
        ],
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
                        id={s.id}
                        className="group border-b border-tl-ink/10 py-14 md:py-20 scroll-mt-24"
                        data-testid={`signal-${i}`}
                    >
                        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                            <div className="max-w-3xl">
                                <Reveal>
                                    <div className="flex items-start justify-between gap-6">
                                        <h2 className="font-serif text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-[-0.01em] text-tl-ink">
                                            <a
                                                href={`#${s.id}`}
                                                className="hover:text-tl-navy transition-colors"
                                                data-testid={`signal-anchor-${i}`}
                                            >
                                                {s.question}
                                            </a>
                                        </h2>
                                        <div className="mt-3 md:mt-4">
                                            <CopyAnchorButton id={s.id} index={i} />
                                        </div>
                                    </div>
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
