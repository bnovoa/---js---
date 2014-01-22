
Date.prototype.toSimpleStr = function(){
	return this.getFullYear()+'-'+ (this.getMonth()+1) + '-'+this.getDate()+' '+this.getHours()+':'+this.getMinutes()+':'+this.getSeconds();
}

/**************************
* Application
**************************/

PostList = Em.Application.create();


/**************************
* Models
**************************/

PostList.Item = Em.Object.extend({
	id : null,
	status : "normal",
	forumName : null,
	nickName : null,
	userId : null,
	title : null,
	content : null,
	createTime : null,
	updateTime : null,
	page:1
});

PostList.NotedPost = Em.Object.extend({
	id : null,
	status : "normal",
	forumName : null,
	nickName : null,
	userId : null,
	title : null,
	content : null,
	createTime : null,
	updateTime : null,
	page:1
});

PostList.DetailReply = Em.Object.extend({
	id:null,
	txt:null,
	username:null,
	postId:null
});

PostList.DetailStrategyType = Em.Object.extend({
	id:null,
	name:null,
	forumId:null,
	sequence:null,
	imageUrl:null
});

PostList.OrderList = Em.Object.extend({
	appId:null,
	createTime:null,
	deliveryInfoBase64:null,
	deliveryResult:null,
	deliveryUrl:null,
	id:null,
	productId:null,
	receipt:null,
	sandBox:null,
	serverId:null,
	status:null,
	transactionId:null,
	udid:null,
	userId:null,
	userToken:null,
	verifyCount:null,
	verifyTime:null
});

PostList.UserList = Em.Object.extend({
	id:null,
	nickName:null,
	gender:null,
	email:null,
	headImage:null,
	score:null,
	lastLoginTime:null,
	status:null,
});

PostList.userPerioddau = Em.Object.extend({
	userDau:null
});
/**************************
* Views
**************************/

PostList.forumController = Em.Object.create({
	selected:null,
	content:[
			Ember.Object.create({name: "IOS-胡莱三国", id: 1}),
			Ember.Object.create({name: "IOS-胡莱战国", id: 1003}),
			Ember.Object.create({name: "IOS-神曲", id: 2013}),
			Ember.Object.create({name: "IOS-傲视天地", id: 1006}),
			Ember.Object.create({name: "IOS-将军", id: 1002}),
//			Ember.Object.create({name: "IOS-各种图", id: 1004}),
//			Ember.Object.create({name: "IOS-卡战三国", id: 1009}),
			Ember.Object.create({name: "IOS-御剑天涯", id: 2001}),
			Ember.Object.create({name: "IOS-龙之力量", id: 2002}),
//			Ember.Object.create({name: "IOS-逆转三国", id: 2003}),
			Ember.Object.create({name: "IOS-神仙道", id: 2004}),
//			Ember.Object.create({name: "IOS-大掌门", id: 2005}),
			Ember.Object.create({name: "IOS-我叫MT", id: 2006}),
//			Ember.Object.create({name: "IOS-三国来了", id: 2007}),
//			Ember.Object.create({name: "IOS-雄霸天地", id: 2008}),
//			Ember.Object.create({name: "IOS-时空猎人ol", id: 2009}),
//			Ember.Object.create({name: "IOS-魔卡幻想", id: 2010}),
			Ember.Object.create({name: "IOS-王者之剑", id: 2011}),
//			Ember.Object.create({name: "IOS-保卫萝卜", id: 2012}),
//			Ember.Object.create({name: "过渡-胡莱三国", id: 0}),
			Ember.Object.create({name: "安卓-胡莱三国", id: 91}),
			Ember.Object.create({name: "安卓-我叫MT", id: 92006}),
			Ember.Object.create({name: "安卓-王者之战", id: 92011}),
			Ember.Object.create({name: "安卓-逆转三国", id: 92003}),
			Ember.Object.create({name: "安卓-神仙道", id: 92004}),
			Ember.Object.create({name: "安卓-大掌门", id: 92005}),
			Ember.Object.create({name: "安卓-保卫萝卜", id: 92012}),
			Ember.Object.create({name: "安卓-神曲", id: 92013}),
	         ]
}); 

PostList.forumDefaultController = Em.Object.create({
	selected:null,
	content:[
	        Ember.Object.create({name: "请选择论坛", id: -1}),
			Ember.Object.create({name: "IOS-胡莱三国", id: 1}),
			Ember.Object.create({name: "IOS-胡莱战国", id: 1003}),
			Ember.Object.create({name: "IOS-神曲", id: 2013}),
			Ember.Object.create({name: "IOS-傲视天地", id: 1006}),
			Ember.Object.create({name: "IOS-将军", id: 1002}),
//			Ember.Object.create({name: "IOS-各种图", id: 1004}),
//			Ember.Object.create({name: "IOS-卡战三国", id: 1009}),
			Ember.Object.create({name: "IOS-御剑天涯", id: 2001}),
			Ember.Object.create({name: "IOS-龙之力量", id: 2002}),
//			Ember.Object.create({name: "IOS-逆转三国", id: 2003}),
			Ember.Object.create({name: "IOS-神仙道", id: 2004}),
//			Ember.Object.create({name: "IOS-大掌门", id: 2005}),
			Ember.Object.create({name: "IOS-我叫MT", id: 2006}),
//			Ember.Object.create({name: "IOS-三国来了", id: 2007}),
//			Ember.Object.create({name: "IOS-雄霸天地", id: 2008}),
//			Ember.Object.create({name: "IOS-时空猎人ol", id: 2009}),
//			Ember.Object.create({name: "IOS-魔卡幻想", id: 2010}),
			Ember.Object.create({name: "IOS-王者之剑", id: 2011}),
//			Ember.Object.create({name: "IOS-保卫萝卜", id: 2012}),
//			Ember.Object.create({name: "过渡-胡莱三国", id: 0}),
			Ember.Object.create({name: "安卓-胡莱三国", id: 91}),
			Ember.Object.create({name: "安卓-我叫MT", id: 92006}),
			Ember.Object.create({name: "安卓-王者之战", id: 92011}),
			Ember.Object.create({name: "安卓-逆转三国", id: 92003}),
			Ember.Object.create({name: "安卓-神仙道", id: 92004}),
			Ember.Object.create({name: "安卓-大掌门", id: 92005}),
			Ember.Object.create({name: "安卓-保卫萝卜", id: 92012}),
			Ember.Object.create({name: "安卓-神曲", id: 92013}),
	         ]
}); 

PostList.ItemSelectView = Ember.Select.extend({
	  contentBinding:"PostList.forumController.content",
	  selectionBinding:"PostList.forumController.selected",
	  optionValuePath:"content.id",
	  optionLabelPath:"content.name",
	  theSelectionChanged: function(){
	  //alert(this.get('selection'))
		  if(PostList.forumController.get('selected') != null){
			  if(this.selection.get('id') == 0){
				  $('#showTitle').show();
			  }else{
				  $('#showTitle').hide();
			  }
		  }
		  
	  }.observes('selection')
	});


MyEmberSelect = Ember.Select.extend({
	  theSelectionChanged: function(){
		  alert(1);
	    // call whenever selection changes
	  }.observes('selection')
	});

PostList.areaController = Em.Object.create({
	selected:null,
	content:[
			Ember.Object.create({name: "分享区", id: 1}),
			Ember.Object.create({name: "活动区", id: 2}),
			Ember.Object.create({name: "申精区", id: 3}),
			Ember.Object.create({name: "精华区", id: 4}),
			Ember.Object.create({name: "举报区", id: 5}),
			//Ember.Object.create({name: "安卓三国区", id: 301}),
			//Ember.Object.create({name: "安卓休闲区", id: 302}),
			//Ember.Object.create({name: "安卓反馈区", id: 304})
	         ]
});

PostList.areaDefaultController = Em.Object.create({
	selected:null,
	content:[
			Ember.Object.create({name: "请选择版块", id: 0}),
			Ember.Object.create({name: "分享区", id: 1}),
			Ember.Object.create({name: "活动区", id: 2}),
			Ember.Object.create({name: "申精区", id: 3}),
			Ember.Object.create({name: "精华区", id: 4}),
			Ember.Object.create({name: "举报区", id: 5}),
			//Ember.Object.create({name: "安卓三国区", id: 301}),
			//Ember.Object.create({name: "安卓休闲区", id: 302}),
			//Ember.Object.create({name: "安卓反馈区", id: 304})
	         ]
});
PostList.areaAddController = Em.Object.create({
	selected:null,
	content:[
			Ember.Object.create({name: "分享区", id: 1}),
			Ember.Object.create({name: "安卓三国区", id: 301}),
			Ember.Object.create({name: "安卓休闲区", id: 302}),
			Ember.Object.create({name: "安卓反馈区", id: 304})
	         ]
});

