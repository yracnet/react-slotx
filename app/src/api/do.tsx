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
  const head = client.renderToString("head");
  const script = client.renderToString("script");
  return { text, head, script };
};
