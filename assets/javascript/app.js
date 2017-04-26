$(document).ready(function () {


    //=================FIREBASE AUTH SECTION=====================//

    //Return true if user is signed-in. Otherwise false
    var checkSignedIn = function () {
        var auth = firebase.auth();
        if (auth.currentUser.email !== null) {
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

    //Function to get the modal
    var getModalToSignIn = function () {
        //Get the modal
        var modal = document.getElementById('my-modal');
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
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

        // Add Sign Up Element
        $("#btn-sign-up").one("click", function (event) {
            // Get email and password fields
            var email = $("#txt-email").val();
            var pass = $("#txt-password").val();

            //Sign in with email and pass.
            firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                //if(errorCode == 'auth/weak-password') {
                //alert('The password is too weak.');
                //}else{
                //alert(errorMessage);
                //}
                if (error) {
                    console.log(errorMessage);
                }

            });

            //modal.style.display = "none";
        });//End sign-up


        //Add login Element
        $("#btn-login").one("click", function (event) {
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
            });
            //modal.style.display = "none";
            //Send email verification
            sendEmailVerification();

        });//end login

        // User sign-out
        $('#btn-logout').one("click", function (event) {
            firebase.auth().signOut();
            modal.style.display = "none";

            //Show Login and Signup buttons
            $('#btn-login').addClass('show');
            $('#btn-sign-up').addClass('show');
            //Hide sign-out button.
            $('#btn-logout').addClass('hide');

        });


        //Add a realtime listener
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var email = user.email;

                if (user) {
                    console.log(user);
                    //If user is anonymously signed in
                    var isAnonymous = user.isAnonymous;
                    var uid = user.uid;
                    //Hide Login and Signup buttons
                    $('#btn-login').addClass('hide');
                    $('#btn-sign-up').addClass('hide');
                    //Show sign-out button.
                    $('#btn-logout').addClass('show');
                } else {
                    console.log("not logged in");
                    // Add Hide function if not logged-in
                    $('#btn-logout').addClass('hide');
                }
            }
        });
    }; // end getModalToSignIn


    //Log-in from Nav Bar
    $('ul.navbar-right li').one("click", function (e) {
        e.preventDefault();
        getModalToSignIn();
    });

    //===================== ADDING TO THE FIREBASE DATABASE===================//


    var dataRef = firebase.database().ref();
    

}); // end ready
