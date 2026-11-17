import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ProvedorMovimento } from "./lib/movimento";
import "./styles/tokens.css";
import "./styles/global.css";

// volta ao topo ao recarregar (o hero fixado depende disso)
if ("scrollRestoration" in history) history.scrollRestoration = "manual";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProvedorMovimento>
      <App />
    </ProvedorMovimento>
  </StrictMode>,
);
