import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import SubscriptionContextProvider from "./context/SubscriptionContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SubscriptionContextProvider>
      <App />
    </SubscriptionContextProvider>
  </StrictMode>
);
