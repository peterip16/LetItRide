<?php
	$random = rand(1,17); 
	$random = "../img/loader/Preloader_".$random.".gif";

	$type = 'image/gif';
	header('Content-Type:'.$type);
	header('Content-Length: ' . filesize($random));
	readfile($random);
?>