<?php
//session_start();
require 'connection.php';
$fromLat = $_POST['fromLat'];
$fromLng = $_POST['fromLng'];

$query = "SELECT *, 3956 * 2 * ASIN(SQRT(POWER(SIN((lat - abs('$fromLat')) * pi()/180 / 2), 2) +  COS(lat * pi()/180 ) * COS(abs('$fromLng') * pi()/180) *  POWER(SIN((lng - '$fromLng') * pi()/180 / 2), 2) )) AS distance FROM `rdyDriv` having distance < 9.5 or distance IS NULL ORDER BY distance asc LIMIT 1";

$result = mysqli_query($mysqli, $query) or die(mysql_error());

if (mysqli_num_rows($result) > 0){ 
 	echo true;
}
else{
	echo false;
}
