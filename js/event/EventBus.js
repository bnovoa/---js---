define(function(require, exports, module) {
	
	var $ = require('jquery');

	/**
	 * 全局事件处理器
	 */
	var EventBus = {
		bind : function (event, fn){
			$(this).bind(event, fn);
		},
		trigger : function (event){
			$(this).trigger(event);
		},
		unbind : function(event, fn){
			if (fn === null){
				$(this).unbind(event);
			}else{
				$(this).unbind(eventType, fn);
			}
		},
		/** 先解绑再绑定 */
		clearBind : function (event, fn){
			this.unbind(event, null);
			this.bind(event, fn);
		}
	};

	module.exports = EventBus;
	
});
