// Create on click event for the links
// Create function that populates the input boxes when the link is clicked

// bmc: this is the code for the input populations. As user clicks the desired formula, the appropriate inputs get populated on the page

$(document).on('click', '#PV', function () {
    console.log('#PV');
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='ID of Drill Pipe' id='drillPipeID'> inches" + "<br><br>" +
            "<input type='text' placeholder='Length of Drill Pipe' id='drillPipeLength'> feet" + "<br><br>" +
            "<input type='submit' value='Calculate Pipe Volume'>")
    $("form").on("submit", function (e) {
        e.preventDefault();
        calculatePipeVolume();
        $("#outputs").html("<br><h3>Standby as we caclulate Pipe Volume</h3>");
        console.log("we're attempting to calculate pipe volume")
    });
});

// bmc: I'm using annularCapacity for the first calculation

$(document).on('click', '#AC', function () {
    console.log('#AC');
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='OD of Annulus' id='outsideDiameter'> inches" + "<br><br>" +
            "<input type='text' placeholder='ID of Annulus' id='insideDiameter'> inches" + "<br><br>" +
            "<input type='text' placeholder='Depth' id='holeDepth'> feet" + "<br><br>" +
            "<input type='submit' value='Calculate Volume of Annulus'>")
    $("form").on("submit", function (e) {
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
            "<input type='text' placeholder='Pump Output'>" + "<br><br>" +
            "<input type='text' placeholder='Ann Capacity'>" + "<br><br>" +
            "<input type='submit' value='Calculate'>")
});

$(document).on('click', '#FIT', function () {
    console.log('#FIT');
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='FIT required' id='fitRequired'> ppg" + "<br><br>" +
            "<input type='text' placeholder='Mud Weight' id='mudWeight'> ppg" + "<br><br>" +
            "<input type='text' placeholder='Shoe Depth (TVD)' id='shoeDepth'> feet" + "<br><br>" +
            "<input type='submit' value='Calculate Pressure Required'>")
});

$(document).on('click', '#FT', function () {
    console.log('#FT');
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='Surface Temperature'> degrees F" + "<br><br>" +
            "<input type='text' placeholder='Temperater Gradient'> F/ft" + "<br><br>" +
            "<input type='text' placeholder='Formation Depth in TVD'> feet" + "<br><br>" +
            "<input type='submit' value='Calculate Formation Temperature'>")
});

$(document).on('click', '#HP', function () {
    console.log('#HP');
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='Mud weight'>" + "<br><br>" +
            "<input type='text' placeholder='TVD'> feet" + "<br><br>" +
            "<input type='submit' value='Calculate'>")
});

$(document).on('click', '#LOT', function () {
    console.log('#LOT');
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='LOT pressure (psi)'>" + "<br><br>" +
            "<input type='text' placeholder='Mud weight (ppg)'>" + "<br><br>" +
            "<input type='text' placeholder='Shoe Depth in TVD'>" + "<br><br>" +
            "<input type='submit' value='Calculate'>")
});

$(document).on('click', '#PG', function () {
    console.log('#PG');
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='Mud weight (ppg)'>" + "<br><br>" +
            "<input type='submit' value='Calculate'>")

});

$(document).on('click', '#SC', function () {
    console.log('#SC');
    $('#outputs').html('');
    $('#inputs').html(
            "<input type='text' placeholder='Desired length of dry pipe (ft)'>" + "<br><br>" +
            "<input type='text' placeholder='Drill pipe capacity (bbl/ft)'>" + "<br><br>" +
            "<input type='text' placeholder='Current MW (ppg)'>" + "<br><br>" +
            "<input type='text' placeholder='Slug Weight (ppg)'>" + "<br><br>" +
            "<input type='submit' value='Calculate'>")
});
