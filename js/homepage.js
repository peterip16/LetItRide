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
var driverID, driverAddress, driverName, driverPhone, driverPlate, driverModel, driverLicense;
//SERVICE
var serviceStatus = false;
var interval = 5000;
var timer;
var updateCheck = 0;
var myMarker = [];
var polyline = [];
var poly2 = [];
var poly = null;
var startLocation = [];
var endLocation = [];
var timerHandle = [];
var distance;
var duration;
var emulateDriver = false;
var pathComplete = false;
var routeNumber = 0;
var rdyDriv = false;
var fare = 5;
var riding = false;

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
      icon: 'img/green-dot.png',
      zIndex: 50
    });
}

//PLACE DESTINATION MARKER
function placeDestinationMarker(location) {
  clearDestinationMarkers();
  desitinationMarker = new google.maps.Marker({
      position: location,
      map: map,
      icon: 'img/red-dot.png',
      zIndex: 50
    });
}

///////////////////

//MAP FUNCTIONS//
function initMap() {
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
    if(riding == false){
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
    }   
  });

  pickupLocation();
  desitination();
}

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

function calculateEachDriver(driver){
      directionsService = new google.maps.DirectionsService;
      directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(map);


      directionsService.route({
            origin: document.getElementById('from').value,
            destination: driver['location'],
            travelMode: 'DRIVING'
          }, function(response, status) {
            if (status === 'OK') {

              var route = response.routes[0];
              var str = route.legs[0].duration.text;

              time = str.substr(0, str.lastIndexOf("mins") - 1);
              
              
                // alert(driver['name'] + "      "+ time);
             
                if(!isNaN(time)){
                  time = Number(time);
                  // if(waitingTime > time){
                  //   waitingTime = time;
                  // }
                  var driverId = driver['id'];

                  var name = driver['name'];
                  var phone = driver['phone'];

                  var license = driver['license'];
                  var plate = driver['plate'];
                  var model = driver['model'];
                  // foundDriver(driverId, name, phone, license, plate, model, waitingTime);
                  arr.push( {
                      id: driverId,
                      name: name,
                      phone: phone,
                      license: license,
                      plate: plate,
                      model: model,
                      time: time
                  });
                }

                
                // return 1;
              }

            });
}

function closeDAndP(){
  $("#promptUserEnterDestinationAndPickupLocationScreen").hide();
}

function requestADriver(){
      var frm = document.getElementById("from");
      var to = document.getElementById("to");

      if(frm.value.length == 0 || to.value.length == 0){
          $("#promptUserEnterDestinationAndPickupLocationScreen").show();
      }else{


        $.getJSON('php/requestDrive.php', function(data){

        var waitingTime = 999999;
        var time;
        // var j = 0;
        var driverIndex;
        if(data.result.length > 0) {
          // alert(data.result.length );

          arr = [];
          for(i = 0; i < data.result.length; i++){

            calculateEachDriver(data.result[i]);

          }
          setTimeout(function(){ 
              if(arr.length > 0){
                for(i = 0; i < arr.length; i++){
      
                  if(arr[i].time < waitingTime){
                    waitingTime = arr[i].time;
                    driverIndex = i;
                  }
                }
                foundDriver(arr[driverIndex].id, arr[driverIndex].name, arr[driverIndex].phone, 
                        arr[driverIndex].license, arr[driverIndex].plate, arr[driverIndex].model, arr[driverIndex].time);
              }else{
                displayNoDriver();
              }


              }, 500);

        }
       else{
          displayNoDriver();
       }

       

      });
    
  }

}

function foundDriver(id, name, phone, license, plate, model, time){
  // alert(time > 30);
  // alert(id + " " + name  + " " + phone + " " + license + " " + plate + " " + model  + " " + time);
  // alert(time);
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
    //calculateAndDisplayRoute();
  
}

function displayRequestDriver(){
  var popUp = $('#requestDriverScreen');
  popUp.show();
}

