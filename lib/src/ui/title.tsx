import { type FC, useEffect } from "react";
import { useSeoContext } from "../context.js";

type TitleProps = {
  value?: string;
};

export const Title: FC<TitleProps> = ({ value }) => {
  const client = useSeoContext();
  if (client.ssr) {
    client.register("title", "title", { children: value });
  }
  useEffect(() => {
    client.register("title", "title", { children: value });
    return () => {
      client.unregister("title");
    };
  }, [value]);
  return null;
};
