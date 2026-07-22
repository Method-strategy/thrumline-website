import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import App from "@/App";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { staleTime: 60_000, refetchOnWindowFocus: false },
    },
});

const rootEl = document.getElementById("root");
const tree = (
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>
);

// If the server already returned prerendered HTML, hydrate on top of it
// so we do not blow away the static content and cause a hydration flash.
// If the root is empty (dev SPA fallback), do a fresh render.
if (rootEl && rootEl.hasChildNodes()) {
    ReactDOM.hydrateRoot(rootEl, tree);
} else {
    ReactDOM.createRoot(rootEl).render(tree);
}
