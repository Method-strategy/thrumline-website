import { useState } from "react";
import axios from "axios";
import { Reveal } from "@/components/motion/Reveal";
import { SignalMark } from "@/components/brand/SignalMark";
import { useSeo } from "@/lib/seo";
import { SITE } from "@/content/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Fit() {
    useSeo({
        title: "Fit | Thrumline",
        description: "Not a sales call. A short conversation to find out whether we are the right people for your marketing, both ways.",
        path: "/fit",
        ogImage: "/og-fit.png",
        breadcrumbs: [
            { name: "Home", item: "/" },
            { name: "Fit", item: "/fit" },
        ],
        // ContactPage type — telegraphs to Google + AI engines that this is
        // the primary contact surface for the Organization.
        additionalSchema: {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": "https://thrumline.com/fit#contactpage",
            url: "https://thrumline.com/fit",
            name: "Fit | Thrumline",
            about: { "@id": "https://thrumline.com/#organization" },
            mainEntity: {
                "@type": "Organization",
                "@id": "https://thrumline.com/#organization",
                contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer support",
                    email: "hello@thrumline.com",
                    availableLanguage: ["English"],
                    areaServed: "US",
                },
            },
        },
    });

    const [form, setForm] = useState({ name: "", business: "", email: "", prompt: "" });
    const [status, setStatus] = useState("idle"); // idle | sending | done | error
    const [errorMsg, setErrorMsg] = useState("");

    const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setStatus("sending");
        setErrorMsg("");
        try {
            const referrer = typeof document !== "undefined" ? document.referrer : "";
            await axios.post(`${API}/fit/submit`, { ...form, referrer });
            setStatus("done");
        } catch (err) {
            const detail = err?.response?.data?.detail || err?.message || "Something went wrong.";
            setErrorMsg(String(detail));
            setStatus("error");
        }
    };

    return (
        <main data-testid="page-fit">
            <section className="pt-16 md:pt-24 pb-12 md:pb-16">
                <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                    <SignalMark className="mb-8" />
                    <h1 className="font-serif text-[clamp(2.6rem,7vw,6rem)] leading-[0.98] tracking-[-0.03em] text-tl-ink font-medium">
                        Fit
                    </h1>
                </div>
            </section>

            {/* The frame + What to expect — approved copy verbatim */}
            <section className="border-t border-tl-ink/10 py-16 md:py-24">
                <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
                    <div className="grid grid-cols-12 gap-10 md:gap-16">
                        <div className="col-span-12 md:col-span-6">
                            <Reveal>
                                <p className="font-serif text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.22] tracking-[-0.01em] text-tl-ink">
                                    This is not a sales call. It is a fit check, both ways. You find out how we think and whether
                                    we are the people you want doing this work. We find out whether we are the right ones to
                                    help. If we are not, we will point you in a better direction.
                                </p>
                            </Reveal>

                            <div className="tl-rule my-10" />

                            <Reveal>
                                <p className="text-[16px] md:text-[17px] leading-relaxed text-tl-ink2 max-w-xl">
                                    A short conversation. We ask about your business and what has not been working. You ask us
                                    anything you want. No slides, no pitch, no obligation. If it makes sense to go further, we
                                    will talk about what that looks like. If it does not, you will still leave with a clearer
                                    picture than you came in with.
                                </p>
                            </Reveal>
                        </div>

                        {/* Form column */}
                        <div className="col-span-12 md:col-span-6">
                            {status === "done" ? (
                                <div
                                    className="p-8 md:p-10 bg-tl-navy text-tl-bg rounded-md relative overflow-hidden tl-grain tl-grain-dark"
                                    data-testid="fit-success"
                                >
                                    <p className="font-serif text-[clamp(1.6rem,2.8vw,2.3rem)] leading-[1.2] tracking-[-0.01em]">
                                        One conversation. No pressure. Worth finding out.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={submit} data-testid="fit-form">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                                        <Field label="Your name" testId="fit-name">
                                            <input
                                                required type="text" className="tl-field"
                                                value={form.name} onChange={update("name")}
                                                data-testid="fit-input-name"
                                            />
                                        </Field>
                                        <Field label="Business" testId="fit-business">
                                            <input
                                                required type="text" className="tl-field"
                                                value={form.business} onChange={update("business")}
                                                data-testid="fit-input-business"
                                            />
                                        </Field>
                                    </div>
                                    <Field label="Email" testId="fit-email" className="mt-8">
                                        <input
                                            required type="email" className="tl-field"
                                            value={form.email} onChange={update("email")}
                                            data-testid="fit-input-email"
                                        />
                                    </Field>
                                    <Field label="What prompted the visit" testId="fit-prompt" className="mt-8">
                                        <textarea
                                            required rows={3} maxLength={600} className="tl-field resize-none"
                                            value={form.prompt} onChange={update("prompt")}
                                            data-testid="fit-input-prompt"
                                        />
                                    </Field>

                                    <div className="mt-10">
                                        <button
                                            type="submit"
                                            disabled={status === "sending"}
                                            className="group inline-flex items-baseline gap-2 font-serif text-[clamp(1.15rem,1.8vw,1.4rem)] tracking-[-0.005em] text-tl-ink border-b border-tl-ink/25 pb-2 hover:border-tl-ink transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                            data-testid="fit-submit"
                                        >
                                            {status === "sending" ? "Sending" : "Book the intro call"}
                                            <span
                                                aria-hidden
                                                className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                                            >
                                                →
                                            </span>
                                        </button>
                                    </div>

                                    {status === "error" && (
                                        <p className="mt-4 text-[14px] text-red-700" data-testid="fit-error">
                                            {errorMsg}
                                        </p>
                                    )}
                                </form>
                            )}

                            <div className="tl-rule my-10" />

                            {/* Reassurance line — approved copy verbatim */}
                            <p className="font-serif text-tl-ink text-[clamp(1.1rem,1.6vw,1.35rem)] leading-snug">
                                One conversation. No pressure. Worth finding out.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function Field({ label, children, className = "", testId }) {
    return (
        <label className={`block ${className}`} data-testid={testId}>
            <span className="tl-field-label">{label}</span>
            {children}
        </label>
    );
}

// Keep SITE referenced to avoid an unused-import lint warning if the CTA
// is later removed. (Kept for future placement.)
void SITE;
