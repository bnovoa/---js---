function post_list(userId)
{
	var page = $("#input_post_page").val();
	if (page == "")
	{
		page = $("#span_post_page").text();
	}
	if (page == "")
	{
		page = "1";
	}
	post_list_page(userId, page);
}
function post_search(userId)
{
	post_list_page(userId, 1);
}
function post_list_page(userId, page)
{
	var searchStr = $("#input_content").val();
	http("../forumManage/postListLimit",
	{
		userId : userId,
		page : page,
		searchStr : searchStr,
	}, function(data)
	{
		var list = data.postList;
		var length = list.length;
		var text = "";
		for ( var i = 0; i < length; i++)
		{
			var post = list[i];
			var postId = post.id;
			text = text + "<tr>";
			text = text + "<td class='post.id'>" + postId + "</td>";
			text = text + "<td class='post.status'>"
			text = text + postStatus(post.statusCode);
			text = text + "·" + postType(post.typeCode);
			text = text + "</td>";
			text = text + "<td><p class='post.content'>" + post.content + "</p></td>";
			text = text + "<td>";
			var zipImage = post.zipImage;
			if (zipImage != null)
			{
				text = text + "<a target='_blank' href='" + zipImage + "'>";
				text = text + "<img width='100' height='100' src='" + zipImage
						+ "'>";
				text = text + "</a>";
			}
			text = text + "</td>";
			text = text + "<td class='post.createTime'>" + post.createTime + "</td>";
			text = text + "<td class='post.updateTime'>" + post.updateTime + "</td>";
			text = text + "<td>";
			text = text + "<a class='a_get_post' href='#' id='" + postId
					+ "'>查看详情</a><br/>";
			text = text + "<a class='a_add_essential' href='#' id='" + postId
					+ "'>加精</a><br/>";
			text = text + "<a class='a_remove_essential' href='#' id='"
					+ postId + "'>取消加精</a><br/>";
			text = text + "<a class='a_delete_post' href='#' id='" + postId
					+ "'>删除</a><br/>";
			text = text + "</td>";
			text = text + "</tr>";
		}
		$("#tbody_post_list").html(text);
		$("#span_post_page").text(data.page);
		var pageCount = data.pageCount;
		$("#span_post_pageCount").text(pageCount);
		if (pageCount > 0)
		{
			$("#div_post").css("display", "block");
		} else
		{
			$("#div_post").css("display", "none");
		}
	});
}
function add_essential(userId, postId)
{
	http("../forumManage/addEssentialLimit",
	{
		userId : userId,
		postId : postId
	}, function(data)
	{
		alert("加精成功");
		post_list(userId);
	});
}
function remove_essential(userId, postId)
{
	http("../forumManage/removeEssentialLimit",
	{
		userId : userId,
		postId : postId
	}, function(data)
	{
		alert("取消加精成功");
		post_list(userId);
	});
}
function delete_post(userId, postId)
{
	http("../forumManage/deletePostLimit",
	{
		userId : userId,
		postId : postId
	}, function(data)
	{
		alert("删除成功");
		post_list(userId);
	});
}
function get_post_id(userId, postId)
{
	get_post_id_page(userId, postId, 1);
}
function get_post(userId)
{
	var postId = $("#td_post_id").html();
	var page = $("#input_reply_page").val();
	if (page == "")
	{
		page = $("#span_reply_page").text();
	}
	if (page == "")
	{
		page = "1";
	}
	get_post_id_page(userId, postId, page);
}
function get_post_page(userId, page)
{
	var postId = $("#td_post_id").html();
	get_post_id_page(userId, postId, page)
}
function get_post_id_page(userId, postId, page)
{
	http("../forumManage/getPostLimit",
	{
		userId : userId,
		postId : postId,
		page : page
	}, function(data)
	{
		var post = data.post;
		$("#td_post_id").html(post.id);
		$("#textarea_content").html(post.content);
		$("#td_click_times").html(post.clickCount);
		$("#td_reply_times").html(post.commentCount);
		$("#td_create_time").html(post.createTime);
		$("#td_update_time").html(post.updateTime);
		$("#td_assist_times").html(post.likeCount);
		$("#td_status").html(postStatus(post.statusCode));
		$("#td_type").html(postType(post.typeCode));
		var replyList = data.replyList;
		var length = replyList.length;
		var text = "";
		for ( var i = 0; i < length; i++)
		{
			var reply = replyList[i];
			var replyId = reply.id;
			text = text + "<tr>";
			text = text + "<td>" + replyId + "</td>";
			text = text + "<td>" + reply.content + "</td>";
			text = text + "<td>" + reply.user.nickname + "</td>";
			text = text + "<td>" + reply.userId + "</td>";
			text = text + "<td>" + reply.createTime + "</td>";
			text = text + "<td>"
			if (reply.userId == userId)
			{
				text = text + "<a class='a_delete_reply' href='#' id='"
						+ replyId + "'>删除</a><br/>";
			}
			text = text + "</td>";
			text = text + "</tr>";
		}
		$("#tbody_reply_list").html(text);
		$("#span_reply_page").text(data.page);
		var pageCount = data.pageCount;
		$("#span_reply_pageCount").text(pageCount);
		if (pageCount > 0)
		{
			$("#div_reply").css("display", "block");
		} else
		{
			$("#div_reply").css("display", "none");
		}
		$("#postDetail").css("display", "block");
	});
}
function save_post(userId)
{
	var postId = $("#td_post_id").html();
	var content = $("#textarea_content").val();
	http("../forumManage/savePostLimit",
	{
		userId : userId,
		postId : postId,
		content : content
	}, function(data)
	{
		alert("修改成功");
		post_list(userId);
	});
}
function add_post(userId)
{
	var title = $("#input_title").val();
	var content = $("#textarea_content").val();
	var image = $("#span_img").text();
	http("../forumManage/postLimit",
	{
		userId : userId,
		title : title,
		content : content,
		image : image
	}, function(data)
	{
		alert("发帖成功");
	});
}
function add_reply(userId)
{
	var postId = $("#td_post_id").html();
	var content = $("#textarea_reply").val();
	http("../forumManage/replyLimit",
	{
		userId : userId,
		postId : postId,
		content : content
	}, function(data)
	{
		var failed = data.failed;
		if (failed == 'true')
		{
			alert("你已经被禁言");
		} else
		{
			alert("回帖成功");
			get_post_id(userId, postId);
		}
	});
}
function delete_reply(userId, replyId)
{
	http("../forumManage/deleteReplyLimit",
	{
		userId : userId,
		replyId : replyId
	}, function(data)
	{
		alert("删除成功");
		get_post(userId);
	});
}