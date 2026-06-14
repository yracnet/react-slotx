import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/server.tsx"],
  outDir: "dist",
  format: ["esm", "cjs"],
  dts: true,
  external: ["react", "react/jsx-runtime", "react-dom", "react-dom/server"],
  sourcemap: true,
});
