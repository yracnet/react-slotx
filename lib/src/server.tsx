import { renderToString } from "react-dom/server";
import { SlotClient } from "./client.js";
import type { SlotOpts } from "./types.js";

export class SlotSSRClient extends SlotClient {
  ssr = true;
  renderToString(name: string, opts: SlotOpts = {}): string {
    const children = this.outletSlot(name, opts);
    return renderToString(<>{children}</>);
  }
}
