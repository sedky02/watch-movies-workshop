import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { WatchlistProvider } from "./context/WatchlistContext.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <WatchlistProvider>
      <App />
    </WatchlistProvider>
  </BrowserRouter>
);
