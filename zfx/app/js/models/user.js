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
		errorTag: null,
		msg: null,
		userName: "",
		avatar: "",
		init: function(data) {
			// console.log(data);
			if (!data) {
				throw new Error("data为空！")
			};
			if (data.ret < 0) {
				this.ret = data.ret;
				this.msg = data.msg;
				this.errorTag = 1;
			} else {
				if(!data.user){
					throw new Error("data为空！")
				}
				if(data.user.nickname != ""){
					this.userName = data.user.nickname;
				}else{
					this.userName = data.user.email;
				}
				this.avatar = data.user.portrait;
			}
			return this;
		}
	}
	module.exports = User;
});