<?php
	session_start();

	mysql_connect("localhost","root","password") or die(mysql_error());
	mysql_select_db("LetItRideSystem") or die(mysql_error());

	
	$userID = $_SESSION['UserID'];
	$query = mysql_query("SELECT Email, Password, Name, Phonenumber, Ccnumber FROM rut join cit using (UserID) WHERE UserID = '$userID'");

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
		array_push($result, array('email' => $row[0],
								  'password' => $row[1],
								  'name' => $row[2],
								  'phone' => $row[3],
								  'ccard' => $row[4]));
		// $result[] = $row;

		// 'image' => $row[5]
	}

	
	echo json_encode(array("result" => $result));
	// echo json_encode($result);
?>