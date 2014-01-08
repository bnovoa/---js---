
/*支付-订单详情渲染模块*/
define(function(require, exports, module){
	var $ = require('jquery');
	var Handlebars = require('handlebars');
	var EventBus = require('../event/EventBus');
	module.exports = Payment;
	
	function Payment(){
		this.orderTpl = require('./Payment.orderDetail.html');
	}

	/**
	 * 订单详情
	 * @param data
	 */
	
	Payment.prototype.showOrderContent = function(nodeId,data){
		// console.log(data);
		var htmlStr = null;
		var me = this;
		var statusTemplate = Handlebars.compile(this.orderTpl)
		htmlStr = statusTemplate(data);
		$(nodeId).html(htmlStr); 
	};
});