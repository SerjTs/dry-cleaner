$(document).ready(function () {

  $('.phone').mask('+0(000)000-00-00', {
    placeholder: "Введите телефон"
  });

  // получаем нашу форму по class
  var form = $('.form');
  var modalForm = $('.modal__form');

  // добавляем правило для валидации телефона
  jQuery.validator.addMethod("checkMaskPhone", function (value, element) {
    return /\+\d{1}\(\d{3}\)\d{3}-\d{2}-\d{2}/g.test(value);
  });

  // включаем валидацию в форме
  form.validate();
  modalForm.validate();

  // вешаем валидацию на поле с телефоном по классу
  $.validator.addClassRules({
    'phone': {
      checkMaskPhone: true,
    }
  });

  // Проверка на валидность форм и отправка
  form.submit(function (e) {
    e.preventDefault();
    if (form.valid()) {

      var th = $(this);
      $.ajax({
        type: "POST",
        url: "/mail.php", //Change
        data: th.serialize()
      }).done(function () {
        alert("Сообщение отправлено, спасибо!");
        setTimeout(function () {
          // Done Functions
          th.trigger("reset");
        }, 1000);
      });
      return false;
    }
    return;
  });

  modalForm.submit(function (e) {
    e.preventDefault();
    if (modalForm.valid()) {

      var th = $(this);
      $.ajax({
        type: "POST",
        url: "/mail.php", //Change
        data: th.serialize()
      }).done(function () {
        alert("Сообщение отправлено, спасибо!");
        setTimeout(function () {
          // Done Functions
          th.trigger("reset");
        }, 1000);
      });
      return false;
    }
    return;
  });
// /Проверка на валидность форм и отправка


  var count = 0;

  $('#counter').data('count', 0);
  $('#update').click(function () {
    $('#counter').html(function () {
      var $this = $(this),
        count = $this.data('count') + 1;

      $this.data('count', count);
      return count;
    });
  });


  //  ФАК аккордеон
  $('.accordion__header').on('click', function () {
    if ($(this).hasClass('accordion__header--active')) {
      $(this).removeClass('accordion__header--active');
      $(this).next().slideUp();
    } else {
      $('.accordion__text').slideUp();
      $('.accordion__header').removeClass('accordion__header--active');
      $(this).addClass('accordion__header--active');
      $(this).next().slideDown();
    };
  });


  // Кнопка скроллинга вверх
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 500) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });
  $('.scrollup').on('click', function () {
    $("html, body").animate({
      scrollTop: 0
    }, 1000);
    return false;
  });


  // smooth scroll
  $(".menu-list__link, .link-btn").on("click", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();
    //забираем идентификатор блока с атрибута href
    var id = $(this).attr('href'),
      //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;
    //анимируем переход на расстояние - top за 1500 мс
    $('body,html').animate({
      scrollTop: top
    }, 1000);
  });

  // plus & minus input
  // Убавляем кол-во по клику
  $('.counter #buttonCountMinus').click(function () {
    let $input = $(this).parent().find('.quantity');
    let count = parseInt($input.val()) - 1;
    count = count < 0 ? 0 : count;
    $input.val(count);
    ResultCalculator();
  });
  // Прибавляем кол-во по клику
  $('.counter #buttonCountPlus').click(function () {
    let $input = $(this).parent().find('.quantity');
    let count = parseInt($input.val()) + 1;
    count = count > parseInt($input.data('max-count')) ? parseInt($input.data('max-count')) : count;
    $input.val(parseInt(count));
    // console.log($input.val());
    ResultCalculator();
  });
  // Убираем все лишнее и невозможное при изменении поля
  $('.counter .quantity').bind("change keyup input click", function () {
    if (this.value.match(/[^0-9]/g)) {
      this.value = this.value.replace(/[^0-9]/g, '');
    }
    if (this.value == "") {
      this.value = 1;
    }
    if (this.value > parseInt($(this).data('max-count'))) {
      this.value = parseInt($(this).data('max-count'));
    }
    ResultCalculator();
  });

  // Калькулятор
  function ResultCalculator() {
    result = 0;

    // считаем диваны
    calc_1 = $(".couch-calc_1").val(); // диван кол-во
    calc_2 = $(".couch-calc_2").attr("data-price"); // диван материал
    calc_3 = $(".couch-calc_3").attr("data-price"); // диван тип
    calc_4 = $(".couch-calc_4").attr("data-price"); // диван размер
    if (($(".couch-calc_3").text() == "Угловой" || $(".couch-calc_3").text() == "Кухонный") && (parseFloat(calc_4) > 2)) {
      couch = parseFloat(calc_1) * (parseFloat(calc_2) * parseFloat(calc_3) + (1000 + ((parseFloat(calc_4) - 2) * 500)));
    } else {
      couch = parseFloat(calc_1) * parseFloat(calc_2) * parseFloat(calc_3) * parseFloat(calc_4);
    };

    // считаем кресла
    calc_1 = $(".armchair-calc_1").val(); // кресло кол-во
    calc_2 = $(".armchair-calc_2").attr("data-price"); // кресло материал
    calc_3 = $(".armchair-calc_3").attr("data-price"); // кресло тип
    armchair = Math.round(parseFloat(calc_1) * parseFloat(calc_2) * parseFloat(calc_3));

    // считаем стулья
    calc_1 = $(".chair-calc_1").val(); // стул кол-во
    calc_2 = $(".chair-calc_2").attr("data-price"); // стул материал
    calc_3 = $(".chair-calc_3").attr("data-price"); // стул тип
    if (($(".chair-calc_2").text() == "Кожа") && ($(".chair-calc_3").text() == "Стул с мягкой спинкой")) {
      calc_3 = 1.308;
    }
    chair = Math.round(parseFloat(calc_1) * parseFloat(calc_2) * parseFloat(calc_3));

    // считаем пуфы
    calc_1 = $(".pouffe-calc_1").val(); // пуф кол-во
    calc_2 = $(".pouffe-calc_2").attr("data-price"); // пуф материал
    pouffe = parseFloat(calc_1) * parseFloat(calc_2);

    // считаем матрасы
    calc_1 = $(".mattress-calc_1").val(); // матрас кол-во
    calc_2 = $(".mattress-calc_2").attr("data-price"); // матрас тип
    calc_3 = $(".mattress-calc_3").attr("data-price"); // матрас размер
    if ($(".mattress-calc_2").text() == "с двух сторон") {
      if ($(".mattress-calc_3").text() == "91-140х200") {
        calc_3 = 1.2;
      } else if ($(".mattress-calc_3").text() == "141-180х200") {
        calc_3 = 1.5333;
      }
    };
    mattress = Math.round(parseFloat(calc_1) * parseFloat(calc_2) * parseFloat(calc_3));

    // считаем спальные места
    calc_1 = $(".prelast-calc_1").val(); // спальное место кол-во
    calc_2 = $(".prelast-calc_2").attr("data-price"); // спальное место материал
    prelast = parseFloat(calc_1) * parseFloat(calc_2);

    // считаем подушки
    calc_1 = $(".pillow-calc_1").val(); // съемная подушка кол-во
    calc_2 = $(".pillow-calc_2").attr("data-price"); // съемная подушка материал
    pillow = parseFloat(calc_1) * parseFloat(calc_2);

    // ВСЕГО
    result = couch + armchair + chair + pouffe + mattress + prelast + pillow;
    $(".result_calculator span").text(result); // Выводим ВСЕГО


    // Передача результатов калькулятора в форму
    couch_quantity = $('.couch-calc_1').val(); // диван
    $('.couch_quantity').val(couch_quantity);
    couch_material = $('.couch-calc_2').text();
    $('.couch_material').val(couch_material);
    couch_type = $('.couch-calc_3').text();
    $('.couch_type').val(couch_type);
    couch_size = $('.couch-calc_4').text();
    $('.couch_size').val(couch_size);

    armchair_quantity = $('.armchair-calc_1').val(); // кресло
    $('.armchair_quantity').val(armchair_quantity);
    armchair_material = $('.armchair-calc_2').text();
    $('.armchair_material').val(armchair_material);
    armchair_type = $('.armchair-calc_3').text();
    $('.armchair_type').val(armchair_type);

    chair_quantity = $('.chair-calc_1').val(); // стул
    $('.chair_quantity').val(chair_quantity);
    chair_material = $('.chair-calc_2').text();
    $('.chair_material').val(chair_material);
    chair_type = $('.chair-calc_3').text();
    $('.chair_type').val(chair_type);

    pouffe_quantity = $('.pouffe-calc_1').val(); // пуф
    $('.pouffe_quantity').val(pouffe_quantity);
    pouffe_material = $('.pouffe-calc_2').text();
    $('.pouffe_material').val(pouffe_material);

    mattress_quantity = $('.mattress-calc_1').val(); // матрас
    $('.mattress_quantity').val(mattress_quantity);
    mattress_material = $('.mattress-calc_2').text();
    $('.mattress_material').val(mattress_material);
    mattress_type = $('.mattress-calc_3').text();
    $('.mattress_type').val(mattress_type);

    prelast_quantity = $('.prelast-calc_1').val(); // спальное место
    $('.prelast_quantity').val(prelast_quantity);
    prelast_material = $('.prelast-calc_2').text();
    $('.prelast_material').val(prelast_material);

    pillow_quantity = $('.pillow-calc_1').val(); // съемная подушка
    $('.pillow_quantity').val(pillow_quantity);
    pillow_material = $('.pillow-calc_2').text();
    $('.pillow_material').val(pillow_material);

    $('.result-calc').val('Стоимость: ' + result + ' руб.');

  }

  $(".r_calc").click(function () {
    $(this).next().stop(true, true).slideToggle("10");
  })

  $(".options_calc div").click(function () {
    var data_text = $(this).text();
    var data_price = $(this).attr("data-price");
    $(this).parent().prev().text(data_text).attr("data-price", data_price);
    $(this).parent().stop(true, true).slideToggle("10");
    $(this).parent().children(".active").removeClass("active");
    $(this).addClass("active");
    ResultCalculator();
  })

  $(".too, .tooo").keyup(function () {
    ResultCalculator();
  });

  $(document).mouseup(function (e) {
    var container = $(".options_calc");
    if (container.has(e.target).length === 0) {
      $(".options_calc").fadeOut("slow");
    }
  })

  $(".go_mail").click(function () {

    calk_1 = $(".calk_1").attr("data-price");
    calk_1_text = $(".calk_1").text();

    calk_2 = $(".calk_2").attr("data-price");
    calk_2_text = $(".calk_2").text();

    calk_3 = $(".calk_3").attr("data-price");
    calk_3_text = $(".calk_3").text();

    calk_4 = $(".calk_4").val();

    calk_5 = $(".calk_5").attr("data-price");
    calk_5_text = $(".calk_5").text();

    calk_6 = $(".calk_6").attr("data-price");
    calk_6_text = $(".calk_6").text();

    calk_7 = $(".calk_7").attr("data-price");
    calk_7_text = $(".calk_7").text();

    calk_8 = $(".calk_8").attr("data-price");
    calk_8_text = $(".calk_8").text();

    calk_9 = $(".calk_9").val();

    result_calculator = $(".result_calculator span").text();


    email = $(".calk_email").val();

    $.ajax({
      type: 'post',
      url: 'action.php',
      data: {
        'email': email,
        'calk_1': calk_1,
        'calk_1_text': calk_1_text,
        'calk_2': calk_2,
        'calk_2_text': calk_2_text,
        'calk_3': calk_3,
        'calk_3_text': calk_3_text,
        'calk_4': calk_4,
        'calk_5': calk_5,
        'calk_5_text': calk_5_text,
        'calk_6': calk_6,
        'calk_6_text': calk_6_text,
        'calk_7': calk_7,
        'calk_7_text': calk_7_text,
        'calk_8': calk_8,
        'calk_8_text': calk_8_text,
        'calk_9': calk_9,
        'result_calculator': result_calculator
      },
      response: 'text',
      success: function (data) {
        $(".answer").text(data).fadeIn("slow");
        $(".answer").delay(1000).fadeOut("slow");
      }
    })
  });

  // Вывод результата калькулятора на кнопку     
  $('.calculator__btn').on('click', function () {
    $('.initial_calculator').slideUp();
    $(".result_calculator").slideDown();
    //  выводим кнопку акции через 5 секунд
    $(".calculator__btn-discount").delay(5000).slideDown();
  });
  // /Калькулятор


  // кнопка вызова меню
  $('.header-top__menu-btn').on('click', function () {
    $('.menu').slideToggle();
    // $('.menu__list').toggleClass('menu__list--mobile-visible');
  });
  $('.menu-list__link').on('click', function () {
    $('.menu').slideUp();
  });
  // /кнопка вызова меню


