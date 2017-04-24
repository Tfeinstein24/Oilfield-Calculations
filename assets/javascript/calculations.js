/**
 * Created by SilverDash on 4/22/17.
 */

function calculatePipeVolume() {
    console.log("calculating pipe volume");
    var drillPipeID = $("#drillPipeID").val();
    var drillPipeLength = $("#drillPipeLength").val();

    var formulaName = "pipeVolume"; // bmc: to pass the inputs
    var sheetName = "pipeVol"; // bmc: to get the results

    var unitsRequested = "standardUnits"; // bmc: to get results
    // bmc: this will be an if statement in the future

    var queryGiveURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/formula/" + formulaName; // bmc: to pass inputs

    var queryGetURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/sheets/" + sheetName + "/units/" + unitsRequested; // bmc: to get results

    $.ajax({
        url: queryGiveURL, // bmc: this sends inputs to the front worksheet only. We'll access the calculation sheet in the promise
        method: "PATCH",
        data: {
            "inputOne": drillPipeID,
            "inputTwo" : drillPipeLength
        }
    }).done(function(response) {
        // bmc: we're not doing squat with this response. Instead we're making a separate ajax call to a different worksheet to get the results of the calculations
        $.ajax({
            url: queryGetURL,
            method: "GET"
        }).done(function(response) {

            gallonsPV = response[0].gallons;
            cubicFeetPV = response[0].cubicFeet;
            barrelsPV = response[0].barrels;
            cuMetersAC = response[0].cubicMeters; // bmc: won't be displayed right now because we're only working in standard units

            $("#outputs").html("<br><h3>The Pipe Volume is " +
                    gallonsAC + " gallons, <br>" +
                    cubicFeetAC + " cubic feet, <br>" +
                    barrelsAC + " barrels</h3>");
        });
    });

}

function calculateAnnularCapacity () {
    var outsideDiameter = $("#outsideDiameter").val();
    var insideDiameter = $("#insideDiameter").val();
    var holeDepth = $("#holeDepth").val();

    var sheetName = "annCap"; // bmc: to send inputs
    var formulaName = "annularCapacity"; // bmc: to receive outputs

    var unitsRequested = "standardUnits"; // bmc: to get results
    // bmc: this will be an if statement in the future

    var queryGiveURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/formula/" + formulaName; // bmc: to pass inputs
    var queryGetURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/sheets/" + sheetName + "/units/" + unitsRequested; // bmc: to get outputs

        $.ajax({
            url: queryGiveURL,
            method: "PATCH",
            data: {
                "inputOne": outsideDiameter,
                "inputTwo" : insideDiameter,
                "inputThree" : holeDepth
                // bmc: passing inputs to the front sheet that will then be referenced in the correct calculation sheet
            }
        }).done(function(response) {
            $.ajax({
                url: queryGetURL,
                method: "GET"
            }).done(function(response) {

                gallonsAC = response[0].gallons;
                cubicFeetAC = response[0].cubicFeet;
                barrelsAC = response[0].barrels;
                cuMetersAC = response[0].cubicMeters; // bmc: won't be displayed right now because we're only working in standard units

                // bmc: need to do a loop here to display volume as requested

                $("#outputs").html("<br><h3>The Annular Capacity is " +
                        gallonsAC + " gallons, <br>" +
                        cubicFeetAC + " cubic feet, <br>" +
                        barrelsAC + " barrels</h3>");
            });
        });


}


function calculateFormationIntegrityTest() {
    console.log("calculating FIT, answer is the pressure required in psi");

    var fitRequired = $("#fitRequired").val();
    var mudWeight = $("#mudWeight").val();
    var shoeDepth = $("#shoeDepth").val();

    var formulaName = "formationIntegrityTest"; // bmc: to pass the inputs
    var sheetName = "FIT"; // bmc: to get the results

    var unitsRequested = "standardUnits"; // bmc: to get results
    // bmc: this will be an if statement in the future

    var queryGiveURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/formula/" + formulaName; // bmc: to pass inputs

    var queryGetURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/sheets/" + sheetName + "/units/" + unitsRequested; // bmc: to get results

    $.ajax({
        url: queryGiveURL, // bmc: this sends inputs to the front worksheet only. We'll access the calculation sheet in the promise
        method: "PATCH",
        data: {
            "inputOne": fitRequired,
            "inputTwo" : mudWeight,
            "inputThree" : shoeDepth
        }
    }).done(function(response) {
        // bmc: we're not doing squat with this response. Instead we're making a separate ajax call to a different worksheet to get the results of the calculations
        $.ajax({
            url: queryGetURL,
            method: "GET"
        }).done(function(response) {

            pressureRequired = response[0].pressureRequired;

            $("#outputs").html("<br><h3>The pressure required is " +
                    pressureRequired + " psi</h3>");
        });
    });
}

function calculateFormationTemperature() {
    console.log("calculating formation temp, answer is ");
    // bmc: LEFT OFF HERE
    // bmc: LEFT OFF HERE
    // bmc: LEFT OFF HERE
}

function calculateHydrostaticPressure() {
    console.log("calculating pipe volume");
}

function calculateLeakOffTest() {
    console.log("calculating pipe volume");
}

function calculatePressureGradient() {
    console.log("calculating pipe volume");
}

function calculateSlugCalculation() {
    console.log("calculating pipe volume");
}








