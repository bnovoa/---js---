define(function(require, exports, module) {
	var User = new (require("../models/user"))(),
	UserView = require("../views/user/user-view");

	var UserController = function() {console.log("controller-start...");};
	
	UserController.prototype.initUser = function(nodeId) {
		var userView = new UserView(nodeId);
		User.fetchRemote().then(userView.render);
	};
	module.exports = UserController;
});