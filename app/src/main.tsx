import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SlotClient, SlotProvider } from "../../lib/src";
import { Example } from "./example";

const client = new SlotClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SlotProvider client={client}>
      <Example />
    </SlotProvider>
  </StrictMode>,
);
