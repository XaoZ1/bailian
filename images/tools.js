 
$(function(){
	
	//判断是否有消息
	   function findMessage(){
	    		$.ajax({
	    			type:"get",
	    	    	dataType:"jsonp",
	    	    	url:domain.coupon+"/findMessage.html",
	    			error : function() {
	    			},
	    			success:function(data){
	    				if(data){
	    					if(data>0){
	    						$(".tools-info").find("s").show();
	    					}
	    				}
	    				
	    			}
	    		});
	     }
	
	//从cookie中获取用户名
	var memberId = decodeURI(getCookie("__mn"));
	if(memberId != "undefined" && memberId != null){
		$("#member_name").text(memberId.replace(/\+/g, " "));
		findMessage();
		$("#user_login_in").show();
		$("#user_not_login").hide();
		
		$("#fileheader_in_login").show();
		$("#fileheader_not_login").hide();
		$("#fileheader_name").text(memberId.replace(/\+/g, " "));
	}else{
		$("#user_login_in").hide();
		$("#user_not_login").show();
		
		$("#fileheader_in_login").hide();
		$("#fileheader_not_login").show();
	}
	
	$("#headerReg").click(function(){
		var addUrl = "";
		if (bl_mmc!=undefined && bl_mmc != "") {
			addUrl +="?bl_mmc="+bl_mmc;
		}
		if (bl_ad!=undefined && bl_ad != "") {
			if (bl_mmc!=undefined && bl_mmc != "") {
				addUrl +="&bl_ad="+bl_ad;
			}else{
				addUrl +="?bl_ad="+bl_ad;
			}
		}
		cmCreateConversionEventTag("注册", "1", "PC注册", jsonPageInfo.pageId);
		window.location.href = domain.reg + "/regist.html"+addUrl;
	});
	
	/**获取指定名称的cookie的值 **/
	function getCookie(objName){
		var arrStr = document.cookie.split("; ");
		for(var i = 0;i < arrStr.length;i ++){
			var temp = arrStr[i].split("=");
			if(temp[0] == objName) return unescape(temp[1]); 
		}
	}
	
	
	$(document).on("mousemove",$(".tools-right").find("li"),function(){
		var tshow=($(".qrcode-1").width()+20)*$(this).find(".qrcode-1").length;
		$(this).find(".show-width").css({"margin-left":-tshow/2,"left":"50%"}).width(tshow);
	});
	
	//页面头部请登录绑定事件
	$("#user_not_login").find(".login-button").click(function(event) {
		if($("#rside").length > 0){
			$(this).attr("href","javascript:;");
			$("#rsidein>div:eq(0)").click();
			event=event?event:window.event;
			event.cancelBubble=true;
			event.stopImmediatePropagation();
			event.stopPropagation();
		}else if($(".cart-login").val() != undefined){
			$("#pop-body01").popbox({
				title: "用户登录"
			});
			var domainHost = document.location.hostname;
			domainHost = domainHost.substring(domainHost.indexOf(".")+1);
			document.domain = domainHost;
		}else{
			$(this).attr("href",domain.passport+ "?returnurl="+ encodeURIComponent(window.location.href));
		}
    });
	
	$("#fileheader_not_login>a:eq(0)").click(function(event){
		if($("#rside").length > 0){
			$(this).attr("href","javascript:;");
			$("#rsidein>div:eq(0)").click();
			event=event?event:window.event;
			event.cancelBubble=true;
			event.stopImmediatePropagation();
			event.stopPropagation();
		}else if($(".cart-login").val() != undefined){
			$("#pop-body01").popbox({
				title: "用户登录"
			});
			var domainHost = document.location.hostname;
			domainHost = domainHost.substring(domainHost.indexOf(".")+1);
			document.domain = domainHost;
		}else{
			$(this).attr("href",domain.passport + "?returnurl="+ encodeURIComponent(window.location.href));
		}
	});
	
	var path = $(".tools-right").find("ul>li:eq(5)").find("a:eq(1)").attr("href");
	var cook = getCookie("_m_e_p");
	var dataPath = "";
	var vipdomain = "";
	var dqhost = window.location.protocol+"//"+window.location.host;
	if(domain.promotion == dqhost || dqhost.indexOf("http://shop.")>=0){
		dqhost = domain.coupon;
	}
	$.ajax({
		type : "get",
		url : dqhost+"/sidebar/isVip.html",
		dataType : "jsonp",
		async : false,
		error : function(){
		},
		success : function(data){
			if(path.indexOf("vip")==-1){
				dataPath = path+"&vip="+data;
				if(cook != undefined && cook != null){
					if(path.indexOf("phone")==-1){
						dataPath = dataPath+"&phone="+cook;
					}
				}
			}else{
				dataPath = path;
				dataPath = dataPath.substring(0,dataPath.indexOf("&vip=")+5)+data;
				if(cook != undefined && cook != null){
					if(dataPath.indexOf("phone")==-1){
						dataPath = dataPath+"&phone="+cook;
					}
				}
			}
		}
	});
	var leftside = $(".left-side").find(".nav").last().find("dd:eq(1)").find("a");
	var aftermarket = $(".aftermarket-service");
	var operation = $(".goods-list-operation02").find(".txt:eq(0)").find("a");
	var service = $("#returnInfoListDiv").find(".service").find("a");
	if(typeof(leftside)!="undefined"){
		leftside.attr("href",dataPath);
	}
	if(typeof(aftermarket)!="undefined"){
		aftermarket.attr("href",dataPath);
	}
	if(typeof(operation)!="undefined"){
		operation.attr("href",dataPath);
	}
	if(typeof(service)!="undefined"){
		service.attr("href",dataPath);
	}
	//在线客服
	$(".tools-right").find("ul>li:eq(5)").find("a:eq(1)").hover(function(){
		$(this).attr("href",dataPath);
	});
	var isECPShow = false;
	// 判断是否ECP登陆
	$.ajax({
		type : "get",
		url : domain.coupon+"/niche/isEcp.html",
		dataType : "jsonp",
		error : function(){
		},
		success : function(data){
			if(data && (data == "1" || data == "2")){
				//移除充值缴费
				$(".tools-right li:eq(4)").remove();
				//移除多余导航菜单
				$(".nav-right li:gt(0)").remove();
				//移除价格筛选
				$(".sequence").find(".left-money").remove();
				//将首页地址改成祥泓E城地址
				if(data == "1"){
					$(".nav-right li:eq(0)").find("a").attr("href",domain.main+"/dl.html");
				}else if(data == "2"){
					$(".nav-right li:eq(0)").find("a").attr("href",domain.main+"/nh.html");
				}
				isECPShow = true;
			}
		}
	});
	// 掌上联盟数据加载
	$.ajax({
		type : "get",
		url : domain.coupon+"/niche/querytoolPalm.html",
		dataType : "jsonp",
		jsonpCallback : 'callbacktoolPalm',
		error : function(){
		},
		success : function(data){
			if(data != null){
				var toolpalm = "";
				toolpalm = "<div class='tools-leftfont'><a target='_blank' href='"+data.obj[0].jumpUrl+"'><span>掌上百联</span><i></i></a></div>"
				+ "<span class='left-span'></span>"
				+ "<b></b>"
				+ "<div class='divshow palm'>"
				+ "<div class='palm-item'>"
				+ "<a class='palm-item-img' target='_blank' href='"+data.obj[0].jumpUrl+"'><img src='"+data.obj[0].mediaUrl+"' width='100' height='100'></a>"
				+ "<div class='palm-item-line'><a class='palm-item-title' target='_blank' href='"+data.obj[0].jumpUrl+"'>"+data.obj[0].picDesc1+"</a></div>"		
				+ "<div class='palm-item-line'><a class='palm-item-message' target='_blank' href='"+data.obj[0].jumpUrl+"'>"+data.obj[0].picDesc2+"</a></div>"		
				+ "</div></div>"	
				//新增掌上联盟
				if(isECPShow == true){
					$(".tools-right li:eq(5)").html(toolpalm);
				}else{
					$(".tools-right li:eq(6)").html(toolpalm);
				}
			}
		}
	});
});

