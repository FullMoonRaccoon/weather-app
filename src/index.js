const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursdsay",
  "Friday",
  "Saturday",
];

function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  let apiKey = "e6275d42883d7f2a6c4f0e2e18e90b64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
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
    response.data.wind.speed
  )} m/s`;

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

//code that runs when the page loads and global variables
let celsiusTemperature = null;
let date = new Date();
let currentDate = `${dayNames[date.getDay()]} ${date.toLocaleTimeString(
  "it-IT",
  { timeStyle: "short" }
)}`;
document.querySelector(".current-date").innerHTML = currentDate;

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", getCity);

let celsius = document.querySelector("#celsium");
celsium.addEventListener("click", setCelsium);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", setFahrenheit);

let buttonCurrentLocation = document.querySelector("#button-current-location");
buttonCurrentLocation.addEventListener("click", getCurrentLocation);

getCurrentLocation(new Event("load"));
