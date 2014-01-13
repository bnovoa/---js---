define(function(require, exports, module) {
	module.exports = DateParser;
	function DateParser() {
		
	};

	//转换成年月日
	DateParser.prototype.parseToYMD = function(time) {
		var date = new Date(time);
		return this.getYear(date).toString().substring(2) + "-" + this.getMonth(date) + "-" + this.getDate(date);
	};
	//转换成年月日
	DateParser.prototype.parseToYMDCN = function(time) {
		var date = new Date(time);
		return this.getYear(date).toString() + "年" + this.getMonth(date) + "月" + this.getDate(date)+"日";
	};
	//转成时分
	DateParser.prototype.parseToHM = function(time) {
		var date = new Date(time);
		return this.getHour(date) + ":" + this.getMin(date) ;
	};

	//年
	DateParser.prototype.getYear = function(date) {
		return date.getFullYear();
	};

	//月
	DateParser.prototype.getMonth = function(date) {
		var month = date.getMonth() + 1;
		if (month >= 0 && month < 10) {
			month = "0" + month;
		}
		return month;
	};

	//日
	DateParser.prototype.getDate = function(date) {
		var day = date.getDate();
		if (day >= 0 && day < 10) {
			day = "0" + day;
		}
		return day;
	};
	//时
	DateParser.prototype.getHour = function(date) {
		var hour = date.getHours();
		if (hour >= 0 && hour < 10) {
			hour = "0" + hour;
		}
		return hour;
	};
	//分
	DateParser.prototype.getMin = function(date) {
		var minute = date.getMinutes();
		if (minute >= 0 && minute < 10) {
			minute = "0" + minute;
		}
		return minute;
	};
	//秒
	DateParser.prototype.getSec = function(date) {
		var second = date.getSeconds();
		if (second >= 0 && second < 10) {
			second = "0" + second;
		}
		return second;
	};
});