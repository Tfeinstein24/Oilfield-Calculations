// Create on click event for the links
// Create function that populates the input boxes when the link is clicked

// bmc: this is the code for the input populations. As user clicks the desired formula, the appropriate inputs get populated on the page

$(document).on('click', '#IC', function () {
    console.log('#IC');
    $("#savedCalcs > tbody").html(""); // bmc: start fresh

    if(bonsAjaxCall != null){
        bonsAjaxCall.abort();
        bonsAjaxCall = null;
    }
    $("#savedCalcs > tbody").html(""); // bmc: start fresh
    $('#outputs').html(''); // bmc: start fresh
    $('#inputs').html(
        "<input type='text' placeholder='Diameter' id='diameter'> inches" + "<br><br>" +
        "<input type='submit' value='Calculate Inner Capacity' id='calcInnerCapacity'>");

    $('#calcPageTitle').text("Inner Capacity");

    var titlesForTable = uberDatabase.ref("ColHeaders").child("titlesIC");
    console.log("titles for table not snapshot: " + titlesForTable);
    titlesForTable.on("value", function(snapshot) {
        console.log("titles for table in snapshot: ");
        console.log(snapshot.val());
        $("#savedCalcs > thead").html("<tr><td>" + snapshot.val().innerDiam + "</td><td>" + snapshot.val().barrelsPerFoot + "</td><td>" + snapshot.val().feetPerBarrel + "</td><td>" + snapshot.val().gallonsPerFoot + "</td><td>" + snapshot.val().feetPerGallon + "</td></tr>");
    }); // bmc: end of titlesForTable.on("value", ...

    var infoForPersonNow = uberDatabase.ref(thisCookie);
    infoForPersonNow.once("value", function(snapshot) {
        console.log("info for person now: ");
        console.log(snapshot.val());
        console.log(snapshot.val().IC);
        $.each(snapshot.val().IC, function (key, value) {
            console.log(value);
            $("#savedCalcs > tbody").append("<tr><td>" + value.innerDiam + "</td><td>" + value.barrelsPerFoot + "</td><td>" +
                    value.feetPerBarrel + "</td><td>" + value.gallonsPerFoot + "</td><td>" + value.feetPerGallon + "</td></tr>");
        }) // bmc:  end of .each(snapshot.val().IC
    }); // bmc: end of infoForPersonNow.on("value"

    // bmc: now for the actual calculations when they click the calculate button
    $("#calcInnerCapacity").on("click", function (e) {
        e.preventDefault();

        if ($("#diameter").val()>0){ // bmc: ensure it's a number

            calculateInnerCapacity();

            $("#outputs").html("<br><h3>Standby as we caclulate inner capacity...</h3>");
            console.log("we're attempting to calculate pipe volume")
        }
        else {
            $("#outputs").html("<br><h3>Please enter only positive numbers.</h3>");
        }
    });
}); // bmc: end of $(document).on('click', '#IC'

