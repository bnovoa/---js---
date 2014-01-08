define(function(require, exports, module) {
	var User = new (require("../model/user"))(),
	UserView = require("../view/user-view");

	module.exports = UserController;
	
	var UserController = function() {};
	
	UserController.prototype.initUser = function(nodeId) {
		var userView = new UserView(nodeId);
		User.fetch().then(userView.render);
	};
});