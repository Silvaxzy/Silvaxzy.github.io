import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// O site fica na raiz de silvaxzy.github.io, então base = "/"
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: { target: "es2022", outDir: "dist" },
  css: { modules: { localsConvention: "camelCaseOnly" } },
});
