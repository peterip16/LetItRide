<?php
session_start();
require 'connection.php';
$fromAddress= $_POST['fromAddress'];
$fromLat = $_POST['fromLat'];
$fromLng = $_POST['fromLng'];

$toAddress= $_POST['toAddress'];
$toLat = $_POST['toLat'];
$toLng = $_POST['toLng'];

$userID = $_SESSION['UserID'];

$query = "SELECT *, 3956 * 2 * ASIN(SQRT(POWER(SIN((lat - abs('$fromLat')) * pi()/180 / 2), 2) +  COS(lat * pi()/180 ) * COS(abs('$fromLng') * pi()/180) *  POWER(SIN((lng - '$fromLng') * pi()/180 / 2), 2) )) AS distance FROM `rdyDriv` having distance < 20 or distance IS NULL ORDER BY distance asc LIMIT 1";

$result = mysqli_query($mysqli, $query) or die(mysql_error());
if (mysqli_num_rows($result) < 1) { 
	sleep(1);
	echo false;
}

else {

	while($row = $result->fetch_assoc()) {
	    $DriverID = $row["DrivID"];
	    $DriverLocation = $row["DrivLocat"];
	    $DriverLat = $row["lat"];
	    $DriverLng= $row["lng"];
	    $Distance = $row["distance"];
	}

	$query = "SELECT * FROM `trans` WHERE CustID='$userID' AND State != 'e'";
	$result = mysqli_query($mysqli, $query) or die(mysql_error());
	if (mysqli_num_rows($result) > 0){ 
		echo false;
	}
	else {
		$query = "INSERT INTO `trans` (CustID, DrivID, State, custAddr, destin, custLat, custLng, destiLat,destiLng, drivCurAddr, drivLat, drivLng) values ('$userID', '$DriverID', 'a', '$fromAddress', '$toAddress', '$fromLat', '$fromLng', '$toLat', '$toLng', '$DriverLocation', '$DriverLat', '$DriverLng')";
		//echo $query;
		$result = mysqli_query($mysqli, $query) or die(mysql_error());
		if ($result){
			$query = "SELECT * FROM `rut` WHERE UserID='$DriverID'";
		    $result = mysqli_query($mysqli, $query) or die(mysql_error());
		    	while($row = $result->fetch_assoc()) {
		        	$driverName = $row["Name"];
		        	$driverPhone = $row["Phonenumber"];
			}

			$query = "SELECT * FROM `dit` WHERE UserID='$DriverID'";
		    $result = mysqli_query($mysqli, $query) or die(mysql_error());
		    	while($row = $result->fetch_assoc()) {
		        	$driverLicense = $row["Driverlicense"];
		        	$driverPlate = $row["Licenseplate"];
		        	$driverCar = $row["Carmodel"];

			}

			$query = "DELETE FROM `rdyDriv` WHERE DrivID='$DriverID'";
			$result = mysqli_query($mysqli, $query) or die(mysql_error());
			
		    $data = [ 'name' => $driverName, 'driverID' => $DriverID, 'driverAddress' => $DriverLocation, 'driverLat' => $DriverLat, 'driverLng' => $DriverLng, 'distance' => $Distance, 'license' => $driverLicense, 'plate' => $driverPlate, 'model' => $driverCar,  'phone' => $driverPhone];

		    sleep(1);
	    	echo json_encode($data);
    	}
	}
}

