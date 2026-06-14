import React from "react"
import { Slot } from "react-slotx";

export function Page() {
  return (
    <div>
      {/* Register the <title> tag into the "head" slot */}
      <Slot name="head">
        <title>My SSR Page</title>
        <meta name="description" content="Built with react-slotx" />
      </Slot>

      <h1>Hello from the server!</h1>
      <p>This HTML was rendered on the server.</p>
    </div>
  );
}
