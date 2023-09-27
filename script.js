const MyapiKey = "2f21af8f08f28713cfca36c368ed3fe8"; // Replace with your API key
const locationInput = document.getElementById("locationInput");
const getWeatherButton = document.getElementById("getWeatherButton");
const unitSelector = document.getElementById("unitSelector");
const errorContainer = document.getElementById("errorContainer");
const weatherContainer = document.getElementById("weatherContainer");
getWeatherButton.addEventListener("click", () => {
  const location = locationInput.value.trim();
  const unit = unitSelector.value;

  if (location === "") {
    showError("Please enter a location.");
    return;
  }

  fetchWeather(location, unit);
});

function showError(message) {
  errorContainer.textContent = message;
  weatherContainer.innerHTML = "";
}

function fetchWeather(location, unit) {
  errorContainer.textContent = "";

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        displayWeather(data);
      } else if (xhr.status === 404) {
        showError("Location not found. Please check your input.");
      } else {
        showError(
          "An error occurred while fetching weather data. Please try again later."
        );
      }
    }
  };

  xhr.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${MyapiKey}`
  );
  xhr.send();
}

function displayWeather(data) {
  const { name, main, weather, wind } = data;

  const temperature = main.temp;
  const humidity = main.humidity;
  const description = weather[0].description;
  const windSpeed = wind.speed;

  const weatherHtml = `
        <h2>${name}</h2>
        <p><b>Temperature</b>: ${temperature}°${
    unitSelector.value === "metric" ? "C" : "F"
  }</p>
        <p><b>Humidity</b>: ${humidity}%</p>
        <p><b>Weather</b>: ${description}</p>
        <p><b>Wind Speed</b>: ${windSpeed} m/s</p>
    `;

  weatherContainer.innerHTML = weatherHtml;
}
