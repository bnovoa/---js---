define(function(require) {

	var $ = require('jquery');
	var MagicController = require('MagicController');
	var magicController = new MagicController();
	var UrlParams = require('util/UrlParams');
	var urlParams = new UrlParams();
	$(function() {
		var token = urlParams.getUrlParams("token");
		var uuid = urlParams.getUrlParams("uuid");
		
		$("#header_div").load("_header.html", function() {
			  seajs.use('page/_header.js');
		});
    $("#footer_div").load("_footer.html",function () {
        seajs.use('page/_footer.js');
    });
		
		magicController.checkUrl(".reserve_con", uuid,function(){
			$("input[name='reset_psw']").live("click",function() {
				var input_psw = $("input[name='psw_text']");
				var psw = input_psw.val();
				if (psw.length < 8) {
					magicController.showAlertDialog("请输入8~12位的密码！");
					return false;
				};
				magicController.restPassWord(".reserve_con", token, psw);
			});
		});
	});
});