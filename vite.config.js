import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import ViteRequireContext from "@originjs/vite-plugin-require-context";
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
        rewrite: (path) => path.replace(/^\/weather/, ""),
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
