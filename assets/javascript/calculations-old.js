/**
 * Created by SilverDash on 4/22/17.
 */

// bmc: We start with this at null because we'll need it to abort the ajax call if the user clicks elsewhere
var bonsAjaxCall = null;

function calculateInnerCapacity() {
    console.log("calculating inner capacity");

    var diameter = $("#diameter").val();

    var formulaName = "innerCapacity"; // bmc: to pass the inputs
    var sheetName = "innCap"; // bmc: to get the results

    var queryGiveURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/formula/" + formulaName; // bmc: to pass inputs

    var queryGetURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/sheets/" + sheetName + "/rowChoice/calcLine"; // bmc: to get results

    bonsAjaxCall = $.ajax({
        url: queryGiveURL, // bmc: this sends inputs to the front worksheet only. We'll access the calculation sheet in the promise
        method: "PATCH",
        data: {
            "inputOne": diameter
        }
    }).done(function(response) {
        // bmc: we're not doing squat with this response. Instead we're making a separate ajax call to a different worksheet to get the results of the calculations
        $.ajax({
            url: queryGetURL,
            method: "GET"
        }).done(function(response) {

            barrelsPerFoot = response[0].barrelsPerFoot;
            feetPerBarrel = response[0].feetPerBarrel;
            gallonsPerFoot = response[0].gallonsPerFoot;
            feetPerGallon = response[0].feetPerGallon;

            $("#outputs").html("<br><h3 class='result'>The Inner Capacity is <br>" +
                    barrelsPerFoot + " bbl/ft, <br>" +
                    feetPerBarrel + " ft/bbl, <br>" +
                    gallonsPerFoot + " gal/ft, <br>" +
                    feetPerGallon + " ft/gal</h3>");
        });
    });

}

function calculateAnnularCapacity () {
    var outsideDiameter = $("#outsideDiameter").val();
    var insideDiameter = $("#insideDiameter").val();
    var holeDepth = $("#holeDepth").val();

    var sheetName = "annCap"; // bmc: to send inputs
    var formulaName = "annularCapacity"; // bmc: to receive outputs

    var queryGiveURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/formula/" + formulaName; // bmc: to pass inputs

    var queryGetURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/sheets/" + sheetName + "/rowChoice/calcLine"; // bmc: to get results

        bonsAjaxCall = $.ajax({
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

                gallonsPerFoot = response[0].gallonsPerFoot;
                feetPerGallon = response[0].feetPerGallon;
                barrelsPerFoot = response[0].barrelsPerFoot;
                feetPerBarrel = response[0].feetPerBarrel; // bmc: won't be displayed right now because we're only working in standard units

                // bmc: need to do a loop here to display volume as requested

                $("#outputs").html("<br><h3>The Annular Capacity is " +
                        barrelsPerFoot + " bbl/ft" +
                        feetPerBarrel + " ft/bbl" +
                        gallonsPerFoot + " gal/ft, <br>" +
                        feetPerGallon + " ft/gal, <br></h3>");
            });
        });


}

