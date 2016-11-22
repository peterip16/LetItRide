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
var distance, duration;
var emulateDriver = false;
var pathComplete = false;
var routeNumber = 0;
var rdyDriv = false;
var zipcodes = [94102.0,94103.0,94104.0,94105.0,94107.0,94108.0,94109.0,94110.0,94111.0,94112.0,94114.0,94115.0,94116.0,94117.0,94118.0,94121.0,94122.0,94123.0,94124.0,94127.0,94129.0,94130.0,94131.0,94132.0,94133.0,94134.0,94158.0,94924.0,94925.0,94920.0,94913.0,94904.0,94901.0,94903.0,94949.0,94948.0,94947.0,94946.0,94945.0,94037.0,94941.0,94558.0,94940.0,94939.0,94938.0,94563.0,94937.0,94933.0,94930.0,94929.0,94928.0,94970.0,94971.0,94972.0,95471.0,94960.0,94963.0,94703.0,94105.0,94964.0,94965.0,94705.0,94956.0,95476.0,94957.0,94950.0,94952.0,94953.0,90266.0,94973.0,95650.0,94602.0,95012.0,94134.0,95023.0,94403.0,94402.0,94401.0,94404.0,94112.0,94107.0,94102.0,94303.0,94301.0,94089.0,89431.0,94074.0,94080.0,94066.0,94070.0,94062.0,94063.0,94065.0,94014.0,94013.0,94015.0,94018.0,94020.0,94019.0,94920.0,94021.0,94024.0,94025.0,94028.0,94027.0,94030.0,94553.0,94037.0,94038.0,94044.0,94060.0,94061.0,94541.0,97701.0,46123.0,21401.0,94002.0,94011.0,94005.0,94010.0,95002.0,95008.0,95013.0,95014.0,95020.0,94022.0,94024.0,95030.0,95032.0,95035.0,95037.0,95140.0,94040.0,94041.0,94043.0,94301.0,94304.0,94306.0,95117.0,95118.0,95119.0,95120.0,95121.0,95122.0,95123.0,95124.0,95125.0,95148.0,95126.0,95127.0,95128.0,95129.0,95130.0,95131.0,95132.0,95133.0,95110.0,95111.0,95134.0,95135.0,95136.0,95112.0,95113.0,95116.0,95138.0,95139.0,95046.0,95050.0,95051.0,95053.0,95054.0,95070.0,94305.0,94085.0,94086.0,94087.0,94089.0,94509.0,94806.0,94513.0,94553.0,94521.0,94531.0,94804.0,94582.0,94520.0,94561.0,94583.0,94523.0,94526.0,94801.0,94549.0,94518.0,94598.0,94803.0,94547.0,94530.0,94506.0,94597.0,94596.0,94519.0,94564.0,94563.0,94595.0,94556.0,94507.0,94805.0,94517.0,94572.0,94525.0,94511.0,94575.0,94528.0,94548.0,94516.0,94569.0,94522.0,94524.0,94527.0,94529.0,94570.0,94802.0,94807.0,94808.0,94820.0,94850.0,94505.0,94601.0,94597.0,94604.0,94605.0,94502.0,94602.0,94503.0,94603.0,94589.0,94587.0,94588.0,95628.0,94514.0,94618.0,94403.0,94621.0,95035.0,94619.0,94609.0,94501.0,94608.0,94607.0,94606.0,94613.0,94612.0,93292.0,94611.0,94610.0,94661.0,94702.0,94703.0,94704.0,94705.0,94660.0,95666.0,94806.0,94707.0,94706.0,94709.0,94708.0,94062.0,94710.0,94720.0,94577.0,94580.0,94578.0,95129.0,95128.0,94579.0,94586.0,94582.0,94557.0,94555.0,94560.0,94558.0,94565.0,94568.0,94566.0,94537.0,94538.0,94539.0,94541.0,94542.0,94544.0,94545.0,95391.0,94546.0,95603.0,94550.0,94551.0,94552.0,95377.0,95376.0,94536.0,94599.0,94573.0,94508.0,94576.0,94574.0,94503.0,94590.0,95442.0,95476.0,94515.0,94591.0,94559.0,95687.0,94558.0,94562.0,94533.0,94567.0,95461.0,95430.0,95433.0,95436.0,95439.0,95441.0,95442.0,94515.0,95444.0,95445.0,95446.0,95409.0,95412.0,95416.0,95419.0,95421.0,95422.0,95425.0,94611.0,94109.0,95465.0,95471.0,95472.0,95480.0,95473.0,95476.0,95486.0,95450.0,95448.0,95452.0,95462.0,94926.0,94922.0,94923.0,94574.0,95497.0,13329.0,94558.0,95492.0,94565.0,94931.0,95330.0,94928.0,95407.0,95406.0,94972.0,95405.0,95404.0,95403.0,95402.0,95401.0,94954.0,94951.0,94952.0,94158.0,94510.0,94571.0,94503.0,95625.0,94589.0,94590.0,94585.0,95694.0,94512.0,94591.0,94592.0,95690.0,95616.0,95618.0,94553.0,94561.0,95620.0,94559.0,95688.0,94558.0,95687.0,94565.0,93501.0,95918.0,94534.0,94533.0,94535.0,94505.0,95361.0,95252.0,95254.0,95253.0,95236.0,95234.0,95240.0,95237.0,95242.0,95126.0,95351.0,95632.0,95690.0,93660.0,95227.0,95825.0,95686.0,95230.0,95231.0,95215.0,95219.0,95336.0,95220.0,95337.0,95330.0,95320.0,95391.0,95385.0,95202.0,95203.0,95204.0,95304.0,95205.0,95377.0,95376.0,95258.0,95210.0,95212.0,95297.0,95206.0,95207.0,95648.0,95366.0,95208.0,95296.0,95367.0,95209.0,95010.0,95051.0,95060.0,95020.0,95019.0,95062.0,95018.0,95065.0,95017.0,95064.0,95067.0,95066.0,95073.0,95005.0,95033.0,95076.0,95030.0,95007.0,95006.0,95003.0,95041.0,94060.0,95075.0,95004.0,95020.0,93210.0,95043.0,95024.0,95023.0,93930.0,95045.0];
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
    //calculateAndDisplayRoute();
  }
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
    		rdyDriv = true;
    		//console.log("hello");
    		//console.log(result);
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

  var displayTimeDistance = document.getElementById("timeAndDistance");
  distance = (data.routes[fastestIndex].legs[0].distance.value * 0.000621371).toFixed(1);
  duration = (data.routes[fastestIndex].legs[0].duration_in_traffic.value / 60).toFixed(0);
  var fare = Number(distance)  + 5;
  fare = fare.toFixed(2);

  displayTimeDistance.innerHTML = "";
  displayTimeDistance.innerHTML += "Distance: " + distance + "mi<br />Duration: " + duration +" mins<br />Cost: $" + fare;
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