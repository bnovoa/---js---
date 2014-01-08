define(function(require, exports, module) {
	// require('./Dialog.css');
	var $ = require('jquery');
	Handlebars = require('handlebars'),
	EventBus = require('../event/EventBus'),
	dialogTpl = require('../view/Dialog.html'),
	// 或者通过 module.exports 提供整个接口
	module.exports = Dialog;

	function Dialog() {
		this.dialogTemplate = Handlebars.compile(dialogTpl);
	}
	//展示confirmDialog
	Dialog.prototype.show = function(params, isConfirm, callBack) {
		var data;
		// alert(typeof([{params:"0"}]));
		var dialogTtitle = "提示",
			negtiveText = "取消",
			positiveText = "确定",
			dialogContent = "hello";
		if (typeof(params) == "string") {
			dialogContent = params;
		} else {
			dialogTtitle = params.title ? params.title : dialogTtitle;
			negtiveText = params.negtiveText ? params.negtiveText : negtiveText;
			positiveText = params.positiveText ? params.positiveText : positiveText;
			dialogContent = params.content ? params.content : dialogContent;
		}
		if (isConfirm) {
			data = {
				"negtiveText":negtiveText,
				"positiveText":positiveText,
				"title": dialogTtitle,
				"content": dialogContent
			};
		} else {
			data = {
				"positiveText":positiveText,
				"title": dialogTtitle,
				"content": dialogContent
			};
		}
		var htmlStr = this.dialogTemplate(data);
		$("body").append(htmlStr);
		//事件绑定
		/**
		 * 处理点击事件
		 */
		var $maskLayer = $('<div class="mask_layer"></div>');
		$('#dialog').before($maskLayer).css({
			marginTop: -$("#dialog").height() / 2
		}).addClass('animation-popup').show();
		$maskLayer.fadeIn(300);
		$("#dialog").click(function(e) {
			var pannelNode = this;
			if ($(e.target).is(".negtive_btn")) {

				$(this).fadeOut(300, function() {
					$(this).remove();
				}).removeClass('animation-popup');
				$maskLayer.fadeOut(300, function() {
					$(this).remove();
				});
			} else if ($(e.target).is(".positive_btn")) {
				//通知时间到外边 处理
				callBack(e, pannelNode, $maskLayer);
			} else if ($(e.target).is(".close")) {
				$(this).fadeOut(300, function() {
					$(this).remove();
				}).removeClass('animation-popup');
				$maskLayer.fadeOut(300, function() {
					$(this).remove();
				});
			}
		});
	};
	//Toast
	//alert
});