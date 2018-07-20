$(document).ready(function () {
    $('.button-collapse').sideNav();
    $('.scrollspy').scrollSpy({
        scrollOffset: 80,
    });
});

window.onscroll = function () {
    scrollFunction();
}

function scrollFunction() {
    var showButtonHeight = 160;
    if (document.body.scrollTop > showButtonHeight || document.documentElement.scrollTop > showButtonHeight) {
        $('#toTop').addClass('show');
        $('nav').addClass('small');
    } else {
        $('#toTop').removeClass('show');
        $('nav').removeClass('small');
    }
}

function textAnimation(element, text) {
    var el = $(element);
    var textElements = text.split("").map(function (c) {
        return $('<span id="' + c + '">' + c + '</span>');
    });
    var delay = 100; // Tune this for different letter delays.
    textElements.forEach(function (e, i) {
        el.append(e);
        e.css('opacity', '0');
        setTimeout(function () {
            e.animate({
                opacity: 1
            }, 300)
        }, 100 + i * delay)
    })
}

window.onload = function () {
    setTimeout("textAnimation('.header-text h1', 'wyjątkowy dzień')", 500);
    setTimeout("textAnimation('.header-text h2:eq(0)', 'w wyjątkowym')", 2000);
    setTimeout("textAnimation('.header-text h2:eq(1)', 'miejscu')", 3500);
}