$(document).on('click', '#AC', function () {
    console.log('#AC');

    // bmc: if there's a previous ajax call happening when the user clicks over to this calculation, this code will abort that call
    if(bonsAjaxCall != null){
        bonsAjaxCall.abort();
        bonsAjaxCall = null;
    }
    $("#savedCalcs > tbody").html(""); // bmc: start fresh
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='OD of Annulus' id='outsideDiameter'> inches" + "<br><br>" +
            "<input type='text' placeholder='ID of Annulus' id='insideDiameter'> inches" + "<br><br>" +
            "<input type='submit' value='Calculate Volume of Annulus' id='calVolOfAnnulus'>");
    $('#calcPageTitle').text("Annular Capacity");

    var titlesForTable = uberDatabase.ref("ColHeaders").child("titlesAC");
    console.log("titles for table not snapshot: " + titlesForTable);
    titlesForTable.on("value", function(snapshot) {
        console.log("titles for table in snapshot: ");
        console.log(snapshot.val());
        $("#savedCalcs > thead").html(
                "<tr><td>" + snapshot.val().innerDiam +
                "</td><td>" + snapshot.val().outsideDiam +
                "</td><td>" + snapshot.val().barrelsPerFoot +
                "</td><td>" + snapshot.val().feetPerBarrel +
                "</td><td>" + snapshot.val().gallonsPerFoot +
                "</td><td>" + snapshot.val().feetPerGallon +
                "</td></tr>");
    }); // bmc: end of titlesForTable.on("value", ...

    var infoForPersonNow = uberDatabase.ref(thisCookie);
    infoForPersonNow.once("value", function(snapshot) {
        console.log("info for person now: ");
        console.log(snapshot.val());
        console.log(snapshot.val().AC);
        $.each(snapshot.val().AC, function (key, value) {
            console.log(value);
            $("#savedCalcs > tbody").append(
                    "<tr><td>" + value.innerDiam +
                    "</td><td>" + value.outsideDiam +
                    "</td><td>" + value.barrelsPerFoot +
                    "</td><td>" + value.feetPerBarrel +
                    "</td><td>" + value.gallonsPerFoot +
                    "</td><td>" + value.feetPerGallon +
                    "</td></tr>");
        }) // bmc:  end of .each(snapshot.val().IC
    }); // bmc: end of infoForPersonNow.on("value" // bmc: code for updating database... NEEDS TO BE ADJUSTED

    $("#calVolOfAnnulus").on("click", function (e) {
        e.preventDefault();

        // bmc: validate that we have positive numbers and the OD is bigger than the ID. If it is, then do the calculations. If not, show a prompt to input the correct stuff.
        if ($("#outsideDiameter").val()>0 && $("#insideDiameter").val()>0 && $("#outsideDiameter").val()>$("#insideDiameter").val()){
            calculateAnnularCapacity();
            $("#outputs").html("<br><h3>Standby as we caclulate annular capacity...</h3>");
            console.log("we're attempting to calculate capacity")
        }
        else {
            $("#outputs").html("<br><h3>Please enter only positive numbers and make sure the OD is larger than the ID.</h3>");
        }
    });
});

$(document).on('click', '#AnnV', function () {
    console.log('#AnnV');

    // bmc: if there's a previous ajax call happening when the user clicks over to this calculation, this code will abort that call
    if(bonsAjaxCall != null){
        bonsAjaxCall.abort();
        bonsAjaxCall = null;
    }
    $("#savedCalcs > tbody").html(""); // bmc: start fresh
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='Flow Rate' id='pumpOutput'> bbl/min" + "<br><br>" +
            "<input type='text' placeholder='Large Diam' id='bigDiam'> inches" + "<br><br>" +
            "<input type='text' placeholder='Small Diam' id='smallDiam'> inches" + "<br><br>" +
            "<input type='submit' value='Calculate Annular Velocity' id='calcAnnVel'>");
    $('#calcPageTitle').text("Annular Velocity");


    var titlesForTable = uberDatabase.ref("ColHeaders").child("titlesAnnV");
    console.log("titles for table not snapshot: " + titlesForTable);
    titlesForTable.on("value", function(snapshot) {
        console.log("titles for table in snapshot: ");
        console.log(snapshot.val());
        $("#savedCalcs > thead").html(
                "<tr><td>" + snapshot.val().barrelsPerMin +
                "</td><td>" + snapshot.val().bigDiam +
                "</td><td>" + snapshot.val().smallDiam +
                "</td><td>" + snapshot.val().feetPerMin +
                "</td><td>" + snapshot.val().feetPerSec +
                "</td></tr>");
    }); // bmc: end of titlesForTable.on("value", ...

    var infoForPersonNow = uberDatabase.ref(thisCookie);
    infoForPersonNow.once("value", function(snapshot) {
        console.log("info for person now: ");
        console.log(snapshot.val());
        console.log(snapshot.val().AnnV);
        $.each(snapshot.val().AnnV, function (key, value) {
            console.log(value);
            $("#savedCalcs > tbody").append(
                    "<tr><td>" + value.barrelsPerMin +
                    "</td><td>" + value.bigDiam +
                    "</td><td>" + value.smallDiam +
                    "</td><td>" + value.feetPerMin +
                    "</td><td>" + value.feetPerSec +
                    "</td></tr>");
        }) // bmc:  end of .each(snapshot.val().IC
    }); // bmc: end of infoForPersonNow.on("value"

    $("#calcAnnVel").on("click", function (e) {
        e.preventDefault();

        // bmc: validate that we have positive numbers and the Large Diam is bigger than the Small Diam. If it is, then do the calculations. If not, show a prompt to input the correct stuff.
        if ($("#bigDiam").val()>0 && $("#smallDiam").val()>0 && $("#bigDiam").val()>$("#smallDiam").val()){

            calculateAnnularVelocity();
            $("#outputs").html("<br><h3>Standby as we caclulate Annular Velocity...</h3>");
            console.log("we're attempting to calculate velocity")
        }
        else {
            $("#outputs").html("<br><h3>Please enter only positive numbers and make sure the Large Diam is larger than the Small Diam.</h3>");
        }



    });
});

