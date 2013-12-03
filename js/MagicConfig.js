define(function(require, exports, module) {
	//TODO configuration should be filtered by profile setting.
	var magicConfig = {
		cmsBase: "http://games.hoolai.com/cms",
		// magicBase : "http://192.168.1.206:8181/order",
		magicBase: "http://192.168.50.159:8080/lepao-order-web",
//		 magicBase: "http://www.lepao.com", //声明：不要把自己本地的URL提交到svn
		//FIXME 现在验证码 分属别的服务器
		//			captchaBase:"http://192.168.50.160:8080/portal"
		//			captchaBase:"http://192.168.1.206:8181/order"
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