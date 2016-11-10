var map;
var userCurrMarker;
var selectLoction;
var geocoder;
var trafficLayer;
var request;
var directionsService;
var directionsDisplay;
var check;
var desitinationMarkers;
var pickupLocationMarkers;
var pickupLocationMarker;
var desitinationMarker;

//VARIABLES FOR DB
var fromLat;
var fromLng;
var toLat;
var toLng;
var fromAddress;
var destinationAddress;
var toAddress;
var userAddress;
var userID
var driverID;
//SERVICE
var serviceStatus = false;
var interval = 5000;
var timer;
var updateCheck = 0;
//MARKER FUNCTIONS//
function clearDestinationMarkers() {
	if(desitinationMarker != null){
		desitinationMarker.setMap(null);
	}
	if(desitinationMarkers != null) {
		desitinationMarkers.forEach(function(marker) {
			marker.setMap(null);
		});
	}
}

function clearPickUpLocationMarkers() {
	if(pickupLocationMarker != null){
		pickupLocationMarker.setMap(null);
	}
	if(pickupLocationMarkers != null) {
		pickupLocationMarkers.forEach(function(marker) {
			marker.setMap(null);
		});
	}
}

//PLACE PICK UP MARKER
function placePickUpLocationMarker(location){
  clearPickUpLocationMarkers();
  pickupLocationMarker = new google.maps.Marker({
      position: location,
      map: map,
      icon: 'image/green-dot.png',
      zIndex: 50
    });
}

//PLACE DESTINATION MARKER
function placeDestinationMarker(location) {
  clearDestinationMarkers();
  desitinationMarker = new google.maps.Marker({
      position: location,
      map: map,
      icon: 'image/red-dot.png',
      zIndex: 50
    });
}

///////////////////

//MAP FUNCTIONS//
function initMap(location) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7749, lng: -122.4194},
    zoom: 15,
    mapTypeId: 'roadmap',
    disableDefaultUI: true,
    zoomControl: true
  });
  map.setClickableIcons(false);

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer({
          hideRouteList: true
  });
  directionsDisplay.setMap(map);
  geocoder = new google.maps.Geocoder();
  trafficLayer = new google.maps.TrafficLayer();
  // trafficLayer.setMap(map);

  if (navigator.geolocation) {
    recentering();
  }

  google.maps.event.addListener(map, 'click', function(event){
    if (!document.getElementById('selected').checked){
      placePickUpLocationMarker(event.latLng);
    
      geocoder.geocode({'latLng': event.latLng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            fromAddress = results[0].formatted_address;
            fromLng = event.latLng.lng();
            fromLat = event.latLng.lat();
            document.getElementById("from").placeholder = "";
            document.getElementById("from").value = fromAddress;
          }
        }
      });
    }
    else {
      placeDestinationMarker(event.latLng);
    
      geocoder.geocode({'latLng': event.latLng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            toAddress = results[0].formatted_address;
            toLng = event.latLng.lng();
            toLat = event.latLng.lat();
            document.getElementById("to").placeholder = "";
            document.getElementById("to").value = toAddress;
          }
        }
      });
    }   
  });

  pickupLocation();
  desitination();
}

// function readURL(input) {

//     if (input.files && input.files[0]) {
//         var reader = new FileReader();

//         reader.onload = function (e) {
//             $('#blah').attr('src', e.target.result);
//         }

//         reader.readAsDataURL(input.files[0]);
//     }
// }

// $("#imgInp").change(function(){
//     readURL(this);
// });


//SHOW/HIDE TRAFFIC LAYER ON MAP
function toggleTraffic(){
    if(trafficLayer.getMap() == null){
        //traffic layer is disabled.. enable it
        trafficLayer.setMap(map);
    } else {
        //traffic layer is enabled.. disable it
        trafficLayer.setMap(null);             
    }
} 

