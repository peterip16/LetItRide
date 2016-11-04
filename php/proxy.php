<?php
if (isset($_POST)) {
  $url = $_POST['url'];

  echo json_encode(file_get_contents($url));
}
