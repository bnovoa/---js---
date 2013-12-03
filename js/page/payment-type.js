/**
 * 支付-订单详情展示
 */
define(function(require) {
	var $ = require('jquery');
	var UrlParams = require('util/UrlParams');
	var urlParams = new UrlParams();
	var MagicController = require('MagicController');
	var magicController = new MagicController();
	$(function(){
		$("#header_div").load("header.html", function() {
			  /** 调用header.html需要的js */
			  seajs.use('page/header.js');
		});
	    $("#footer_div").load("footer.html",function () {
	        seajs.use('page/footer.js');
	    });
		var orderId = urlParams.getUrlParams("orderId");
		magicController.showPaymentOrderContent("#orderDetail",orderId,function(data){
			$(".Pay_Confirm").on("click",function(){
				// var bankId = getBankId();
				var bankId = "TENPAY";
				var userId = data.user.id;
				var orderId = data.order.id;
				console.log("userId:"+userId+"-------------orderId:"+orderId);
				magicController.gotoPay(userId,orderId,bankId);
			});
		});


	});
});