function requestADriver(){
      // alert("hello");

      // var popUp = document.getElementById("noDriverScreen");


      
      // popUp.style.display("block");


      $.getJSON('php/requestDrive.php', function(data){

        // alert(data.result.length);
      // $.each(data.result, function(){
      
      // var driverId;
      var waitingTime = 999999;
      var time;
      var j = 0;
      var driverIndex;
      if(data.result.length > 0) {
        // alert(data.result.length );

        
        for(i = 0; i < data.result.length; i++){
          directionsService = new google.maps.DirectionsService;
          directionsDisplay = new google.maps.DirectionsRenderer;
          directionsDisplay.setMap(map);
          // alert(i);
          directionsService.route({
            origin: document.getElementById('from').value,
            destination: data.result[i]['location'],
            travelMode: 'DRIVING'
          }, function(response, status) {
            if (status === 'OK') {

              // directionsDisplay.setDirections(response);

              var route = response.routes[0];
              var str = route.legs[0].duration.text;
              // var time = Number(route.legs[0].duration.text);

              time = str.substr(0, str.lastIndexOf("mins") - 1);
              
              
              // alert(data.result[i]['id']);
                // alert(time);
                 // alert(waitingTime);
                if(!isNaN(time)){
                  time = Number(time);
                  // alert(waitingTime > time);
                  if(waitingTime > time){
                    waitingTime = time;
                    
                    driverIndex = j;
                    // alert(driverId + " " + waitingTime);
                  }
                }
                j++;

                // alert(j);
                if(driverIndex == null){
                  displayNoDriver();
                }
                if(j == data.result.length){
                  // alert(data.result[driverIndex]['model']);
                  var driverId = data.result[driverIndex]['id'];

                  var name = data.result[driverIndex]['name'];
                  var phone = data.result[driverIndex]['phone'];

                  var license = data.result[driverIndex]['license'];
                  var plate = data.result[driverIndex]['plate'];
                  var model = data.result[driverIndex]['model'];
                  // alert(data.result[driverIndex]['id']);
                  // alert(waitingTime);
                  foundDriver(driverId, name, phone, license, plate, model, waitingTime);
                }
                

              }
              
              // alert(disNaN(time));
              // alert(driverId + " " + waitingTime);
              


            });

          
          // alert(time);
          
          // alert(driverId + " " + waitingTime);
        }

        // alert(driverId + " " + waitingTime);
        // if(waitingTime > 30){
        //   displayNoDriver();
        // }else{
        //   alert(driverId + " " + waitingTime);
        // }
        


      }
     else{
        displayNoDriver();
     }

     // alert(j);

    });

    // alert(j);

}

function foundDriver(id, name, phone, license, plate, model, time){
  // alert(time > 30);
  // alert(id + " " + name  + " " + phone + " " + license + " " + plate + " " + model  + " " + time);
  // alert(time);
  if(time > 30){
          displayNoDriver();
  }else{
    // alert(id.substr(62));
    // for(i = 0; i < id.length; i++){
    //   alert(id.charAt(i) != 0);
    //   if(id.charAt(i) != 0){
    //     id.substr(i);
    //     break;
    //   }
    // }
    // alert(id + " " + name  + " " + phone + " " + license + " " + plate + " " + model  + " " + time);
    id = id.substr(60);
    var nm = $('#diverName');
    var did = $('#drivId');
    var carModel = $('#model');
    var lic = $('#license');
    var pl = $('#plate');
    var ph = $('#phone');
    var waitingTime = $('#waitingTime');

    nm.html(name);
    did.html("Driver ID: "+ "\t" +id);
    carModel.html("Car model: " +"\t" +model);
    lic.html("Driver license: " + "\t" +license);
    pl.html("Plate number: " + "\t" +plate);
    ph.html("Contact phone number: " + "\t" +phone);
    waitingTime.html("Eastimated waiting time:" + "\t" + time + " mins");

     // $(name).appendTo(nm);
     // nm.append(name);

    var popUp = $('#requestDriverScreen');
    popUp.show();
  }
}

