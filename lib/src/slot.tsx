import { type FC, useEffect, useRef } from "react";
import { useSlotContext } from "./context.js";
import type { HeadletProps } from "./types.js";

export const Slot: FC<HeadletProps> = ({
  name = "default",
  priority = 1,
  children,
}) => {
  const client = useSlotContext();
  const idRef = useRef<number | null>(null);

  if (client.ssr) {
    client.register({ name, priority, children });
  }

  useEffect(() => {
    idRef.current = client.register({ name, priority, children });
    return () => {
      if (idRef.current !== null) {
        client.unregister(idRef.current);
        idRef.current = null;
      }
    };
  }, [name, priority, client]);

  useEffect(() => {
    if (idRef.current !== null) {
      client.update(idRef.current, { children });
    }
  }, [children, client]);

  return children;
};
