
Date.prototype.toSimpleStr = function(){
	return this.getFullYear()+'-'+ (this.getMonth()+1) + '-'+this.getDate()+' '+this.getHours()+':'+this.getMinutes()+':'+this.getSeconds();
}

/**************************
* Application
**************************/

CdkeyList = Em.Application.create();

/**************************
* Models
**************************/

CdkeyList.Item = Em.Object.extend({
	id:null,
	name:null,
	forumName:null,
	imageUrl:null
});

CdkeyList.Award = Em.Object.extend({
	id:null,
	itemId:null,
	name:null,
	imageUrl:null,
	num:null,
});

CdkeyList.GiftBag = Em.Object.extend({
	id:null,
	date:null,
	cdkeyNum:null,
	forumId:null,
	awardList:null,
	endTime:null,
});


/**************************
* Views
**************************/

CdkeyList.SearchTextField = Em.TextField.extend({
	placeholder:"输入关键字",
	searchName:null,
	searchId:null,
	searchPage:null,
	insertNewline: function(){
		CdkeyList.itemController.loadItem();
	}
});

CdkeyList.PageTextField = Em.TextField.extend({
	classNames: ['pageTo-text-field'],
	placeholder:"第几页",
	searchPage:null,
    insertNewline: function(){
    	PostList.itemController.loadItem();
    }
});


CdkeyList.forumController = Em.Object.create({
	selected:null,
	content:[
//			Ember.Object.create({name: "IOS-胡莱三国", id: 1}),
//			Ember.Object.create({name: "IOS-胡莱战国", id: 1003}),
			Ember.Object.create({name: "IOS-神曲", id: 2013}),
//			Ember.Object.create({name: "IOS-傲视天地", id: 1006}),
//			Ember.Object.create({name: "IOS-将军", id: 1002}),
//			Ember.Object.create({name: "IOS-各种图", id: 1004}),
//			Ember.Object.create({name: "IOS-卡战三国", id: 1009}),
//			Ember.Object.create({name: "IOS-御剑天涯", id: 2001}),
//			Ember.Object.create({name: "IOS-龙之力量", id: 2002}),
//			Ember.Object.create({name: "IOS-逆转三国", id: 2003}),
//			Ember.Object.create({name: "IOS-神仙道", id: 2004}),
//			Ember.Object.create({name: "IOS-大掌门", id: 2005}),
//			Ember.Object.create({name: "IOS-我叫MT", id: 2006}),
//			Ember.Object.create({name: "IOS-三国来了", id: 2007}),
//			Ember.Object.create({name: "IOS-雄霸天地", id: 2008}),
//			Ember.Object.create({name: "IOS-时空猎人ol", id: 2009}),
//			Ember.Object.create({name: "IOS-魔卡幻想", id: 2010}),
//			Ember.Object.create({name: "IOS-王者之剑", id: 2011}),
//			Ember.Object.create({name: "IOS-保卫萝卜", id: 2012}),
//			Ember.Object.create({name: "过渡-胡莱三国", id: 0}),
//			Ember.Object.create({name: "安卓-胡莱三国", id: 91}),
//			Ember.Object.create({name: "安卓-我叫MT", id: 92006}),
//			Ember.Object.create({name: "安卓-王者之战", id: 92011}),
//			Ember.Object.create({name: "安卓-逆转三国", id: 92003}),
//			Ember.Object.create({name: "安卓-神仙道", id: 92004}),
//			Ember.Object.create({name: "安卓-大掌门", id: 92005}),
//			Ember.Object.create({name: "安卓-保卫萝卜", id: 92012}),
			Ember.Object.create({name: "安卓-神曲", id: 92013}),
	         ]
}); 

