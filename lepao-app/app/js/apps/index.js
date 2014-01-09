define(function(require, exports, module) {
	/*app 首页展示*/
	var $ = require("jquery"),
		UserController = new (require("../controllers/user-controller.js"))();
	$(function(){
		console.log("frame-start...");
		UserController.initUser("#user-center");
	});
});