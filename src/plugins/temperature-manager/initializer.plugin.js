import TemperatureFactory from "./TemperatureFactory";

export default function (app) {
  const unitTemperature = new TemperatureFactory();
  app.provide("$unitTemperature", unitTemperature);
  app.config.globalProperties.$unitTemperature = unitTemperature;
}
