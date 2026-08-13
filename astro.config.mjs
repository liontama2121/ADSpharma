// @ts-check
import { defineConfig } from "astro/config";

// Sitio estatico. Se despliega en Cloudflare Pages: build `npm run build`, salida `dist`.
export default defineConfig({
  site: "https://adspharma.co",
  output: "static",
  devToolbar: {
    enabled: false
  }
});
