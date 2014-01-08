/**
 * 订单详情展示
 */
define(function(require) {
	var $ = require('jquery');
	var UrlParams = require('util/UrlParams');
	var urlParams = new UrlParams();
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
		var orderId = urlParams.getUrlParams("orderId");
		var proPattenNodeIds = {
			orderTable :".order-table > tbody",
			totalPrice:"#totalPrice",
			amount:"#amount"
		}
		magicController.showOrderContent("#order_status", "#order_content", "#order_logistics",proPattenNodeIds,orderId);
	});
});