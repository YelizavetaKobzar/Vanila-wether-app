function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function displayForcast() {
  let focastELement = document.querySelector("#forecast");
  let forcastHTML = `<div class="row">`;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      ` 
              <div class="col" style="width: 10rem">
                <img
                  src="http://openweathermap.org/img/wn/01d@2x.png"
                  alt="sunny"
                  width="42"
                />
                <div class="card-body">
                  <h5 class="wether-forecast-day">${day}</h5>
                </div>
                <div class="forecast-temperature">
                  <span class="forecast-temperature-max">13˚</span>
                  <span class="forecast-temperature-min">3˚</span>
                </div>
              </div>
              `;
  });

  forcastHTML = forcastHTML + `</div>`;
  focastELement.innerHTML = forcastHTML;
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let descriotionElement = document.querySelector("#description");
  descriotionElement.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "c9a19e3b50cdba4a995a8e756cc2f76f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  console.log(city);
  search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

displayForcast();
