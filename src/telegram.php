<?php  

$tg_user = 'xxxxxxxxxx'; // id пользователя, которому отправиться сообщения
$bot_token = 'xxxxxxxxxx:YYYyyyyYYYyyyyYYY'; // токен бота
$phone = $_POST['user_phone'];
$text = "Телефон заявителя: ' . $phone . '";
 
$sendToTelegram = fopen("https://api.telegram.org/bot{$bot_token}/sendMessage?chat_id={$tg_user}&parse_mode=html&text={$text}","r"); 


if($sendToTelegram) {
    echo "OK! Телефон отправлен!";
    return true;
} else {
    header ("Location: index.html");
}

?>
