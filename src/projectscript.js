function formatDate(timestamp) {
 let now = new Date(timestamp);
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
 return`${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
let now = new Date(timestamp);
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes= `0${minutes}`;
}
return `${hours}:${minutes}`;
}

function showTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("#temperature");
  h2.innerHTML = `${currentTemperature}°F`;
  let city = response.data.name;
  let h1 = document.querySelector("#location");
  h1.innerHTML = city;
  let dateElement = document.querySelector("#current-dateTime");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let tempDescription = document.querySelector(".current-conditions");
  tempDescription.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  let humidityDescription = response.data.main.humidity;
  humidityElement.innerHTML = `Humidity: ${humidityDescription}%`;
  let windElement = document.querySelector("#wind-speed");
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind: ${windSpeed} km/h`;

}

function search(city) {
  
  let units = "imperial";
  let apiKey = "e6c9e73e7cfe9a8579ac95fa4c71d203";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);

   apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  search(searchInput.value);
  }

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", handleSubmit);

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-12 col-sm-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}
  
search("New York");


