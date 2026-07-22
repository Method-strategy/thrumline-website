import { useState } from "react";
import axios from "axios";
import { KineticText } from "@/components/motion/KineticText";
import { Reveal } from "@/components/motion/Reveal";
import { useSeo } from "@/lib/seo";
import { SITE } from "@/content/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Fit() {
    useSeo({
        title: "Fit — Thrumline",
        description: "A mutual fit check. Not a sales call. Short conversation, no pitch, no pressure.",
        path: "/fit",
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
            {/* Header */}
            <section className="pt-16 md:pt-24 pb-12 md:pb-16">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                    <Reveal>
                        <p className="tl-eyebrow">The one conversion</p>
                    </Reveal>
                    <KineticText
                        as="h1"
                        className="mt-6 font-serif text-[clamp(2.8rem,8vw,7rem)] leading-[0.98] tracking-[-0.03em] text-tl-ink font-medium"
                        lines={["Fit."]}
                    />
                    <Reveal delay={0.4}>
                        <p className="mt-8 max-w-2xl text-[18px] md:text-[20px] leading-relaxed text-tl-ink2">
                            A mutual fit check, both ways. Not a sales call.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Frame + What to expect + Form */}
            <section className="border-t border-tl-ink/10 py-16 md:py-24">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                    <div className="grid grid-cols-12 gap-10 md:gap-16">
                        {/* Reassurance column */}
                        <div className="col-span-12 md:col-span-5">
                            <Reveal>
                                <p className="tl-eyebrow">The frame</p>
                            </Reveal>
                            <Reveal delay={0.05}>
                                <p className="mt-4 font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.25] text-tl-ink">
                                    This is not a sales call. It is a fit check, both ways.
                                    You find out how we think and whether we are the people you want doing this work.
                                    We find out whether we are the right ones to help. If we are not, we will point you in a better direction.
                                </p>
                            </Reveal>

                            <div className="tl-rule my-10" />

                            <Reveal>
                                <p className="tl-eyebrow">What to expect</p>
                            </Reveal>
                            <Reveal delay={0.05}>
                                <p className="mt-4 text-[16px] md:text-[17px] leading-relaxed text-tl-ink2">
                                    A short conversation. We ask about your business and what has not been working.
                                    You ask us anything you want. No slides, no pitch, no obligation. If it makes sense to go further,
                                    we will talk about what that looks like. If it does not, you will still leave with a clearer picture
                                    than you came in with.
                                </p>
                            </Reveal>
                        </div>

                        {/* Form column */}
                        <div className="col-span-12 md:col-span-7">
                            <Reveal>
                                <p className="tl-eyebrow">Book the intro call</p>
                            </Reveal>

                            {status === "done" ? (
                                <Reveal>
                                    <div className="mt-6 p-8 md:p-10 bg-tl-navy text-tl-bg rounded-md relative overflow-hidden tl-grain tl-grain-dark" data-testid="fit-success">
                                        <p className="tl-eyebrow tl-eyebrow-inverse">Received</p>
                                        <p className="mt-4 font-serif text-[clamp(1.8rem,3.4vw,2.75rem)] leading-[1.1] tracking-[-0.01em]">
                                            Thank you. We will be in touch shortly to set up a short conversation.
                                        </p>
                                        <p className="mt-6 text-tl-bg/80 text-[15px] leading-relaxed">
                                            No pressure. No pitch. Just a chance to find out.
                                        </p>
                                    </div>
                                </Reveal>
                            ) : (
                                <form onSubmit={submit} className="mt-6" data-testid="fit-form">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                                        <Field label="Your name" testId="fit-name">
                                            <input
                                                required
                                                type="text"
                                                className="tl-field"
                                                value={form.name}
                                                onChange={update("name")}
                                                placeholder="Alex Rivera"
                                                data-testid="fit-input-name"
                                            />
                                        </Field>
                                        <Field label="Business" testId="fit-business">
                                            <input
                                                required
                                                type="text"
                                                className="tl-field"
                                                value={form.business}
                                                onChange={update("business")}
                                                placeholder="Company name"
                                                data-testid="fit-input-business"
                                            />
                                        </Field>
                                    </div>
                                    <Field label="Email" testId="fit-email" className="mt-8">
                                        <input
                                            required
                                            type="email"
                                            className="tl-field"
                                            value={form.email}
                                            onChange={update("email")}
                                            placeholder="you@company.com"
                                            data-testid="fit-input-email"
                                        />
                                    </Field>
                                    <Field label="What prompted the visit" testId="fit-prompt" className="mt-8">
                                        <textarea
                                            required
                                            rows={3}
                                            maxLength={600}
                                            className="tl-field resize-none"
                                            value={form.prompt}
                                            onChange={update("prompt")}
                                            placeholder="One line is enough."
                                            data-testid="fit-input-prompt"
                                        />
                                    </Field>

                                    <div className="mt-10 flex flex-wrap items-center gap-3 justify-between">
                                        <p className="text-[13px] text-tl-ink2 max-w-md">
                                            We reply from{" "}
                                            <a className="tl-signal-link" href={`mailto:${SITE.email}`}>
                                                {SITE.email}
                                            </a>. No lists, no drip campaigns.
                                        </p>
                                        <button
                                            type="submit"
                                            disabled={status === "sending"}
                                            className="tl-btn disabled:opacity-60 disabled:cursor-not-allowed"
                                            data-testid="fit-submit"
                                        >
                                            {status === "sending" ? "Sending…" : "Book the intro call"}
                                            <span aria-hidden>→</span>
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

                            <p className="font-serif italic text-tl-ink2 text-lg">
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
