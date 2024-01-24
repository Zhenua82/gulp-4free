<?php
$phone = $_POST['user_phone'];
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
// require 'vendor/autoload.php';
require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);
$mail->CharSet = 'utf-8';

try {
    //Server settings
    // $mail->SMTPDebug = 2;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'xxxxxxx@gmail.com';                     //SMTP username
    $mail->Password   = 'xxxx xxxx xxxx xxxx';                               //SMTP password
    // $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->SMTPSecure = 'ssl'; 
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('xxxxxxx@gmail.com', 'Коля');
    $mail->addAddress('yyyyyyyy@yandex.ru', 'Вася');     //Add a recipient
    // $mail->addAddress('ellen@example.com');               //Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    $mail->addAttachment($_FILES['file']['tmp_name'], $_FILES['file']['name']);    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Заявка с сайта (Это тема сообщения)';
    $mail->Body    = '
        Пользователь оставил свои данные <br> 
        Имя: неизвестно <br>
        Телефон: ' . $phone . '';
    $mail->AltBody = 'Это альтернативный текст';


    $mail->send();
    echo 'Сообщение отправлено!';
    // header('Location: ../popup.html');
    // header('Location: https://mail.yandex.ru/?uid=512062997#inbox');
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

// if(!$mail->send()) {
//     echo "Ошибка";
// } else {
//     echo "Success";
// }

?>