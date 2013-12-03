$(function() {
  var $sections = $('#slider .sl-slide'),
      total = $sections.length,
      active = 0,
      $fadeOutSection = $sections.eq(0).css({zIndex: 3}),
      autoplay = true;
      
  function crossfade(dir) {
    active = (dir == 'next') ? active + 1 : active - 1;
    if(active == total) active = 0;
    if(active < 0) active = total - 1;
    var $activeSection = $sections.eq(active);
    
    $activeSection.css({zIndex: '2'})
    $fadeOutSection.stop().fadeOut(400, function() {
      $(this).css({zIndex: '1'}).show();
      $activeSection.css({zIndex: '3'});
    })
    
    $fadeOutSection = $activeSection;
  }
  
  $('.nav-arrow-prev').click(function() {
    if($sections.is(':animated')) return;
    crossfade('prev');
  })
  
  $('.nav-arrow-next').click(function() {
    if($sections.is(':animated')) return;
    crossfade('next');
  })
})
