function showWeatherInfo() {
    var queryURL = "https://api.wunderground.com/api/cb39f281310e1f9d/conditions/q/TX/Houston.json";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        console.log(response);
       $("#weather").html("Houston Temp: " + response.current_observation.temp_f + "F" + "<br>" + "Current Wind Speed: " + response.current_observation.wind_mph + "mph" + "<br>" + "Wind Direction: " + response.current_observation.wind_dir + "<br>" + "<img src='http://icons.wxug.com/i/c/k/mostlycloudy.gif'>");

    })
}

showWeatherInfo();
