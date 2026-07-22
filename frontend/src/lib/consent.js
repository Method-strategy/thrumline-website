// localStorage-backed consent record.
// Key: thrumline_consent_v1  Shape: { v, ga, clarity, ts, origin }

const KEY = "thrumline_consent_v1";
const VERSION = 1;

export function readConsent() {
    if (typeof window === "undefined") return null;
    try {
        const raw = window.localStorage.getItem(KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed && parsed.v === VERSION) return parsed;
        return null;
    } catch {
        return null;
    }
}

export function writeConsent({ ga, clarity }) {
    if (typeof window === "undefined") return;
    const record = {
        v: VERSION,
        ga: !!ga,
        clarity: !!clarity,
        ts: Math.floor(Date.now() / 1000),
        origin: window.location.hostname,
    };
    window.localStorage.setItem(KEY, JSON.stringify(record));
    // Emit an event so components can react without a full reload.
    window.dispatchEvent(new CustomEvent("thrumline:consent", { detail: record }));
    return record;
}

export function clearConsent() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(KEY);
    window.dispatchEvent(new CustomEvent("thrumline:consent", { detail: null }));
}