PostList.strategyController = Em.Object.create({
	selected:null,
	content:[
	        Ember.Object.create({name: "未分类", id: 0}),
			Ember.Object.create({name: "职业", id: 1001}),
			Ember.Object.create({name: "装备", id: 1002}),
			Ember.Object.create({name: "获得", id: 1003}),
			Ember.Object.create({name: "副本", id: 1004}),
			Ember.Object.create({name: "BOSS", id: 1005}),
			Ember.Object.create({name: "迷宫", id: 1006}),
			Ember.Object.create({name: "竞技", id: 1007}),
			Ember.Object.create({name: "占星", id: 1008}),
			Ember.Object.create({name: "坐骑", id: 1009}),
			Ember.Object.create({name: "战场", id: 1010}),
			
			//Ember.Object.create({name: "安卓三国区", id: 301}),
			//Ember.Object.create({name: "安卓休闲区", id: 302}),
			//Ember.Object.create({name: "安卓反馈区", id: 304})
	         ]
});


PostList.newAddStrategyController = Em.Object.create({
	selected:null,
	content:[
	        Ember.Object.create({name: "未分类", id: 0}),
			Ember.Object.create({name: "职业", id: 1001}),
			Ember.Object.create({name: "装备", id: 1002}),
			Ember.Object.create({name: "获得", id: 1003}),
			Ember.Object.create({name: "副本", id: 1004}),
			Ember.Object.create({name: "BOSS", id: 1005}),
			Ember.Object.create({name: "迷宫", id: 1006}),
			Ember.Object.create({name: "竞技", id: 1007}),
			Ember.Object.create({name: "占星", id: 1008}),
			Ember.Object.create({name: "坐骑", id: 1009}),
			Ember.Object.create({name: "战场", id: 1010}),
			//Ember.Object.create({name: "安卓三国区", id: 301}),
			//Ember.Object.create({name: "安卓休闲区", id: 302}),
			//Ember.Object.create({name: "安卓反馈区", id: 304})
	         ]
});

PostList.SearchTextField = Em.TextField.extend({
	placeholder:"输入关键字",
	searchName:null,
	searchIdOrEmail:null,
    insertNewline: function(){
    	PostList.itemController.loadItem();
    }
});

PostList.PageTextField = Em.TextField.extend({
	classNames: ['pageTo-text-field'],
	placeholder:"第几页",
	searchPage:null,
    insertNewline: function(){
    	PostList.itemController.loadItem();
    }
});

PostList.backPageTextField = Em.TextField.extend({
	classNames: ['pageTo-text-field'],
	placeholder:"第几页",
	searchBackPage:null,
    insertNewline: function(){
    	PostList.detailController.actionPage();
    }
});

PostList.ReplyTextArea = Em.TextArea.extend({
	inputContent:null,
	insertNewline: function(){
		
	}
});


/**************************
* Controllers
**************************/