function closeRequestDriver(){
  var popUp = $('#requestDriverScreen');
  popUp.hide();
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
  var frm = document.getElementById("from");
      var to = document.getElementById("to");

      if(frm.value.length == 0 || to.value.length == 0){
          $("#promptUserEnterDestinationAndPickupLocationScreen").show();
      }else{
  emulateDriver = false;
  // $('#dirctionDiscription').empty();
  // directionsDisplay.setPanel(document.getElementById('dirctionDiscription'));
    //console.log(toAddress);
    //console.log(fromAddress);     
    //var zipcode = toAddress.split(",");
    //zipcode = zipcode[2].split(" ");
   //  if(zipcodes.indexOf(parseFloat(zipcode[2])) > -1) {  
   //     console.log("Service Started");
    //   getTrafficPath();
    //   timer = setTimeout(startService(), interval);
    //   clearPickUpLocationMarkers(); 
    //   clearDestinationMarkers();  
   //  }
  // else alert("Destination must be within Bay Area");
  if(serviceStatus == false)
  {
    checkRdyDriv();
    if(rdyDriv == true) {
      if(checkDistance()) {
          console.log("Service Starting");
          serviceStatus = true;
          getTrafficPath();
          timer = setTimeout(startService(), interval);
          clearPickUpLocationMarkers(); 
          clearDestinationMarkers();  
      }
      else {
        alert("Destination must be within Bay Area");
      }
  }
  else {
    displayNoDriver();
  }
  }
  else {
    alert("Service Started Already");
  }
}
}

function serviceCalculateRoute()
{
  emulateDriver = true;
  // $('#dirctionDiscription').empty();
  // directionsDisplay.setPanel(document.getElementById('dirctionDiscription'));
  getTrafficPath(); //CALCULATE AND DISPLAYS PATH
  clearPickUpLocationMarkers(); 
  clearDestinationMarkers();   
}
function checkRdyDriv() {
  rdyDriv = false;
  $.ajax({
    url: 'php/checkRdyDriv.php',
    async:false,
    type: "POST",
    data: {
    fromLat: fromLat, fromLng: fromLng
    },
    success: function (result) {
      //console.log(result);
      if(result) {
        //console.log(result);
        checkRdyDrivDistance(result);
        //rdyDriv = true;
      }
      else {
        rdyDriv = false;
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
    }
});
}

function checkRdyDrivDistance(result) {
  var temptoAddress = fromAddress;
  temptoAddress = temptoAddress.replace(/,/g,"");
  temptoAddress = temptoAddress.replace(/ /g,"+");

  var tempfromAddress = result;
  tempfromAddress = tempfromAddress.replace(/,/g,"");
  tempfromAddress = tempfromAddress.replace(/ /g,"+");
  var newUrl = 'https://maps.googleapis.com/maps/api/directions/json?origin='+tempfromAddress+'&destination='+temptoAddress+'&departure_time=now&mode=driving&alternatives=true&travel_model=optimistic&key=AIzaSyCprZ188mVif2fk-gao8Tv3glyWkLaM59E';
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
      var data = JSON.parse(result);
  //console.log(result);
      if((data.routes[0].legs[0].duration_in_traffic.value / 60).toFixed(0) < 30) {
        rdyDriv = true;
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
    }
  });
}
function checkDistance() {
  var temptoAddress = toAddress;
  temptoAddress = temptoAddress.replace(/,/g,"");
  temptoAddress = temptoAddress.replace(/ /g,"+");

  var tempfromAddress = fromAddress;
  tempfromAddress = tempfromAddress.replace(/,/g,"");
  tempfromAddress = tempfromAddress.replace(/ /g,"+");
  var check = false;
  var newUrl = 'https://maps.googleapis.com/maps/api/directions/json?origin=San+Francisco&destination='+temptoAddress+'&departure_time=now&mode=driving&alternatives=true&travel_model=optimistic&key=AIzaSyCprZ188mVif2fk-gao8Tv3glyWkLaM59E';
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
      var data = JSON.parse(result);
      if((data.routes[0].legs[0].distance.value * 0.000621371).toFixed(1) < 90)
    {
        //console.log(data.routes[0].legs[0].distance.value * 0.000621371).toFixed(1);
        check = true;
    }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
    }
  });
  return check;
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

  //var displayTimeDistance = document.getElementById("timeAndDistance")
  distance = (data.routes[fastestIndex].legs[0].distance.value * 0.000621371).toFixed(1);
  duration = (data.routes[fastestIndex].legs[0].duration_in_traffic.value / 60).toFixed(0);
  console.log(distance);
  console.log(duration);

  //displayTimeDistance.innerHTML = "";
  //displayTimeDistance.innerHTML += "Distance: " + distance + "mi<br />Duration: " + duration +" mins<br />Cost: $" + fare;
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
      //console.log(response.routes[i]);
      if(response.routes[i].summary == routename)
      {
        routeNumber = i;
        $('.inputPanel').hide();
        $('.directionPanel').show();
        directionsDisplay.setDirections(response);
        directionsDisplay.setRouteIndex(i);
        directionsDisplay.setMap(map);

        if(emulateDriver) {
          //console.log("hello");
          var bounds = new google.maps.LatLngBounds();
          var route = response.routes[0];
          startLocation[i] = new Object();
          endLocation[i] = new Object();


          polyline[i] = new google.maps.Polyline({
          path: [],
          strokeColor: '#FFFF00',
          strokeWeight: 0
          });

          poly2[i] = new google.maps.Polyline({
          path: [],
          strokeColor: '#FFFF00',
          strokeWeight: 0
          });     

          var path = response.routes[i].overview_path;
          var legs = response.routes[i].legs;

          for (j=0;j<legs.length;j++) {
                if (j == 0) { 
                  startLocation[i].latlng = legs[j].start_location;
                  startLocation[i].address = legs[j].start_address;
                  // marker = google.maps.Marker({map:map,position: startLocation.latlng});
                  myMarker[i] = createMarker(legs[j].start_location,"start",legs[j].start_address,"green");
                }
                endLocation[i].latlng = legs[j].end_location;
                endLocation[i].address = legs[j].end_address;
                var steps = legs[j].steps;

                for (k=0;k<steps.length;k++) {
                  var nextSegment = steps[k].path;                
                  var nextSegment = steps[k].path;

                  for (l=0;l<nextSegment.length;l++) {
                      polyline[i].getPath().push(nextSegment[l]);
                      //bounds.extend(nextSegment[k]);
                  }

                }
          }
          polyline[i].setMap(map);
          startAnimation(i); 
        } 
        i = response.routes.length;
      }
    }
  });
}

