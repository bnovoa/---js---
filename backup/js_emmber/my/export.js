/**
 * 获取帖子列表
 * 
 * @param userId
 */
function post_list()
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
	post_list_page(page);
}
/**
 * 获取帖子列表
 * 
 * @param page
 *            第几页
 */
function post_list_page(page)
{
	var pageCount = parseInt($("#span_post_pageCount").text());
	var index = parseInt(page + "");
	if (index > pageCount)
	{
		index = pageCount;
	}
	var forumId = $("#select_forum_id").val();
	var areaType = $("#select_area_type").val();
	var searchStr = $("#input_content").val();
	var beginTime = $("#input_begin_time").val();
	var endTime = $("#input_end_time").val();
	var postIdStr=$("#input_post_id").val();
	http("../forumManage/postListExport",
	{
		forumId : forumId,
		areaId : areaType,
		page : index,
		searchStr : searchStr,
		beginTime : beginTime,
		endTime : endTime,
		postId:postIdStr
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
			text = text + "<td class='post.forumId'>" + post.forumId + "</td>";
			text = text + "<td class='post.userId'>" + post.userId + "</td>";
			text = text + "<td class='post.nickname'>" + post.user.nickname
					+ "</td>";
			text = text + "<td><p class='post.content'>" + post.content
					+ "</p></td>";
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
			text = text + "<td class='post.createTime'>" + post.createTime
					+ "</td>";
			text = text + "<td class='post.updateTime'>" + post.updateTime
					+ "</td>";
			text = text + "<td>";
			text = text + "<a class='a_export_reply' href='#' id='" + postId
					+ "'>导出评论</a>";
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
/**
 * 导出帖子
 */
function export_post_list()
{
	var forumId = $("#select_forum_id").val();
	var areaType = $("#select_area_type").val();
	var searchStr = $("#input_content").val();
	var beginTime = $("#input_begin_time").val();
	var endTime = $("#input_end_time").val();
	var postIdStr=$("#input_post_id").val();
	http("../forumManage/exportPostList",
	{
		forumId : forumId,
		areaId : areaType,
		searchStr : searchStr,
		beginTime : beginTime,
		endTime : endTime,
		postId:postIdStr
	}, function(data)
	{
		var success = data.success;
		var text;
		if (success == 0)
		{
			text = "没有找到帖子";
		} else
		{
			text = "<a href='" + data.url + "'>" + data.fileName + "</a>";
		}
		$("#td_export").html(text);
	});
}
/**
 * 导出评论
 * 
 * @param postId
 */
function export_reply(postId)
{
	http("../forumManage/exportReply",
	{
		postId : postId,
	}, function(data)
	{
		var success = data.success;
		var text;
		if (success == 0)
		{
			text = "帖子不存在或者没有评论";
		} else
		{
			text = "<a href='" + data.url + "'>" + data.fileName + "</a>";
		}
		$("#td_export").html(text);
	});
}