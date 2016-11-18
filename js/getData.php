<?php
	mysql_connect("localhost","root","") or die(mysql_error());
	mysql_select_db("LetItRideSystem") or die(mysql_error());

	$query = mysql_query("SELECT * FROM rut WHERE UserID = 1");

	// $numrows = mysql_num_rows($query);

	// echo $numrows; 
	// // $to_encode = array();
	// $row = mysql_fetch_assoc($query);
	// while($row = mysql_fetch_assoc($query)) {
	// 	$to_encode[] = $row;
	// 	// echo $row['Name'];

	// }
	 
	// echo json_decode($to_encode);
	// echo $row['Name'];

	$result = array();
	// $row = mysql_fetch_array($query);
	while($row = mysql_fetch_array($query)){
		array_push($result, array('email' => $row[1],
								  'password' => $row[2],
								  'name' => $row[3],
								  'phone' => $row[4]));
		// $result[] = $row;

		// 'image' => $row[5]
	}

	
	echo json_encode(array("result" => $result));
	// echo json_encode($result);
?>