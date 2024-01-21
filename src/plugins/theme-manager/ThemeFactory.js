import { ref, computed } from "vue";
import localStorage from "@/modules/localStorage";

class ThemeFactory {
  #themeList = ["light", "dark"];
  #currentTheme = ref(
    localStorage.get("theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  constructor() {
    document.documentElement.setAttribute(
      "data-theme",
      this.#currentTheme.value
    );
  }

  set theme(newTheme) {
    if (!this.#themeList.includes(newTheme)) throw new Error("Invalid theme!");

    document.documentElement.setAttribute("data-theme", newTheme);
    this.#currentTheme.value = newTheme;
    localStorage.set("theme", newTheme);
  }

  get theme() {
    return computed(() => this.#currentTheme.value);
  }
}

export default ThemeFactory;
