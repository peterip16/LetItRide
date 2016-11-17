<?php
session_start();
require 'connection.php';

if (isset($_POST)) {
	$destAddress= $_POST['destAddress'];
	$userID = $_SESSION['UserID'];
	
	$query = "SELECT FROM `trans` WHERE DrivID='$userID' AND destin='$destAddress' AND State='c'";
	$result = mysqli_query($mysqli, $query) or die(mysql_error());

	if (mysqli_num_rows($result) > 0){ 
		$query = "UPDATE `trans` SET drivConfirm='ye' WHERE DrivID='$userID' AND destin='$destAddress'";
		$result = mysqli_query($mysqli, $query) or die(mysql_error());
		if ($result){
			echo "Driver Confirmed.";
		} else {
		echo "Driver was not confirmed.";		
		}
	} else {
		echo "No row was founded."
	}
	/*
	else {
		//echo "Couldn't find any driver with the right ID";
		$query = "UPDATE `trans` SET drivConfirm='ye' WHERE DrivID='$userID' AND destin='$destAddress'";
		$result = mysqli_query($mysqli, $query) or die(mysql_error());
		if ($result){
			echo "Driver Confirmed";
		} else {
		echo "Driver was not confirmed.";		
		}
	}
	else {
		echo "Post has nothing.";
	}
	*/
}
?>