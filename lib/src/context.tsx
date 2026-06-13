import React, { createContext, useContext } from "react";
import { SlotClient } from "./client.js";

export const SlotContext = createContext<SlotClient | null>(null);

export const SlotProvider = ({
  client,
  children,
}: {
  client?: SlotClient;
  children: React.ReactNode;
}) => {
  if (!client) {
    client = new SlotClient();
  }
  return <SlotContext.Provider value={client}>{children}</SlotContext.Provider>;
};

export const useSlotContext = (): SlotClient => {
  const value = useContext(SlotContext);
  if (!value) throw new Error("useSlotContext requires SlotContext");
  return value;
};
