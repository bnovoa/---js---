define(function(require, exports, module) {
/**
 * JSON v1.2
 * 解决stringify 在低版本ie下面不支持情况！
 * @author damon
 */
	
	var JSON = JSON || {};

	// implement JSON.stringify serialization
	JSON.stringify = JSON.stringify || function (obj) {

		var t = typeof (obj);
		if (t != "object" || obj === null) {

			// simple data type
			if (t == "string") obj = '"'+obj+'"';
			return String(obj);

		}
		else {

			// recurse array or object
			var n, v, json = [], arr = (obj && obj.constructor == Array);

			for (n in obj) {
				v = obj[n]; t = typeof(v);

				if (t == "string") v = '"'+v+'"';
				else if (t == "object" && v !== null) v = JSON.stringify(v);

				json.push((arr ? "" : '"' + n + '":') + String(v));
			}

			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		}
	};


	// implement JSON.parse de-serialization
	JSON.parse = JSON.parse || function (str) {
		if (str === "") str = '""';
		eval("var p=" + str + ";");
		return p;
	};
	module.exports = JSON;
});
