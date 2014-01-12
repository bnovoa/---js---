/**
 A data model representing a user on app

 @class User
 @namespace app
 @module 
 **/
define(function(require, exports, module) {
	/*user 数据*/
	var $ = require("jquery");

	var User = {
		ret: 0,
		errorTag:null,
		msg: null,
		userName: "",
		avatar: "",
		init: function(data) {
			if (!data) {
				throw new Error("data为空！")
			};
			if (data.ret < 0){
				this.ret = data.ret;
				this.msg = data.msg;
				this.errorTag = 1;
			}else{
				this.userName = data.address.realName;
				this.avatar = data.imgUrl;
			}
			return this;
		}
	}
	module.exports = User;
});