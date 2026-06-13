import { type FC, useEffect, useLayoutEffect, useRef } from "react";
import { useSlotContext } from "./context.js";
import type { HeadletProps } from "./types.js";

export const Slot: FC<HeadletProps> = ({
  name = "default",
  priority = 1,
  children,
  dangerouslyEnableRender,
}) => {
  const client = useSlotContext();
  const idRef = useRef<number | null>(null);

  if (client.ssr) {
    client.register({ name, priority, children });
  }

  useLayoutEffect(() => {
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

  return dangerouslyEnableRender ? children : null;
};