function closeRequestDriver(){
  var popUp = $('#requestDriverScreen');
  popUp.hide();
  calculateAndDisplayRoute();
}

function displayNoDriver(){
  var popUp = $('#noDriverScreen');
  popUp.show();
}

function closeNoDriver(){
  var popUp = $('#noDriverScreen');
  popUp.hide();
}

function calculateAndDisplayRoute(){

  // if(directionsDisplay){
  //     directionsDisplay.setMap(null);
  // }
  // directionsDisplay.setMap(map);
  // directionsService = new google.maps.DirectionsService;
  // directionsDisplay = new google.maps.DirectionsRenderer;
  // if(directionsDisplay){
  //     directionsDisplay.setMap(null);
  // }
  // directionsDisplay.setMap(map);


  $('#dirctionDiscription').empty();
  directionsDisplay.setPanel(document.getElementById('dirctionDiscription'));
  getTrafficPath(); //CALCULATE AND DISPLAYS PATH
  //storeLongLat(); //STORE USER's PICKUP LOCATION + DESTINATION
  timer = setTimeout(startService(), interval);
  clearPickUpLocationMarkers(); 
  clearDestinationMarkers();     

}

function getTrafficPath() {  
  //console.log(toAddress);
  //console.log(fromAddress);       
  var temptoAddress = toAddress;
  temptoAddress = temptoAddress.replace(/,/g,"");
  temptoAddress = temptoAddress.replace(/ /g,"+");

  var tempfromAddress = fromAddress;
  tempfromAddress = tempfromAddress.replace(/,/g,"");
  tempfromAddress = tempfromAddress.replace(/ /g,"+");

  var newUrl = 'https://maps.googleapis.com/maps/api/directions/json?origin='+tempfromAddress+
            '&destination='+temptoAddress+'&departure_time=now&mode=driving&alternatives=true&travel_model=optimistic&key=AIzaSyCprZ188mVif2fk-gao8Tv3glyWkLaM59E';
  $.ajax({
    url: 'php/proxy.php',
    async:false,
    type: "POST",
    dataType: "json",
    data: {
      url:newUrl
    },
    success: function (result) {
      //console.log(JSON.parse(result));
      displayDirections(JSON.parse(result));
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
    }
  });
}

function displayDirections(data) {
  var i = data.routes.length;
  //console.log("# of routes: " +i);
  var fastestIndex = 0;
  var fastestPath = data.routes[i-1].legs[0].duration_in_traffic.value;
  //FIND FASTEST ROUTE
  while(i--) {
    //console.log("route "+i +": "+data.routes[i].legs[0].duration_in_traffic.value+"seconds");
    if(data.routes[i].legs[0].duration_in_traffic.value < fastestPath) {
      fastestIndex = i;
      fastestPath = data.routes[i].legs[0].duration_in_traffic.value;
    }
  } 

  var displayTimeDistance = document.getElementById("timeAndDistance");
  var distance = (data.routes[fastestIndex].legs[0].distance.value * 0.000621371).toFixed(1);
  var duration = (data.routes[fastestIndex].legs[0].duration_in_traffic.value / 60).toFixed(0);

  displayTimeDistance.innerHTML = "";
  displayTimeDistance.innerHTML += "Distance: " + distance + "mi Duration: about" + duration +" minutes"
  var routename = data.routes[fastestIndex].summary; //USED CURRENTLY FOR COMPARE
  //console.log(routename);
  var date =  new Date();
  //DRAW ROUTE, MATCH BY ROUTE SUMMARY
  directionsService.route({
    origin: fromAddress,
    destination: toAddress,
    travelMode: 'DRIVING',
    drivingOptions:{
      departureTime: date
    },
    provideRouteAlternatives: true
  },
  function(response, status) {
    var i;
    for(i = 0; i < response.routes.length; i++)
    {
      //console.log(response.routes[i].summary);
      if(response.routes[i].summary == routename)
      {
      	$('.inputPanel').hide();
        $('.directionPanel').show();
        directionsDisplay.setDirections(response);
        directionsDisplay.setRouteIndex(i);
        directionsDisplay.setMap(map);
        i = response.routes.length;
      }
    }
  });
}
function recentering(){
	clearPickUpLocationMarkers();
	if (navigator.geolocation) {
		if(userCurrMarker != null) userCurrMarker.setMap(null);

		navigator.geolocation.getCurrentPosition(setUserCurrentLocation);
	}
}
function setUserCurrentLocation(position){
  if(userCurrMarker != null) userCurrMarker.setMap(null);
  var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
  map.setCenter(pos);
  map.setZoom(15);
  placePickUpLocationMarker(pos);
  userCurrMarker = new google.maps.Marker({
            position: pos,
            map: map,
            icon: 'https://i.imgur.com/mQ94NuU.png',
            zIndex: 0
          });
	geocoder.geocode({'latLng': userCurrMarker.position}, function(results, status) {
	if (status == google.maps.GeocoderStatus.OK) {
		if (results[0]) {
			fromAddress = results[0].formatted_address;
			fromLng = userCurrMarker.position.lng();
			fromLat = userCurrMarker.position.lat();
			//console.log(fromAddress +fromLat +fromLng);
			document.getElementById("from").placeholder = "";
	//document.getElementById("from").value = "";
	document.getElementById("from").value = fromAddress;
		}
	}
	});
}

