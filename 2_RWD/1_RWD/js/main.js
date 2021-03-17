$(document).ready(function () {

    $('#menu-trigger').click(function (e) {
        e.preventDefault();
        $('#nav').fadeToggle();
    });
    $(window).resize(function () {
        $('#nav').removeAttr('style');
    });
});