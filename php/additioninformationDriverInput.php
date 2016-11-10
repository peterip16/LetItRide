<html>
  <head></head>
  <body>





<?php  session_start();
require('connection.php');

if (isset($_POST['driverslicense']) && isset($_POST['licenseplate']) && isset($_POST['carmodel']) && isset($_POST['routingnumber']) && isset($_POST['bankaccountnumber'])){

$driverslicense = $_POST['driverslicense'];
$licenseplate = $_POST['licenseplate'];
$carmodel = $_POST['carmodel'];
$routingnumber = $_POST['routingnumber'];
$bankaccountnumber = $_POST['bankaccountnumber'];
$userID = $_SESSION['UserID'];





$query = "SELECT * FROM `dit` WHERE Driverlicense='$driverslicense' and Licenseplate='$licenseplate' and Carmodel = '$carmodel' and Routingnumber = '$routingnumber' and Bankaccountnumber = '$bankaccountnumber'"; //Checking the values are existing in the database or not

$result = mysqli_query($mysqli, $query);

 if (mysqli_num_rows($result) > 0){ 
    $_SESSION['error'] = "Already exists!";
    echo "<script type='text/javascript'>alert('Already Exists! Please try again.')</script>";
  header( "refresh:0; url=../additionalinformationpageDriver.html" );

}


else{
   // $query = "INSERT INTO rut VALUES (NULL, '$email', '$password', '$name', NULL)";
   // echo "qw";
    $query = "INSERT INTO dit (UserID, Driverlicense, Licenseplate, Carmodel, Routingnumber, Bankaccountnumber) VALUES ('$userID', '$driverslicense', '$licenseplate', '$carmodel', '$routingnumber', '$bankaccountnumber')";
    $result = mysqli_query($mysqli, $query) or die(mysql_error());
    $_SESSION['id'] = mysqli_insert_id($mysqli);
    if ($result){

      echo "<script type='text/javascript'>alert('Successfully Registered!')</script>";
  header( "refresh:0; url=php/driverHomepage.php" );
 

      }
    }
  }
  



?>





 </body>
</html>
