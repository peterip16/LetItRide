<?php
session_start();
require 'connection.php';

if (isset($_POST)) {
	sleep(3);
	$driverID= $_POST['driverID'];
	$userID = $_SESSION['UserID'];
	
	$query = "SELECT * FROM `trans` WHERE DrivID='$driverID' AND CustID='$userID' AND State='c' AND custConfirm = 'ye'";
	//echo $query;
	$result = mysqli_query($mysqli, $query) or die(mysql_error());
	if (mysqli_num_rows($result) > 0) { 
		echo true;
		$query = "UPDATE `trans` SET state = 'e' WHERE DrivID='$driverID' AND CustID='$userID' AND State='c'";
		$result = mysqli_query($mysqli, $query) or die(mysql_error());
	} 
	else {
		echo false;
	}
}
?>