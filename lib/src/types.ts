import type { ReactNode } from "react";

export type HeadletType = {
  name?: string;
  priority: number;
  children?: ReactNode;
};

export type HeadletProps = Partial<HeadletType>

export type SlotProps ={
  name?: string;
  mode?: "priority" | "order";
}