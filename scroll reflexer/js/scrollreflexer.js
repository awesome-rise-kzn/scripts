$(window).scroll(function() {
  var $window = $(window),
      $panel = $('.section'),
      $menu = $("#menu");
  
  var scroll = $window.scrollTop() + ($window.height() - $menu.height()/2);
  
  $panel.each(function () {
    var $this = $(this);
    $("#menu").text(); 
    if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
      $menu.removeClass(function (index, css) {
        return ( css.match (/(^|\s)section-\S+/g) || []).join(' ');
      });
      $menu.addClass('section-' + $(this).attr('id'));
      
    }
  });    
}).scroll();