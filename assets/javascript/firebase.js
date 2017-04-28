/**
 * Created by SilverDash on 4/26/17.
 */

// bmc: configure the firebase database and initialize
var configThisAlready = {
    apiKey: "AIzaSyCNyA8ecM-65kxrfuwxxMQr1f0Ujoasr7I",
    authDomain: "essential-oilfield-calcs.firebaseapp.com",
    databaseURL: "https://essential-oilfield-calcs.firebaseio.com/",
    projectId: "essential-oilfield-calcs",
    storageBucket: "essential-oilfield-calcs.appspot.com"
};
firebase.initializeApp(configThisAlready);
var uberDatabase = firebase.database();

// bmc: ONLY USE TO CLEAR THE COOKIE TO TEST
// $.removeCookie("oilfieldCalculations");


// bmc: get the cookie value for this user, if they have one
userID = $.cookie("oilfieldCalculations");
console.log("FYI: the cookie for this computer is " + userID);

// bmc: if this user doesn't have a cookie, give him one
if(!userID){

        var thisUserID = uberDatabase.ref().push({
            IC: "",
            AC: "",
            AV: "",
            FIT: "",
            FT: "",
            HP: "",
            LOT: "",
            PG: "",
            SC: ""
    }).key;
    console.log(thisUserID);
    $.cookie("oilfieldCalculations", thisUserID);
    console.log("FYI: the cookie for this computer will be " + thisUserID);
} // bmc: our user now has a cookie

thisCookie = $.cookie("oilfieldCalculations");
console.log("this should be the key and cookie: " + thisCookie);

// bmc: switch to referencing only that user's data
var thisUserDatabase = uberDatabase.ref(thisCookie);

console.log("this is the user we're on: " + thisUserDatabase);



// bmc: use in the event of needing to reset this whole thing...
if(thisCookie==="shakamakacoocoo"){
// uberDatabase.ref().set({
//     ColHeaders:{
//
//         titlesIC: {
//             innerDiam: "Diameter",
//             barrelsPerFoot: "bbl/ft",
//             feetPerBarrel: "ft/bbl",
//             gallonsPerFoot: "gal/ft",
//             feetPerGallon: "ft/gal"
//         },
//         titlesAC: {
//             innerDiam: "OD of Annulus",
//             outsideDiam: "ID of Annulus",
//             barrelsPerFoot: "bbl/ft",
//             feetPerBarrel: "ft/bbl",
//             gallonsPerFoot: "gal/ft",
//             feetPerGallon: "ft/gal"
//         },
//
//         titlesAnnV: {
//             barrelsPerMin: "Flow Rate",
//             bigDiam: "Large Diam",
//             smallDiam: "Small Diam",
//             feetPerMin: "ft/min",
//             feetPerSec: "ft/sec"
//         },
//
//         titlesFIT: {
//             fitRequired: "FIT required",
//             mudWeight: "Mud Weight",
//             shoeDepth: "Shoe Depth (TVD)",
//             presRequired: "psi required"
//         },
//
//         titlesFT: {
//             surfTemp: "Surface Temperature",
//             tempGrad: "Temperature Gradient",
//             formDepth: "Formation TVD",
//             formTemp: "Formation Temperature (F)"
//         },
//
//         titlesHP: {
//             mudWeight: "Mud weight",
//             verticalDepth: "TVD",
//             hydroPres: "Pressure"
//         },
//
//         titlesLOT: {
//             lotPressure: "LOT pressure",
//             mudWeight: "Mud weight",
//             shoeDepth: "Shoe Depth/TVD",
//             lotEquivMudWeight: "LOT equivalent mud weight"
//         },
//
//         titlesPresGrad: {
//             mudWeight: "Mud weight",
//             presGrad: "Pressure Gradient"
//         },
//
//         titlesSlugCalc: {
//             pipeLength: "Desired length dry pipe",
//             dpCapacity: "Drill pipe capacity",
//             currentMudWeight: "Current MW",
//             slugWeight: "Slug Weight",
//             hydroPresReq: "pressure required",
//             presGradDif: "pressure gradient dif.",
//             lengthOfSludInDP: "length of slug",
//             slugVolume: "slug volume"
//         }
//     }
//
// });
}