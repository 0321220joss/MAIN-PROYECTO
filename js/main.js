(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    // Comentado para evitar error en consola
    // console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    });
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    });

    // Project and Testimonial carousel (no cambia)
    $(".project-carousel, .testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0: { items: 1 },
            576: { items: 1 },
            768: { items: 2 },
            992: { items: 3 }
        }
    });

    // ================== Lógica para carrusel novedades ==================
    let currentIndex = 0;
    const track = document.querySelector('.carousel-track');
    const products = document.querySelectorAll('.carousel-track .product-card');
    const totalProducts = products.length;
    const visibleProducts = 3; // Mostrar 3 productos visibles

    window.moveCarousel = function (direction) {
        currentIndex += direction * visibleProducts;

        // Ciclar índice si pasa límites
        if (currentIndex < 0) {
            currentIndex = totalProducts - visibleProducts;
        } else if (currentIndex >= totalProducts) {
            currentIndex = 0;
        }

        // Calcular cuánto mover el track
        const productWidth = products[0].offsetWidth;
        const gap = 16; // Ajusta si tienes otro margen/padding entre productos
        const moveX = -(currentIndex * (productWidth + gap));

        // Aplicar transformación con transición suave
        track.style.transition = 'transform 0.5s ease';
        track.style.transform = `translateX(${moveX}px)`;
    }

})(jQuery);
