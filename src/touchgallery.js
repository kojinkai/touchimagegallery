/*
* Touch Image Gallery (c) Dynamic Drive (www.dynamicdrive.com)
* Last updated: July 4th, 2013
* Visit http://www.dynamicdrive.com/ for this script and 100s more.
* Requires: jQuery 1.7 or higher
* Requires: jquery.touchSwipe.min.js 
*/

(function($){

  var touchgallery = 'touchgallery';

  var defaults = {
    width: 300,
    height: 250,
    navarea: '20%',
    curslide: 0,
    threshold: 75,
    navbuttons : ['left.png', 'right.png', -10]
  };

  var swipeOptions = {
    triggerOnTouchEnd : true,
    triggerOnTouchLeave : true,
    allowPageScroll:"vertical",
    swipe: function(event, direction, distance, duration, fingercount) {
      console.log('event: ', event, '\n', 'duration: ', duration);
    }
  };

  // jQuery.support.transition
  // to verify that CSS3 transition is supported (or any of its browser-specific implementations)
  $.support.transition = (function(){ 
      var thisBody = document.body || document.documentElement,
      thisStyle = thisBody.style,
      support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
      
      return support; 
  })();  

  function Touchgallery(element, options)  {
    
    this._name = touchgallery;
    this.element = element;
    this.options = $.extend( {}, defaults, options);
    this.swipestart = false;
    this.dist = 0;
    this.initialx = 0;

    this.init();
  }

  Touchgallery.prototype = {
    
    init: function() {
      
      $(this.element).addClass('touchgallery');
      
      this.swipeHandlers();
      
      $(this.element).swipe(swipeOptions);
    },
    
    swipeHandlers: function(element) {

      var $wrapper = $(this.element),
        $lis = $wrapper.find('.slide');

      var that = this;
      // Set up the swipeoptions for when the event is triggered
      swipeOptions.swipeStatus = function(event, phase, direction, distance) {
        console.log("phase: ", phase);
        var swipecount = 0;
        console.log('that is: ', $wrapper);
        if (phase == 'start'){
          // that.swipestart = true;
          that.initialx = parseInt( $wrapper.css('left'), 10 );
          that.dist = 0;
        }
        // else if (phase == "move" && swipestart) {
        //   that.dist = (direction == 'left'? -1 : 1) * distance + that.initialx;
          
        //   $wrapper.css('left', Math.min(dist, (that.options.curslide+1) * that.options.width) );
        // }
        // else if (phase == 'cancel') {
        //   $wrapper.css('left', -that.options.width * that.options.curslide);
        // }
        // else if (phase == 'end'){
        //   if (distance < that.options.threshold) { // snap back
        //     // navigate(that.options.curslide);
        //   } 
        //   else{
        //     swipecount ++;
        //     if (swipecount == 1){
        //       // navigate( (direction == 'left')? 'forth' : 'back' );
        //     }
        //   }
        //   // that.swipestart = false;
        // }
      };

      // swipeOptions.swipe = function(event, direction, distance, duration, fingercount) {
      //   console.log('event: ', event, '\n', 'duration: ', duration);
      // };
    },
    destroy: function() {
      console.log('destroy');
    }
  };  

  $.fn[touchgallery] = function ( options ) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('touchgallery');
      if (!data) {
        $this.data('touchgallery', (data = new Touchgallery(this, options)));
      }
      else {
        new Touchgallery( this, options );
      }      
    });
  };


}) (jQuery);