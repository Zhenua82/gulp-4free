//Слайдер slick:
$(function(){
   $('.slider').slick({
      arrows: true, //false - Убираем стрелки
      dots: true, //По умолчанию точки выключены - false
      adaptiveHeight: true,//По умолчанию адаптивная высота выключена (чтоб ее включить - в стилях надо прописать .slick-track display: flexalign-items: flex-start)
      slidesToShow: 3,
      slidesToScroll: 1,
      // speed: 500,
      // easing: 'linear',// Скорость анимации (здесь она линейная)
      // infinite: true,//По умолчанию - true (бесконечное кол-во)
      // initialSlide: 1,
      // autoplay: true,
      autoplaySpeed: 200,
      // Параметры автопроигрывания по умолчанию:
      // pauseOnFocus: true,
      // pauseOnHover: true,
      // pauseOndotsHover: true,
      //Отключение слайдера от мышки на ПК или от пальца на телефоне:
      // draggable: true,//для ПК (по умолчанию true)
      // swipe: true,//для телефонa и ПК (по умолчанию true)
      // touchThreshold: 5,//Параметр реагирования на палец в тел и ПК (по умолчанию - 5)
      // touchMove: true,//Реагирование телефона на палец и ПК на мышь (по умолчанию true)
      // waitForAnimate: false, //Не надо ждать при клике на стрелку окончания анимации (по умолчанию - true)
      // centerMode: true,//Один слайд центрируется (по умолчанию - false)
      // variableWidth: true,//Параметр для адаптации слайдера (по умолчанию - false)
      // rows: 1,//Кол-во рядов в слайдере
      // slidesPerRow: 1,//Кол-во показываемых столбцов многорядного слайдера
      // vertical: true,// Делает вертикальный слайдер
      // verticalSwiping: true,//Устанавливает вертикальную прокрутку для вертикального слайдера
      // fade: true,//Слайды перестают листаться - просто сменяются и всегда показывается только 1 слайд (по умолчанию - false)
      // focusOnSelect: true,//При клике на слайд - он становится активным
      // asNavFor: '.slider-small',//связывание слайдеров
      // responsive:[
      //    {breakpoint: 768, settings: {slidesToShow:2}},
      //    {breakpoint: 480, settings: {slidesToShow:1, variableWidth: true}}],//Адаптация слайдера под размер экрана
      // mobileFirst: true,//меняет значение breakpoint с maxwidth на minwidth (по умолчанию - false)
      // appendArrows: $('.strelki'),//перемещает стрелки в другой контейнер
      // appendDots: $('.strelki'),//перемещает точки в др контейнер
   });
   //Методы перемещения слайда др элементами:
   $('.left').click(function(event) {
      $('.slider').slick('slickPrev');
   });
   $('.right').click(function(event) {
      $('.slider').slick('slickNext');
   });
   $('.avtoplay').click(function(event) {
      $('.slider').slick('slickPlay');
   });
   $('.pausa').click(function(event) {
      $('.slider').slick('slickPause');
   });
});

//Слайдер картинок (самодельный):
var i = 8;
$(function(){
$('.pict:eq(2) img').on( "click", function() {
   $(this).fadeOut(500, function(){
      if (i <= 13){
         i += 1;
      $(this).attr('src', 'images/dest/Layer_' + i + '.png').fadeIn(5000);
      }
      else {
         i = 9
         $(this).attr('src', 'images/dest/Layer_' + i + '.png').fadeIn(5000);
      }  
   });
});
});

// Анимация:

