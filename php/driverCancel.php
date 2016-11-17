<?php
session_start();
require 'connection.php';

if (isset($_POST)) {
	$destAddress= $_POST['destAddress'];
	$userID = $_SESSION['UserID'];

	$query = "SELECT * FROM `rdydriv` WHERE DrivID='$userID'"; 
	$result = mysqli_query($mysqli, $query) or die(mysql_error());

	if (mysqli_num_rows($result) > 0){ 
		//echo false;
	}
	else {
		$query = "DELETE FROM 'rdydriv' WHERE DrivID='$userID'";
		$result = mysqli_query($mysqli, $query) or die(mysql_error());
		if ($result){
			echo "Driver removed from rdyDriv.\n";
		}
	}
	
	$query = "SELECT * FROM `trans` WHERE DrivID='$userID' AND destin='$destAddress'"; 
	$result = mysqli_query($mysqli, $query) or die(mysql_error());
	
	if (mysqli_num_rows($result) > 0){ 
		//echo false;
	}
	else {
		$query = "UPDATE 'trans' SET STATE='d' WHERE DrivID='$userID' AND destin='$destAddress'";
		$result = mysqli_query($mysqli, $query) or die(mysql_error());
		if ($result){
			//echo "Driver Confirmed\n";
			echo "Transaction canceled on driver side.\n";
		}
	}
}
?>