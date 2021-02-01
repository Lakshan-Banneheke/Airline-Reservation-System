//signup form
$(document).ready(function() {
    if(window.location.href.indexOf('#signup') != -1) {
        $('.header-register-form').toggleClass('active');
    }
  });

  $(document).ready(function() {
    if(window.location.href.indexOf('#login') != -1) {
        $('.header-login-form').toggleClass('active');
    }
  });