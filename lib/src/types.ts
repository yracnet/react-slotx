import type { ReactNode } from "react";

export type HeadletType = {
  name?: string;
  priority: number;
  children?: ReactNode;
};

export type HeadletProps = Partial<HeadletType>

export type SlotConf = {
  mode: "priority" | "order";
}
export type SlotOpts = Partial<SlotConf>;

export type SlotProps = { name: string } & SlotOpts

export const asserSlotConf = (opts: SlotOpts): SlotConf => {
  return {
    mode: "order"
  }
}