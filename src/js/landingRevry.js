import $ from "jquery";
$(document).ready(function(){
    $('.feature-row').slick({
      infinite: true,
      prevArrow: $('.carouselPrev'),
      nextArrow: $('.carouselNext'),
      speed: 300,
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 960,
          settings: "unslick"
        }
      ]
    });
});