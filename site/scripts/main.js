/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {

	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();


	if(!Site.is_mobile()) {	
	Site.Profession = new PageControl('div#article_container','div.dynamic_content');
	Site.Profession
		.attachControls($('div#icons a'))
		.setPauseOnHover(false)		
		.setWrapAround(true);

	// Fucntion for wrapping pagecontrol content
	var max_height = 0;
	var container = $('div#article_container');
	$('div.dynamic_content').each(function(){
		if($(this).height() > max_height) {
			max_height = $(this).height();
			container.css('height',max_height + 10);
		}
	});
	}

};

// connect document `load` event with handler function
$(Site.on_load);
