// Signals — Q&A knowledge archive. Verbatim from the Site Architecture doc.
// Single source of truth for both rendered heading/answer AND the FAQPage JSON-LD.
// question and answer MUST match exactly between visible text and schema.

export const SIGNALS = [
    {
        id: "why-agency-retainers-hard-to-audit",
        question: "Why are agency retainers so hard to audit?",
        answer:
            "Because most agencies bill for effort, not outcomes, so there is nothing concrete to check. If you cannot see what you paid for, it is worth finding out why.",
    },
    {
        id: "why-sit-through-another-dashboard-meeting",
        question: "Why should I sit through one more agency dashboard meeting?",
        answer:
            "If your agency's dashboards are not telling you anything useful, it is worth finding out why.",
    },
];

// FAQPage JSON-LD generator. One block for the whole page — never per-Signal.
// Each Question carries an @id fragment that matches the visible h2 anchor,
// so AI answer engines can deep-link cite a specific answer (e.g.
// https://thrumline.com/signals#why-agency-retainers-hard-to-audit).
export function signalsFaqSchema(signals = SIGNALS) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": "https://thrumline.com/signals#faqpage",
        url: "https://thrumline.com/signals",
        inLanguage: "en-US",
        mainEntity: signals.map((s) => ({
            "@type": "Question",
            "@id": `https://thrumline.com/signals#${s.id}`,
            name: s.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: s.answer,
                inLanguage: "en-US",
            },
        })),
    };
}
