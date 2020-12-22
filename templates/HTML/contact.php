<?php
 echo 'Your Message successfully sent';
 die();
if(!isset( $_POST['name']) || !isset($_POST['email']) || !isset($_POST['phone']) || !isset($_POST['message']) ) {
	echo 'something is wrong! Please try agian';
    die();
}
​
​
	$email_from = $_POST['email'];
	$email_subject = "Contact Form: Arion Template";
	$email_message = "Please find below a message submitted by ".stripslashes($_POST['name'])."\n\n";
	$email_message .=" on ".date("d/m/Y")." at ".date("H:i")."\n\n";
	$email_message .= stripslashes($_POST['message']);
​
	
​
	$headers = 'From: '.$email_from."\r\n" .
   'Reply-To: '.$email_from."\r\n" ;
​
	mail('software@thesoftking.com', $email_subject, $email_message, $headers);
	echo "Thanks for contacting us.";
	die();
?>
