const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursdsay",
  "Friday",
  "Saturday",
];

let date = new Date();
let currentDate = `${dayNames[date.getDay()]} ${date.toLocaleTimeString(
  "it-IT",
  { timeStyle: "short" }
)}`;

document.querySelector(".current-date").innerHTML = currentDate;

function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  let apiKey = "e6275d42883d7f2a6c4f0e2e18e90b64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(setWeatherByCity);
}

function setWeatherByCity(response) {
  document.querySelector(`h1`).innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#clouds"
  ).innerHTML = `Clouds: ${response.data.clouds.all} %`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind:${response.data.wind.speed} m/s`;

  //let presipitation = response.data.main.presipitation;
  console.log(response.data);
}

function setCelsium(event) {
  event.preventDefault();
  document.querySelector(".temperature").innerHTML = 37;
}

function setFahrenfeit(event) {
  event.preventDefault();
  document.querySelector(".temperature").innerHTML = 99;
}

function showPosition(position) {
  let apiKey = "e6275d42883d7f2a6c4f0e2e18e90b64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function getWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector(".temperature").innerHTML = temperature;
  document.querySelector(`h1`).innerHTML = `${response.data.name}`;
  document.querySelector(
    "#clouds"
  ).innerHTML = `Clouds: ${response.data.clouds.all} %`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${response.data.wind.speed} m/s`;
}

function setCurrentLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", getCity);

let celsium = document.querySelector("#celsium");
celsium.addEventListener("click", setCelsium);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", setFahrenfeit);

let buttonCurrentLocation = document.querySelector("#button-current-location");
buttonCurrentLocation.addEventListener("click", setCurrentLocationWeather);
