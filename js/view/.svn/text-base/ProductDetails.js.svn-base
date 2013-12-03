define(function(require, exports, module) {
	var Logger = require('../util/Log');
	var logger = new Logger();
	var $ = require('jquery');
	var productDetailTpl = require('./ProductDetails.html');
	var Handlebars = require('handlebars');
	var EventBus = require('../event/EventBus');
	
	
	module.exports = ProductDetails;
	
	function ProductDetails(){
		this.productDetailsTemplate = Handlebars.compile(productDetailTpl);
	}

	/**
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
});

