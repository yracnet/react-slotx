# react-slotx — Step-by-Step Tutorial

This guide will walk you through using **react-slotx** from scratch.  
No prior knowledge of slots or portals is required — just basic React.

---

## What is react-slotx?

`react-slotx` lets you **declare content in one place** and **render it somewhere else** in your React tree.

The two key building blocks are:

- **`<Slot name="…">`** — registers content into a named bucket.
- **`<Outlet name="…">`** — renders whatever was registered in that bucket.

Think of it like a two-way pipe:

```
<Slot name="header">  ← you put content here (deep inside a page)
    <h1>Hello</h1>
</Slot>

<Outlet name="header" />  ← it shows up here (e.g. in a layout shell)
```

---

## Installation

```bash
yarn add react-slotx
```

Requirements:
- React ≥ 18
- `react-dom` is only needed for SSR (covered in Part 2)

---

## Part 1 — SPA with Vite

This section shows the **automatic** way to use react-slotx inside a plain Vite + React project.

### Step 1 — Create a new Vite project

```bash
yarn create vite my-spa-app --template react-ts
cd my-spa-app
yarn install
yarn add react-slotx
```

### Step 2 — Clean up unused Vite template files

The Vite template generates files that are not needed for this tutorial. Remove them to keep the project clean:

#### Linux
```bash
rm -rf src/*
touch src/main.tsx
touch src/App.tsx
touch src/Layout.tsx
touch src/HomePage.tsx
```
#### Windows
```bash
Remove-Item src\* -Force
New-Item src\main.tsx -ItemType File -Force
New-Item src\App.tsx -ItemType File -Force
New-Item src\Layout.tsx -ItemType File -Force
New-Item src\HomePage.tsx -ItemType File -Force
```

### Step 3 — Create the SlotClient (once, at the app root)

`SlotClient` is the shared store that connects every `<Slot>` with its matching `<Outlet>`. You create it **once** and pass it to `<SlotProvider>`.

Edit `src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SlotClient, SlotProvider } from "react-slotx";
import { App } from "./App";

// Create a single shared client for the whole app
const client = new SlotClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SlotProvider client={client}>
      <App />
    </SlotProvider>
  </StrictMode>
);
```

> **Why wrap the whole app?**  
> `SlotProvider` makes the `client` available to every component in the tree. Without it, `<Slot>` and `<Outlet>` cannot talk to each other.

### Step 4 — Create a Layout with an Outlet

The **Layout** is the shell of your page. It defines *where* content will appear using `<Outlet>`.

Create `src/Layout.tsx`:

```tsx
import { Outlet } from "react-slotx";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* The page title registered anywhere in the tree will render here */}
      <header>
        <Outlet name="page-title" />
      </header>

      <main>
        {children}
      </main>
    </div>
  );
}
```

### Step 5 — Register content with Slot inside a Page

A **Page** component registers the title it wants to show, using `<Slot>`. It does not need to know where the title will actually appear.

Create `src/HomePage.tsx`:

```tsx
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
```

### Step 6 — Wire everything together in App

Edit `src/App.tsx`:

```tsx
import { Layout } from "./Layout";
import { HomePage } from "./HomePage";

export function App() {
  return (
    <Layout>
      <HomePage />
    </Layout>
  );
}
```

### Step 7 — Run the app

```bash
yarn dev
```

Open `http://localhost:5173`. You will see `"Welcome to the Home Page"` rendered inside the `<header>`, even though it was declared inside `<HomePage>`.

### How it works (diagram)

```
<App>
  <Layout>
    <header>
      <Outlet name="page-title" />  ← renders here
    </header>
    <main>
      <HomePage>
        <Slot name="page-title">   ← content declared here
          <h1>Welcome…</h1>
        </Slot>
      </HomePage>
    </main>
  </Layout>
</App>
```

### Bonus — priority and multiple Slots

If two components register content into the **same** slot name, the `mode` prop on `<Outlet>` decides which one wins.

```tsx
// PageA registers with priority 1 (the default)
<Slot name="page-title" priority={1}>
  <h1>Page A</h1>
</Slot>

// PageB registers with priority 5
<Slot name="page-title" priority={5}>
  <h1>Page B</h1>
</Slot>

// With mode="priority" (the default), the outlet renders Page B
<Outlet name="page-title" mode="priority" />

// With mode="all", both are rendered in registration order
<Outlet name="page-title" mode="all" />
```

| mode | behaviour |
|------|-----------|
| `"priority"` *(default)* | Renders the Slot with the highest `priority` value |
| `"first"` | Renders the first Slot registered |
| `"last"` | Renders the last Slot registered |
| `"all"` | Renders every Slot in registration order |

---

## Part 2 — SSR with Express

