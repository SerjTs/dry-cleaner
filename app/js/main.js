$(document).ready(function () {

  $('.form').each(function () {
    $(this).validate({
      errorClass: "invalid",
      messages: {
        name: {
          required: "Provide a name",
          minlength: "The name must not be shorter than 2 letters",
        },
        phone: {
          required: "Phone is required",
        },
      },
    });
  });
  $('.phone').mask('+0(000)000-00-00', { placeholder: "Введите телефон" });


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
    $("html, body").animate({ scrollTop: 0 }, 1000);
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
    $('body,html').animate({ scrollTop: top }, 1000);
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
  function ResultCalculator(){
        result = 0;

        // считаем диваны
        calc_1 = $(".couch-calc_1").val(); // диван кол-во
        calc_2 = $(".couch-calc_2").attr("data-price"); // диван материал
        calc_3 = $(".couch-calc_3").attr("data-price"); // диван тип
        calc_4 = $(".couch-calc_4").attr("data-price"); // диван размер
        if (($(".couch-calc_3").text() == "Угловой" || $(".couch-calc_3").text() == "Кухонный") && (parseFloat(calc_4) > 2)){
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
        if (($(".chair-calc_2").text() == "Кожа") && ($(".chair-calc_3").text() == "Стул с мягкой спинкой")){
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
        if ($(".mattress-calc_2").text() == "с двух сторон"){
          if ($(".mattress-calc_3").text() == "91-140х200") {
            calc_3 = 1.2;
          } else if ($(".mattress-calc_3").text() == "141-180х200"){
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
    }
    
    $(".r_calc").click(function(){
        $(this).next().stop(true, true).slideToggle("10");
    })
    
    $(".options_calc div").click(function(){
        var data_text = $(this).text();
        var data_price = $(this).attr("data-price");
        $(this).parent().prev().text(data_text).attr("data-price", data_price);
        $(this).parent().stop(true, true).slideToggle("10");
        $(this).parent().children(".active").removeClass("active");
        $(this).addClass("active");
        ResultCalculator();
    })
    
    $( ".too, .tooo" ).keyup(function(){
        ResultCalculator();
    });
    
    $(document).mouseup(function (e) {
        var container = $(".options_calc");
        if (container.has(e.target).length === 0){
            $(".options_calc").fadeOut("slow");
        }
    })
    
    $(".go_mail").click(function(){
        
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
            type:'post',
            url:'action.php',
            data:{'email':email,'calk_1':calk_1,'calk_1_text':calk_1_text,'calk_2':calk_2,'calk_2_text':calk_2_text,
            'calk_3':calk_3,'calk_3_text':calk_3_text,'calk_4':calk_4,'calk_5':calk_5,'calk_5_text':calk_5_text,'calk_6':calk_6,'calk_6_text':calk_6_text,
            'calk_7':calk_7,'calk_7_text':calk_7_text,'calk_8':calk_8,'calk_8_text':calk_8_text,'calk_9':calk_9,'result_calculator':result_calculator},
            response:'text',
            success:function(data){
                $(".answer").text(data).fadeIn("slow");
                $(".answer").delay(1000).fadeOut("slow");
            }
        })
    })
    // /Калькулятор

  // кнопка вызова меню
  $('.header-top__menu-btn').on('click', function () {
    $('.menu').slideToggle();
    // $('.menu__list').toggleClass('menu__list--mobile-visible');
  })
  $('.menu-list__link').on('click', function () {
    $('.menu').slideUp();
  })
  // /кнопка вызова меню


});


// слайдер сравения изображений
function initComparisons() {
  var x, i;
  /*find all elements with an "overlay" class:*/
  x = document.getElementsByClassName("img-comp-overlay");
  for (i = 0; i < x.length; i++) {
    /*once for each "overlay" element:
    pass the "overlay" element as a parameter when executing the compareImages function:*/
    compareImages(x[i]);
  }
  function compareImages(img) {
    var slider, img, clicked = 0, w, h;
    /*get the width and height of the img element*/
    w = img.offsetWidth;
    h = img.offsetHeight;
    /*set the width of the img element to 50%:*/
    img.style.width = (w / 2) + "px";
    /*create slider:*/
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    /*insert slider*/
    img.parentElement.insertBefore(slider, img);
    /*position the slider in the middle:*/
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
    /*execute a function when the mouse button is pressed:*/
    slider.addEventListener("mousedown", slideReady);
    /*and another function when the mouse button is released:*/
    window.addEventListener("mouseup", slideFinish);
    /*or touched (for touch screens:*/
    slider.addEventListener("touchstart", slideReady);
    /*and released (for touch screens:*/
    window.addEventListener("touchstop", slideFinish);
    function slideReady(e) {
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*the slider is now clicked and ready to move:*/
      clicked = 1;
      /*execute a function when the slider is moved:*/
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      /*the slider is no longer clicked:*/
      clicked = 0;
    }
    function slideMove(e) {
      var pos;
      /*if the slider is no longer clicked, exit this function:*/
      if (clicked == 0) return false;
      /*get the cursor's x position:*/
      pos = getCursorPos(e)
      /*prevent the slider from being positioned outside the image:*/
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      /*execute a function that will resize the overlay image according to the cursor:*/
      slide(pos);
    }
    function getCursorPos(e) {
      var a, x = 0;
      e = e || window.event;
      /*get the x positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x coordinate, relative to the image:*/
      x = e.pageX - a.left;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      /*resize the image:*/
      img.style.width = x + "px";
      /*position the slider:*/
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }
};

initComparisons();




