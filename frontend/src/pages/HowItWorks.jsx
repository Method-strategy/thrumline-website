import { Reveal } from "@/components/motion/Reveal";
import { QuietCta } from "@/components/brand/QuietCta";
import { SignalMark } from "@/components/brand/SignalMark";
import { useSeo } from "@/lib/seo";
import { SITE } from "@/content/site";

// Approved copy — Site Architecture doc, "How It Works" section.
// Only the visible paragraphs are rendered. All structure labels (e.g.
// "Step one: the intro call", "The honest promise", the trailing "Note")
// were builder guidance, not visitor copy, and are intentionally omitted.
const PARAGRAPHS = [
    "Most agencies sell you a package before they understand your business. We do it the other way around. We start by finding what is true about your business, and we let that decide what you actually need.",
    "It begins with a short conversation. We learn about your business and what has not been working. You learn how we think and whether we are the kind of people you want in your corner. If it is not a fit, we will say so. No pitch, no pressure.",
    "If it makes sense to go further, the real work starts with discovery: a focused effort to find the one true thing about your business that your customers would buy if they understood it. Discovery is where the signal gets found. It also tells us, honestly, what you need next, whether that is a little or a lot.",
    "Here is the part no one else will say: if discovery shows you do not need us, we will tell you. We would rather be the people who told you the truth than the people who sold you something you did not need.",
    "From there, we build and run exactly what you need, and nothing you do not. Some clients need a new site and steady care. Some need the whole system carried forward month after month. Discovery tells us which, and the work follows the truth.",
];

// The fourth paragraph is the honest-promise beat — given the dark treatment
// the original section brief calls for, but only using approved copy.
const DARK_INDEX = 3;

export default function HowItWorks() {
    useSeo({
        title: "How We Work · Thrumline",
        description: "We diagnose before we prescribe. Discovery is the router. The intro call is the door.",
        path: "/how-it-works",
    });

    return (
        <main data-testid="page-how-it-works">
            <section className="pt-16 md:pt-24 pb-12 md:pb-16">
                <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                    <SignalMark className="mb-8" />
                    <h1 className="font-serif text-[clamp(2.6rem,7vw,6rem)] leading-[0.98] tracking-[-0.03em] text-tl-ink font-medium">
                        How We Work
                    </h1>
                </div>
            </section>

            {PARAGRAPHS.map((text, i) => (
                <section
                    key={i}
                    data-testid={`hiw-paragraph-${i}`}
                    data-tl-theme={i === DARK_INDEX ? "dark" : undefined}
                    className={
                        i === DARK_INDEX
                            ? "relative py-24 md:py-36 bg-tl-navy text-tl-bg overflow-hidden tl-grain tl-grain-dark border-y border-tl-ink/10"
                            : "py-20 md:py-28 border-t border-tl-ink/10"
                    }
                >
                    {i === DARK_INDEX && (
                        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-60">
                            <div
                                className="absolute right-[-10%] top-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px]"
                                style={{ background: "radial-gradient(closest-side, #41ADE2 0%, transparent 70%)" }}
                            />
                        </div>
                    )}
                    <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 relative z-10">
                        <div className="max-w-4xl">
                            <Reveal>
                                <p
                                    className={`font-serif leading-[1.18] tracking-[-0.01em] ${
                                        i === DARK_INDEX
                                            ? "text-[clamp(1.8rem,3.6vw,3rem)]"
                                            : "text-[clamp(1.4rem,2.6vw,2.25rem)] text-tl-ink"
                                    }`}
                                >
                                    {text}
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </section>
            ))}

            {/* Close — approved copy verbatim */}
            <section className="py-28 md:py-40 border-t border-tl-ink/10">
                <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                    <div className="max-w-3xl">
                        <Reveal>
                            <p className="font-serif text-[clamp(1.8rem,3.4vw,2.75rem)] leading-[1.18] tracking-[-0.01em] text-tl-ink">
                                It all starts with one short conversation. If you are curious whether we are the right fit,
                                that is exactly what the call is for.
                            </p>
                        </Reveal>
                        <Reveal delay={0.15}>
                            <div className="mt-12">
                                <QuietCta to="/fit" testId="hiw-cta-fit">
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
