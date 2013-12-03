define(function(require, exports, module){
	var $ = require('jquery');
	var addressTpl = require('./Address.html');
	var Handlebars = require('handlebars');
	var EventBus = require('../event/EventBus');
	
	module.exports = addressTpl;
	
	function Address(){
		this.addressTemplate = Handlebars.compile(addressTpl);
		
	}

	/**
	 * @param nodeId
	 * @param data
	 */
	
	Address.prototype.showAddress = function(nodeId,data){
		var htmlStr = null;
		var me = this;
		console.log(data);
		htmlStr = this.addressTemplate(data);
		$(nodeId).html(htmlStr); 
	};
	
	
});