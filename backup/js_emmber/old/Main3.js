var HeaderStr={};
(function(obj){
    var str=location.href;
    var sessionkey=str.split('sessionkey=')[1].split('&userId=')[0];
    var userid=str.split('sessionkey=')[1].split('&userId=')[1].split('&platformId=')[0];
    var plamid=str.split('sessionkey=')[1].split('&userId=')[1].split('&platformId=')[1];
   // var isFirstLogin = str.split('sessionkey=')[1].split('&userId=')[1].split('&platformId=')[1].split('&isFirstLogin=')[1];
    var temp='';
    var userSer="/s/userService/"
    var imgSer="/s/imageService/";
    var basic="?userId="+userid+"&sessionkey="+sessionkey;
    //bi
    obj.getfavoriteTree_url=userSer+"favoriteTree"+basic;
    obj.shareImagesSuccess_url=userSer+"shareImagesSuccess"+basic;
    obj.invite_url=userSer+"invite"+basic;
    
   // obj.isFirstLogin = isFirstLogin;
    
    obj.tweet_str="http://rc.qzone.qq.com/myhome/100631618";
    obj.plamid='&platformId='+plamid;
    //alert(userid+"::"+sessionkey+"::"+plamid);
    //alert(basic);
    obj.ajtype="GET";
    obj.getfriendtree_url=userSer+"showShareImageList"+basic;
    obj.attribute_url=userSer+"getUserInfo"+basic;
    obj.getImageList_url=imgSer+"getImageList"+basic;
    obj.showLastImage_url = imgSer+"showLastImage"+basic;
    obj.getYesterdayImageList_url = imgSer+"getYesterdayImageList"+basic+obj.plamid;
    obj.task_url=userSer+"getMissions"+basic;
    obj.getMissionReward_url = userSer+"getMissionReward"+basic;
    obj.treeOfPic_url=userSer+"getMyFavorites"+basic;
    obj.favorites_url=userSer+"setMyFavorites"+basic;
    obj.addFavorite_url=userSer+"addFavorite"+basic;
    obj.deleteFavorite_url=userSer+"deleteFavorite"+basic;
    obj.getHotDirectory_url=imgSer+"getGalleryList"+basic;
    obj.getPageview_url=imgSer+"getAllPageview"+basic;
    obj.getMissionstatus_url=userSer+"getMissionFinish"+basic;
    //obj.comment_url=userSer+"comment"+basic;
    obj.like_url=userSer+"like"+basic;
    obj.unlike_url=userSer+"unlike"+basic;
    obj.imgDelete_url=userSer+"setMyFavorites"+basic;
    obj.showFavoriteCounter_url=imgSer+"showFavoriteCounter"+basic;
    obj.value=function(){
        return  temp;
    }
        return obj;
})(HeaderStr);
$.ajaxSetup({cache:false});
var attr=null;
var task=null;
var aPos = [];
var treePos = 0;
var objfusion=new Fusion_fun();
var treeImgIds = [];

