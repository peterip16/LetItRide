<?php
session_start();
require 'connection.php';

$userID = $_SESSION['UserID'];
$driverID = $_POST['driverID'];


$query = "SELECT * FROM `trans` WHERE DrivID='$driverID' AND CustID = '$userID' AND State = 'c'";
//echo $query;
$result = mysqli_query($mysqli, $query) or die(mysql_error());
if (mysqli_num_rows($result) > 0){ 
	sleep(2);
	echo true;
}
else {
	sleep(2);
	echo false;
}