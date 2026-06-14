import {
  type HeadletType,
  type SlotOpts,
  assertSlotConf,
} from "./types.js";

type SlotSnapshot = HeadletType["children"] | Array<HeadletType["children"]>;

export class SlotClient {
  ssr = false;
  private count = 0;
  private items = new Map<number, HeadletType>();
  private listeners = new Set<() => void>();
  private _cache = new Map<string, SlotSnapshot>();

  register(item: HeadletType): number {
    const id = this.count++;
    this.items.set(id, item);
    this.notify();
    return id;
  }

  unregister(id: number) {
    this.items.delete(id);
    this.notify();
  }

  update(id: number, partial: Partial<HeadletType>) {
    const item = this.items.get(id);
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
    this._cache.clear();
    for (const listener of this.listeners) {
      listener();
    }
  }

  outletSlot(name: string, opts: SlotOpts = {}): SlotSnapshot {
    const { mode } = assertSlotConf(opts);
    const key = `${name}:${mode}`;
    if (this._cache.has(key)) return this._cache.get(key);
    const items = Array.from(this.items.values()).filter(
      (it: HeadletType) => name === "*" || it.name === name,
    );
    let result: SlotSnapshot;
    switch (mode) {
      case "all":
        result = items.map((it) => it.children);
        break;
      case "priority":
        result = items.reduce<HeadletType | undefined>(
          (max, it) => (!max || it.priority > max.priority ? it : max),
          undefined,
        )?.children;
        break;
      case "last":
        result = items.at(-1)?.children;
        break;
      default: // first
        result = items.at(0)?.children;
    }
    this._cache.set(key, result);
    return result;
  }
}
