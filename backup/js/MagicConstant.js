define(function(require, exports, module) {
	// TODO configuration should be filtered by profile setting.
	var magicConstant = {
		weiboAuthor:{
			url:"https://api.weibo.com/oauth2/authorize",
			clientId:"652563806",
			redirectUri:"www.lepao.com",
			scope:"all"
		},
		targetUrl : {
			cart : "cart.html",
			userBuyInfo : "userbuyinfo.html",
			orderDetail : "order-details.html",
			preOrder : "pre-order.html",
			myOrder : "my-order.html",
			paymentType : "payment-type.html",
			success : "success.html",
			paymentHint : "payment-hint.html",
			productDetail : "product_details.html",
			RestPsw : "js/view/RestPswTpl.html",
			indexPage : "index.html",
			personalPage : "user-center.html"
		}
	};
	module.exports = magicConstant;

});