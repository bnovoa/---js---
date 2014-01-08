define(function(require) {
	var $ = require('jquery');
	var MagicController = require('MagicController');
	var magicConfig = require('MagicConfig');
	var magicController = new MagicController();
	var UrlParams = require('util/UrlParams');
	var urlParams = new UrlParams();
	var url = magicConfig.magicBase;
	var isSubAble = false;
	var psw_code = -1; 
	$(function() {
		var token = urlParams.getUrlParams("token");
		var platform = urlParams.getUrlParams("platform");
		if (!token&&!platform) {
			$("body").html("无效的链接！<a href='"+magicConfig.targetUrl.indexPage+"'>返回首页</a>");
			return false;
		};

		$("#header_div").load("_header.html", function() {
		  seajs.use('page/_header.js');
			});

		$("#footer_div").load("_footer.html",function () {
		      seajs.use('page/_footer.js');
		  });
		
		magicController.refreshVlidCode(".captcha-img");
		$(".change-captcha").click(function() {
			magicController.refreshVlidCode(".captcha-img");
		});

		var form = $(".horizontal-label");
		form.on("submit",function(event) {
			event.preventDefault();
			var inputNode = form.find('input.required');
			inputNode.blur();
			if (!isSubAble ) {
				return false;
			}
			if(!$("#agree-bind").attr("checked")){
				magicController.showAlertDialog("您必须先同意并勾选互爱户协议和隐私政策！");
				return false ;
			}

			var email = form.find("[name='email']").val(); 
			var password = form.find("[name='password']").val(); 
			var captchaCode = form.find("[name='captchaCode']").val(); 
			// magicController.showAlertDialog("等待方法中~~");
			magicController.addUserInfo({"email":email,"password":password,"captchaCode":captchaCode,"accessToken":token,"platform":platform},form);
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
				case 'password':
					if(this.value == '') {
						warningHint("密码不能为空！",this);
					}else if (!($(this).val().search(/^[0-9a-zA-Z]+$/) != -1)) {
						warningHint("密码应为数字和字母！",this);
					}else if ($(this).val().length < 8) {
						warningHint("密码太短！请输入8~12位。",this);
					}else if($(this).val().length > 12){
						warningHint("密码过长！请输入8~12位。",this);
					} else {
						psw_code = 0;
						clearHint(this);
					}
				break;
				case 'confirm':
					if(this.value != $("[name = 'password']").val()) {
						warningHint("两次输入密码不相同！",this);
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
		if(psw_code == 0){
			isSubAble = true;
		}
	}
})