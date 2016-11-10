<?php

	mysql_connect("localhost","root","") or die(mysql_error());
	mysql_select_db("LetItRideSystem") or die(mysql_error());



	$query = mysql_query("SELECT DrivID, Name, DrivLocat, Phonenumber, Driverlicense, Licenseplate, Carmodel
						  FROM dit JOIN rut USING(UserID), rdydriv WHERE UserID = DrivID ");


	$result = array();
	// $row = mysql_fetch_array($query);
	while($row = mysql_fetch_array($query)){
		array_push($result, array('id' => $row[0],
								  'name' => $row[1],
								  'location' => $row[2],
								  'phone' => $row[3],
								  'license' => $row[4],
								  'plate' => $row[5],
								  'model' => $row[6]
								  ));
		// $result[] = $row;

		// 'image' => $row[5]
	}

	
	echo json_encode(array("result" => $result));
?>