$(document).on('click', '#FIT', function () {
    console.log('#FIT');

    // bmc: if there's a previous ajax call happening when the user clicks over to this calculation, this code will abort that call
    if(bonsAjaxCall != null){
        bonsAjaxCall.abort();
        bonsAjaxCall = null;
    }
    $("#savedCalcs > tbody").html(""); // bmc: start fresh
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='FIT required' id='fitRequired'> ppg" + "<br><br>" +
            "<input type='text' placeholder='Mud Weight' id='mudWeight'> ppg" + "<br><br>" +
            "<input type='text' placeholder='Shoe Depth (TVD)' id='shoeDepth'> feet" + "<br><br>" +
            "<input type='submit' value='Calculate Pressure Required' id='calcPresReq'>");
    $('#calcPageTitle').text("Formation Integrity Test");


    var titlesForTable = uberDatabase.ref("ColHeaders").child("titlesFIT");
    console.log("titles for table not snapshot: " + titlesForTable);
    titlesForTable.on("value", function(snapshot) {
        console.log("titles for table in snapshot: ");
        console.log(snapshot.val());
        $("#savedCalcs > thead").html(
                "<tr><td>" + snapshot.val().fitRequired +
                "</td><td>" + snapshot.val().mudWeight +
                "</td><td>" + snapshot.val().shoeDepth +
                "</td><td>" + snapshot.val().presRequired +
                "</td></tr>");
    }); // bmc: end of titlesForTable.on("value", ...

    var infoForPersonNow = uberDatabase.ref(thisCookie);
    infoForPersonNow.once("value", function(snapshot) {
        console.log("info for person now: ");
        console.log(snapshot.val());
        console.log(snapshot.val().FIT);
        $.each(snapshot.val().FIT, function (key, value) {
            console.log(value);
            $("#savedCalcs > tbody").append(
                    "<tr><td>" + value.fitRequired +
                    "</td><td>" + value.mudWeight +
                    "</td><td>" + value.shoeDepth +
                    "</td><td>" + value.presRequired +
                    "</td></tr>");
        }) // bmc:  end of .each(snapshot.val().IC
    }); // bmc: end of infoForPersonNow.on("value" // bmc: ADJUST


    $("#calcPresReq").on("click", function (e) {
        e.preventDefault();

        // bmc: Make sure all inputs are positive
        if ($("#fitRequired").val()>0 && $("#mudWeight").val()>0 && $("#shoeDepth").val()>0){
            calculateFormationIntegrityTest();
            $("#outputs").html("<br><h3>Standby as we calulate the pressure required ...</h3>");
            console.log("we're attempting to calculate FIT")
        }
        else {
            $("#outputs").html("<br><h3>Please enter only positive numbers.</h3>");
        }

    });
});

