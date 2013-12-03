define(function(require) {

	var $ = require('jquery');
		//var Dispatcher = require('./Dispatcher');
	/*var MagicController = require('MagicController');
	var magicController  = new MagicController();
	var UrlParams = require('util/UrlParams');
	var urlParams = new UrlParams();*/
	$(function(){
		$("#header_div").load("_header.html", function() {
			  /** 调用header.html需要的js */
			  seajs.use('page/_header.js');
		});
	    $("#footer_div").load("_footer.html",function () {
	        seajs.use('page/_footer.js');
	    });
	/*	var id = urlParams.getUrlParams("id");
		magicController.showContentPage("#news-content",id);
		*/
		
	});
		
});

