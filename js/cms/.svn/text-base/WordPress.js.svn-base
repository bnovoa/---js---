define(function(require, exports, module) {
	var $ = require('jquery');
	var Logger = require('../util/Log');
	var logger = new Logger();
	var xaj = require('util/XAjax.js');

	//TODO configuration should be filtered by profile setting.
	var DEFAULT_DOMAIN = "http://games.hoolai.com/cms/";
	
	module.exports = WordPress;
	
	/**
	 * 请参考WordPress JSON API插件
	 */
	function WordPress(domain){
		if (domain !== null){
			this.domain = domain;
		}else{
			this.domain = DEFAULT_DOMAIN;
		}
	}
	WordPress.prototype.getPost =  function(post_id, success){
		$.getJSON(this.domain + "?json=get_post&post_id="+post_id+"&callback=?",success);
	};
	WordPress.prototype.getCategoryImage =  function(slug,count,success){
		var countParam = "";
		if(count > 0){
			countParam = "&count="+count;
		}
		$.getJSON(this.domain + "?json=get_category_posts&slug=" + slug + "&include=content,custom_fields" + countParam + "&callback=?", success);
	};
	
	/**
	 * 获取某栏目的帖子
	 * @param key slug 栏目
	 * @param key count 获取条数 default 6
	 * @param key page 获取第几页 default 1
	 * @param key customFields 希望获取的自定义字段， 用逗号分隔
	 */
	WordPress.prototype.getCategoryPosts = function(params, success){
		params = $.extend({
			page: 1,
			count:6,
			customFields:"",
			include:"title,date,categories,custom_fields"
		},params
		);
		var slug = params.slug;
		var count = params.count;
		var page = params.page;
		var customFields = params.customFields;
		var includeParam = "&include=" + params.include;
		
		var countParam = "";
		var pageParam = "";
		var customFieldsParam = "";
		if (count > 0){
			countParam = "&count="+count;
		}
		if (page > 0){
			pageParam = "&page="+page;
		}
		if (customFields !== ""){
			customFieldsParam = "&custom_fields="+customFields;
		}
		$.getJSON(this.domain + "?json=get_category_posts&slug=" + slug + includeParam 
				+ pageParam + countParam + customFieldsParam + "&callback=?", success);
	};
	
	/**
	 * 获取最近发布的帖子
	 * @param count 条数
	 * @param success 回调
	 */
	WordPress.prototype.getRecentPosts =  function(count,success){
		$.getJSON(this.domain + "?json=get_recent_posts&count="+count+"&callback=?",success);
	};
	/**搜索帖子
	 * @param s 搜索条件
	 */
	WordPress.prototype.getPostsBySearch =  function(search,page,count,success){
		$.getJSON(this.domain + "?json=get_search_results&search="+search+"&&cat=12,9&page="+page+"&count="+count+"&include=title,date,categories&callback=?",success);
	};
	
});


