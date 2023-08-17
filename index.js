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
    }

    if (response.status === 200) {
        document.querySelector('.error').style.display = 'none';
        document.querySelector('.weather').style.display = 'block';
    }

    let data = await response.json();

    console.log(data);

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

    switch (data.weather[0].main) {
        case 'Clear':
            weatherIcon.src = 'images/clear.png'
            card.style.backgroundImage = "url(images/card-clear.jpg)"
            break;
        case 'Clouds':
            weatherIcon.src = 'images/clouds.png'
            card.style.backgroundImage = "url(images/card-clouds.jpg)"
            break;
        case 'Drizzle':
            weatherIcon.src = 'images/drizzle.png'
            card.style.backgroundImage = "url(images/card-drizzle.jpg)"
            break;
        case 'Mist':
            weatherIcon.src = 'images/mist.png'
            card.style.backgroundImage = "url(images/card-mist.jpg)"
            break;
        case 'Rain':
            weatherIcon.src = 'images/rain.png'
            card.style.backgroundImage = "url(images/card-rain.jpg)"
            break;
        case 'Snow':
            weatherIcon.src = 'images/snow.png'
            card.style.backgroundImage = "url(images/card-snow.jpg)"
            break;
        case 'Smoke':
            weatherIcon.src = 'images/smoke.png'
            card.style.backgroundImage = "url(images/card-smoke.jpg)"
            break;
        case 'Thunderstorm':
            weatherIcon.src = 'images/thunder.png'
            card.style.backgroundImage = "url(images/card-thunder.jpg)"
            break;
        case 'Squall':
            weatherIcon.src = 'images/squall.png'
            card.style.backgroundImage = "url(images/card-squall.jpg)"
            break;
        case 'Sand':
            weatherIcon.src = 'images/sand.png'
            card.style.backgroundImage = "url(images/card-sand.jpg)"
            break;
        case 'Ash':
            weatherIcon.src = 'images/ash.png'
            card.style.backgroundImage = "url(images/card-ash.jpg)"
            break;
        case 'Haze':
            weatherIcon.src = 'images/haze.png'
            card.style.backgroundImage = "url(images/card-haze.jpg)"
            break;
        case 'Dust':
            weatherIcon.src = 'images/dust.png'
            card.style.backgroundImage = "url(images/card-dust.jpg)"
            break;
        case 'Tornado':
            weatherIcon.src = 'images/tornado.png'
            card.style.backgroundImage = "url(images/card-tornado.jpg)"
            break;
        default:
            console.log("None match!!!")
    }

    document.querySelector('.weather').style.display = 'block';
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + input.value + "')"
}

function enterKeypress(event) {
    if (input.value.length > 0 && event.keyCode === 13) {
        checkWeather(input.value)
    }
}

input.addEventListener("keypress", enterKeypress)
