define(function(require) {

	var $ = require('jquery');
	var magicConfig = require('../MagicConfig');

    var Days = 1/12;
	var Time = 60, t;
	var c = Time;
	var error_msg = "#error_msg";
    var error_code = 0;
	var url = magicConfig.magicBase;
	var isLogin = false;
	// FIXME: add onclicked event handler for nodes.
	var $signPanel = $("#nologin");
	var $loginoutBtn = $("#loginout"); 
	var $signinBtn = $("#signin");
	var $signupBtn = $("#signup");
	$(function() {
		 resetForm();
		 //TODO 获取account，passwd值
		var account = getCookie("account");
		var passwd = getCookie("token");
		 if(account != null && passwd != null){
			 $.post(url+'/h/v2/user/login',{account:account, passwd:passwd},function(data){
			  if(data.ret == 1){
			  	islogin = true;
				  $signPanel.hide();
				  $loginoutBtn.show();
				  $('#account_name').text(account);
			  }
			 },"json");
		 }
		validLoginAccount('#account');
		validPhone('#telephone_account');
		validEmail('#email_account');
		validPasswd('#passwd_00', '#passwd_01');
		validPasswd('#passwd_10', '#passwd_11');
		validPasswd('#passwd_20', '#passwd_21');
		validPasswd('#passwd_conf_10', '#passwd_conf_11');
		validPasswd('#passwd_conf_20', '#passwd_conf_21');
		validPasswdConf('#passwd_11', '#passwd_conf_11');
        validPasswdConf('#passwd_21', '#passwd_conf_21');
		validCode('#tel_code');
		resetForm();
		/*
		*/
		$("#login").on("click", function() {
			showLoginWin();
		});
	    $("#register").on("click", function() {
	    	showRegisterWin();
		});
		$("#login1").on("click", function() {
			showLoginWin();
		});
	    $("#register1").on("click", function() {
			showRegisterWin();
		});
		$(".close").on("click", function() {
		    closeWin();
		});
		$("#show-email").on("click", function() {
			showEmail();
		});
		$("#show-phone").on("click", function() {
			showPhone();
		});
		$("#show-email1").on("click", function() {
			showEmail();
		});
		$("#show-phone1").on("click", function() {
			showPhone();
		});
		$(".register-btn").on("click", function() {
			register_submit();
		});
		$(".login-btn").on("click", function() {
			login_submit();
		});
		$(".submit_code").on("click", function() {
			sendMsg();
		});
		$("#loginout").on("click", function() {
			console.log("logout");
			loginout();
		});
		$(".order").on("click",function(){
			if(islogin == true ){
				location.href = "my-order.html";
			}else{
				alert("你还没有登录，不能查看我的订单！");
			}
		});
	});
		
	function clearErrorMsg(curr_code){
	   if(error_code == curr_code){
		 error_code = 0;
		 $(error_msg).html("");
	   }
    }

	function showErrorMsg(code){
	   var msg="";
	   switch(code){
			case -1: //
			  msg="手机号码位数错误";
			  break;
			case -2:
			  msg="邮箱格式错误";
			  break;
			case -3:
			  msg="验证码格式错误";
			  break;
			 case -4:
			  msg="密码只能由数字或字母组成"
			  break;
			 case -5:
			  msg="密码长度8~12位";
			  break;
			 case -6:
			  msg="两次输入密码不一致";
			  break;
			 case -7:
			  msg="请同意并遵守互爱用户协议和隐私政策";
			  break;
			 case -8:
			  msg="手机号已注册";
			  break;
			 case -9:
			  msg="邮箱已注册";
			  break;
	   }
	   $(error_msg).html(msg);
	}
	
	
	function loginout()
	{
		$.post(url+'/h/v2/user/logout',function(data){
				if(data.ret == 1){
				   delCookie("account");
				   delCookie("token");
				   delCookie("sessionId");
				   delCookie("JSESSIONID");
				   location.reload();
				}else{
					alert(data.msg);
				}
			 },"json");
	}

	function resetForm() {
	  $("form").each(function() {   
	  this.reset();   
	  });  
	}
		
	/**
	 * register
	 * @param reg_type 1:phone, 2:email
	 */
	function register_submit(){
	  
	   if(error_code != 0){
		 return;
	   }
		  
	   if(!$("#agree").attr("checked")){
		  error_code=-7;
		  showErrorMsg(error_code);
		  error_code=0;
		  return ; 
	   }
	   
	   if ($('#email').css('display') == 'block'){
		   $.ajax({
                cache: false,
                type: "post",
                url: url+"/h/v2/user/register",
                data:$('#email').serialize(),// formid
				success:function(obj){
					var data = eval('('+obj+')');
					var ret = data.ret;
					if(ret == 1){
					   setCookie("account",$('#email_account').val());
		               setCookie("token", $('#passwd_11').val());
					   closeWin();
					   resetForm();
					   alert("已发送验证邮件至您注册邮箱"+$('#email_account').val()+"，请前往邮箱点击邮件内链接完成注册。");
					}else{
						alert(data.msg);
					}			
				}
	       });
	   }else{
		   $.ajax({
                cache: false,
                type: "post",
                url: url+"/h/v2/user/register",
                data:$('#phone').serialize(),// 你的formid
				success:function(obj){
					var data = eval('('+obj+')');
					var ret = data.ret;
					if(ret == 1){
					   setCookie("account",$('#telephone_account').val());
		               setCookie("token", $('#passwd_21').val());
					   location.reload();
					}else{
						alert(obj);
					}			
				}
	       });
	   }
	}
	
	function login_submit(){
		
		if($("#autoLogin").attr("checked")){
			Days=14;
	    }
		$.ajax({
                cache: false,
                type: "post",
                url: url+"/h/v2/user/login",
                data:$('#loginForm').serialize(),// 你的formid
				success:function(obj){
					var data = eval('('+obj+')');
					var ret = data.ret;
					if(ret == 1){
					   setCookie("account",$('#account').val());
		               setCookie("token", $('#passwd_01').val());
					   location.reload();
					}else{
						console.log(data);
						alert(data.msg);
					}			
				}
	     });
	}
	//FIXME: add onclicked event handler for nodes.
	
	function setCookie(name,value) {//两个参数，一个是cookie的名子，一个是值
		//var Days = 30; // 此 cookie 将被保存 30 天
		var exp = new Date(); // new Date("December 31, 9998");
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires="
				+ exp.toGMTString();
	}

	function getCookie(name) {// 取cookies函数
		var arr = document.cookie.match(new RegExp("(^| )" + name
				+ "=([^;]*)(;|$)"));
		if (arr != null)
			return (arr[2]);
		return null;

	}
	
	function delCookie(name) {// 删除cookie
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = getCookie(name);
		if (cval != null)
			document.cookie = name + "=" + cval + ";expires="
					+ exp.toGMTString();
	}

	function showRegisterWin() {
		$('#bg').css('display',"block");
		$('#registerblock').css('display',"block");
		$('#loginblock').css('display',"none");
		$(document).off("keyup.login");
		
	}

	function showLoginWin() {
	    $('#bg').css('display',"block");
		$('#registerblock').hide();
		$('#loginblock').show();
		$(document).off("keyup.login");
		$(document).on("keyup.login",function(e){
			if(e.which == '13') {
				login_submit();
			}
		});
	}

	function closeWin(){
	    $('#bg').css('display',"none");
		$('#registerblock').css('display',"none");
		$('#loginblock').css('display',"none");
		$(document).off("keyup.login");
	}

	function showEmail(){
		 error_msg="#error_msg1";
		 $('#error_msg').hide();
		 $('#error_msg1').show();
	     $("#email input[name=reg_type]:eq(0)").attr("checked",true);
		 $("#phone").css("display","none");
		 $("#email").css("display","block");
		 $("#email input[type=radio][name=reg_type].eq(1)").removeAttr("checked");
	}
	
	function showPhone(){
		 error_msg="#error_msg";
		 $('#error_msg1').hide();
		 $('#error_msg').show();
		 $("#phone input[type=radio][name=reg_type]:eq(1)").attr("checked",true);
		 $("#email").css("display","none");
		 $("#phone").css("display","block");
		 $("#phone input[type=radio][name=reg_type]eq(0)").removeAttr("checked");
	}

	function validPasswd(passwd00, passwd01) {
	 $(passwd00).focus(function () {
			$(this).hide();
			$(passwd01).show();
			$(passwd01).focus();
			return;
	 })
	  $(passwd01).blur(function () {
		if ($(this).val() == '') {
			$(this).hide();
			$(passwd00).show();
			return;
		}
		if (!($(this).val().search(/^[0-9a-zA-Z]+$/)!= -1)){
		  //$(this).focus();
		  error_code=-4;
		  showErrorMsg(error_code);
		  return;   
		}
		clearErrorMsg(-4);
		
		if($(this).val().length<8 || $(this).val().length>12){
		  //$(this).focus();
		  error_code=-5;
		  showErrorMsg(error_code);
		  return;   
		}
		clearErrorMsg(-5);
	 })
	}
	
	function validLoginAccount(account) {
	 $(account).focus(function () {
		if ($(this).val() == '请输入注册邮箱/手机号码') {
			this.style.color = '#000';
			this.value = '';
			return;
		}
	 })
	  $(account).blur(function () {
		if ($(this).val() == '') {
			this.style.color = '#ccc';
			this.value = '请输入注册邮箱/手机号码';
			return;
		}
	 })
	}
	
	function validPasswdConf(passwd, passwd_conf) {
	 $(passwd_conf).blur(function () {
		if ($(this).val() != $(passwd).val()) {  
			error_code = -6;
			showErrorMsg(error_code)
			return;
		} 
		//alert("22222222222222");
		clearErrorMsg(-6);           
	 })
	}
	
	
	
	function validPhone(phone) {
	 $(phone).focus(function () { 
		 if ($(this).val() == '输入11位手机号码') {
			this.style.color = '#000';
			this.value = '';
			return;
		}
	 })
	
	 $(phone).blur(function () { 
		if ($(this).val() == '') {
			this.style.color = '#ccc';
			this.value = '输入11位手机号码';
			return;
		}
	
		if (!(this.value.search(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/)!= -1)){
		  //this.focus();
		  error_code = -1;
		  showErrorMsg(error_code);
		  return;   
		}
		clearErrorMsg(-1);
		

	    $.post(url+'/h/v2/user/isRegister', {account : $('#telephone_account').val()}, function(data) {
			var data = eval('('+data+')');																						 
			if (data.ret != 1){
				error_code = -8;
				showErrorMsg(-8);
				return;
			}
			clearErrorMsg(-8);
		});		
	 })
	}

	function validEmail(email) {
	 $(email).focus(function () { 
		 if ($(this).val() == '将向该邮箱发送确认邮件') {
			this.style.color = '#000';
			this.value = '';
			return;
		}
	 })
	
	 $(email).blur(function () { 
		 if ($(this).val() == '') {
			this.style.color = '#ccc';
			this.value = '将向该邮箱发送确认邮件';
			return;
		}
	
		if (!(this.value.search(/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/)!= -1)){
		  //this.focus();
		  error_code = -2;
		  showErrorMsg(error_code);
		  return ;   
		}
		clearErrorMsg(-2);
		
	    $.post(url+'/h/v2/user/isRegister', {account : $('#email_account').val()}, function(data) {
			var data = eval('('+data+')');																						 
			if (data.ret != 1){
				error_code = -9;
				showErrorMsg(-9);
				return;
			}
			clearErrorMsg(-9);
		});
	 })
	}

	function validCode(code) {
	 $(code).focus(function () { 
		 if ($(this).val() == '60秒重新获取') {
			this.style.color = '#000';
			this.value = '';
			return;
		}
	 })
	
	 $(code).blur(function () { 
		 if ($(this).val() == '') {
			this.style.color = '#ccc';
			this.value = '60秒重新获取';
			return;
		}
	
		if (!(this.value.search(/^([0-9]{6})$/)!= -1)){
		  error_code = -3;
		  showErrorMsg(error_code);
		  return ;   
		}
		clearErrorMsg(-3);
	 })
	}

	function sendMsg() {
		if(error_code != 0){
		 return;
	   }

		$('#fsyzm').attr('disabled',1);
		timedCount();
	
		$.post(url+'/h/v2/user/sendTelCode', {telephone_account : $('#telephone_account').val()}, function(data) {
			var data = eval('('+data+')');																						 
			if (data.ret != 1){
				alert(data.msg);
			}
		});
	}

	function timedCount() {
		$('#fsyzm').css('color','#ccc');
		$('#fsyzm').val("请稍等(" + c + ")");
		c = c-1;
		t = setTimeout(function(){
			timedCount();
		}, 1000);
		if (c < 0) {
			c = Time;
			stopCount();
			$('#fsyzm').css('color','#000');
		    $('#fsyzm').val("获取验证码");
			$('#fsyzm').removeAttr('disabled');
		}
	}

	function stopCount() {
		clearTimeout(t);
	}
});
