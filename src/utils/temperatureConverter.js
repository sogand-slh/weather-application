const celsiusToFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32;
};

const fahrenheitToCelsius = (fahrenheit) => {
  return (5 / 9) * (fahrenheit - 32);
};

export default {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
};