$(document).on('click', '#FT', function () {
    console.log('#FT');

    // bmc: if there's a previous ajax call happening when the user clicks over to this calculation, this code will abort that call
    if(bonsAjaxCall != null){
        bonsAjaxCall.abort();
        bonsAjaxCall = null;
    }
    $("#savedCalcs > tbody").html(""); // bmc: start fresh
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='Surface Temperature' id='surfTemp'> degrees F" + "<br><br>" +
            "<input type='text' placeholder='Temperature Gradient' id='tempGrad'> degrees F/ft" + "<br><br>" +
            "<input type='text' placeholder='Formation TVD' id='formDepth'> feet" + "<br><br>" +
            "<input type='submit' value='Calculate Formation Temperature' id='calcFormTemp'>");
    $('#calcPageTitle').text("Formation Temperature");


    var titlesForTable = uberDatabase.ref("ColHeaders").child("titlesFT");
    console.log("titles for table not snapshot: " + titlesForTable);
    titlesForTable.on("value", function(snapshot) {
        console.log("titles for table in snapshot: ");
        console.log(snapshot.val());
        $("#savedCalcs > thead").html(
                "<tr><td>" + snapshot.val().surfTemp +
                "</td><td>" + snapshot.val().tempGrad +
                "</td><td>" + snapshot.val().formDepth +
                "</td><td>" + snapshot.val().formTemp +
                "</td></tr>");
    }); // bmc: end of titlesForTable.on("value", ...

    var infoForPersonNow = uberDatabase.ref(thisCookie);
    infoForPersonNow.once("value", function(snapshot) {
        console.log("info for person now: ");
        console.log(snapshot.val());
        console.log(snapshot.val().FT);
        $.each(snapshot.val().FT, function (key, value) {
            console.log(value);
            $("#savedCalcs > tbody").append(
                    "<tr><td>" + value.surfTemp +
                    "</td><td>" + value.tempGrad +
                    "</td><td>" + value.formDepth +
                    "</td><td>" + value.formTemp +
                    "</td></tr>");
        }) // bmc:  end of .each(snapshot.val().IC
    }); // bmc: end of infoForPersonNow.on("value" // bmc: ADJUST


    $("#calcFormTemp").on("click", function (e) {
        e.preventDefault();

        // bmc: Make sure degrees exist and depth is positive
        // bmc: Note: absolute zero is -460 degress F, roughly
        if ($("#surfTemp").val()> -460 && $("#tempGrad").val()> -460 && $("#calcFormTemp").val()> 0){
            calculateFormationTemperature();
            $("#outputs").html("<br><h3>Standby as we calulate the formation temperature ...</h3>");
            console.log("we're attempting to calculate formation temp")
        }
        else {
            $("#outputs").html("<br><h3>Please enter a positive number for the depth and a number larger than absolute zero for the temperatures.</h3>");
        }

    });
});

$(document).on('click', '#HP', function () {
    console.log('#HP');

    // bmc: if there's a previous ajax call happening when the user clicks over to this calculation, this code will abort that call
    if(bonsAjaxCall != null){
        bonsAjaxCall.abort();
        bonsAjaxCall = null;
    }
    $("#savedCalcs > tbody").html(""); // bmc: start fresh
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='Mud weight' id='mudWeight'> ppg" + "<br><br>" +
            "<input type='text' placeholder='TVD' id='verticalDepthHP'> feet" + "<br><br>" +
            "<input type='submit' value='Calculate Hydrostatic Pressure' id='calcHydroPres'>");
    $('#calcPageTitle').text("Hydrostatic Pressure");


    var titlesForTable = uberDatabase.ref("ColHeaders").child("titlesHP");
    console.log("titles for table not snapshot: " + titlesForTable);
    titlesForTable.on("value", function(snapshot) {
        console.log("titles for table in snapshot: ");
        console.log(snapshot.val());
        $("#savedCalcs > thead").html(
                "<tr><td>" + snapshot.val().mudWeight +
                "</td><td>" + snapshot.val().verticalDepth +
                "</td><td>" + snapshot.val().hydroPres +
                "</td></tr>");
    }); // bmc: end of titlesForTable.on("value", ...

    var infoForPersonNow = uberDatabase.ref(thisCookie);
    infoForPersonNow.once("value", function(snapshot) {
        console.log("info for person now: ");
        console.log(snapshot.val());
        console.log(snapshot.val().HP);
        $.each(snapshot.val().HP, function (key, value) {
            console.log(value);
            $("#savedCalcs > tbody").append(
                    "<tr><td>" + value.mudWeight +
                    "</td><td>" + value.verticalDepth +
                    "</td><td>" + value.hydroPres +
                    "</td></tr>");
        }) // bmc:  end of .each(snapshot.val().IC
    }); // bmc: end of infoForPersonNow.on("value" // bmc: ADJUST


    $("#calcHydroPres").on("click", function (e) {
        e.preventDefault();

        // bmc: Make sure all inputs are positive
        if ($("#mudWeight").val()>0 && $("#verticalDepthHP").val()>0){
            calculateHydrostaticPressure();
            $("#outputs").html("<br><h3>Standby as we calulate the hydrostatic pressure ...</h3>");
            console.log("we're attempting to calculate hydrostatic pressure")
        }
        else {
            $("#outputs").html("<br><h3>Please enter only positive numbers.</h3>");
        }



    });
});

