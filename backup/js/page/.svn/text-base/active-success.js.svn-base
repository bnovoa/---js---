define(function(require) {
	var $ = require('jquery');
	var UrlParams = require('util/UrlParams');
	var urlParams = new UrlParams();
	var REGISTER = 1,
		ACTIVE = 0;
	$(function() {

		$("#header_div").load("_header.html", function() {
			seajs.use('page/_header.js');
		});
		$("#footer_div").load("_footer.html", function() {
			seajs.use('page/_footer.js');
		});
		var activeTag = urlParams.getUrlParams("activeTag");
		var successInfo = $("#success-con");
		if (activeTag == REGISTER) {
			successInfo.html("恭喜您！乐跑帐号注册成功。");
		}
		if (activeTag == ACTIVE) {
			successInfo.html("邮箱激活成功！");
		};
	});
});