function BI(){}
BI.prototype={
		getBiKey:function(){
	         var url_str=HeaderStr.getfavoriteTree_url+HeaderStr.plamid;
             var type=HeaderStr.ajtype;
             //var data='counterType='+'favoritetree';
             var data='';

             var Bigetkey=new Aj();
              //alert(url_str);
             Bigetkey.init(type,data,url_str,this,"setBiKey");
        },
        setBiKey:function(obj){
        	 //alert(obj.sendKey+":::obj.sendKey");
        	 objfusion.sharetree(obj.sendKey);
        },
        shareSuccess:function(id,types,where,storagePath){
        	var url_str=HeaderStr.shareImagesSuccess_url+HeaderStr.plamid;
            var type=HeaderStr.ajtype;
            if(types=='favoritetree'){
            	var data="counterType="+types+"&towhere="+where;
            }else{
            	if(storagePath){
            		 var data='imageId='+id+"&counterType="+types+"&towhere="+where+"&imagePath="+storagePath;
            	}else{
            		 var data='imageId='+id+"&counterType="+types+"&towhere="+where;
            	}
               
            }
            var Bigetkey=new Aj();
             //alert(url_str);
            Bigetkey.init(type,data,url_str,this,"shareSuccessCallback");
            
        },
        shareSuccessCallback:function(){
        	
        },
        invite:function(fIds){
        	var url_str=HeaderStr.invite_url+HeaderStr.plamid;
            var type=HeaderStr.ajtype;
            var data='friendIds='+fIds;
            var invite_call=new Aj();
             //alert(url_str);
            invite_call.init(type,data,url_str,this,"inviteCallback");
        },
        inviteCallback:function(){
        	
        }
}
$(function(){
        attr=new User();
        attr.send();
        pv=new Pview();
        pv.getPv(); 
        treePic=new TreeOfPic();
		
        //alert(friendid);
        if(friendid){
        	//alert("1"+friendid);
        	ftreePic=new TreeOfPic();
        	ftreePic.friendtreesend(friendid);
        	$(".tree").show();
        	$("#tree_shoucangzhe").html(ftreePic.name);
        	$("#tree_nextLV_num").html(ftreePic.exp)
        }else{
        	//alert("2"+friendid);
        	//treePic=new TreeOfPic();
			//treePic.send();
        }
        task = new Task();
        task.send();
		himg=new Hotimage();
        himg.send();       
        
        //alert("$$");
        fusion2.canvas.setHeight
    	({
    	  // 可选。表示要调整的高度，不指定或指定为0则默认取当前窗口的实际高度。
    	  height : 7600
    	});

});
$(window).load(function(){
	//alert("loaded");
	fusion2.canvas.setHeight
	({
	  // 可选。表示要调整的高度，不指定或指定为0则默认取当前窗口的实际高度。
	  //height : 700
	});
})


function User(){}//用户基本信息
User.prototype={
            send:function(){
                var url_str=HeaderStr.attribute_url;
                var type=HeaderStr.ajtype;
                var data='';
                var userajax=new Aj();
                //alert(url_str);
                userajax.init(type,data,url_str,this,"receive");
            },
            receive:function(str){
                var that=this;
                that.id=str.user.id;
                that.thrumb=str.user.thrumb;
                that.name=str.user.name;
                that.title=str.user.title;
                that.exp=str.user.exp2NextLevel;
                that.maxCount=str.user.maxCount;
                that.isVip = str.user.isVip;
                that.isFans = str.user.isFans;
                that.isFirstLogin = str.user.isFirstLogin;
                //dom
                var dom_attr=new DomOperate();
                dom_attr.attribute(str);
            }
};

function Task(){};//任务
Task.prototype={
    send:function(){
        var url_str=HeaderStr.task_url;
        var type=HeaderStr.ajtype;
        var data=HeaderStr.value();
        var userajax=new Aj();
        userajax.init(type,data,url_str,this,'receive');
    },
    receive:function(str){
    	var task_domOperate=new DomOperate();
    	task_domOperate.taskload(str);
    	
    },
    taskcompletesend:function(missionId){
        var url_str=HeaderStr.getMissionReward_url;
        var type=HeaderStr.ajtype;
        var data="missionId="+missionId;
        this.taskId = missionId;
        var userajax=new Aj();
        userajax.init(type,data,url_str,this,'taskcompleteReceive');
    },
    taskcompleteReceive:function(str){
    	//console.log(str);
    	var missionExp = str.exp;
    	var task_finishedOperate = new DomOperate();
    	task_finishedOperate.taskFinished(missionExp,this.taskId);
    },
    taskstatussend:function(missId){
    	 var url_str=HeaderStr.getMissionstatus_url;
         var type=HeaderStr.ajtype;
         var data="missionId="+2;
         //this.taskId = missionId;
    	var taskstatus=new Aj();
    	taskstatus.init(type,data,url_str,this,'taskstatusdid');
    },
    taskstatusdid:function(obj){
    	//console.log(obj);
    	var task_domOperate=new DomOperate();
    	task_domOperate.taskload(obj);
    }
}

