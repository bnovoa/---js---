define(function(require, exports, module) {
	/*app 首页展示*/
	var $ = require("jquery"),
		userController = new (require("../controllers/user-controller.js"))(),
		sportController = new (require("../controllers/sport-controller.js"))();
	$(function(){
		// console.log("frame-start...");
		userController.initUser("#t-profile");
		sportController.initSportChart("#sports-trends",{"moth":"#nodeid"});
	});
});