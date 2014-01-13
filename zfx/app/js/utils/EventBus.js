define(function(require,exports,module) {
	//global event varible 
	var $ = require("jquery");
	var EventBus = {
		bind:function() {
			if(!this.o) this.o = $({});//创建一个全局空对象 ，规范全局作用域
			this.o.bind.apply(this.o,arguments);//将参数传入对象中并调用 在特定的作用域调用方法
		},
		trigger:function(){
			if(!this.o) this.o = $({});
			this.o.trigger.apply(this.o,arguments);
		},
		unbind:function(){
			if(!this.o) this.o = $({});
			this.o.unbind.apply(this.o,arguments);
		}
	};
	module.exports = EventBus;
});