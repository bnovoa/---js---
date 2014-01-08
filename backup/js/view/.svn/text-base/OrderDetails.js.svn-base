
/*订单详情*/
define(function(require, exports, module){
	var $ = require('jquery');
	var Handlebars = require('handlebars');
	var EventBus = require('../event/EventBus');
	var nodeId = null;
	module.exports = OrderRow;
	
	function OrderRow(statusNodeId,contentNodeId,logisticsNodeId){
		this.nodeId = {
			statusNodeId : statusNodeId,
			contentNodeId : contentNodeId,
			logisticsNodeId : logisticsNodeId
		};
		this.tpls = {
			status : require('./OrderDetails.status.html'),
			content : require('./OrderDetails.content.html'),
			logistics : require('./OrderDetails.logistics.html')
		};
		
	}

	/**
	 * 订单状态
	 * @param data
	 */
	
	OrderRow.prototype.showOrderStatus = function(data){
		
		var htmlStr = null;
		var me = this;
		var statusTemplate = Handlebars.compile(this.tpls.status)
		htmlStr = statusTemplate(data);
		$(this.nodeId.statusNodeId).html(htmlStr); 
	};

	/**
	 * 订单物流信息
	 * @param data
	 */
	
	OrderRow.prototype.showOrderLogistics = function(data){
		var htmlStr = null;
		var me = this;
		var logisticsTemplate = Handlebars.compile(this.tpls.logistics)
		htmlStr = logisticsTemplate(data);
		$(this.nodeId.logisticsNodeId).html(htmlStr); 
	};	
	
	/**
	 * 订单详情
	 * @param data
	 */
	
	OrderRow.prototype.showOrderContent = function(data){
		var htmlStr = null;
		var contentTemplate = Handlebars.compile(this.tpls.content)
		htmlStr = contentTemplate(data);
		$(this.nodeId.contentNodeId).html(htmlStr); 
	};
	
});