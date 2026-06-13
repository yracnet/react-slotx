import { renderToString } from "react-dom/server";
import { SlotProvider, SlotSSRClient } from "../../../lib/src";
import { Main } from "../app";

export const renderSoe = () => {
  const client = new SlotSSRClient();
  const text = renderToString(
    <SlotProvider client={client}>
      <Main />
    </SlotProvider>,
  );
  const html = client.renderToString("head");
  return [text, html];
};
