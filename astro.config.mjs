import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "server",
  adapter: cloudflare({ prerenderEnvironment: "node" }),
  integrations: [mdx(), sitemap()],
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
  },
});
