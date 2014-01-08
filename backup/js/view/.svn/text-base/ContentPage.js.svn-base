define(function(require, exports, module) {
	var Logger = require('../util/Log');
	var logger = new Logger();
	var $ = require('jquery');
	var newsTpl = require('./ContentPage.news.html');
	var Handlebars = require('handlebars');
	var EventBus = require('../event/EventBus');
	
	var endsWith = function(str, suffix) {
	    return str.indexOf(suffix, str.length - suffix.length) !== -1;
	};
	
	module.exports = ContentPage;
	
	function ContentPage(){
		this.newsTemplate = Handlebars.compile(newsTpl);
	}
	


	/**
	 * @param nodeId
	 * @param data
	 */
	ContentPage.prototype.showContentPage = function (nodeId,data) {
		var htmlStr = null;
		htmlStr = this.newsTemplate({
			data:data
		});
		$(nodeId).html(htmlStr);
	};
	
//	SearchPage.prototype.bindEvents = function(){
//		EventBus.unbind("register",null);
//		$('#email_register').click(function(){
//			var email = $('#email').val();
//			var nickname = $('#email_nickname').val();
//			var password = $('#email_password').val();
//			var confirmPassword = $('#email_confirm_password').val();
//			if(!validateEmail(email)){
//				alert("邮箱格式不正确");
//				return false;
//			}
//			if(password != confirmPassword){
//				alert("两次输入的密码不一致！");
//				return false;
//			}
//			var gender = $("input[type='radio']:checked").val();
//			if(gender == undefined){
//				alert("请选择性别");
//				return false;
//			}
//			var event = jQuery.Event("register",{
//				password:password,
//				email:email,
//				nickname:nickname,
//				gender:gender
//			});
//			EventBus.trigger(event);
//		});
//		return this;
//	};
	
});

