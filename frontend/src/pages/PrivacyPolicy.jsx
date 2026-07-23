import { Reveal } from "@/components/motion/Reveal";
import { SignalMark } from "@/components/brand/SignalMark";
import { useSeo } from "@/lib/seo";

// All body copy on this page is APPROVED verbatim from the Thrumline Privacy
// Policy Cookies Section DRAFT. Only the visible section headings and body
// paragraphs are rendered. Structural labels ("In Short", "Google Analytics",
// "Microsoft Clarity"), which the draft used to organize the section for the
// builder, are omitted from the visible page. If the client later confirms
// those should render as visible section labels, add them back verbatim.

export default function PrivacyPolicy() {
    useSeo({
        title: "Privacy Policy | Thrumline",
        description: "How Thrumline handles your information, what we collect, and how to change your cookie choices at any time.",
        path: "/privacy-policy",
        breadcrumbs: [
            { name: "Home", item: "/" },
            { name: "Privacy Policy", item: "/privacy-policy" },
        ],
    });

    return (
        <main data-testid="page-privacy" className="pb-24">
            <section className="pt-16 md:pt-24 pb-12">
                <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                    <SignalMark className="mb-8" />
                    <h1 className="font-serif text-[clamp(2.6rem,7vw,6rem)] leading-[1] tracking-[-0.03em] text-tl-ink font-medium">
                        Privacy Policy
                    </h1>
                </div>
            </section>

            <section className="border-t border-tl-ink/10 pt-16">
                <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                    <div className="max-w-3xl text-[16px] md:text-[17px] leading-[1.75] text-tl-ink">
                        <Reveal>
                            <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.01em]">
                                4. Do we use cookies and other tracking technologies?
                            </h2>
                        </Reveal>
                        <p className="mt-6">
                            Yes, but only if you say yes. We use Google Analytics to understand aggregate traffic and Microsoft
                            Clarity to understand how the site is used. Neither runs until you opt in, and you can change your
                            mind at any time. We use cookies and similar technologies to gather information when you interact
                            with our site. One of them is strictly necessary: it remembers your cookie choice so we do not have
                            to ask you twice. Everything else is optional analytics, and none of it runs until you turn it on.
                            We do not use tracking for advertising, retargeting, profiling, or any form of ad personalization.
                        </p>

                        <div className="mt-14">
                            <Reveal>
                                <h3 className="font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-snug tracking-[-0.01em]">
                                    4a. Your choice, and how to change it
                                </h3>
                            </Reveal>
                            <p className="mt-4">
                                The first time you visit, we show a short banner. Nothing analytics-related loads until you
                                decide. You can accept everything, decline everything, or open Preferences and turn Google
                                Analytics and Microsoft Clarity on or off independently. No analytics cookies are set, and no
                                analytics scripts load, until you give consent for that specific provider. Your choice is stored
                                in your browser&apos;s localStorage under the key thrumline_consent_v1. It records only your on or
                                off choice for each provider and the date you made it. It is not a cookie, it is not sent to any
                                server, and it is not shared with anyone. We ask again after twelve months so your choice stays
                                current. You can change or withdraw your consent at any time using the Cookie preferences link
                                in the site footer. Turning a provider off stops future tracking by that provider and clears its
                                first-party cookies from this site. One exception: Microsoft sets a cookie called MUID on
                                bing.com, which is a Microsoft domain we do not control, so that one can only be removed through
                                your browser&apos;s own cookie settings.
                            </p>
                        </div>

                        <div className="mt-14">
                            <Reveal>
                                <h3 className="font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-snug tracking-[-0.01em]">
                                    4b. Where your choice is stored
                                </h3>
                            </Reveal>
                            <p className="mt-4">
                                The consent record described above lives in your browser&apos;s localStorage, not in a cookie.
                                Storing your consent choice this way is permitted as strictly necessary, it adds nothing to your
                                network requests, and it is never read by any third party. Clearing your browser storage will
                                erase the record, and we will show the banner again on your next visit.
                            </p>
                        </div>

                        <div className="mt-14">
                            <p>
                                We use Google Analytics 4 (measurement ID [G-XXXXXXXXXX]) to measure aggregate site traffic and
                                understand which pages are read. When you have opted in, Google Analytics collects a limited set
                                of information about your visit, including your approximate location (derived from your IP
                                address, which Google truncates), the pages you view, how you arrived on the site, and your
                                device and browser characteristics. It sets first-party cookies (named _ga and _ga_[container-id])
                                to distinguish unique visitors and sessions. We do not use this data for advertising, remarketing,
                                or ad personalization, and we have not enabled Google Signals or cross-device tracking. You can
                                opt out at tools.google.com/dlpage/gaoptout, and you can read Google&apos;s privacy practices at
                                policies.google.com/privacy.
                            </p>
                        </div>

                        <div className="mt-10">
                            <p>
                                We use Microsoft Clarity (project ID [xxxxxxxxxx]) to understand how visitors interact with the
                                site through anonymized session replay and click and scroll heatmaps. When you have opted in,
                                Clarity captures a recording of your interactions, such as mouse movements, clicks, and scrolls,
                                along with your approximate location, device and browser characteristics, and referrer. It sets
                                first-party cookies (_clck, _clsk) and reads Microsoft&apos;s own cookies (such as MUID on bing.com)
                                to stitch interactions into continuous sessions. Recordings do not capture keystrokes in input
                                fields by default, and sensitive content is masked. Microsoft processes this data on our behalf.
                                We do not use Clarity data for advertising, retargeting, profiling, or ad personalization. You
                                can read Microsoft&apos;s privacy practices in the Microsoft Privacy Statement and the Clarity
                                privacy FAQ.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
