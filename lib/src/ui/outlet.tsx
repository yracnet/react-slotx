import { useEffect, useState } from "react";
import { useSeoContext } from "../context.js";

export const SoeOutlet = () => {
  const client = useSeoContext();
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    return client.subscribe(() => {
      forceUpdate((v) => v + 1);
    });
  }, [client]);
  const items = client.getItems();
  return <pre>{JSON.stringify(items)}</pre>
  return (
    <>
      {items.map((it) => {
        if (it.type === "title")
          return <title key={it.id} {...it.props}></title>;
        else if (it.type === "meta") return <meta key={it.id} {...it.props} />;
        else if (it.type === "link") return <link key={it.id} {...it.props} />;
        return null;
      })}
    </>
  );
};
