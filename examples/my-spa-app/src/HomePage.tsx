import { Slot } from "react-slotx";

export function HomePage() {
  return (
    <div>
      {/* Register a title into the "page-title" slot */}
      <Slot name="page-title">
        <h1>Welcome to the Home Page</h1>
      </Slot>

      <p>This is the home page content.</p>
    </div>
  );
}