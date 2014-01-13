define(function(require, exports, module) {
	var $ = require("jquery"),
		me = null;

	var SportSummaryView = function(nodeId) {
		this.el = $(nodeId);
		me = this;
	};

	//渲染
	SportSummaryView.prototype.render = function(data) {
		var tpl = me.el.find("[data-tpl-name='summary']").html();
		me._populate.apply(me, [data, tpl]);
	};
	//渲染 今日数据
	SportSummaryView.prototype.flotChartRender = function(nodeId, mdata) {
		var canvasSupported = document.createElement("canvas").getContext;
		if (!canvasSupported) {
			seajs.use("excanvas");
		};
		seajs.use("flot", function() {
			seajs.use("flot.pie", function() {

				if(!mdata){
					throw new Error("数据为空！");
				};
				var todayCaloryPercent = (mdata.todayCalorie/mdata.goalCalorie*100).toFixed(2);
				var chartData = [{
					label: '今日完成目标',
					data: [todayCaloryPercent],
					color: '#99c83d'
				}, {
					data: [100 - todayCaloryPercent],
					color: '#ddd'
				}];
				$.plot(nodeId, chartData, {
					series: {
						pie: {
							innerRadius: 0.8,
							show: true
						}
					},
					legend: {
						show: true,
						position: "nw",
						labelFormatter: function(label, series) {
							return "<div style='font-size:8pt; text-align:center; padding:2px;'>" + label + "<br/>" + "<strong>" + Math.round(series.percent) + "%" + "</strong></div>";
						},
						backgroundOpacity: 0
					}
				});
			});
		});
	};

	// 对模板渲染数据的封装
	SportSummaryView.prototype._populate = function(data, tpl) {
		// console.log("render-data start---", data);
		var template = Handlebars.compile(tpl);
		// this.dialogTemplate = Handlebars.compile(dialogTpl);
		var html = template(data);
		me.el.html(html);
	}
	module.exports = SportSummaryView;

});