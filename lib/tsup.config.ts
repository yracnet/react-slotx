import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    outDir: "dist",
    format: ["esm"],
    dts: true,
    external: ["react", "react/jsx-runtime"],
    sourcemap: true,
  }
]);
