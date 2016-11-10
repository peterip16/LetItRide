      //Initializing Variables
      var fromResults; 
      var toResults;
      var geocoder; //Geolocation Service
      var directionsService; //Google Directions service
      var directionsDisplay; //Google Directions service
      var distanceService; //Google Matrix service
      var latlng; //Holds position (long, lat)
      var useLocation = false; //Boolean for using current location
      var map;
      var marker;
      var direction;
      var showhide = true;
      var lat1;
      var lng1;
      var trafficLayer;
      //End Of Initializing Variables

      //MARKERS
      function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
      function test()
      {
        if(showhide) {
          directionsDisplay.setPanel(null);
          showhide = false;
        }
        else {
          directionsDisplay.setPanel(document.getElementById('right-panel'));
          showhide = true;
        }
      }
      //END

      /////////////////////////////////////////
      ////////////Initialize map///////////////
      /////////////////////////////////////////
      function initAutocomplete() {
        lat1 = 0;
        lng1 = 0;
        trafficLayer = new google.maps.TrafficLayer();
        geocoder = new google.maps.Geocoder();
        directionsService = new google.maps.DirectionsService;
        distanceService = new google.maps.DistanceMatrixService;
        directionsDisplay = new google.maps.DirectionsRenderer({
          hideRouteList: true
        });
        //distanceService = new google.maps.DistanceMatrixService();

        //Displays Map
        map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.773972, lng: -122.431297},
        zoom: 13,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeId: 'roadmap'
        });
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));
        //CREATES INITAL MARKER ON LOCATION
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            map.setCenter(pos);
            map.setZoom(16); 
            var marker1 = new google.maps.Marker({
            position: {lat: position.coords.latitude, lng: position.coords.longitude},
            map: map,
            icon: 'https://i.imgur.com/mQ94NuU.png'
            });
          });
        }
        getGeolocation();

        // Create the search box and link it to the UI element.
        var input = document.getElementById('from');
        var input2 = document.getElementById('to');
        var searchBox = new google.maps.places.SearchBox(input);
        var searchBox2 = new google.maps.places.SearchBox(input2);

        //When user modify searchbox "from" it will reset useLocation boolean
        searchBox.addListener('places_changed', function() {
          useLocation = false;
          });

        //Add Location Button//
        var controlDiv = document.createElement('div');

        var firstChild = document.createElement('button');
        firstChild.style.backgroundColor = '#fff';
        firstChild.style.border = 'none';
        firstChild.style.outline = 'none';
        firstChild.style.width = '28px';
        firstChild.style.height = '28px';
        firstChild.style.borderRadius = '2px';
        firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
        firstChild.style.cursor = 'pointer';
        firstChild.style.marginRight = '10px';
        firstChild.style.padding = '0px';
        firstChild.title = 'Your Location';
        controlDiv.appendChild(firstChild);

        var secondChild = document.createElement('div');
        secondChild.style.margin = '5px';
        secondChild.style.width = '18px';
        secondChild.style.height = '18px';
        secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
        secondChild.style.backgroundSize = '180px 18px';
        secondChild.style.backgroundPosition = '0px 0px';
        secondChild.style.backgroundRepeat = 'no-repeat';
        secondChild.id = 'you_location_img';
        firstChild.appendChild(secondChild);
        //Add Location Button//


        firstChild.addEventListener('click', function() {
          var imgX = '0';
          var animationInterval = setInterval(function(){
            if(imgX == '-18') imgX = '0';
            else imgX = '-18';
            //$('#you_location_img').css('background-position', imgX+'px 0px');
          },500);
          getGeolocation();
        });         
        controlDiv.index = 1;
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
      }


      function toggleTraffic(){
          if(trafficLayer.getMap() == null){
              //traffic layer is disabled.. enable it
              trafficLayer.setMap(map);
          } else {
              //traffic layer is enabled.. disable it
              trafficLayer.setMap(null);             
          }
      }
      //Gets user's geolocation
      function getGeolocation()
      {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            /*var button = document.getElementById("spawnMarker");
            if(button.value == "Spawn Marker"){
              button.value = "Go To Marker";
            }*/
            if(marker == null) codeGeolocation(position.coords.latitude,position.coords.longitude);

            //IF MARKER EXISTS THEN ZOOM INTO IT
            else{
              /*map.setCenter(latlng);
              map.setZoom(15);*/
              marker.setMap(null);
              marker = null;
              codeGeolocation(position.coords.latitude,position.coords.longitude);
              directionsDisplay.setMap(null);
              var displayTimeDistance = document.getElementById("displayTimeDistance");
              displayTimeDistance.innerHTML = "";

            } 
          });
        } else {
          // Browser doesn't support Geolocation
          alert("Error: cannot retrieve geolocation");
        }
      }

      //Sets searchbox text to user address
      function codeGeolocation(lat,lng) {
        latlng = new google.maps.LatLng(lat, lng);
        lat1 = lat;
        lng1 = lng;
        geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        //console.log(results)
          if (results[1]) {
            //formatted address
            //alert(results[0].formatted_address);
            var array = results[0].formatted_address.split("");
            document.getElementById("from").placeholder = "";
            document.getElementById("from").value = "";
            document.getElementById("from").placeholder = results[0].formatted_address;
            useLocation = true;
            map.setZoom(15);
            map.setCenter(results[0].geometry.location);

            marker = new google.maps.Marker({
              position: latlng,
              map: map,
              animation: google.maps.Animation.DROP,
              draggable: true
              });

            marker.addListener('click', toggleBounce);
            google.maps.event.addListener(marker, 'dragend', function(evt){
              useLocation = true;
              latlng = new google.maps.LatLng(evt.latLng.lat().toFixed(3), evt.latLng.lng().toFixed(3));
              lat1 = evt.latLng.lat(); //sets lat for http request
              lng1 = evt.latLng.lng(); //sets lng for http request
              geocoder.geocode({'latLng': latlng}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                 var array = results[0].formatted_address.split("");
                 document.getElementById("from").placeholder = "";
                 document.getElementById("from").value = "";
                 document.getElementById("from").placeholder = results[0].formatted_address;}}});
                });

            google.maps.event.addListener(marker,'rightclick', function(){
              marker.setMap(null);
              marker = null;
              //document.getElementById("spawnMarker").value = "Spawn Marker";
            })
          } 
          else {
            alert("No results found");
          }
        } else {
          alert("Geocoder failed due to: " + status);
        }
      });
    }
    /////////////////////////////////////////
    /////////////////////////////////////////


    /////////////////////////////////////////
    ///Begin calulation direction and time///
    /////////////////////////////////////////
    function calculate() {
        getData();
    }

    function getLoc() {
      if(useLocation == true) return latlng;
        else return document.getElementById('from').value
    }
  
  //GET DATA FROM GOOGLE MAP API
    function getData() {
        var address = document.getElementById('to').value;
        address = address.replace(/,/g,"");
        address = address.replace(/ /g,"+");
        if(useLocation) {
            var url1 = 'https://maps.googleapis.com/maps/api/directions/json?origin='+lat1+','+lng1+
            '&destination='+address+'&departure_time=now&mode=driving&alternatives=true&travel_model=optimistic&key=AIzaSyCprZ188mVif2fk-gao8Tv3glyWkLaM59E';
            console.log(url1);
        }
        else {
            var address2 = document.getElementById('from').value;
            address2 = address2.replace(/,/g,"");
          address2 = address2.replace(/ /g,"+");
            var url1 = 'https://maps.googleapis.com/maps/api/directions/json?origin='+address2+
            '&destination='+address+'&departure_time=now&mode=driving&alternatives=true&travel_model=optimistic&key=AIzaSyCprZ188mVif2fk-gao8Tv3glyWkLaM59E';
            console.log(url1);
        }

        $.ajax({
        url: 'proxy.php',
        async:false,
        type: "POST",
        dataType: "json",
        data: {
          url:url1
        },
        success: function (result) {
            console.log(JSON.parse(result));
            displayDirections(JSON.parse(result));
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(thrownError);
        }
    });
  }

  //DISPLAY DATA AND PLACED ONTO MAP
  function displayDirections(data) {  
      var i = data.routes.length;
        console.log("# of routes: " +i);
        var fastestIndex = 0;
        var fastestPath = data.routes[i-1].legs[0].duration_in_traffic.value;
        //FIND FASTEST ROUTE
        while(i--) {
            console.log("route "+i +": "+data.routes[i].legs[0].duration_in_traffic.value+"seconds");
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
        console.log(routename);
        var date =  new Date();
        //DRAW ROUTE, MATCH BY ROUTE SUMMARY
        directionsService.route({
          origin: getLoc(),
            destination: document.getElementById('to').value,
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
            console.log(response.routes[i].summary);
            if(response.routes[i].summary == routename)
            {
                directionsDisplay.setDirections(response);
                directionsDisplay.setRouteIndex(i);
                directionsDisplay.setMap(map);
              i = response.routes.length;
            }
          }
        });
  }