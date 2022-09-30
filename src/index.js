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

function showWeather(response) {
  displayForecast();
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
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = "";
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastElement.innerHTML += `<div class="card">
    <div class="card-body">
      <h5 class="card-title weather-forecast-date">${day}</h5>
      <img
        src="src/images/sunny.png"
        class="card-img-top weather-icon"
        alt="Sunny"
      />
      <p class="card-text">
        <small class="text-muted"
          ><div class="weather-forecast-temp-max">day 30°</div>
          <div class="weather-forecast-temp-min">night 23°</div></small
        >
      </p>
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
