<?php
	$mailFrom = "site@360ticket.org";
	$name = strip_tags($_POST["name"]);
	$phone = strip_tags($_POST["phone"]);
	$email = strip_tags($_POST["email"]);
	$club = strip_tags($_POST["club_name"]);
	$post = strip_tags($_POST["role"]);

		//$body = "Имя: $name \n\nТелефон: $phone \n\nГород: $city \n\nВопрос:\n $message";
		$body = '<br /><table cellpadding="5" width="55%" cellspacing="0" border="1" bordercolor="#CCCCCC">';
		$body .= '<tr><td width="150px"><b>Имя</b></td><td>'.$name.'</td></tr>';
		$body .= '<tr><td><b>Номер телефона</b></td><td>'.$phone.'</td></tr>';
		$body .= '<tr><td><b>E-mail</b></td><td>'.$email.'</td></tr>';
		$body .= '<tr><td><b>Клуб (город)</b></td><td>'.$club.'</td></tr>';
		$body .= '<tr><td><b>Должность</b></td><td>'.$post.'</td></tr>';
		$body .= '</table>';

	$emailTo = "ceo@blimp.ru".", ";
	$emailTo .= "It@blimp.ru";

	$subject = 'Заявка с сайта';

	$headers = "From: 360ticket.org <".$mailFrom.">" . "\r\n";
	$headers  .=   'MIME-Version: 1.0' . "\r\n";
	$headers  .= 'Content-type: text/html; charset="windows-1251"' . "\r\n";
	$subject_cyr = iconv("utf-8", "windows-1251", $subject);
	$body_cyr = iconv("utf-8", "windows-1251", $body);
	$headers_cyr = iconv("utf-8", "windows-1251", $headers);

	mail($emailTo, $subject_cyr, $body_cyr, $headers_cyr);
	$emailSent = true;
?>
