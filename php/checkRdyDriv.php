<?php
//session_start();
require 'connection.php';

$query = "SELECT * FROM `rdyDriv` ";
$result = mysqli_query($mysqli, $query) or die(mysql_error());

if (mysqli_num_rows($result) > 0){ 
 	echo true;
}
else{
	echo false;
}
