import { Reveal } from "@/components/motion/Reveal";
import { QuietCta } from "@/components/brand/QuietCta";
import { SignalMark } from "@/components/brand/SignalMark";
import { useSeo } from "@/lib/seo";
import { SITE } from "@/content/site";

// Approved copy — verbatim. Structured as {lead, rest} so the page can render
// the first sentence in the display serif (Fraunces) and the remainder in the
// body sans (Manrope), breaking up the all-serif density on this page while
// preserving the approved copy exactly as written.
const PARAGRAPHS = [
    {
        lead: "Most agencies sell you a package before they understand your business.",
        rest: "We do it the other way around. We start by finding what is true about your business, and we let that decide what you actually need.",
    },
    {
        lead: "It begins with a short conversation.",
        rest: "We learn about your business and what has not been working. You learn how we think and whether we are the kind of people you want in your corner. If it is not a fit, we will say so. No pitch, no pressure.",
    },
    {
        lead: "If it makes sense to go further, the real work starts with discovery: a focused effort to find the one true thing about your business that your customers would buy if they understood it.",
        rest: "Discovery is where the signal gets found. It also tells us, honestly, what you need next, whether that is a little or a lot.",
    },
    {
        lead: "Here is the part no one else will say: if discovery shows you do not need us, we will tell you.",
        rest: "We would rather be the people who told you the truth than the people who sold you something you did not need.",
    },
    {
        lead: "From there, we build and run exactly what you need, and nothing you do not.",
        rest: "Some clients need a new site and steady care. Some need the whole system carried forward month after month. Discovery tells us which, and the work follows the truth.",
    },
];

// The fourth paragraph is the honest-promise beat — given the dark treatment
// the original section brief calls for, but only using approved copy.
const DARK_INDEX = 3;

export default function HowItWorks() {
    useSeo({
        title: "How We Work | Thrumline",
        description: "We understand your business before we build anything. We find what is true, figure out what you need, and if you do not need us, we will tell you.",
        path: "/how-we-work",
        ogImage: "/og-how-we-work.png",
        breadcrumbs: [
            { name: "Home", item: "/" },
            { name: "How We Work", item: "/how-we-work" },
        ],
    });

    return (
        <main data-testid="page-how-we-work">
            <section className="pt-16 md:pt-24 pb-12 md:pb-16">
                <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                    <SignalMark className="mb-8" />
                    <h1 className="font-serif text-[clamp(2.6rem,7vw,6rem)] leading-[0.98] tracking-[-0.03em] text-tl-ink font-medium">
                        How we work
                    </h1>
                </div>
            </section>

            {PARAGRAPHS.map((p, i) => {
                const dark = i === DARK_INDEX;
                return (
                    <section
                        key={i}
                        data-testid={`hiw-paragraph-${i}`}
                        data-tl-theme={dark ? "dark" : undefined}
                        className={
                            dark
                                ? "relative py-24 md:py-36 bg-tl-navy text-tl-bg overflow-hidden tl-grain tl-grain-dark border-y border-tl-ink/10"
                                : "py-20 md:py-28 border-t border-tl-ink/10"
                        }
                    >
                        {dark && (
                            <div aria-hidden className="absolute inset-0 pointer-events-none opacity-60">
                                <div
                                    className="absolute right-[-10%] top-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px]"
                                    style={{ background: "radial-gradient(closest-side, #41ADE2 0%, transparent 70%)" }}
                                />
                            </div>
                        )}
                        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 relative z-10">
                            <div className="max-w-3xl">
                                <Reveal>
                                    <p
                                        className={`font-serif leading-[1.18] tracking-[-0.01em] font-medium ${
                                            dark
                                                ? "text-[clamp(1.8rem,3.6vw,3rem)]"
                                                : "text-[clamp(1.4rem,2.6vw,2.25rem)] text-tl-ink"
                                        }`}
                                    >
                                        {p.lead}
                                    </p>
                                </Reveal>
                                <Reveal delay={0.1}>
                                    <p
                                        className={`mt-6 md:mt-8 font-sans text-[16px] md:text-[18px] leading-[1.65] max-w-2xl ${
                                            dark ? "text-tl-bg/85" : "text-tl-ink2"
                                        }`}
                                    >
                                        {p.rest}
                                    </p>
                                </Reveal>
                            </div>
                        </div>
                    </section>
                );
            })}

            {/* Close — same editorial split */}
            <section className="py-28 md:py-40 border-t border-tl-ink/10">
                <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                    <div className="max-w-3xl">
                        <Reveal>
                            <p className="font-serif text-[clamp(1.8rem,3.4vw,2.75rem)] leading-[1.18] tracking-[-0.01em] text-tl-ink font-medium">
                                It all starts with one short conversation.
                            </p>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="mt-6 md:mt-8 font-sans text-[16px] md:text-[18px] leading-[1.65] text-tl-ink2 max-w-2xl">
                                If you are curious whether we are the right fit, that is exactly what the call is for.
                            </p>
                        </Reveal>
                        <Reveal delay={0.2}>
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
