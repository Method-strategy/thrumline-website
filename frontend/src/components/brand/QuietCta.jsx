import { Link } from "react-router-dom";

/**
 * QuietCta — the fit-check invitation as a calm text link, not a button.
 *
 * Used at the natural close of a section. It is deliberately understated:
 * a serif line with a fine underline and an arrow that slides on hover.
 * No filled background, no pill, no high-contrast pressure.
 */
export function QuietCta({ to, children, testId, className = "" }) {
    return (
        <Link
            to={to}
            data-testid={testId}
            className={`group inline-flex items-baseline gap-2 font-serif text-[clamp(1.15rem,1.8vw,1.4rem)] tracking-[-0.005em] text-tl-ink border-b border-tl-ink/25 pb-2 hover:border-tl-ink transition-colors duration-500 ${className}`}
        >
            {children}
            <span
                aria-hidden
                className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
            >
                →
            </span>
        </Link>
    );
}
