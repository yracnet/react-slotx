import { useEffect, useState, type FC } from "react";
import { useSlotContext } from "./context.js";
import type { SlotProps } from "./types.js";

export const Outlet: FC<SlotProps> = (props) => {
  const client = useSlotContext();
  const data = client.outlet(props);
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    return client.subscribe(() => {
      forceUpdate((v) => v + 1);
    });
  }, [client]);
  return <>{data.children}</>;
};
