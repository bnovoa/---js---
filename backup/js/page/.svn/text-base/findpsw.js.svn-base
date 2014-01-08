define(function(require) {

	var $ = require('jquery');
	var swfobject = require('swfobject');
	var MagicController = require('MagicController');
	var magicController = new MagicController();
	var ParseEmailUrl = require('../util/ParseEmailUrl.js');
	var UrlParams = require('util/UrlParams');
	var urlParams = new UrlParams();
	var magicConfig = require('../MagicConfig');
	var error_msg = "#findpsw_msg";
	var error_code = 0;

	$("#header_div").load("_header.html", function() {
		seajs.use('page/_header.js');
	});
	$("#footer_div").load("_footer.html", function() {
		seajs.use('page/_footer.js');
	});

	//var Dispatcher = require('./Dispatcher');
	$(function() {
		var url = magicConfig.magicBase;

		function clearErrorMsg(curr_code) {
			if (error_code == curr_code) {
				error_code = 0;
				$(error_msg).html("");
			}
		}

		function showErrorMsg(code) {
			var msg = "";
			switch (code) {
				case -1: //
					msg = "手机号码位数错误";
					break;
				case -2:
					msg = "邮箱格式错误";
					break;
				case -3:
					msg = "验证码格式错误";
					break;
				case -4:
					msg = "密码只能由数字或字母组成"
					break;
				case -5:
					msg = "密码长度8~12位";
					break;
				case -6:
					msg = "两次输入密码不一致";
					break;
				case -7:
					msg = "请同意并遵守互爱用户协议和隐私政策";
					break;
				case -8:
					msg = "该手机号未注册";
					break;
				case -9:
					msg = "该邮箱未注册";
					break;
			}
			$(error_msg).html(msg);
		}

		$("#buttonByEmail").click(function() {
			if (error_code != 0) {
				return;
			}

			$.ajax({
				cache: false,
				type: "post",
				url: url + '/h/v2/user/resetPasswdRequest',
				data: $('#formByEmail').serialize(), // 你的formid
				dataType: "json",
				success: function(data) {
					// var data = eval('('+obj+')');
					var ret = data.ret;
					if (ret == 1) {
						$("#findpsw_1").hide();
						var email = $('#findByEmail').val();
						var targetUrl = "http://" + ParseEmailUrl.getUrl(email);
						$("#findMsg").html("系统已发送邮件到<a href='"+targetUrl+"' style='color:#ff6511;font-weight:bold;'>" + email + "</font>，请点击邮件的链接重置你的密码");
						$("#findpsw_2").show();
					} else {
						$("#findMsg").html(data.msg);
					}
				}
			});
		})

		$(".backBtn").click(function() {
			location.href = magicConfig.targetUrl.indexPage;
		});
		$("#buttonByPhone").click(function() {
			if (error_code != 0) {
				return;
			}
			$.ajax({
				cache: false,
				type: "post",
				url: url + '/h/v2/user/resetPasswdRequest',
				dataType: "json",
				data: $('#formByPhone').serialize(), // 你的formid
				success: function(data) {
					// var data = eval('('+obj+')');
					var ret = data.ret;
					if (ret == 1) {
						$("#findpsw_1").hide();
						$("#findMsg").html("系统已发送短信到<font style='color:#ff6511;font-weight:bold;'>" + $('#findByPhone').val() + "</font>，请点击短信的链接重置你的密码");
						$("#findpsw_2").show();

					} else {
						$(error_msg).html(data.msg);
					}
				}
			});
		})

		$("#byMail").click(function() {
			clearErrorMsg(error_code);
			$('#findByEmail')[0].focus();
			$("#MailMethod").show();
			$("#PhoneMethod").hide();
		})

		$("#byPhone").click(function() {
			clearErrorMsg(error_code);
			$('#findByPhone')[0].focus();
			$("#PhoneMethod").show();
			$("#MailMethod").hide();
		})

		$('#findByEmail').focus(function() {
			if ($(this).val() == "WWW.LEPAO.COM") {
				$(this).val("");
				$(this).css('color', '#000');
			}
		}).blur(function() {
			if ($(this).val() == "") {
				$(this).val("WWW.LEPAO.COM");
				$(this).css('color', '#b2b2b2');
			}

			if (!($(this).val().search(/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/) != -1)) {
				//this.focus();
				error_code = -2;
				showErrorMsg(error_code);
				return;
			}
			clearErrorMsg(-2);

			$.post(url + '/h/v2/user/validAccount', {
				account: $('#findByEmail').val()
			}, function(data) {
				// console.log(data);
				var data = eval('(' + data + ')');
				if (data.ret != 1) {
					error_code = -9;
					$(error_msg).html(data.msg);
					return;
				}
				clearErrorMsg(-9);
			});
		})

		$('#findByPhone').focus(function() {
			if ($(this).val() == "请输入11位绑定手机(仅收取信息费)") {
				$(this).val("");
				$(this).css('color', '#000');
			}
		}).blur(function() {
			if ($(this).val() == "") {
				$(this).val("请输入11位绑定手机(仅收取信息费)");
				$(this).css('color', '#b2b2b2');
			}

			if (!($(this).val().search(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/) != -1)) {
				//this.focus();
				error_code = -1;
				showErrorMsg(error_code);
				return;
			}
			clearErrorMsg(-1);
			$.post(url + '/h/v2/user/validAccount', {
				account: $('#findByPhone').val()
			}, function(data) {

				var data = eval('(' + data + ')');
				if (data.ret != 1) {
					error_code = -8;
					showErrorMsg(-8);
					return;
				}
				clearErrorMsg(-8);
			});
		})

	});
});