$(document).on('click', '#LOT', function () {
    console.log('#LOT');


    // bmc: if there's a previous ajax call happening when the user clicks over to this calculation, this code will abort that call
    if(bonsAjaxCall != null){
        bonsAjaxCall.abort();
        bonsAjaxCall = null;
    }
    $("#savedCalcs > tbody").html(""); // bmc: start fresh
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='LOT pressure' id='lotPressure'> psi" + "<br><br>" +
            "<input type='text' placeholder='Mud weight' id='mudWeightLOT'> ppg" + "<br><br>" +
            "<input type='text' placeholder='Shoe Depth/TVD' id='shoeDepthLOT'> feet" + "<br><br>" +
            "<input type='submit' value='Calculate LOT' id='calcLOT'>");
    $('#calcPageTitle').text("Leak Off Test");


    var titlesForTable = uberDatabase.ref("ColHeaders").child("titlesLOT");
    console.log("titles for table not snapshot: " + titlesForTable);
    titlesForTable.on("value", function(snapshot) {
        console.log("titles for table in snapshot: ");
        console.log(snapshot.val());
        $("#savedCalcs > thead").html(
                "<tr><td>" + snapshot.val().lotPressure +
                "</td><td>" + snapshot.val().mudWeight +
                "</td><td>" + snapshot.val().shoeDepth +
                "</td><td>" + snapshot.val().lotEquivMudWeight +
                "</td></tr>");
    }); // bmc: end of titlesForTable.on("value", ...

    var infoForPersonNow = uberDatabase.ref(thisCookie);
    infoForPersonNow.once("value", function(snapshot) {
        console.log("info for person now: ");
        console.log(snapshot.val());
        console.log(snapshot.val().LOT);
        $.each(snapshot.val().LOT, function (key, value) {
            console.log(value);
            $("#savedCalcs > tbody").append(
                    "<tr><td>" + value.lotPressure +
                    "</td><td>" + value.mudWeight +
                    "</td><td>" + value.shoeDepth +
                    "</td><td>" + value.lotEquivMudWeight +
                    "</td></tr>");
        }) // bmc:  end of .each(snapshot.val().IC
    }); // bmc: end of infoForPersonNow.on("value" // bmc: ADJUST

    $("#calcLOT").on("click", function (e) {
        e.preventDefault();

        // bmc: Make sure all inputs are positive
        if ($("#lotPressure").val()>0 && $("#mudWeightLOT").val()>0 && $("#shoeDepthLOT").val()>0){
            calculateLeakOffTest();
            $("#outputs").html("<br><h3>Standby as we calulate the LOT equivalent mud weight ...</h3>");
            console.log("we're attempting to calculate LOT")
        }
        else {
            $("#outputs").html("<br><h3>Please enter only positive numbers.</h3>");
        }

    });
});

$(document).on('click', '#PG', function () {
    console.log('#PG');

    // bmc: if there's a previous ajax call happening when the user clicks over to this calculation, this code will abort that call
    if(bonsAjaxCall != null){
        bonsAjaxCall.abort();
        bonsAjaxCall = null;
    }
    $("#savedCalcs > tbody").html(""); // bmc: start fresh
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='Mud weight' id='mudWeightPG'> ppg" + "<br><br>" +
            "<input type='submit' value='Calculate Pressure Gradient' id='calcPresGrad'>");
    $('#calcPageTitle').text("Pressure Gradient");


    var titlesForTable = uberDatabase.ref("ColHeaders").child("titlesPG");
    console.log("titles for table not snapshot: " + titlesForTable);
    titlesForTable.on("value", function(snapshot) {
        console.log("titles for table in snapshot: ");
        console.log(snapshot.val());
        $("#savedCalcs > thead").html(
                "<tr><td>" + snapshot.val().mudWeight +
                "</td><td>" + snapshot.val().presGrad +
                "</td></tr>");
    }); // bmc: end of titlesForTable.on("value", ...

    var infoForPersonNow = uberDatabase.ref(thisCookie);
    infoForPersonNow.once("value", function(snapshot) {
        console.log("info for person now: ");
        console.log(snapshot.val());
        console.log(snapshot.val().PG);
        $.each(snapshot.val().PG, function (key, value) {
            console.log(value);
            $("#savedCalcs > tbody").append(
                    "<tr><td>" + value.mudWeight +
                    "</td><td>" + value.presGrad +
                    "</td></tr>");
        }) // bmc:  end of .each(snapshot.val().IC
    }); // bmc: end of infoForPersonNow.on("value" // bmc: ADJUST


    $("#calcPresGrad").on("click", function (e) {
        e.preventDefault();

        // bmc: Make sure the input is positive
        if ($("#mudWeightPG").val()>0){
            calculatePressureGradient();
            $("#outputs").html("<br><h3>Standby as we calulate the pressure gradient ...</h3>");
            console.log("we're attempting to calculate pressure gradient")
        }
        else {
            $("#outputs").html("<br><h3>Please enter only positive numbers.</h3>");
        }
    });

});

