$(document).ready(function(){
    // CAREERS WORK TOGETHER SECTION CAROUSEL
    $('.tubi_images_carousel').slick({
      infinite: true,
      speed: 300,
      dots: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
});