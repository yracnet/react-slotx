import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SlotClient, SlotProvider } from "react-slotx";
import { App } from "./App";

// Create a single shared client for the whole app
const client = new SlotClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SlotProvider client={client}>
      <App />
    </SlotProvider>
  </StrictMode>
);