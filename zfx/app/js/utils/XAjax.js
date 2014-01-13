define(function(require, exports, module) {
	
	var Logger = require('../util/Log');
	var logger = new Logger();
	var $ = require('jquery');
	
	/**
	 * cross domain ajax with jsonp
	 * @param _url
	 * @param _settings like $.ajax
	 */
	var xaj = function (_url, _settings){
		var DERAULT_SETTINGS = 
		{
				type: 'GET',
				url: _url ,
				data:{} ,
				dataType: "jsonp",
				contentType: "application/json",
				jsonp : "jsonp",
				//jsonpCallback : "suc",
				success: function(json) {
					logger.log(json);
				},
				error: function(e){
					logger.log(e);
				}
		};
		var settings = $.extend(DERAULT_SETTINGS, _settings);
		$.ajax(settings);
	}

	module.exports = xaj;
	
});
