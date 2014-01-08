define(function(require, exports, module) {
	var $ = require('jquery');
	seajs.use('lib/jquery.cookie');
	seajs.use("lib/md5");
	var md5 = function(s){
		if(!hex_md5){
			return s;
		}else{
			return hex_md5(s);
		}
	};
	exports.hex_md5 = md5;
});
