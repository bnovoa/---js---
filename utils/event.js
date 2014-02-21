/*native js event tools**/
/*author:damonzhaofei*/
/*
	@bind bind event
	@unbind unbind event
*/
var Event = {
	bind:null,
	unbind:null
};
if (typeof window.addEventListener === 'function') {
	/*do not-ie*/
	Event.bind = function(el,type,fn){
		el.addEventListener(type,fn,false);
	}
	Event.unbind = function(el,type,fn){
		el.removeEventListener(type,fn,false)
	}
}else if(typeof document.attachEvent === 'function'){
	/*do ie*/
	Event.bind = function(el,type,fn){
		el.attachEvent("on"+type,fn);
	}
	Event.unbind = function(el,type,fn){
		el.detachEvent("on"+type,fn);
	}
}else{
	/*earlier*/
	Event.bind = function(el,type,fn){
		el["on"+type] = fn;
	}
	Event.unbind = function(el,type,fn){
		el["on"+type] = null;
	}
}