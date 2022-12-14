const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursdsay",
  "Friday",
  "Saturday",
];

function formatTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = dayNames[date.getDay()];

  return day.slice(0, 3);
}

function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  //if input is not empty send request
  if (city !== "") {
    document.querySelector("#city").value = "";
    let apiKey = "e6275d42883d7f2a6c4f0e2e18e90b64";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
}

function getForecast(coordinates) {
  let apiKey = "bd3bb6534458ba51b48c49f5155745b6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  document.querySelector(`h1`).innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector(".temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector(
    "#clouds"
  ).innerHTML = `Clouds: ${response.data.clouds.all} %`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = `Wind:${Math.round(
    response.data.wind.speed * 3.6
  )} km/h`;
  let icon = document.querySelector("#weatherIcon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  let description = document.querySelector("#weatherDescription");
  description.innerHTML = response.data.weather[0].description;

  let date = new Date();
  let localDate = new Date(
    date.getTime() +
      (date.getTimezoneOffset() * 60 + response.data.timezone) * 1000
  );
  let currentDate = `Last updated: ${dayNames[date.getDay()]} ${formatTime(
    date
  )}, <br>Local time: ${dayNames[localDate.getDay()]} ${formatTime(localDate)}`;
  document.querySelector(".current-date").innerHTML = currentDate;

  //let presipitation = response.data.main.presipitation;
  //console.log(response.data);

  getForecast(response.data.coord);
}

function setCelsium(event) {
  event.preventDefault();
  document.querySelector(".temperature").innerHTML =
    Math.round(celsiusTemperature);
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
}

function setFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  //remove class active from celsius and add class active to farenheit
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}

function getWeatherByLocation(position) {
  let apiKey = "e6275d42883d7f2a6c4f0e2e18e90b64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeatherByLocation);
}

//show forecast using template in HTML
function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily.slice(1, 6);
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = "";

  forecast.forEach(function (forecastDay) {
    forecastElement.innerHTML += `<div class="card">
    <div class="card-body">
      <h5 class="card-title weather-forecast-date">${formatDay(
        forecastDay.dt
      )}</h5>
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        class="card-img-top weather-icon"
        alt="${forecastDay.weather[0].main}"
      />
      <p class="card-text">
        <small class="text-muted"
          ><div class="weather-forecast-temp-max">day ${Math.round(
            forecastDay.temp.max
          )}??</div>
          <div class="weather-forecast-temp-min">night ${Math.round(
            forecastDay.temp.min
          )}??</div></small
        >
      </p>
    </div>
    </div>`;
  });
}

//code that runs when the page loads and global variables
let celsiusTemperature = null;

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", getCity);

let celsius = document.querySelector("#celsium");
celsium.addEventListener("click", setCelsium);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", setFahrenheit);

let buttonCurrentLocation = document.querySelector("#button-current-location");
buttonCurrentLocation.addEventListener("click", getCurrentLocation);

getCurrentLocation(new Event("load"));
