(function($) {
  $(function() {
    $('.tabs').tabs();
    $('.scrollspy').scrollSpy();
    $('.sidenav').sidenav();
    $('.dropdown-trigger').dropdown();
    $('.datepicker').datepicker({autoClose: true});
    $('select').formSelect();
    $('.parallax').parallax();
    $('.timepicker').timepicker({
      vibrate: true,
    });
    $(".button-collapse").sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space
