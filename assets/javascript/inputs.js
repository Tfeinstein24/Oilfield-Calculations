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
        calculateInnerCapacity();
        $("#outputs").html("<br><h3 class='result'>Standby as we caclulate inner capacity...</h3>");
        console.log("we're attempting to calculate pipe volume")
    });
});

$(document).on('click', '#AC', function () {
    console.log('#AC');
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='OD of Annulus' id='outsideDiameter'> inches" + "<br><br>" +
            "<input type='text' placeholder='ID of Annulus' id='insideDiameter'> inches" + "<br><br>" +
            "<input type='text' placeholder='Depth' id='holeDepth'> feet" + "<br><br>" +
            "<input type='submit' value='Calculate Volume of Annulus' id='calVolOfAnnulus'>");
    $('#calcPageTitle').text("Annular Capacity");
    $("#calVolOfAnnulus").on("click", function (e) {
        e.preventDefault();
        calculateAnnularCapacity();
        $("#outputs").html("<br><h3>Standby as we caclulate Annular Capacity</h3>");
        console.log("we're attempting to calculate capacity")
    });
});

$(document).on('click', '#AnnV', function () {
    console.log('#AnnV');
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='Flow Rate' id='pumpOutput'> bbl/min" + "<br><br>" +
            "<input type='text' placeholder='Large Diam' id='bigDiam'> inches" + "<br><br>" +
            "<input type='text' placeholder='Small Diam' id='smallDiam'> inches" + "<br><br>" +
            "<input type='submit' value='Calculate Annular Velocity' id='calcAnnVel'>")
    $('#calcPageTitle').text("Annular Velocity");
    $("#calcAnnVel").on("click", function (e) {
        e.preventDefault();
        calculateAnnularVelocity();
        $("#outputs").html("<br><h3>Standby as we caclulate Annular Velocity...</h3>");
        console.log("we're attempting to calculate velocity")
    });
});

$(document).on('click', '#FIT', function () {
    console.log('#FIT');
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='FIT required' id='fitRequired'> ppg" + "<br><br>" +
            "<input type='text' placeholder='Mud Weight' id='mudWeight'> ppg" + "<br><br>" +
            "<input type='text' placeholder='Shoe Depth (TVD)' id='shoeDepth'> feet" + "<br><br>" +
            "<input type='submit' value='Calculate Pressure Required' id='calcPresReq'>");
    $('#calcPageTitle').text("Formation Integrity Test");
    $("#calcPresReq").on("click", function (e) {
        e.preventDefault();
        calculateFormationIntegrityTest();
        $("#outputs").html("<br><h3>Standby as we calulate the pressure required ...</h3>");
        console.log("we're attempting to calculate FIT")
    });
});

$(document).on('click', '#FT', function () {
    console.log('#FT');
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='Surface Temperature' id='surfTemp'> degrees F" + "<br><br>" +
            "<input type='text' placeholder='Temperature Gradient' id='tempGrad'> degrees F/ft" + "<br><br>" +
            "<input type='text' placeholder='Formation TVD' id='formDepth'> feet" + "<br><br>" +
            "<input type='submit' value='Calculate Formation Temperature' id='calcFormTemp'>");
    $('#calcPageTitle').text("Formation Temperature");
    $("#calcFormTemp").on("click", function (e) {
        e.preventDefault();
        calculateFormationTemperature();
        $("#outputs").html("<br><h3>Standby as we calulate the formation temperature ...</h3>");
        console.log("we're attempting to calculate formation temp")
    });
});

$(document).on('click', '#HP', function () {
    console.log('#HP');
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='Mud weight' id='mudWeight'> ppg" + "<br><br>" +
            "<input type='text' placeholder='TVD' id='verticalDepthHP'> feet" + "<br><br>" +
            "<input type='submit' value='Calculate Hydrostatic Pressure' id='calcHydroPres'>");
    $('#calcPageTitle').text("Hydrostatic Pressure");
    $("#calcHydroPres").on("click", function (e) {
        e.preventDefault();
        calculateHydrostaticPressure();
        $("#outputs").html("<br><h3>Standby as we calulate the hydrostatic pressure ...</h3>");
        console.log("we're attempting to calculate hydrostatic pressure")
    });
});

$(document).on('click', '#LOT', function () {
    console.log('#LOT');
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='LOT pressure' id='lotPressure'> psi" + "<br><br>" +
            "<input type='text' placeholder='Mud weight' id='mudWeightLOT'> ppg" + "<br><br>" +
            "<input type='text' placeholder='Shoe Depth/TVD' id='shoeDepthLOT'> feet" + "<br><br>" +
            "<input type='submit' value='Calculate LOT' id='calcLOT'>");
    $('#calcPageTitle').text("Leak Off Test");
    $("#calcLOT").on("click", function (e) {
        e.preventDefault();
        calculateLeakOffTest();
        $("#outputs").html("<br><h3>Standby as we calulate the LOT equivalent mud weight ...</h3>");
        console.log("we're attempting to calculate LOT")
    });
});

$(document).on('click', '#PG', function () {
    console.log('#PG');
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='Mud weight' id='mudWeightPG'> ppg" + "<br><br>" +
            "<input type='submit' value='Calculate Pressure Gradient' id='calcPresGrad'>");
    $('#calcPageTitle').text("Pressure Gradient");
    $("#calcPresGrad").on("click", function (e) {
        e.preventDefault();
        calculatePressureGradient();
        $("#outputs").html("<br><h3>Standby as we calulate the pressure gradient ...</h3>");
        console.log("we're attempting to calculate pressure gradient")
    });

});

$(document).on('click', '#SC', function () {
    console.log('#SC');

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
        calculateSlugCalculation();
        $("#outputs").html("<br><h3>Standby as we do your slug calculations ...</h3>");
        console.log("we're attempting to calculate slug stuff")
    });
});