PostList.itemController = Em.ArrayController.create({
	content:[],
	page:1,
	showPage:false,
	loadItem:function(page){
		var me = this;
        var searchStr = PostList.SearchTextField.searchName;
        	searchStr = searchStr == undefined ? "" : searchStr;
        var searchPageStr = PostList.SearchTextField.searchPage;
        	searchPageStr = searchPageStr == undefined ? "" : searchPageStr;
        var forumId = PostList.forumController.get("selected").get("id");
        var areaId = PostList.areaController.get("selected").get("id");
        var url = "../forumManage/postList";
        var type = "GET";
        if(typeof page == 'object'){
        	 var pageNum = 1;
        }else{
        	 var pageNum = page;
        }
        var beginTime=$("#input_begin_time").val();
        var endTime=$("#input_end_time").val();
        var data = "beginTime="+beginTime+"&endTime="+endTime+"&forumId="+forumId+"&areaId="+areaId+"&searchStr="+searchStr+"&page="+pageNum+"&searchPageStr="+searchPageStr;
        var postList_aj=new Aj();
        postList_aj.init(type, data, url,
        	function (result){
        		var postList = result.data.postList;
        		me.set('content', []);
        		me.set('page',result.data.page);
//        		me.set('pageCount',2);   //总共多少页
        		me.set('pageCount',result.data.pageCount);//总共多少页
        		if(postList.length > 0){
        			me.set('showPage',true);
        		}else{
        			me.set('showPage',false);
        		}
        		
			    $(postList).each(function(index,value){
			        var t = PostList.Item.create({
			        	id: value.id,
			        	status: function(status,type,topId,forumId){
	    					var str='';
	    					if (forumId > 0){
	    						switch (status){
	    							case 'normal' : str = "正常";break;
	    							case 'readonly' : str = "禁回帖";break;
	    							case 'hidden' : str = "禁查看";break;
	    						}
	    					}else{
	    						switch (status){
	    							case 'normal' : str = "禁查看";break;
	    							case 'readonly' : str = "禁查看";break;
	    							case 'hidden' : str = "正常";break;
	    						}
	    					}	    					
	    					switch (type){
	    						case 'normal' : break;
	    						case 'essential' : str += "·精华";break;
	    					}
	    					if (topId > 0){
	    						str += "·置顶";
	    					}
	    					return str;
	    				}(value.status, value.type, value.topId, value.forumId),
	    				
			        	forumName: value.forumId,
			        	nickName: value.user ? value.user.nickname : " ",
			            userId:value.userId,
			        	title: value.title,
			        	content: value.content,
			        	noted: value.noted,
			        	createTime: new Date(value.createTime).toSimpleStr(),
			        	updateTime: new Date(value.updateTime).toSimpleStr(),
			        	zipImage: value.zipImage,
			        	realZipImage: function(data) {
			        		var imageUrl = "";
			        		var frontend = "";
			        		var backend = "";
			        		if(data!=null &&　data!=undefined) {
			        			frontend = data.substring(0, data.lastIndexOf("thumbnail")); 
			        			backend = data.substring(data.lastIndexOf("thumbnail")+10 , data.length);
			        			imageUrl = frontend + backend;
			        		}
			        		return imageUrl;
			        	}(value.zipImage)
			        });
			        me.pushObject(t);
//			        console.log(me.set('zipImage'))
			    });
//			    Em.Logger.info(me.content);
        	}
        );
	},
	loadStrategy:function(page){
		var me = this;
        var searchStr = PostList.SearchTextField.searchName;
        	searchStr = searchStr == undefined ? "" : searchStr;
        var searchPageStr = PostList.SearchTextField.searchPage;
        	searchPageStr = searchPageStr == undefined ? "" : searchPageStr;
        var forumId = PostList.forumController.get("selected").get("id");
        var strategyType = PostList.strategyController.get("selected").get("id");
        var url = "../forumManage/strategyList";
        var type = "GET";
        if(typeof page == 'object'){
        	 var pageNum = 1;
        }else{
        	 var pageNum = page;
        }
        var data = "beginTime=undefined&endTime=undefined&forumId="+forumId+"&strategyType="+strategyType+"&searchStr="+searchStr+"&page="+pageNum+"&searchPageStr="+searchPageStr;
        var postList_aj=new Aj();
        postList_aj.init(type, data, url,
        	function (result){
	        	if(result.data == undefined || result.data.strategyList == undefined) {
	    			return false;
	    		}
        		var postList = result.data.strategyList;
        		me.set('content', []);
        		me.set('page',result.data.page);
//        		me.set('pageCount',2);   //总共多少页
        		me.set('pageCount',result.data.pageCount);//总共多少页
        		if(postList.length > 0){
        			me.set('showPage',true);
        		}else{
        			me.set('showPage',false);
        		}
        		
			    $(postList).each(function(index,value){
			        var t = PostList.Item.create({
			        	id: value.id,
			        	status: function(status,type,topId,forumId){
	    					var str='';
	    					if (forumId > 0){
	    						switch (status){
	    							case 'normal' : str = "正常";break;
	    							case 'readonly' : str = "禁回帖";break;
	    							case 'hidden' : str = "禁查看";break;
	    						}
	    					}else{
	    						switch (status){
	    							case 'normal' : str = "禁查看";break;
	    							case 'readonly' : str = "禁查看";break;
	    							case 'hidden' : str = "正常";break;
	    						}
	    					}	    					
	    					switch (type){
	    						case 'normal' : break;
	    						case 'essential' : str += "·精华";break;
	    					}
	    					if (topId > 0){
	    						str += "·置顶";
	    					}
	    					return str;
	    				}(value.status, value.type, value.topId, value.forumId),
			        	forumName: value.forumId,
			        	nickName: value.user ? value.user.nickname : " ",
			            userId:value.userId,
			        	title: value.title,
			        	content: value.content,
			        	createTime: new Date(value.createTime).toSimpleStr(),
			        	updateTime: new Date(value.updateTime).toSimpleStr(),
			        	zipImage: value.zipImage,
			        	realZipImage: function(data) {
			        		var imageUrl = "";
			        		var frontend = "";
			        		var backend = "";
			        		if(data!=null &&　data!=undefined) {
			        			frontend = data.substring(0, data.lastIndexOf("thumbnail")); 
			        			backend = data.substring(data.lastIndexOf("thumbnail")+10 , data.length);
			        			imageUrl = frontend + backend;
			        		}
			        		return imageUrl;
			        	}(value.zipImage)
			        });
			        me.pushObject(t);
//			        console.log(me.set('zipImage'))
			    });
//			    Em.Logger.info(me.content);
        	}
        );
	},
	loadUnClassifiedStrategy:function(){
		var me = this;
		var searchStr = PostList.SearchTextField.searchName;
    	searchStr = searchStr == undefined ? "" : searchStr;
    	var searchPageStr = PostList.SearchTextField.searchPage;
    	searchPageStr = searchPageStr == undefined ? "" : searchPageStr;
    	
		var forumId = PostList.forumController.get("selected").get("id");
        var strategyType = 0;
		var url = "../forumManage/strategyList";
        var type = "POST";
        var pageNum = 1;
        var data = "beginTime=undefined&endTime=undefined&forumId="+forumId+"&strategyType="+strategyType+"&searchStr="+searchStr+"&page="+pageNum+"&searchPageStr="+searchPageStr;
        var postList_aj=new Aj();
        postList_aj.init(type, data, url,
        	function (result){
	        	if(result.data == undefined || result.data.strategyList == undefined) {
	    			return false;
	    		}
        		var postList = result.data.strategyList;
        		me.set('content', []);
        		me.set('page',result.data.page);
//        		me.set('pageCount',2);   //总共多少页
        		me.set('pageCount',result.data.pageCount);//总共多少页
        		if(postList.length > 0){
        			me.set('showPage',true);
        		}else{
        			me.set('showPage',false);
        		}
        		
			    $(postList).each(function(index,value){
			        var t = PostList.Item.create({
			        	id: value.id,
			        	status: function(status,type,topId,forumId){
	    					var str='';
	    					if (forumId > 0){
	    						switch (status){
	    							case 'normal' : str = "正常";break;
	    							case 'readonly' : str = "禁回帖";break;
	    							case 'hidden' : str = "禁查看";break;
	    						}
	    					}else{
	    						switch (status){
	    							case 'normal' : str = "禁查看";break;
	    							case 'readonly' : str = "禁查看";break;
	    							case 'hidden' : str = "正常";break;
	    						}
	    					}	    					
	    					switch (type){
	    						case 'normal' : break;
	    						case 'essential' : str += "·精华";break;
	    					}
	    					if (topId > 0){
	    						str += "·置顶";
	    					}
	    					return str;
	    				}(value.status, value.type, value.topId, value.forumId),
			        	forumName: value.forumId,
			        	nickName: value.user ? value.user.nickname : " ",
			            userId:value.userId,
			        	title: value.title,
			        	content: value.content,
			        	createTime: new Date(value.createTime).toSimpleStr(),
			        	updateTime: new Date(value.updateTime).toSimpleStr(),
			        	zipImage: value.zipImage,
			        	realZipImage: function(data) {
			        		var imageUrl = "";
			        		var frontend = "";
			        		var backend = "";
			        		if(data!=null &&　data!=undefined) {
			        			frontend = data.substring(0, data.lastIndexOf("thumbnail")); 
			        			backend = data.substring(data.lastIndexOf("thumbnail")+10 , data.length);
			        			imageUrl = frontend + backend;
			        		}
			        		return imageUrl;
			        	}(value.zipImage)
			        });
			        me.pushObject(t);
//			        console.log(me.set('zipImage'))
			    });
//			    Em.Logger.info(me.content);
        	}
        );
	},
	loadNotedPost:function(page){
		var me = this;
        var searchStr = PostList.SearchTextField.searchName;
        	searchStr = searchStr == undefined ? "" : searchStr;
        var searchPageStr = PostList.SearchTextField.searchPage;
        	searchPageStr = searchPageStr == undefined ? "" : searchPageStr;
        var forumId = PostList.forumController.get("selected").get("id");
        var areaId = PostList.areaController.get("selected").get("id");
        var url = "../forumManage/notedPostList";
        var type = "GET";
        if(typeof page == 'object'){
        	 var pageNum = 1;
        }else{
        	 var pageNum = page;
        }
        var data = "beginTime=undefined&endTime=undefined&forumId="+forumId+"&areaId="+areaId+"&searchStr="+searchStr+"&page="+pageNum+"&searchPageStr="+searchPageStr;
        var postList_aj=new Aj();
        postList_aj.init(type, data, url,
        	function (result){
        		var postList = result.data.postList;
        		me.set('content', []);
        		me.set('page',result.data.page);
//        		me.set('pageCount',2);   //总共多少页
        		me.set('pageCount',result.data.pageCount);//总共多少页
        		if(postList.length > 0){
        			me.set('showPage',true);
        		}else{
        			me.set('showPage',false);
        		}  		
			    
			    $(postList).each(function(index,value){
			        var t = PostList.Item.create({
			        	id: value.id,
			        	status: function(status,type,topId,forumId){
	    					var str='';
	    					if (forumId > 0){
	    						switch (status){
	    							case 'normal' : str = "正常";break;
	    							case 'readonly' : str = "禁回帖";break;
	    							case 'hidden' : str = "禁查看";break;
	    						}
	    					}else{
	    						switch (status){
	    							case 'normal' : str = "禁查看";break;
	    							case 'readonly' : str = "禁查看";break;
	    							case 'hidden' : str = "正常";break;
	    						}
	    					}	    					
	    					switch (type){
	    						case 'normal' : break;
	    						case 'essential' : str += "·精华";break;
	    					}
	    					if (topId > 0){
	    						str += "·置顶";
	    					}
	    					return str;
	    				}(value.status, value.type, value.topId, value.forumId),
	    				
			        	forumName: value.forumId,
			        	nickName: value.user ? value.user.nickname : " ",
			            userId:value.userId,
			        	title: value.title,
			        	content: value.content,
			        	createTime: new Date(value.createTime).toSimpleStr(),
			        	updateTime: new Date(value.updateTime).toSimpleStr(),
			        	zipImage: value.zipImage,
			        	realZipImage: function(data) {
			        		var imageUrl = "";
			        		var frontend = "";
			        		var backend = "";
			        		if(data!=null &&　data!=undefined) {
			        			frontend = data.substring(0, data.lastIndexOf("thumbnail")); 
			        			backend = data.substring(data.lastIndexOf("thumbnail")+10 , data.length);
			        			imageUrl = frontend + backend;
			        		}
			        		return imageUrl;
			        	}(value.zipImage)
			        });
			        me.pushObject(t);
//			        console.log(me.set('zipImage'))
			    });
//			    Em.Logger.info(me.content);
		    });
	},
	loadPost:function(view) {
		var me = this;
        var searchStr = PostList.SearchTextField.searchName;
        if(searchStr == undefined) {
        	alert("親，請輸入帖子ID");
        	return false;
        }
        var url = "../forumManage/getPost";
        var type = "GET";
        var data = "postId="+searchStr;
        var postList_aj=new Aj();
        postList_aj.init(type, data, url,
        	function (result){
	        	if(result.data == undefined || result.data.post == undefined) {
	    			return false;
	    		}
        		var post = result.data.post;
        		post.user = result.data.user;
        		me.set('content', []);
        		
			    $(post).each(function(index,value){
			        var t = PostList.Item.create({
			        	id: value.id,
			        	status: function(status,type,topId,forumId){
	    					var str='';
	    					if (forumId > 0){
	    						switch (status){
	    							case 'normal' : str = "正常";break;
	    							case 'readonly' : str = "禁回帖";break;
	    							case 'hidden' : str = "禁查看";break;
	    						}
	    					}else{
	    						switch (status){
	    							case 'normal' : str = "禁查看";break;
	    							case 'readonly' : str = "禁查看";break;
	    							case 'hidden' : str = "正常";break;
	    						}
	    					}	    					
	    					switch (type){
	    						case 'normal' : break;
	    						case 'essential' : str += "·精华";break;
	    					}
	    					if (topId > 0){
	    						str += "·置顶";
	    					}
	    					return str;
	    				}(value.status, value.type, value.topId, value.forumId),
			        	forumName: value.forumId,
			        	nickName: value.user ? value.user.nickname : " ",
			            userId:value.userId,
			        	title: value.title,
			        	content: value.content,
			        	createTime: new Date(value.createTime).toSimpleStr(),
			        	updateTime: new Date(value.updateTime).toSimpleStr(),
			        	zipImage: value.zipImage,
			        	realZipImage: function(data) {
			        		var imageUrl = "";
			        		var frontend = "";
			        		var backend = "";
			        		if(data!=null &&　data!=undefined) {
			        			frontend = data.substring(0, data.lastIndexOf("thumbnail")); 
			        			backend = data.substring(data.lastIndexOf("thumbnail")+10 , data.length);
			        			imageUrl = frontend + backend;
			        		}
			        		return imageUrl;
			        	}(value.zipImage)
			        });
			        me.pushObject(t);
//			        console.log(me.set('zipImage'))
			    });
//			    Em.Logger.info(me.content);
        	}
        );
	},
	getPost:function(view){
		var id = view.context.id;
		console.log(id);
		PostList.detailController.loadDetail(id);
	},
    changeStatus:function(view, title, isAdd){
        var str = view.context.status;
        if (isAdd){
        	if (str.indexOf(title)<0){
            	str = str + title;
        	}
        }else{
        	str = str.replace(title, '');
        }
        view.context.set('status', str);
	},
	addTop:function(view){
		var id = view.context.id;
		var page = view.context.page;
		var url_str="../forumManage/addTopPost";
	    var type="GET";
	    var data='postId='+ id;
	    var me = this;
	    var getPost_aj=new Aj();
	    getPost_aj.init(type, data, url_str,
	    	function (result){
	    		if(result.status == 1){
                    //me.loadItem(page);
                    me.changeStatus(view, '·置顶', true);
	    			alert("置顶成功");
	    		}
	    	}
	    );
	},	
	removeTop:function(view){
		var id = view.context.id;
		var page = view.context.page;
		var url_str="../forumManage/removeTopPost";
	    var type="GET";
	    var data='postId='+ id;
	    var me = this;
	    var getPost_aj=new Aj();
	    getPost_aj.init(type, data, url_str,
	    	function (result){
		    	if(result.status == 1){
                    //me.loadItem(page);
                    me.changeStatus(view, '·置顶', false);
	    			alert("取消置顶成功");
	    		}	    	
	    	}
	    );
	},
	addEssential:function(view){
		var id = view.context.id;
		var page = view.context.page;
		var url_str="../forumManage/addEssential";
	    var type="GET";
	    var data='postId='+ id;
	    var me = this;
	    var getPost_aj=new Aj();
	    getPost_aj.init(type, data, url_str,
	    	function (result){
		    	if(result.status == 1){
                    //me.loadItem(page);
                    me.changeStatus(view, '·精华', true);
	    			alert("加精成功");
	    		}
	    	}
	    );
	},
	removeInform:function(view){
		var id = view.context.id;
		var page = view.context.page;
		var url_str="../forumManage/removeInform";
	    var type="GET";
	    var data='postId='+ id;
	    var me = this;
	    var getPost_aj=new Aj();
	    getPost_aj.init(type, data, url_str,
	    	function (result){
		    	if(result.status == 1){
                    //me.loadItem(page);
                    me.changeStatus(view, '·举报', false);
                    me.removeObject(view.context);
	    			alert("取消举报成功");
	    		}
	    	}
	    );
	},
	removeEssential:function(view){
		var id = view.context.id;
		var page = view.context.page;
		var url_str="../forumManage/removeEssential";
	    var type="GET";
	    var data='postId='+ id;
	    var me = this;
	    var getPost_aj=new Aj();
	    getPost_aj.init(type, data, url_str,
	    	function (result){
		    	if(result.status == 1){
                    //me.loadItem(page);
                    me.changeStatus(view, '·精华', false);
	    			alert("取消加精成功");
	    		}
	    	}
	    );
	},
	deleteItem:function(view){
		var id = view.context.id;
		var page = view.context.page;
		var url_str="../forumManage/deletePost";
	    var type="GET";
	    var data='postId='+ id;
	    var me = this;
	    var getPost_aj=new Aj();
	    if(confirm("是否将此条帖子删除?")){
	    	getPost_aj.init(type, data, url_str,function (result){
	    		if(result.status == 1){
                    me.removeObject(view.context);
                    //me.loadItem(page,parseInt(me.get("page")));
	    			alert("删除成功");
	    		}
	    	});
		}
	},
	exportPosts:function(page){
		var me = this;
        var searchStr = PostList.SearchTextField.searchName;
        	searchStr = searchStr == undefined ? "" : searchStr;
        var searchPageStr = PostList.SearchTextField.searchPage;
        	searchPageStr = searchPageStr == undefined ? "" : searchPageStr;
        var forumId = PostList.forumController.get("selected").get("id");
        var areaId = PostList.areaController.get("selected").get("id");
        var url = "../forumManage/exportPostList";
        var type = "GET";
        if(typeof page == 'object'){
        	 var pageNum = 1;
        }else{
        	 var pageNum = page;
        }
        var beginTime=$("#input_begin_time").val();
        if(beginTime==''){
        	alert("请选择开始时间");
        	return;
        }
        var endTime=$("#input_end_time").val();
        if(endTime==''){
        	alert("请选择结束时间");
        	return;
        }
        var data = "beginTime="+beginTime+"&endTime="+endTime+"&forumId="+forumId+"&areaId="+areaId+"&searchStr="+searchStr+"&page="+pageNum+"&searchPageStr="+searchPageStr;
        var postList_aj=new Aj();
        postList_aj.init(type, data, url,
        	function (result){
        		if(result.status == 1){
        			result= result.data;
        			var success = result.success;
        			var text;
        			if (success == 0)
        			{
        				text = "没有找到帖子";
        			} else
        			{
        				text = "<a href='" + result.url + "'>" + result.fileName + "</a>";
        			}
        			$("#td_export").html(text);
        		}
        	}
        );
	},
	exportReplies:function(view){
		var id = view.context.id;
		var url_str="../forumManage/exportReply";
	    var type="GET";
	    var data='postId='+ id;
	    var getPost_aj=new Aj();
	    getPost_aj.init(type, data, url_str,
	    	function (result){
	    		if(result.status == 1){
	    			result= result.data;
	    			var success = result.success;
	    			var text;
	    			if (success == 0)
	    			{
	    				text = "帖子不存在或者没有评论";
	    			} else
	    			{
	    				text = "<a href='" + result.url + "'>" + result.fileName + "</a>";
	    			}
	    			$("#td_export").html(text);
	    		}
	    	}
	    );
	},
	prevPage:function(){
		var me = this;
		var prevPage = parseInt(me.get('page'));
		prevPage--;
		if(prevPage < 2){
			prevPage = 1;
		}
		if(PostList.areaController.get("selected") != undefined ) {
			me.loadItem(prevPage);
		} else {
			me.loadStrategy(prevPage);	
		}
	},
	nextPage:function(){
		var me = this;
		var nextPage = parseInt(me.get('page'));
		var pageCount = parseInt(me.get('pageCount'));
		nextPage++;
		if(nextPage > pageCount){
			return;
		}
		if(PostList.areaController.get("selected") != undefined ) {
			me.loadItem(nextPage);	
		} else {
			me.loadStrategy(nextPage);
		}
	},
	appointedPage:function(){
		var me = this;
		var appointedPage = parseInt(me.get('page'));
		//page>0  <maxPage
		//alert("");
		if(PostList.areaController.get("selected") != undefined ) {
			me.loadItem(appointedPage);	
		} else {
			me.loadStrategy(appointedPage);
		}
	}
	
});