// Call & init
$(document).ready(function(){
  $('.ba-slider').each(function(){
    var cur = $(this);
    // Adjust the slider
    var width = cur.width()+'px';
    cur.find('.resize img').css('width', width);
    // Bind dragging events
    drags(cur.find('.handle'), cur.find('.resize'), cur);
  });
});

// Update sliders on resize. 
// Because we all do this: i.imgur.com/YkbaV.gif
$(window).resize(function(){
  $('.ba-slider').each(function(){
    var cur = $(this);
    var width = cur.width()+'px';
    cur.find('.resize img').css('width', width);
  });
});

function drags(dragElement, resizeElement, container) {
	
  // Initialize the dragging event on mousedown.
  dragElement.on('mousedown touchstart', function(e) {
    
    dragElement.addClass('draggable');
    resizeElement.addClass('resizable');
    
    // Check if it's a mouse or touch event and pass along the correct value
    var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
    
    // Get the initial position
    var dragWidth = dragElement.outerWidth(),
        posX = dragElement.offset().left + dragWidth - startX,
        containerOffset = container.offset().left,
        containerWidth = container.outerWidth();
 
    // Set limits
    minLeft = containerOffset + 10;
    maxLeft = containerOffset + containerWidth - dragWidth - 10;
    
    // Calculate the dragging distance on mousemove.
    dragElement.parents().on("mousemove touchmove", function(e) {
    	
      // Check if it's a mouse or touch event and pass along the correct value
      var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
      
      leftValue = moveX + posX - dragWidth;
      
      // Prevent going off limits
      if ( leftValue < minLeft) {
        leftValue = minLeft;
      } else if (leftValue > maxLeft) {
        leftValue = maxLeft;
      }
      
      // Translate the handle's left value to masked divs width.
      widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
			
      // Set the new values for the slider and the handle. 
      // Bind mouseup events to stop dragging.
      $('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function () {
        $(this).removeClass('draggable');
        resizeElement.removeClass('resizable');
      });
      $('.resizable').css('width', widthValue);
    }).on('mouseup touchend touchcancel', function(){
      dragElement.removeClass('draggable');
      resizeElement.removeClass('resizable');
    });
    e.preventDefault();
  }).on('mouseup touchend touchcancel', function(e){
    dragElement.removeClass('draggable');
    resizeElement.removeClass('resizable');
  });
}


