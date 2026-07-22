import { Link } from "react-router-dom";
import { useSeo } from "@/lib/seo";

// No approved copy was provided for the 404 page. Stripped to minimal
// functional text pending client-approved copy.

export default function NotFound() {
    useSeo({
        title: "Not found — Thrumline",
        description: "Page not found.",
        path: "/404",
    });

    return (
        <main data-testid="page-404" className="min-h-[60vh] flex items-center">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
                <h1 className="font-serif text-[clamp(2.6rem,7vw,6rem)] leading-[0.98] tracking-[-0.03em] text-tl-ink font-medium">
                    Not found.
                </h1>
                <div className="mt-10">
                    <Link to="/" className="tl-btn" data-testid="404-cta-home">
                        Back to home <span aria-hidden>→</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
