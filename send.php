<?php

//$json = '{"html":"John" , "css":"Doe" , "mail":"hre-nic@mail.ru"}';
error_reporting(E_ALL);
ini_set('display_errors', '1');

$value = _json_decode($_POST['json']); 

require_once 'phpmailer/class.phpmailer.php';
$mail = new PHPMailer;

$fileHtml = fopen("buttonCode/html.txt", "w");
fwrite($fileHtml, $value['html']);
fclose($fileHtml);

$fileCss = fopen("buttonCode/css.txt", "w");
fwrite($fileCss, $value['css']);
fclose($fileCss);

function _json_decode($string) {
	if (get_magic_quotes_gpc()) {
		$string = stripslashes($string);
	}

	return json_decode($string, true);
}



$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->SMTPSecure = "ssl";
$mail->Port = 465;
$mail->CharSet = 'UTF-8';

$mail->Username = 'TestProjectOver9999@gmail.com';
$mail->Password = 'TestProject9999';

$mail->FromName = 'Kaxaru';

$mail->addAddress(str_replace('%40', '@', $value['mail']));

$mail->addAttachment('buttonCode/html.txt');
$mail->addAttachment('buttonCode/css.txt');
$mail->isHTML(true);

$mail->Subject = 'Button generator';
$mail->Body    = '<s>а вот и нет</s>';


if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}

?>