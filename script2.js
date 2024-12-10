const container = document.querySelector('.container');
const recherche = document.querySelector('.recherche button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const erreur = document.querySelector('.not-found');
const cacherVille = document.querySelector('.cacher-ville');

recherche.addEventListener('click', async () => {

    const url = 'ce1f6fd0822f3caff84df8a9e96c7167';
    const ville = document.querySelector('.recherche input').value;

    if (ville === '') return;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&appid=${url}`);
        const json = await response.json();

        if (json.cod === '404') {
            cacherVille.textContent = ville;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            erreur.classList.add('active');
            return;
        }

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        if (cacherVille.textContent === ville) return;

        cacherVille.textContent = ville;
        container.style.height = '555px';
        container.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        erreur.classList.remove('active');

        setTimeout(() => {
            container.classList.remove('active');
        }, 2500);

        switch (json.weather[0].main.toLowerCase()) {
            case 'clear':
                image.src = 'images/clear.png';
                break;
            case 'rain':
                image.src = 'images/rain.png';
                break;
            case 'snow':
                image.src = 'images/snow.png';
                break;
            case 'clouds':
                image.src = 'images/cloud.png';
                break;
            case 'mist':
            case 'haze':
                image.src = 'images/mist.png';
                break;
            default:
                image.src = 'images/cloud.png';
                break;
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        const infoWeather = document.querySelector('.info-weather');
        const infoHumidity = document.querySelector('.info-humidity');
        const infoWind = document.querySelector('.info-wind');

        const cloneInfoWeather = infoWeather.cloneNode(true);
        const cloneInfoHumidity = infoHumidity.cloneNode(true);
        const cloneInfoWind = infoWind.cloneNode(true);

        cloneInfoWeather.id = 'clone-info-weather';
        cloneInfoWeather.classList.add('active-clone');
        cloneInfoHumidity.id = 'clone-info-humidity';
        cloneInfoHumidity.classList.add('active-clone');
        cloneInfoWind.id = 'clone-info-wind';
        cloneInfoWind.classList.add('active-clone');

        setTimeout(() => {
            infoWeather.insertAdjacentElement('afterend', cloneInfoWeather);
            infoHumidity.insertAdjacentElement('afterend', cloneInfoHumidity);
            infoWind.insertAdjacentElement('afterend', cloneInfoWind);
        }, 2200);

        const xcloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
        const xcloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
        const xcloneInfoWind = document.querySelectorAll('.info-wind.active-clone');

        if (xcloneInfoWeather.length > 0) {
            xcloneInfoWeather[0].classList.remove('active-clone');
            xcloneInfoHumidity[0].classList.remove('active-clone');
            xcloneInfoWind[0].classList.remove('active-clone');

            setTimeout(() => {
                xcloneInfoWeather[0].remove();
                xcloneInfoHumidity[0].remove();
                xcloneInfoWind[0].remove();
            }, 2200);
        }

    } catch (error) {
        console.error("Erreur lors de la récupération des données météo:", error);
    }
});
