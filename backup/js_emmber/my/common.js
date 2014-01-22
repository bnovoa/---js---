/**
 * 发送http请求(post方式)
 * 
 * @param url
 * @param params
 * @param callBack
 */
function http(url, params, callBack)
{
	$.post(url, params, function(result)
	{
		var jsonObject = $.parseJSON(result);
		var status = jsonObject.status;
		if (status == 1)
		{
			if ($.isFunction(callBack))
			{
				callBack(jsonObject.data);
			}
		} else
		{
			alert("错误提示:" + jsonObject.message);
		}
	});
};
function postStatus(status)
{
	var text = "";
	switch (status)
	{
	case 0:
		text = "正常";
		break;
	case 1:
		text = "禁止回帖";
		break;
	case 2:
		text = "禁止查看";
		break;
	}
	return text;
}
function postType(type)
{
	var text = "";
	switch (type)
	{
	case 0:
		text = "普通";
		break;
	case 1:
		text = "精华";
		break;
	case 2:
		text = "置顶";
		break;
	case 3:
		text = "客服";
		break;
	case 4:
		text = "举报";
		break;
	}
	return text;
}