define(function(require, exports, module) {
	/*app 用户信息展示*/
	var Handlebars = require("handlebars"),
		$ = require("jquery"),
		Events = require("../../utils/EventBus"),
		tpl = require('./_login.html'),
		me = null;
		var Md5 = require('../../utils/Md5.js');

	

	var UserLoginView = function() {
		var html = html || Handlebars.compile(tpl)();
		this.el = $(html);
		
		//处理 点击事件
		this.el.find("form#sign-in-form").on("submit", this._handleClick);
		me = this;
	}

	//展示
	UserLoginView.prototype.show = function() {
		me.el.appendTo($("body"));
	};

	//关闭
	UserLoginView.prototype.close = function() {
		me.el.hide();
	};
	//shake
	UserLoginView.prototype.shake = function(msg) {
		// $(key).focus();
		var $signInPanel = me.el.find("#sign-in-panel");
		var $alert = $("#alert");
		if($alert.html()){
			$alert.remove();
		}
		$("<span id='alert'>"+msg+"</span>").appendTo($signInPanel.find("#sign-in-form"));
		$signInPanel.animate({
			marginLeft: '+=15'
		}, 38)
			.animate({
				marginLeft: '-=30'
			}, 75)
			.animate({
				marginLeft: '+=30'
			}, 75)
			.animate({
				marginLeft: '-=30'
			}, 75)
			.animate({
				marginLeft: '+=25'
			}, 62)
			.animate({
				marginLeft: '-=20'
			}, 50)
			.animate({
				marginLeft: '+=10'
			}, 25)
	};
	//处理点击事件
	UserLoginView.prototype._handleClick = function(event) {
		event.preventDefault();
		//把自定义事件通知到外面
		var isNull = false;
		me.el.find("input").each(function(index) {
			var _me = this;
			if (!$.trim($(_me).val())) isNull = true;
		});
		var params = {
			"email" :$("[name='email']").val(),
			"password" :Md5.hex_md5($("[name='password']").val())
		}
		if(!isNull){
			Events.trigger("login", params);
		}
	};

	// 清除
	UserLoginView.prototype.clear = function() {
		me.el.remove();
	}
	module.exports = UserLoginView;
});