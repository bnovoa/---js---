/*JQ Tabs please preload jquery it 1.7.**/
/*author:damonzhaofei*/
/*
	it should be used in a custom-made DOM modle like this
	<ul id="tabs">
	<li data-tab="user"></li>
	<li data-tab="group"></li>
	</ul>
	<div id="tabsContent">
		<div data-tab="user"></div>
		<div data-tab="group"></div>
	</div>
*/
jQuery.fn.tabs = function  (control) {
	var element = $(this),
	cotrol = $(control);
	/*delegate live has been substitute by on */
	element.on("li", "click", function(){
		// to traverse the tabs
		var tabName = $(this).attr("data-tab");
		element.trigger("change.tabs", tabName);
	});

	//bind the custom events 
	//.bind( eventType [, eventData ], handler(eventObject));
	/*element.bind("eventType",function(eventObject,eventData));*/
	element.bind("change.tabs", function(e,tabName){
		element.find(">[data-tab]").removeClass("active");
		element.find(">[data-tab='"+tabName+"']").addClass("active");
	});

	//set the first tab actve
	var firstName = element.find("li:first").attr("data-tab");
	element.trigger("change.tabs",firstName);

	return this;// return this context to the JQ prototype;
}
