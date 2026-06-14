import { renderToString } from "react-dom/server";
import { SlotProvider } from "react-slotx";
import { SlotSSRClient } from "react-slotx/server";
import { Example } from "../example";

export const renderSoe = () => {
  const client = new SlotSSRClient();
  const text = renderToString(
    <SlotProvider client={client}>
      <Example />
    </SlotProvider>,
  );
  const head = client.renderToString("head");
  const script = client.renderToString("script");
  return { text, head, script };
};
