<?php
$_POST['name'] =  substr(htmlspecialchars(trim($_POST['name'])), 0, 50);
$_POST['phone'] =  substr(htmlspecialchars(trim($_POST['phone'])), 0, 30);
$_POST['email'] =  substr(htmlspecialchars(trim($_POST['email'])), 0, 50);


$settings = array(
	'title' => 'Заказ с сайта "Awesome rise"', 
	'title_mail' => 'a-rise.ru',
	'send_to' => "you@mail.ru",
	'message' => "",
);

$arrayData = array();
if (isset($_POST['name'])) {$arrayData['name'] = $_POST['name'];}
if (isset($_POST['phone'])) {$arrayData['phone'] = $_POST['phone'];}
if (isset($_POST['email'])) {$arrayData['email'] = $_POST['email'];}
$arrayData["message"] = "Спасибо за отправку ".$arrayData['name'].", мы вам перезвоним на телефон ".$arrayData['phone']." в течении 15 минут";
//$_POST['message'] =  substr(htmlspecialchars(trim($_POST['message'])), 0, 100);

//  /* Здесь проверяется существование переменных */
//  if (isset($_POST['name'])) {$name = $_POST['name']; if ($name == '') {unset($name);}}
//  if (isset($_POST['phone'])) {$phone = $_POST['phone']; if ($phone == ''){unset($phone);}}
//  if (isset($_POST['email'])) {$email = $_POST['email']; if ($email == ''){unset($email);}}
//  //if (isset($_POST['message'])) {$message = $_POST['message']; if ($message == ''){unset($message);}}

// /* Сюда впишите свою эл. почту */
//  $address = "test@mail.ru";

// /* А здесь прописывается текст сообщения, \n - перенос строки */
//  $mes = "Тема: Заявка на обратный звонок!\nТелефон: $phone\nИмя: $name \nСообщение: $message\nПочта: $email\n";

// /* А эта функция как раз занимается отправкой письма на указанный вами email */
// $sub='Заказ с сайта "Awesome rise"'; //сабж
// $email='a-rise.ru'; // от кого
$settings["message"] = "Форма отправки Имя: ".$arrayData["name"].", телефон:".$_POST["phone"]." перезвонить в течении 15 минут!!!";


$send = mail ($settings["send_to"],$settings["title"],$settings["message"],"Content-type:text/plain; charset = utf-8\r\nFrom:".$settings["title_mail"]);

if ($_GET["type"] == "json") {
	header('Content-Type: application/json');
	echo json_encode($arrayData);
}
else {
	var_dump($arrayData);
}
?>