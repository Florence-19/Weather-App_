 function refreshWeather(response) {
    let cityElement = document.querySelector("#city");
    let timeElement = document.querySelector("#time");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#Humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(new Date()); // Use current date
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

    getForecast(response.data.city);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "1834facf4tofb44128fb0450968adb39";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search_Location");
    searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
}

function getForecast(city) {
    let apiKey = "1834facf4tofb44128fb0450968adb39";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
            forecastHtml += `
                <div class="col">
                    <strong class="days">
                        <div class="weather-forecast-date">${formatDay(day.time)}</div>
                    </strong><br>
                    <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
                    <div class="temp">
                        <div class="low-temp"><strong>${Math.round(day.temperature.maximum)}º</strong></div>
                        <div class="low-temp">${Math.round(day.temperature.minimum)}º</div>
                </div>
            </div>
            `;
        }
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#submit");
searchFormElement.addEventListener("submit", handleSearchSubmit);
