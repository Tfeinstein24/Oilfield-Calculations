
 
function showWeatherInfo() {
    var queryURL = "https://api.wunderground.com/api/cb39f281310e1f9d/satellite/q/TX/Houston.json";
    

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        console.log(response);
        var pictureSRC = response.satellite.image_url_vis;
        var image = $("<img id='satellite2'>")
        image.attr("src", pictureSRC);
        $("#satellite").append(image);

    })
}

showWeatherInfo();