var isStrategyChanged = false;
PostList.detailController = Em.ArrayController.create({
	content:[],
	post:null,
	showDetail:false,
	page:1,
	showPage:false,
	loadDetail:function(id){
//		console.log(id);
		var me = this;
		var url = "../forumManage/getPost";
        var type = "GET";
        var data = "postId="+id ;
//        console.log(data);
        var postDetail_aj=new Aj();
        postDetail_aj.init(type, data, url,function (result){
//        	console.log(result);
        	var post = result.data.post;
        	var replyList = result.data.replyList;
        	var newPost = {
        		id:post.id,
        		areaId:function(areaId){
					var str="";
					switch (post.areaId){
						case 1 : str = "分享区";break;
						case 2 : str = "活动区";break;
						case 3 : str = "申精区";break;
						case 4 : str = "精华区";break;
						case 5 : str = "举报区";break;
					}
					return str;
				}(post.areaId),
        		clickCount:post.clickCount,
        		commentCount:post.commentCount,
        		content:post.content,
        		noted:post.noted,
        		createTime:new Date(post.createTime).toSimpleStr(),
        		updateTime:new Date(post.updateTime).toSimpleStr(),
        		forumId:post.forumId,
        		likeCount:post.likeCount,
        		status:function(status,forumId){
					var str='';
					if (forumId > 0){
						switch (status){
							case 'normal' : str = "正常";break;
							case 'readonly' : str = "禁回帖";break;
							case 'hidden' : str = "禁查看";break;
						}
					}else{
						switch (status){
							case 'normal' : str = "禁查看";break;
							case 'readonly' : str = "禁查看";break;
							case 'hidden' : str = "正常";break;
						}
					}
					return str;
				}(post.status, post.forumId),
        		statusCode:post.statusCode,
        		title:post.title,
        		topId:post.topId,
        		type:function(type,topId){
					var str='';
					switch (type){
						case 'normal' : str="普通";break;
						case 'essential' : str = "精华";break;
					}
					if (topId > 0){
						str += "·置顶";
					}
					return str;
				}(post.type, post.topId),
        		typeCode:post.typeCode,
        		userId:post.userId	
        	};
    		me.set("post",newPost);
    		me.set("showDetail",true);
    		me.set("page",1);
    		me.set("pageCount",result.data.pageCount);//总共多少页
        	if(replyList.length > 0){
        		me.loadReply(replyList);
        		me.set('showPage',true);
        	}else{
        		me.set("content",[]);
        		me.set('showPage',false);
        	}
        });
	},
	loadReply:function(id){
		var me = this;
		var url = "../forumManage/findStrategyType";
        var type = "GET";
        var data = "itemId="+id ;
        var itemDetail_aj=new Aj();
        itemDetail_aj.init(type, data, url,function (result){
        	var item = result.data.item;
        	var newItem = {
        		id:item.id,
        		name:item.name,
        		imageUrl:item.imageUrl,
        		forumId:function(froumId){
					var str="";
					switch (item.forumId){
						case 2013 : str = "IOS-神曲";break;
						case 92013: str = "安卓-神曲";break;
					}
					return str;
				}(item.forumId)
        	};
    		me.set("item",newItem);
    		me.set("showDetail",true);
    		me.set("content",[]);
        });
	},
	loadStrategyType:function(id){
		var me = this;
		var url = "../forumManage/findStrategyType";
        var type = "GET";
        var data = "id="+id ;
        var Ajax = new Aj();
        Ajax.init(type, data, url,function (result){
        	var value = result.data.strategyType;
        	var newStrategyType = {
        		id:value.id,
				name: value.name,
				imageUrl: value.imageUrl,
        		forumId:function(froumId){
					var str="";
					switch (value.forumId){
						case 2013 : str = "IOS-神曲";break;
						case 92013: str = "安卓-神曲";break;
					}
					return str;
				}(value.forumId)
        	};
    		me.set("strategyType",newStrategyType);
    		me.set("showDetail",true);
    		me.set("content",[]);
        });
	},
	savePost:function(){
		var me = this;
		var content = me.post.content;
		var postId = me.post.id;
//		var title = me.post.title;
		var url_str = "../forumManage/savePost";
//		var data='postId='+postId+'&content='+content+'&title='+title;
		var data='postId='+postId+'&content='+content;
		console.log(data);
		var type="POST";
		var reply_aj=new Aj();		
		reply_aj.init(type, data, url_str,function (result){
			if(result.status == 1){
				alert("修改成功");
			}
		});
	},
	saveStrategy :function(){
		var me = this;
		var strategyType = PostList.newAddStrategyController.get("selected").get("id");;
		var postId = me.post.id;
		var url_str = "../forumManage/saveStrategy";
		var data='postId='+postId+'&strategyType='+strategyType;
		console.log(data);
		var type="POST";
		var reply_aj=new Aj();		
		reply_aj.init(type, data, url_str,function (result){
			if(result.status == 1){
				alert("修改成功");
				isStrategyChanged = true;
			}
		});
	},
	close:function(){
		var me = this;
		if(isStrategyChanged == true && isStrategyChanged != undefined) {
			//执行查询的方法
			PostList.itemController.loadUnClassifiedStrategy();
			isStrategyChanged = false;
		}
		
		me.set("showDetail",false);
	},
	reply:function(){
		var content = PostList.ReplyTextArea.inputContent;
		var me = this;
		if(content){
			var postId = me.post.id;
			var userId = '12514';
			var url_str="../forumManage/reply";
		    var type="GET";
		    var data='postId='+postId+'&userId='+userId+'&content='+content;
		    var reply_aj=new Aj();
		    reply_aj.init(type, data, url_str,function (result){
			    if(result.status == 1){
			    	me.loadReply(postId,parseInt(me.get('page')));
		    		alert("回帖成功");
		    	}
		    });
		}else{
			alert("请输入回帖内容");
		}
	},
	cancelNoted:function(){
		var me = this;
		var postId = me.post.id;
		var url_str = "../forumManage/cancelNoted";
		var type = "GET";
		var data='postId='+postId;
		var reply_aj=new Aj();
		    reply_aj.init(type, data, url_str,function (result){
			    if(result.status == 1){
		    		alert("处理完毕");
		    		me.set("showDetail",false);
		    	}
	    });
	},
	setIsNoted:function(){
		var me = this;
		var postId = me.post.id;
		var url_str = "../forumManage/setIsNoted";
		var type = "GET";
		var data='postId='+postId;
		var reply_aj=new Aj();
		    reply_aj.init(type, data, url_str,function (result){
			    if(result.status == 1){
			    	var postId = me.post.id;
			    	me.loadReply(postId,parseInt(me.get('page')));
		    		alert("处理完毕");
		    		me.set("showDetail",false);
		    	}
	    });
	},
	deleteReply:function(view){
		if(confirm("是否将此回帖信息删除?")){
			var me = this;
			var replyId = view.context.id;
			var url_str="../forumManage/deleteReply";
		    var type="GET";
		    var data='replyId='+replyId;
		    var deleteReply_aj=new Aj();
		    deleteReply_aj.init(type, data, url_str,function (result){
			    if(result.status == 1){
			    	var postId = me.post.id;
			    	me.loadReply(postId,parseInt(me.get('page')));
		    		alert('删除成功');
		    	}
		    });
		}
	},
	prevPage:function(){
		var me = this;
		var postId = me.post.id;
		var prevPage = parseInt(me.get('page'));
		prevPage--;
		if(prevPage < 2){
			prevPage = 1;
		}
		me.set("page",prevPage);
		me.loadReply(postId,prevPage);
	},
	nextPage:function(){
		var me = this;
		var postId = me.post.id;
		var nextPage = parseInt(me.get('page'));
		var pageCount = parseInt(me.get('pageCount'));
		nextPage++;
		if(nextPage > pageCount){
			return;
		}
		me.set("page",nextPage);
		me.loadReply(postId,nextPage);
	},
	actionPage:function(view){
		var me = this;
		var postId = me.post.id;
//		console.log(postId);
		var searchPageStr = PostList.SearchTextField.searchBackPage;
     	searchPageStr = searchPageStr == undefined ? "" : searchPageStr;
		var currentPage = parseInt(searchPageStr);
		var pageCount = parseInt(me.get('pageCount'));
		if(currentPage > pageCount){
			return;
		}
		me.set("page",currentPage);
		me.loadReply(postId, currentPage);
	}
	
});

