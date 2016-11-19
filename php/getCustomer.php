<?php
session_start();
require 'connection.php';

$userID = $_SESSION['UserID'];
$driverAddress = $_POST['driverAddress'];
$driverLat = $_POST['driverLat'];
$driverLng = $_POST['driverLng'];

$query = "SELECT * FROM `trans` WHERE DrivID='$userID' AND State != 'e'";
$result = mysqli_query($mysqli, $query) or die(mysql_error());
if (mysqli_num_rows($result) < 1){ 
 	sleep(1);
 	echo false;
}
else {
		//echo "Found Customer"; // echo customer information...

		//remove self from readydriver table
		//$query = "SELECT * FROM `rdyDriv` WHERE DrivID='$DriverID'";
		//$result = mysqli_query($mysqli, $query) or die(mysql_error());

		//get customer ID
		$query = "SELECT CustID, destin, destiLat, destiLng, custAddr, custLat, custLng FROM `trans` WHERE DrivID='$userID' AND State != 'e'";
        //echo $query;
		$result = mysqli_query($mysqli, $query) or die(mysql_error());
		while($row = $result->fetch_assoc()) {
        	$customerID = $row["CustID"];
            //echo $customerID;
        	$destination = $row["destin"];
            //echo $destination;
        	$destinationLat = $row["destiLat"];
            //echo $destinationLat;
        	$destinationLng = $row["destiLng"];
            //echo $destinationLng;
        	$customerAddress = $row["custAddr"];
            //echo $customerAddress;
        	$customerLat = $row["custLat"];
            //echo $customerLat;
        	$customerLng = $row["custLng"];
            //echo $customerLng;

    	}
        
    	//get customer Name
    	$query = "SELECT * FROM `rut` WHERE UserID='$customerID'";
    	$result = mysqli_query($mysqli, $query) or die(mysql_error());
    	while($row = $result->fetch_assoc()) {
        	$customerName = $row["Name"];
            //echo $customerName;
    	}
    	//get Table Information

    	// $data = array();
    	// $data['name'] = array($customerName);
    	// $data['customerID'] = array($customerID);
    	// $data['destinationAddress'] = array($destination);
    	// $data['destinationLat'] = array($destinationLat);
    	// $data['destinationLng'] = array($destinationLng);
    	// $data['customerAddress'] = array($customerAddress);
    	// $data['customerLat'] = array($customerLat);
    	// $data['customerLng'] = array($customerLng);

        $data = [ 'name' => $customerName, 'customerID' => $customerID, 'destinationAddress' => $destination, 'destinationLat' => $destinationLat, 'destinationLng' => $destinationLng,'customerAddress'=> $customerAddress,'customerLat'=> $customerLat, 'customerLng' => $customerLng ];
        sleep(1);
    	echo json_encode($data);
}

