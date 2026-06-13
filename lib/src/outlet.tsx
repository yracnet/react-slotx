import { useSyncExternalStore, type FC } from "react";
import { useSlotContext } from "./context.js";
import type { SlotProps } from "./types.js";

export const Outlet: FC<SlotProps> = ({ name = "default", ...opts }) => {
  const client = useSlotContext();
  const getSnapshot = () => client.outletSlot(name, opts);
  const children = useSyncExternalStore(
    (listener) => client.subscribe(listener),
    getSnapshot,
    getSnapshot,
  );
  return <>{children}</>;
};
