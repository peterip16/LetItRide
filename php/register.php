<?php session_start();
require('connection.php');
$errors = array();
if (isset($_POST['email']) && isset($_POST['password']) && isset($_POST['name'])){
  $email = $_POST['email'];
  $password = $_POST['password'];
  $name = $_POST['name'];
  $query = "SELECT * FROM `rut` WHERE Email='$email'";
  $result = mysqli_query($mysqli, $query);
  $message = "Successfully Registered!";
  if (mysqli_num_rows($result) > 0){ 
    $_SESSION['error'] = "User already exists";
    echo "<script type='text/javascript'>alert('Email already Exists!')</script>";
  header( "refresh:0; url=index.html" );


  }
  else{
   // $query = "INSERT INTO rut VALUES (NULL, '$email', '$password', '$name', NULL)";
   // echo "qw";
    $query = "INSERT INTO rut (Email, Password, Name, Phonenumber) VALUES ('$email', '$password', '$name', 0000000000)";
    $result = mysqli_query($mysqli, $query) or die(mysql_error());
    $_SESSION['id'] = mysqli_insert_id($mysqli);
    if ($result){
      $_SESSION['email'] = $email;
      echo "<script type='text/javascript'>alert('Successfully Registered!')</script>";
  header( "refresh:0; url=index.html" );
 

      }
    }
  }


 ?>