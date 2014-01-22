/*
management app

 */

//TODO, = require handlebars

Date.prototype.toSimpleStr = function(){
	return this.getFullYear()+'-'+ (this.getMonth()+1) + '-'+this.getDate()+' '+this.getHours()+':'+this.getMinutes()+':'+this.getSeconds();
}


App = Em.Application.create();
/**************************
* Models
**************************/

/**
 * Post帖子
 */
App.Post = Em.Object.extend({
	id: null,
	status: 'normal',
	forumName: null,
	nickName: null,
	title: null,
	content: null,
	createTime: null,
	updateTime: null
});

/*
				"js_detail":"postListView.getPost("+postList[i].id+")",
				"top":"postListView.addTop("+postList[i].id+")",
				"removeTop":"postListView.removeTop("+postList[i].id+")",
				"essential":"postListView.addEssential("+postList[i].id+")",
				"removeEssential":"postListView.removeEssential("+postList[i].id+")",
				"delete":"postListView.deleteItem("+postList[i].id+")"
*/

/**************************
* Views
**************************/
App.TFView = Em.TextField.extend({
	insertNewline: function(){
		App.postArray.loadPosts();
	}
});

/**************************
* Controllers
**************************/
App.postArray = Em.ArrayController.create({
	content: [],
	forumId: '',
	areaId: '',
	page: 1,
	searchStr: '',
	loadPosts: function() {
		var me = this;
		var forumId = me.get("forumId");
		var areaId = me.get("areaId");
		if (forumId && areaId){
			
//			var url = '../forumManage/postList';
			var url = 'http://localhost:8080/management/forumManage/postList';
		    var type="GET";
		    var data='&forumId='+ me.forumId
		    		+'&areaId='+ me.areaId
		    		+'&searchStr='+ me.searchStr
		    		+"&page=" + me.page;
		    var postList_aj=new Aj();
		    postList_aj.init(type, data, url,
		    	function (result){
		    		me.set('content', []);
		    		
		    		var postList = result.data.postList;
		    		var page = result.data.page;
		    		console.log('postList=');
		    		console.log(postList);
		    		console.log($(postList));
		    		$(postList).each(function(index,post){
		    			var createTime = new Date(post.createTime);
		    			var updateTime = new Date(post.updateTime);
		    			var p = App.Post.create({
		    				id:post.id,
		    				status:function(status,type,topId){
		    					var str='';
		    					switch (status){
		    						case 'normal' : str += "正常";break;
		    						case 'readonly' : str += "禁回帖";break;
		    						case 'hidden' : str += "禁查看";break;
		    					}
		    					switch (type){
		    						case 'normal' : break;
		    						case 'essential' : str += "·精华";break;
		    					}
		    					if (topId > 0){
		    						str += "·置顶";
		    					}
		    					return str;
		    				}(post.status, post.type, post.topId),
		    				forumName:post.forumId,
		    				nickName: post.user ? post.user.nickname : " ",
		    				title:post.title,
		    				/*content 很长怎么处理 */
		    				content:post.content,
		    				createTime:createTime.toSimpleStr(),
		    				updateTime:updateTime.toSimpleStr() 				
		    			});
		    			
		    			me.pushObject(p);
		    		});
		    		
		    		console.log("me.content=");
		    		console.log(me.content);
		    		
		    	}
		    );
		}
		
	},
	
	/***********************
	 * action
	 **********************/
	getPost:function(view){
		var post = view.context;
		
		var id = post.id;
		var url_str="../forumManage/getPost";
	    var type="GET";
	    var data='postId='+ id;
	    var me = this;
	    var getPost_aj=new Aj();
	    getPost_aj.init(type, data, url_str,
	    	function (result){
	    		//TODO:
	    		console.log(result);
	    	}
	    );
	},
	addTop:function(){
		var id = view.context.id;
		var url_str="../forumManage/addTopPost";
	    var type="GET";
	    var data='postId='+ id;
	    var $this = this;
	    var getPost_aj=new Aj();
	    getPost_aj.init(type, data, url_str,
	    	function (result){
	    		if(result.status == 1){
	    			queryPostList($this._page);
	    			alert("置顶成功");
	    		}
	    	}
	    );
	},	
	removeTop:function(){
		var id = view.context.id;
		var url_str="../forumManage/removeTopPost";
	    var type="GET";
	    var data='postId='+ id;
	    var $this = this;
	    var getPost_aj=new Aj();
	    getPost_aj.init(type, data, url_str,
	    	function (result){
		    	if(result.status == 1){
		    		queryPostList($this._page);
	    			alert("取消置顶成功");
	    		}	    	
	    	}
	    );
	},
	addEssential:function(){
		var id = view.context.id;
		var url_str="../forumManage/addEssential";
	    var type="GET";
	    var data='postId='+ id;
	    var $this = this;
	    var getPost_aj=new Aj();
	    getPost_aj.init(type, data, url_str,
	    	function (result){
		    	if(result.status == 1){
		    		queryPostList($this._page);
	    			alert("加精成功");
	    		}
	    	}
	    );
	},
	removeEssential:function(){
		var id = view.context.id;
		var url_str="../forumManage/removeEssential";
	    var type="GET";
	    var data='postId='+ id;
	    var $this = this;
	    var getPost_aj=new Aj();
	    getPost_aj.init(type, data, url_str,
	    	function (result){
		    	if(result.status == 1){
		    		queryPostList($this._page);
	    			alert("取消加精成功");
	    		}
	    	}
	    );
	},
	deleteItem:function(){
		var id = view.context.id;
		var url_str="../forumManage/deletePost";
	    var type="GET";
	    var data='postId='+ id;
	    var $this = this;
	    var getPost_aj=new Aj();
	    
	    if(confirm("是否将此条帖子删除?")){
	    	getPost_aj.init(type, data, url_str,function (result){
	    		if(result.status == 1){
	    			//TODO
	    			queryPostList($this._page);
	    			alert("删除成功");
	    		}
	    	});
		}
	}		
});


