import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "@/App.css";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ConsentBanner } from "@/components/layout/ConsentBanner";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

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
                <Nav />
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
            </BrowserRouter>
        </SmoothScroll>
    );
}

export default App;
