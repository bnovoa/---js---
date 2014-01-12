define(function(require, module, exports) {
	var dateParser = new(require("../utils/DateParser"))();
	var Sport = {
		sleepData:{
			time: 0,
			sleepHours: 0,
			steps: 0,
			distance: 0,
			calorie: 0
		},
		sportData:{
			time: 0,
			sleepHours: 0,
			steps: 0,
			distance: 0,
			calorie: 0
		},
		setSleepData: function(data) {
			if (!data) throw new Error("data为空！");
			this.sleepData.time = data.time;
			this.sleepData.sleepHours=data.sleepHours;
			this.sleepData.steps=data.steps;
			this.sleepData.distance=data.distance;
			this.sleepData.calorie= data.calorie;
		},
		setSportData: function(data) {
			if (!data) throw new Error("data为空！");
			this.sportData.time = data.time;
			this.sportData.sleepHours=data.sleepHours;
			this.sportData.steps=data.steps;
			this.sportData.distance=data.distance;
			this.sportData.calorie= data.calorie;
		},
		getSportdata:function(){
			return this.sportData;
		},
		_dataHelper: {
			time: function(data) {
				return dateParser.parseToYMD(data.time);
			}
		}
	}

	module.exports = Sport;
});