
import $ from 'jquery';
$(document).ready(function(){
    // SEASON EPISODES CAROUSEL
    $('.carouselRow').slick({
      infinite: false,
      prevArrow: $('.carouselPrev'),
      nextArrow: $('.carouselNext'),
      speed: 300,
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
            breakpoint: 1169,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        }
      ]
    });
});