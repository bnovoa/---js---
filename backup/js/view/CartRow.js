define(function(require, exports, module){
	var $ = require('jquery');
	var cartRowTpl = require('./CartRow.html');
	var Handlebars = require('handlebars');
	var EventBus = require('../event/EventBus');
	
	module.exports = CartRow;
	
	function CartRow(){
		this.cartRowTemplate = Handlebars.compile(cartRowTpl);
		
	}

	/**
	 * @param nodeId
	 * @param data
	 */
	
	CartRow.prototype.showCartRow = function(nodeId,data){
		var htmlStr = null;
		var me = this;
		console.log(data);
		htmlStr = this.cartRowTemplate({
			data : data
		});
//		var panel = $(nodeId);
//		if(panel){
//			panel.click(function(e){
//				//通知事件'.quantity-container', '.quantity-field', '.icon_Plus', '.icon_Minus'
//				var event = jQuery.Event(nodeId, {quantityContainer:'.quantity-container', quantityField:'.quantity-field', plusButton:'.icon_Plus', minusButton:"icon_Minus"});
//				EventBus.trigger(event);
//			});
//		}
		$(nodeId).html(htmlStr); 
	};
	
	
});