function createMarker(latlng, label, html) {
  //console.log("createMarker");
// alert("createMarker("+latlng+","+label+","+html+","+color+")");
    var contentString = '<b>'+label+'</b><br>'+html;
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: label,
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
        marker.myname = label;

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker);
        });
    return marker;
}  


    var lastVertex = 1;
    var stepnum=0;
    var step = 50; // 5; // metres
    var tick = 100; // milliseconds
    //var tick = duration*60000; // milliseconds // time
    //var step = (distance*1609.34)/tick; // 5; // metres // distance 
    var eol= [];


//----------------------------------------------------------------------                
 function updatePoly(i,d) {
 // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow
    if (poly2[i].getPath().getLength() > 20) {
          poly2[i]=new google.maps.Polyline([polyline[i].getPath().getAt(lastVertex-1)]);
          // map.addOverlay(poly2)
        }

    if (polyline[i].GetIndexAtDistance(d) < lastVertex+2) {
        if (poly2[i].getPath().getLength()>1) {
            poly2[i].getPath().removeAt(poly2[i].getPath().getLength()-1)
        }
            poly2[i].getPath().insertAt(poly2[i].getPath().getLength(),polyline[i].GetPointAtDistance(d));
    } else {

        poly2[i].getPath().insertAt(poly2[i].getPath().getLength(),endLocation[i].latlng);
    }
 }
//----------------------------------------------------------------------------

function animate(index,d) {
  //console.log("animate"+index+" "+d);
   if (d>eol[index]) {
      myMarker[index].setPosition(endLocation[index].latlng);
      console.log("complete");
      pathComplete = true;
      myMarker[routeNumber].setMap(null);
      return;
   }
    var p = polyline[index].GetPointAtDistance(d);

    map.panTo(p);
    //console.log(p);

    myMarker[index].setPosition(p);
    updatePoly(index,d);
    timerHandle[index] = setTimeout("animate("+index+","+(d+step)+")", tick);
}

//-------------------------------------------------------------------------

function startAnimation(index) {
  tick = (distance*1609.34)/(duration*60000);
  step = tick*100;
  //console.log(tick);
  //console.log("start animation");
        if (timerHandle[index]) clearTimeout(timerHandle[index]);
        eol[index]=polyline[index].Distance();
        map.setCenter(polyline[index].getPath().getAt(0));

        poly2[index] = new google.maps.Polyline({path: [polyline[index].getPath().getAt(0)], strokeColor:"#FFFF00", strokeWeight:3});

        timerHandle[index] = setTimeout("animate("+index+",50)",2000);  // Allow time for the initial map display
}

