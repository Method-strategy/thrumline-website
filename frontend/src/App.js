import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "@/App.css";

import { SideNav } from "@/components/layout/SideNav";
// Legacy top-header nav kept for easy revert: @/components/layout/Nav.legacy
import { Footer } from "@/components/layout/Footer";
import { ConsentBanner } from "@/components/layout/ConsentBanner";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Toaster } from "sonner";

import Home from "@/pages/Home";
import WhatWeDo from "@/pages/WhatWeDo";
import HowItWorks from "@/pages/HowItWorks";
import Signals from "@/pages/Signals";
import Fit from "@/pages/Fit";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import NotFound from "@/pages/NotFound";

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        const l = window.__lenis;
        if (l) l.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function App() {
    const [openPrefsSignal, setOpenPrefsSignal] = useState(0);
    return (
        <SmoothScroll>
            <BrowserRouter>
                <ScrollToTop />
                <SideNav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/what-we-do" element={<WhatWeDo />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/signals" element={<Signals />} />
                    <Route path="/fit" element={<Fit />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer onOpenCookiePrefs={() => setOpenPrefsSignal((n) => n + 1)} />
                <ConsentBanner openTrigger={openPrefsSignal} />
                <Toaster
                    position="bottom-center"
                    toastOptions={{
                        style: {
                            background: "#17181A",
                            color: "#F4F5F7",
                            border: "1px solid #17181A",
                            fontFamily: "Fraunces, Georgia, serif",
                            fontSize: "16px",
                            letterSpacing: "-0.005em",
                        },
                    }}
                />
            </BrowserRouter>
        </SmoothScroll>
    );
}

export default App;
