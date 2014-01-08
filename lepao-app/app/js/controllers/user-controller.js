define(function(require, exports, module) {
	var User = new (require("../model/user.js"))();
	module.exports = UserController;
	var UserController = function() {
		this.init = function() {
			this.showUser();
		}
	};
	UserController.prototype.showUser = function() {
		
	};
});