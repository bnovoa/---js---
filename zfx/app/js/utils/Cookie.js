define(function(require, exports, module) {
	var $ = require('jquery');
	seajs.use('lib/jquery.cookie');
	/**
	 设置cookie使用的方法是：$.cookie('cookie name', 'cookie value', {expires: 过期时间});
	*/
	var setCookie = function(name, value, day){
		seajs.use('lib/jquery.cookie',function(){
		var exp = new Date(); 
		var Days = day?day:1/12;
		var time = exp.getTime() + Days * 24 * 60 * 60 * 1000
		$.cookie(name,value, {expires:time});
		});
	};
//	var getCookie = function(name){
//			if($.cookie(name)){
//				return $.cookie(name);
//			}else{
//				return null;
//			}
//		
//	};
	var getCookie = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';'); // 把cookie分割成组
		for ( var i = 0; i < ca.length; i++) {
			var c = ca[i]; // 取得字符串
			while (c.charAt(0) == ' ') { // 判断一下字符串有没有前导空格
				c = c.substring(1, c.length); // 有的话，从第二位开始取
			}
			if (c.indexOf(nameEQ) == 0) { // 如果含有我们要的name
				return unescape(c.substring(nameEQ.length, c.length)); // 解码并截取我们要值
			}
		}
		return null;
	};
	var removeCookie = function(name){
		seajs.use('lib/jquery.cookie',function(){
			$.removeCookie(name);
		});
	};

	/*
	var getCookie = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';'); // 把cookie分割成组
		for ( var i = 0; i < ca.length; i++) {
			var c = ca[i]; // 取得字符串
			while (c.charAt(0) == ' ') { // 判断一下字符串有没有前导空格
				c = c.substring(1, c.length); // 有的话，从第二位开始取
			}
			if (c.indexOf(nameEQ) == 0) { // 如果含有我们要的name
				return unescape(c.substring(nameEQ.length, c.length)); // 解码并截取我们要值
			}
		}
		return false;
	};
	
	var setCookie = function(name, value, seconds) {
		
		
		seconds = seconds || 7200; // seconds有值就直接赋值，没有为0，这个根php不一样。
		var expires = "";
		if (seconds != 0) { // 设置cookie生存时间
			var date = new Date();
			date.setTime(date.getTime() + (365*24*60*60 * 1000));
			expires = "; expires=" + date.toDateString();
		}
		document.cookie = name + "=" + value + expires + "; path=/;domain="; // 转码并赋值
	};
*/	
	exports.getCookie = getCookie;
	exports.setCookie = setCookie;
	exports.removeCookie = removeCookie;
	
});