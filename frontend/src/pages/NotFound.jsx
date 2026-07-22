import { Link } from "react-router-dom";
import { KineticText } from "@/components/motion/KineticText";
import { Reveal } from "@/components/motion/Reveal";
import { useSeo } from "@/lib/seo";
import { SITE } from "@/content/site";

export default function NotFound() {
    useSeo({
        title: "Not found — Thrumline",
        description: "Nothing here. Signal, not noise. Head back to the start.",
        path: "/404",
    });

    return (
        <main data-testid="page-404" className="min-h-[70vh] flex items-center">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
                <Reveal>
                    <p className="tl-eyebrow">404 · Off the trail</p>
                </Reveal>
                <KineticText
                    as="h1"
                    className="mt-6 font-serif text-[clamp(3rem,10vw,9rem)] leading-[0.95] tracking-[-0.03em] text-tl-ink font-medium"
                    lines={["Nothing here.", "That's alright."]}
                />
                <Reveal delay={0.4}>
                    <p className="mt-8 max-w-xl text-[17px] md:text-[19px] leading-relaxed text-tl-ink2">
                        The page you followed does not exist — or has not been built yet. The ranger&apos;s not offended.
                        Head back to the start; the trail is clearer from there.
                    </p>
                </Reveal>
                <Reveal delay={0.55}>
                    <div className="mt-12 flex gap-3 flex-wrap">
                        <Link to="/" className="tl-btn" data-testid="404-cta-home">
                            Back to home <span aria-hidden>→</span>
                        </Link>
                        <Link to="/fit" className="tl-btn tl-btn-ghost" data-testid="404-cta-fit">
                            {SITE.ctaLabel}
                        </Link>
                    </div>
                </Reveal>
            </div>
        </main>
    );
}
