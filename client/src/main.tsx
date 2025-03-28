import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./lib/i18n";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </I18nextProvider>
);
