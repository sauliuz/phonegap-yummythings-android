<?php
/*

 Created as an example of server side functionality
 needed for YummyThings mobile app tutorial on
 www.htmlcenter.com

 Serves only as prototype, you'll need something
 much more sophisticated for live implementation.
 Use at your own risk!

 by Saul Zukauskas // @sauliuz
 PopularOwl Labs // www.popularowl.com

*/


// Get what's being sent to us
//
if ($_GET['q']) $question=$_GET['q'];
if ($_GET['requirePictures']) $rpictures=$_GET['requirePictures'];

if ($_GET['latitude']) $latitude=$_GET['latitude'];
if ($_GET['longitude']) $longitude=$_GET['longitude'];


///////////////////////////////////////
// SETUP //////////////////////////////
///////////////////////////////////////

// API credentials
//
$appid = "YOUR APP ID";
$appkey = "YOUR APP KEY";

// Number of itens in response 
$returnitems = 5;

///////////////////////////////////////


// Request if question was sent (Yummly API)
//
if ($question) {

	// Building string for GET request
	//
	$requeststr = "http://api.yummly.com/v1/api/recipes?";

	$requeststr=$requeststr."_app_id=".$appid;
	$requeststr=$requeststr."&_app_key=".$appkey;

	$requeststr=$requeststr."&q=".$question;
	if ($rpictures) $requeststr=$requeststr."&requirePictures=".$rpictures;


	// CURL for communicating with web service
	//
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL,$requeststr);
	curl_setopt($ch, CURLOPT_VERBOSE, 1);

	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);

	curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);


	$response = curl_exec($ch);


	// We will do some heavy lifting on the server side
	// parse JSON and send back already prepared html with
	// only the elements we have to add to fields
	//
	$response_decoded = json_decode($response, true);

	for ($i=1; $i<=$returnitems; $i++) {

		
		$returnstring = $returnstring."<li><p><img src='".
			$response_decoded['matches'][$i]['smallImageUrls']['0']."' /> ".
			$response_decoded['matches'][$i]['recipeName'].", it has ".count($response_decoded['matches'][$i]['ingredients'])." ingridients.</p></li>";
	}

	echo $returnstring;

}

// Request if longitude & latitude was sent (Google Maps)
//
if ($latitude && $longitude) {

	// Building string for request
	//
	$requeststr = "http://maps.googleapis.com/maps/api/geocode/json?";

	$requeststr=$requeststr."latlng=".$latitude.",".$longitude;
	$requeststr=$requeststr."&sensor=true";

	// CURL for communicating with web service
	//
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL,$requeststr);
	curl_setopt($ch, CURLOPT_VERBOSE, 1);

	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);

	curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);

	$response = curl_exec($ch);

	// We will do some heavy lifting on the server side
	// parse JSON and send back already prepared html with
	// only the elements we have to add to fields
	//
	$response_decoded = json_decode($response, true);

	// Give back location name
	//
	echo $response_decoded['results']['0']['address_components']['3']['long_name'];
}


?>
