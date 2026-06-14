import React from "react"
import { renderToString } from "react-dom/server";
import { SlotProvider } from "react-slotx";
import { SlotSSRClient } from "react-slotx/server";
import { Page } from "./Page.jsx";

export function renderPage() {
  // 1. Create a fresh client for every request
  const client = new SlotSSRClient();

  // 2. Render the React tree to an HTML string
  //    During this step, every <Slot> registers its content in the client
  const bodyHtml = renderToString(
    <SlotProvider client={client}>
      <Page />
    </SlotProvider>
  );

  // 3. Extract slot content as HTML strings
  //    This is only possible AFTER renderToString finishes
  const headHtml = client.renderToString("head");

  // 4. Build the full HTML document
  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    ${headHtml}
  </head>
  <body>
    <div id="root">${bodyHtml}</div>
  </body>
</html>`;
}