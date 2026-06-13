import { type FC, useEffect } from "react";
import { useSeoContext } from "../context.js";

export type CrossOrigin = "" | "anonymous" | "use-credentials";

export type LinkProps = {
  rel?: string;
  href?: string;
  type?: string;
  media?: string;
  hrefLang?: string;
  sizes?: string;
  as?: string;
  crossOrigin?: CrossOrigin;
};

const linkKey = (props: LinkProps): string => {
  if (props.rel) return `link:rel:${props.rel}`;
  if (props.href) return `link:href:${props.href}`;
  return "link";
};

export const Link: FC<LinkProps> = (props) => {
  const client = useSeoContext();
  const key = linkKey(props);
  const serialized = JSON.stringify(props);
  if (client.ssr) {
    client.register(key, "link", props);
  }
  useEffect(() => {
    client.register(key, "link", props);
    return () => client.unregister(key);
  }, [key, serialized]);
  return null;
};
