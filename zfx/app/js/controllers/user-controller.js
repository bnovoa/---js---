define(function(require, exports, module) {
	var User = new (require("../models/user"))(),
	UserView = require("../views/user/user-view"),
	Events = require("../utils/events");

	var UserController = function() {console.log("controller-start...");};
	
	UserController.prototype.initUser = function(nodeId) {
		var userView = new UserView(nodeId);
		//fech the remote data then render 
		User.fetchRemote().then(userView.render);
		Events.bind("info",function(event,data){
			alert(data);
		});
	};

	
	module.exports = UserController;
});