function Hotimage(){}
Hotimage.prototype={
     send:function(galleryType){
         var url_str=HeaderStr.getImageList_url;
         var type=HeaderStr.ajtype;
         var data='';
         if(galleryType){
        	 this.titleid=galleryType;    
         }     
         var userajax=new Aj();
         userajax.init(type,data,url_str,this,'receive');
     },
    receive:function(obj){
    	 for(var i=0;i<obj.favorites.length;i++){
    		 treeImgIds.push(obj.favorites[i].id)
    	 }
    	 //console.log(obj);
    	var lastImage;
    	var hotimage_domOperate=new DomOperate();
    	if (obj.shareStatus == 'showed'){
    		//取出imageMap[0]列表的最后一个,赋值给lastImage
    		lastImage = obj.imageMap['i0'][obj.imageMap['i0'].length-1];  
    		obj.imageMap['i0'].pop(lastImage);
    	}else{
    		lastImage = null;
    	}
    	hotimage_domOperate.hotImagecomplete(obj.shareStatus, obj.categoryList, obj.imageMap);

    	
    	hotimage_domOperate.picTreeload(obj);//获取热图同时刷一次图片树
    	
    	
    	Sfc=new ShowFavoriteCounter();
		Sfc.getNum();
    },
    showLastSend:function(thisCurr){
        var url_str=HeaderStr.showLastImage_url;
        var type=HeaderStr.ajtype;
        var data='';
        this.thisCurr = thisCurr;
        var showLastAjax=new Aj();
        showLastAjax.init(type,data,url_str,this,'showLastReceive');
    },
    showLastReceive:function(str){   	
    	//console.log(str);
    	var lastImage_domOperate=new DomOperate();
    	lastImage_domOperate.showLastImageComplete(str,this.thisCurr);
    },
    getYesterdaySend:function(shareStatus){
        var url_str=HeaderStr.getYesterdayImageList_url;
        var type=HeaderStr.ajtype;
        var data='';
        this.shareStatus = shareStatus;
        var getYesterdayAjax=new Aj();
        getYesterdayAjax.init(type,data,url_str,this,'getYesterdayReceive');
    },
    getYesterdayReceive:function(str){
    	var yesterdayImage_domOperate=new DomOperate();
    	yesterdayImage_domOperate.showYesterdayImageComplete(str);
//    	var hotimage_domOperate=new DomOperate();
//    	hotimage_domOperate.hotImagecomplete(str,treeImgIds,this.shareStatus);
    }
}
function HotDirectory(){}
HotDirectory.prototype={
    getDir:function(){
		var url_str=HeaderStr.getHotDirectory_url;
    	var type=HeaderStr.ajtype;
    	var data='';
    	var userajax=new Aj();
    	userajax.init(type,data,url_str,this,'setDir');
	
    },
    setDir:function(obj){
    	var hotDir_domOperate=new DomOperate();
    	hotDir_domOperate.hotDirectorycomplete(obj);
    }
}
function ShowFavoriteCounter(){}
ShowFavoriteCounter.prototype={
    getNum:function(){
	     var url_str=HeaderStr.showFavoriteCounter_url;
	     var type=HeaderStr.ajtype;
	     var data='';
	     var userajax=new Aj();
	     userajax.init(type,data,url_str,this,'setDom');
    },
    setDom:function(obj){
    	 var img_sFC=new DomOperate();
    	 img_sFC.img_showFavoriteCounter(obj);
    }
}
function Pview(){};
Pview.prototype={
	getPv:function(){
		var url_str=HeaderStr.getPageview_url;
		var type=HeaderStr.ajtype;
		var data='';
		var userajax=new Aj();
		userajax.init(type,data,url_str,this,'setPv');     
    },
    setPv:function(obj){
    	var getpv_domOperate=new DomOperate();
    	getpv_domOperate.getPageviewcomplete(obj);	
    }
}
function CommentPic(){}
CommentPic.prototype={
		title_s:null,
		desc_s:null,
		img_src:null,
		storagePath:null,
		galleryId:null,
	getCom:function(id,sharetypes,str1,str2,src,storagePath,galleryId){
	    var url_str;
	    if(sharetypes=="like"){
		    url_str=HeaderStr.like_url+HeaderStr.plamid;
	    }else{
	    	url_str=HeaderStr.unlike_url+HeaderStr.plamid;
	    }
	    this.title_s=str1;
	    this.desc_s=str2;
	    this.img_src=src;
	    this.storagePath = storagePath;
	    this.galleryId = galleryId;
	    //console.log(objfusion.shareapp(title_s, desc_s, img_src));
	    //objfusion.shareapp(str1,str2,src);
	    //Shareapp:function(title_s,desc_s,img_src)
		//var url_str=HeaderStr.comment_url;
		var type=HeaderStr.ajtype;
		var data='imageId='+id+'&imagePath='+storagePath+'&galleryId='+galleryId;
		this.commentId=id;
		this.commenttype=sharetypes;
		var userajax=new Aj();
		userajax.init(type,data,url_str,this,'setCom');
    },
    setCom:function(obj){
    	var coment_domOperate=new DomOperate();
    	coment_domOperate.getcommentcomplete(obj,this.commentId,this.commenttype,this.title_s,this.desc_s,this.img_src,this.storagePath);
    }
}


