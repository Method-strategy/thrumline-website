import { Reveal } from "@/components/motion/Reveal";
import { KineticText } from "@/components/motion/KineticText";
import { useSeo } from "@/lib/seo";

export default function PrivacyPolicy() {
    useSeo({
        title: "Privacy policy — Thrumline",
        description: "How Thrumline handles your data. Plain-spoken, opt-in analytics, no advertising.",
        path: "/privacy-policy",
    });

    return (
        <main data-testid="page-privacy" className="pb-24">
            {/* Header */}
            <section className="pt-16 md:pt-24 pb-12">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                    <Reveal>
                        <p className="tl-eyebrow">The fine print, in plain English</p>
                    </Reveal>
                    <KineticText
                        as="h1"
                        className="mt-6 font-serif text-[clamp(2.6rem,7vw,6rem)] leading-[1] tracking-[-0.03em] text-tl-ink font-medium"
                        lines={["Privacy policy."]}
                    />
                    <Reveal delay={0.4}>
                        <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-tl-ink2">
                            Last updated: {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}. Any change to how we handle
                            your data is reflected here first.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Content */}
            <section className="border-t border-tl-ink/10 pt-16">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                    <div className="grid grid-cols-12 gap-8">
                        <aside className="col-span-12 md:col-span-3">
                            <div className="md:sticky md:top-24">
                                <p className="tl-eyebrow mb-4">Contents</p>
                                <ul className="space-y-2 text-[14px]">
                                    <li><a href="#cookies" className="tl-arrow-link">Cookies &amp; tracking</a></li>
                                    <li><a href="#choice" className="tl-arrow-link">Your choice</a></li>
                                    <li><a href="#storage" className="tl-arrow-link">Where it lives</a></li>
                                    <li><a href="#ga" className="tl-arrow-link">Google Analytics</a></li>
                                    <li><a href="#clarity" className="tl-arrow-link">Microsoft Clarity</a></li>
                                </ul>
                            </div>
                        </aside>

                        <div className="col-span-12 md:col-span-9 max-w-3xl text-[16px] md:text-[17px] leading-[1.75] text-tl-ink">
                            <section id="cookies" className="scroll-mt-24">
                                <p className="tl-eyebrow mb-3">Section 4</p>
                                <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.01em]">
                                    Do we use cookies and other tracking technologies?
                                </h2>
                                <p className="mt-6 italic text-tl-ink2">
                                    In Short: Yes, but only if you say yes. We use Google Analytics to understand aggregate traffic
                                    and Microsoft Clarity to understand how the site is used. Neither runs until you opt in, and you
                                    can change your mind at any time.
                                </p>
                                <p className="mt-6">
                                    We use cookies and similar technologies to gather information when you interact with our site.
                                    One of them is strictly necessary: it remembers your cookie choice so we do not have to ask you twice.
                                    Everything else is optional analytics, and none of it runs until you turn it on. We do not use tracking
                                    for advertising, retargeting, profiling, or any form of ad personalization.
                                </p>
                            </section>

                            <section id="choice" className="mt-14 scroll-mt-24">
                                <p className="tl-eyebrow mb-3">4a</p>
                                <h3 className="font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-snug tracking-[-0.01em]">
                                    Your choice, and how to change it
                                </h3>
                                <p className="mt-4">
                                    The first time you visit, we show a short banner. Nothing analytics-related loads until you decide.
                                    You can accept everything, decline everything, or open Preferences and turn Google Analytics and
                                    Microsoft Clarity on or off independently. No analytics cookies are set, and no analytics scripts
                                    load, until you give consent for that specific provider.
                                </p>
                                <p className="mt-4">
                                    Your choice is stored in your browser&apos;s localStorage under the key{" "}
                                    <code className="text-tl-navy">thrumline_consent_v1</code>. It records only your on or off choice for each
                                    provider and the date you made it. It is not a cookie, it is not sent to any server, and it is not
                                    shared with anyone. We ask again after twelve months so your choice stays current.
                                </p>
                                <p className="mt-4">
                                    You can change or withdraw your consent at any time using the Cookie preferences link in the site
                                    footer. Turning a provider off stops future tracking by that provider and clears its first-party
                                    cookies from this site. One exception: Microsoft sets a cookie called MUID on bing.com, which is a
                                    Microsoft domain we do not control, so that one can only be removed through your browser&apos;s own
                                    cookie settings.
                                </p>
                            </section>

                            <section id="storage" className="mt-14 scroll-mt-24">
                                <p className="tl-eyebrow mb-3">4b</p>
                                <h3 className="font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-snug tracking-[-0.01em]">
                                    Where your choice is stored
                                </h3>
                                <p className="mt-4">
                                    The consent record described above lives in your browser&apos;s localStorage, not in a cookie. Storing
                                    your consent choice this way is permitted as strictly necessary, it adds nothing to your network
                                    requests, and it is never read by any third party. Clearing your browser storage will erase the
                                    record, and we will show the banner again on your next visit.
                                </p>
                            </section>

                            <section id="ga" className="mt-14 scroll-mt-24">
                                <p className="tl-eyebrow mb-3">Google Analytics</p>
                                <h3 className="font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-snug tracking-[-0.01em]">
                                    What we measure, and what we don&apos;t
                                </h3>
                                <p className="mt-4">
                                    We use Google Analytics 4 (measurement ID <code className="text-tl-navy">[G-XXXXXXXXXX]</code>) to
                                    measure aggregate site traffic and understand which pages are read. When you have opted in, Google
                                    Analytics collects a limited set of information about your visit, including your approximate location
                                    (derived from your IP address, which Google truncates), the pages you view, how you arrived on the site,
                                    and your device and browser characteristics. It sets first-party cookies (named{" "}
                                    <code className="text-tl-navy">_ga</code> and{" "}
                                    <code className="text-tl-navy">_ga_[container-id]</code>) to distinguish unique visitors and sessions.
                                </p>
                                <p className="mt-4">
                                    We do not use this data for advertising, remarketing, or ad personalization, and we have not enabled
                                    Google Signals or cross-device tracking. You can opt out at{" "}
                                    <a className="tl-signal-link" href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">tools.google.com/dlpage/gaoptout</a>,
                                    and you can read Google's privacy practices at{" "}
                                    <a className="tl-signal-link" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>.
                                </p>
                            </section>

                            <section id="clarity" className="mt-14 scroll-mt-24">
                                <p className="tl-eyebrow mb-3">Microsoft Clarity</p>
                                <h3 className="font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-snug tracking-[-0.01em]">
                                    Anonymized session replay, heatmaps, no advertising
                                </h3>
                                <p className="mt-4">
                                    We use Microsoft Clarity (project ID <code className="text-tl-navy">[xxxxxxxxxx]</code>) to understand
                                    how visitors interact with the site through anonymized session replay and click and scroll heatmaps.
                                    When you have opted in, Clarity captures a recording of your interactions, such as mouse movements,
                                    clicks, and scrolls, along with your approximate location, device and browser characteristics, and
                                    referrer. It sets first-party cookies (<code className="text-tl-navy">_clck</code>,{" "}
                                    <code className="text-tl-navy">_clsk</code>) and reads Microsoft&apos;s own cookies (such as MUID on bing.com)
                                    to stitch interactions into continuous sessions.
                                </p>
                                <p className="mt-4">
                                    Recordings do not capture keystrokes in input fields by default, and sensitive content is masked.
                                    Microsoft processes this data on our behalf. We do not use Clarity data for advertising, retargeting,
                                    profiling, or ad personalization.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