// // СЕЛЕКТОРЫ:
// // Базовые селекторы (#id, tagName, .class)
// $(function(){
// $('#bt1').css({'background-color': 'red', 
// 'border': 'solid 15px green'});
// // Селекторы взаимодействия (parent, child, + ~ и т.д.)
// $('body .sect2').css('background-color', 'green');
// $('.pict + .opisan span').css('background-color', 'red'); //выбирает первый .opisan span идущий за .pict
// $('.pict ~').css('background-color', 'red'); //выбирает все ближайшие теги идущие за .pict
// $('.pict').parent().css('background-color', 'red');
// // Простые фильтры (:first, :last, even, odd, eq и т.д.)
// $('.pict:first').css('background-color', 'black');
// $('.pict:last').css('background-color', 'black');
// $('.pict:even').css('background-color', 'blue'); //выбирает все нечетные
// $('.pict:odd').css('background-color', 'beige'); //выбирает все четные
// $('.pict:eq(3)').css('background-color', 'black'); //выбирает элемент по счету начиная с 0
// // Фильтры по содержимому (:has, :parent, :empty и т.д.)
// $('.row:has(.cont1)').css('background-color', 'black');// выбирает элемент .row содержащий .cont
// $('.row:parent').css('background-color', 'black');// выбирает элемент .row в котором содержаться др дети
// $('.row:empty').css('backround-color', 'blue');// выбирает элемент .row в котором нет др детей
// // Фильтры по атрибутам ([name ~= value]  и т.д.)
// $('a[href^="http"]').css('color', 'green');//выбирает все ссылки начинающиеся на http
// $('a[href*=".ru"]').css('color', 'green');//выбирает все ссылки имеющие .ru
// $('img[src$="9.png"]').hide();//выбирает картинку адресс к которой заканчивается на 9.png
// $('img[src!="images/dest/Layer_13.png"]').hide();//выбирает все картинки кроме images/dest/Layer_13.png

// //СОБЫТИЯ:
// //Клики мышью (click, dblclick)
// $( "#bt1" ).on( "click", function() {
//    $(this).css('border', 'solid 15px white');
// });
// $( "#bt1" ).on( "dblclick", function() {
//    $(this).css('border', 'solid 15px black');
// });
// //Полеты над элементом (mouseenter, mouseleav и т.д.)
// $( "#bt1" ).on( "mouseenter", function() {// когда курсор наводится
//    $(this).css('border', 'solid 15px blue');
// });
// $( "#bt1" ).on( "mouseleave", function() {// когда курсор уходит
//    $(this).css('border', 'solid 15px black');
// });
// //Формы (focus, change и т.д.)
// $( "input" ).on( "focus", function() {
//    $(this).css('border', 'solid 15px black');
// });
// $( "input" ).on( "change", function() {
//    $(this).css('border', 'solid 15px blue');
//    $('.txt').text(', ' + $(this).val() + " !"); //вставляет текст в .txt
// });
// // Клавиатура (keypress, keydown, keyup)
// $( "input" ).on( "keypress", function() {//считывает вводимый в поле текст кроме крайнего знака
//    $('.txt').text(', ' + $(this).val() + " !"); //вставляет этот текст в .txt кроме крайнего знака
// });
// $( "input" ).on( "keydown", function() {//тоже самое что и keypress
//    $('.txt').text(', ' + $(this).val() + " !"); //вставляет этот текст в .txt кроме крайнего знака
// });
// $( "input" ).on( "keyup", function() {//считывает вводимый в поле текст
//    $('.txt').text(', ' + $(this).val() + " !"); //вставляет этот текст в .txt
// });
// //Базовая анимация
//    $('#bt1').hide(3000).delay(3000).show(5000);// delay - это задержка в мс
//    $('#bt1').animate({'height': '100px'}, 5000)
//    $( "#bt1" ).animate({opacity: 0.25, height: 100, width: 150}, 5000);
//    $( "#bt1" ).slideUp(5000).delay(3000).slideDown(5000);
// //Взаимодействие с атрибутами
// console.log($('.pict:eq(3) img').attr('src')); //Выводит в консоль src картинки
// $('.pict:eq(3) img').on( "click", function() {
//    $(this).fadeOut(500, function(){
//       $(this).attr('src', 'images/dest/Layer_9.png').fadeIn(5000);//Меняет атрибут 4 картинки на src="images/dest/Layer_9.png"
//    });
// });
// $('.pict:eq(1) img').attr('class', 'new')//Навешивает второй картинке дополнительный атрибут (class="new")
// Взаимодействие с классами
// $('#t2').on('dblclick', function() { 
// $('#t2').addClass('b');//при двойном клике на элемент #t2 его свойства меняются на свойства класса .b (им дополняются)
// });
// $('#t2').on("click", function() { 
//    $(this).removeClass('b');//при клике на элемент #t2 из его свойств убираются свойства класса .b
// });
// $('#t2').on("mouseenter", function() { 
//    $('.trans').toggleClass('trans b');//замена класса .trans на класс .b
// });
// $('#t2').on("click", function() { 
//    $('#t2').parent().toggleClass('b trans');//обратная замена класса .b на класс .trans
// });
// //Клонирование, добавление, перемещение элементов
// $('#t2').on("click", function() { 
//    $(this).text('Меняем текст <em>на курсивный шрифт</em>');
//    $(this).html('Меняем текст <em>на курсивный шрифт</em>');
//    $(this).append('Вводим в конец доп текст <em>с курсивным шрифтом</em>');
//    $(this).prepend('Вводим в начало доп текст <em>с курсивным шрифтом</em>');
//    $(this).after('<p>Новый абзац <em>с курсивным шрифтом</em> </p>');
//    $(this).wrap('<div class="container"></div>');// Оборачиваем #t2 в div class="container"
//    $(this).unwrap();//Убираем обертку с элемента #t2
//    $(this).empty();//Убираем все содержимое #t2
//    $(this).remove();//Убираем все содержимое #t2 и сам #t2
//    $(this).append('<br />'+ $(this).text());//Клонируем с новой строки изначальный текст
// });
// });

