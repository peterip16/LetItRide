<?php
session_start();
require 'connection.php';

$userID = $_SESSION['UserID'];
$driverAddress = $_POST['driverAddress'];
$driverLat = $_POST['driverLat'];
$driverLng = $_POST['driverLng'];

$query = "SELECT * FROM `trans` WHERE DrivID='$userID' AND State != 'b'";
$result = mysqli_query($mysqli, $query) or die(mysql_error());
if (mysqli_num_rows($result) < 1){ 
 	sleep(5);
 	echo "Failed finding customer, searching again";
}
else {

	$query = "UPDATE `trans` SET DrivID = '$userID', drivCurAddr = '$driverAddress', drivLat = '$driverLat', drivLng = '$driverLng'  WHERE = DrivID='$userID' AND State != 'b'";
	$result = mysqli_query($mysqli, $query) or die(mysql_error());
	if ($result){

		//echo "Found Customer"; // echo customer information...

		//remove self from readydriver table
		$query = "SELECT * FROM `rdyDriv` WHERE DrivID='$DriverID'";
		$result = mysqli_query($mysqli, $query) or die(mysql_error());

		//get customer ID
		$query = "SELECT * FROM `trans` WHERE DrivID='$userID' AND State != 'b'";
		$result = mysqli_query($mysqli, $query) or die(mysql_error());
		while($row = $result->fetch_assoc()) {
        	$customerID = $row["customerID"];
        	$destination = $row["destin"];
        	$destinationLat = $row["destiLat"];
        	$destinationLng = $row["destiLat"];
        	$customerAddress = $row["custAddr"]
        	$customerLat = $row["custLat"];
        	$customerLng = $row["custLng"];
    	}

    	//get customer Name
    	$query = "SELECT 'Name' FROM `rut` WHERE UserID='$customerID'";
    	$result = mysqli_query($mysqli, $query) or die(mysql_error());
    	while($row = $result->fetch_assoc()) {
        	$customerName = $row["Name"];
    	}

    	//get Table Information

    	$data = array();
    	$data['name'] = array($customerName);
    	$data['id'] = array($customerID);
    	$data['destinationAddress'] = array($destination);
    	$data['destinationLat'] = array($destinationLat);
    	$data['destinationLng'] = array($destinationLng);
    	$data['customerAddress'] = array($customerAddress);
    	$data['customerLat'] = array($customerLat);
    	$data['customerLng'] = array($customerLng);

    	echo json_encode($data);
	}
}

 mysqli_close($mysqli);