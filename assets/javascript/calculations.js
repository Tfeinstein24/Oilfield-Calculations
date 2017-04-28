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

            // bmc: reference just this user and his IC data
            var thisUserIC = thisUserDatabase.child("IC");
            console.log("the IC part for this user is : " + thisUserIC);

            // bmc: create a set of data in firebase from the information inputs and outputs
            thisUserIC.push({
                innerDiam: diameter + " inches",
                barrelsPerFoot: barrelsPerFoot + " bbl/ft",
                feetPerBarrel: feetPerBarrel + " ft/bbl",
                gallonsPerFoot: gallonsPerFoot + " gal/ft",
                feetPerGallon: feetPerGallon + " ft/gal"
            });

            // // bmc: put the information in the list of saved calculations

            $("#savedCalcs > tbody").append(
                    "<tr><td>" + diameter + " inches" +
                    "</td><td>" + barrelsPerFoot + " bbl/ft" +
                    "</td><td>" + feetPerBarrel + " ft/bbl" +
                    "</td><td>" + gallonsPerFoot + " gal/ft" +
                    "</td><td>" + feetPerGallon + " ft/gal" +
                    "</td></tr>");

        });
    });

}

function calculateAnnularCapacity () {
    var outsideDiameter = $("#outsideDiameter").val();
    var insideDiameter = $("#insideDiameter").val();

    var sheetName = "annCap"; // bmc: to send inputs
    var formulaName = "annularCapacity"; // bmc: to receive outputs

    var queryGiveURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/formula/" + formulaName; // bmc: to pass inputs

    var queryGetURL = "https://sheetsu.com/apis/v1.0/5b28081fedac/sheets/" + sheetName + "/rowChoice/calcLine"; // bmc: to get results

        bonsAjaxCall = $.ajax({
            url: queryGiveURL,
            method: "PATCH",
            data: {
                "inputOne": outsideDiameter,
                "inputTwo" : insideDiameter
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

                // bmc: reference just this user and his IC data
                var thisUserAC = thisUserDatabase.child("AC");
                console.log("the AC part for this user is : " + thisUserAC);

                // bmc: create a set of data in firebase from the information inputs and outputs
                thisUserAC.push({
                    innerDiam: insideDiameter + " inches",
                    outsideDiam: outsideDiameter + " inches",
                    barrelsPerFoot: barrelsPerFoot + " bbl/ft",
                    feetPerBarrel: feetPerBarrel + " ft/bbl",
                    gallonsPerFoot: gallonsPerFoot + " gal/ft",
                    feetPerGallon: feetPerGallon + " ft/gal"
                });

                // // bmc: put the information in the list of saved calculations

                $("#savedCalcs > tbody").append(
                        "<tr><td>" + insideDiameter + " inches" +
                        "</td><td>" + outsideDiameter + " inches" +
                        "</td><td>" + barrelsPerFoot + " bbl/ft" +
                        "</td><td>" + feetPerBarrel + " ft/bbl" +
                        "</td><td>" + gallonsPerFoot + " gal/ft" +
                        "</td><td>" + feetPerGallon + " ft/gal" +
                        "</td></tr>");
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

                // bmc: reference just this user and his IC data
                var thisUserAV = thisUserDatabase.child("AV");
                console.log("the AV part for this user is : " + thisUserAV);

                // bmc: create a set of data in firebase from the information inputs and outputs
                thisUserAV.push({
                    smallDiam: smallDiam + " inches",
                    bigDiam: bigDiam + " inches",
                    barrelsPerMin: pumpOutput + " bbl/min",
                    feetPerMin: feetPerMin + " ft/min",
                    feetPerSec: feetPerSec + " ft/sec"
                });

                // // bmc: put the information in the list of saved calculations

                $("#savedCalcs > tbody").append(
                        "<tr><td>" + pumpOutput + " inches" +
                        "</td><td>" + bigDiam + " bbl/ft" +
                        "</td><td>" + smallDiam + " ft/bbl" +
                        "</td><td>" + feetPerMin + " gal/ft" +
                        "</td><td>" + feetPerSec + " ft/gal" +
                        "</td></tr>");
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

            // bmc: reference just this user and his IC data
            var thisUserFIT = thisUserDatabase.child("FIT");
            console.log("the FIT part for this user is : " + thisUserFIT);

            // bmc: create a set of data in firebase from the information inputs and outputs
            thisUserFIT.push({
                fitRequired: fitRequired + " ppg",
                mudWeight: mudWeight + " ppg",
                shoeDepth: shoeDepth + " feet",
                gallonsPerFoot: presRequired + " psi"
            });

            // // bmc: put the information in the list of saved calculations

            $("#savedCalcs > tbody").append(
                    "<tr><td>" + fitRequired + " ppg" +
                    "</td><td>" + mudWeight + " ppg" +
                    "</td><td>" + shoeDepth + " feet" +
                    "</td><td>" + presRequired + " psi" +
                    "</td></tr>");
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

            // bmc: reference just this user and his IC data
            var thisUserFT = thisUserDatabase.child("FT");
            console.log("the FT part for this user is : " + thisUserFT);

            // bmc: create a set of data in firebase from the information inputs and outputs
            thisUserFT.push({
                surfTemp: surfTemp + " degrees F",
                tempGrad: tempGrad + " degrees F",
                formDepth: formDepth + " feet",
                formTemp: formTemp + " degrees F"
            });

            // // bmc: put the information in the list of saved calculations

            $("#savedCalcs > tbody").append(
                    "<tr><td>" + surfTemp + " degrees F" +
                    "</td><td>" + tempGrad + " degrees F" +
                    "</td><td>" + formDepth + " feet" +
                    "</td><td>" + formTemp + " degrees F" +
                    "</td></tr>");
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

            // bmc: reference just this user and his IC data
            var thisUserHP = thisUserDatabase.child("HP");
            console.log("the HP part for this user is : " + thisUserHP);

            // bmc: create a set of data in firebase from the information inputs and outputs
            thisUserHP.push({
                mudWeight: mudWeight + " ppg",
                verticalDepth: verticalDepthHP + " feet",
                hydroPres: hydroPres + " psi"
            });

            // // bmc: put the information in the list of saved calculations

            $("#savedCalcs > tbody").append(
                    "<tr><td>" + mudWeight + " ppg" +
                    "</td><td>" + verticalDepthHP + " feet" +
                    "</td><td>" + hydroPres + " psi" +
                    "</td></tr>");
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

            // bmc: reference just this user and his IC data
            var thisUserLOT = thisUserDatabase.child("LOT");
            console.log("the LOT part for this user is : " + thisUserLOT);

            // bmc: create a set of data in firebase from the information inputs and outputs
            thisUserLOT.push({
                lotPressure: lotPressure + " psi",
                mudWeight: mudWeightLOT + " ppg",
                shoeDepth: shoeDepthLOT + " feet",
                lotEquivMudWeight: lotEquivMudWeight + " ppg",
            });

            // // bmc: put the information in the list of saved calculations

            $("#savedCalcs > tbody").append(
                    "<tr><td>" + lotPressure + " psi" +
                    "</td><td>" + mudWeightLOT + " ppg" +
                    "</td><td>" + shoeDepthLOT + " feet" +
                    "</td><td>" + lotEquivMudWeight + " ppg" +
                    "</td></tr>");
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

            // bmc: reference just this user and his IC data
            var thisUserPG = thisUserDatabase.child("PG");
            console.log("the PG part for this user is : " + thisUserPG);

            // bmc: create a set of data in firebase from the information inputs and outputs
            thisUserPG.push({
                mudWeight: mudWeightPG + " ppg",
                presGrad: presGrad + " psi/ft"
            });

            // // bmc: put the information in the list of saved calculations

            $("#savedCalcs > tbody").append(
                    "<tr><td>" + mudWeightPG + " ppg" +
                    "</td><td>" + presGrad + " psi/ft" +
                    "</td></tr>");
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
                    hydroPresReq + " psi<br>The difference in pressure gradient between slug and current mud weight is " + presGradDif + "psi/ft<br>The length of slug in drill pipe is " + lengthOfSludInDP + "feet<br>And the slug volume is " + slugVolume + "bbl</h3>");

            // bmc: reference just this user and his IC data
            var thisUserSC = thisUserDatabase.child("SC");
            console.log("the SC part for this user is : " + thisUserSC);

            // bmc: create a set of data in firebase from the information inputs and outputs
            thisUserSC.push({
                pipeLength: pipeLength + " feet",
                dpCapacity: dpCapacity + " bbl/ft",
                currentMudWeight: currentMudWeight + " ppg",
                slugWeight: slugWeight + " ppg",
                hydroPresReq: hydroPresReq + " psi",
                presGradDif: presGradDif + " psi/ft",
                lengthOfSludInDP: lengthOfSludInDP + " feet",
                slugVolume: slugVolume + " bbl"
            });

            // // bmc: put the information in the list of saved calculations

            $("#savedCalcs > tbody").append(
                    "<tr><td>" + pipeLength + " feet" +
                    "</td><td>" + dpCapacity + " bbl/ft" +
                    "</td><td>" + currentMudWeight + " ppg" +
                    "</td><td>" + slugWeight + " ppg" +
                    "</td><td>" + hydroPresReq + " psi" +
                    "</td><td>" + presGradDif + " psi/ft" +
                    "</td><td>" + lengthOfSludInDP + " feet" +
                    "</td><td>" + slugVolume + " bbl" +
                    "</td></tr>");
        });
    });
}