$(document).on('click', '#SC', function () {
    console.log('#SC');

    // bmc: if there's a previous ajax call happening when the user clicks over to this calculation, this code will abort that call
    if(bonsAjaxCall != null){
        bonsAjaxCall.abort();
        bonsAjaxCall = null;
    }
    $("#savedCalcs > tbody").html(""); // bmc: start fresh
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='Desired length dry pipe' id='pipeLength'> feet" + "<br><br>" +
            "<input type='text' placeholder='Drill pipe capacity' id='dpCapacity'> bbl/ft" + "<br><br>" +
            "<input type='text' placeholder='Current MW' id='currentMudWeight'> ppg" + "<br><br>" +
            "<input type='text' placeholder='Slug Weight' id='slugWeight'> ppg" + "<br><br>" +
            "<input type='submit' value='Do Slug Calculations' id='calcSlug'>");
    $('#calcPageTitle').text("Slug Calculation");


    var titlesForTable = uberDatabase.ref("ColHeaders").child("titlesSC");
    console.log("titles for table not snapshot: " + titlesForTable);
    titlesForTable.on("value", function(snapshot) {
        console.log("titles for table in snapshot: ");
        console.log(snapshot.val());
        $("#savedCalcs > thead").html(
                "<tr><td>" + snapshot.val().pipeLength +
                "</td><td>" + snapshot.val().dpCapacity +
                "</td><td>" + snapshot.val().currentMudWeight +
                "</td><td>" + snapshot.val().slugWeight +
                "</td><td>" + snapshot.val().hydroPresReq +
                "</td><td>" + snapshot.val().presGradDif +
                "</td><td>" + snapshot.val().lengthOfSludInDP +
                "</td><td>" + snapshot.val().slugVolume +
                "</td></tr>");
    }); // bmc: end of titlesForTable.on("value", ...

    var infoForPersonNow = uberDatabase.ref(thisCookie);
    infoForPersonNow.once("value", function(snapshot) {
        console.log("info for person now: ");
        console.log(snapshot.val());
        console.log(snapshot.val().SC);
        $.each(snapshot.val().SC, function (key, value) {
            console.log(value);
            $("#savedCalcs > tbody").append(
                    "<tr><td>" + value.pipeLength +
                    "</td><td>" + value.dpCapacity +
                    "</td><td>" + value.currentMudWeight +
                    "</td><td>" + value.slugWeight +
                    "</td><td>" + value.hydroPresReq +
                    "</td><td>" + value.presGradDif +
                    "</td><td>" + value.lengthOfSludInDP +
                    "</td><td>" + value.slugVolume +
                    "</td></tr>");
        }) // bmc:  end of .each(snapshot.val().IC
    }); // bmc: end of infoForPersonNow.on("value" // bmc: ADJUST

    $("#calcSlug").on("click", function (e) {
        e.preventDefault();

        // bmc: Make sure all inputs are positive
        if ($("#pipeLength").val()>0 && $("#dpCapacity").val()>0 && $("#currentMudWeight").val()>0 && $("#slugWeight").val()>0){
            calculateSlugCalculation();
            $("#outputs").html("<br><h3>Standby as we do your slug calculations ...</h3>");
            console.log("we're attempting to calculate slug stuff")
        }
        else {
            $("#outputs").html("<br><h3>Please enter only positive numbers.</h3>");
        }

    });
});
