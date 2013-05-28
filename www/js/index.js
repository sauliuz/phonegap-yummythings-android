/*
YummyThings app
index.js

PhoneGap example application
Created by Saul Zukauskas // @sauliuz
PopularOwl Labs // www.popularowl.com
@20.05.2013
*/

// Global variables
//
var onMobile = false;

// Declaring all jQeury bindings 
// once document is ready
//
$(document).ready( function(){

    // Once search button is clicked app
    // will show the 'content' element on the screen
    //
    $(".share").click(function (e) {
        $('.content').toggleClass('show');
    });
});

// First we are going to check if this PhoneGap app is running on
// supported mobile device (in our case it will be just iOS/Android)
//
function init(){

    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/)) {
        
        onMobile = true;
        // If running on mobile device, we have to register
        // for 'deviceready' event before moving forward
        document.addEventListener("deviceready", appInit(), false);

        // Log
        //
        console.log('index.js: running on supported mobile device: '+onMobile);

    } else {
      
        // Log
        //
        console.log('index.js: running in the browser');
        appInit();

    }
}

// Once Cordova is loaded we are going to perform all
// app start tasks and add funcionality to specific DOM events
//
var appInit = function () {
    
    // Log
    //
    console.log("index.js: appInit() runs..");


    // Getting the last used search keyword
    // and updating the input text field
    // If there is no value, means default
    // keyphrase will be used
    //
    var lastSearch = window.localStorage.getItem("searchTerm");

    // Log
    //
    console.log("index.js: lastSearch="+lastSearch);

    // Prefilling search field 
    if (lastSearch){
        $("#question").val(lastSearch);
    }else{
        $("#question").val('your ingridient?');
    }

    // Getting the location coordinates and 
    // location name
    //
    getLocationName();


}

// Geting location coordinates and updating HTML markup
// with received result
//
function getLocationName () {

    // Log
    //
    console.log("index.js: getting geolocation..");

    navigator.geolocation.getCurrentPosition(onSuccess, onError);


    // Success
    //
    function onSuccess(position) {

      // Capturing values for latitude + longitude
      //
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      console.log('Received current location: ' + latitude + ',' + longitude);

      // Asking maps.googleapis for name of the city
      //
      var url = 'http://your.test.server.url/?latitude='+latitude+'&longitude='+longitude;

      $.get(url, function(data) {

        // Add results to HTML
        $("#locationplaceholder").html("<div id='location'>Your current location is:<br /><strong>"+data+"</strong><br />Choose food wisely!</div>");

        // Log received content
        console.log("Location = " + data);
                
      });

    }

    // Error
    //
    function onError(error) {
        
        console.log('Received geolocation error. code:' + error.code);
        console.log('Received geolocation error. code:' + error.message);

        // Leting user know if he has disabled 
        //
        if (error.code === 1){

            $("#locationplaceholder").html("<div id='location'>You have disabled acces to your current location. Check the app settings if you want YummyThings to know where you currently are!</div>");
        }
    }
}


