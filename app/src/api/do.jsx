import React from "react";
import { renderToString } from "react-dom/server";

import { SoeProvider, SoeSSRClient } from "../../../lib/src";
import { Content } from "../content";
import { Header } from "../content";

export const renderSoe = () => {
  const client = new SoeSSRClient();
  const text = renderToString(
    <SoeProvider client={client}>
      <div>
        <Header />
        <Content />
      </div>
    </SoeProvider>,
  );

  const html = client.toString();
  return [text, html];
};
