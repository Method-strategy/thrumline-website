import { Link } from "react-router-dom";
import { SignalMark } from "@/components/brand/SignalMark";
import { useSeo } from "@/lib/seo";

// No approved copy was provided for the 404 page. Stripped to minimal
// functional text pending client-approved copy.

export default function NotFound() {
    useSeo({
        title: "Not found · Thrumline",
        description: "Page not found.",
        path: "/404",
    });

    return (
        <main data-testid="page-404" className="min-h-[60vh] flex items-center">
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 py-24">
                <SignalMark className="mb-8" />
                <h1 className="font-serif text-[clamp(2.6rem,7vw,6rem)] leading-[0.98] tracking-[-0.03em] text-tl-ink font-medium">
                    Not found.
                </h1>
                <div className="mt-10">
                    <Link
                        to="/"
                        className="group inline-flex items-baseline gap-2 font-serif text-[clamp(1.15rem,1.8vw,1.4rem)] tracking-[-0.005em] text-tl-ink border-b border-tl-ink/25 pb-2 hover:border-tl-ink transition-colors duration-500"
                        data-testid="404-cta-home"
                    >
                        Back to home
                        <span
                            aria-hidden
                            className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                        >
                            →
                        </span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
