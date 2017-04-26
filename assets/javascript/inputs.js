// Create on click event for the links
// Create function that populates the input boxes when the link is clicked

// bmc: this is the code for the input populations. As user clicks the desired formula, the appropriate inputs get populated on the page

$(document).on('click', '#IC', function () {
    console.log('#IC');
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='Diameter' id='diameter'> inches" + "<br><br>" +
            "<input type='submit' value='Calculate Inner Capacity' id='calcInnerCapacity'>");
    $('#calcPageTitle').text("Inner Capacity");
    $("#calcInnerCapacity").on("click", function (e) {
        e.preventDefault();
        if ($("#diameter").val()>0){
            calculateInnerCapacity();
            $("#outputs").html("<br><h3>Standby as we caclulate inner capacity...</h3>");
            console.log("we're attempting to calculate pipe volume")
        }
        else {
            $("#outputs").html("<br><h3>Please enter only positive numbers.</h3>");
        }

    });
});

$(document).on('click', '#AC', function () {
    console.log('#AC');

    // bmc: if there's a previous ajax call happening when the user clicks over to this calculation, this code will abort that call
    if(bonsAjaxCall != null){
        bonsAjaxCall.abort();
        bonsAjaxCall = null;
    }

    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='OD of Annulus' id='outsideDiameter'> inches" + "<br><br>" +
            "<input type='text' placeholder='ID of Annulus' id='insideDiameter'> inches" + "<br><br>" +
            "<input type='text' placeholder='Depth' id='holeDepth'> feet" + "<br><br>" +
            "<input type='submit' value='Calculate Volume of Annulus' id='calVolOfAnnulus'>");
    $('#calcPageTitle').text("Annular Capacity");
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

    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='Flow Rate' id='pumpOutput'> bbl/min" + "<br><br>" +
            "<input type='text' placeholder='Large Diam' id='bigDiam'> inches" + "<br><br>" +
            "<input type='text' placeholder='Small Diam' id='smallDiam'> inches" + "<br><br>" +
            "<input type='submit' value='Calculate Annular Velocity' id='calcAnnVel'>");
    $('#calcPageTitle').text("Annular Velocity");
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
    $('#outputs').html('');

    // bmc: if there's a previous ajax call happening when the user clicks over to this calculation, this code will abort that call
    if(bonsAjaxCall != null){
        bonsAjaxCall.abort();
        bonsAjaxCall = null;
    }

    $('#inputs').html(
            "<input type='text' placeholder='FIT required' id='fitRequired'> ppg" + "<br><br>" +
            "<input type='text' placeholder='Mud Weight' id='mudWeight'> ppg" + "<br><br>" +
            "<input type='text' placeholder='Shoe Depth (TVD)' id='shoeDepth'> feet" + "<br><br>" +
            "<input type='submit' value='Calculate Pressure Required' id='calcPresReq'>");
    $('#calcPageTitle').text("Formation Integrity Test");
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

    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='Surface Temperature' id='surfTemp'> degrees F" + "<br><br>" +
            "<input type='text' placeholder='Temperature Gradient' id='tempGrad'> degrees F/ft" + "<br><br>" +
            "<input type='text' placeholder='Formation TVD' id='formDepth'> feet" + "<br><br>" +
            "<input type='submit' value='Calculate Formation Temperature' id='calcFormTemp'>");
    $('#calcPageTitle').text("Formation Temperature");
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

    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='Mud weight' id='mudWeight'> ppg" + "<br><br>" +
            "<input type='text' placeholder='TVD' id='verticalDepthHP'> feet" + "<br><br>" +
            "<input type='submit' value='Calculate Hydrostatic Pressure' id='calcHydroPres'>");
    $('#calcPageTitle').text("Hydrostatic Pressure");
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
    $('#outputs').html('');

    // bmc: if there's a previous ajax call happening when the user clicks over to this calculation, this code will abort that call
    if(bonsAjaxCall != null){
        bonsAjaxCall.abort();
        bonsAjaxCall = null;
    }

    $('#inputs').html(
            "<input type='text' placeholder='LOT pressure' id='lotPressure'> psi" + "<br><br>" +
            "<input type='text' placeholder='Mud weight' id='mudWeightLOT'> ppg" + "<br><br>" +
            "<input type='text' placeholder='Shoe Depth/TVD' id='shoeDepthLOT'> feet" + "<br><br>" +
            "<input type='submit' value='Calculate LOT' id='calcLOT'>");
    $('#calcPageTitle').text("Leak Off Test");
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

    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='Mud weight' id='mudWeightPG'> ppg" + "<br><br>" +
            "<input type='submit' value='Calculate Pressure Gradient' id='calcPresGrad'>");
    $('#calcPageTitle').text("Pressure Gradient");
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

    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='Desired length dry pipe' id='pipeLength'> feet" + "<br><br>" +
            "<input type='text' placeholder='Drill pipe capacity' id='dpCapacity'> bbl/ft" + "<br><br>" +
            "<input type='text' placeholder='Current MW' id='currentMudWeight'> ppg" + "<br><br>" +
            "<input type='text' placeholder='Slug Weight' id='slugWeight'> ppg" + "<br><br>" +
            "<input type='submit' value='Do Slug Calculations' id='calcSlug'>");
    $('#calcPageTitle').text("Slug Calculation");
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
