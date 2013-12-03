
/*个人信息*/
define(function(require, exports, module){
	var $ = require('jquery');
	var Handlebars = require('handlebars');
	var EventBus = require('../event/EventBus');
	module.exports = UserInfo;
	
	function UserInfo(){
		this.userInfoTpl = require('./UserInfo.html');
	}

	/**
	 * 个人信息 
	 * @param data
	 */
	
	UserInfo.prototype.showUserInfo = function(nodeId,data){
		var htmlStr = null;
		var me = this;
		var statusTemplate = Handlebars.compile(this.userInfoTpl)
		htmlStr = statusTemplate(data);
		$(nodeId).html(htmlStr); 
	};
});