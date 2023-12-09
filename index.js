const apiKey = "7e60113b15c926c54ec5e8417e137b19";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?appid=7e60113b15c926c54ec5e8417e137b19&units=metric&q=";

const input = document.querySelector('.search input');
const searcBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const card = document.querySelector('.card');

async function checkWeather(cityName) {
    const response = await fetch(apiUrl + cityName);

    if (response.status === 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
        return;
    }

    if (response.status === 200) {
        document.querySelector('.error').style.display = 'none';
        document.querySelector('.weather').style.display = 'block';

        const data = await response.json();
        console.log(data);
        displayWeather(data);
    }

    console.error("Unable to fetch weather data.");
}

function displayWeather(data) {
    const city = document.querySelector('.city');
    city.innerHTML = data.name;
    const temp = document.querySelector('.temp');
    temp.innerHTML = Math.round(data.main.temp) + '°C';
    const humidity = document.querySelector('.humidity');
    humidity.innerHTML = data.main.humidity + '%';
    const wind = document.querySelector('.wind');
    wind.innerHTML = data.wind.speed + ' m/s';
    const atmosphere = document.querySelector('.atmosphere');
    let atmosphereData = data.weather[0].description
    atmosphere.innerHTML = atmosphereData.charAt(0).toUpperCase() + atmosphereData.slice(1);

    const { backgroundImage } = getWeatherBackgroundImg(data.weather[0].main.toLowerCase());
    const { icon } = getWeatherIcon(data.weather[0].icon)
    // TODO: add fallback image source for weather values we don't support
    weatherIcon.src = icon;
    card.style.backgroundImage = backgroundImage;


    document.querySelector('.weather').style.display = 'block';
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + input.value + "')"
}

function getWeatherIcon(weather) {
    return {
        icon: `https://openweathermap.org/img/wn/${weather}@4x.png`
    }
}

function getWeatherBackgroundImg(weather) {
    return {
        backgroundImage: `url(images/card-${weather}.jpg)`
    };
}

function handleKeyPress(event) {
    if (input.value.trim() !== "" && event.keyCode === 13) {
        checkWeather(input.value)
    }
}

input.addEventListener("keypress", handleKeyPress)
