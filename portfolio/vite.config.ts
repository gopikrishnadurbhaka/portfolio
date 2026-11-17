
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Vite public asset path for GitHub Pages
  vite: {
    base: "/portfolio/",
  },

  tanstackStart: {
    server: { entry: "server" },
    base: "/portfolio/",

    prerender: {
      enabled: true,
      crawlLinks: true,
      failOnError: true,
    },
  },
});
