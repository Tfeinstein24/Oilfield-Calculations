// Create on click event for the links
// Create function that populates the input boxes when the link is clicked

// bmc: this is the code for the input populations. As user clicks the desired formula, the appropriate inputs get populated on the page

$(document).on('click','#PV',function(){
    console.log('#PV');
    $('#inputs').html("<input type='text' value='ID of Drill Pipe'>" + "<br><br>" + "<input type='text' value='Length of Drill Pipe'>" + "<br><br>" + "<input type='submit' value='Calculate'>")
});

// bmc: I'm using annularCapacity for the first calculation

$(document).on('click','#AC',function(){
    console.log('#AC');
    $('#inputs').html("<input type='text' value='Hole size/ID'>" + "<br><br>" + "<input type='text' value='DP Size'>" + "<br><br>" + "<input type='submit' value='Calculate'>")
    $("form").on("submit", function (e) {
        e.preventDefault();
        calculateAnnularCapacity();
        console.log("we're attempting to calculate capacity")
    });

// bmc: <input type='text' value='Hole size/ID'>
//      <input type='text' value='DP Size'>
//      <input type='submit' value='Calculate'>
});

$(document).on('click','#AnnV',function(){
    console.log('#AnnV');
    $('#inputs').html("<input type='text' value='Pump Output'>" + "<br><br>" + "<input type='text' value='Ann Capacity'>" + "<br><br>" + "<input type='submit' value='Calculate'>")
});

$(document).on('click','#FIT',function(){
    console.log('#FIT');
    $('#inputs').html("<input type='text' value='FIT required'>" + "<br><br>" + "<input type='text' value='Mud Weight'>" + "<br><br>" + "<input type='text' value='Shoe Depth'>" + "<br><br>" + "<input type='submit' value='Calculate'>")
});

$(document).on('click','#FT',function(){
    console.log('#FT');
    $('#inputs').html("<input type='text' value='Surface Temperature'>" + "<br><br>" + "<input type='text' value='Temperater Gradient'>" + "<br><br>" + "<input type='text' value='Depth in TVD'>" + "<br><br>" + "<input type='submit' value='Calculate'>")
});

$(document).on('click','#HP',function(){
    console.log('#HP');
    $('#inputs').html("<input type='text' value='Mud weight'>" + "<br><br>" + "<input type='text' value='TVD (ft)'>" + "<br><br>" + "<input type='submit' value='Calculate'>")
});

$(document).on('click','#LOT',function(){
    console.log('#LOT');
    $('#inputs').html("<input type='text' value='LOT pressure (psi)'>" + "<br><br>" + "<input type='text' value='Mud weight (ppg)'>" + "<br><br>" + "<input type='text' value='Shoe Depth in TVD'>" + "<br><br>" + "<input type='submit' value='Calculate'>")
});

$(document).on('click','#PG',function(){
    console.log('#PG');
    $('#inputs').html("<input type='text' value='Mud weight (ppg)'>" + "<br><br>" + "<input type='submit' value='Calculate'>")

});

$(document).on('click','#SC',function(){
    console.log('#SC');
    $('#inputs').html("<input type='text' value='Desired length of dry pipe (ft)'>" + "<br><br>" + "<input type='text' value='Drill pipe capacity (bbl/ft)'>" + "<br><br>" + "<input type='text' value='Current MW (ppg)'>" + "<br><br>" + "<input type='text' value='Slug Weight (ppg)'>" + "<br><br>" + "<input type='submit' value='Calculate'>")
});

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