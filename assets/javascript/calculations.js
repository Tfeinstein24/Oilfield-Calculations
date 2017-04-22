/**
 * Created by SilverDash on 4/22/17.
 */

// bmc: this function gets ALL data from the spreadsheet
function getSomeDataFromSheet() {
    // var queryURL = "https://spreadsheets.google.com/feeds/list/1S_r-El6uWQND4MFZkfZ0KohlnKU3yNhk7MzuSHn_8Jg/od6/public/values?alt=json";
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
};

sendSomeDataToSheet();



function calculateAnnularCapacity () {
    
}

$("#inputs").on("submit", function (e){
    e.preventDefault();
    console.log("form was submitted");
    console.log($(this).serialize());

    inputOne = $("#casingID").val();
    console.log("casingID is " + inputOne);

    inputTwo = $("#casingOD").val();
    console.log("casingOD is " + inputTwo);

    inputThree = $("#depth").val();
    console.log("depth is " + inputThree);


    if($('#centimeters').is(':checked')){
        var currentlyCalculatingThis = "annularCapacity";
        var queryURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/formula/" + currentlyCalculatingThis;

        $.ajax({
            url: queryURL,
            method: "PATCH",

            data: {
                "inputOne": inputOne,
                "inputTwo" : inputTwo,
                "inputThree" : inputThree
            }
        }).done(function(response) {
            console.log("Data is inputted:" + response);
            var queryURL = "https://sheetsu.com/apis/v1.0/5b28081fedac";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {
                console.log(response[5].returnOne);
            });
        });

    }

});