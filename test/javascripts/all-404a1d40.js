$( function() {

  var within = 0;
  var wasWithin = null;

  var tops = [
    $('[data-section="about"]').position().top,
    $('[data-section="concert"]').position().top,
    $('[data-section="insights"]').position().top,
    $('[data-section="hymnal"]').position().top,
    $('[data-section="vox"]').position().top
  ];

  var $menuItems = $('.nav-items');

  function followMenu() {
    var top = $(window).scrollTop();
    for(var i = 0; i < tops.length; i++) {
      if(top < tops[i] && top > 0) {
        within = i - 1;
        break;
      } else if(top > tops[i] && i == tops.length - 1) {
        within = tops.length - 1;
      }
    }
    if(within !== wasWithin) {
      $menuItems.removeClass('active').eq(within).addClass('active');
      wasWithin = within;
    }
  }

  function setTops() {
    tops = [
      $('[data-section="about"]').position().top,
      $('[data-section="concert"]').position().top,
      $('[data-section="insights"]').position().top,
      $('[data-section="hymnal"]').position().top,
      $('[data-section="vox"]').position().top
    ];
  }

  $menuItems.on('click', function(e) {
    var $section = $('[data-section="' + $(this).attr('data-control') + '"]');
    $('body,html').animate({
      scrollTop: $section.find('[data-here]').position().top - window.innerHeight*0.15
    }, '200', 'swing', function() { });
  });


  $(window).scroll(followMenu);
  $(window).resize(setTops);

  followMenu();

});
