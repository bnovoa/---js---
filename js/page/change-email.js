define(function(require) {

	var $ = require('jquery');
	var MagicController = require('MagicController');
	var magicController = new MagicController();
	var magicConfig = require('../MagicConfig');
	var url = magicConfig.magicBase;
	var isSubAble = false;
	$(function() {
		$("#header_div").load("_header.html", function() {
			seajs.use('page/_header.js');
		});
		$("#footer_div").load("_footer.html", function() {
			seajs.use('page/_footer.js');
		});
		magicController.refreshVlidCode(".captcha-img");
		$(".change-captcha").click(function() {
			magicController.refreshVlidCode(".captcha-img");
		});
		$(".horizontal-label").on("submit",function(event) {
			event.preventDefault();
			$('input.required').blur();
			if (!isSubAble) {
				return false;
			}
			var email = $("[name='email']").val();
			var captchaCode = $("[name='captcha']").val();
			magicController.changeEmail(email, captchaCode);
		});

		$('input.required').blur(function() {
			var $parent = $(this).parent();
			switch (this.name) {
				case 'email':
					var me = this;
					var email = this.value;
					if (email == '') {
						warningHint("邮箱不能为空！", this);
					} else if (!(email.search(/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/) != -1)) {
						warningHint("邮箱格式不正确！", this);
					} else {
						$.post(url + '/h/v2/user/isRegister', {
							account: email
						}, function(data) {
							if (data.ret == -1 && data["code"] == 999) {
								warningHint("该邮箱是已被使用！", me);
								return false;
							}else if(data.ret<0){
								warningHint(data.msg, me);
								return false;
							}
							clearHint(me);
						}, "json");
					}
					break;
				case 'captcha':
					if (this.value == '') {
						warningHint("请输入验证码！", this);
					} else {
						clearHint(this);
					}
					break;
			}
		});
	});

	function warningHint(msg, nodeId) {
		var hintMessage = '<span class="alert alert-danger">' + msg + '</span>';
		var parentNode = $(nodeId).parent();
		parentNode.find('.alert-danger').remove();
		$(hintMessage).show().appendTo(parentNode);
		isSubAble = false;
	}

	function clearHint(nodeId) {
		$(nodeId).parent().find('.alert-danger').remove();
		isSubAble = true;
	}

});