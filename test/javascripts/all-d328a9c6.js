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
      $menuItems.removeClass('nav--active').eq(within).addClass('nav--active');
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

  // Images

  function setImageLogic() {
    $('img').on('click', function(e) {
      // Update active class on image click
      $('.active').removeClass('active');
      var target = $(e.target);
      target.addClass('active');
      target.parent().addClass('images--active');
      centerCurrentImage(target);
      expandList(target);
    });

    // Keyboard shortucts:
    // A) ESC: Close all active
    // B) Forward Arrow: Move to next
    // C) Back Arrow: Move to previous
    window.addEventListener('keydown', function(e) {
      var active = $('.active');
      if (e.keyCode === 27) {
        active.removeClass('active');
        $('.images--active').removeClass('images--active');
      } else if (
        (e.keyCode === 37 && active.prev().length > 0) ||
        (e.keyCode === 39 && active.next().length > 0)
      ) {
        var target = e.keyCode === 37 ? active.prev() : active.next();
        active.removeClass('active');
        target.addClass('active');
        centerCurrentImage(target);

        // If we're moving forward, expand the list to mock infinite scrolling
        if (e.keyCode === 39) {
          expandList(target);
        }
      }
    });
  }

  // If nearing the end of the current image list, clone and expand to create
  // an infinite effect.
  //
  // TODO: Make this more performant if need be
  function expandList(target) {
    if (target.nextAll().length <= 2) {
      var siblings = target.siblings();
      var previous = siblings.clone(true);
      previous.insertAfter(siblings.last());
    }
  }

  // After expansion delay, center image in viewport
  function centerCurrentImage(target) {
    setTimeout(function() {
      var offset = (window.innerWidth - target.width()) / 2;
      var reset = target.parent().parent().scrollLeft() + target.position().left - offset;
      target.parent().parent().animate({ scrollLeft: reset });
    }, 310);
  }

  setImageLogic();
});
