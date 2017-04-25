$(document).on('click','#AV',function(){
console.log('#AV');
$('#inputs').html("<input id='holeSizeInput' type='text' value='Hole size/ID'>" + "<br><br>" + "<input id='DPsizeInput' type='text' value='DP Size'>" + "<br><br>" + "<input id='AVbtn' type='submit' value='Calculate'>")
});

$(document).on('click','#PV',function(){
console.log('#PV');
$('#inputs').html("<input type='text' value='ID of Drill Pipe'>" + "<br><br>" + "<input type='text' value='Length of Drill Pipe'>" + "<br><br>" + "<input type='submit' value='Calculate'>")
});

$(document).on('click','#AC',function(){
console.log('#AC');
$('#inputs').html("<input type='text' value='Hole size/ID'>" + "<br><br>" + "<input type='text' value='DP Size'>" + "<br><br>" + "<input type='submit' value='Calculate'>")
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

// Firebase Code

var dataRef = firebase.database().ref();
// Initialize variables
var holeID = 0;
var drillPipeSize = 0;

var AnnularVolume = {
	HoleID: holeID,
	DrillPipeSize: drillPipeSize,
};

// Submit/Firebase code
$("form").submit(function(e){
	e.preventDefault();
	console.log(e);
	// logic for storing input

AnnularVolume.HoleID = $('#holeSizeInput').val();
AnnularVolume.DrillPipeSize = $('#DPsizeInput').val();

// Push to Firebase
dataRef.child('AV').push({
HoleID: AnnularVolume.HoleID,
DrillPipeSize: AnnularVolume.DrillPipeSize,
});

});

dataRef.on("child_added",function(snapshot){
	console.log(snapshot.val());

	// display answers in html
$("#display").html(snapshot.val().HoleID);
});