Server-Side Rendering means the HTML is built on the server **before** it reaches the browser. `react-slotx` has first-class support for this through `SlotSSRClient`, imported from `react-slotx/server`.

### Step 1 — Create the project

```bash
mkdir my-ssr-app
cd my-ssr-app
yarn init -y
yarn add express react react-dom react-slotx
yarn add -D tsx
```

> **Why `tsx`?** `tsx` is a lightweight Node.js enhancer that understands JSX files (`.jsx`) with no TypeScript required. It replaces the need for a full TypeScript + Babel setup.

### Step 2 — Create your React component

This component uses `<Slot>` exactly as in SPA mode. The component itself does not care whether it is rendered on the client or the server.

Create `src/Page.jsx`:

```jsx
import React from "react";
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
```

### Step 3 — Create the render function

This is the key difference from SPA mode. On the server you use **`SlotSSRClient`** instead of `SlotClient`, and after `renderToString` you call `client.renderToString("slot-name")` to extract the HTML registered in each slot.

Create `src/render.jsx`:

```jsx
import React from "react";
import { renderToString } from "react-dom/server";
import { SlotProvider } from "react-slotx";
import { SlotSSRClient } from "react-slotx/server";
import { Page } from "./Page.jsx";

export function renderPage() {
  // 1. Create a fresh client for every request
  const client = new SlotSSRClient();

  // 2. Render the React tree to an HTML string
  //    During this step, every <Slot> registers its content in the client
  const bodyHtml = renderToString(
    <SlotProvider client={client}>
      <Page />
    </SlotProvider>
  );

  // 3. Extract slot content as HTML strings
  //    This is only possible AFTER renderToString finishes
  const headHtml = client.renderToString("head");

  // 4. Build the full HTML document
  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    ${headHtml}
  </head>
  <body>
    <div id="root">${bodyHtml}</div>
  </body>
</html>`;
}
```

> **Important:** create a **new** `SlotSSRClient()` on every request. Reusing the same instance across requests will mix up slot content between users.

### Step 4 — Create the Express server

Create `src/server.js`:

```js
import express from "express";
import { renderPage } from "./render.jsx";

const app = express();

app.get("/", (_req, res) => {
  // Call our render function and send the result as HTML
  const html = renderPage();
  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```

### Step 5 — Run the server

```bash
npx tsx src/server.js
```

Open `http://localhost:3000`. You will receive a fully rendered HTML page with:

- `<title>My SSR Page</title>` and the `<meta>` tag injected into `<head>` — extracted from the `"head"` slot.
- The page body rendered by React.

### How SSR slot extraction works (step by step)

```
1. Client created          →  client = new SlotSSRClient()
2. renderToString runs     →  React renders the tree
                              <Slot name="head"> registers "<title>…</title>"
                              inside client
3. client.renderToString() →  extracts the registered HTML as a string
4. Template assembled      →  headHtml injected into <head>, bodyHtml into <body>
```

### extracting multiple slots

You can have as many named slots as you need:

```jsx
// In your component
<Slot name="head">
  <title>My Page</title>
</Slot>

<Slot name="scripts">
  <script src="/app.js" defer></script>
</Slot>
```

```js
// In your render function
const headHtml    = client.renderToString("head");
const scriptsHtml = client.renderToString("scripts");

return `<!doctype html>
<html>
  <head>${headHtml}</head>
  <body>
    <div id="root">${bodyHtml}</div>
    ${scriptsHtml}
  </body>
</html>`;
```

### Render mode in SSR

`renderToString` on the client accepts the same `mode` option as the `<Outlet>` `mode` prop:

```js
// Only the highest-priority slot (default)
client.renderToString("head", { mode: "priority" });

// All registered slots concatenated
client.renderToString("head", { mode: "all" });
```

---

## Quick Reference

| | SPA | SSR |
|---|---|---|
| Install | `yarn add react-slotx` | `yarn add react-slotx react-dom` |
| Client class | `SlotClient` | `SlotSSRClient` (from `react-slotx/server`) |
| Import | `import { SlotClient } from "react-slotx"` | `import { SlotSSRClient } from "react-slotx/server"` |
| Client lifetime | Once, module-level | Once **per request** |
| Extract slot HTML | Not needed (React handles it) | `client.renderToString("slot-name")` |
| `<Slot>` / `<Outlet>` | Same as SSR | Same as SPA |

---

## Resources

Git Repository https://github.com/yracnet/react-slotx/

SPA Example https://github.com/yracnet/react-slotx/tree/main/examples/my-spa-app

SSR Example https://github.com/yracnet/react-slotx/tree/main/examples/my-ssr-app

Package https://www.npmjs.com/package/react-slotx

## License

MIT
