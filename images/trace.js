/*
 * 浏览痕迹
 * 张进
 * 2015/6/17
 */
var trace = {
	fun : {
		init : function(cook) {
			// 获取浏览痕迹
				$.ajax({
		type: "POST",
		url: domain.product+'/cms/json/getTrace.html',
		data:"cook="+cook,
	    success: function(data) {
	    	var str = "";
	    	if(data.length>0){
	    		str +="<li>";
	    	}
	    	for(var i = 0;i<data.length;i++){
	    		str +="<div class=\"pro-recommend\">";
	    		str +="<div class=\"pro-img\"><a href=\""+domain.product+"/"+data[i].id+".html\" title=\""+data[i].name+"\">" +
	    			"<img class='lazytag' data-original='"+data[i].url+"' src='"+domain.image +"/resources/v4.0/css/i/loading200x200.gif'  width=\"200\" height=\"200\"></a></div>";
	    		str +="<div  class=\"recommend-money\">￥"+data[i].price+"</div></div>";
	    		if((i+1)%5==0 && (i+1)<data.length){
	    			str +="</li>";
	    			str +="<li>";
	    		}
	    		if((i+1)%5!=0 && (i+1)>=data.length){
	    			str +="</li>";
	    		}
	    	}
	    	$(".ul-recommend").html(str);
	    }, 
	    complete: function() {
	    	$(".adv-slides").rollorshade({effect:"shade",controlBar:true,changeTime:4000,state:1,toolbar:1});
	   		$("img.lazytag").lazyload({effect:"fadeIn",threshold:400,skip_invisible:false});
	    	}
	});
		}
	}
};
