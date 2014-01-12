define(function(require, exports, module) {
	var DataModel = (require("../models/data-model")),
	DataView = require("../views/data-view"),
	Events = require("../utils/events");

	var DataController = function() {console.log("controller-start...");};
	
	DataController.prototype.initData = function(nodeId) {
		var dataView = new DataView(nodeId);
		var dataModel = new DataModel;
		//fech the remote data then render 
		dataModel.setData().then(dataView.render);
		Events.bind("info",function(event,data){
			alert(data);
		});

	};
	module.exports = DataController;
});