import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import { readdirSync } from "fs";
import IconsResolver from "unplugin-icons/resolver";

const ICON_DIRECTORY_PATH = "./src/assets/icons";
const iconDomains = readdirSync(ICON_DIRECTORY_PATH, {
  withFileTypes: true,
}).map((directory) => directory.name);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia", "vee-validate"],
      dirs: ["./src/composables", "./src/stores/*/index.js", "./src/utils"],
      eslintrc: {
        enabled: true,
      },
    }),
    // Components({
    //   strictCustomNameTransform: (name) => name.replace(".component", ""),
    //   resolvers: [
    //     IconsResolver({
    //       prefix: "icon",
    //       customCollections: iconDomains,
    //     }),
    //   ],
    // }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "src/components.d.ts",
    }),
    Icons({
      customCollections: iconDomains.reduce(
        (iconCollections, domainName) => ({
          ...iconCollections,
          [domainName]: FileSystemIconLoader(`${ICON_DIRECTORY_PATH}/${domainName}`, (svg) =>
            svg.replace(/#[0-9a-fA-F]{3,8}/g, "currentColor"),
          ),
        }),
        {},
      ),
      compiler: "vue3",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
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
});

// import vue from "@vitejs/plugin-vue";
// import { defineConfig } from "vite";
// import { fileURLToPath, URL } from "node:url";
// import ViteRequireContext from "@originjs/vite-plugin-require-context";

// // https://vitejs.dev/config/
// export default defineConfig({
//   resolve: {
//     alias: {
//       "@": fileURLToPath(new URL("./src", import.meta.url)),
//     },
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         additionalData: `
//         @import "./src/assets/style/index.scss";
//       `,
//       },
//     },
//   },
//   plugins: [vue(), ViteRequireContext()],
// });
