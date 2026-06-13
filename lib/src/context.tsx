import React, { createContext, useContext, useRef } from "react";
import { SlotClient } from "./client.js";

export const SlotContext = createContext<SlotClient | null>(null);

export const SlotProvider = ({
  client,
  children,
}: {
  client?: SlotClient;
  children: React.ReactNode;
}) => {
  const internalRef = useRef<SlotClient>(null);
  if (!client && !internalRef.current) {
    internalRef.current = new SlotClient();
  }
  const value = client ?? internalRef.current;
  return <SlotContext.Provider value={value}>{children}</SlotContext.Provider>;
};

export const useSlotContext = (): SlotClient => {
  const value = useContext(SlotContext);
  if (!value) throw new Error("useSlotContext requires SlotProvider");
  return value;
};
