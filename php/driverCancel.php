	<?php
	session_start();
	require 'connection.php';

	if (isset($_POST)) {
		$userID = $_SESSION['UserID'];
		$query = "SELECT * FROM `rdydriv` WHERE DrivID='$userID'"; 
		$result = mysqli_query($mysqli, $query) or die(mysql_error());
		//echo $query;
		if (mysqli_num_rows($result) > 0){ 
			//echo false;
			$query = "DELETE FROM `rdydriv` WHERE DrivID='$userID'";
			//echo $query;
			$result = mysqli_query($mysqli, $query) or die(mysql_error());
			if ($result){
				echo true;
			}
		}
		else {
			echo false;
		}
		
		/* 

		//Since we are not implementing cancel during the ride, there's no reason to believe there's a row in trans, other than concurrency issue

		$query = "SELECT * FROM `trans` WHERE DrivID='$userID' AND destin='$destAddress' AND (state = 'a' OR state = 'c')"; 
		$result = mysqli_query($mysqli, $query) or die(mysql_error());
		
		if (mysqli_num_rows($result) > 0){ 
			$query = "UPDATE 'trans' SET STATE='d' WHERE DrivID='$userID' AND destin='$destAddress' AND (state = 'a' OR state = 'c')";
			$result = mysqli_query($mysqli, $query) or die(mysql_error());
			if ($result){
				//echo "Driver Confirmed\n";
				echo true;
		}
		else {
			echo false;
		}
		*/
	} else {
		echo "Things aren't set in PHP file.";
	}
	?>