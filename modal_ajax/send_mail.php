<?php

	$arrayName = array( 
		'name' => $_POST["name"],
		'phone' => $_POST["phone"],
		'message' => "Спасибо за отправку ".$_POST["name"].", мы вам перезвоним на телефон ".$_POST["phone"]." в течении 15 минут"
	);








	if ($_GET["type"] == "json") {
		header('Content-Type: application/json');
		echo json_encode($arrayName);
	}
	else {
		var_dump($arrayName);
	}
?>