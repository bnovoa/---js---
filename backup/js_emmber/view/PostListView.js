


/**
 * Post列表对象
 * @param postList
 * @returns
 */
function PostListView(){}
PostListView.prototype = {
	/* mapping rule: */
	map : Plates.Map()
		.class('post.id').use('id')
		.class('post.status').use('status')
		.class('post.forumName').use('forumName')
		.class('post.nickName').use('nickName')
		.class('post.title').use('title')
		.class('post.content').use('content')
		.class('post.createTime').use('createTime')
		.class('post.updateTime').use('updateTime')
		.class('post.js_detail').use('js_detail').as('onclick')
		.class('post.top').use('top').as('onclick')
		.class('post.removeTop').use('removeTop').as('onclick')
		.class('post.essential').use('essential').as('onclick')
		.class('post.removeEssential').use('removeEssential').as('onclick')
		.class('post.delete').use('delete').as('onclick'),
	footerMap : Plates.Map()
		.class('post.pageNow').use('pageNow')
		.class('post.prev').use('prev').as('onclick')
		.class('post.next').use('next').as('onclick'),
	/* template: */
	header:
		'<table>'+
			'<tr align="center">'+
				'<td class="id_width">帖子id</td>'+
				'<td class="status_width">状态</td>'+
				'<td class="forum_width">论坛</td>'+
				'<td class="nickname_width">用户昵称</td>'+
				'<td class="title_width">标题</td>'+
				'<td class="content_width">内容节选</td>'+
				'<td class="create_width">发帖时间</td>'+
				'<td class="update_width">更新时间</td>'+
				'<td class="operate_width">操作</td>'+
			'</tr>'
	,
	html: 
			'<tr>'+
				'<td class="post.id">id</td>'+
				'<td class="post.status">status</td>'+
				'<td class="post.forumName">1</td>'+
				'<td class="post.nickName">1</td>'+
				'<td class="post.title">1</td>'+
				'<td><p class="post.content"></p></td>'+
				'<td class="post.createTime">1</td>'+
				'<td class="post.updateTime">1</td>'+
				'<td><a href="javascript:;" class="post.js_detail" onclick="">查看详情</a><br/>'+
				'<a href="javascript:;" class="post.top" onclick="">置顶</a><br/>'+
				'<a href="javascript:;" class="post.removeTop" onclick="">取消置顶</a><br/>'+
				'<a href="javascript:;" class="post.essential" onclick="">加精</a><br/>'+
				'<a href="javascript:;" class="post.removeEssential" onclick="">取消加精</a><br/>'+
				'<a href="javascript:;" class="post.delete" onclick="">删除</a></td>'+
			'</tr>'
	,	
	footer:
		'</table>'+
		'<div id="page">'+
			'<a href="javascript:;" class="post.prev" onclick="">&lt;&lt;&lt;上一页</a>'+
			'&nbsp;&nbsp;&nbsp; 第 <span class="post.pageNow">1</span> 页 &nbsp;&nbsp;&nbsp;'+
			'<a href="javascript:;" class="post.next" onclick="">下一页&gt;&gt;&gt;</a>'+
		'</div>'
	,
	show:function(postList,page){
		this._postList = postList;
		this._page = page;
		return this;
	}
	,
	withDetail:function(postDetailView){
		this._postDetailView = postDetailView;
		return this;
	}
	,
	on:function(node){
		var viewDataList = this.createView(this._postList);
		var pageData = this.createFooter(this._page);
		node.html(this.header + Plates.bind(this.html, viewDataList, this.map) + Plates.bind(this.footer, pageData, this.footerMap));
		return this;
	}
	,
	/* mapping model */
	createView:function (postList){
		var viewDataList = new Array();
		for(i = 0; i < postList.length; i++){
			var createTime = new Date(postList[i].createTime);
			var updateTime = new Date(postList[i].updateTime);
			viewDataList[i] = 
			{
				"id":postList[i].id,
				"status":function(status,type,topId){
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
				}(postList[i].status, postList[i].type, postList[i].topId),
				"forumName":postList[i].forumId,
				"nickName": postList[i].user ? postList[i].user.nickname : " ",
				"title":postList[i].title,
				/*content 很长怎么处理 */
				"content":postList[i].content,
				"createTime":createTime.toSimpleStr(),
				"updateTime":updateTime.toSimpleStr(),
				"js_detail":"postListView.getPost("+postList[i].id+")",
				"top":"postListView.addTop("+postList[i].id+")",
				"removeTop":"postListView.removeTop("+postList[i].id+")",
				"essential":"postListView.addEssential("+postList[i].id+")",
				"removeEssential":"postListView.removeEssential("+postList[i].id+")",
				"delete":"postListView.deleteItem("+postList[i].id+")"
			};
		}
		return viewDataList;
	},
	createFooter:function(page){
		var pageData = {
			"pageNow":page,
			"prev":"postListView.prev("+page+")",
			"next":"postListView.next("+page+")"
		};
		return pageData;
	},
	prev:function(page){
		var prevPage = parseInt(page);
		prevPage--;
		if(prevPage < 2){
			prevPage = 1;
		}
		queryPostList(prevPage);
	},
	next:function(page){
		var nextPage = parseInt(page);
		nextPage++;
		queryPostList(nextPage);
	},
	getPost:function(id){
		var url_str="../forumManage/getPost";
	    var type="GET";
	    var data='postId='+ id;
	    var $this = this;
	    var getPost_aj=new Aj();
	    getPost_aj.init(type, data, url_str,
	    	function (result){
	    		$this._postDetailView.show(result.data).onDefault();
	    	}
	    );
	},
	addTop:function(id){
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
	removeTop:function(id){
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
	addEssential:function(id){
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
	removeEssential:function(id){
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
	deleteItem:function(id){
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
}

/**
 * Post明细展示对象
 * @param postList
 * @returns
 */
function PostDetailView(postList){}
PostDetailView.prototype = {
		/* mapping rule: */
		map: Plates.Map()
			.class('detail.areaId').use('areaId')
			.class('detail.clickCount').use('clickCount')
			.class('detail.commentCount').use('commentCount')
			.class('detail.content').use('content')
			.class('detail.createTime').use('createTime')
			.class('detail.forumId').use('forumId')
			.class('detail.id').use('id')
			.class('detail.likeCount').use('likeCount')
			.class('detail.status').use('status')
			.class('detail.statusCode').use('statusCode')
			.class('detail.title').use('title')
			.class('detail.topId').use('topId')
			.class('detail.type').use('type')
			.class('detail.typeCode').use('typeCode')
			.class('detail.updateTime').use('updateTime')
			.class('detail.userId').use('userId')
			.class('detail.image').use('image').as('href')
			.class('detail.zipImage').use('zipImage').as('src')
		,
		replyMap:Plates.Map()
			.class('reply.id').use('id')
			.class('reply.content').use('content')
			.class('reply.user').use('username')
			.class('reply.cId').use('postId')
			.class('reply.delete').use('delete').as('onclick')
		,
		footerMap: Plates.Map()
			.class('detail.close').use('close').as('onclick')
			.class('detail.reply').use('reply').as('onclick')
		,
		/* template: */
		template: 
			'<div class="detail_view" id="detailView">'+
				'<div class="box_outer" id="boxOuter">'+
					'<table class="detail_table">'+
						'<tr><td width="100">标题</td><td class="detail.title"></td></tr>'+
						'<tr><td width="100">内容</td><td class="detail.content"></td></tr>'+
						'<tr><td width="100">板块</td><td class="detail.areaId"></td></tr>'+
						'<tr><td width="100">点击数</td><td class="detail.clickCount"></td></tr>'+
						'<tr><td width="100">评论数</td><td class="detail.commentCount"></td></tr>'+
						'<tr><td width="100">发帖时间</td><td class="detail.createTime"></td></tr>'+
						'<tr><td width="100">更新时间</td><td class="detail.updateTime"></td></tr>'+
						'<tr><td width="100">论坛Id</td><td class="detail.forumId"></td></tr>'+
						'<tr><td width="100">赞</td><td class="detail.likeCount"></td></tr>'+
						'<tr><td width="100">状态</td><td class="detail.status"></td></tr>'+
						'<tr><td width="100">类型</td><td class="detail.type"></td></tr>'+
						'<tr><td width="100">userId</td><td class="detail.userId"></td></tr>'+
						'<tr><td width="100">图片</td><td><a href="javascript:;" target="_blank" class="detail.image" title="点击查看全图"><img class="detail.zipImage" alt="缩略图" src="#"></a></td></tr>'+
						
						'<tr><td colspan="2"><table width="100%" class="reply_table">'+
							'<tr><td>序号</td><td>内容</td><td>回帖人</td><td>社区ID</td><td>操作</td></tr>'
		,		
		replyHtml:
							'<tr>'+
								'<td class="reply.id">1</td>'+
								'<td><p class="reply.content">aaa</p></td>'+
								'<td class="reply.user">name</td>'+
								'<td class="reply.cId">社区ID</td>'+
								'<td><a href="javascript:;" class="reply.delete" onclick="">删除</a></td>'+
							'</tr>'
		,
		footerHtml:
						'</table></td></tr>'+
						'<tr><td width="100">回帖操作</td><td><textarea class="replycentent"></textarea><br/><button class="detail.reply" onclick="">回帖</button></td></tr>'+
					'</table>'+
					'<button class="detail.close" style="display:block;margin:20px auto;" onclick="">关闭</button>'+
				'</div>'+
			'</div>'
		,
		setDefaultNode:function(node){
			this._defaultNode = node;
			return this;
		}
		,
		show:function(data){
			this._post = data.post;
			this._replyList = data.replyList;
			return this;
		}
		,
		onDefault:function(){
			return this.on(this._defaultNode);
		}
		,
		on:function(node){
			var viewData = this.createView(this._post);
			var replyData = this.createReplyView(this._replyList);
			var footerData = this.createFooterView(this._post);
			node.html(Plates.bind(this.template, viewData, this.map)+Plates.bind(this.replyHtml, replyData, this.replyMap)+Plates.bind(this.footerHtml, footerData, this.footerMap));
			return this;
		}
		,
		createView: function(post){
//			console.log(post)
			var createTime = new Date(post.createTime);
			var updateTime = new Date(post.updateTime);
			var viewData = {
				"areaId":function(areaId){
					var str="";
					switch (post.areaId){
						case 1 : str = "分享区";break;
						case 2 : str = "活动区";break;
						case 3 : str = "反馈区";break;
						case 4 : str = "精华区";break;
						case 5 : str = "举报区";break;
					}
					return str;
				}(post.areaId),
				"clickCount":post.clickCount,
				"commentCount":post.commentCount,
				"content":post.content,
				"createTime":createTime.toSimpleStr(),
				"forumId":post.forumId,
				"id":post.id,
				"likeCount":post.likeCount,
				"status":function(status){
					var str='';
					switch (status){
						case 'normal' : str = "正常";break;
						case 'readonly' : str = "禁回帖";break;
						case 'hidden' : str = "禁查看";break;
					}
					return str;
				}(post.status),
				"statusCode":post.statusCode,
				"title":post.title,
				"topId":post.topId,
				"type":function(type,topId){
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
				"typeCode":post.typeCode,
				"updateTime":updateTime.toSimpleStr(),
				"userId":post.userId,
				"image":post.image,
				"zipImage":post.zipImage
			};
			return viewData;
		},
		createReplyView:function(replyList){
			var viewDataList = new Array();
			for(var i=0;i<replyList.length;i++){
				viewDataList[i] = {
					"id":replyList[i].id,
					"content":replyList[i].content,
					"username":replyList[i].user.nickname,
					"postId":replyList[i].postId,
					"delete":"postDetailView.replyDelete("+replyList[i].id+")"
				}
			}
			
			return viewDataList;
		},
		createFooterView:function(post){
			var viewData = {
				"close":"postDetailView.close()",
				//"reply":"postDetailView.reply("+post.id+","+post.userId+")"
				//只允许用胡莱客服12514回复
				"reply":"postDetailView.reply("+post.id+",12514)"
			}
			return viewData;
		},
		close:function(defaultNode){
			this._defaultNode.find('#detailView').remove();
			this._defaultNode.find('#boxOuter').remove();
		},
		reply:function(postId,userId){
			var content = $('.replycentent').val();
			if(content){
				var url_str="../forumManage/reply";
			    var type="GET";
			    var data='postId='+postId+'&userId='+userId+'&content='+content;
			    var getPost_aj=new Aj();
			    getPost_aj.init(type, data, url_str,
			    	function (result){
				    	if(result.status == 1){
				    		//TODO
//				    		queryPostList();
			    			alert("回帖成功");
			    		}
			    	}
			    );
			}
		},
		replyDelete:function(replyId){
			if(confirm("是否将此回帖信息删除?")){
				var url_str="../forumManage/deleteReply";
			    var type="GET";
			    var data='replyId='+replyId;
			    var getPost_aj=new Aj();
			    getPost_aj.init(type, data, url_str,
			    	function (result){
				    	if(result.status == 1){
			    			alert('删除成功');
			    		}
			    	}
			    );
			}
			
		}
}


