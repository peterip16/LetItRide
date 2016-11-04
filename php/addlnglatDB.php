<?php
require 'connection.php';

if (isset($_POST)) {
  $toLng= $_POST['toLng'];
  $fromLng = $_POST['fromLng'];
  $toLat = $_POST['toLat'];
  $fromLat = $_POST['fromLat'];
  $toAddress = $_POST['toAddress'];
  $fromAddress = $_POST['fromAddress'];

  
  echo $toLng, $toLat, $toAddress, $fromLng, $fromLat, $fromAddress;
}

