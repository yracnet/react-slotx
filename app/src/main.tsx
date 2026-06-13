import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Main } from "./app";
import { SlotClient, SlotProvider } from "../../lib/src";

const client = new SlotClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SlotProvider client={client}>
      <Main />
    </SlotProvider>
  </StrictMode>,
);
