function scrolledDown() {
    var showButtonHeight = 160;
    if (document.body.scrollTop > showButtonHeight || document.documentElement.scrollTop > showButtonHeight) {
        $('#to-top').addClass('show');
        $('nav').addClass('small');
    } else {
        $('#to-top').removeClass('show');
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

function aboutUsIconResize() {
    var tab = [];
    $('.icons .icon').each(function () {
        $(this).height('auto');
        tab.push($(this).height());
    });
    $('.icons .icon').each(function () {
        $(this).height(Math.max(...tab));
    });
}

function autoplay() {
    $('#galeria .gallery.carousel').carousel('next');
    setTimeout(autoplay, 15000);
}

function dpresScrollFire(elements, offset) {
    position = $(this).scrollTop() + $(this).height() - offset;
    $(elements).each(function () {
        $(this).css('transition', 'all 0.5s linear');
        if (Math.round($(this).position().top) < position) {
            $(this).css("opacity", 1);
        } else {
            $(this).css("opacity", 0);
        }
    });
}




$('html').addClass('js');

$(window).on('load', function () {
    // setTimeout(function () {
    $("#preloader").fadeOut();
    // }, 3000);
    setTimeout(function () {
        textAnimation('.header-text h1', 'wyjątkowy dzień');
    }, 500);
    setTimeout(function () {
        textAnimation('.header-text h2:eq(0)', 'w wyjątkowym');
    }, 2000);
    setTimeout(function () {
        textAnimation('.header-text h2:eq(1)', 'miejscu');
    }, 3500);
    scrolledDown();
    aboutUsIconResize();
    dpresScrollFire('section:not([id="parallax"]), .icon, #kontakt h1, #kontakt .container', 200);
});

$(window).on('resize', function () {
    aboutUsIconResize();
    dpresScrollFire('section:not([id="parallax"]), .icon, #kontakt h1, #kontakt .container', 200);
});

$(window).on('scroll', function () {
    scrolledDown();
    dpresScrollFire('section:not([id="parallax"]), .icon, #kontakt h1, #kontakt .container', 200);
});

$(document).ready(function () {
    $('.button-collapse').sideNav();
    $('.scrollspy').scrollSpy({
        scrollOffset: 80,
    });
    $('#galeria .gallery.carousel a').simpleLightbox();

    $('#galeria .gallery.carousel').carousel({
        fullWidth: true,
        padding: 0,
        duration: 50
    });
    $('#galeria .gallery.carousel').attr("style", "height:250px");
    setTimeout(autoplay, 15000);
    $('#galeria .alfa1 .arrow.arrow-left').click(function () {
        $('#galeria .alfa1.carousel').carousel('prev');
    });
    $('#galeria .alfa1 .arrow.arrow-right').click(function () {
        $('#galeria .alfa1.carousel').carousel('next');
    });
    $('#galeria .alfa2 .arrow.arrow-left').click(function () {
        $('#galeria .alfa2.carousel').carousel('prev');
    });
    $('#galeria .alfa2 .arrow.arrow-right').click(function () {
        $('#galeria .alfa2.carousel').carousel('next');
    });


    $('#oferta .row:nth-child(2) ul li').css('opacity',0);
    var options = [{
            selector: '#oferta .row:nth-child(2) ul:nth-of-type(1)',
            offset: 200,
            callback: function (el) {
                Materialize.showStaggeredList($(el));
            }
        },
        {
            selector: '#oferta .row:nth-child(2) ul:nth-of-type(2)',
            offset: 200,
            callback: function (el) {
                Materialize.showStaggeredList($(el));
            }
        }
    ];
    Materialize.scrollFire(options);
});

/* google maps */
function gmap(lat, lng, z) {
    lat = (typeof lat !== 'undefined') ? lat : 1;
    lng = (typeof lng !== 'undefined') ? lng : 1;
    z = (typeof z !== 'undefined') ? z : 9;
    var mapProp = {
        center: new google.maps.LatLng(lat, lng),
        zoom: z,
        disableDefaultUI: true,
        //mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeId: 'roadmap',
        styles: [{
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#444444"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "color": "#f2f2f2"
            }]
        }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "lightness": 45
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                "color": "#dadada"
            }, {
                "visibility": "on"
            }]
        }]
    };
    var map = new google.maps.Map(document.getElementById("google-maps"), mapProp);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        icon: 'img/alfa-pin.png'
    });
    marker.setMap(map);
}
google.maps.event.addDomListener(window, 'load', gmap(49.671725, 20.686636, 11));
$(".map-control>div").eq(0).find(".show-on-map").click(function () {
    gmap(49.671725, 20.686636, 11);
    $(".map-control>div").eq(1).removeClass("choosed");
    $(".map-control>div").eq(0).addClass("choosed");
});
$(".map-control>div").eq(1).find(".show-on-map").click(function () {
    gmap(49.672952, 20.686113, 11);
    $(".map-control>div").eq(0).removeClass("choosed");
    $(".map-control>div").eq(1).addClass("choosed");
});