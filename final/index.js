const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const city = document.querySelector(".search-box input").value;
  const APIKey = "f6b0084c5da865d7ded4f360f784b540";
  console.log("Button clicked! Searching for city:", city);
  if (city === "") {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((json) => Promise.reject(json));
      }
      return response.json();
    })
    .then((json) => {
      console.log("API response:", json);

      console.log("main:", json.main);
      console.log("weather:", json.weather);
      console.log("humidity:", json.main.humidity);
      console.log("speed:", json.wind.speed);

      if (json.cod === 404 || json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      } else if (json.cod === 200 || json.cod === "200") {
        weatherBox.style.display = "";
        weatherDetails.style.display = "";
        error404.style.display = "none";
        error404.classList.remove("fadeIn");
      } else {
        console.error("Unknown API response:", json);
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Clouds":
          image.src = "images/cloud.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Haze":
          image.src = "images/haze.png";
          break;
        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span> °C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`; // Added a percentage sign
      wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      if (error.cod === 404 || error.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
      }
    });
});