//----------------------------------------------------------------------------    




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
                icon: 'img/red-dot.png',
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
                icon: 'img/green-dot.png',
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
            //console.log("test: "+data);
        }
    });   
}

//START SERVICE FOR CUSTOMER
function startService() {
  $.ajax({
    url: "php/addCustomer.php", 
    method: "post",
    data: {fromAddress: fromAddress, fromLat: fromLat, fromLng: fromLng,toAddress: toAddress, toLat: toLat, toLng: toLng},
    success: function(data){
      if(data != false) {
        console.log("Driver Found");
          clearTimeout(timer);
          timer = 0;
          riding = true;
          $('.home').hide();
          $('.profile').hide();
          var displayTimeDistance = document.getElementById("timeAndDistance");
          fare = Number(distance) + 5;

          //Driver information
          driverData = jQuery.parseJSON(data); 
          driverID = driverData.driverID;
          driverLng = driverData.driverLng;
          driverLat = driverData.driverLat;
          driverAddress = driverData.driverAddress;

          myAddress = fromAddress;
          destinationAddress = toAddress;
          toAddress = fromAddress;
          fromAddress = driverAddress;

          driverName = driverData.name;
          driverPhone = driverData.phone;
          driverLicense = driverData.license;
          driverPlate = driverData.plate;
          driverModel = driverData.model;
          foundDriver(driverID, driverName, driverPhone, driverLicense, driverPlate, driverModel, duration);
          serviceCalculateRoute();
          fare += Number(distance);
          displayTimeDistance.innerHTML = "";
          displayTimeDistance.innerHTML += "Distance: " + distance + "mi<br />Duration: " + duration +" mins<br />Cost: $" + fare;
          timer =setTimeout(waitForDriver(), interval); //Begin waiting for driver
          
      }
      else {
        clearTimeout(timer);
        timer = 0;
        console.log("Finding Driver");
        timer = setTimeout(startService(), interval); //Else continue finding a driver
      }
    }
  });
}

function waitForDriver() {
   $.ajax({
      url: "php/waitForDriver.php", 
      method: "post",
      data: {driverID: driverID},
      success: function(data){
          if(data != true){
            //console.log(driverID);
            clearTimeout(timer);
            //console.log(data);
            timer = setTimeout(waitForDriver(), interval);
            console.log("waiting");
            //later will track driver location and update marker
          }
          else if(data == true && pathComplete == true){
            pathComplete = false;
            clearTimeout(timer);
            timer = 0;
            console.log("Driver is here");
            console.log("Waiting for confirmation");
            timer = setTimeout(waitForConfirmation(), interval);
            //navigator.geolocation.getCurrentPosition(setUserCurrentLocation);
          }
          else {
            timer = setTimeout(waitForDriver(), interval);
            console.log("waiting");
            //console.log(data);
          }
      }
});
}

function waitForConfirmation() {
   $.ajax({
      url: "php/checkConfirm2.php", 
      method: "post",
      data: {driverID: driverID},
      success: function(data){
        if(data != true){
          //console.log(data);
          console.log("Waiting for confirmation");
          clearTimeout(timer);
          timer = 0;
          timer = setTimeout(waitForConfirmation(), interval);
        }
        else {
          myMarker[routeNumber].setMap(null);
          clearTimeout(timer);
          timer = 0;
          console.log("Driver has confirmed, now going to destination");
          timer = setTimeout(waitForDropOff(), interval);
          fromAddress = myAddress;
          toAddress = destinationAddress;
          serviceCalculateRoute();
          var displayTimeDistance = document.getElementById("timeAndDistance");
          displayTimeDistance.innerHTML = "";
          displayTimeDistance.innerHTML += "Distance: " + distance + "mi<br />Duration: " + duration +" mins<br />Cost: $" + fare;
        }
      }
  });
}

function waitForDropOff() {
  $.ajax({
      url: "php/customerConfirmDropOff.php", 
      method: "post",
      data: {driverID: driverID},
      success: function(data){
        if(data != true){
          console.log("Waiting for drop-off confirmation");
          clearTimeout(timer);
          timer = 0;
          timer = setTimeout(waitForDropOff(), interval);
        }
        else{
          $('.directionPanel').hide();
          $('.inputPanel').show();
          $('.home').show();
          $('.profile').show();
          riding = false;
          console.log("Destination reached");
          recentering();
          directionsDisplay.setMap(null);
          myMarker[routeNumber].setMap(null);
          serviceStatus = false;
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