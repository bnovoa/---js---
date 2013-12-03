define(function(require, exports, module) {
	var $ = require('jquery'),
		Logger = require('../util/Log'),
		Handlebars = require('handlebars');

	var tpls = {
		simple: require('./PagingView/PagingView.simplePage.html'),
		noPager: require('./PagingView/PagingView.emptyPage.html'),
		appointed: require('./PagingView/PagingView.appointedPage.html')
	};

	module.exports = PagingView;

	/**
	 * 在对象创建之后，所有数据都是只读的。
	 */
	function PagingView(nodeId, params) {
		this.nodeId = nodeId;
		this.params = $.extend({
			templateName: ""
		}, params);
		console.log("pagging tpl");
		console.log(params);
		console.log(tpls[params.templateName]);
		this.template = Handlebars.compile(tpls[params.templateName]);
	}


	PagingView.prototype.show = function(data) {
		var me = this,
			htmlStr = null;

		htmlStr = me.template({
			data: data
		});
		$(me.nodeId).html(htmlStr);
	};

});