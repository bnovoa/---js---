define(function(require) {
  var $ = require('jquery');
  
  seajs.use('lib/jquery.ba-cond.min.js');  
   
  if(window.jQuery) {
    init();
  }
  
  
function init() {  
  $(function() {
    
    $('#global-header-section').load('_header.html',function(){
        seajs.use('page/_header.js');
        $('#go-download-section').click(function(event) {
          event.preventDefault();
          $navs.eq(4).click();
        })
    });
    
    $('#global-footer-section').load('_footer.html');
    
    seajs.use('lib/modernizr.custom.92426.js', function() {
      Modernizr.load({
        test: Modernizr.csstransitions && Modernizr.csstransforms3d,
        yep: ['js/lib/jquery.slitslider.js', 'js/page/custom-slitslider.js'],
        nope: ['js/page/crossfade.js']
      })
      
      // 触摸设备控制
      Modernizr.load({
        test: Modernizr.touch,
        yep: ['js/lib/jquery.touchSwipe.min.js'],
        complete: function() {
        if(!Modernizr.touch) return;
          $('#main').swipe({
          swipe:function(event, direction, distance, duration, fingerCount) {
            if(direction == 'up') {
              scroll('bt');
            } else if (direction == 'down') {
              scroll('tb');
            }
          }
        });
        }
      })
    });

    $('.section3 ul li').hover(function() {
      $(this).toggleClass('hover');
    })
    
    
    
/*
    // Tab
    $('.tab-nav a').click(function() {
      var $tabContainer = $(this).closest('.tab-container');
      var $tabPanel = $tabContainer.children('.tab-panel');
      var $tabButton = $(this).closest('.tab-nav').find('a').removeClass('current');
      $(this).addClass('current');
      $tabPanel.hide().eq($(this).closest('li').index()).show();
      return false;
    })
    $('.tab-nav li:first-child a').click();
    
*/
    
    // one page scroll
    var $main = $('#main'),
        $sections = $('#main > .fullscreen'),
        $navs = $('#section-nav li'),
        active = 0,
        total = $sections.length;
    $navs.eq(active).addClass('active');    
    $sections.not(':first').hide();
    $sections.eq(active).addClass('active');
    
    var animEndEventNames = {
      'WebkitAnimation' : 'webkitAnimationEnd',// Saf 6, Android Browser
      'MozAnimation'    : 'animationnend',      // only for FF < 15
      'animation'       : 'animationend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
    }
  
    function scroll(dir) {
      var winHeight = $(window).height();
      var oldActive = active;
      active = (dir == 'bt') ? active + 1 : active - 1;
      if(active == total) {
        active = total - 1;
        return false;
      }
      if(active < 0) {
        active = 0;
        return false;
      }
      
      $sections.removeClass('active');
      var $activeSection = $sections.eq(active).addClass('active'),
          top = (dir == 'bt') ? winHeight : -winHeight;
      
      $navs.removeClass('active').eq(active).addClass('active');
      
/*
      if(Modernizr.csstransforms3d && Modernizr.csstransitions) {
        var dirClass = (dir == 'bt') ? 'section-up' : 'section-down';
        $activeSection.css({top: '0'}).show().addClass(dirClass);
        $sections.eq(oldActive).css({top: -top}).on(animEndEventNames[Modernizr.prefixed('animation')], function() {
          $(this).hide();
        })
      }
*/
      
      $activeSection.css({top: top}).show().stop().animate({
        top: 0
      }, 1000);
      $sections.eq(oldActive).animate({
        top: -top
      }, 1000, function() {
        $(this).hide();
      });
    }
    
    function fade(clicked) {
      var oldActive = active;
      active = clicked;
      $navs.removeClass('active');
      $navs.eq(active).addClass('active');
      $sections.removeClass('active');
      $sections.eq(active).addClass('active');
      $sections.eq(oldActive).fadeOut(300, function() {
        $sections.eq(active).css({top: '0'}).delay(50).fadeIn(300);
      })
    }
    
    // 点导航控制
    $navs.click(function() {
      var clicked = $navs.index(this);
      var oldActive = active;
      if($sections.is(':animated')) return false;
      if(clicked == active) return false;
      else if(clicked == active + 1) scroll('bt');
      else if(clicked == active - 1) scroll('tb');
      else {
        fade(clicked);
      }
    })
    
    // 鼠标滚轮控制
    seajs.use('lib/jquery.mousewheel.js', function() {
      $(document).mousewheel(function(event, delta) {
        if($sections.is(':animated')) {
          return false;
        }
        if(delta > 0) {
          scroll('tb')
        } else {
          scroll('bt')
        }
      })
    }); 
    
    
    
    
    // 方向键控制
    $(document).keydown(function(event) {
      if($sections.is(':animated')) {
        return false;
      }
      switch(event.keyCode) {
        case 38:
          scroll('tb');
          break;
        case 40:
          scroll('bt');
          break;
        case 32:
          if(event.shiftKey) {
            scroll('tb');
          } else {
            scroll('bt');
          }
          break;
      }    
    })
    
    $('#back-to-top').click(function(event) {
      event.preventDefault();
      $navs.eq(0).click();
    })
    
    // app下载链接跳转
    if(location.hash == '#download-section') {
      $navs.eq(4).click();
    }
  });
}  
});