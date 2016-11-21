<?php
session_start();
require 'connection.php';

if (isset($_POST)) {
	$customerID= $_POST['customerID'];
	$userID = $_SESSION['UserID'];
	
	$query = "SELECT * FROM `trans` WHERE DrivID='$userID' AND CustID='$customerID' AND State='c' AND drivConfirm = 'ye'";
	//echo $query;
	$result = mysqli_query($mysqli, $query) or die(mysql_error());
	if (mysqli_num_rows($result) > 0) { 
		echo true;
	} 
	else {
		sleep(2);
		echo false;
	}
}
?>