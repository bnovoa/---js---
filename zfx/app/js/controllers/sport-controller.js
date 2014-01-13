//我的运动数据控制器
define(function(require,exports,module) {
	var $ = require("jquery"),
		sportStore = new (require("../models/sport-store"))();

	var SportController = function(){};

	SportController.prototype.initSportChart = function(nodeId,params){
		var SportLinechartView = require("../views/sport/sport-linechart-view");
		var defaultIndex = 2;
		$(nodeId).on("click",function(event){
			switch(event.target){
				case $(params.month):
				dosomething();
				break;
			}
		});
		var type = $(nodeId).parent().find('.select-type button.active').attr("data-type");
		var dateType = $(nodeId).parent().find('.select-period button.active').attr("data-type");
		var sportLinechartView = new SportLinechartView(nodeId);
		sportStore.fetchByIndex(defaultIndex).then(function(data){
			if(!data[type]){
				$(nodeId).html(data);
			}
			sportLinechartView.flotChartRender(nodeId,data[type],dateType);
		});
	};
	SportController.prototype.initSportSummary = function(nodeId2pie,nodeId2sum){
		var sportSummaryView = new (require("../views/sport/sport-summary-view"))(nodeId2sum);
		sportStore.fetchAllData().then(function(data){
			sportSummaryView.render(data);
			sportSummaryView.flotChartRender(nodeId2pie,data);
		});
	};

	module.exports = SportController;
});