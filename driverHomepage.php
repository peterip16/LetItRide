<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">



    <link rel="stylesheet" href="css/driverhomepage.css">
    
    <script type="text/javascript" src="js/driverhomepage.js"></script>
    

  </head>
  <body>
    <div id="map"></div>

    <div class = "mainDriverPage">
      <img class="profileImage" src = "image/default.jpg">
      <div class="textLabel" id="name">
	  
	  <?php
	  
	  session_start();
	  
	  $mysqli = mysqli_connect("localhost", "root", "password", "letitridesystem");
	  
	  /* check connection */
	  if (mysqli_connect_errno()) {
	  printf("Connect failed: %s\n", mysqli_connect_error());
	  exit();
	  }
		
	  $query = "SELECT Name FROM rut WHERE UserID = '{$_SESSION['UserID']}'";
	  $result = mysqli_query($mysqli, $query);
	  
	  if (!$result) {
		echo "Could not successfully run query ($sql) from DB: " . mysql_error();
      exit;
}
	  
	  $row = mysqli_fetch_assoc($result);
	  echo $row['Name'];
	  
	  ?>
	  
	  </div>
		  <div class="left_panel" id = "panel1">
			<div class= "textLabel" id = "button1Label">
				<button id = "search" class="customer_search button" onclick = "startService()"/>Look for customer</button>
			</div>
			<div class="left_panel" id = "panel2">
				<div class= "textLabel" id = "button2Label">
					<button id = "quit" class="quit button"/>Quit</button>
				</div>
			</div>
		  </div>
		  <div class="left_panel" id = "panel3">
			<div class= "textLabel" id = "button3Label">
				<button id = "search" class="customer_search button" onclick = "startService()"/>Confirm Picked Up</button>
			</div>
			<div class= "textLabel" id = "button4Label">
				<button id = "quit" class="quit button 2"/>Quit</button>
			</div>
		  </div>
      </div>
    </div>


    

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDZH1m8DpmJxoEb-708cFe9u9rBFn_4B9g&libraries=places&callback=initMap"
         async defer></script>

    <script src="http://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>


  </body>
</html>