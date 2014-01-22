function DomOperate(){}//dom操作对象
DomOperate.prototype={
    attribute:function(obj){
        $("#userName").html(obj.user.name);
        $(".user_img img").attr('src',obj.user.portrait);
        $("#honor").html("称号："+obj.user.title);
        $("#user_exp").html(obj.user.exp2NextLevel);
        $("#user_maxCount").html(obj.user.maxCount);
        $("#user_id").html(obj.user.id);
        
        if(obj.user.isFirstLogin == true){
        	if(attr.isFans == false){
        		$('#attentionDiv').show();
        	}
        }
    		
    },
    taskload:function(str){
    	var task_count = $('.task_list table tr').length;
    	$('.task_list table').html('');
		for(var i=0;i<task_count;i++){
			var task_desc = str.missions.missionList[i].desc;
			var task_exp = str.missions.missionList[i].exp;
			var task_status = str.missions.missionList[i].status;
			if(task_status == 'finished'){
				task_status = '<a href="#" class="taskReward">点击领取</a>';
			}else if(task_status == 'ongoing'){
				task_status = '<var>未达成</var>';
			}else if(task_status == 'rewarded'){
				task_status = '<span>已领取</span>';
			}
			$('.task_list table').append('<tr><td width="160"><p>'+task_desc+'</p></td><td width="60">成长值+<em>'+task_exp+'</em></td><td class="task_status">'+task_status+'</td></tr>');
		}
		$('#user_exp').html(attr.exp);
		
		//点击领取按钮
		$('.taskReward').click(function(){
			var taskId = $(this).parent().parent().index()+1;
			var taskFinisheds = new Task();
			taskFinisheds.taskcompletesend(taskId);
		});
    },
    taskFinished:function(missionExp,taskId){
		fusion2.canvas.getClientRect({	
			onSuccess: function (rect){
				$('.sure_box').css('top',rect.top+150);
			}
		});
    	$('.ceng3').show();
		$('.sure_box').show();
    	$('.sure_box p').html('获得'+missionExp+'点成长值');   	
    	$('.sure_box var').bind('click',fun_chengzhang);
    	$('.sure_box span').bind('click',fun_chengzhang);
    	
    	function fun_chengzhang(){
    		$('.ceng3').hide();
    		$('.sure_box').hide();
    		$('.task_status').eq(taskId-1).html('<span>已领取</span>');
        	attr.exp-=missionExp;
        	
        	if(attr.exp>0){
        		$('#user_exp').html(attr.exp);
            	$('#tree_nextLV_num').html(attr.exp);	
        	}else{
        		attr.send();
        		treePic.send();
        	}
        	$('.sure_box var').unbind();
        	$('.sure_box span').unbind();
    	}   	
    },
    img_showFavoriteCounter:function(obj){
    	var favoriteCounterMapList = obj.favoriteCounterMap;
    	for(var i=0;i<favoriteCounterMapList.length;i++){
    		var temp=$(".picshow_item").eq(i).attr('value');
    		var templike_num=obj.favoriteCounterMap["i"+temp].allLike;
    		var tempunlike_num=obj.favoriteCounterMap["i"+temp].allUnLike;
    		var tempFavorite_num=obj.favoriteCounterMap["i"+temp].allFavorite+obj.favoriteCounterMap["i"+temp].favorite;
    		/*
    		 //判断某图片是否已经被评价过
    		if(obj.favoriteCounterMap["i"+temp].likeShow=='true'){
    			$("#like"+temp).show();
    		}
    		if(obj.favoriteCounterMap["i"+temp].unlikeShow=='true'){
    			$("#unlike"+temp).show();
    		}*/
    		$("#like"+temp).html(templike_num);
    		$("#unlike"+temp).html(tempunlike_num);
    		$("#favorite"+temp).html(tempFavorite_num);
    	}
    },
    hotDirectorycomplete:function(obj){
    	var hotDirectory_str='<div class="rtrt_title"></div>';
    	for(var i=0;i<obj.categoryList.length;i++){
    		hotDirectory_str+='<div class="category_item" value="'+obj.categoryList[i].id+'"><img src="'+obj.categoryList[i].thumbnail+'" width="80" alt="'+obj.categoryList[i].name+'" title="'+obj.categoryList[i].desc+'"/><br/><span id="hotDec_name'+(i+1)+'" value="'+obj.categoryList[i].pageview+'">'+obj.categoryList[i].name+'</span></div>';
    	}
    	$("#category").html(hotDirectory_str);
    	$("#category .category_item").click(function(){
    		himg.send($(this).attr('value'));
    	})
    },
    getPageviewcomplete:function(obj){
    	$("#pageAllview").html(obj.pageview);
    },
    shoucangjia1:function(id,str){
    	var task_count = $('.task_list table tr').length;
		$('.task_list table').html('');
		for(var i=0;i<task_count;i++){
			var task_desc = str.missions.missionList[i].desc;
			var task_exp = str.missions.missionList[i].exp;
			var task_status = str.missions.missionList[i].status;
			if(task_status == 'finished'){
				task_status = '<a href="#" class="taskReward">点击领取</a>';
			}else if(task_status == 'ongoing'){
				task_status = '<var>未达成</var>';
			}else if(task_status == 'rewarded'){
				task_status = '<span>已领取</span>';
			}
			$('.task_list table').append('<tr><td width="160"><p>'+task_desc+'</p></td><td width="60">成长 +<em>'+task_exp+'</em></td><td class="task_status">'+task_status+'</td></tr>');
		}
		
		$('.taskReward').click(function(){
			var taskId = $(this).parent().parent().index()+1;
			var taskFinished = new Task();
			taskFinished.taskcompletesend(taskId);
		});
    	
    	$("#favorite"+id).html(str.allFavorite+'人收藏');
    },
    hotImagecomplete:function(shareStatus, categoryList, imageMapList){
    	//console.log(obj);
    	var categoryTitle = [];  
    	var hotImgBox = '';
    	var hotImghtml = '';
    	var hotImgSrc = '';
    	var categoryTitleHtml = '';
    	var yesterdayHtml = '';
    	var thisCurr = 0;
    	var nowStatus = false;
    	
    	
		function contains(a, obj) {
		    for (var i = 0; i < a.length; i++) {
		        if (a[i] == obj) {
		            return true;
		        }
		    }
		    return false;
		}
		
		//显示分类名
		for(var i=0;i<categoryList.length;i++){
			if(categoryList[i].display == 0){
				categoryTitle.push(categoryList[i].name);
			}		
		}
		
		var maxCateLength = categoryList.length+1;
		for(var i=0;i<maxCateLength;i++){			
			if(i == 0){//昨日新推
				categoryTitleHtml += '<li class="cate_item" index="'+i+'"><a href="javascript:;" id="yesterdayImages">回看前日<img src="images/hz.png"/></a></li>';
				hotImgBox += ' <div class="picshow_box" id="yesterdayPic"></div>';				
			}else if(i == 1){//今日新推
				categoryTitleHtml += '<li class="cate_item" index="'+i+'"><a href="javascript:;" class="active">'+categoryTitle[i-1]+'</a></li>';
				hotImgBox += ' <div id="picshow_box" class="picshow_box" style="display:block"></div>';
			}else{//其他分类
				categoryTitleHtml += '<li class="cate_item" index="'+i+'"><a href="javascript:;">'+categoryTitle[i-1]+'</a></li>';
				hotImgBox += ' <div class="picshow_box"></div>';
			}			
		}
		$('#categoryList').html(categoryTitleHtml);
		$('.picshow_content').html(hotImgBox);
		
		for(var j=0;j<categoryList.length;j++){
			var mapId = 'i'+j;
			hotImghtml = '<h1 class="content_title">'+categoryTitle[j]+'</h1>'
			for(var i=0;i<imageMapList[mapId].length;i++){
				thisCurr++;
				//热图Dom结构
		    	
				if(i<10){
		    		hotImgSrc = 'images/'+(i+1)+'.gif';
		    	}else{
		    	    hotImgSrc = 'images/tehui.gif';
		    	}
					
				hotImghtml+=
	    		'<div class="picshow_item" value="'+imageMapList[mapId][i].id+'">'+
    				'<div class="picshow_item_top">'+
    					'<div class="ps_top_left"></div>'+
    					'<div class="ps_top_mid"><img src="'+hotImgSrc+'"/></div>'+
    					'<div class="ps_top_right">'+
    						'<p>'+imageMapList[mapId][i].title+'</p><br/>'+
    					'</div>'+
    				'</div>'+
	    			'<div class="picshow_item_body">'+
	    				'<img src="'+imageMapList[mapId][i].fullPath+'" />'+
	    			'</div>'+
	    			'<div class="comment">'+
	    				'<p class="neihan_btn" style="margin-left:190px;">'+
	    					'<a style="cursor:pointer;" galleryId="'+imageMapList[mapId][i].galleryId+'" valuestr1="'+imageMapList[mapId][i].likeDesc1+'" valuestr2="'+imageMapList[mapId][i].likeDesc2+'" valuesrc="'+imageMapList[mapId][i].fullPath+'" value="'+imageMapList[mapId][i].id+'" storagePath="'+imageMapList[mapId][i].storagePath+'" class="nh_btn"></a>'+
	    					'<span id="like'+imageMapList[mapId][i].id+'" style="display:none;">123</span>'+
	    				'</p>'+
	    				'<p class="lengdan_btn">'+
	    					'<a style="cursor:pointer;" class="ld_btn" galleryId="'+imageMapList[mapId][i].galleryId+'" valuestr1="'+imageMapList[mapId][i].unlikeDesc1+'" valuestr2="'+imageMapList[mapId][i].unlikeDesc2+'" valuesrc="'+imageMapList[mapId][i].fullPath+'" value="'+imageMapList[mapId][i].id+'" storagePath="'+imageMapList[mapId][i].storagePath+'"></a>'+
	    					'<span id="unlike'+imageMapList[mapId][i].id+'" style="display:none;">1</span>'+
	    				'</p>'+
	    				'<p class="shoucang_p" style="margin-left:50px;">'+					
	    					'<a class="sc_btn" storagePath="'+imageMapList[mapId][i].storagePath+'" galleryId="'+imageMapList[mapId][i].galleryId+'" value="'+imageMapList[mapId][i].id+'" fullpath="'+imageMapList[mapId][i].fullPath+'" index="'+thisCurr+'"></a>'+
	    					'<span id="favorite'+imageMapList[mapId][i].id+'"style="color:#7D7B7C" ></span>'+
	    				'</p>'+
	    				'<var class="collect_success">收藏成功</var>'+
    				'</div>'+
    			'</div>';
				
				
	        	var new_img=new Image();	
	        	new_img.src=imageMapList[mapId][i].fullPath;
	    		new_img.onload=function(){
	    			fusion2.canvas.setHeight({
	    			  // 可选。表示要调整的高度，不指定或指定为0则默认取当前窗口的实际高度。
	    			  //height : 700
	    			});
	    		};
	    		new_img.onerror=function(){
	    			fusion2.canvas.setHeight({
	    			  // 可选。表示要调整的高度，不指定或指定为0则默认取当前窗口的实际高度。
	    			  //height : 700
	    			});
	    		};
	    		
			}
			$('.picshow_box').eq(j+1).html(hotImghtml);			
			hotImghtml='';
			

		}
		
		//最后一张图片的操作	  	
		if(shareStatus == 'notShared'){
			$('.yc').show();
			$('.fxwc').hide();
		}else if(shareStatus == 'shared'){
			$('.yc').hide();
			$('.fxwc').show();
		}else{
			$('.yc').hide();
			$('.fxwc').hide();
			
			var lastImageLoad = new Hotimage();
			lastImageLoad.showLastSend(thisCurr); 
		}
    
		//点击切换分类显示
		$('.cate_item').click(function(){
			$('.cate_item a').removeClass('active');			
			$(this).find('a').addClass('active');
			$('.picshow_box').hide();
			$('#mrxtBottom').hide();
			if($(this).attr('index') == 0){
				var vipTemp = '';
				if(attr.isVip == true){
					var LoadYesterday = new Hotimage();
					LoadYesterday.getYesterdaySend(shareStatus);		
				}else{	
					var wUrl = '\'http://pay.qq.com/qzone/index.shtml?aid=game100631618.op\'';
					vipTemp = '<div class="notVip"><p>只有黄钻用户可以使用回看前日功能哟<br/><br/><a href="javascript:;" onclick="javascript:window.open('+wUrl+')"><img src="images/kthz.png"/></a></p></div>';
										
				}
				$('.picshow_box').eq(0).html(vipTemp);
				fusion2.canvas.setHeight({});
				
			}else if($(this).attr('index') == 1){
				$('#mrxtBottom').show();
				if(shareStatus == 'showed' || nowStatus == true){
					$('#picshow_bottom_content .picshow_box').show();
					fusion2.canvas.setHeight({});
				}
				fusion2.canvas.setHeight({});
			}		
			$('.picshow_box').eq($(this).attr('index')).show();		
			
			fusion2.canvas.setHeight({});
		});
				
		$('.fxwc img').click(function(){
			nowStatus = true;
			$('.yc').hide();
			$('.fxwc').hide();
			
			var lastImageLoad = new Hotimage();
			lastImageLoad.showLastSend(thisCurr); 
		});
    	
		//收藏初始化
		for(var i=0;i<$('.picshow_item').length;i++){
			if(contains(treeImgIds,$('.picshow_item').eq(i).attr('value'))){  			
    			$('.shoucang_p a').eq(i).css('background','url(../images/ysc.gif) 0 0 no-repeat').unbind();
    			$('.shoucang_p a').eq(i).css('cursor','default');
    		}else{
    			$('.shoucang_p a').eq(i).bind('click',collectOperate);
    			$('.shoucang_p a').eq(i).css('cursor','pointer');			
    		}
		}
			
    	function collectOperate(){
    		var $this = $(this);
    		var thisIndex = $(this).attr('index')-1;		
    		var imgId = $(this).attr('value');
    		var galleryId=$(this).attr('galleryId');
    		var storagePath = $(this).attr('storagePath');
    		
	   		if(treeImgIds.length >= attr.maxCount){
    			$('.sure_box p').html('图片树已满，请<a href="javascript:;" id="alter_tree" style="font-size:14px;">整理图片树</a>或提升权限。');
    			fusion2.canvas.getClientRect({
    				onSuccess: function(rect){
    					$('.sure_box').css('top',rect.top+290);
    				}
    			});
    			$('.ceng3').show();
    			$('.sure_box').show();
    			
    			//整理图片树按钮操作
    			$('#alter_tree').click(function(){
    				$('.ceng3').hide();
        			$('.sure_box').hide();
    				treePic.send();
    				
        			fusion2.canvas.getClientRect({
        				onSuccess: function (rect){
        					$('.tree').css('top',rect.top+150);
        				}
        			});   				
        			$('.ceng').show();
        			$('.tree').show();
    			});
    		}else{
        		//收藏成功效果
        		$('.collect_success').eq(thisIndex).show().animate({top:0,opacity:0.1},'slow',function(){
        			$(this).hide();
        			$(this).css({'top':20,'opacity':1});
        			//$this.append('<img src="images/refuse.png"  class="refuse"/>');
        			$this.css('background','url(../images/ysc.gif) 0 0 no-repeat');
        			$this.css('cursor','default');  
        		});
        		
        		treeImgIds.push(imgId);
        		treePic.favorites_send(imgId,galleryId,storagePath);      		
        		$this.unbind();
    		}
		
    	}
    	
    	//内涵
    	$('.neihan_btn a').click(function(){
    		var storagePath = $(this).attr('storagePath');
    		//if($(this).next().css('display')=='none'){
    		   var like1=$(this).attr('valuestr1');
     		   var like2=$(this).attr('valuestr2');
     		   var src=$(this).attr('valuesrc');
    		   var tempid=$(this).attr('value');
    		   var galleryId = $(this).attr('galleryId');
    		   var new_comment=new CommentPic();
    		   new_comment.getCom(tempid,'like',like1,like2,src,storagePath,galleryId);
    		//}
    	});
    	
    	//冷淡
    	$('.lengdan_btn a').click(function(){
    		//if($(this).next().css('display')=='none'){
    		   var unlike1=$(this).attr('valuestr1');
    		   var unlike2=$(this).attr('valuestr2');
    		   var unsrc=$(this).attr('valuesrc');
    		   var tempid=$(this).attr('value');
    		   var storagePath = $(this).attr('storagePath');
    		   var galleryId = $(this).attr('galleryId');
    		   var new_comment=new CommentPic();
    		   new_comment.getCom(tempid,'unlike',unlike1,unlike2,unsrc,storagePath,galleryId);
    		//}
    	});
    	fusion2.canvas.setHeight({});
    },
    getcommentcomplete:function(obj,id,type,str1,str2,src,storagePath){
    	$("#"+(type+id)).show();
    	if(type=='like'){
    		$("#"+(type+id)).html("有"+obj.allLike+"人追随你");
    	}else{
    		$("#"+(type+id)).html("有"+obj.allUnlike+"人追随你");	
    	}
    	objfusion.shareapp(str1,str2,src,obj.sendKey,id,type,storagePath);
    },
    showLastImageComplete:function(obj,thisCurr){ 
		function contains(a, obj) {
		    for (var i = 0; i < a.length; i++) {
		        if (a[i] == obj) {
		            return true;
		        }
		    }
		    return false;
		}
    	
    	
    	var lastImageObject = obj.lastImage;   	
    	$('#picshow_bottom_content .content_title').remove();
    	$('#picshow_bottom_content .picshow_item').attr('value',lastImageObject.id);
    	$('#picshow_bottom_content .ps_top_right p').html(lastImageObject.title);
    	$('#picshow_bottom_content .neihan_btn .nh_btn').attr('valuestr1',lastImageObject.likeDesc1);
    	$('#picshow_bottom_content .neihan_btn .nh_btn').attr('valuestr2',lastImageObject.likeDesc2);
    	$('#picshow_bottom_content .neihan_btn .nh_btn').attr('valuesrc',lastImageObject.fullPath);
    	$('#picshow_bottom_content .neihan_btn .nh_btn').attr('galleryId',lastImageObject.galleryId);
    	$('#picshow_bottom_content .neihan_btn .nh_btn').attr('value',lastImageObject.id);
    	$('#picshow_bottom_content .neihan_btn .nh_btn').attr('storagePath',lastImageObject.storagePath);
    	$('#picshow_bottom_content .neihan_btn span').attr('id','like'+lastImageObject.id);
    	$('#picshow_bottom_content .lengdan_btn .ld_btn').attr('valuestr1',lastImageObject.unlikeDesc1);
    	$('#picshow_bottom_content .lengdan_btn .ld_btn').attr('valuestr2',lastImageObject.unlikeDesc2);
    	$('#picshow_bottom_content .lengdan_btn .ld_btn').attr('valuesrc',lastImageObject.fullPath);
    	$('#picshow_bottom_content .lengdan_btn .ld_btn').attr('galleryId',lastImageObject.galleryId);
    	$('#picshow_bottom_content .lengdan_btn .ld_btn').attr('value',lastImageObject.id);
    	$('#picshow_bottom_content .lengdan_btn .ld_btn').attr('storagePath',lastImageObject.storagePath);
    	$('#picshow_bottom_content .lengdan_btn span').attr('id','unlike'+lastImageObject.id);
    	$('#picshow_bottom_content .shoucang_p .sc_btn').attr('value',lastImageObject.id);
    	$('#picshow_bottom_content .shoucang_p .sc_btn').attr('fullpath',lastImageObject.fullPath);
    	$('#picshow_bottom_content .shoucang_p .sc_btn').attr('galleryId',lastImageObject.galleryId);
    	$('#picshow_bottom_content .shoucang_p .sc_btn').attr('storagePath',lastImageObject.storagePath);
    	$('#picshow_bottom_content .shoucang_p .sc_btn').attr('index',thisCurr+1);
    	$('#picshow_bottom_content .shoucang_p span').attr('id','favorite'+lastImageObject.id);   	
    	
    	var new_img=new Image();	
    	new_img.src=lastImageObject.fullPath;
		new_img.onload=function(){
			$('#picshow_bottom_content .picshow_item_body img').attr('src',lastImageObject.fullPath);
			setTimeout(function(){
				fusion2.canvas.setHeight({
					  // 可选。表示要调整的高度，不指定或指定为0则默认取当前窗口的实际高度。
					  //height : 700
				});
			}, 1000);
			
		};
		new_img.onerror=function(){
			fusion2.canvas.setHeight({
			  // 可选。表示要调整的高度，不指定或指定为0则默认取当前窗口的实际高度。
			  //height : 700
			});
		};
		
		//收藏初始化
		if(contains(treeImgIds,$('#picshow_bottom_content .picshow_item').eq(0).attr('value'))){  			
    		$('#picshow_bottom_content .shoucang_p a').eq(0).css('background','url(../images/ysc.gif) 0 0 no-repeat').unbind();
    		$('#picshow_bottom_content .shoucang_p a').eq(0).css('cursor','default');
    	}else{
    		$('#picshow_bottom_content .shoucang_p a').eq(0).bind('click',collectOperate);
    		$('#picshow_bottom_content .shoucang_p a').eq(0).css('cursor','pointer');			
    	}
			
    	function collectOperate(){
    		var $this = $(this);
    		var thisIndex = $(this).attr('index')-1;		
    		var imgId = $(this).attr('value');
    		var galleryId=$(this).attr('galleryId');
    		var storagePath = $(this).attr('storagePath');
    		
	   		if(treeImgIds.length >= attr.maxCount){
    			$('.sure_box p').html('图片树已满，请<a href="javascript:;" id="alter_tree" style="font-size:14px;">整理图片树</a>或提升权限。');
    			fusion2.canvas.getClientRect({
    				onSuccess: function(rect){
    					$('.sure_box').css('top',rect.top+290);
    				}
    			});
    			$('.ceng3').show();
    			$('.sure_box').show();
    			
    			//整理图片树按钮操作
    			$('#alter_tree').click(function(){
    				$('.ceng3').hide();
        			$('.sure_box').hide();
    				treePic.send();
    				
        			fusion2.canvas.getClientRect({
        				onSuccess: function (rect){
        					$('.tree').css('top',rect.top+150);
        				}
        			});   				
        			$('.ceng').show();
        			$('.tree').show();
    			});
    		}else{
        		//收藏成功效果
        		$('#picshow_bottom_content .collect_success').eq(thisIndex).show().animate({top:0,opacity:0.1},'slow',function(){
        			$(this).hide();
        			$(this).css({'top':20,'opacity':1});
        			//$this.append('<img src="images/refuse.png"  class="refuse"/>');
        			$this.css('background','url(../images/ysc.gif) 0 0 no-repeat');
        			$this.css('cursor','default');  
        		});
        		
        		treeImgIds.push(imgId);
        		treePic.favorites_send(imgId,galleryId,storagePath);      		
        		$this.unbind();
    		}
		
    	}
    	
    	
    	$('#picshow_bottom_content .picshow_box').show();
    	fusion2.canvas.setHeight({});
    },
    showYesterdayImageComplete:function(obj){
    	//console.log(obj);
    	var thisCurr = 0;
    	var hotImgSrc = '';
    	var yesterdayHtml = '<h1 class="content_title">回看前日</h1>';   	
    	var imageList = obj.imageList;   	
    	
		function contains(a, obj) {
		    for (var i = 0; i < a.length; i++) {
		        if (a[i] == obj) {
		            return true;
		        }
		    }
		    return false;
		}
    	
    	for(var i=0;i<imageList.length;i++){
    		thisCurr++;
    		
			if(i<10){
	    		hotImgSrc = 'images/'+(i+1)+'.gif';
	    	}else{
	    	    hotImgSrc = 'images/tehui.gif';
	    	}
			if(i == imageList.length-1){
		   		yesterdayHtml += 
		   		'<div class="xmml"><img src="images/xmml.gif"/></div>'+
	    		'<div class="picshow_item" value="'+imageList[i].id+'">'+
					'<div class="picshow_item_top">'+
						'<div class="ps_top_left"></div>'+
						'<div class="ps_top_mid"><img src="images/tehui.gif"/></div>'+
						'<div class="ps_top_right">'+
							'<p>'+imageList[i].title+'</p><br/>'+
						'</div>'+
					'</div>'+
	    			'<div class="picshow_item_body">'+
	    				'<img src="'+imageList[i].fullPath+'" />'+
	    			'</div>'+
	    			'<div class="comment">'+
	    				'<p class="neihan_btn" style="margin-left:190px;">'+
	    					'<a style="cursor:pointer;" galleryId="'+imageList[i].galleryId+'"  valuestr1="'+imageList[i].likeDesc1+'" valuestr2="'+imageList[i].likeDesc2+'" valuesrc="'+imageList[i].fullPath+'" value="'+imageList[i].id+'" storagePath="'+imageList[i].storagePath+'" class="nh_btn"></a>'+
	    					'<span id="like'+imageList[i].id+'" style="display:none;">123</span>'+
	    				'</p>'+
	    				'<p class="lengdan_btn">'+
	    					'<a style="cursor:pointer;" galleryId="'+imageList[i].galleryId+'"  class="ld_btn" valuestr1="'+imageList[i].unlikeDesc1+'" valuestr2="'+imageList[i].unlikeDesc2+'" valuesrc="'+imageList[i].fullPath+'" value="'+imageList[i].id+'" storagePath="'+imageList[i].storagePath+'"></a>'+
	    					'<span id="unlike'+imageList[i].id+'" style="display:none;">1</span>'+
	    				'</p>'+
	    				'<p class="shoucang_p" style="margin-left:50px;">'+					
	    					'<a class="sc_btn" storagePath="'+imageList[i].storagePath+'" galleryId="'+imageList[i].galleryId+'"  value="'+imageList[i].id+'" fullpath="'+imageList[i].fullPath+'" index="'+thisCurr+'"></a>'+
	    					'<span id="favorite'+imageList[i].id+'"style="color:#7D7B7C" ></span>'+
	    				'</p>'+
	    				'<var class="collect_success">收藏成功</var>'+
					'</div>'+
				'</div>'+
				'<div class="mrqz"><img src="images/zdml.jpg"/></div>';
			}else{
		   		yesterdayHtml += 
	    			'<div class="picshow_item" value="'+imageList[i].id+'">'+
					'<div class="picshow_item_top">'+
						'<div class="ps_top_left"></div>'+
						'<div class="ps_top_mid"><img src="'+hotImgSrc+'"/></div>'+
						'<div class="ps_top_right">'+
							'<p>'+imageList[i].title+'</p><br/>'+
						'</div>'+
					'</div>'+
	    			'<div class="picshow_item_body">'+
	    				'<img src="'+imageList[i].fullPath+'" />'+
	    			'</div>'+
	    			'<div class="comment">'+
	    				'<p class="neihan_btn" style="margin-left:190px;">'+
	    					'<a style="cursor:pointer;" galleryId="'+imageList[i].galleryId+'"  valuestr1="'+imageList[i].likeDesc1+'" valuestr2="'+imageList[i].likeDesc2+'" valuesrc="'+imageList[i].fullPath+'" value="'+imageList[i].id+'" storagePath="'+imageList[i].storagePath+'" class="nh_btn"></a>'+
	    					'<span id="like'+imageList[i].id+'" style="display:none;">123</span>'+
	    				'</p>'+
	    				'<p class="lengdan_btn">'+
	    					'<a style="cursor:pointer;" galleryId="'+imageList[i].galleryId+'"  class="ld_btn" valuestr1="'+imageList[i].unlikeDesc1+'" valuestr2="'+imageList[i].unlikeDesc2+'" valuesrc="'+imageList[i].fullPath+'" value="'+imageList[i].id+'" storagePath="'+imageList[i].storagePath+'"></a>'+
	    					'<span id="unlike'+imageList[i].id+'" style="display:none;">1</span>'+
	    				'</p>'+
	    				'<p class="shoucang_p" style="margin-left:50px;">'+					
	    					'<a class="sc_btn" storagePath="'+imageList[i].storagePath+'" galleryId="'+imageList[i].galleryId+'"  value="'+imageList[i].id+'" fullpath="'+imageList[i].fullPath+'" index="'+thisCurr+'"></a>'+
	    					'<span id="favorite'+imageList[i].id+'"style="color:#7D7B7C" >10000</span><font style="color:#7D7B7C">收藏</font>'+
	    				'</p>'+
	    				'<var class="collect_success">收藏成功</var>'+
					'</div>'+
				'</div>';
			}
 
    	}
    	
    	$('#yesterdayPic').html(yesterdayHtml);	 
    	
    	
		//收藏初始化
		for(var i=0;i<$('#yesterdayPic .picshow_item').length;i++){
			if(contains(treeImgIds,$('.picshow_item').eq(i).attr('value'))){  			
    			$('#yesterdayPic .shoucang_p a').eq(i).css('background','url(../images/ysc.gif) 0 0 no-repeat').unbind();
    			$('#yesterdayPic .shoucang_p a').eq(i).css('cursor','default');
    		}else{
    			$('#yesterdayPic .shoucang_p a').eq(i).bind('click',collectOperate);
    			$('#yesterdayPic .shoucang_p a').eq(i).css('cursor','pointer');			
    		}
		}
			
    	function collectOperate(){
    		var $this = $(this);
    		var thisIndex = $(this).attr('index')-1;		
    		var imgId = $(this).attr('value');
    		var galleryId = $(this).attr('galleryId');
    		var storagePath = $(this).attr('storagePath');
    		
    		
	   		if(treeImgIds.length >= attr.maxCount){
    			$('.sure_box p').html('图片树已满，请<a href="javascript:;" id="alter_tree" style="font-size:14px;">整理图片树</a>或提升权限。');
    			fusion2.canvas.getClientRect({
    				onSuccess: function (rect){
    					$('.sure_box').css('top',rect.top+290);
    				}
    			});
    			$('.ceng3').show();
    			$('.sure_box').show();
    			
    			//整理图片树按钮操作
    			$('#alter_tree').click(function(){
    				$('.ceng3').hide();
        			$('.sure_box').hide();
    				treePic.send();
    				
        			fusion2.canvas.getClientRect({
        				onSuccess: function (rect){
        					$('.tree').css('top',rect.top+150);
        				}
        			});   				
        			$('.ceng').show();
        			$('.tree').show();
    			});
    		}else{
        		//收藏成功效果
        		$('#yesterdayPic .collect_success').eq(thisIndex).show().animate({top:0,opacity:0.1},'slow',function(){
        			$(this).hide();
        			$(this).css({'top':20,'opacity':1});
        			//$this.append('<img src="images/refuse.png"  class="refuse"/>');
        			$this.css('background','url(../images/ysc.gif) 0 0 no-repeat');
        			$this.css('cursor','default');  
        		});
        		
        		treeImgIds.push(imgId);
        		treePic.favorites_send(imgId,galleryId,storagePath);      		
        		$this.unbind();
    		}
		
    	}
    	
     	//内涵

    	$('#yesterdayPic .neihan_btn a').click(function(){
    		//alert($(this).attr('storagePath'));
    		var storagePath = $(this).attr('storagePath');
    		if($(this).next().css('display')=='none'){
    		   var like1=$(this).attr('valuestr1');
     		   var like2=$(this).attr('valuestr2');
     		   var src=$(this).attr('valuesrc');
    		   var tempid=$(this).attr('value');
    		   var galleryId = $(this).attr('galleryId');
    		   var new_comment=new CommentPic();
    		   new_comment.getCom(tempid,'like',like1,like2,src,storagePath,galleryId);
    		}
    	});
    	
    	//冷淡
    	$('#yesterdayPic .lengdan_btn a').click(function(){
    		if($(this).next().css('display')=='none'){
    		   var unlike1=$(this).attr('valuestr1');
    		   var unlike2=$(this).attr('valuestr2');
    		   var unsrc=$(this).attr('valuesrc');
    		   var tempid=$(this).attr('value');
    		   var storagePath = $(this).attr('storagePath');
    		   var galleryId = $(this).attr('galleryId');
    		   var new_comment=new CommentPic();
    		   new_comment.getCom(tempid,'unlike',unlike1,unlike2,unsrc,storagePath,galleryId);
    		}
    	});
    	fusion2.canvas.setHeight({});
    	
    },
    picTreeload:function(obj){
    	if(obj.favorites){
    		var picTreeList = obj.favorites;
    	}else{
    		var picTreeList = obj.imageList;
    	}  	

    	//图片树结构
    	var pictree_bodyhtml='<li class="collect_list_1">';
        
    	for(var i=0;i<picTreeList.length;i++){
    		pictree_bodyhtml += 
    			'<div clsss="shoucang_move">'+
    				'<span src="'+picTreeList[i].fullPath+'" value="'+picTreeList[i].id+'"><img src="'+picTreeList[i].fullPath+'" value="'+picTreeList[i].id+'"/></span>'+
    				'<var class="shu_delete"><p class="delete_cha" style="display:none;margin-top:3px; margin-left:16px;width:20px;height:19px;background:url(images/tree_delete.png) 0 0 no-repeat;"></p></var></div>';
    	}
    	
    	for(var j=picTreeList.length;j<attr.maxCount;j++){
    		pictree_bodyhtml+='<div><span src="images/shu_body_bg.png"><img class="shoucang_free" src="images/shu_body_bg.png" /></span></div>';
    	}
    	pictree_bodyhtml+='</li>'
    	$("#collectList").html(pictree_bodyhtml);
    	//alert(attr.name);
    	$("#tree_shoucangzhe").html(attr.name);
    	$("#tree_nextLV_num").html(attr.exp);
    	
		//保存位置	   	   	
    	var maxCount = $('.collect_list_1 div').length;
    	var maxWidth = parseInt($('.collect_list').width());
		$('.collect_list_1 div').each(function(i){
			$('.collect_list_1 div').eq(i).css('left',(i%4)*126+parseInt(maxCount/12)*maxWidth);	
			$('.collect_list_1 div').eq(i).css('top',parseInt(i/4)*121);				
			aPos[i]={left:(i%4)*126+parseInt(maxCount/12)*maxWidth, top:parseInt(i/4)*121};
		});		
    		
    	//图片树左右切换   		
    	var ulWidth = Math.ceil($('#collectList li div').length/12)*$('.collect_list').eq(0).width();
    	
    	
    	$('#collectList').css('width',ulWidth);
    	$('#collectList li').css('width',ulWidth);
    	
    	var iCurr = 0;
    	var maxCurr = Math.ceil($('#collectList li div').length/12);
    	
    	$('#leftBtn')[0].onclick = function(){
    		iCurr++;
    		if(iCurr == maxCurr){
    			iCurr = maxCurr-1;
    		}
    		$('#collectList').animate({left:-$('.collect_list').width()*iCurr});
    	}
    	
    	$('#rightBtn')[0].onclick = function(){
    		iCurr--;
    		if(iCurr == -1){
    			iCurr = 0;
    		}
    		$('#collectList').animate({left:-$('.collect_list').width()*iCurr});
    	}
    	
    	//删除排位
    	$('.collect_list_1 div var').bind('click',function(){
    		var imgId = $(this).parent().find('img').attr('value');
    		$(this).parent().remove();
    		treeImgIds.pop(imgId);
    		$(".collect_list_1").append('<div><span src="images/shu_body_bg.png"><img class="shoucang_free" src="images/shu_body_bg.png" /></span></div>');
    		
    		for(var j=0;j<$('.collect_list_1 div').length;j++){
				$('.collect_list_1 div').eq(j).animate({'left':aPos[j].left,'top':aPos[j].top});	
			}
    		treePic.favoritesDelete_send(imgId);  	
    	});
    				
		
		//图片滑过效果
		$('#collectList li div').bind('mouseover',function(){				
			if($(this).find('img').attr('value')){
				$(this).css('background','url(../images/tree_bian.png) 11px 8px no-repeat');
				$(this).find('img').attr('alt','点击图片放大');
				$(this).find('p').show();
			}
		});
		$('#collectList li div').bind('mouseout',function(){
			    $(this).css('background','');
			    $(this).find('p').hide();
		});
		
		//图片放大		
		$('#collectList li div img').bind('click',function(){				
			if($(this).attr('value')){
				$('.tree_show img').attr('src',$(this).attr('src'));
				fusion2.canvas.getClientRect({	
					onSuccess: function (rect){
						$('.tree_show').css('top',rect.top+150);
					}
				});
				$('.tree_show').show();
		        $('.ceng2').show();
			}			
		});			
		
		//放大图片关闭
		$('.tree_show').click(function(){
	        $('.tree_show').hide();
	        $('.ceng2').hide();
		})    			
    },
    fpicTreeload:function(obj){
    	//图片树结构
    	var pictree_bodyhtml='<li class="collect_list_1">';
        
    	for(var i=0;i<obj.imageList.length;i++){
    		pictree_bodyhtml+='<div clsss="shoucang_move"><span src="'+obj.imageList[i].fullPath+'" value="'+obj.imageList[i].id+'"><img src="'+obj.imageList[i].fullPath+'" value="'+obj.imageList[i].id+'"/></span><var class="shu_delete"><p class="delete_cha" style="display:none;margin-top:3px; margin-left:16px;width:20px;height:19px;background:url(images/tree_delete.png) 0 0 no-repeat;" /></var></div>';
    	}
    	
    	for(var j=obj.imageList.length;j<attr.maxCount;j++){
    		pictree_bodyhtml+='<div><span src="images/shu_body_bg.png"><img class="shoucang_free" src="images/shu_body_bg.png" /></span></div>';
    	}
    	pictree_bodyhtml+='</li>'
    	$("#collectList").html(pictree_bodyhtml);
    	$("#tree_shoucangzhe").html(obj.user.name);
    	$("#tree_nextLV_num").html(obj.user.exp2NextLevel);

		//保存位置	   	  	
    	var maxCount = $('.collect_list_1 div').length;
    	var maxWidth = parseInt($('.collect_list').width());
		$('.collect_list_1 div').each(function(i){
			$('.collect_list_1 div').eq(i).css('left',(i%4)*126+parseInt(maxCount/12)*maxWidth);	
			$('.collect_list_1 div').eq(i).css('top',parseInt(i/4)*121);				
			aPos[i]={left:(i%4)*126+parseInt(maxCount/12)*maxWidth, top:parseInt(i/4)*121};
		});	
		
    	//图片树左右切换		
    	var ulWidth = Math.ceil($('#collectList li div').length/12)*$('.collect_list').width();
    	
    	$('#collectList').css('width',ulWidth);
    	$('#collectList li').css('width',ulWidth);
    	
    	var iCurr = 0;
    	var maxCurr = Math.ceil($('#collectList li div').length/12);
    	$('.left_btn span').click(function(){
    		iCurr++;
    		if(iCurr == maxCurr){
    			iCurr = maxCurr-1;
    		}
    		$('#collectList').animate({left:-$('.collect_list').width()*iCurr});
    	});
    	$('.right_btn span').click(function(){
    		iCurr--;
    		if(iCurr == -1){
    			iCurr = 0;
    		}
    		$('#collectList').animate({left:-$('.collect_list').width()*iCurr});
    	});
    }
}