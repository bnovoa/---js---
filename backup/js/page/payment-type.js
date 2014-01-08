/**
 * 支付-订单详情展示
 */
define(function(require) {
	var $ = require('jquery');
	var UrlParams = require('util/UrlParams');
	var urlParams = new UrlParams();
	var MagicController = require('MagicController');
	var magicController = new MagicController();
	$(function() {
		$("#header_div").load("_header.html", function() {
			/** 调用header.html需要的js */
			seajs.use('page/_header.js');
		});
		$("#footer_div").load("_footer.html", function() {
			seajs.use('page/_footer.js');
		});
		var orderId = urlParams.getUrlParams("orderId");
		magicController.showPaymentOrderContent("#orderDetail", orderId, function(data) {
			$("#alipayment").on("submit", function() {
				event.preventDefault();
				var bankId = getBankId();
				if(bankId == ""){
					magicController.showAlertDialog("请选择支付方式");
					return false;
				}
				var userId = data.user.id;
				var orderId = data.order.id;
				// console.log("userId:"+userId+"-------------orderId:"+orderId);
				magicController.gotoPay(userId, orderId, bankId);
			});
		});

		function getBankId(){
			var inputs = $("#alipayment input[name='bank']");
			for (var i = 0; i < inputs.length; i++){
				if(inputs[i].checked){
					return $(inputs[i].labels[0]).attr("bid")
				};
			}
			return "";
		}
	});
});