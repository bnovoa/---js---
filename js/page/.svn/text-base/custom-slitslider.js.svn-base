$(function() {
  $("#header_div").load("header.html", function() {
    /** 调用header.html需要的js */
    seajs.use('page/header.js');
  });
  $("#footer_div").load("footer.html", function() {
    seajs.use('page/footer.js');
  });
  var Page = (function() {
    var $navArrows = $('#nav-arrows'),
      $nav = $('#nav-dots > span'),
      slitslider = $('#slider').slitslider({
        onBeforeChange: function(slide, pos) {
          $nav.removeClass('nav-dot-current');
          $nav.eq(pos).addClass('nav-dot-current');
        }
      }),

      init = function() {

        initEvents();

      },
      initEvents = function() {

        // add navigation events
        $navArrows.children(':last').on('click', function() {

          slitslider.next();
          return false;

        });

        $navArrows.children(':first').on('click', function() {
          slitslider.previous();
          return false;

        });

        $nav.each(function(i) {

          $(this).on('click', function(event) {

            var $dot = $(this);

            if (!slitslider.isActive()) {

              $nav.removeClass('nav-dot-current');
              $dot.addClass('nav-dot-current');

            }

            slitslider.jump(i + 1);
            return false;

          });

        });

      };

    return {
      init: init
    };

  })();

  Page.init();
})