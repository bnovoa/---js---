define(function(require, exports, module) {
	/*app 用户信息展示*/
	module.exports = UserView;
	var UserView = function(el) {
		this.el = $(el);
		//处理 点击事件
		this.el.on("click");
	}

	//渲染
	UserView.prototype.render = function(data){

	};
	//处理点击事件
	UserView.prototype._handleClick = function(e){

	};

	// 对模板渲染数据的封装
	UserView.prototype._populate = function(data,tmpl){
		var html = Handlebars.template(tmpl,{data:data});
		this.el.html(html);
	}
});