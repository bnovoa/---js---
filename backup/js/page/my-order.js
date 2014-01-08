define(function(require){
	var $ = require("jquery");
	var MagicController = require('MagicController');
	var magicController = new MagicController();
	$(function(){
		$("#header_div").load("_header.html", function() {
			  /** 调用header.html需要的js */
			  seajs.use('page/_header.js');
		});
	    $("#footer_div").load("_footer.html",function () {
	        seajs.use('page/_footer.js');
	    });
		magicController.showOrderList(".order-table > tbody","1");
	});
});