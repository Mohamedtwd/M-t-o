const url = 'ce1f6fd0822f3caff84df8a9e96c7167';

$('.recherche button').on('click', async () => {
    const ville = $('.recherche input').val();

    if (ville === '') return;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&appid=${url}`);
        const json = await response.json();

        if (json.cod === '404') {
            $('.cacher-ville').text(ville);
            $('.container').css('height', '400px');
            $('.weather-box').removeClass('active');
            $('.weather-details').removeClass('active');
            $('.not-found').addClass('active');
            return;
        }

        const { lat, lon } = json.coord;
        updateCurrentWeather(json);

        await displayForecast(lat, lon);

        const image = $('.weather-box img');
        const temperature = $('.weather-box .temperature');
        const description = $('.weather-box .description');
        const humidity = $('.weather-details .humidity span');
        const wind = $('.weather-details .wind span');

        if ($('.cacher-ville').text() === ville) return;

        $('.cacher-ville').text(ville);
        $('.container').css('height', '555px').addClass('active');
        $('.weather-box').addClass('active');
        $('.weather-details').addClass('active');
        $('.not-found').removeClass('active');

        setTimeout(() => {
            $('.container').removeClass('active');
        }, 2200);

        switch (json.weather[0].main.toLowerCase()) {
            case 'clear':
                image.attr('src', 'images/clear.png');
                break;
            case 'rain':
                image.attr('src', 'images/rain.png');
                break;
            case 'snow':
                image.attr('src', 'images/snow.png');
                break;
            case 'clouds':
                image.attr('src', 'images/cloud.png');
                break;
            case 'mist':
            case 'haze':
                image.attr('src', 'images/mist.png');
                break;
            default:
                image.attr('src', 'images/cloud.png');
                break;
        }

        temperature.html(`${parseInt(json.main.temp)}<span>°C</span>`);
        description.text(json.weather[0].description);
        humidity.text(`${json.main.humidity}%`);
        wind.text(`${parseInt(json.wind.speed)}Km/h`);

        const infoWeather = $('.info-weather');
        const infoHumidity = $('.info-humidity');
        const infoWind = $('.info-wind');

        const cloneInfoWeather = infoWeather.clone().attr('id', 'clone-info-weather').addClass('active-clone');
        const cloneInfoHumidity = infoHumidity.clone().attr('id', 'clone-info-humidity').addClass('active-clone');
        const cloneInfoWind = infoWind.clone().attr('id', 'clone-info-wind').addClass('active-clone');

        setTimeout(() => {
            infoWeather.after(cloneInfoWeather);
            infoHumidity.after(cloneInfoHumidity);
            infoWind.after(cloneInfoWind);
        }, 2200);

        const xcloneInfoWeather = $('.info-weather.active-clone');
        const xcloneInfoHumidity = $('.info-humidity.active-clone');
        const xcloneInfoWind = $('.info-wind.active-clone');

        if (xcloneInfoWeather.length > 0) {
            xcloneInfoWeather.first().removeClass('active-clone');
            xcloneInfoHumidity.first().removeClass('active-clone');
            xcloneInfoWind.first().removeClass('active-clone');

            setTimeout(() => {
                xcloneInfoWeather.first().remove();
                xcloneInfoHumidity.first().remove();
                xcloneInfoWind.first().remove();
            }, 2200);
        }

        async function displayForecast(lat, lon) {
            try {
                const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${url}`);
                const forecastData = await forecastResponse.json();
        
                const forecastBox = $('.forecast-box .forecast-days');
                forecastBox.empty();
        
                forecastData.daily.slice(1, 8).forEach(day => {
                    const date = new Date(day.dt * 1000);
                    const dayName = date.toLocaleDateString('fr-FR', { weekday: 'long' });
                    const temp = Math.round(day.temp.day);
                    const humidity = day.humidity;
                    const windSpeed = Math.round(day.wind_speed);
                    const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
        
                    const forecastHTML = `
                        <div class="forecast-day">
                            <h3>${dayName}</h3>
                            <img src="${icon}" alt="Icône météo">
                            <div class="forecast-day-info">
                                <p>Température : ${temp}°C</p>
                                <p>Humidité : ${humidity}%</p>
                                <p>Vent : ${windSpeed} km/h</p>
                            </div>
                        </div>
                    `;
                    forecastBox.append(forecastHTML);
                });

    } catch (error) {
        console.error("Erreur lors de la récupération des données météo:", error);
    }
});
