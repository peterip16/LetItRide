<html>
  <head></head>
  <body>





<?php  session_start();
require('php\connection.php');

if (isset($_POST['creditcardnumber'])){

$creditcardnumber = $_POST['creditcardnumber'];
$userID = $_SESSION['UserID'];



$query = "SELECT * FROM `cit` WHERE CCNumber='$creditcardnumber'"; //Checking the values are existing in the database or not
  $result = mysqli_query($mysqli, $query);

 if (mysqli_num_rows($result) > 0){ 
    $_SESSION['error'] = "Already exists!";
    echo "<script type='text/javascript'>alert('Credit Card Number Already Exists! Please try again. ')</script>";
  header( "refresh:0; url=additionalinformationpageCustomer.html" );

}


  else{
   // $query = "INSERT INTO rut VALUES (NULL, '$email', '$password', '$name', NULL)";
   // echo "qw";
    $query = "INSERT INTO cit (UserID, CCnumber) VALUES ('$userID', '$creditcardnumber')";
    $result = mysqli_query($mysqli, $query) or die(mysql_error());
    $_SESSION['id'] = mysqli_insert_id($mysqli);
    if ($result){
      echo "<script type='text/javascript'>alert('Successfully inputted!')</script>";
  header( "refresh:0; url=customerHomepage.html" );
 

      }
    }



}



?>





 </body>
</html>
