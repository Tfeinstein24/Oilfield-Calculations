/**
 * Created by SilverDash on 4/22/17.
 */

function calculatePipeVolume() {
    console.log("calculating pipe volume");
    var drillPipeID = $("#drillPipeID").val();
    var drillPipeLength = $("#drillPipeLength").val();
    var sheetName = "pipeVol";
    var queryURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/sheets/" + sheetName + "/formula/standardUnits";

    $.ajax({
        url: queryURL,
        method: "PATCH",
        data: {
            "innerDiam": drillPipeID,
            "length" : drillPipeLength
        }
    }).done(function(response) {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            gallonsPV = response[0].gallons;
            cubicFeetPV = response[0].cubicFeet;
            barrelsPV = response[0].barrels;
            $("#inputs").append("<br><h3>The Pipe Volume is " + gallonsAC + " gallons, <br>" + cubicFeetAC + " cubic feet, <br>" + barrelsAC + " barrels</h3>");
        });
    });

}

function calculateAnnularCapacity () {
    var outsideDiameter = $("#outsideDiameter").val();
    var insideDiameter = $("#insideDiameter").val();
    var holeDepth = $("#holeDepth").val();
    var sheetName = "annCap";
    var formulaName = "annularCapacity";
    var unitsRequested = "standardUnits";
    var queryGiveURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/formula/" + formulaName;
    var queryGetURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/sheets/" + sheetName + "/units/" + unitsRequested;
    // + ""
        $.ajax({
            url: queryGiveURL,
            method: "PATCH",
            data: {
                "inputOne": outsideDiameter,
                "inputTwo" : insideDiameter,
                "inputThree" : holeDepth
            }
        }).done(function(response) {
            $.ajax({
                url: queryGetURL,
                method: "GET"
            }).done(function(response) {
                gallonsAC = response[0].gallons;
                cubicFeetAC = response[0].cubicFeet;
                barrelsAC = response[0].barrels;
                cuMetersAC = response[0].cubicMeters;

                // bmc: need to do a loop here to display volume as requested

                $("#outputs").html("<br><h3>The Annular Capacity is " + gallonsAC + " gallons, <br>" + cubicFeetAC + " cubic feet, <br>" + barrelsAC + " barrels</h3>");
            });
        });


}


function calculateFormationIntegrityTest() {
    console.log("calculating fit, answer is the pressure required in psi");

}
function calculateFormationTemperature() {
    console.log("calculating formation temp, answer is ");
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