function calculateAnnularVelocity () {
    var pumpOutput = $("#pumpOutput").val();
    var bigDiam = $("#bigDiam").val();
    var smallDiam = $("#smallDiam").val();

    var sheetName = "annVel"; // bmc: to send inputs
    var formulaName = "annularVelocity"; // bmc: to receive outputs

    var queryGiveURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/formula/" + formulaName; // bmc: to pass inputs

    var queryGetURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/sheets/" + sheetName + "/rowChoice/calcLine"; // bmc: to get results

        bonsAjaxCall = $.ajax({
            url: queryGiveURL,
            method: "PATCH",
            data: {
                "inputOne": pumpOutput,
                "inputTwo" : bigDiam,
                "inputThree" : smallDiam
                // bmc: passing inputs to the front sheet that will then be referenced in the correct calculation sheet
            }
        }).done(function(response) {
            $.ajax({
                url: queryGetURL,
                method: "GET"
            }).done(function(response) {

                feetPerMin = response[0].feetPerMin;
                feetPerSec = response[0].feetPerSec;

                $("#outputs").html("<br><h3>The Annular Velocity is <br>" +
                        feetPerMin + " ft/min and <br>" +
                        feetPerSec + " ft/sec <br></h3>");
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

    var queryGiveURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/formula/" + formulaName; // bmc: to pass inputs

    var queryGetURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/sheets/" + sheetName + "/rowChoice/calcLine"; // bmc: to get results

    bonsAjaxCall =$.ajax({
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

            presRequired = response[0].presRequired;

            $("#outputs").html("<br><h3>The pressure required is <br>" +
                    presRequired + " psi</h3>");
        });
    });
}

function calculateFormationTemperature() {
    console.log("calculating formation temp, answer is ");
    var surfTemp = $("#surfTemp").val();
    var tempGrad = $("#tempGrad").val();
    var formDepth = $("#formDepth").val();
    var formTemp = ""; // answer
    var formulaName = "formationIntegrityTest"; // bmc: to pass the inputs
    var sheetName = "FIT"; // bmc: to get the results

    var queryGiveURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/formula/" + formulaName; // bmc: to pass inputs

    var queryGetURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/sheets/" + sheetName + "/rowChoice/calcLine"; // bmc: to get results

    bonsAjaxCall =$.ajax({
        url: queryGiveURL, // bmc: this sends inputs to the front worksheet only. We'll access the calculation sheet in the promise
        method: "PATCH",
        data: {
            "inputOne": surfTemp,
            "inputTwo" : tempGrad,
            "inputThree" : formDepth
        }
    }).done(function(response) {
        // bmc: we're not doing squat with this response. Instead we're making a separate ajax call to a different worksheet to get the results of the calculations
        $.ajax({
            url: queryGetURL,
            method: "GET"
        }).done(function(response) {

            formTemp = response[0].formTemp;

            $("#outputs").html("<br><h3>The formation temperature is <br>" +
                    formTemp + " degrees F</h3>");
        });
    });
}

function calculateHydrostaticPressure() {
    console.log("calculating hydro pressure");

    var mudWeight = $("#mudWeight").val();
    var verticalDepthHP = $("#verticalDepthHP").val();
    var hydroPres = ""; // answer
    var formulaName = "hydrostaticPressure"; // bmc: to pass the inputs
    var sheetName = "hydroPres"; // bmc: to get the results

    var queryGiveURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/formula/" + formulaName; // bmc: to pass inputs

    var queryGetURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/sheets/" + sheetName + "/rowChoice/calcLine"; // bmc: to get results

    bonsAjaxCall =$.ajax({
        url: queryGiveURL, // bmc: this sends inputs to the front worksheet only. We'll access the calculation sheet in the promise
        method: "PATCH",
        data: {
            "inputOne": mudWeight,
            "inputTwo" : verticalDepthHP
        }
    }).done(function(response) {
        // bmc: we're not doing squat with this response. Instead we're making a separate ajax call to a different worksheet to get the results of the calculations
        $.ajax({
            url: queryGetURL,
            method: "GET"
        }).done(function(response) {

            hydroPres = response[0].hydroPres;

            $("#outputs").html("<br><h3>The hydrostatic pressure is <br>" +
                    hydroPres + "psi</h3>");
        });
    });
}

function calculateLeakOffTest() {
    console.log("calculating LOT");

    var lotPressure = $("#lotPressure").val();
    var mudWeightLOT = $("#mudWeightLOT").val();
    var shoeDepthLOT = $("#shoeDepthLOT").val();
    var lotEquivMudWeight = ""; // answer
    var formulaName = "leakOffTest"; // bmc: to pass the inputs
    var sheetName = "LOT"; // bmc: to get the results

    var queryGiveURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/formula/" + formulaName; // bmc: to pass inputs

    var queryGetURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/sheets/" + sheetName + "/rowChoice/calcLine"; // bmc: to get results

    bonsAjaxCall =$.ajax({
        url: queryGiveURL, // bmc: this sends inputs to the front worksheet only. We'll access the calculation sheet in the promise
        method: "PATCH",
        data: {
            "inputOne": lotPressure,
            "inputTwo" : mudWeightLOT,
            "inputThree" : shoeDepthLOT
        }
    }).done(function(response) {
        // bmc: we're not doing squat with this response. Instead we're making a separate ajax call to a different worksheet to get the results of the calculations
        $.ajax({
            url: queryGetURL,
            method: "GET"
        }).done(function(response) {

            lotEquivMudWeight = response[0].lotEquivMudWeight;

            $("#outputs").html("<br><h3>The LOT equivalent mud weight is <br>" +
                    lotEquivMudWeight + "ppg</h3>");
        });
    });
}

function calculatePressureGradient() {
    console.log("calculating pressure gradient");

    var mudWeightPG = $("#mudWeightPG").val();
    var presGrad = ""; // bmc: answer
    var formulaName = "pressureGradient"; // bmc: to pass the inputs
    var sheetName = "presGrad"; // bmc: to get the results

    var queryGiveURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/formula/" + formulaName; // bmc: to pass inputs

    var queryGetURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/sheets/" + sheetName + "/rowChoice/calcLine"; // bmc: to get results

    bonsAjaxCall =$.ajax({
        url: queryGiveURL, // bmc: this sends inputs to the front worksheet only. We'll access the calculation sheet in the promise
        method: "PATCH",
        data: {
            "inputOne": mudWeightPG
        }
    }).done(function(response) {
        // bmc: we're not doing squat with this response. Instead we're making a separate ajax call to a different worksheet to get the results of the calculations
        $.ajax({
            url: queryGetURL,
            method: "GET"
        }).done(function(response) {

            presGrad = response[0].presGrad;

            $("#outputs").html("<br><h3 class='result'>The pressure gradient is <br>" +
                    presGrad + " psi/ft</h3>");
        });
    });
}

function calculateSlugCalculation() {
    console.log("calculating slug stuff");
    var pipeLength = $("#pipeLength").val();
    var dpCapacity = $("#dpCapacity").val();
    var currentMudWeight = $("#currentMudWeight").val();
    var slugWeight = $("#slugWeight").val();
    var hydroPresReq = ""; // answer
    var presGradDif = ""; // answer
    var lengthOfSludInDP = ""; // answer
    var slugVolume = ""; // answer
    var formulaName = "slugCalculation"; // bmc: to pass the inputs
    var sheetName = "slugCalc"; // bmc: to get the results

    var queryGiveURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/formula/" + formulaName; // bmc: to pass inputs

    var queryGetURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/sheets/" + sheetName + "/rowChoice/calcLine"; // bmc: to get results

    bonsAjaxCall =$.ajax({
        url: queryGiveURL, // bmc: this sends inputs to the front worksheet only. We'll access the calculation sheet in the promise
        method: "PATCH",
        data: {
            "inputOne": pipeLength,
            "inputTwo" : dpCapacity,
            "inputThree" : currentMudWeight,
            "inputFour" : slugWeight
        }
    }).done(function(response) {
        // bmc: we're not doing squat with this response. Instead we're making a separate ajax call to a different worksheet to get the results of the calculations
        $.ajax({
            url: queryGetURL,
            method: "GET"
        }).done(function(response) {

            hydroPresReq = response[0].hydroPresReq;
            presGradDif = response[0].presGradDif;
            lengthOfSludInDP = response[0].lengthOfSludInDP;
            slugVolume = response[0].slugVolume;

            $("#outputs").html("<br><h3>The results of your slug calculations are as follows:<br>The hydrostatic pressure required to give desired drop inside drill pipe is " +
                    hydroPresReq + " psi<br>The difference in pressure gradient between slug and current mud weight is " + presGradDif + "psi/ft<br>The ength of slug in drill pipe is " + lengthOfSludInDP + "feet<br>And the slug volume is " + slugVolume + "bbl</h3>");
        });
    });
}