PostList.addPostController = Em.ArrayController.create({
	title:null,
	contentArea:null,
	showTitle:function(){
		alert(1)
	},
	addPost:function(){
		var me = this;
		var url_str="../forumManage/post";
		var type="POST";
		var userId;
		if ($('#post_specifiedUserId').val()){
			userId = $('#post_specifiedUserId').val();
		}else{
			userId = $('#post_userId').val();
		}
		var forumId = PostList.forumController.get("selected").get("id");
		/*if(forumId == 0){
			alert(1)
			$('#showTitle').show()
		}else{
			alert(2)
			$('#showTitle').hide();
		}*/
        var areaId = PostList.areaAddController.get("selected").get("id");
		var content = me.get("contentArea");
		//var title = me.get("title");
		var image = $("#span_img").text();
		var data='forumId='+forumId+'&areaId='+areaId+'&userId='+userId+'&content='+content+'&image='+image; 
		var postList_aj=new Aj();
		if(content){
			postList_aj.init(type, data, url_str,function (result){
				if (result.data.failed){
					alert('发帖失败')
				}else{
					alert('发帖成功')
				}	
			});
		}else{
			alert('请填入完整信息')
		}
		return false;
	}
});

PostList.strategyTypeController = Em.ArrayController.create({
	content:[],
	beginTime:null,
	endTime:null,
	showPage:false,
	showDetail:false,
	addStrategyType:function(){
		var me = this;
		var url_str="../forumManage/addStrategyType";
		var type="POST";
		var forumId = PostList.forumController.get("selected").get("id");
		var name = $("#name").val();
		var imageUrl = $("#span_img").text();
		var data='forumId='+forumId+'&name='+name+'&imageUrl='+imageUrl; 
		var postList_aj=new Aj();
		if(name){
			postList_aj.init(type, data, url_str,function (result){
				if (result.data.failed){
					alert('攻略类型添加失败')
				}else{
					alert('攻略类型添加成功')
				}	
			});
		}else{
			alert('请填入完整信息')
		}
		return false;
	},
	
	deleteStrategyType:function(view){
		var id = view.context.id;
		var url_str="../forumManage/deleteStrategyType";
	    var type="POST";
	    var data='id='+ id;
	    var me = this;
	    var delItem_aj=new Aj();
	    if(confirm("是否将此类型删除?")){
	    	 if(confirm("真的要删除?")){
	    		delItem_aj.init(type, data, url_str,function (result){
	    		if(result.status == 1){
                    me.removeObject(view.context);
	    			alert("删除成功");
	    		}
	    	});
	    	}
		}
	},
	
	loadTypeList:function(){
		var me = this;
        var forumId = PostList.forumController.get("selected").get("id");
        var url = "../forumManage/findStrategyTypeList";
        var type = "POST";
        var data = "forumId="+forumId;
        var ajax=new Aj();
        ajax.init(type, data, url,
        	function (result){
        		var typeList = result.data.strategyTypeList;
        		me.set('content', []);
        		
			    $(typeList).each(function(index,value){
			        var t = PostList.Item.create({
			        	id: value.id,
			        	forumName: value.forumId,
			        	name: value.name,
			        	sequence: value.sequence,
			        	imageUrl: value.imageUrl,
			        });
			        me.pushObject(t);
			    });
        	}
        );
	},
	
	updatePreviousStrategyType:function(view){
		var me = this;
        var id = view.context.id;
        var url = "../forumManage/updateSequenceOfStrategyType";
        //上移传-1
        var offset = "-1";
        var type = "POST";
        var data = "id="+id+"&offset="+offset;
        var ajax=new Aj();
        ajax.init(type, data, url,
            function (result){
        		if (result.data.failed){
					alert('上移失败')
				}else{
					alert('上移完成')
				}	
        	}
        );
	},
	
	updateNextStrategyType: function(view){
		var me = this;
        var id = view.context.id;
        var url = "../forumManage/updateSequenceOfStrategyType";
        //下移传1
        var offset = "1";
        var type = "POST";
        var data = "id="+id+"&offset="+offset;
        var ajax=new Aj();
        ajax.init(type, data, url,
        	function (result){
        		if (result.data.failed){
					alert('下移失败')
				}else{
					alert('下移完成')
				}	
        	}
        );
	},
	
	updateStrategyType: function(view){
		var id = view.context.id;
		PostList.detailController.loadStrategyType(id);
	},
	
	close:function(){
		var me = this;
		me.set("showDetail",false);
	}
});

