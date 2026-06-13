import { type FC, useEffect } from "react";
import { useSlotContext } from "./context.js";
import type { HeadletProps } from "./types.js";

export const Slot: FC<HeadletProps> = ({
  name = "default",
  priority = 1,
  children,
}) => {
  const client = useSlotContext();
  if (client.ssr) {
    let id = client.register({ name, priority, children });
  }
  useEffect(() => {
    const id = client.register({ name, priority, children });
    return () => {
      client.unregister(id);
    };
  }, [name, children, priority]);
  return children;
};
