import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://galacticmonk.com",
  output: "static",
  trailingSlash: "always",
  outDir: "./out",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