PostList.orderListController = Em.ArrayController.create({
	content:[],
	page:1,
	orderDetail:null,
	beginTime:null,
	endTime:null,
	showPage:false,
	showDetail:false,
	loadOrder:function(list,page){
		var me = this;
		me.set("content",[]);
		me.set('page',page);
		if(list.length > 0){
			me.set('showPage',true);
		}else{
			me.set('showPage',false);
		}
		if(typeof list == 'object'){
			$(list).each(function(index,value){
		        var t = PostList.OrderList.create({
		        	appId:value.appId,
		        	createTime:new Date(value.createTime).toSimpleStr(),
		        	deliveryInfoBase64:value.deliveryInfoBase64,
		        	deliveryResult:function(status){
						var str="";
						switch (status){
							case 0 : str = "未投递";break;
							case 1 : str = "首次即投递成功";break;
							case 2 : str = "进行投递成功";break;
							case 3 : str = "投递失败,等待重新投递";break;
							case 4 : str = "投递失败次数过多,终止投递";break;
						}
						return str;
					}(value.deliveryResult),
		        	deliveryUrl:value.deliveryUrl,
		        	id:value.id,
		        	productId:value.productId,
		        	receipt:value.receipt,
		        	sandBox:value.sandBox,
		        	serverId:value.serverId,
		        	status:function(status){
						var str="";
						switch (status){
							case 0 : str = "准备开始";break;
							case 1 : str = "已经开始,<br/>收据验证通过,已经开始后续操作";break;
							case 2 : str = "已经结束,收据验证未通过,操作终止";break;
							case 3 : str = "需要进行恢复,收据验证时,出现网络错误或其他系统错误";break;
							case 4 : str = "已经结束,收据验证失败次数过多,操作终止";break;
						}
						return str;
					}(value.status),
		        	transactionId:value.transactionId,
		        	udid:value.udid,
		        	userId:value.userId,
		        	userToken:value.userToken,
		        	verifyCount:value.verifyCount,
		        	verifyTime:new Date(value.verifyTime).toSimpleStr()
		        });
				me.pushObject(t);
			});
		}
	},
	findFailedOrderList:function(){
		var me = this;
		if($('#beginTime').val() && $('#endTime').val()){
			var url_str="../orderManage/failedOrderList";
			var type="POST";
			var beginTime = $('#beginTime').val();
			var endTime = $('#endTime').val();
			var data = "beginTime="+beginTime+"&endTime="+endTime;
			var ajaxSend=new Aj();
			ajaxSend.init(type, data, url_str,
				function (result){
					if (result.status=='1'){
						var orderList = result.data.orderList;
						var page = result.data.page;
						me.loadOrder(orderList,page);
					}else{
						alert("error");
					}
				}
			);
		}else{
			alert('有未选择项');
		}
		return false;
	},
	findByUserId:function(){
		var me = this;
		var searchStr = $('#userIdOrEmail').val();
		var	isEmail = (searchStr.search("^(?:\\w+\\.?)*\\w+@(?:\\w+\\.?)*\\w+$") == 0);
		var isNumber = (searchStr.search("^-?\\d+$") == 0);
		
		var data;
		if(isNumber) {
			data = "userId=" + searchStr +"&email=";
		} else if(isEmail) {
			data = "userId="+"&email="+ searchStr;
		}else {
			alert("请输入用户id或者email！");
		} 		
		
//		if(!$('#userId').val() && !$('#email').val()){
//			alert('有未选择项');
//			return false;
//		}
		var url_str="../orderManage/orderListByUser";
		var type="POST";
//		var email = $('#email').val();
//		var userId = $('#userId').val();
//		var data = "userId="+userId+"&email="+email;
		var ajaxSend=new Aj();
		ajaxSend.init(type, data, url_str,
			function (result){
				if (result.status=='1'){
					var orderList = result.data.orderList;
					var page = result.data.page;
					me.loadOrder(orderList,page);
				}else{
					alert("error");
				}
			}
		);
		return false;
	},
	prevPage:function(view){
		var me = this;
		var postId = me.postId;
		var prevPage = parseInt(me.get('page'));
		prevPage--;
		if(prevPage < 2){
			prevPage = 1;
		}
		me.set("page",prevPage);
		me.loadReply(postId,prevPage);
	},
	nextPage:function(view){
		var me = this;
		var postId = me.postId;
		console.log(postId);
		var nextPage = parseInt(me.get('page'));
		var pageCount = parseInt(me.get('pageCount'));
		nextPage++;
		if(nextPage > pageCount){
			return;
		}
		me.set("page",nextPage);
		me.loadReply(postId,nextPage);
	},
	getOrder:function(view){
		var me = this;
		var url_str="../orderManage/getOrder";
		var type="POST";
		var id = view.context.id;
		var data = "orderId="+id; 
		var ajaxSend=new Aj();
		ajaxSend.init(type, data, url_str,function(result){
			if(result.status == 1){
				var orderDetail = result.data.orderDetail;
				me.set("orderDetail",orderDetail);
				me.set("showDetail",true);
			}
		});
	},
	recoverOrder:function(view){
		var me = this;
		var url_str="../orderManage/recoverOrder";
		var type="POST";
		var id = view.context.id;
		var data = "orderId="+id; 
		var ajaxSend=new Aj();
		ajaxSend.init(type, data, url_str,function(result){
			if(result.status == 1){
				alert("重新发货成功")
			}
		});
	},
	close:function(){
		var me = this;
		me.set("showDetail",false);
	}
});

