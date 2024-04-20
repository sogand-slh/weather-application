fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // Get weather condition code from API response
    const weatherCode = data.weather[0].id;

    // Map weather condition code to corresponding icon
    const iconUrl = `http://openweathermap.org/img/wn/${weatherCode}.png`;

    // Display the weather icon
    const iconElement = document.getElementById("weather-icon");
    iconElement.src = iconUrl;
    iconElement.alt = data.weather[0].description;
  })
  .catch((error) => console.error("Error fetching weather data:", error));
