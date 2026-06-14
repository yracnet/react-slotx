import React, { createContext, useContext, type FC } from "react";
import { SlotClient } from "./client.js";

export const SlotContext = createContext<SlotClient | null>(null);

type SlotProviderProps = {
  client: SlotClient;
  children: React.ReactNode;
};

export const SlotProvider: FC<SlotProviderProps> = ({ client, children }) => {
  return <SlotContext.Provider value={client}>{children}</SlotContext.Provider>;
};

export const useSlotContext = (): SlotClient => {
  const value = useContext(SlotContext);
  if (!value) throw new Error("useSlotContext requires SlotProvider");
  return value;
};
