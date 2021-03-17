let now = new Date();
let h2 = document.querySelector(".current-dateTime");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

h2.innerHTML = `${day} ${hours}: ${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector(".location");
  h1.innerHTML = `${searchInput.value}`;
  let units = "imperial";
  let apiKey = "e6c9e73e7cfe9a8579ac95fa4c71d203";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector(".temperature");
  h2.innerHTML = `${currentTemperature}°F`;
  let city = response.data.name;
  let h1 = document.querySelector(".location");
  h1.innerHTML = city;
  let tempDescription = document.querySelector(".current-conditions");
  tempDescription.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  let humidityDescription = response.data.main.humidity;
  humidityElement.innerHTML = `Humidity: ${humidityDescription}%`;
  let windElement = document.querySelector("#wind-speed");
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind: 🌬 ${windSpeed} mph`;

}
  axios.get(apiUrl).then(showTemperature);




