define(function(require, exports, module) {
	var userStore = new (require("../models/user-store"))(),
	UserView = require("../views/user/user-view"),
	Events = require("../utils/EventBus");

	var UserController = function() {};
	
	UserController.prototype.initUser = function(nodeId) {
		var userView = new UserView(nodeId);
		//fech the remote data then render 
		userStore.fetchRemote().then(userView.render);
		$(nodeId).hover(function() {
		    $(this).find('.sub-list').toggle();
		});
		Events.bind("info",function(event,data){
			alert(data);
		});

	};
	module.exports = UserController;
});