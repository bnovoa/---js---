define(function(require) {

	var $ = require('jquery');
	var swfobject = require('swfobject');
	var MagicController = require('MagicController');
	var magicController  = new MagicController();
	seajs.use('lib/bootstrap.min.js');
	seajs.use('lib/jquery.SuperSlide.2.1.js');
	seajs.use('lib/mobanwang.js');
	seajs.use('lib/timeCountDown.js');
	seajs.use('lib/jquery.kinMaxShow-1.0.min.js');
	seajs.use('lib/site.js');
	
	seajs.use('lib/jquery.mousewheel-3.0.6.pack.js');
		//var Dispatcher = require('./Dispatcher');
	$(function(){
		$("#header_div").load("_header.html", function() {
			  /** 调用header.html需要的js */
			  seajs.use('page/_header.js');
		});
	    $("#footer_div").load("_footer.html",function () {
	        seajs.use('page/_footer.js');
	    });
			seajs.use('lib/jsAddress.js',function(){
				addressInit('Select1', 'Select2', 'Select3');
			});
			
			seajs.use('lib/jsAddress.js',function(){
				var d = Date.UTC(2013, 10, 30, 12);
				var obj = {
					 day: document.getElementById("day"),
					 mini: document.getElementById("mini"),
					 hour: document.getElementById("hour"),
					 month:document.getElementById("month"),
			         year: document.getElementById("year")
				}
				fnTimeCountDown(d, obj);
			});
			
    
   
  // 应用placeholder插件
	seajs.use('lib/jquery.placeholder.js', function() {
			$('input, textarea').placeholder();
	});
	$(".confirm-btn").on("click",function(){
		var color = getColor();
		var product_number = getProductNumber();
		if(color=="" || product_number){
			alert("所填项目 不能为空！");
			return false;
		}
		magicController.confirm(color,product_number);
	});
	magicController.refreshVlidCode(".captcha-img");
	$(".change-captcha").click(function(){
		magicController.refreshVlidCode(".captcha-img");
	});
	magicController.Reservation();
  });
});

