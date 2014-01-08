define(function(require) {
	var $ = require('jquery');
	var UserInfo = require('../view/UserInfo.js');
	var MagicController = require('MagicController');
	var magicController = new MagicController();
	$(function() {
		var userInfo = new UserInfo();
		$("#header_div").load("_header.html", function() {
		  seajs.use('page/_header.js');
			});
		$("#footer_div").load("_footer.html",function () {
		      seajs.use('page/_footer.js');
		  });
		magicController.getUserInfo(function(data) {
			if (data.ret === 1) {
				if(data.user.id>0){
					data.user["id"] =parseInt(data.user.id)+10000000; 
				}
				userInfo.showUserInfo(".list-group",data)
			}else{
				$(".list-group").html(data.msg);
			};
		});
	});
})