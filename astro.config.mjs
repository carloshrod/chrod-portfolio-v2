// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import netlify from "@astrojs/netlify";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
    cacheDir: "./.vite",
    optimizeDeps: {
      include: ["sanity", "@sanity/ui", "@sanity/icons", "styled-components"],
    },
    ssr: {
      noExternal: [
        "@sanity/astro",
        "sanity",
        "@sanity/ui",
        "@sanity/icons",
        "styled-components",
      ],
    },
  },

  integrations: [
    react(),
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET ?? "production",
      useCdn: true,
      studioBasePath: "/studio",
    }),
  ],
});
