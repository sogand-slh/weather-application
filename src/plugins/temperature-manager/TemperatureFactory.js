import { ref, computed } from "vue";
import localStorage from "@/modules/localStorage";

class TemperatureFactory {
  #temperatureList = ["celsius", "fahrenheit"];
  #currentTemperature = ref(
    localStorage.get("unitTemperature") ??
      (window.matchMedia("(prefers-color-scheme: celsius)").matches
        ? "celsius"
        : "fahrenheit")
  );

  constructor() {
    document.documentElement.setAttribute(
      "data-temperature",
      this.#currentTemperature.value
    );
  }

  set temperature(newTemperature) {
    if (!this.#temperatureList.includes(newTemperature))
      throw new Error("Invalid temperature!");

    document.documentElement.setAttribute("data-temperature", newTemperature);
    this.#currentTemperature.value = newTemperature;
    localStorage.set("temperature", newTemperature);
  }

  get temperature() {
    return computed(() => this.#currentTemperature.value);
  }
}

export default TemperatureFactory;
