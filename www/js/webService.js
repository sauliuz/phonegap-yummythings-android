/*
YummyThings app
webService.js

JavaScrip helper file to deal with web service requests.
Dependency: jQuery library must be present

Created by Saul Zukauskas // @sauliuz
PopularOwl Labs // www.popularowl.com
@20.05.2013
*/
            
function callWebService(){
    
    
    // We don't want API call to be made everytime
    // button is clicked. Only if no data loaded or
    // search keyword has changed
    if ($('#yummy').is(':empty') || window.localStorage.getItem("searchTerm") !== $("#question").val()){
        
        // Adding spinner image until we will get response
        $("#yummy").append("<img class='spinner' src='img/loadinfo.net.gif' />");
        
        
        // Storing value in the local storage
        var searchTerm = $("#question").val();
        window.localStorage.setItem("searchTerm", searchTerm);
        
        var question = window.localStorage.getItem("searchTerm");
        
        // Log
        console.log("Question value from textfield: " + question);
        
        
        //create the request url
        var url = "http://your.test.server.url/?q=" + question + "&requirePictures=true";
        
        // Log
        console.log("Request string: " + request);
        
        
        // Here we do call to web server
        // Wraping it into the function with callback in order
        // to update all results at once
        //
        // The use of promise as described in
        // http://stackoverflow.com/questions/5316697/jquery-return-data-after-ajax-call-success

        function getRecepies () {

          return $.ajax({
            url: request
          });
        }

        var promise = getRecepies();

        promise.success(function(data){

          // Log received content
          console.log("Received string: " + data); 

          // Clear spinner
          $("#yummy").empty();

          // Add results to HTML
          $("#yummy").html(data);

          
        });

    } // end if
    
}//end of function
