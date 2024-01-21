import { createI18n } from "vue-i18n";
import { getLocalStorageItem } from "@/modules/localStorage";
import messages from "@/locales";

export default createI18n({
  legacy: false,
  locale: getLocalStorageItem("lang") || "en-US",
  fallbackLocale: getLocalStorageItem("lang") || "en-US",
  messages,
});