function desitination() {
  var input = document.getElementById('to');
  var searchBox = new google.maps.places.SearchBox(input);
  desitinationMarkers = [];
  map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();
          //console.log(places);
          clearDestinationMarkers();
          if (places.length == 0) {
            return;
          }
          else if(places.length == 1){                            
          	toAddress = places[0].formatted_address;
          	toLng = places[0].geometry.location.lng();
            toLat = places[0].geometry.location.lat();
            //console.log(toLng+" "+toLat+" "+toAddress);
          }
          else {
          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          var i = 1;
          //console.log(places.length);

          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            
            // Create a marker for each place.
            window.setTimeout(function() {
              var newMarker = new google.maps.Marker({
                position: place.geometry.location,
                map: map,
                animation: google.maps.Animation.DROP,
                icon: 'image/red-dot.png',
                zIndex: 50
              });

              desitinationMarkers.push(newMarker);
              google.maps.event.addListener(newMarker, 'click', 
                  function(event)
                  {
                      geocoder.geocode({'latLng': event.latLng}, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                          if (results[0]) {
                            toAddress = results[0].formatted_address;
                            toLng = event.latLng.lng();
                            toLat = event.latLng.lat();
                            placeDestinationMarker(newMarker.position);
                            document.getElementById("to").placeholder = "";
                            document.getElementById("to").value = toAddress;
                          }
                        }
                      });
                  }
              );

            }, i * 200);
            i += 1;

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        }
        });
}

function pickupLocation() {
  var input = document.getElementById('from');
  var searchBox = new google.maps.places.SearchBox(input);
  pickupLocationMarkers = [];
  map.addListener('bounds_changed', function() {searchBox.setBounds(map.getBounds());});
        
        //var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();
			clearPickUpLocationMarkers();
          if (places.length == 0) {
            return;
          }
          else if(places.length == 1) {
          	fromAddress = places[0].formatted_address;
          	fromLng = places[0].geometry.location.lng();
            fromLat = places[0].geometry.location.lat();
            //console.log(fromLng+" "+fromLat+" "+fromAddress);
          }
          //selectLoction.setMap(null);
          
          else {
          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          var i = 1;
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }

            window.setTimeout(function() {
              var newMarker = new google.maps.Marker({
                position: place.geometry.location,
                map: map,
                animation: google.maps.Animation.DROP,
                icon: 'image/green-dot.png',
                zIndex: 50
              });
              pickupLocationMarkers.push(newMarker);
              google.maps.event.addListener(newMarker, 'click', 
                  function(event)
                  {
                      geocoder.geocode({'latLng': event.latLng}, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                          if (results[0]) {
                            fromAddress = results[0].formatted_address;
                            fromLng = event.latLng.lng();
                            fromLat = event.latLng.lat();
                            placePickUpLocationMarker(newMarker.position);
                            document.getElementById("from").placeholder = "";
                            // document.getElementById("from").value = "";
                            document.getElementById("from").value = fromAddress;
                          }
                        }
                      });
                  }
              );

            }, i * 100);

            i += 1;
            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
      	}
        });
}

