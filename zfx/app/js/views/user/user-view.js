define(function(require, exports, module) {
	/*app 用户信息展示*/
	var Handlebars = require("handlebars"),
		$ = require("jquery"),
		Events = require("../../utils/events");
		me = null;
	var UserView = function(el) {
		console.log("view start...");
		this.el = $(el);
		//处理 点击事件
		this.el.on("click","a.btn",this._handleClick);
		me = this;
	}

	//渲染
	UserView.prototype.render = function(data) {
		console.log("render...",data);
		var tpl = me.el.find("[data-tpl-name]").html();
		me._populate(data, tpl);
	};

	//处理点击事件
	UserView.prototype._handleClick = function(event) {
		event.preventDefault()
		alert("这是点击事件----前往个人主页！");
		//把自定义事件通知到外面
		Events.trigger("info","通知事件的消息！");
	};

	// 对模板渲染数据的封装
	UserView.prototype._populate = function(data, tpl) {
		// console.log("render-data start---", data);
		var template = Handlebars.compile(tpl);
		// this.dialogTemplate = Handlebars.compile(dialogTpl);
		var html = template(data);
		me.el.html(html);
	}
	module.exports = UserView;
});