PostList.vipController = Em.ArrayController.create({
	content:[],
	vipData:null,
	setVip:function(){
		var me = this;
		if($('#vipCreateTime').val() && $('#vipExpireTime').val()){
			var url_str="../manage/setVip";
			var type="POST";
			var createTime = $('#vipCreateTime').val();
			var expireTime = $('#vipExpireTime').val();
			
			var data = "createTime="+createTime+"&expireTime="+expireTime;
			if ($('#vipUserId').val()){
				var userId = $('#vipUserId').val();
				data+="&userId="+userId;
			}else if ($('#email').val()){
				var email = $('#email').val();
				data+="&email="+email;
			}else{
				alert('必须填写邮箱或用户id');
			}
			var ajaxSend=new Aj();
			ajaxSend.init(type, data, url_str,
				function (result){
					if (result.status=='1'){
						var vip = result.data.vipUser;
						me.set("vipData",vip);
					}else{
						alert(result.message);
					}
				}
			);
		}else{
			alert('有未选择项');
		}
		return false;
	},
	getVipByUserId:function(){
		var me = this;
		if(!$('#vipUserId').val() && !$('#email').val()){
			alert('必须填写email或用户id');
		}else{
			var data = "";
			if($('#vipUserId').val()){
				var userId = $('#vipUserId').val();
				data = "userId="+userId;
			}else{
				var email = $('#email').val();
				console.log("email");
				console.log(email);
				data = "email="+email;
			}
			var url_str="../manage/getVipByUserId";
			var type="POST";
			
			var ajaxSend=new Aj();
			ajaxSend.init(type, data, url_str,
				function (result){
					if (result.status=='1'){
						var vip = result.data.vipUser;
						me.set("vipData",vip);
					}else{
						alert(result.message);
					}
				}
			);
		}
		return false;
	}
	
});

PostList.userPostController = Em.ArrayController.create({
	content:[],
	showPage:false,
	page:1,
	userData:null,
	postListData:null,
	getPostByUserId:function(page){
		var me = this;
			var url_str="../forumManage/getPostByUserId";
			var type="POST";
			var searchStr = PostList.SearchTextField.searchIdOrEmail;
			if(searchStr == "") {
				alert("請輸入要查詢的用戶ID或Email")
			}
			var	isEmail = (searchStr.search("^(?:\\w+\\.?)*\\w+@(?:\\w+\\.?)*\\w+$") == 0);
			var isNumber = (searchStr.search("^-?\\d+$") == 0);
			var　pageNum = typeof page == 'object' ? 1 : page;
			
			var data;
			if(isNumber) {
				data = "userId=" + searchStr +"&email= "+"&page="+pageNum;
			} else if(isEmail) {
				data = "userId= "+"&email= "+ searchStr +"&page="+pageNum;
			} else {
				alert("请输入正确的用户ID或Email");
		        return false;
			}; 
			
      
			var ajaxSend=new Aj();
			ajaxSend.init(type, data, url_str,function (result){
					if (result.status=='1'){
						var user = result.data.user;
						var postList = result.data.postList;
		        		for(i in postList) {
		        			if(postList[i] != undefined)
		        			postList[i]["nickName"] = user.nickname;
		        		};
						me.set('content', []);
		        		me.set('page',result.data.page);
		        		me.set('pageCount',result.data.pageCount);
		        		if(postList.length > 0){
		        			me.set('showPage',true);
		        		}else{
		        			me.set('showPage',false);
		        		}
		        		 $(postList).each(function(index,value){
						        var t = PostList.Item.create({
						        	noted: value.noted,
						        	id: value.id,
						        	forumName: value.forumId,
						        	areaName: value.areaId,
						        	nickName: value.nickName,
								    userId:value.userId,
						        	title: value.title,
						        	content: value.content,
						        	createTime: new Date(value.createTime).toSimpleStr(),
						        	updateTime: new Date(value.updateTime).toSimpleStr(),
						        	zipImage: value.zipImage,
						        	realZipImage: function(data) {
						        		var imageUrl = "";
						        		var frontend = "";
						        		var backend = "";
						        		if(data!=null &&　data!=undefined) {
						        			frontend = data.substring(0, data.lastIndexOf("thumbnail")); 
						        			backend = data.substring(data.lastIndexOf("thumbnail")+10 , data.length);
						        			imageUrl = frontend + backend;
						        		}
						        		return imageUrl;
						        	}(value.zipImage)
						        });
					    me.pushObject(t);
		        	 });
					}else{
						alert(result.message+":"+result.detail);
					}
			});
			return false;
		},
		viewUserByUserId:function(page){  
			var me = this;
				var url_str="../forumManage/viewUserByUserId";
				var type="POST";
				var userId = $('#vipUserId').val();
				 if(typeof page == 'object'){
		        	 var pageNum = 1;
		        }else{
		        	 var pageNum = page;
		        }
				var data = "userId="+userId;
				var ajaxSend=new Aj();
				ajaxSend.init(type, data, url_str,function (result){
						if (result.status=='1'){
							console.log(url_str);
							var user = result.data.user;
							var headImageStr = result.data.headImageStr;
							me.set("userData",user);  //用户信息
							me.set("headImageStr",headImageStr);
						}else{
							alert(result.message+":"+result.detail);
						}
				});
				return false;
			},
		updUserByUserId:function(page){
			if(confirm("是否将此头像替换为默认头像?")){
				var me = this;
				var url_str="../forumManage/updUserByUserId";
				var type="POST";
				var userId = $('#vipUserId').val();
				 if(typeof page == 'object'){
		        	 var pageNum = 1;
		        }else{
		        	 var pageNum = page;
		        }
				var data = "userId="+userId ;
				var ajaxSend=new Aj();
				ajaxSend.init(type, data, url_str,function (result){
						if (result.status=='1'){
							console.log(url_str);
							var user = result.data.user;
							var headImageStr = result.data.headImageStr;
							me.set("userData",user);  //用户信息
							me.set("headImageStr",headImageStr);
						}else{
							alert(result.message+":"+result.detail);
						}
				});
				return false;
			}
		},
		prevPage:function(){
			var me = this;
			var prevPage = parseInt(me.get('page'));
			prevPage--;
			if(prevPage < 2){
				prevPage = 1;
			}
			me.getPostByUserId(prevPage);
		},
		nextPage:function(){
			var me = this;
			var nextPage = parseInt(me.get('page'));
			var pageCount = parseInt(me.get('pageCount'));
			nextPage++;
			if(nextPage > pageCount){
				return;
			}
			me.getPostByUserId(nextPage);
		}
	
});


PostList.dauController = Em.ArrayController.create({
	appId:"",
	timeStr:"",
	showInputTime:false,
	content:[],
	beginDauStat:function(){
		var me = this;
		if(!$('#beginTime').val() || !$('#endTime').val() || !$('#appId').val()){
			alert('必须填写起止时间和应用Id');
		}
		var beginTime = $('#beginTime').val();
		var endTime = $('#endTime').val();
		var appId = $('#appId').val();
		
		var url_str="../statistics/beginDauStat";
		var type="POST";
		
		var data = "beginTime="+beginTime+"&endTime="+endTime+"&appId="+appId;
		console.log(data);
		var ajaxSend=new Aj();
		ajaxSend.init(type, data, url_str,
			function (result){
				console.log(result);
			}
		);
		return false;
	},
	getDauList: function(){
		var me = this;
		me.set("content",[]);
		if(!$('#beginTime').val() || !$('#endTime').val() || !$('#appId').val()){
			alert('必须填写起止时间和应用Id');
		}
		var beginTime = $('#beginTime').val();
		var endTime = $('#endTime').val();
		var appId = $('#appId').val();
		
		var url_str="../statistics/getDauList";
		var type="POST";
		var data = "beginTime="+beginTime+"&endTime="+endTime+"&appId="+appId;
		console.log(data);
		var ajaxSend=new Aj();
		ajaxSend.init(type, data, url_str,
			function (result){
				console.log(result);
				me.set('appId',appId);
				var dauList = result.data.dauList;
				$(dauList).each(function(index,value){
					var t = PostList.Item.create({
						timeStr: new Date(value.time).toSimpleStr(),
						dau: value.intValue
					});
					me.pushObject(t);
				});	
			}
		);
		return false;
	},
	getPeriodDau: function(){
		var me = this;
		me.set("content",[]);
		if(!$('#beginTime').val() || !$('#endTime').val()){
			alert('必须填写起止时间');
			return;
		} 
		if($("#beginTime").val() > new Date().toSimpleStr() || $('#endTime').val() < $("#beginTime").val()){
			alert('开始时间或者结束时间不合法,请重新输入！');
			return;
		}
		var beginTime = $('#beginTime').val();
		var endTime = $('#endTime').val();
		
		var url_str="../statistics/getPeriodDau";
		var type="POST";
		var data = "beginTime="+beginTime+"&endTime="+endTime;
		var ajaxSend=new Aj();
		ajaxSend.init(type, data, url_str,
			function (result){
				me.set("showInputTime",true);
				me.set('timeStr',beginTime+"--"+endTime);
				var dau = result.data.dau;
				if(dau == 0){
					alert("There is no data");
				}
				$(dau).each(function(index,value){
					var t = PostList.userPerioddau.create({
						dau: value
					});
					me.pushObject(t);
				});
			}
		);
		return false;
	}
	
});

