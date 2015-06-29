/*
 * Digital Displays Software Core JS Script
 * 
 * @version		0.1
 * @package		com.yourstudentsunion.digital-displays
 * @description	Logic Code for the Digital Displays		
 * @author 		suweb (@James_RWilliams)
 * @copyright 	Copyright (c) 03/06/2015
 *
 */	

/*
==	Core Slideshow Timing Settings. 
==	
==	Change the following values to play slides longer or speed up the page refresh.
==
*/

var slide_length = 10000; 			// 10s per slide
var slideshow_length = 1800000; 	// 1/2 Hour

var i, console;

/**
 *	dissappearCursor
 *
 *	Function hides the mouse on inactivity.
 * 
 */		

(function() {
	
	var mouseTimer = null, cursorVisible = true;
	function disappearCursor() {
	    mouseTimer = null;
	    document.body.style.cursor = "none";
	    cursorVisible = false;
	}

	document.onmousemove = function() {
	    if (mouseTimer) {
	        window.clearTimeout(mouseTimer);
	    }
	    if (!cursorVisible) {
	        document.body.style.cursor = "default";
	        cursorVisible = true;
	    }
	    mouseTimer = window.setTimeout(disappearCursor, 5000);
	};
})();

/**
 *	parseRSS
 * 
 */			
		
function parseNews(url) {
	
	$.ajax({
	
		url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
		dataType: 'json',
		success: function(data) {
	
			for(i = 0; i < 2; i++){
			
				$("ul#bbc_news").append("<li><h2>" + data.responseData.feed.entries[i].title + "</h2><p>" + data.responseData.feed.entries[i].content + "</p></li>");
			
			}
	
		}
		
	});
	
}

/**
 *	parseRSS Event
 * 
 */			
		
function parseEvents(url) {
	
	$.ajax({
	
		url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
		dataType: 'json',
		success: function(data) {
	
			console.log(data.responseData.feed);
	
			for(i = 0; i < 6; i++){
				
				var title = data.responseData.feed.entries[i].title.replace(/ *\([^)]*\) */g, ""); 
				var raw_date = data.responseData.feed.entries[i].title.replace( /(^.*\(|\).*$)/g, '' );
				
				var raw_day = raw_date.substring(0, raw_date.indexOf(','));
				
				var d = new Date();
				var dayNames=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
				
				from = raw_day.split("/");
				var f = new Date(from[2], from[1] - 1, from[0]);
			
				var day = dayNames[f.getDay()-1];
				
				console.log(raw_day);
			
				$("ul#events_feed").append("<li>" + day + "<h2>" + title + "</h2><p>" + raw_day + "</p><p>" + data.responseData.feed.entries[i].contentSnippet + "</p></li>");
			
			}
	
		}
		
	});
	
}

/**
 *	
 * 
 */		

function init(){

	// Full list of configuration options available at:
	// https://github.com/hakimel/reveal.js#configuration
	
	Reveal.initialize({
		controls: false,
		progress: false,
		center: true,
		history: false,
		autoSlide: slide_length,
		hideAddressBar: true,
		slideNumber: true,
		loop: true,
		viewDistance: 2,
		margin: 0.05,
	
		transition: 'slide', // none/fade/slide/convex/concave/zoom
	
		// Optional reveal.js plugins
		dependencies: [
			{ src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
			{ src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
			{ src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
			{ src: 'plugin/highlight/highlight.js', async: true, condition: function() { return !!document.querySelector( 'pre code' ); }, callback: function() { hljs.initHighlightingOnLoad(); } },
			{ src: 'plugin/zoom-js/zoom.js', async: true },
			{ src: 'plugin/notes/notes.js', async: true }
		]
	});

	/*
	 * Instagram Feed Setup
	 */
	
	var feed = new Instafeed({
		get: 'tagged',
		tagName: 'teamglos',
		limit: '18',
		clientId: 'fda19f1a5f0b46118977ac598d0384d1'
		});
	feed.run();
	
	parseNews("http://feeds.bbci.co.uk/news/uk/rss.xml");
	parseEvents("http://www.yourstudentsunion.com/ents/rss/6013/subtree/");
	
}

/**
 *	setInterval Function
 *
 *	Automatically reloads the page at a sepcified interval for the slide to fetch new data.
 * 
 */		

setInterval(function () {

	location.reload();
	
}, slideshow_length);
	
			
init();