// slider сall & init
  $('.ba-slider').each(function () {
    var cur = $(this);
    // Adjust the slider
    var width = cur.width() + 'px';
    cur.find('.resize img').css('width', width);
    // Bind dragging events
    drags(cur.find('.handle'), cur.find('.resize'), cur);
  });


});


// Update sliders on resize. 
// Because we all do this: i.imgur.com/YkbaV.gif
$(window).resize(function () {
  $('.ba-slider').each(function () {
    var cur = $(this);
    var width = cur.width() + 'px';
    cur.find('.resize img').css('width', width);
  });
});

function drags(dragElement, resizeElement, container) {

  // Initialize the dragging event on mousedown.
  dragElement.on('mousedown touchstart', function (e) {

    dragElement.addClass('draggable');
    resizeElement.addClass('resizable');

    // Check if it's a mouse or touch event and pass along the correct value
    var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

    // Get the initial position
    var dragWidth = dragElement.outerWidth(),
      posX = dragElement.offset().left + dragWidth - startX,
      containerOffset = container.offset().left,
      containerWidth = container.outerWidth();

    // Set limits
    minLeft = containerOffset + 10;
    maxLeft = containerOffset + containerWidth - dragWidth - 10;

    // Calculate the dragging distance on mousemove.
    dragElement.parents().on("mousemove touchmove", function (e) {

      // Check if it's a mouse or touch event and pass along the correct value
      var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

      leftValue = moveX + posX - dragWidth;

      // Prevent going off limits
      if (leftValue < minLeft) {
        leftValue = minLeft;
      } else if (leftValue > maxLeft) {
        leftValue = maxLeft;
      }

      // Translate the handle's left value to masked divs width.
      widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';

      // Set the new values for the slider and the handle. 
      // Bind mouseup events to stop dragging.
      $('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function () {
        $(this).removeClass('draggable');
        resizeElement.removeClass('resizable');
      });
      $('.resizable').css('width', widthValue);
    }).on('mouseup touchend touchcancel', function () {
      dragElement.removeClass('draggable');
      resizeElement.removeClass('resizable');
    });
    e.preventDefault();
  }).on('mouseup touchend touchcancel', function (e) {
    dragElement.removeClass('draggable');
    resizeElement.removeClass('resizable');
  });
}


// слайдер сравнения изображений
Cocoen.parse(document.body);
