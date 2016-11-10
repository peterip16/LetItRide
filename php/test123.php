<?php
require 'connection.php';
$DriverID = '0000000000000000000000000000000000000000000000000000000000000001';
$query = "SELECT * FROM `rdydriv` WHERE DrivID='$DriverID'";
	$result = mysqli_query($mysqli, $query) or die(mysql_error());

	if (mysqli_num_rows($result) < 1){ 
		echo '????';
	}

	else{
		while($row = $result->fetch_assoc()) {
        	echo $row["DrivID"];
        	echo $row["DrivLocat"];
        	echo $row["lat"];
        	echo $row["lng"];
    	}
	}