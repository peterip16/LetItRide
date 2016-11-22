<html>
  <head></head>
  <body>





<?php  session_start();
require('php/connection.php');

if (isset($_POST['driverslicense']) && isset($_POST['licenseplate']) && isset($_POST['carmodel']) && isset($_POST['routingnumber']) && isset($_POST['bankaccountnumber'])){



$con=mysqli_connect("localhost","root","password","letitridesystem");

if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
  else{
	  echo "Connection success ";
  }


//$driverslicense = $licenseplate = $carmodel = $routingnumber = $bankaccountnumber = "";



$driverslicense = $_POST['driverslicense'];
$licenseplate = $_POST['licenseplate'];
$carmodel = $_POST['carmodel'];
$routingnumber = $_POST['routingnumber'];
$bankaccountnumber = $_POST['bankaccountnumber'];
$userID = $_SESSION['UserID'];




$a = true;


if($a)
{

if(empty($driverslicense))
{
  $driverslicense1 = "driverslicense";
}
else
{
  $driverslicense1 = "";
}
if(empty($licenseplate))
{
  $licenseplate1 = "licenseplate";
}
else
{
  $licenseplate1 = "";
}
if(empty($carmodel))
{
  $carmodel1 = "carmodel";
}
else
{
  $carmodel1 = "";
}
if(empty($routingnumber))
{
  $routingnumber1= "routingnumber";
}
else
{
  $routingnumber1 = "";
}
if(empty($bankaccountnumber))
{
  $bankaccountnumber1 = "bankaccountnumber";
}
else
{
  $bankaccountnumber1 = "";
}


if(($driverslicense1 != "") OR  ($licenseplate1 != "") OR  ($carmodel1 != "") OR ($routingnumber1 != "") OR ($bankaccountnumber1 != ""))
{
echo "<script type='text/javascript'>alert('Please enter your $driverslicense1  $licenseplate1  $carmodel1  $routingnumber1  $bankaccountnumber1!')</script>";
  header( "refresh:0; url=additionalinformationpageDriver.html" );
  exit;
}

}

/*if(($licenseplate1 = "licenseplate") ||  ($carmodel1 = "carmodel") || ($routingnumber1 = "routingnumber") || ($bankaccountnumber1 = "bankaccountnumber") || ($driverslicense1 = "driverslicense"))
{
echo "<script type='text/javascript'>alert('Please enter your $driverslicense1  $licenseplate1  $carmodel1  $routingnumber1  $bankaccountnumber1!')</script>";
  header( "refresh:0; url=additionalinformationpageDriver.html" );
  exit;
}

}


*/








$query = "SELECT * FROM dit WHERE Driverlicense = '$driverslicense' and Licenseplate='$licenseplate' and Carmodel = '$carmodel' and Routingnumber = '$routingnumber' and Bankaccountnumber = '$bankaccountnumber'"; //Checking the values are existing in the database or not
//$query = "SELECT * FROM dit where userID = '$userID'";
$result = mysqli_query($con, $query);

echo "Query ";

 if (mysqli_num_rows($result) > 0){ 
 echo "It already exists! ";
    $_SESSION['error'] = "Already exists!";
    echo "<script type='text/javascript'>alert('Already Exists! Please try again.')</script>";
  header( "refresh:0; url=additionalinformationpageDriver.html" );

}














else{
   // $query = "INSERT INTO rut VALUES (NULL, '$email', '$password', '$name', NULL)";
    echo "qw ";
    $query = "INSERT INTO dit (UserID, Driverlicense, Licenseplate, Carmodel, Routingnumber, Bankaccountnumber) VALUES ('$userID', '$driverslicense', '$licenseplate', '$carmodel', '$routingnumber', '$bankaccountnumber')";
    $result = mysqli_query($con, $query); // or die(mysql_error());
	echo mysqli_error($con);
    $_SESSION['id'] = mysqli_insert_id($con);
	echo "The result is: $result ";
    if ($result){
		echo "Query succeed";
      echo "<script type='text/javascript'>alert('Successfully Registered!')</script>";
  header( "refresh:0; url=driverHomepage.php" );
 

      }
	  else{
		  echo "Query failed ";
	  }
    }
  }
  



?>





 </body>
</html>
