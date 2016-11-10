<?php
session_start();
require 'connection.php';

if (isset($_POST)) {
	$address= $_POST['address'];
	$lat = $_POST['lat'];
	$lng = $_POST['lng'];
	$userID = $_SESSION['UserID'];

	$query = "SELECT * FROM `rdydriv` WHERE DrivID='$userID'";
	$result = mysqli_query($mysqli, $query) or die(mysql_error());

	if (mysqli_num_rows($result) > 0){ 
		echo false;
	}
	else {
		$query = "INSERT INTO `rdydriv` (DrivID,DrivLocat,lat,lng) values ('$userID','$address', '$lat', '$lng')";
		$result = mysqli_query($mysqli, $query) or die(mysql_error());
		if ($result){
			sleep(5);
			echo "Service started";
		}
	}
}

