<?php
session_start();
require 'connection.php';

$userID = $_SESSION['UserID'];
$custID = $_POST['customerID'];
$custLat = $_POST['customerLat'];
$custLng = $_POST['customerLng'];
$custAddress = $_POST['custAddress'];
$drivLat = $_POST['driverLat'];
$drivLng = $_POST['driverLng'];
$drivAddress = $_POST['driverAddress'];

//SUPPOSE TO CALCULATE DISTANCE BETWEEN DRIVER/CUSTOMER UNTIL REACHED CERTAIN RANGE, UPDATE STATUS TO 'c', CUSTOMER WILL BE CHECKING STATUS.


$query = "UPDATE `trans` SET drivCurAddr = '$drivAddress', drivLat = '$drivLat', drivLng = '$drivLng' WHERE DrivId = '$userID' AND State = 'a' AND CustID = '$custID'";
$result = mysqli_query($mysqli, $query) or die(mysql_error());

$query = "SELECT *, 3956 * 2 * ASIN(SQRT(POWER(SIN(($drivLat - abs($custLat)) * pi()/180 / 2), 2) +  COS($drivLat * pi()/180 ) * COS(abs($custLng) * pi()/180) *  POWER(SIN(($drivLng - $custLng) * pi()/180 / 2), 2) )) AS distance FROM `trans` WHERE DrivID ='$userID' AND State = 'a' AND CustID = '$custID' having distance < 0.05";

$result = mysqli_query($mysqli, $query) or die(mysql_error());
if (mysqli_num_rows($result) > 0){ 
	$query = "UPDATE `trans` SET State = 'c' WHERE DrivID ='$userID' AND State = 'a' AND CustID = '$custID'";
	$result = mysqli_query($mysqli, $query) or die(mysql_error());
 	echo true;
}

// $query = "SELECT * from trans WHERE CustID = '$custID' AND State = 'a'";
// $result = mysqli_query($mysqli, $query) or die(mysql_error());
// while($row = $result->fetch_assoc()) {
//         	$custLat = $row["custLat"];
//         	$custLng = $row["custLng"];
//     }


//echo $query;

sleep(5);
echo false;