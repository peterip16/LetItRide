<?php
session_start();
require 'connection.php';

$userID= $_SESSION['UserID'];

$query = "SELECT * FROM `trans` WHERE CustID='$userID' AND State == 'a'";
$result = mysqli_query($mysqli, $query) or die(mysql_error());
 if (mysqli_num_rows($result) < 1){ 
 	echo false;
 }
 else {
 	$query = "DELETE from `trans` where CustID = '$userID' AND State == 'a'";
 	$result = mysqli_query($mysqli, $query) or die(mysql_error());
 	if ($result){
 		echo "Service stopped";
 	}
 }

 mysqli_close($mysqli);