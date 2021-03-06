define(function(require) {

	var $ = require('jquery');
	var MagicController = require('MagicController');
	var magicController = new MagicController();
	var isSubAble = false;

	$(function() {
		$("#header_div").load("_header.html", function() {
			  seajs.use('page/_header.js');
		});
	    $("#footer_div").load("_footer.html",function () {
	        seajs.use('page/_footer.js');
	    });

	    $(".horizontal-label").on("submit",function(event){
	    	event.preventDefault();
	    	$('input.required').blur();
	    	if(!isSubAble){
	    		return false;
	    	}
	    	var form = $(".horizontal-label");
	    	var password = $('input[name="password"]').val();
	    	var new_password = $('input[name="change_password"]').val();
	    	magicController.changePassword(password,new_password);
	    });

	    $('input.required').blur(function() {
	    	//this.form 
	    	
			var $parent = $(this).parent();
			switch(this.name) {
				case 'password':
					if(this.value == '') {
						warningHint("密码不能为空！",this);
					} else {
						clearHint(this);
					}
				break;
				case 'change_password':
					if(this.value == '') {
						warningHint("密码不能为空！",this);
					}else if (!($(this).val().search(/^[0-9a-zA-Z]+$/) != -1)) {
						warningHint("密码应为数字和字母！",this);
					}else if ($(this).val().length < 8) {
						warningHint("密码太短！请输入8~12位。",this);
					}else if($(this).val().length > 12){
						warningHint("密码过长！请输入8~12位。",this);
					} else {
						clearHint(this);
					}
				break;
				case 'confirm':
					if(this.value != $("[name = 'change_password']").val()) {
						warningHint("两次输入密码不相同！",this);
					} else {
						clearHint(this);
					}
				break;
			}
		});	
	});
	function warningHint(msg,nodeId){
		var hintMessage = '<span class="alert alert-danger">'+msg+'</span>';
		var parentNode = $(nodeId).parent();
			parentNode.find('.alert-danger').remove();
			$(hintMessage).show().appendTo(parentNode);
			isSubAble = false;
	}
	function clearHint(nodeId){
		$(nodeId).parent().find('.alert-danger').remove();
		isSubAble = true;
	}

});