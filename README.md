# Touch Image Gallery #

*Description:* Touch Image Gallery is a simple image gallery that caters to mobile and desktop browsers alike, by being touch/ swipe friendly, in addition to the traditional way of navigating. The gallery itself consists of just a regular UL list with images defined inside it.

## Directions ##

*Step 1:* This script uses the following external files:

+ jQuery 1.7 or above (served via Google CDN)
+ touchgallery.js
+ jquery.touchSwipe.min.js
+ Sample images for the controls

*Step 2:* Add the below code to the HEAD section of your page:

	<link rel="stylesheet" href="touchgallery.css" />
	
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
	<script type="text/javascript" src="jquery.touchSwipe.min.js"></script>
	
	<script src="touchgallery.js">
	
	/***********************************************
	* Touch Image Gallery- (c) Dynamic Drive DHTML code library (www.dynamicdrive.com)
	* This notice MUST stay intact for legal use
	* Visit Dynamic Drive at http://www.dynamicdrive.com/ for this script and 100s more
	***********************************************/
	
	</script>
	
	<script>
	
	jQuery(function(){ // on DOM load
			$('div#touchgallery1').touchgallery({  // initialize first demo
				width: 250,
				height: 200
			})
			$('div#touchgallery2').touchgallery({  // initialize second demo
				width: 400,
				height: 350
			})
		})
	
	</script>


*Step 3:* Then, add the below sample markup to your page:

	<div id="touchgallery1" class="touchgallery">
	<ul>
	<li><img src="pool.jpg" /></li>
	<li><img src="cave.jpg" /></li>
	<li><img src="fruits.jpg" /></li>
	<li><img src="autumn.jpg" /></li>
	</ul>
	</div>
	
	<br /><br />
	
	<div id="touchgallery2" class="touchgallery">
	<ul>
	<li><img src="amster1.jpg" /></li>
	<li><img src="amster2.jpg" /></li>
	<li><img src="amster3.jpg" /></li>
	<li><img src="amster4.jpg" /></li>
	</ul>
	</div>

## Touch Image Gallery Set up ##

See script project page for additional details on setup and documentation: <http://www.dynamicdrive.com/dynamicindex4/touchgallery.htm>
