define(function(require, exports, module) {
	var Logger = require('../util/Log');
	var logger = new Logger();
	var $ = require('jquery');
	var productDetailTpl = require('./ProductDetails.html');
	var tabButtonsTpl = require('./ProductDetails.TabButtons.html');
	var Handlebars = require('handlebars');
	var EventBus = require('../event/EventBus');
	
	
	module.exports = ProductDetails;
	
	function ProductDetails(data){
		this.myData = data;
		this.productDetailsTemplate = Handlebars.compile(productDetailTpl);
		this.tabButtonsTemplate = Handlebars.compile(tabButtonsTpl);
	}

	/**
	 * 展示商品的内容
	 * @param nodeId
	 * @param data
	 */
	ProductDetails.prototype.showProductDetails = function(nodeId,data){
		var htmlStr = null;
		htmlStr = this.productDetailsTemplate({
			data : data
		});
		$(nodeId).html(htmlStr); 
	};
	/**
	 * tab按钮展现
	 * @param nodeId
	 * @param data
	 */
	ProductDetails.prototype.showTabButtons = function(nodeId,data) {
		var htmlStr = null;
		htmlStr = this.tabButtonsTemplate({
			data:data
		});
	};
});

