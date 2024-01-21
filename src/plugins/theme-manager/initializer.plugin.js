import ThemeFactory from "@/plugins/theme-manager/ThemeFactory";

export default function (app) {
  const theme = new ThemeFactory();
  app.provide("$theme", theme);
  app.config.globalProperties.$theme = theme;
}
