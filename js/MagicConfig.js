define(function(require, exports, module) {
	//TODO configuration should be filtered by profile setting.
	var magicConfig = {
		// magicBase: "http://127.0.1/lepao-order-web",
		//FIXME 现在验证码 分属别的服务器
		targetUrl: {
			cart: "cart.html",
			userBuyInfo: "userbuyinfo.html",
			orderDetail: "order-details.html",
			preOrder:"pre-order.html",
			myOrder: "my-order.html",
			paymentType: "payment-type.html",
			success: "success.html",
			paymentHint: "payment-hint.html",
			productDetail: "product_details.html",
			RestPsw: "js/view/RestPswTpl.html",
			indexPage: "index.html",
			personalPage:"user-center.html"
		}
	};
	module.exports = magicConfig;

});