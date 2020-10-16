import $ from 'jquery';
$(document).ready(function(){
    // MENU HOVER FUNCTION
    $(".menuIcon").hover(function(){
        if($(this).next('.menuItemContainer').hasClass('menuClose')) {
            $(this).next('.menuItemContainer').removeClass('menuClose');
            $('.pageWrapper').addClass('menuOpened');
        }
    });
    $(".menuWrapper").hover(function(){
        if($(this).parent('.menuItemContainer').hasClass('menuClose')) {
            $(this).parent('.menuItemContainer').removeClass('menuClose');
            $('.pageWrapper').addClass('menuOpened');
        }
    });
    $(".closeMenuWrapper").hover(function(){
        // if($('.pageWrapper').hasClass('menuOpened')) {
            $('.menuItemContainer').addClass('menuClose');
            $('.pageWrapper').removeClass('menuOpened');
        // }
    // });
  });

  $('.menuIcon').on('click', ()=>{
    if($('.menuItemContainer').hasClass('menuClose')) {
      $('.menuItemContainer').removeClass('menuClose');
    } else {
      $('.menuItemContainer').addClass('menuClose');
    }
  })
            
    // ACCORDION CLICK FUNCTION
    $(".faqIcon").click(function(){
      if($(this).parents().hasClass('faqBoxSection')) {
            $('.faqBoxOpened').addClass('faqBoxSection');
            $('.faqBoxOpened').removeClass('faqBoxOpened');
            $(this).parents('.faqBoxSection').addClass('faqBoxOpened');
            $(this).parents('.faqBoxSection').removeClass('faqBoxSection');
      }
      else if($(this).parents().hasClass('faqBoxOpened')) {      
        $(this).parents('.faqBoxOpened').addClass('faqBoxSection');
        $(this).parents('.faqBoxOpened').removeClass('faqBoxOpened');
      }
    });
    
    // ON SCROLL TOGGLE HEADER FUNCTION
    var prev = 0;
    var nav = $('.headerMenu');

    $(window).on('scroll', function(){
      var scrollTop = $(window).scrollTop();
      if(scrollTop > prev && !nav.hasClass('hideHeader')) {
        nav.addClass('hideHeader');
        nav.removeClass('headerGradient');
      } 
      // else if(scrollTop < prev && nav.hasClass('hideHeader')) {
      //   nav.removeClass('hideHeader');    
      // }
      else if(scrollTop == 0 && nav.hasClass('gradientCheck')) {
        nav.addClass('headerGradient');
      } 
      if (scrollTop < 50) {
        nav.removeClass('hideHeader'); 
        nav.addClass('headerGradient');  
      }
      // else if(scrollTop < 1000) {
      //   nav.removeClass('hideHeader');
      //   nav.addClass('headerGradient');
      // }
      prev = scrollTop;
      console.log('scrollTop', scrollTop);

    });
        
    // INPUT FOCUS BLUR FUNCTION
    $(".inputText").focus(function() {
        $(this).parent('.input').addClass('inputActive');
    });
    $(".inputText").focusout(function() {
        $(this).parent('.input').removeClass('inputActive');
    });
    
    // MOVIE TILE HOVER TOGGLE PLAY BUTTON
    // $(".movieTile").hover(
    //    function () {
    //        $(this).find('.wishlistPosition').removeClass('wishlistParentClose');
    //        $(this).find('.wlgradientPosition').removeClass('wlgradientClose');
    //        $(this).find('.movieTileImage').addClass('movieTileImageOpen');
    //        $(this).find('.movieTileIcon').addClass('movieTileHoverOpened');
    //        $(this).find('.wishlistPosition').addClass('wishlistParentOpen');
    //        $(this).find('.wlgradientPosition').addClass('wlgradientOpen');
    //    }, 

    //    function () {
    //        $(this).find('.wishlistPosition').addClass('wishlistParentClose');
    //        $(this).find('.wlgradientPosition').addClass('wlgradientClose');
    //        $(this).find('.movieTileImage').removeClass('movieTileImageOpen');
    //        $(this).find('.movieTileIcon').removeClass('movieTileHoverOpened');
    //        $(this).find('.wishlistPosition').removeClass('wishlistParentOpen');
    //        $(this).find('.wlgradientPosition').removeClass('wlgradientOpen');
    //    }
    // );
});