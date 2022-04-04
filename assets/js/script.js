$(function(){
    // create variables and assign them to DOM elements
    var inputEl = $('#cityInput');
    var searchEl = $('#searchBtn');
    var cityNameEl = $('#cityName');
    var weatherIcon = $('#currentIcon')
    var TempEl = $('#temp');
    var HumidityEl = $('#humidity')
    var WindEl = $('#windSpeed')
    var UvIndexEl = $('#uvIndex')
    var forecast = $('#forecast')


    function getWeather(cityName){

        // This is our API Key
        var APIKey = "a06d944ede27cc09def4a9395b9e5551";
        userInput = '';

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey,
            method: "GET"
        })
        .then(function(response) {
            console.log(response);
            cityNameEl.text(response.name);
            TempEl.text(((response.main.temp - 273.15) * 9/5 + 32) + "ºF");
            HumidityEl.text(response.main.humidity + "%");
            WindEl.text(response.wind.speed + " mph");
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + APIKey,
                method: "GET" 
            })
            .then(function(forecastResponse) {
                console.log(forecastResponse)
                for(i = 0; i < forecastResponse.list.length ; i += 8) {
                    forecast.append(`<div>${((forecastResponse.list[i].main.temp - 273.15) * 9/5 + 32)}</div>`);
                    weatherIcon.attr("src", "https://openweathermap.org/img/wn/" + forecastResponse.list[i].weather[i].icon + "@4x.png")
                }
            })
        })
    }

    searchEl.on("click", function() {
        getWeather(inputEl.val());
    })
    inputEl.on("keypress", function(e) {
        if(e.key === 'Enter') {
            getWeather(inputEl.val());
        }
    })
})

