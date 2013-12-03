define(function(require, exports, module){
	var $ = require('jquery');
	var orderRowTpl = require('./OrderRow.html');
	var Handlebars = require('handlebars');
	var EventBus = require('../event/EventBus');
	var nodeId = "";
	module.exports = OrderRow;
	
	function OrderRow(nodeId){
		this.nodeId = nodeId;
		this.orderRowTemplate = Handlebars.compile(orderRowTpl);
	}

	/**
	 * 订单列表
	 * @param nodeId
	 * @param data
	 */
	
	OrderRow.prototype.showOrderRow = function(data){
		var htmlStr = null;
		var me = this;
		console.log(data);
		htmlStr = this.orderRowTemplate({
			data : data
		});

		$(this.nodeId).html(htmlStr); 
	};
	
	OrderRow.prototype.bindPager = function(pager){
		$(this.nodeId).parent().parent().find(".pagination").html(pager.getHtml());
		pager.bindEvents();
	};
	
});