<?php

	session_start();

	mysql_connect("localhost","root","password") or die(mysql_error());
	mysql_select_db("LetItRideSystem") or die(mysql_error());


	
	$userID = $_SESSION['UserID'];


	$name = $_POST['usr'];
	$email = $_POST['email'];
	$password = $_POST['pwd'];
	$phone = $_POST['phone'];
	$ccard = $_POST['ccard'];


	$file = $_FILES['profileImg']['tmp_name'];
	$image = addslashes(file_get_contents($_FILES['profileImg']['tmp_name']));
	
	
    if(empty($_FILES['profileImg']['name'])){
    	mysql_query("UPDATE rut SET Email = '$email', Password = '$password' , Name = '$name', Phonenumber = '$phone'
    	 WHERE UserID = '$userID'");
    }else{
    	mysql_query("UPDATE rut SET Email = '$email', Password = '$password' , Name = '$name', Phonenumber = '$phone', Image = '$image' WHERE UserID = '$userID'");
    }

	mysql_query("UPDATE cit SET CCnumber = '$ccard' WHERE UserID = '$userID'");


	header("Location: ../customerHomepage.html"); 
	exit();
?>