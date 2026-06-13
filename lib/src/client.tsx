import { renderToString } from "react-dom/server";
import {
  type SlotProps,
  type HeadletType,
  type SlotOpts,
  asserSlotConf,
} from "./types.js";

export class SlotClient {
  ssr = false;
  count2 = 0;
  items2 = new Map<number, HeadletType>();
  listeners = new Set<() => void>();

  register(item: HeadletType): number {
    const id = this.count2++;
    this.items2.set(id, item);
    this.notify();
    return id;
  }

  unregister(id: number) {
    this.items2.delete(id);
    this.notify();
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  outletSlot(name: string, opts: SlotOpts = {}) {
    const config = asserSlotConf(opts);
    return this.items2
      .values()
      .filter((it) => it.name === name)
      .reduce<HeadletType>(
        (max, item) => {
          return item.priority > max.priority ? item : max;
        },
        {
          name: "default",
          priority: -1,
        },
      );
  }
}

export class SlotSSRClient extends SlotClient {
  ssr = true;
  renderToString(name: string, opts: SlotOpts = {}): string {
    const item = this.outletSlot(name, opts);
    return renderToString(<>{item.children}</>);
  }
}
