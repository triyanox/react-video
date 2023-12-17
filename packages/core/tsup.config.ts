import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  banner: {
    js: "'use client'",
  },
  format: ["cjs", "esm"],
  clean: true,
  minify: true,
  external: ["react", "react-dom", "framer-motion"],
  injectStyle: true,
  ...options,
}));
