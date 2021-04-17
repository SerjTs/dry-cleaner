$(document).ready(function () {
  
    $('.form').each(function(){
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
  $('.phone').mask('+0(000)000-00-00', {placeholder: "телефон"});




    var count = 0;

 $('#counter').data('count', 0);
$('#update').click(function(){
    $('#counter').html(function(){
        var $this = $(this),
            count = $this.data('count') + 1;

        $this.data('count', count);
        return count;
    });
});

});