function TreeOfPic(){}
TreeOfPic.prototype={
    send:function(){
	    var url_str=HeaderStr.treeOfPic_url;
	    var type=HeaderStr.ajtype;
	    var data='';
	    var userajax=new Aj();
        userajax.init(type,data,url_str,this,'receive');
    },
    receive:function(str){
    	this.imgs = str;
    	var picTree_domOperate=new DomOperate();
    	picTree_domOperate.picTreeload(str);
    },
    friendtreesend:function(str){
    	var url_str=HeaderStr.getfriendtree_url;
	    var type=HeaderStr.ajtype;
	    var data='friendUserId='+str;
	    var friendtreeajax=new Aj();
	    friendtreeajax.init(type,data,url_str,this,'friendtreereceive');
    },
    friendtreereceive:function(str){
    	this.imgs = str;
    	var fpicTree_domOperate=new DomOperate();
    	fpicTree_domOperate.fpicTreeload(str);
    },
    favorites_send:function(obj,galleryId,storagePath){
    	var url_str=HeaderStr.addFavorite_url+HeaderStr.plamid;
	    var type=HeaderStr.ajtype;
   		//var data= "imageId=" + obj+"&position="+p;
	    var data= "imageId=" + obj+"&galleryId="+galleryId+"&storagePath="+storagePath;
   		this.imageId=obj;
	    var userajax=new Aj();
        userajax.init(type,data,url_str,this,'favorites_receive');
    },
    favorites_receive:function(str){
        var shoucang_domOperate=new DomOperate();
        shoucang_domOperate.shoucangjia1(this.imageId,str);
    },
    favoritesDelete_send:function(obj){
    	//console.log(obj);
    	var url_str=HeaderStr.deleteFavorite_url;
	    var type=HeaderStr.ajtype;
	    var data="imageId="+obj;
	    var userajax=new Aj();
        userajax.init(type,data,url_str,this,'favoritesDelete_receive');
    },
    favoritesDelete_receive:function(str){
    	//console.log(str);
    },
    pictree_bind:function(){    
    	var $this = this;	

		
		//图片放大		
		/*$('#collectList li div img').bind('click',function(){				
			if($(this).attr('value')){
				$('.tree_show img').attr('src',$(this).attr('src')+'');
				$('.tree_show').show();
		        $('.ceng2').show();
			}			
		});			
		
		//放大图片关闭
		$('.tree_show').click(function(){
	        $('.tree_show').hide();
	        $('.ceng2').hide();
		})   */
    },
    favorite_bind:function(id,src){    
    	var $this = this;
    	//var imgIds = [];
    	var thisIndex = 0;
    	var stat = true;
    	var rrmm = 0;
    	
    	$('#collectList .collect_list_1 div span').each(function(i){
    		var imageValue = $('#collectList .collect_list_1 div span').eq(i).attr('value');
    		
    		if(id == imageValue){
    			$('.sure_box p').html('这张图片已经在图片树中了');
    			fusion2.canvas.getClientRect({
    				onSuccess: function (rect){
    					$('.sure_box').css('top',rect.top+290);
    			    }
    			});
    			$('.ceng3').show();
    			$('.sure_box').show();
    			stat = false;
    			return false;
    		}
    		
    		//替换弹出框
    		$(this).attr('index',i);
    		
    		$('#collectList .collect_list_1 div span').eq(i).bind('click',function(){
    			
    			var thisValue = $(this).attr('value');
  			
    			if(stat == false){
    				stat =false;
					return false;
				}
    			thisIndex = $(this).attr('index');    
    			fusion2.canvas.getClientRect({
    				onSuccess: function (rect){
    					$('.sure_box').css('top',rect.top+290);
    				}
    			});
    			$('.ceng3').show();
    			$('.sure_box').show();
    			
    			
    			//alert(stat)
    			if(stat==true){
	    			if(thisValue){				
	    				$('.sure_box p').html('是否替换');
	    			}else{
	    				$('.sure_box p').html('是否收藏');
	    			}	  			
    			
	    			$('.sure_box var').bind('click',replyImg);
    			}
    			
    			function replyImg(){    
    				
    				if(stat == false){
    					stat = false;
    					return false;
    				}
    				
    				var thisDiv = $('#collectList .collect_list_1 div').eq(thisIndex);
    				var thisImg = $('#collectList .collect_list_1 div').eq(thisIndex).find('img');
    				var thisspan=thisDiv.find('span');
    				

    				//alert(thisImg.attr('value'));
    				if(thisImg.attr('value')){
    					thisImg.attr('src',src);
        				thisImg.attr('value',id);
        				thisspan.attr('src',src);
        				thisspan.attr('value',id);
    					thisDiv.append('<var class="shu_delete"><p class="delete_cha" style="display:none;margin-top:3px; margin-left:16px;width:20px;height:19px;background:url(images/tree_delete.png) 0 0 no-repeat;"></p></var>');
    					$this.favorites_send(id,thisIndex);
					}else{
						//alert(thisImg);
						thisspan.html('<img src="'+src+'"value="'+id+'"/>')
						//thisImg.attr('class','');
						thisImg.attr('src',src);
	    				thisImg.attr('value',id);
	    				thisspan.attr('src',src);
	    				thisspan.attr('value',id);
						thisDiv.append('<var class="shu_delete"><p class="delete_cha" style="display:none;margin-top:3px; margin-left:16px;width:20px;height:19px;background:url(images/tree_delete.png) 0 0 no-repeat;"></p></var>');						
						var mCount = $('#collectList .collect_list_1 div img[value]').length-1;
	    				//alert(mCount);
						var iLeft = thisDiv.css('left');
						var iTop = thisDiv.css('top');
						//thisDiv.css('border','1px red solid');
						$('#collectList .collect_list_1 div').eq(mCount).animate({'left':iLeft,'top':iTop},function(){
							$(this).attr('index',mCount);
						});;
						thisDiv.animate({'left':aPos[mCount].left,'top':aPos[mCount].top});
						$this.favorites_send(id,mCount);
					}  				
					$('.ceng3').hide();
					$('.sure_box').hide();
				
					stat = false;
    			}

    		});  
    		   		
        		
    	});
    }
}

