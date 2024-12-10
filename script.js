$(document).ready(function () {
    const $container = $('.container');
    const $recherche = $('.recherche button');
    const $weatherBox = $('.weather-box');
    const $weatherDetails = $('.weather-details');
    const $erreur = $('.not-found');
    const $cacherVille = $('.cacher-ville');

    $recherche.on('click', function () {
        const url = 'ce1f6fd0822f3caff84df8a9e96c7167';
        const ville = $('.recherche input').val().trim();

        if (ville === '') return;

        $.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&appid=${url}`, function (json) {
            
            if (json.cod === '404') {
                $cacherVille.text(ville);
                $container.css('height', '400px');
                $weatherBox.removeClass('active');
                $weatherDetails.removeClass('active');
                $erreur.addClass('active');
                return;
            }

            const image = $('.weather-box img');
            const $temperature = $('.weather-box .temperature');
            const $description = $('.weather-box .description');
            const $humidity = $('.weather-details .humidity span');
            const $wind = $('.weather-details .wind span');

            if ($cacherVille.text() === ville) return;

            $cacherVille.text(ville);
            $container.css('height', '555px').addClass('active');
            $weatherBox.addClass('active');
            $weatherDetails.addClass('active');
            $erreur.removeClass('active');

            setTimeout(() => {
                $container.removeClass('active');
            }, 2500);

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

            $temperature.html(`${parseInt(json.main.temp)}<span>°C</span>`);
            $description.text(json.weather[0].description);
            $humidity.text(`${json.main.humidity}%`);
            $wind.text(`${parseInt(json.wind.speed)}Km/h`);

            const $infoWeather = $('.info-weather');
            const $infoHumidity = $('.info-humidity');
            const $infoWind = $('.info-wind');

            const $cloneInfoWeather = $infoWeather.clone().attr('id', 'clone-info-weather').addClass('active-clone');
            const $cloneInfoHumidity = $infoHumidity.clone().attr('id', 'clone-info-humidity').addClass('active-clone');
            const $cloneInfoWind = $infoWind.clone().attr('id', 'clone-info-wind').addClass('active-clone');

            setTimeout(() => {
                $infoWeather.after($cloneInfoWeather);
                $infoHumidity.after($cloneInfoHumidity);
                $infoWind.after($cloneInfoWind);
            }, 2200);

            const $xcloneInfoWeather = $('.info-weather.active-clone');
            const $xcloneInfoHumidity = $('.info-humidity.active-clone');
            const $xcloneInfoWind = $('.info-wind.active-clone');

            if ($xcloneInfoWeather.length > 0) {
                $xcloneInfoWeather.first().removeClass('active-clone');
                $xcloneInfoHumidity.first().removeClass('active-clone');
                $xcloneInfoWind.first().removeClass('active-clone');

                setTimeout(() => {
                    $xcloneInfoWeather.first().remove();
                    $xcloneInfoHumidity.first().remove();
                    $xcloneInfoWind.first().remove();
                }, 2200);
            }
        });
    });
});
