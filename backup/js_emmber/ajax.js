function Aj(){

}

Aj.prototype={
    init:function(type,data,url_str,fun){
        $.ajax({
        		type : type,
        		url : url_str,
        		data : data,
        		success : function(msg) {
        			if(msg.msg){
						alert(msg.msg);
						return false;
					}else{
						if((typeof msg) == 'object'){
							var callmsg = msg;
						}else{
							var callmsg=$.parseJSON(msg);
						}
						fun(callmsg);
					}
					
                },
                error:function(){
                	alert('error');
                }
        });
    }
}