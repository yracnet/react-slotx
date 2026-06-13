import React from "react";
import { renderToString } from "react-dom/server";
import { SoeProvider, SoeSSRClient } from "../../../lib/src";
import { Main } from "../app";

export const renderSoe = () => {
  const client = new SoeSSRClient();  
  const text = renderToString(
    <SoeProvider client={client}>
      <Main/>
    </SoeProvider>,
  );
  const html = client.asHmlString();
  return [text, html];
};
