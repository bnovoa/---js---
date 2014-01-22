


function Fusion_fun(){}
Fusion_fun.prototype={			
  shareapp:function(title_s,desc_s,img_src,sendkey,id,type,storagePath){
	if($('#pfValue').val() == 'qzone'){
		var pfUrl = "http://rc.qzone.qq.com/myhome/100631618?app_param=game_share&sendKey="+sendkey;
	}else{
		var pfUrl = "http://apps.pengyou.com/100631618?app_param=game_share&sendKey="+sendkey;
	}

	fusion2.dialog.share({
		
	  //alert(title_s+"::"+summary_s+":::"+msg_s+"::::"+img_s);
	  // 可选。分享应用的URL，点击该URL可以进入应用，必须是应用在平台内的地址。
	  url:pfUrl,

	  // 可选。默认展示在输入框里的分享理由。
	  //desc:"快来当市长吧",
	  desc:desc_s,

	  // 必须。应用简要描述。
	  summary :"有爱？卖萌？内涵？亮点？屌丝？基。。。激情？各种图！全都满足~无限想象~",

	  // 必须。分享的标题。
	  //title :"星佳城市",
	  title :title_s,

	  // 可选。图片的URL。
	  //pics :"PictureURL",
	  pics :img_src,

	  // 可选。透传参数，用于onSuccess回调时传入的参数，用于识别请求。
	  context:"share",

	  // 可选。用户操作后的回调方法。
	  onSuccess : function (opt) { 
			$('.yc').hide();
			$('.fxwc').show();
		
		   var new_bi=new BI();
		   new_bi.shareSuccess(id,type,'qzone,pengyou,tapp',storagePath);
		   task.taskstatussend(2); 
      },

	  // 可选。用户取消操作后的回调方法。
	  onCancel : function (opt) {  },

	  // 可选。对话框关闭时的回调方法。
	  onClose : function () {  }

	});
  },
  ShareFavorites:function(msg_s,url_s){
	  fusion2.dialog.tweet
	  ({
	    // 必须。默认显示在说说文字输入框中的文字内容。
	    msg:"说说今天都发生了什么...",

	    // 可选。应用自定义参数，用于进入应用时CanvasUrl中的app_custom参数的值,应用可根据该参数判断用户来源。
	    source:"adtag_tweet_share_exp",

	    // 可选。要发表带贴图的说说时，这里需要传入图片的链接。链接中请不要带中文字符
	     // 图片没有域名限制，但是图片地址的根域名必须要有一个crossdomain.xml 的flash授权文件，详见下文
	    url:"PictrueUrl",

	    // 可选。用户操作后的回调方法。
	    onSuccess : function (opt) {  },

	    // 可选。用户取消操作后的回调方法。
	    onCancel : function () {  },

	    // 可选。对话框关闭时的回调方法。
	    onClose : function () {  }

	  });
  },
  sharetree:function(sendKey){
	  //alert(sendKey);
	  fusion2.dialog.tweet
		({
		  // 必须。默认显示在说说文字输入框中的文字内容。
		  msg:"这是我的图片树，不用浇水的哦，要不要看看我都收藏了哪些图片~？",

		  // 可选。应用自定义参数，用于进入应用时CanvasUrl中的app_custom参数的值,应用可根据该参数判断用户来源。
		  source:"&friendUserId="+attr.id+"&sendKey="+sendKey,

		  // 可选。要发表带贴图的说说时，这里需要传入图片的链接。链接中请不要带中文字符
		   // 图片没有域名限制，但是图片地址的根域名必须要有一个crossdomain.xml 的flash授权文件，详见下文
		  url:"http://app100631618.qzone.qzoneapp.com/images/share_tree.jpg",

		  // 可选。用户操作后的回调方法。
		  onSuccess : function (opt) {
			   var new_bi=new BI();
			   new_bi.shareSuccess('','favoritetree','qzone,pengyou,tapp',false);
			   task.taskstatussend(2); 
		  },

		  // 可选。用户取消操作后的回调方法。
		  onCancel : function () {  },

		  // 可选。对话框关闭时的回调方法。
		  onClose : function () {  }

		});
  	}
}
