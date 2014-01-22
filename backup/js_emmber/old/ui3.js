$(function(){
	var heightTimer = null;
	
	//获取半透明层的高度
	heightTimer=setInterval(function(){
		$('.ceng').css('height',$('.outer').height());
		$('.ceng2').css('height',$('.outer').height());
		$('.ceng3').css('height',$('.outer').height());
		$('.picshow_item_body img').each(function(i){
			if(parseInt($('.picshow_item_body img').eq(i).width()) > 600){
				$('.picshow_item_body img').eq(i).css('width',600);
			}
		});	
	}, 1000);	
	
	
	//关注弹框关闭
	$('#attentDelete').click(function(){
		$('#attentionDiv').hide();
		$('#followRight').html('<iframe src="http://open.qzone.qq.com/like?url=http%3A%2F%2Fuser.qzone.qq.com%2F2202411115&type=button_num&width=400&height=30&style=2" allowtransparency="true" scrolling="no" border="0" frameborder="0" style="height:30px;border:none;overflow:hidden;"></iframe>');
	});
	
	//任务列表效果
	$('#chengzhang_btn').mouseover(function(){
	     $(this).attr('class','chengzhang_hover');
	})
	$('#chengzhang_btn').mouseout(function(){
	     $(this).attr('class','chengzhang_btn');
	})
	$('#chengzhang_btn').mousedown(function(){
	     $(this).attr('class','chengzhang_click');
	})
	$('#chengzhang_btn').css('cursor','pointer');
	
	$('#chengzhang_btn').click(function(){	
		$('#chengzhang_btn').mouseover(function(){
		     $(this).attr('class','chengzhang_click');
		})
		$('#chengzhang_btn').mouseout(function(){
		     $(this).attr('class','chengzhang_click');
		})
		$('#chengzhang_btn').mousedown(function(){
		     $(this).attr('class','chengzhang_click');
		})
		
		$(this).css('cursor','default');
		$(this).attr('class','chengzhang_click');
		$('.task_list').show('fast');
	});
	
	$('.task_delete').click(function(){
		$('#chengzhang_btn').mouseover(function(){
		     $(this).attr('class','chengzhang_hover');
		})
		$('#chengzhang_btn').mouseout(function(){
		     $(this).attr('class','chengzhang_btn');
		})
		$('#chengzhang_btn').mousedown(function(){
		     $(this).attr('class','chengzhang_click');
		})
		$('.task_list').hide('fast',function(){
			$('#chengzhang_btn').attr('class','chengzhang_btn');
			$('#chengzhang_btn').css('cursor','pointer');
		});
	});	
	
	//图片树按钮
	$('#tree_btn').mouseover(function(){
	     $(this).attr('class','tree_btn_hover');
	})
	$('#tree_btn').mouseout(function(){
	     $(this).attr('class','tree_btn');
	})
	$('#tree_btn').mousedown(function(){
	     $(this).attr('class','tree_btn_click');
	})
	$('#tree_btn').click(function(){
		fusion2.canvas.getClientRect({
			onSuccess: function (rect){
				$('.tree').css('top',rect.top+150);
			}
		});
		$('.ceng').show();
		$('.tree').show();
		treePic.send();
	});
	
	//图片树关闭
	$('.delete').click(function(){
		$('.ceng').hide();
		$('.tree').hide();		 
	});
	
	//弹出框关闭
	function sureHide(){
		$('.sure_box').hide();
		$('.ceng3').hide();
	}
	$('.sure span').bind('click',sureHide);	
	$('.sure_box var').bind('click',sureHide);
	
	//图片树分享
	$("#tree_share").click(function(){
		$(".ceng").hide();
		$(".tree").hide();
		
		var newBI=new BI();
		newBI.getBiKey();	
	});
	
	//邀请好友
	$("#Invitefriend").click(function(){
		fusion2.dialog.invite({
		  // 可选，微博平台不可使用该参数。邀请理由，最长不超过35个字符。若不传则默认在弹框中显示"这个应用不错哦，跟我一起玩吧！"
		   msg  :"这里有好图",

		  // 可选，微博平台不可使用该参数。
		  // 邀请配图的URL，用于在邀请feeds中展示。注意：QQ空间邀请的QQtips中的图片是应用的图片或用户头像，不是这里传入的图片。
		  // 图片尺寸最大不超过120*120 px。若不传则默认在弹框中显示应用的icon
		  // hosting应用要求将图片存放在APP域名下或腾讯CDN
		  // non-hosting应用要求将图片上传到该应用开发者QQ号对应的QQ空间加密相册中。 
		  // 即non-hosting应用图片域名必须为：qq.com、pengyou.com、qzoneapp.com、qqopenapp.com、tqapp.cn。
		  img :"http://app100631618.qzone.qzoneapp.com/images/logo_100.png",

		 // 可选。应用自定义参数，邀请好友成功后，被邀请方通过邀请链接进入应用时会携带该参数并透传给应用，用于识别用户来源。
		 // 例如在多区多服应用中，用户进入大区后，根据该自定义参数可以获取邀请方所在的服务器，从而进行给邀请方送礼或其他操作。
		 // 这里的参数会被URL编码，需要注意编码后的长度不允许超过900个字符   
		  source :"domain=s4.app12345.qqopenapp.com",

		  // 可选。透传参数，用于onSuccess回调时传入的参数，用于识别请求
		  context :"invite",

		  // 可选。用户操作后的回调方法。
		  onSuccess : function (opt){
			   var invite_bi=new BI();
			   invite_bi.invite(opt.invitees);
		  },
		  
		  // 可选。用户取消操作后的回调方法。
		  onCancel : function () {  },

		  // 可选。对话框关闭时的回调方法。
		  onClose : function () {   }

		});
		/*fusion2.dialog.invite({
			msg:"来和我一起在胡莱战国的世界里，种田，养马，征战四方！",
			img:"",
			context :"invite",
			onSuccess : function (opt) {  
				//alert("邀请成功" + opt.context); 
				//thisMovie("game").inviteFriendSuccess();
			},
			onCancel : function () { 
				//alert("邀请取消"); 
			},
			onClose : function () {  
				//alert("邀请关闭"); 
			}
		});*/
	})
});

