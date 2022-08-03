import $ from "jquery";
$(document).ready(function () {
   $(window).scroll(function () {
      var leftSectionHeight = $(".vp3Section.movieInfo").height();
      var windowScroll = $(window).scrollTop();
      if (windowScroll > (leftSectionHeight  - 150)) {
         $(".videoPageContainer ._2xXnB").css('position', 'absolute');
         $(".videoPageContainer ._2xXnB").css('top', (leftSectionHeight  - 100) + 'px');
      }
      else {
         $(".videoPageContainer ._2xXnB").css('position', 'fixed');
         $(".videoPageContainer ._2xXnB").css('top', '100px');
      }
   });
});