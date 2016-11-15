<?php
session_start();
require 'connection.php';

if (isset($_POST)) {
	$destAddress= $_POST['destAddress'];
	$userID = $_SESSION['UserID'];

	$query = "SELECT * FROM `trans` WHERE DrivID='$userID' AND destin='destAddress' AND State='a'";
	$result = mysqli_query($mysqli, $query) or die(mysql_error());

	if (mysqli_num_rows($result) > 0){ 
		echo false;
	}
	else {
		//$query = "INSERT INTO `rdydriv` (DrivID,DrivLocat,lat,lng) values ('$userID','$address', '$lat', '$lng')";
		$query = "UPDATE trans SET drivConfirm='Ye' WHERE DrivID='$userID' AND destin='destAddress' AND State='a'";
		$result = mysqli_query($mysqli, $query) or die(mysql_error());
		if ($result){
			echo "Driver Confirmed\n";
		}
	}
}