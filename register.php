<html>
  <head></head>
  <body>


<?php session_start();
require('php\connection.php');
$errors = array();
if (isset($_POST['email']) && isset($_POST['password']) && isset($_POST['name'])){
  $email = $_POST['email'];
  $password = $_POST['password'];
  $name = $_POST['name'];
  $query = "SELECT * FROM `rut` WHERE Email='$email'";
  $result = mysqli_query($mysqli, $query);
  $message = "Successfully Registered!";
  if (empty($name) AND empty($password) AND empty($email))
{
echo "<script type='text/javascript'>alert('Please enter a Name, email and password!')</script>";
  header( "refresh:0; url=login.html" );
  exit;
}

if (empty($name) AND empty($password))
{
echo "<script type='text/javascript'>alert('Please enter a Name and password!')</script>";
  header( "refresh:0; url=login.html" );
  exit;
}
if (empty($name) AND empty($email))
{
echo "<script type='text/javascript'>alert('Please enter a Name and email!')</script>";
  header( "refresh:0; url=login.html" );
  exit;
}
if (empty($email) AND empty($password))
{
echo "<script type='text/javascript'>alert('Please enter a Email and password!')</script>";
  header( "refresh:0; url=login.html" );
  exit;
}

if (empty($email))
{
   echo "<script type='text/javascript'>alert('Please enter an email!')</script>";
  header( "refresh:0; url=login.html" );
  exit;
}
if (strlen($email) > 40)
{
   echo "<script type='text/javascript'>alert('Please enter an email less than 40 characters!')</script>";
  header( "refresh:0; url=login.html" );
  exit;
}
if (empty($password))
{
   echo "<script type='text/javascript'>alert('Please enter a Password!')</script>";
  header( "refresh:0; url=login.html" );
  exit;
}
if (strlen($password) > 30)
{
   echo "<script type='text/javascript'>alert('Please enter a Password less than 30 characters!')</script>";
  header( "refresh:0; url=login.html" );
  exit;
}
if (empty($name))
{
   echo "<script type='text/javascript'>alert('Please enter a Name!')</script>";
  header( "refresh:0; url=login.html" );
  exit;
}
if (strlen($name) > 255)
{
   echo "<script type='text/javascript'>alert('Please enter a Name less than 255 characters!')</script>";
  header( "refresh:0; url=login.html" );
  exit;
}
  if (mysqli_num_rows($result) > 0){ 
    $_SESSION['error'] = "User already exists";
    echo "<script type='text/javascript'>alert('Email already Exists!')</script>";
  header( "refresh:0; url=login.html" );


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
  header( "refresh:0; url=login.html" );
 

      }
    }
  }


 ?>



 </body>
</html>
