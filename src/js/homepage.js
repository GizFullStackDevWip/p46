$(document).ready(function(){
    // HOMEPAGE BANNER SECTION CAROUSEL
    $('.hpbSlider').slick({
        arrows:false, 
        dots: false, 
        infinite:true, 
        speed:500,   
        fade: true,
        cssEase: 'linear',
        autoplay:false, 
        autoplaySpeed: 5000, 
        slidesToShow:1, 
        slidesToScroll:1
    });
    $('.hpbSliderNav').slick({
        arrows:false, 
        dots: false, 
        speed:500, 
        autoplay:false,
        variableWidth: true,
        autoplaySpeed: 5000,
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.hpbSlider',
        centerMode: true,
        focusOnSelect: true
    });
    //On click of slider-nav childern,
    //Slick slider navigate to the respective index.
    $('.hpbSlider > div').click(function() {
        $('.hpbSlider').slick('slickGoTo',$(this).index());
    })
    
    // HOMEPAGE MOVIE TILE SECTION CAROUSEL
    $('.carouselRow').slick({
      infinite: false,
      speed: 300,
      prevArrow: $('.carouselPrev'),
      nextArrow: $('.carouselNext'),
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