// // Убираем появления нового окна при отправке сообщения (одного поля):
// $(function() {
//    $('.form').submit(function(e) {
//      e.preventDefault(); // Предотвращение отправки формы по умолчанию
//      $.ajax({
//        type: 'POST',
//        url: 'PHPMailer/mail.php', // Ваш PHP-скрипт для отправки письма
//        data: $(this).serialize(),
//       //  success: function(response) {
//       //    // Обработка успешной отправки
//       //    alert('Письмо успешно отправлено!');
//       //  },
//       //  error: function(error) {
//       //    // Обработка ошибки отправки
//       //    alert('Ошибка при отправке письма: ' + error.responseText);
//       //  }
//      });
//    });
//  });

 //Отправка поля + файлы:
 $(function() {
   $('.form').submit(function(e) {
      e.preventDefault(); // Предотвращение отправки формы по умолчанию
      var user_phone = $("#user_phone").val();
      var file = $("#file")[0].files[0];
      // Проверка наличия введенного email и выбранного файла
      if (!user_phone || !file) {
         alert("Введите телефон и выберите файл");
         return;
      }
      // Создаем объект FormData и добавляем в него текст и файл
      var formData = new FormData();
      formData.append("user_phone", user_phone);
      formData.append("file", file);
     $.ajax({
         type: 'POST',
         url: 'PHPMailer/mail.php', // Ваш PHP-скрипт для отправки письма
         data: formData,
         processData: false, // Не обрабатывать данные
         contentType: false, // Не устанавливать тип контента
         success: function(response) {
            // Обработка успешного ответа от сервера
            console.log("Данные успешно отправлены");
            console.log(response);
        },
        error: function() {
            // Обработка ошибки
            console.error("Произошла ошибка при отправке данных");
        }
     });
   });
 });

 //Всплывающее окно:
$(function(){
   $('.popumail').hide();
});

$(function(){
   $( ".xx" ).on( "click", function() {
      $('.popumail').hide();
   });
});

$(function(){
   $('.picter-btn').on("click", function(){
      var user_phone = $("#user_phone").val();
      var file = $("#file")[0].files[0];
      if (!user_phone || !file) {
         console.log("Введены не все данные");
         return;
      }
      else {$('.popumail').show();}
   });
});
 
//Всплывающее окно:
$(function(){
   $('.popu').hide();
});

$(function(){
   $( ".x" ).on( "click", function() {
      $('.popu').hide();
   });
});

$(function(){
   $('.hed').on("click", function(){
    $('.popu').show();
   });
});

//функция и цикл if:
var age = 19;
var name = "jon";
var bool = (4 > 1);
console.log (bool);
function consol() {
  return console.log ("разрешен доступ к сайту, пользователь", name, "допущен");
}

if (age >= 18) {
   if (bool == true) {
      consol();
   }
   else {
      console.log ("доступ к сайту не разрешен");
   }
}
if (age < 18) {
   console.log ("доступ к сайту не разрешен"); 
}
