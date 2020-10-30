import $ from 'jquery';
$(document).ready(function(){
    // SEASON EPISODES CAROUSEL
    $('.carouselRow').slick({
      infinite: false,
      prevArrow: $('.carouselPrev'),
      nextArrow: $('.carouselNext'),
      speed: 300,
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
            breakpoint: 960,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        }
      ]
    });
});