import { createRoot } from "react-dom/client";
import { WatchlistProvider } from "./context/WatchlistContext.tsx";
import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WatchlistProvider>
      <App />
    </WatchlistProvider>
  </StrictMode>,
);
