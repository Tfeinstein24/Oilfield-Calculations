$(document).ready( function() {

	// Create on click event for the links
	// Create function that populates the input boxes when the link is clicked

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

	//=================FIREBASE AUTH SECTION=====================//

	//Return true if user is signed-in. Otherwise false 
	var checkSignedIn = function() {
		var auth = firebase.auth();
		if(auth.currentUser.email !== null){
			return true;
		}
		return false;
	} // end checkSignedIn

	//Sends an email verification to the user.
	var sendEmailVerification = function() {
		firebase.auth().currentUser.sendEmailVerification().then(function() {
			 alert('Email Verification Sent!');
		});
	};// end SendEmailVerification

	//Function to get the modal
	var getModalToSignIn = function() {
		//Get the modal
		var modal = document.getElementById('my-modal');
	    // Get the <span> element that closes the modal
	    var span = document.getElementsByClassName("close")[0];
	    //open the modal
	    modal.style.display = "block";

	    //When user clicks on span x, close the modal
	    span.onclick = function() {
	        modal.style.display = "none";
	    };

	    //When the user clicks anywhere outside of the modal, close it
	    window.onclick = function(event) {
	        if (event.target == modal) {
	            modal.style.display = "none";
	        }
	    };

	    // Add Sign Up Element
	    $("#btn-sign-up").one("click", function(event) {
		    // Get email and password fields
		    var email = $("#txt-email").val();
		    var pass = $("#txt-password").val();

		    //Sign in with email and pass.
		    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error){
		    	var errorCode = error.code;
		    	var errorMessage = error.message;

		    	//if(errorCode == 'auth/weak-password') {
		    		//alert('The password is too weak.');
		    	//}else{
		    		//alert(errorMessage);
		    	//}
		    	if(error) {
		    		console.log(errorMessage);
		    	}
		    	
	   	 	});

	   	 		//modal.style.display = "none";
    	});//End sign-up


	    //Add login Element
	    $("#btn-login").one("click", function(event){
	    // Get email and password fields
	    	var email = $("#txt-email").val();
	        var pass = $("#txt-password").val();
	        var auth = firebase.auth();
	        //Sign In
	        var promise = auth.signInWithEmailAndPassword(email, pass).catch(function(error){
		    	var errorCode = error.code;
		    	var errorMessage = error.message;

		    	if(error) {
		    		console.log(errorMessage);
		    	}
	   	 	});
	   	 		//modal.style.display = "none"; 
	   	 		//Send email verification
	   	 		sendEmailVerification();   

	     });//end login

	    // User sign-out
	    $('#btn-logout').one("click", function(event) {
	    	firebase.auth().signOut();
	    	modal.style.display = "none";
	    });

	    

	    //Add a realtime listener
	    firebase.auth().onAuthStateChanged(function(user){
	    	if(user) {
	    		var email = user.email;	

	    		if(user){
	    			console.log(user);
	    			//If user is anonymously signed in
	    			var isAnonymous = user.isAnonymous;
	    			var uid = user.uid;
	    			$('#btn-login').addClass('hide');
	    			$('#btn-sign-up').addClass('hide');
	    			//Show sign-out button.
	    			$('#btn-logout').addClass('show');
	    		}else{
	    			console.log("not logged in");
	    			// Add Hide function if not logged-in
	    			$('#btn-logout').addClass('hide');
	    		}
	        }
	    });
	}; // end getModalToSignIn



	//Log-in from Nav Bar
	$('ul.navbar-right li').one("click", function(e){
		e.preventDefault();
		getModalToSignIn();
	});

	//===================== ADDING TO THE FIREBASE DATABASE===================//


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

// If the user clicks on the calculate button
	$('form').on("click", "#AVbtn", function(event) 
		
		//Check if user is logged in, if not, log user in 
		var isLoggedIn = checkSignedIn();
		if(isLoggedIn === false) {
			firebase.auth().signInAnonymously().then(function() {
                console.log('Logged in as Anonymous!');
            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
               });
		}

	});
     
}); // end ready



