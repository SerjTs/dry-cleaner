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
  $('.phone').mask('+0(000)000-00-00', { placeholder: "телефон" });


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
  });
  // Прибавляем кол-во по клику
  $('.counter #buttonCountPlus').click(function () {
    let $input = $(this).parent().find('.quantity');
    let count = parseInt($input.val()) + 1;
    count = count > parseInt($input.data('max-count')) ? parseInt($input.data('max-count')) : count;
    $input.val(parseInt(count));
    // console.log($input.val());
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
  });

  // Калькулятор
  function ResultCalculator(){
        result = 0;
        
        calk_1 = $(".calk_1").attr("data-price"); // толщина листа
        
        calk_2 = $(".calk_2").attr("data-price"); // высота забора
        
        calk_3 = $(".calk_3").attr("data-price"); // покрытие
        
        dlina = $(".calk_4").val(); // длина забора
        dlina_1000 = parseInt(dlina) * 1000; // 1 м = 1000 руб
        
        calk_5 = $(".calk_5").attr("data-price"); // наличие ворот
        
        calk_6 = $(".calk_6").attr("data-price"); // наличие калиток
        
        lagi = $(".calk_7").attr("data-price"); // забор укрепления лагами
        
        calk_8 = $(".calk_8").attr("data-price"); // направление доставки
        
        calk_9 = $(".calk_9").val(); // количество километров от мкад
        
        
        if(calk_1 == "0"){
            calk_1_result = 0;
        } else{
            calk_1_result = 100;
        }
        result += parseInt(dlina_1000) + ( parseInt(dlina) * parseInt(calk_1_result) );
        
        if(lagi == "0"){
            lagi_result = 0;
        } else{
            lagi_result = lagi;
        }
        
        result += parseInt(dlina) * parseInt(lagi_result);
        
        
        if(calk_2 == "0"){
            calk_2_result = 0;
        } else{
            calk_2_result = calk_2;
        }
        
        result += dlina * calk_2_result;
        
        
        if(calk_3 == "0"){
            calk_3_result = 0;
        } else{
            calk_3_result = calk_3;
        }
        
        result += dlina * calk_3_result + parseInt(calk_5) + parseInt(calk_6);
        
        result += parseInt(calk_8) * parseInt(calk_9);
        
        $(".result_calculator span").text(result); // ВСЕГО
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




