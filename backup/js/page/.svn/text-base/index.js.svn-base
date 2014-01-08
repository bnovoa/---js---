/*index.js*/

define(function(require) {

	var $ = require('jquery');
	var swfobject = require('swfobject');
	var MagicController = require('MagicController');
	var magicController  = new MagicController();
	seajs.use('lib/bootstrap.min.js');
	seajs.use('lib/jquery.slides.min.js');
	seajs.use('lib/mobanwang.js');
	seajs.use('lib/jquery.kinMaxShow-1.0.min.js');
	seajs.use('lib/jsAddress.js');
	seajs.use('lib/site.js');
	seajs.use('lib/jquery.mousewheel-3.0.6.pack.js');
	
	$(function() {

	$("#header_div").load("_header.html", function() {
		  seajs.use('page/_header.js');
	});
    $("#footer_div").load("_footer.html",function () {
        seajs.use('page/_footer.js');
    });
    
	});
});

