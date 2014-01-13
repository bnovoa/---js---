define(function(require, exports, module) {
	module.exports = Logger;
	
	function Logger(){
		
	}

	Logger.prototype.log = function(obj, desc){
		if (console !== undefined && console.log !== undefined){
			if (desc != undefined && desc != null){
				console.log(desc);
			}
			console.log(obj);
		}else{
			//IE
			alert(desc + obj);
		}
	};
	
});
