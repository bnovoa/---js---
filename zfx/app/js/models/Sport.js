define(function(require, module, exports) {
	var dateParser = new(require("../utils/DateParser"))();
	var Sport = {
		ret: 0,
		msg: null,
		erroCode:null,
		time: 0,
		sleepHours: 0,
		steps: 0,
		distance: 0,
		calorie: 0,
		init: function(data) {
			if (!data) throw new Error("data为空！");
			if (data.ret < 0) {
				this.ret = data.ret;
				this.msg = data.msg;
			}else{
				this.time = this._dataHelper.time(data);
				this.sleepHours = data.sleepHours;
				this.steps = data.steps;
				this.distance = data.distance;
				this.calorie = data.calorie;
			}
			return this;
		},
		_dataHelper: {
			time: function(data) {
				return dateParser.parseToYMD(data.time);
			}
		}
	}

	module.exports = Sport;
});