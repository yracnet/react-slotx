import { type FC, useEffect } from "react";
import { useSeoContext } from "../context.js";

export type MetaProps = {
  name?: string;
  property?: string;
  content?: string;
  httpEquiv?: string;
  charset?: string;
  media?: string;
};

const metaKey = (props: MetaProps): string => {
  if (props.name) return `meta:name:${props.name}`;
  if (props.property) return `meta:property:${props.property}`;
  if (props.httpEquiv) return `meta:http-equiv:${props.httpEquiv}`;
  if (props.charset) return "meta:charset";
  return "meta";
};

export const Meta: FC<MetaProps> = (props) => {
  const client = useSeoContext();
  const key = metaKey(props);
  const serialized = JSON.stringify(props);
  if (client.ssr) {
    client.register(key, "meta", props);
  }
  useEffect(() => {
    client.register(key, "meta", props);
    return () => client.unregister(key);
  }, [key, serialized]);
  return null;
};
