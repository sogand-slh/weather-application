import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import ViteRequireContext from "@originjs/vite-plugin-require-context";
import { apiKey } from "@/constants/urls/url.constant";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/weather": {
        target: "https://api.openweathermap.org/data/2.5/forecast",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/weather/, "");
        rewrite: (path) => {
          
          const url = new URL(
            "https://api.openweathermap.org/data/2.5/forecast"
          );
          url.searchParams.append("appid", apiKey);
          return url.pathname + url.search;
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/assets/style/index.scss";
      `,
      },
    },
  },
  transpile: ["vee-validate/dist/rules"],
  plugins: [vue(), ViteRequireContext()],
});
