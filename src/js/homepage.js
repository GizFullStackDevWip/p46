import $ from 'jquery';
$(document).ready(function(){
    // HOMEPAGE BANNER SECTION CAROUSEL
    $('.hpbSlider').slick({
        arrows:false, 
        dots: false, 
        infinite:true, 
        speed:500,   
        fade: true,
        cssEase: 'linear',
        autoplay: true, 
        autoplaySpeed: 5000, 
        slidesToShow:1, 
        slidesToScroll:1
    });
    $('.hpbSliderNav').slick({
        arrows:false, 
        dots: false, 
        speed:500, 
        autoplay: true,
        variableWidth: true,
        autoplaySpeed: 5000,
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.hpbSlider',
        centerMode: true,
        focusOnSelect: true,
    });

    
    // HOMEPAGE MOVIE TILE SECTION CAROUSEL
    $(function () {
        var $sliders = $(".carouselRow");
        var $prevArrows = $('.arrows .carouselPrev');
        var $nextArrows = $('.arrows .carouselNext');
        $(".carousel").each(function(){
            var $this = $(this);
            var slick = $this.find( $sliders ).slick({
                infinite: false,
                prevArrow: $this.find( $prevArrows ),
                nextArrow: $this.find( $nextArrows ),
                speed: 300,
                dots: false,
                slidesToShow: 6,
                slidesToScroll: 6,
                responsive: [
                  {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                    }
                  },
                  {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                  }
                ]
            });
        });
    });    

});