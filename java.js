let $ = document
let searchBtn = $.querySelector('#button-addon1')
let cityName = $.querySelector('#city')
let date = $.querySelector("#date");
let temp = $.querySelector("#temperature")
let humidity = $.querySelector("#humidity")
let windSpeed = $.querySelector("#wind")
let desc = $.querySelector("#description")
let currentBtn = $.querySelector("#button")
let dateData = $.querySelector("#dateData")
let celConv = $.querySelector("#celsius")
let fahConv = $.querySelector("#fahrenheit")
function showWeather(response) {
    cityName.innerHTML = response.data.name
    temp.innerHTML = Math.round(response.data.main.temp)
    humidity.innerHTML = response.data.main.humidity
    windSpeed.innerHTML = Math.round(response.data.wind.speed)
    desc.innerHTML = response.data.weather[0].description;
}
function searched(cityName) {
    celConv.style.pointerEvents = "none"
    let apiKey = "7059cb165caa3316bff682d263a01b1e"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather)
}
function currentLocation(position) {
    console.log(position);
    let apiKey = "7059cb165caa3316bff682d263a01b1e"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather)
}
searchBtn.addEventListener("click", function (event) {
    event.preventDefault()
    let searchBar = $.querySelector('#city-input').value
    searched(searchBar)
})
currentBtn.addEventListener("click", function (event) {
    event.preventDefault()
    navigator.geolocation.getCurrentPosition(currentLocation)
})
fahConv.addEventListener("click", function (event) {
    event.preventDefault()
    fahConv.className = "active"
    celConv.classList.remove("active")
    celConv.className = "inactive"
    let resultValue = +((temp.innerHTML * 9 / 5) + 32)
    temp.innerHTML = resultValue.toFixed(1)
    celConv.style.pointerEvents = "all"
})
celConv.addEventListener("click", function (event) {
    event.preventDefault()
    celConv.className = "active"
    fahConv.classList.remove("active")
    fahConv.className = "inactive"
    let resultValue = +Math.round((temp.innerHTML - 32) / 1.8)
    temp.innerHTML = resultValue
    celConv.style.pointerEvents = "none"
})

function dateHandler(date) {
    let index = date.getDay();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[index];
    days.forEach(function (item) {
        if (item === day) {
            $.querySelector("#fiDay").innerHTML = days[index + 1]
            $.querySelector("#seDay").innerHTML = days[index + 2]
            $.querySelector("#thDay").innerHTML = days[index + 3]
            $.querySelector("#foDay").innerHTML = days[index + 4]
            $.querySelector("#fifDay").innerHTML = days[index + 5]


        }
    })
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}
function dateDataHandler(date) {
    if (date.getMonth() < 10 && date.getDate() < 10) {
        dateData.innerHTML = `0${date.getMonth() + 1}/0${date.getDate()}/${date.getFullYear()}`
    }
    else {
        dateData.innerHTML = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }
}
dateDataHandler(new Date())
date.innerHTML = dateHandler(new Date());
searched("Paris")
celConv.style.pointerEvents = "none"
