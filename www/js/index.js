/*
$('#reposHome').bind('pageinit', function (event) {
	loadRepos();
});

function loadRepos() {
    $.ajax("res/car.json").done(function(data) {
		console.log(data);
		$("#car_app").append(data.ownerName + "'s " + data.model)
		$("#allRepos").append("<li><h4>Owner Details</h4><a href = 'owner.html'></a></li>"
							 );
		
        $('#allRepos').listview('refresh');
    });
}
*/

$(document).ready( function() {
    loadPageFunction();
});

function loadPageFunction() {
    var MAP = 1,
        HOME = 0;
    var currpage = HOME;


    if ($('#geoLocation').length > 0 && currpage != MAP){
        currpage = MAP;
        loadmap();   
    }

    
}

var map_initialised = false;
function loadRepos() {
    $.ajax("res/car.json").done(function(data) {
		$("#car_app").empty();
		$("#car_app").append(data.ownerName + "'s " + data.model);
		$("#allRepos").empty();
		$("#allRepos").append(
							 "<li><h4>Miles</h4><p>" + data.miles + "</p></li>" +
							 "<li><h4>gas Gallons</h4><p>" + data.gasGallons + "</p></li>" +
							 "<li><a href = 'owner.html' ><h4>Specifications</h4></a></li>" +
                             "<li><a href='googlemap.htm'><h4>Directions</h4></a></li>"
							 );
		
        $('#allRepos').listview('refresh');
		$("#ownerDetail").empty();
		$("#ownerDetail").append(				
							"<li><h4>miles Since Last Oil Change</h4><p>" + data.milesSinceLastOilChange + "</p></li>" +
							"<li><h4>max Miles Until Oil Change</h4><p>" + data.maxMilesUntilOilChange + "</p></li>" +
							"<li><h4>max Gas Gallons</h4><p>" + data.maxGasGallons + "</p></li>" +
							"<li><h4>miles Per Gallon</h4><p>" + data.milesPerGallon + "</p></li>"

							 );
		
        $('#ownerDetail').listview('refresh');
        
        // in map page
        if ($('#geoLocation').length > 0 && map_initialised == false) {        
            map_initialised = true;
            loadmap();
        }
        else if ($('#geoLocation').length == 0){
            map_initialised = false;
        }   
    });
}

function loadmap() {
    var map = showMap();
    $('#fromaddr').val("10 King's College Rd., Toronto");
}

function showMap() {
    var mapOptions = {
                     zoom: 18,
                     center: new google.maps.LatLng(43.660504, -79.395302),
                     mapTypeId: google.maps.MapTypeId.ROADMAP
                 }
                 
    var map = new google.maps.Map(document.getElementById("geoLocation"), mapOptions);
    return map;
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      alert("Geolocation service failed.");
      initialLocation = newyork;
    } else {
      alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
      initialLocation = siberia;
    }
    map.setCenter(initialLocation);
  }

function loadRepos_owner() {
    $.ajax("res/car.json").done(function(data) {
		console.log(data);
		$("#ownerDetail").append(							 
							"<li><h4>miles Since Last Oil Change</h4><p>" + data.milesSinceLastOilChange + "</p></li>" +
							"<li><h4>max Miles Until Oil Change</h4><p>" + data.maxMilesUntilOilChange + "</p></li>" +
							"<li><h4>max Gas Gallons</h4><p>" + data.maxGasGallons + "</p></li>" +
							"<li><h4>miles Per Gallon</h4><p>" + data.milesPerGallon + "</p></li>"
							 );
		
        $('#ownerDetail').listview('refresh');
    });
}

$( "#reposOwner" ).on( "pagecontainershow", function( event, ui ) {
  alert( "This page was just hidden: " + ui.prevPage );
});