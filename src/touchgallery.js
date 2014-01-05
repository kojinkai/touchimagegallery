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
    fullWidth: true,
    currentWidth: 0,
    navarea: '20%',
    curslide: 0,
    threshold: 75,
    navbuttons : ['left.png', 'right.png', -10]
  };

  var swipeOptions = {
    triggerOnTouchEnd : true,
    triggerOnTouchLeave : true,
    allowPageScroll:"vertical"
  }; 

  function Touchgallery(element, options)  {
    
    this._name = touchgallery;
    this.element = element;
    this.slides = $(this.element).find('.slide');
    this.options = $.extend( {}, defaults, options);
    
    this.swipestart = false;
    this.dist = 0;
    this.initialx = 0;

    this.init();
  }

  Touchgallery.prototype = {
    
    init: function() {
      console.log('init: ', this.currentSlide);
      this.checkTransitionSupport();
      this.swipeHandlers();
      
      $(this.element).swipe(swipeOptions);
    },

    checkTransitionSupport: function(){
      //Check 3d support
      var translate3D = "translate3d(0px, 0px, 0px)",
        tempElem = document.createElement("div");

      tempElem.style.cssText = "  -moz-transform:"    + translate3D +
                                  "; -ms-transform:"     + translate3D +
                                  "; -o-transform:"      + translate3D +
                                  "; -webkit-transform:" + translate3D +
                                  "; transform:"         + translate3D;
      
      var regex = /translate3d\(0px, 0px, 0px\)/g,
        asSupport = tempElem.style.cssText.match(regex),
        support3d = (asSupport !== null && asSupport.length === 1);

      var isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;

      this.browser = {
        "support3d" : support3d,
        "isTouch" : isTouch
      };
    },

    calcWidth: function() {
      var slideWidth = $(this.slides).first().width(),
        windowWidth = $(window).width();
      
      if ( this.options.fullWidth ) {
        this.options.currentWidth = slideWidth - ( windowWidth - slideWidth);
      }
      else {
        this.options.currentWidth = slideWidth;
      }
    },

    doTranslate : function(pixels){
      return {
        "-webkit-transform": "translate3d("+pixels+"px, 0px, 0px)",
        "-moz-transform": "translate3d("+pixels+"px, 0px, 0px)",
        "-o-transform": "translate3d("+pixels+"px, 0px, 0px)",
        "-ms-transform": "translate3d("+pixels+"px, 0px, 0px)",
        "transform": "translate3d("+pixels+"px, 0px,0px)"
      };
    },
    
    swipeHandlers: function(element) {

      var that = this;

      // Set up the swipeoptions for when the event is triggered
      swipeOptions.swipeStatus = function(event, phase, direction, distance) {

        var swipecount = 0;
        
        if (phase == 'start') {
          
          // grab the slide width
          that.calcWidth();

          that.swipestart = true;

          that.dist = 0;
        }
        else if (phase == "move" && that.swipestart) {
            
          that.dist = (direction == 'left' ? -1 : 1) * distance + that.initialx;
          $(that.element).css( that.doTranslate(Math.min(that.dist, that.options.width) ) );
          
        }
        // else if (phase == 'cancel') {
        //   $(that.element).css('left', -that.options.width * that.options.curslide);
        // }
        else if (phase == 'end'){
          if ( distance < that.options.threshold || (that.currentSlide === 0 && direction == 'right') || that.slides.length === that.currentSlide + 1 ) { // snap back
            that.setPos(that.currentSlide);
          }
          else {
            that.advanceSlide(direction);
          }
        } 
        //   else{
        //     swipecount ++;
        //     if (swipecount == 1){
        //       // navigate( (direction == 'left')? 'forth' : 'back' );
        //     }
        //   }
        //   // that.swipestart = false;
        // }
      };
    },

    advanceSlide: function(dir) {
      if ( dir === 'left' ) {
        this.currentSlide++;
      }
      else {
        this.currentSlide-= 1;
      }
      this.setPos(this.currentSlide);
    },

    setPos: function(slide) {
      console.log('setPos fired');
      console.log('currentSlide: ', this.currentSlide);
      var offsetPos = (slide === 0) ? 0 : -slide * this.options.currentWidth;

      $(this.element).css( this.doTranslate(offsetPos) );
      this.initialx = offsetPos;
    },

    destroy: function() {
      console.log('destroy');
    },
    
    currentSlide: 0,    
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