//CPS广告联盟,判断当前URL中,是否存在cm_mmc的Token值
//同时获取广告商提供的用户ID
//如果有,放入Cookies且24小时有效
//Cookie的Key是"ads_token"
$(document).ready(function() {
	// 追踪码
 var cm_mmc = 'cm_mmc';
 var ads_uid = 'ads_uid';
 
	var cm_mmc_reg = new RegExp("(^|&)"+ cm_mmc +"=([^&]*)(&|$)");
	var cm_mmc_r = window.location.search.substr(1).match(cm_mmc_reg);
	
	var cm_mmc_val = '';
	if (cm_mmc_r!=null){
		cm_mmc_val = unescape(cm_mmc_r[2]); 
		var condition = cm_mmc_val.toUpperCase();
		var conditions = condition.split("-_-");
		if (conditions[0] ==  "CPS" || conditions[0] ==  "EM") {
			// 广告商的用户ID
			var ads_uid_reg = new RegExp("(^|&)"+ ads_uid +"=([^&]*)(&|$)");
			var ads_uid_r = window.location.search.substr(1).match(ads_uid_reg);
			
			var ads_token = cm_mmc_val
			
			var ads_uid_val = '';
			if (ads_uid_r!=null){
				ads_uid_val = unescape(ads_uid_r[2]); 
				ads_token = ads_token + "-_-" + ads_uid_val;
			}

			var cookietime = new Date(); 
			var date = new Date();
			// coockie保存24小时 
			cookietime.setTime(date.getTime() + (60 * 60 * 1000* 24));
		     // 设置24小时有效
		     // JS 方式
			document.cookie = 'ads_token' + "="+ escape (ads_token) + ";expires=" + cookietime.toGMTString()+";domain=" + domain.cookie +  ";path=/";

		}
	}
});
