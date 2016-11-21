<html>
  <head></head>
  <body>





<?php  session_start();
require('php\connection.php');

if (isset($_POST['email']) and isset($_POST['password'])){

$username = $_POST['email'];
$password = $_POST['password'];

$query = "SELECT * FROM `rut` WHERE Email='$username' and Password='$password'"; //Checking the values are existing in the database or not




$result = mysqli_query($mysqli, $query) or die(mysql_error());
$count = mysqli_num_rows($result);


$query1 = "SELECT UserID FROM `rut` WHERE Email='$username' and Password='$password'";
$result1 = mysqli_query($mysqli, $query1) or die(mysql_error());

$row = mysqli_fetch_row($result1);
$userID = $row[0];





if ($count == 1){      //If the posted values are equal to the database values, then session will be created for the user.
$_SESSION['UserID'] = $userID; //saves userID in session

//CHECK IF IT HAS CREDITCARD INFORMATION IN TABLE
$query = "SELECT * FROM `cit` WHERE UserID = '$userID'";
$result = mysqli_query($mysqli, $query);
if (mysqli_num_rows($result) > 0){ 
      $_SESSION['error'] = "Already exists!";
    header( "refresh:0; url=customerHomepage.html" );
}
else header( 'Location: additionalinformationpageCustomer.html' ) ;
}

else
{
  $_SESSION['error'] = "Invalid login credentials";
    echo "<script type='text/javascript'>alert('Invalid login credentials! Please try again. ')</script>";
  header( "refresh:0; url=login.html" );


}
  


}




?>





 </body>
</html>
