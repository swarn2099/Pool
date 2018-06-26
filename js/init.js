(function($) {
  $(function() {
    $('.sidenav').sidenav();
    $('.tabs').tabs();  $('.dropdown-trigger').dropdown();


    $('.datepicker').datepicker();

    $('select').formSelect();
    $('.tap-target').tapTarget();
    $('.dropdown-trigger').dropdown();
    $('.timepicker').timepicker({
      vibrate: true,
      autoClose: true,

    });
    $('.fixed-action-btn').floatingActionButton();
    $('.slider').slider();
    $(".button-collapse").sideNav();
    $('.datepicker').datepicker();

  }); // end of document ready
})(jQuery); // end of jQuery name space

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left'
  });
});