/**************************
* Views
**************************/
CdkeyList.detailItemController = Em.ArrayController.create({
	content:[],
	item:null,
	showDetail:false,
	showPage:false,
	loadItem:function(id){
		var me = this;
		var url = "../forumManage/findItem";
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
	updateItem:function(){
		var me = this;
		var itemId = me.item.id;
		var name = me.item.name;
		var imageUrl = me.item.imageUrl;
		var url_str = "../forumManage/updateItem";
		var data='itemId='+itemId+'&name='+name+'&imageUrl='+imageUrl;
		var type="POST";
		var item_aj=new Aj();		
		item_aj.init(type, data, url_str,function (result){
			if(result.status == 1){
				alert("修改成功");
				return false;
			}
		});
	},
	close:function(){
		var me = this;
		me.set("showDetail",false);
	},
});

CdkeyList.detailGiftBagController = Em.ArrayController.create({
	content:[],
	giftBag:null,
	showDetail:false,
	showPage:false,
	loadDailyGiftBag:function(id){
		var me = this;
		var url = "../forumManage/findDailyGiftBag";
        var type = "GET";
        var data = "giftId="+id ;
        var gitBagDetail_aj=new Aj();
        gitBagDetail_aj.init(type, data, url,function (result){
        	var giftBag = result.data.dailyGiftBag;
        	var newDailyGiftBag = {
        		id:giftBag.id,
        		date:new Date(giftBag.lifeCircle).toSimpleStr(),
        		cdkeyNum:giftBag.leftCdkey,
        		awardList:giftBag.awardList,
        		forumId:function(froumId){
					var str="";
					switch (giftBag.forumId){
						case 2013 : str = "IOS-神曲";break;
						case 92013: str = "安卓-神曲";break;
					}
					return str;
				}(giftBag.forumId)
        	};
    		me.set("giftBag",newDailyGiftBag);
    		me.set("showDetail",true);
    		me.set("content",[]);
        });
	},
	updateDailyGiftBag:function(){
		var me = this;
		var giftId = me.gift.id;
		var url_str = "../forumManage/updateDailyGiftBag";
		var data='giftId='+giftId;
		var type="POST";
		var item_aj=new Aj();		
		item_aj.init(type, data, url_str,function (result){
			if(confirm("确定提交？")) {
				if(result.status == 1){
					alert("修改成功");
					return false;
				}
			}
		});
	},
	addCdkey:function(){
		var me = this;
		var type = "POST";
		var giftId = me.giftBag.id;
		var cdkeys = me.giftBag.cdkeys;
		if(cdkeys == ""||cdkeys ==undefined) {
			alert("cdkey不能為空");
			return false;
		}
		var url_str="../forumManage/addCdkey";
		var data = "giftId="+giftId+"&cdkeys="+cdkeys;
		var ajaxSend=new Aj();
		ajaxSend.init(type, data, url_str,
			function (result){
				if(result.data.cdkeyNum>0){
					alert("添加成功");
				};
			}
		);
		return false;
	},
	close:function(){
		var me = this;
		me.set("showDetail",false);
	},
});

CdkeyList.detailAwardController = Em.ArrayController.create({
	content:[],
	award:null,
	showDetail:false,
	showPage:false,
	loadAward:function(id){
		var me = this;
		var url = "../forumManage/findAward";
        var type = "GET";
        var data = "awardId="+id ;
        var awardDetail_aj=new Aj();
        awardDetail_aj.init(type, data, url,function (result){
        	var award = result.data.award;
        	var newAward = {
        		id:award.id,
        		num:award.num,
        		name:award.name,
        		imageUrl:award.imageUrl,
        	};
    		me.set("award",newAward);
    		me.set("showDetail",true);
    		me.set("content",[]);
        });
	},
	updateItem:function(){
		var me = this;
		var itemId = me.item.id;
		var name = me.item.name;
		var imageUrl = me.item.imageUrl;
		var url_str = "../forumManage/updateItem";
		var data='itemId='+itemId+'&name='+name+'&imageUrl='+imageUrl;
		var type="POST";
		var item_aj=new Aj();		
		item_aj.init(type, data, url_str,function (result){
			if(result.status == 1){
				alert("修改成功");
				return false;
			}
		});
	},
	close:function(){
		var me = this;
		me.set("showDetail",false);
	},
});

/**************************
* Controllers
**************************/
CdkeyList.itemController = Em.ArrayController.create({
	content:[],
	page:1,
	showPage:false,
	showItems:false,
	loadItemList:function(page){
		var me = this;
        var searchStr = CdkeyList.SearchTextField.searchName;
        	searchStr = searchStr == undefined ? "" : searchStr;
    	var searchPageStr = CdkeyList.SearchTextField.searchPage;
    		searchPageStr = searchPageStr == undefined ? "" : searchPageStr;
        var forumId = CdkeyList.forumController.get("selected").get("id");
        var url = "../forumManage/itemList";
        var type = "GET";
        if(typeof page == 'object'){
        	var pageNum = 1;
        }else{
        	var pageNum = page;
        }
        var data = "forumId="+forumId+"&searchStr="+searchStr+"&page="+pageNum+"&searchPageStr="+searchPageStr;
        var itemList_aj=new Aj();
        itemList_aj.init(type, data, url,
        	function (result){
        		var itemList = result.data.itemList;
        		me.set('content', []);
        		me.set('page',result.data.page);
        		me.set('pageCount',result.data.pageCount);//总共多少页
        		if(itemList.length > 0){
        			me.set('showPage',true);
        		}else{
        			me.set('showPage',false);
        		};
			    $(itemList).each(function(index,value){
			        var t = CdkeyList.Item.create({
			        	id: value.id,
			        	name: value.name,
			        	forumName:function(froumId){
							var str="";
							switch (forumId){
								case 2013 : str = "IOS-神曲";break;
								case 92013: str = "安卓-神曲";break;
							}
							return str;
						}(value.forumId),			        
						imageUrl: value.imageUrl,
			        });
			        me.pushObject(t);
			    });
			    me.set('showItems',true);
        	}
        );
	},
	addItem:function(){
		var me = this;
		var forumId = CdkeyList.forumController.get("selected").get("id");
		var itemName = $("#itemName").val();
		var imgUrl = $("#span_img").text();	
		if(!itemName){
			alert("必须输入道具名称");
			return;
		}
		if(imgUrl == "上传失败"){
			alert("请先上传图片！");
			return;
		}
		var type = "POST";
		var url = "../forumManage/addItem";
		var data = "forumId="+forumId+"&itemName="+itemName+"&imgUrl="+imgUrl;
		var itemAdd_aj = new Aj();
		itemAdd_aj.init(type, data, url, 
			function (result){
				if(result.status==1){
					alert("道具添加成功");
				}
			}
		);
		return false;
	},
	loadAllItemList:function(page){
		var me = this;
        var forumId = CdkeyList.forumController.get("selected").get("id");
        var url = "../forumManage/loadAllItemList";
        var data = "forumId="+forumId;
        var itemList_aj=new Aj();
        var type = "POST";
        itemList_aj.init(type, data, url,
        	function (result){
        		var itemList = result.data.itemList;
        		me.set('content', []);
			    $(itemList).each(function(index,value){
			        var t = CdkeyList.Item.create({
			        	id: value.id,
			        	name: value.name,
			        	forumName:function(froumId){
							var str="";
							switch (forumId){
								case 2013 : str = "IOS-神曲";break;
								case 92013: str = "安卓-神曲";break;
							}
							return str;
						}(value.forumId),			        
						imageUrl: value.imageUrl,
			        });
			        me.pushObject(t);
			    });
			    me.set('showItems',true);
        	}
        );
	},
	deleteItem:function(view){
		var id = view.context.id;
		var url_str="../forumManage/deleteItem";
	    var type="GET";
	    var data='itemId='+ id;
	    var me = this;
	    var delItem_aj=new Aj();
	    if(confirm("是否将此道具删除?")){
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
	updateItem:function(view){
		var id = view.context.id;
		CdkeyList.detailItemController.loadItem(id);
	},
	prevPage:function(){
		var me = this;
		var prevPage = parseInt(me.get('page'));
		prevPage--;
		if(prevPage < 2){
			prevPage = 1;
		}
		me.loadItemList(prevPage);
	},
	nextPage:function(){
		var me = this;
		var nextPage = parseInt(me.get('page'));
		var pageCount = parseInt(me.get('pageCount'));
		nextPage++;
		if(nextPage > pageCount){
			return;
		}
		me.loadItemList(nextPage);
	},
	appointedPage:function(){
		var me = this;
		var appointedPage = parseInt(me.get('page'));
		me.loadItemList(appointedPage);
	}
});

CdkeyList.giftBagController = Em.ArrayController.create({
	content:[],
	page:1,
	showPage:false,
	showDetail:false,
	loadGiftBagList:function(page){
		var me = this;
        var searchStr = CdkeyList.SearchTextField.searchId;
        	searchStr = searchStr == undefined ? "" : searchStr;
    	var searchPageStr = CdkeyList.SearchTextField.searchPage;
    		searchPageStr = searchPageStr == undefined ? "" : searchPageStr;
        var forumId = CdkeyList.forumController.get("selected").get("id");
        var url = "../forumManage/findDailyGiftBagList";
        var type = "GET";
        if(typeof page == 'object'){
        	var pageNum = 1;
        }else{
        	var pageNum = page;
        }
        var data = "forumId="+forumId+"&searchStr="+searchStr+"&page="+pageNum+"&searchPageStr="+searchPageStr;
        var giftBagList_aj=new Aj();
        giftBagList_aj.init(type, data, url,
        	function (result){
        		var dailyGiftBagList = result.data.dailyGiftBagList;
        		me.set('content', []);
        		me.set('page',result.data.page);
//        		me.set('pageCount',2);   //总共多少页
        		me.set('pageCount',result.data.pageCount);//总共多少页
        		if(dailyGiftBagList.length > 0){
        			me.set('showPage',true);
        		}else{
        			me.set('showPage',false);
        		};
			    $(dailyGiftBagList).each(function(index,value){
			        var t = CdkeyList.GiftBag.create({
			        	id: value.id,
			        	date: new Date(value.lifeCircle).toSimpleStr(),
			        	cdkeyNum: value.leftCdkey,
			        	lackOfCdkey: function(leftCdkey,lifeCircle) {
			        		//今日cdkey已不足，需要补充
			        		var isLack = value.leftCdkey < 200; 
		        		 	var lifeCircle = new Date(value.lifeCircle).toSimpleStr();
		        		 	var slices = lifeCircle.substring(0, 10).split('-');
		        		 	var giftTime = slices[0] + '-' + slices[1] + '-' + slices[2] ;
		        		    var now = new Date();
		        		    var nowTime = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getUTCDate();
		        		    var isToday = (Date.parse(nowTime) - Date.parse(giftTime)) / 3600 / 1000 == 0;
		        		    var isLackToday = isLack&&isToday;
			        		if(isLackToday){
			        			alert("今日cdkey已不足，请补充");
			        		}
			        		return isLackToday;
			        	}(value.leftCdkey,value.lifeCircle),
			        });
			        me.pushObject(t);
			    });
        	}
        );
	},
	loadTimeLimitGiftBagList:function(page){
		var me = this;
	    var searchStr = CdkeyList.SearchTextField.searchId;
	    	searchStr = searchStr == undefined ? "" : searchStr;
		var searchPageStr = CdkeyList.SearchTextField.searchPage;
			searchPageStr = searchPageStr == undefined ? "" : searchPageStr;
	    var forumId = CdkeyList.forumController.get("selected").get("id");
	    var url = "../forumManage/findTimeLimitGiftBagList";
	    var type = "GET";
	    if(typeof page == 'object'){
	    	var pageNum = 1;
	    }else{
	    	var pageNum = page;
	    }
	    var data = "forumId="+forumId+"&searchStr="+searchStr+"&page="+pageNum+"&searchPageStr="+searchPageStr;
	    var giftBagList_aj=new Aj();
	    giftBagList_aj.init(type, data, url,
	    	function (result){
	    		var timeLimitGiftBagList = result.data.timeLimitGiftBagList;
	    		me.set('content', []);
	    		me.set('page',result.data.page);
	//    		me.set('pageCount',2);   //总共多少页
	    		me.set('pageCount',result.data.pageCount);//总共多少页
	    		if(timeLimitGiftBagList.length > 0){
	    			me.set('showPage',true);
	    		}else{
	    			me.set('showPage',false);
	    		};
			    $(timeLimitGiftBagList).each(function(index,value){
			        var t = CdkeyList.GiftBag.create({
			        	id: value.id,
			        	beginTime: new Date(value.beginTime).toSimpleStr(),
			        	endTime: new Date(value.endTime).toSimpleStr(),
			        	cdkeyNum: value.leftCdkey,
			        	lackOfCdkey: function(leftCdkey) {
			        		//cdkey已不足，需要补充
			        		var isLack = value.leftCdkey < 200;
			        		return isLack;
			        	}(value.leftCdkey),
			        });
			        me.pushObject(t);
			    });
	    	}
	    );
	},
	deleteGiftBag:function(view){
		var id = view.context.id;
		var delGiftUrl_str="../forumManage/deleteDailyGiftBag";
		var delGiftAndCdkeyUrl_str="../forumManage/deleteDailyGiftBagAndCdkey";
	    var type="GET";
	    var data='giftId='+ id;
	    var me = this;
	    var getPost_aj=new Aj();
	    if(confirm("是否将此禮包删除?")){
	    	if(confirm("删除禮包会同时删除CDkey,确定删除？"))
     		getPost_aj.init(type, data, delGiftAndCdkeyUrl_str,function (result){
	    		if(result.status == 1){
                    me.removeObject(view.context);
	    			alert("删除成功");
	    		}
	    	});
		}
	},
	updateDailyGiftBag:function(view){
		var id = view.context.id;
		CdkeyList.detailGiftBagController.loadDailyGiftBag(id);
	},
	addGiftBag:function(){
		var me = this;
		var type = "GET";
		if(!$('#beginTime').val()){
			alert('必须填写活动日期');
			return false;
		}
		var beginTime = $('#beginTime').val();
		var endTimeVal = $('#endTime').val();
		var endTime =  endTimeVal == undefined ?  "": $('#endTime').val();
		var forumId = CdkeyList.forumController.get("selected").get("id");
		var url_str="../forumManage/addGiftBag";
		var data = "beginTime="+beginTime+"&endTime="+endTime+"&forumId="+forumId;
		var ajaxSend=new Aj();
		ajaxSend.init(type, data, url_str,
			function (result){
				if(result.data == undefined) {
					alert("该日礼包已存在，请勿重复添加");
					return false;
				}
				var giftBag = result.data.giftBag;
				if(giftBag.lifeCircle){
					$(giftBag).each(function(index,value){
						var t = CdkeyList.GiftBag.create({
							id: value.id,
							forumId: value.forumId,
							beginTime: new Date(value.lifeCircle).toSimpleStr(),
						});
						me.pushObject(t);
						me.set("showDetail",true);
					});			
				} else {
					$(giftBag).each(function(index,value){
						var t = CdkeyList.GiftBag.create({
							id: value.id,
							forumId: value.forumId,
							beginTime: new Date(value.beginTime).toSimpleStr(),
							endTime: new Date(value.endTime).toSimpleStr(),
						});
						me.pushObject(t);
						me.set("showDetail",true);
					});			
				}

			
			}
		);
		return false;
	},
});

CdkeyList.awardController = Em.ArrayController.create({
	content:[],
	page:1,
	showPage:false,
	showDetail:false,
	deleteAward:function(view){
		var id = view.context.id;
		var url_str="../forumManage/deleteAward";
	    var type="GET";
	    var data='awardId='+ id;
	    var me = this;
	    var delItem_aj=new Aj();
	    if(confirm("是否将奖品从礼包中删除?")){
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
	updateAward:function(view){
		var id = view.context.id;
		CdkeyList.detailAwardController.loadAward(id);
	},
	addAward:function(){
		var me = this;
		var type = "GET";
		if(!$('#num').val() || !$('#giftId').val() ||!$('#itemId').val()){
			alert('必须填写礼包ID、道具ID及数量');
			return false;
		}
		var num = $('#num').val();
		var giftId = $('#giftId').val();
		var itemId = $('#itemId').val();
		var url_str="../forumManage/addAward";
		var data = "giftId="+giftId+"&itemId="+itemId+"&num="+num;
		var ajaxSend=new Aj();
		ajaxSend.init(type, data, url_str,
			function (result){
				if(!result.data){
					alert("请勿重复在一个礼包添加同种道具");
					return false;
				}
				var award = result.data.award;
				$(award).each(function(index,value){
					var t = CdkeyList.Award.create({
						id: value.id,
						itemId: value.itemId,
						name: value.name,
						imageUrl: value.imageUrl,
						num: value.num,
						giftId:giftId,
					});
					me.pushObject(t);
					me.set("showDetail",true);
				});	
			}
		);
		return false;
	},
});

CdkeyList.cdkeyController = Em.ArrayController.create({
	content:[],
	page:1,
	showPage:false,
	showDetail:false,
	deleteAward:function(view){
		var id = view.context.id;
		var url_str="../forumManage/deleteAward";
	    var type="GET";
	    var data='awardId='+ id;
	    var me = this;
	    var delItem_aj=new Aj();
	    if(confirm("是否将奖品从礼包中删除?")){
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
	updateAward:function(view){
		var id = view.context.id;
		CdkeyList.detailAwardController.loadAward(id);
	},
});
