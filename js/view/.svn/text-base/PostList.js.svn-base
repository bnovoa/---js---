define(function(require, exports, module) {
	var Logger = require('../util/Log');
	var logger = new Logger();
	var $ = require('jquery');
	var newsListTpl = require('./PostList.newsList.html');
	var newsPageListTpl = require('./PostList.newsPageList.html');
	var Handlebars = require('handlebars');
	var EventBus = require('../event/EventBus');
	
	var endsWith = function(str, suffix) {
	    return str.indexOf(suffix, str.length - suffix.length) !== -1;
	};
	
	module.exports = PostList;
	
	function PostList(){
		this.newsListTemplate = Handlebars.compile(newsListTpl);
		this.newsPageListTemplate = Handlebars.compile(newsPageListTpl);
	}
	


	/**
	 * @param nodeId
	 * @param data
	 */
	PostList.prototype.showPostList = function (nodeId,data) {
		var htmlStr = null;
		htmlStr = this.newsListTemplate({
			data : data
		});
		$(nodeId).html(htmlStr);
	};
	
	PostList.prototype.showNewsPageList = function(nodeId,data,page){
		var htmlStr = null;
		htmlStr = this.newsPageListTemplate({
			data : data,
			page:page
		});
		$(nodeId).html(htmlStr);
	};
	
	PostList.prototype.bindPageEvents = function(){
		EventBus.unbind("pre",null);
		EventBus.unbind("next",null);
		EventBus.unbind("first",null);
		EventBus.unbind("end",null);
		$('#news_pre').click(function(){
			var currentPage = $('#currentPage').text();
			var event = jQuery.Event("pre",{
				currentPage:currentPage
			});
			EventBus.trigger(event);
		});
		$('#news_next').click(function(){
			var currentPage = $('#currentPage').text();
			var event = jQuery.Event("next",{
				currentPage:currentPage
			});
			EventBus.trigger(event);
		});
		$('#news_first').click(function(){
			var event = jQuery.Event("first",{
			});
			EventBus.trigger(event);
		});
		$('#news_end').click(function(){
			var event = jQuery.Event("end",{
			});
			EventBus.trigger(event);
		});
	}
});

