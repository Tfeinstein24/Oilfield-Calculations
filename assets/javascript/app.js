$(document).ready(function () {
    //=================FIREBASE AUTH SECTION=====================//
    //Get the modal
    var modal = document.getElementById('my-modal');
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    //Function return true if user is signed-in. Otherwise false
    var checkSignedIn = function () {
        var user = firebase.auth().currentUser;
        if (user !== null) {
            return true;
        }
        return false;
    }; // end checkSignedIn

     //Sends an email verification to the user.
    var sendEmailVerification = function () {
        firebase.auth().currentUser.sendEmailVerification().then(function () {
            alert('Email Verification Sent!');
        });
    };// end SendEmailVerification

    //Fucntion to get the modal
    var getModal = function() {
        //open the modal
        modal.style.display = "block";
        //When user clicks on span x, close the modal
        span.onclick = function () {
            modal.style.display = "none";
        };
        //When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };

    };

    //Function to signup
    var signUp = function() {
        // Add Sign Up Element
        $("#btn-sign-up").on("click", function (event) {
            // Get email and password fields
            var email = $("#txt-email").val();
            var pass = $("#txt-password").val();

            //Sign in with email and pass.
            firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                if (error) {
                    console.log(errorMessage);
                }
                if(errorMessage === 'The email address is already in use by another account.'){
                    alert('Account already exist. Please click login button');
                }
                if(errorCode == 'auth/weak-password'){
                    alert('Passord should be at least 6 characters');
                }

            });
            //sendEmailVerification();
        });//End sign-up
    };

    //Function to log in
    var logIn = function () {
        //Add login Element
        $("#btn-login").on("click", function (event) {
            // Get email and password fields
            var email = $("#txt-email").val();
            var pass = $("#txt-password").val();
            var auth = firebase.auth();
            //Sign In
            var promise = auth.signInWithEmailAndPassword(email, pass).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                if (error) {
                    console.log(errorMessage);
                }

                if(errorCode === 'auth/wrong-password'){
                    alert('Wrong password.');
                }
            });

        });

    };//end log-in 

    //Function to logout
    var logOut = function () {
        // User sign-out
        $('#btn-logout').on("click", function (event) {
            firebase.auth().signOut();
            modal.style.display = "none";
        });

    };

    //Function to add a realtime listener for login/logoutchanges
     var realtimeListener = function() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var signedIn = checkSignedIn();
                if (signedIn === true) {
                    console.log("logged in");
                    //If loggin successfully, close modal after 2 secs
                    setTimeout(function(){
                        $('ul.navbar-right #login').addClass('hide');
                        $('ul.navbar-right #logout').addClass('show');
                        $('#btn-sign-up').addClass('hide');
                        $('#btn-login').addClass('hide');
                        $('#btn-logout').addClass('show');
                        modal.style.display = 'none';
                    }, 2000);

                }
            }else {
                console.log("not logged in");
                $('ul.navbar-right #login').addClass('show');
                $('ul.navbar-right #logout').addClass('hide');
                $('#btn-sign-up').addClass('show');
                $('#btn-login').addClass('show');
                $('#btn-logout').addClass('hide');
             }
        });
    };


    //Function to get the modal
    var getModalToSignIn = function () {
        getModal();
        signUp();
        logIn();
        logOut();
        realtimeListener();
    }; // end getModalToSignIn

    //LOG-IN from NAV BAR
    $('ul.navbar-right #login').on("click", function (e) {
        e.preventDefault();
        getModalToSignIn();
    });

    //LOG-IN from NAV BAR
    $('ul.navbar-right #logout').on("click", function (e) {
        e.preventDefault();
        getModalToSignIn();
    });



    //===================== ADDING DATA TO THE FIREBASE DATABASE===================//


    //Function to add the data into the database
    var database = firebase.database();

    //==========Inner Capacity Section==========//
    var diameter = 0;
    var ICresult = 0; 
        
    $(document).on('click', '#IC', function () {
        var firstHeading = 'Diameter';
        var secondHeading= 'Result';
 
        if( checkSignedIn() === true){
            $('#table-head').empty();
            $('#table-body').empty();
            $('#table-head').html("<tr><td>" + firstHeading + "</td><td>" + secondHeading + "</td></tr>");  
            //Retrieve the last 5 data inputs
            database.ref().child('IC').orderByChild('dateAdded').limitToLast(5).on("child_added", function(childSnapshot){
                //console.log(childSnapshot.val().diameter);
                var diameterData = childSnapshot.val().diameter;
                var resultData = childSnapshot.val().result;
                console.log(diameterData);
                console.log(resultData);
                if(diameterData != ""){
                    $('#table-body').append("<tr><td>" + diameterData + "</td><td>" + resultData + "</td></tr>");
                } 
            });
             //Submit Firebase Code for Inner Capacity when user clicks the calculate button
            $("form").on("submit", function (e) { 
                //Check if user has signed in                
                if( checkSignedIn() === true){
                    e.preventDefault();
                    //logic for storing input
                    diameter = $('#diameter').val();
                    ///ICresult =
                    //Push to Firebase
                    database.ref().child('IC').push({
                        diameter: diameter,
                        result: ICresult,
                        dateAdded: firebase.database.ServerValue.TIMESTAMP
                    })
                }    
            });
        };
    });
   
  
    //========== Annular Capacity Section ==========//
    //Initialize Variables
    var outsideDiameter = 0;
    var insideDiameter = 0;
    var holeDepth = 0;
    var ACresult = 0;

    $(document).on('click', '#AC', function () {

        var firstHeading = 'OD of Annulus';
        var secondHeading = 'ID of Annulus';
        var thirdHeading = 'Depth';
        var fourthHeading = 'Result';

        if( checkSignedIn() === true){
            //$(this).off('click');
            $('#table-head').empty();
            $('#table-body').empty();
            $('#table-head').html("<tr><td>" + firstHeading + "</td><td>" + secondHeading + "</td><td>" + 
                "</td><td>" + thirdHeading + "</td><td>" + fourthHeading + "</td></tr>");  
            //Retrieve the last 5 data inputs
            database.ref().child('AC').orderByChild('dateAdded').limitToLast(5).on("child_added", function(childSnapshot){
                var outsideDiameterData = childSnapshot.val().outsideDiameter;
                var insideDiameterData = childSnapshot.val().insideDiameter;
                var holeDepthData = childSnapshot.val().holeDepth;
                var resultData = childSnapshot.val().result;
                console.log(childSnapshot.val().outsideDiameterData);
                console.log(childSnapshot.val().insideDiameterData);
                console.log(childSnapshot.val().holdDepthData);
                console.log(childSnapshot.val().resultData);
                if(outsideDiameterData != ""){
                    $('#table-body').append("<tr><td>" + outsideDiameterData + "</td><td>" + insideDiameterData + "</td><td>"
                     + "</td><td>" + holeDepthData + "</td><td>" + resultData + "</td></tr>");  
                } 
            }); 
            //Submit Firebase Code for Inner Capacity when user clicks the calculate button
            $("form").on("submit", function (e) {          
                 //$(this).off('click');   
                //Check if user has signed in                
                if( checkSignedIn() === true){
                    e.preventDefault();
                    //$(this).off('click');   
                    //logic for storing input
                    outsideDiameter = $('#outsideDiameter').val();
                    insideDiameter = $('#insideDiameter').val();
                    holeDepth = $('#holeDepth').val();
                    ///ACresult = 
                    //Push to Firebase
                    database.ref().child('AC').push({
                        outsideDiameter: outsideDiameter,
                        insideDiameter: insideDiameter,
                        holeDepth: holeDepth,
                        result: ACresult,
                        dateAdded: firebase.database.ServerValue.TIMESTAMP
                    })
                }    
            });
        };
    });


    //=============== Annular Velocity ===============/
    //Initialize Variables
    var florRate = 0;
    var largeDim = 0;
    var smallDim = 0;
    var AVresult = 0;

    $(document).on('click', '#AnnV', function () {

        var firstHeading = 'Flow Rate';
        var secondHeading = 'Large Diam';
        var thirdHeading = 'Small Diam';
        var fourthHeading = 'Result';

        if( checkSignedIn() === true){
            //$(this).off('click');
            $('#table-head').empty();
            $('#table-body').empty();
            $('#table-head').html("<tr><td>" + firstHeading + "</td><td>" + secondHeading + "</td><td>" + 
                "</td><td>" + thirdHeading + "</td><td>" + fourthHeading + "</td></tr>");  
            //Retrieve the last 5 data inputs
            database.ref().child('AV').orderByChild('dateAdded').limitToLast(5).on("child_added", function(childSnapshot){
                //console.log(childSnapshot.val().flowRate);
                var flowRateData = childSnapshot.val().flowRate;
                var largeDiamData = childSnapshot.val().largeDiam;
                var smallDiamData = childSnapshot.val().smallDiam;
                var resultData = childSnapshot.val().result;
                console.log(flowRateData);
                console.log(largeDiamData);
                console.log(smallDiamData);
                console.log(resultData);
                if(flowRateData != ""){
                    $('#table-body').append("<tr><td>" + flowRateData + "</td><td>" + largeDiamData + "</td><td>"
                     + "</td><td>" + smallDiamData + "</td><td>" + resultData + "</td></tr>");  
                } 
            }); 
            //Submit Firebase Code for Inner Capacity when user clicks the calculate button
            $("form").on("submit", function (e) {          
                 //$(this).off('click');   
                //Check if user has signed in                
                if( checkSignedIn() === true){
                    e.preventDefault();
                    //$(this).off('click');   
                    //logic for storing input
                    flowRate = $('#pumpOutput').val();
                    largeDiam = $('#bigDiam').val();
                    smallDiam = $('#smallDiam').val();
                    ///AVresult = 
                    //Push to Firebase
                    database.ref().child('AV').push({
                        flowRate: flowRate,
                        largeDiam: bigDiam,
                        smallDiam: smallDiam,
                        result: AVresult,
                        dateAdded: firebase.database.ServerValue.TIMESTAMP
                    })
                }    
            });
        };
    });





            //Formation Integrity Test (FIT) Initialize Variables
            //Formation Temperature Initialize Variables
            //Hydrostatic Pressure Initialize Variables
            //Leak Off Test (LOT) Initialize Variables
            //Pressure Gradient Initialize Variables
            //Slug Calculation Initialize Variables
}); // end ready  

