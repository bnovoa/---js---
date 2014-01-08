define(function(require) {

	var $ = require('jquery');
	/*var swfobject = require('swfobject');
	var MagicController = require('MagicController');
	var magicController  = new MagicController();
	seajs.use('lib/bootstrap.min.js');
	seajs.use('lib/jquery.SuperSlide.2.1.js');
	seajs.use('lib/mobanwang.js');
	seajs.use('lib/jquery.kinMaxShow-1.0.min.js');
	seajs.use('lib/jsAddress.js');
	seajs.use('lib/site.js');
	var UrlParams = require('util/UrlParams');
	var urlParams = new UrlParams();*/
		//var Dispatcher = require('./Dispatcher');
	$(function(){
		$("#header_div").load("_header.html", function() {
			  /** 调用header.html需要的js */
			  seajs.use('page/_header.js');
		});
	    $("#footer_div").load("_footer.html",function () {
	        seajs.use('page/_footer.js');
	    });
		/*var category = urlParams.getUrlParams("category");
		
		if(category == null || category == '' || category == undefined){
			magicController.showNewsPageListPage("#news-list",1,"magic_news");
		}else{
			magicController.showNewsPageListPage("#news-list",1,category);
		}*/

	});
		
});

