/*
* Touch Image Gallery (c) Dynamic Drive (www.dynamicdrive.com)
* Last updated: July 4th, 2013
* Visit http://www.dynamicdrive.com/ for this script and 100s more.
* Requires: jQuery 1.7 or higher
* Requires: jquery.touchSwipe.min.js 
*/

(function($){

	var gallerydefaults = {
		width: 300,
		height: 250,
		navarea: '20%',
		curslide: 0,
		threshold: 75,
		navbuttons : ['left.png', 'right.png', -10]
	}

	var swipeOptions={
		triggerOnTouchEnd : true,
		triggerOnTouchLeave : true,
		allowPageScroll:"vertical"
	}

	$.fn.touchgallery = function(options){
		return this.each(function(){
			var setting = $.extend({}, gallerydefaults, options)
				$slideshow = $(this),
				swipestart = false,
				initialx = 0,
				dist = 0,
				swipecount = 0
			var $belt = $slideshow.find('ul:eq(0)')
			var $lis = $belt.find('li')
			var imgcount = $lis.length
			var $jumptodiv = $('<div class="jumptodiv" />')
				.html(function(){
					var bullets =''
					for (var i=0; i<imgcount; i++){
						bullets += '<span data-image="' + i + '" style="cursor: pointer">&#9679;</span> '
					}
					return bullets
				}())
				.appendTo($slideshow)
			var $jumptobuttons = $jumptodiv.find('span')
			var $navbuttons = $('<div style="position:absolute; width: ' + setting.navarea + '; height: 100%; left: 0; top: 0; text-align: left; line-height:' + setting.height + 'px; cursor: pointer; opacity: 0" />')
				.clone()
				.addBack()
				.eq(0)
				.data({'dir': 'back'})
				.html('<img src="' + setting.navbuttons[0] + '" style="vertical-align: middle; position:relative; top:' + setting.navbuttons[2] +'px" title="Back one image" />')
				.end()
				.eq(1)
				.data({'dir': 'forth'})
				.css({left: 'auto', right: 0, textAlign: 'right'}).html('<img src="' + setting.navbuttons[1] + '" style="vertical-align: middle; position:relative; top:' + setting.navbuttons[2] +'px" title="Forward one image" />')
				.end()
				.on('selectstart', function(){
					return false
				})
				.appendTo($slideshow)

			$slideshow.on('mouseenter mouseleave', function(e){
				var opacity = (e.type == 'mouseenter')? 1 : 0
					$navbuttons.animate({opacity: opacity}, 200)
			})

			function navigate(keyword){
				clearTimeout(setting.hidenavtimer)
				var curslide = setting.curslide 
				switch (keyword){
					case 'forth':
						setting.curslide = (curslide < imgcount-1)? curslide + 1 : 0
						break
					case 'back':
						setting.curslide = (curslide >0)? curslide - 1 : imgcount-1
						break
					default:
						setting.curslide = parseInt(keyword)
				}
				$jumptobuttons.removeClass('selected').eq(setting.curslide).addClass('selected')
				$belt.css('left', -setting.width * setting.curslide)
				
			}
	
			$slideshow.add($lis).css({
				width: setting.width,
				height: setting.height
			})
	
			$belt.css({width: setting.width * imgcount})
			navigate(setting.curslide)
	
			swipeOptions.swipeStatus = function(event, phase, direction, distance){
				if (phase == 'start'){
					swipestart = true
					swipecount = 0
					initialx = parseInt( $belt.css('left') )
					dist = 0
				}
				else if (phase == "move" && swipestart){
					dist = (direction == 'left'? -1 : 1) * distance + initialx
					$belt.css('left', Math.min(dist, (setting.curslide+1) * setting.width) )
				}
				else if (phase == 'cancel'){
					$belt.css('left', -setting.width * setting.curslide)
				}
				else if (phase == 'end'){
					if (distance < setting.threshold){ // snap back
						navigate(setting.curslide)
					}
					else{
						swipecount ++
						if (swipecount == 1){
							navigate( (direction == 'left')? 'forth' : 'back' )
						}
					}
					swipestart = false
				}
			}

			swipeOptions.tap = function(event, obj){
				$navbuttons.css({opacity: 1})
				setting.hidenavtimer = setTimeout(function(){
					$navbuttons.css({opacity: 0})
				}, 2000)
			}		
	
			$slideshow.swipe(swipeOptions)

			$navbuttons.swipe({
				tap: function(e){
					var $target = $(this)
					navigate( $target.data('dir') )
				}
			})
			$jumptodiv.swipe({
				tap: function(e){
					if (e.target.tagName == 'SPAN'){
						var $target = $(e.target)
						navigate( parseInt($target.data('image')) )
					}
				}
			})
		})
	}


}) (jQuery)