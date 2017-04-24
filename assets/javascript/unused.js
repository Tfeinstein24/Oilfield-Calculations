/**
 * Created by SilverDash on 4/23/17.
 */


    





// bmc: this populates the spreadsheet row
function sendSomeDataToSheet() {
    var currentlyCalculatingThis = "annularCapacity";
    var queryURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/formula/" + currentlyCalculatingThis;

    $.ajax({
        url: queryURL,
        method: "PATCH",

        data: {
            "inputOne": 467.95,
            "inputTwo" : 46,
            "inputThree" : 79,
            "inputFour" : 50,
            "inputFive" :82,
            "inputSix" : 3
        }
    }).done(function(response) {
        console.log("Data is inputted:" + response);
    });
}
sendSomeDataToSheet();



// bmc: this function gets ALL data from the spreadsheet
function getSomeDataFromSheet() {
    var queryURL = "https://sheetsu.com/apis/v1.0/5b28081fedac";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
    });
}

// bmc: this calls the function that gets ALL data from the spreadsheet
getSomeDataFromSheet();








$("input[type='radio'][name='diamUnits']").change(function() {
    if ($('#inches').is(':checked')) {
        $('#feet').prop("checked", true);
        $('#cuMeters').prop("checked", false);
    }
});

$("input[type='radio'][name='diamUnits']").change(function() {
    if ($('#centimeters').is(':checked')) {
        $('#meters').prop("checked", true);
        $('#cuMeters').prop("checked", true);
    }
});

$("input[type='radio'][name='depthUnits']").change(function() {
    if ($('#meters').is(':checked')) {
        $('#centimeters').prop("checked", true);
        $('#cuMeters').prop("checked", true);
    }
});

$("input[type='radio'][name='depthUnits']").change(function() {
    if ($('#feet').is(':checked')) {
        $('#inches').prop("checked", true);
        $('#cuMeters').prop("checked", false);
    }
});

$("input[type='radio'][name='volumeUnits']").change(function() {
    if ($('#cuMeters').is(':checked')) {
        $('#centimeters').prop("checked", true);
        $('#meters').prop("checked", true);
    }
});

$("input[type='radio'][name='volumeUnits']").change(function() {
    if ($('#gal').is(':checked') || $('#bbl').is(':checked') || $('#cuFeet').is(':checked')) {
        $('#feet').prop("checked", true);
        $('#inches').prop("checked", true);
    }
});