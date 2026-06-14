# react-slotx

Slot/Outlet system for React. Declare content anywhere in your tree with `<Slot>` and render it wherever you place an `<Outlet>`. Supports SPA and SSR.

## Installation

```bash
npm install react-slotx
```

`react` ≥ 18 is a required peer dependency. `react-dom` is optional and only needed for SSR.

## Core concepts

| Component / Class | Role                                                                       |
| ----------------- | -------------------------------------------------------------------------- |
| `<SlotProvider>`  | Provides the shared `SlotClient` to the tree                               |
| `<Slot>`          | Registers content into a named slot                                        |
| `<Outlet>`        | Renders the content of a named slot                                        |
| `SlotClient`      | Store — use in SPA                                                         |
| `SlotSSRClient`   | Store with `renderToString` — use in SSR (import from `react-slot/server`) |

## SPA usage

```tsx
import { SlotClient, SlotProvider, Slot, Outlet } from "react-slotx";

const client = new SlotClient();

export function App() {
  return (
    <SlotProvider client={client}>
      <html>
        {/* Outlet can be anywhere in the tree */}
        <head>
          <Outlet name="head" />
        </head>
        {/* Slot registers content from wherever it is rendered */}
        <body>
          <Slot name="head" priority={1}>
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>App Server</title>
            <link
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
              rel="stylesheet"
            />
          </Slot>
          <Slot name="content" priority={1}>
            <b>Content</b>
          </Slot>
          <main>
            <div>
              <Outlet name="content" />
            </div>
          </main>
        </body>
      </html>
    </SlotProvider>
  );
}
```

## SSR usage

```tsx
import { renderToString } from "react-dom/server";
import { SlotProvider } from "react-slotx";
import { SlotSSRClient } from "react-slotx/server";

export function renderPage() {
  const client = new SlotSSRClient();

  const body = renderToString(
    <SlotProvider client={client}>
      <App />
    </SlotProvider>,
  );
  const head = client.renderToString("head");
  const content = client.renderToString("content");

  return `<!doctype html>
<html>
  <head>${head}</head>
  <body>${body} ${content}</body>
</html>`;
}
```

## Outlet modes

The `mode` prop controls which registered `<Slot>` the `<Outlet>` renders when multiple slots share the same name.

| mode                   | behaviour                                          |
| ---------------------- | -------------------------------------------------- |
| `"priority"` (default) | Renders the slot with the highest `priority` value |
| `"first"`              | Renders the first slot registered                  |
| `"last"`               | Renders the last slot registered                   |
| `"all"`                | Renders all slots in registration order            |

```tsx
<Outlet name="head" mode="priority" />
<Outlet name="head" mode="all" />
```

## API

### `<SlotProvider>`

| prop       | type         | default  | description                                         |
| ---------- | ------------ | -------- | --------------------------------------------------- |
| `client`   | `SlotClient` | internal | Pass an explicit client instance. Required for SSR. |
| `children` | `ReactNode`  | —        |                                                     |

### `<Slot>`

| prop                      | type        | default     | description                                          |
| ------------------------- | ----------- | ----------- | ---------------------------------------------------- |
| `name`                    | `string`    | `"default"` | Slot name to register into                           |
| `priority`                | `number`    | `1`         | Higher value wins when `mode="priority"`             |
| `children`                | `ReactNode` | —           | Content to register                                  |
| `dangerouslyEnableRender` | `boolean`   | `false`     | Also renders children in-place (not just via Outlet) |

### `<Outlet>`

| prop   | type                                       | default      | description                                  |
| ------ | ------------------------------------------ | ------------ | -------------------------------------------- |
| `name` | `string \| "*"`                            | `"default"`  | Slot name to render. `"*"` matches all slots |
| `mode` | `"priority" \| "first" \| "last" \| "all"` | `"priority"` | Selection strategy                           |

### `SlotClient`

```ts
const client = new SlotClient();
```

### `SlotSSRClient` — `react-slot/server`

```ts
import { SlotSSRClient } from "react-slotx/server";

const client = new SlotSSRClient();
// after renderToString(...):
const html: string = client.renderToString("slot-name");
const html: string = client.renderToString("slot-name", { mode: "all" });
```


## Resources

Git Repository https://github.com/yracnet/react-slotx/

SPA Example https://github.com/yracnet/react-slotx/tree/main/examples/my-spa-app

SSR Example https://github.com/yracnet/react-slotx/tree/main/examples/my-ssr-app

Package https://www.npmjs.com/package/react-slotx

Tutorial https://dev.to/yracnet/react-slotx-4khe

## License

MIT
