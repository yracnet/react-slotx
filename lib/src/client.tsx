import { renderToString } from "react-dom/server";
import type { SlotProps, HeadletType } from "./types.js";

export class SlotClient {
  ssr = false;
  count2 = 0;
  items2 = new Map<number, HeadletType>();
  listeners = new Set<() => void>();

  register2(item: HeadletType): () => void {
    const id = this.count2++;
    this.items2.set(id, item);
    this.notify();
    return () => {
      this.items2.delete(id);
      this.notify();
    };
  }

  register(item: HeadletType): number {
    this.count2++;
    this.items2.set(this.count2, item);
    this.notify();
    return this.count2;
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

  outlet({ name = "default", mode = "priority" }: SlotProps) {
    return this.items2.values().reduce<HeadletType>(
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
  asHmlString(props: SlotProps): string {
    const show = this.outlet(props);
    console.log(">asHmlString>>>", show.name);
    return renderToString(
      <>
        <h1>{show.name}</h1>
        {show.children}
      </>,
    );
  }
}