function storeLongLat()
{
  $.ajax({
        url: "php/addlnglatDB.php", 
        type: "post",
        data: {toLng: toLng, toLat: toLat, toAddress: toAddress,
               fromLng: fromLng, fromLat: fromLat, fromAddress: fromAddress},
        success: function(data){
            console.log("test: "+data);
        }
    });   
}

function startService() {
  if(serviceStatus == false) {
    serviceStatus = true;
    $.ajax({
      url: "php/addCustomer.php", 
      method: "post",
      data: {fromAddress: fromAddress, fromLat: fromLat, fromLng: fromLng,toAddress: toAddress, toLat: toLat, toLng: toLng},
      success: function(data){
        if(data != false) {
            //console.log(data);

            clearTimeout(timer);
            timer = 0;
            console.log("System has matched a driver");
            driverData = jQuery.parseJSON(data); 
            //console.log(driverData);
            driverID = driverData.driverID;
            //console.log(driverID);
            driverLng = driverData.driverLng;
            driverLat = driverData.driverLat;
            driverAddress = driverData.driverAddress;
            destinationAddress = toAddress;
            toAddress = fromAddress;
            fromAddress = driverAddress;
            //console.log(destinationAddress);
            calculateAndDisplayRoute();
            timer =setTimeout(waitForDriver(), interval); //begin searching for customer
        }
        else {
          clearTimeout(timer);
          timer = 0;
          serviceStatus = false;
          console.log("Finding Driver");
          timer = setTimeout(startService(), interval);
        }
      }
    });
    
  }
}
function getDriver() {  
  clearTimeout(timer);  
    $.ajax({
      url: "php/getDriver.php", 
      method: "post",
      data: {fromLat:fromLat, fromLng:fromLng, fromAddress: fromAddress},
      success: function(data){
          if(data == false){
            timer = setTimeout(getDriver(), interval);
          }
          else {
            clearTimeout(timer);
            timer = 0;
            
            driverData = data;

            driverID = data.driverID[0];
            driverLng = data.driverLng[0];
            driverLat = data.driverLat[0];
            driverAddress = data.driverAddress[0];
            destinationAddress = toAddress;
            toAddress = fromAddress;
            fromAddress = driverAddress;
            updateCheck = 0;
            //calculateAndDisplayRoute();
            setTimeout(waitForDriver(), interval);
          }
      }
    });
}

function waitForDriver() {
console.log("waiting for driver");
   $.ajax({
      url: "php/waitForDriver.php", 
      method: "post",
      data: {driverID: driverID},
      success: function(data){
          if(data != true){
          	 clearTimeout(timer);
          	console.log(data);
            timer = setTimeout(waitForDriver(), interval);
            console.log("waiting for driver");
            if(updateCheck < 1){
				//console.log(fromAddress + " " + toAddress);
      				calculateAndDisplayRoute();
      				updateCheck++;
      			}
            //later will track driver location and update marker
          }
          else {
            console.log("Driver is here");
            navigator.geolocation.getCurrentPosition(setUserCurrentLocation);
            toAddress = destinationAddress;
            calculateAndDisplayRoute();
          }
      }
});
}
function stopService() {
  if(serviceStatus == true) {
     $.ajax({
      url: "php/removeCustomer.php", 
      method: "post",
      data: {fromAddress: fromAddress},
      success: function(data){
        console.log("Service Stopped");
      }
    });  
    clearTimeout(timer);
    serviceStatus = false;
    timer = 0;
  }
}