<?php
session_start();
require 'connection.php';

$userID = $_SESSION['UserID'];
$custID = $_POST['customerID'];

//SUPPOSE TO CALCULATE DISTANCE BETWEEN DRIVER/CUSTOMER UNTIL REACHED CERTAIN RANGE, UPDATE STATUS TO 'c', CUSTOMER WILL BE CHECKING STATUS.
$query = "UPDATE `trans` SET State = 'c' WHERE DrivID ='$userID' AND State = 'a' AND CustID = '$custID' ";
//echo $query;
$result = mysqli_query($mysqli, $query) or die(mysql_error());
sleep(5);
echo "Customer reached";