/**
 A data model representing a user on app

 @class UserStore
 @namespace app
 @module 
 **/
define(function(require,exports,module){
	/*user 数据*/
	var $ = require("jquery");	
	var User = require("models/User");
	var UserStore = function(attr){
		console.log("model-start...");
		this.records = attr||{};
	}
	
	UserStore.prototype.fetchRemote = function(){
	//利用 promise模式简化回调
		console.log("fetchRemote-start...");
		return $.ajax("http://192.168.50.159:8080/lepao-order-web/h/v2/user/myAccount",{dataType:"json"}).then(function(data){
			return User.init(data);
		});
	};
	
	UserStore.prototype.destroy = function(){
		//清除user信息
	};
	UserStore.prototype.login = function(params){
		// $.post("login",{"userName":params.userName,"psw":params.password},success);
	};
	module.exports = UserStore;
});