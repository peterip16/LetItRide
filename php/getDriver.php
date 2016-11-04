<?php
//session_start();
require 'connection.php';

$userID= $_SESSION['UserID'];
$fromAddress = $_POST['fromAddress'];
$fromLat = $_POST['fromLat'];
$fromLng = $_POST['fromLng'];

//$fromLat = 121.9763;
//$fromLng = 37.40445;

$query = "SELECT *, 3956 * 2 * ASIN(SQRT(POWER(SIN((lat - abs('$fromLat')) * pi()/180 / 2), 2) +  COS(lat * pi()/180 ) * COS(abs('$fromLng') * pi()/180) *  POWER(SIN((lng - '$fromLng') * pi()/180 / 2), 2) )) AS distance FROM `rdyDriv` ORDER BY distance asc LIMIT 1";

$result = mysqli_query($mysqli, $query) or die(mysql_error());

if (mysqli_num_rows($result) < 1){ 
	sleep(5);
 	echo false;
}

else {
	while($row = $result->fetch_assoc()) {
        	$DriverID = $row["DrivID"];
    }
    $query = "UPDATE `trans` SET DrivID = '$DriverID' WHERE = CustID='$userID' AND State != 'b'";
    $result = mysqli_query($mysqli, $query) or die(mysql_error());

    $query = "SELECT * FROM `rdydriv` WHERE = DrivID = '$DriverID'";
    	while($row = $result->fetch_assoc()) {
        	$driverAddress = $row["driverAddress"];
        	$driverLat = $row["driverLat"];
        	$driverLng = $row["driverLng"];
    	}

    $query = "SELECT * FROM `rut` WHERE UserID='$customerID'";
    $result = mysqli_query($mysqli, $query) or die(mysql_error());
    	while($row = $result->fetch_assoc()) {
        	$driverName = $row["Name"];
    }

    //$query = "DELETE FROM `rdyDriv` WHERE DrivID = '$DriverID'";
    //$result = mysqli_query($mysqli, $query) or die(mysql_error());
    
    	$data = array();
    	$data['name'] = array($driverName);
    	$data['driverID'] = array($DriverID);
    	$data['driverAddress'] = array($driverAddress);
    	$data['driverLat'] = array($driverLat);
    	$data['driverLng'] = array($driverLng);

    	echo json_encode($data);
}
