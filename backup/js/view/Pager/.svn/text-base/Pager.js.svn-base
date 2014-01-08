define(function(require, exports, module) {
	var $ = require('jquery');
	
	var pagerTpl = require('./Pager.html');
	
	var EventBus = require('../../event/EventBus');
	var Handlebars = require('handlebars');
	
	module.exports = Pager;
	
	/**
	 * 在对象创建之后，所有数据都是只读的。
	 */
	function Pager(pagerId, pageCount, currentPage){
		this.pageCount = pageCount;
		this.currentPage = currentPage;
		this.pagerId = pagerId;
		this.template = Handlebars.compile(pagerTpl);
	}
	
	/**
	 * 返回pager的html片段
	 */
	Pager.prototype.getHtml = function(){
		return  this.template({
			pagerId: this.pagerId,
			currentPage: this.currentPage,
			pageCount:this.pageCount
		});
	};
	
	Pager.prototype.show = function(nodeId){
		$('#'+nodeId).html(this.template({
			pagerId: this.pagerId,
			currentPage: this.currentPage,
			pageCount:this.pageCount
		}));
	};
	
	/**
	 * 绑定html片段附着的行为
	 * pager.newest, pager.oldest, pager.next, pager.previous
	 */
	Pager.prototype.bindEvents = function(){
		var me = this;
		var jump = function(targetPage){
			EventBus.trigger(jQuery.Event( me.pagerId + "-jumpTo", {targetPage: targetPage} ));
		}
		
		$("#" + me.pagerId + "_newest").click(function(){
			if (me.currentPage === 1){
				alert("已经到第一页了。");
			}else{
				var targetPage = 1;
				jump(targetPage);
			}
		});
		$("#" + me.pagerId + "_oldest").click(function(){
			if (me.currentPage === me.pageCount){
				alert("已经到最后一页了。");
			}else{
				var targetPage = me.pageCount;
				jump(targetPage);
			}
		});
		$("#" + me.pagerId + "_next").click(function(){
			if (me.currentPage === me.pageCount){
				alert("已经到最后一页了。");
			}else{
				var targetPage = me.currentPage + 1;
				jump(targetPage);
			}
		});
		$("#" + me.pagerId + "_previous").click(function(){
			if (me.currentPage === 1){
				alert("已经到第一页了。");
			}else{
				var targetPage = me.currentPage - 1;
				jump(targetPage);
			}
		});
	};
	
	/**
	 * pager所依赖的dom将会被移除，所以不需要做unbind
	 */
	Pager.prototype.unbindEvents = function(){
		
	};
		
});