PostList.statController = Em.ArrayController.create({
	content:[],
	getReplyPost:function(){
		var me = this;
		me.set("content",[]);
		if(!$('#beginTime').val() || !$('#endTime').val() || !$('#statNum').val()){
			alert('必须填写起止时间,指定排名');
			return;
		} 
		if($("#beginTime").val() > new Date().toSimpleStr() || $('#endTime').val() < $("#beginTime").val() || $('#endTime').val() > new Date().toSimpleStr()){
			alert('开始时间或者结束时间不合法,请重新输入！');
			return;
		}
		var beginTime = $('#beginTime').val();
		var endTime = $('#endTime').val();
		var num = $('#statNum').val();
		var isReplyTimeLimited = $("#isReplyTimeLimited:checked").val();  
		isReplyTimeLimited = isReplyTimeLimited == undefined ? false : isReplyTimeLimited;
		var forumId = PostList.forumController.get("selected").get("id");
		var searchTxt = $('#searchTxt').val();
		var customerServId = $('#customerServId').val();
			if(customerServId == ""){
				customerServId = 0;
			}
		var url_str = "";
		var type="POST";
		var data = "beginTime="+beginTime+"&endTime="+endTime+"&num="+num+"&isReplyTimeLimited="+isReplyTimeLimited+"&customerServId="+customerServId
			+"&forumId="+forumId;
		if(searchTxt == "")
		{
			url_str = "../statistics/replyPostRank";
		}else{
			data += "&searchTxt="+searchTxt;
			url_str = "../statistics/replyPostByKeyWordsRank";
		}
		console.log(data);
		var ajaxSend=new Aj();
		ajaxSend.init(type, data, url_str,
			function (result){
				var rankedResult = result.data.rankedResult;
				if(rankedResult.length == 0){
					alert("There is no data");
				}else{
					alert("query successful!");
				}
			
				$(rankedResult).each(function(index,value){
					var t = PostList.Item.create({
						postId: value.id,
						replyNum: value.commentCount,
						content:value.content
					});
					me.pushObject(t);
				});	
			}
		);
		return false;
	},
	getMostPostUser:function(){
		var me = this;
		me.set("content",[]);
		if(!$('#beginTime').val() || !$('#endTime').val() || !$('#num').val()){
			alert('必须填写起止时间,指定排名');
			return;
		} 
		if($("#beginTime").val() > new Date().toSimpleStr() || $('#endTime').val() < $("#beginTime").val() || $('#endTime').val() > new Date().toSimpleStr()){
			alert('开始时间或者结束时间不合法,请重新输入！');
			return;
		}
		var forumId = PostList.forumDefaultController.get("selected").get("id");
		var areaId = PostList.areaDefaultController.get("selected").get("id");
		var beginTime = $("#beginTime").val();
		var endTime = $("#endTime").val();
		var num = $("#num").val();
		var type = "POST";
		var url = "../statistics/mostPostUser";
		var data = "beginTime="+beginTime+"&endTime="+endTime+"&num="+num+"&forumId="+forumId+"&areaId="+areaId;
		var ajaxSend_aj = new Aj();
		ajaxSend_aj.init(type, data, url, 
			function(result){
				var userIdAndCountList = result.data.userIdAndCountList;
				$(userIdAndCountList).each(function(index,value){
					var t = PostList.Item.create({
						userId: value.userId,
						postNum: value.count,
					});
					me.set('timeStr',beginTime+"---"+endTime);
					me.pushObject(t);
				});	
			
			}
		);
		return false;	
	},
});						

PostList.userController = Em.ArrayController.create({
	content:[],
	user:null,
	showDetail:false,
	page:1,
	showPage:false,
	getUserByUserId:function(view){
		var me = this;
		me.set("content",[]);
		var forumId = PostList.forumDefaultController.get("selected").get("id");
		var areaId = PostList.areaDefaultController.get("selected").get("id");
		var beginTime = $("#beginTime").val();
		var endTime = $("#endTime").val();
		var userId = view.context.userId;
		var data = "userId="+userId+"&beginTime="+beginTime+"&endTime="+endTime+"&forumId="+forumId+"&areaId="+areaId;
		var url = "../manage/findUserByUserId";
		var type = "POST";
		var ajaxSend_aj = new Aj();
		ajaxSend_aj.init(type, data, url, 
			function(result){
				var user = result.data.user;
	        	var postList = result.data.postList;
	        	var newUser = {
	        		id:user.id,
	        		gender:function(gender){
						var str="";	
						switch (user.gender){
						case 0 : str = "男";break;
						case 1 : str = "女";break;
						case 2 : str = "未知";break;
		        		}
						return str;
	        		}(user.gender),
	        		nickName:user.nickname,
	        		email:user.email,
	        		score:user.score,
	        		scoreLevel:user.scoreLevel,
	        		lastLoginTime:new Date(user.lastLoginTime).toSimpleStr(),
	        		status:function(status){
	        			var str="";
	        			switch(user.status){
	        			case 0 : str = "正常";break;
	        			case 1 : str = "禁言";break;
	        			}
	        		}(user.status),
	        		
	        	};
	        		me.set("data",data);
					me.set("user",newUser);
		    		me.set("showDetail",true);
		    		me.set("page",1);
		    		me.set("pageCount",result.data.pageCount);//总共多少页
		        	if(postList.length > 0){
		        		me.loadPost(postList);
		        		me.set('showPage',true);
		        	}else{
		        		me.set("content",[]);
		        		me.set('showPage',false);
		        	}	
			}
		);
		return false;	
	},
	loadPost:function(postList,page){
		var me = this;
		if(typeof postList == 'object'){
			me.set("content",[]);
			$(postList).each(function(index,value){
		        var t = PostList.Item.create({
		        	id:value.id,
		        	content:value.content,
		        	forumId:value.forumId,
		        	areaId:function(areaId){
						var str="";
						switch (value.areaId){
							case 1 : str = "分享区";break;
							case 2 : str = "活动区";break;
							case 3 : str = "申精区";break;
							case 4 : str = "精华区";break;
							case 5 : str = "举报区";break;
						}
						return str;
					}(value.areaId),
	        		clickCount:value.clickCount,
	        		updateTime:new Date(value.updateTime).toSimpleStr(),
	        		status:function(status,forumId){
						var str='';
						if (forumId > 0){
							switch (status){
								case 'normal' : str = "正常";break;
								case 'readonly' : str = "禁回帖";break;
								case 'hidden' : str = "禁查看";break;
							}
						}else{
							switch (status){
								case 'normal' : str = "禁查看";break;
								case 'readonly' : str = "禁查看";break;
								case 'hidden' : str = "正常";break;
							}
						}
						return str;
					}(value.status, value.forumId),
		        });
				me.pushObject(t);
			});
		}else{
			var data = postList;
			if(typeof page == 'object'){
	        	 var pageNum = 1;
	        }else{
	        	 var pageNum = page;
	        }
			var url_str="../manage/findUserByUserId";
			var type="GET";
		    data = data+"&page="+pageNum;
		    var getPost_aj=new Aj();
		    getPost_aj.init(type, data, url_str,function (result){
		    	var postList = result.data.postList;
		    	me.loadPost(postList)
		    });
		}
	},
	close:function(){
		var me = this;
		me.set("showDetail",false);
	},
	prevPage:function(){
		var me = this;
		var data = me.data;
		var prevPage = parseInt(me.get('page'));
		prevPage--;
		if(prevPage < 2){
			prevPage = 1;
		}
		me.set("page",prevPage);
		me.loadPost(data, prevPage);
	},
	nextPage:function(){
		var me = this;
		var data = me.data;
		var nextPage = parseInt(me.get('page'));
		var pageCount = parseInt(me.get('pageCount'));
		nextPage++;
		if(nextPage > pageCount){
			return;
		}
		me.set("page",nextPage);
		me.loadPost(data,nextPage);
	},
	actionPage:function(view){
		var me = this;
		var data = me.data;
		var searchPageStr = PostList.SearchTextField.searchBackPage;
     	searchPageStr = searchPageStr == undefined ? "" : searchPageStr;
		var currentPage = parseInt(searchPageStr);
		var pageCount = parseInt(me.get('pageCount'));
		if(currentPage > pageCount){
			return;
		}
		me.set("page",currentPage);
		me.loadPost(data, currentPage);
	}
});
