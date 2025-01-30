import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => [
  {
    entry: ["src/preset.ts"],
    format: ["esm"],
    clean: false,
    dts: true,
    minify: true,
    sourcemap: true,
    external: ["tailwindcss"],
    ...options,
  },
  {
    entry: ["src/index.ts"],
    format: ["esm"],
    clean: false,
    dts: true,
    minify: true,
    sourcemap: true,
    external: ["react"],
    banner: {
      js: '"use client";',
    },
    ...options,
  },
]);
