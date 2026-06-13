import {
  type HeadletType,
  type SlotOpts,
  assertSlotConf,
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

  update(id: number, partial: Partial<HeadletType>) {
    const item = this.items2.get(id);
    if (item) {
      Object.assign(item, partial);
      this.notify();
    }
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
    const { mode } = assertSlotConf(opts);
    const items = this.items2
      .values()
      .filter((it: HeadletType) => name === "*" || it.name === name)
      .toArray();
    switch (mode) {
      case "all":
        return items.map((it) => it.children);
      case "priority":
        return items.reduce<HeadletType | undefined>(
          (best, it) => (!best || it.priority > best.priority ? it : best),
          undefined,
        )?.children;
      case "last":
        return items.at(-1)?.children;
      default: // first
        return items.at(0)?.children;
    }
  }
}
