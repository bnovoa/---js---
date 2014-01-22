function Aj(){

}
Aj.prototype={
    init:function(type,data,url_str,classname,fun_str){
        $.ajax({
        		type : type,
        		url : url_str,
        		data : data,
        		success : function(msg) {
        			//console.log(typeof msg);
        			if((typeof msg) == 'object'){
        				var callmsg = msg;
        			}else{
        				var callmsg=$.parseJSON(msg);
        			}
        			//console.log(typeof msg);
        			classname[fun_str](callmsg);
                },
                error:function(){
                	//alert('error');
                }
        });
    }
}