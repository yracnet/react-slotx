import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Main } from "./app";
import { SoeClient, SoeProvider } from "../../lib/src";

const client = new SoeClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SoeProvider client={client}>
      <Main />
    </SoeProvider>
  </StrictMode>,
);
