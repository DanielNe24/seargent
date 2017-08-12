$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

    if (e.type === 'keyup') {
      if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
      if( $this.val() === '' ) {
        label.removeClass('active highlight'); 
      } else {
        label.removeClass('highlight');   
      }   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
        label.removeClass('highlight'); 
      } 
      else if( $this.val() !== '' ) {
        label.addClass('highlight');
      }
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});


$('#login').on('click', function (e) {

  var userName = $('#loginUsername').val();
  var password = $('#loginPassword').val();

  $.ajax({
    type: "POST",
    url: "https://localhost:8443/login/" + userName + "/" + password,
    success: function(data, status, xhr) { 
      alert(data);
    }
  });


});


$('#signin').on('click', function (e) {

  var userName = $('#signUsername').val();
  var password = $('#signPassword').val();

  $.ajax({
    type: "POST",
    url: "https://localhost:8443/register/" + userName + "/" + password,
    success: function(data, status, xhttp) { alert(data); }
  });


});