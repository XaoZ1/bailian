var BL = BL||{};
window.BL.Global = window.BL.Global||{};
var sidebarCallBack = sidebarCallBack||{};
BL.sidebar = {};
BL.sidebarLoad = {};
sidebarCallBack.display="hide";
BL.sidebar.iNow = -1;  //当前选择的侧边栏选项
BL.sidebarLoad.sloadOk = false; //侧边栏具体业务js是否加载
BL.sidebar.isVip = false;       //我的客服内容是否加载




BL.sidebar.include_js = function(file, callback){
    var _doc = document.getElementsByTagName('body')[0];
    var js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', file);
    _doc.appendChild(js);

    if (!/*@cc_on!@*/0) { //if not IE
        js.onload = function () {
            if (callback) {
                callback();
            }
        }
    } else {
        //IE6、IE7 support js.onreadystatechange
        js.onreadystatechange = function () {
            if (js.readyState == 'loaded' || js.readyState == 'complete') {
                if (callback) {
                    callback();
                }
            }
        }
    }

    return false;
}

BL.sidebar.open = function(){
	if (parseInt($("#rside").css("right")) === 0 && $("#rsideinside").find("#conbar_" + BL.sidebar.iNow).css("display") === "block"){

	}else{
	  if(BL.sidebar.iNow==-1){
         BL.sidebar.iNow=0;
	  }
      $("#rsidein>div:eq("+BL.sidebar.iNow+")").click();
	}
};
BL.sidebar.close = function(){
	if (parseInt($("#rside").css("right")) === 0 && $("#rsideinside").find("#conbar_" + BL.sidebar.iNow).css("display") === "block"){
        $("#rsidein>div:eq("+BL.sidebar.iNow+")").click();
	}else{

	}
};
BL.sidebar.init = function(){
	seajs.use([domain.js+"/resources/v4.2/unit/loadModule.js"],function(a){
          if(BL.pageName && BL.pageName =='product'){  //单品页显示判断
              $(".suggest").show();  
          }
       	  //侧边栏初始显示及图标位置控制
          function checkSideHei(){
	            var t_height = document.body.clientHeight > $(window).height() ? $(window).height() : document.body.clientHeight;	
				$(".right-slidebar").height($(window).height());
				var ii = t_height + "px";
			    //$(".nosidederty").css("height",ii);
				var nosidederty = document.getElementById("nosidederty");
				if(nosidederty!=null){
					nosidederty.style.height = ii;
				}
				$('#rside').find(".activity").css("top", (t_height - 432) / 2 - 58 + "px");
				$(".login").css("top", (t_height - 432) / 2 - 18 + "px");
				var shoptop = (t_height - 432) / 2 + 28;
			    $(".shopcar").css("top", (shoptop > 0 ? shoptop : 0) + "px");
			    $(".show-bx").eq(0).css("top", (shoptop > 0 ? shoptop : 0) + "px");
			    $(".collection").css("top", (t_height - 432) / 2 + 214 + "px");
				$(".show-bx").eq(1).css("top", (t_height - 432) / 2 + 214 + "px");
			    $(".history").css("top", (t_height - 432) / 2 + 256 + "px");
				$('#rside').find(".suggest").css("top", t_height - 165 + "px");
				$('#rside').find(".expert").css("top", t_height - 205 + "px");
			    $(".qrcode").css("top", t_height - 125 + "px");
			    $(".service").css("top", t_height - 83 + "px");
			    $(".totop").css("top", t_height - 41 + "px");
			    $(".totop").hide();
			    $(".right-slidebar-detail").height(t_height);
			    $(".slidebar-detail-one").height(t_height);
			    $(".login-detail").height(t_height);
			    $(".login-detail iframe").height(t_height - 44);

			    $(".shopcar-detail").height(t_height);
			    $(".collection-detail").height(t_height);

			    $(".collection-detail-show").height(t_height - 84);
			    $(".product-show").height(t_height - 136);

          }
          checkSideHei();
          $(window).resize(checkSideHei);   
          $('#rside').animate({right: "-276px"}, 1200);

          //sidebar初始显示时获取购物车商品数量
          function initCart(){};
	      initCart.prototype = {
	      	    getActiv: function(){
	      	    	//资源位加载
					$.ajax({
					     type: "POST",
					     dataType:"jsonp",
					     contentType: "application/jsonp",
					     url:domain.coupon+"/niche/activitiesEntrance.html",
					     async:false,
					      error:function(data){
					     },
					     success:function(data){
					         if (data != null ) {
					            $(".activity").find("div.mui-mbar-arr").before(data.obj[0].hint);
					            $(".activity").find("a").attr('href', data.obj[0].jumpUrl);
					            $(".activity").find("img").attr('src', data.obj[0].mediaUrl);
					            $(".activity").show();
					        }
					     }
					});
	      	    },
		        getCartList: function () {
		            $.ajax({
				    	type:"get",
				    	dataType:"jsonp",
						url:domain.my+"/cart/queryShoppingCartJsonp.html?pageNo=1&pageSize=9999",
						error:function(){
						},
						success:function(data){
						   if(data){
								if(data.resultInfo){
									if(data.resultInfo.totalGoodsNumber){
										if(data.resultInfo.totalGoodsNumber > -1&& data.resultInfo.totalGoodsNumber  < 100){
											$("#cartNum").text(data.resultInfo.totalGoodsNumber );
											$("#cartNum").show();
										}else if(data.resultInfo.totalGoodsNumber  > 99){
											$("#cartNum").text("99+");
											$("#cartNum").show();
										}
										else{
											$("#cartNum").hide();
										}
										
									}
								}
						   }
						}
					});
		        }
	        };
          var myCart = new initCart();

          myCart.getActiv();
          myCart.getCartList();
          
       });
	//================================================================================================================在线客服
	BL.sidebar.isVip = false;
	BL.sidebar.isVipajax = function(obj){
		  var path = obj.attr("href");
		  var cook = BL.Global.cookie.get("_m_e_p");
          $.ajax({
		        type : "get",
		        url : domain.my+"/sidebar/isVip.html",
		        dataType : "jsonp",
		        error : function(){
		        	BL.sidebar.isVip = false;
		        },
		        success : function(data){
		            if(path.indexOf("vip")==-1){
		                var dataPath = path+"&vip="+data;
		                if(cook != undefined && cook != null){
		                    if(path.indexOf("phone")==-1){
		                        dataPath = dataPath+"&phone="+cook;
		                    }
		                }
		                obj.attr("href",dataPath);
		            }else{
		                var dataPath = path;
		                dataPath = dataPath.substring(0,dataPath.indexOf("&vip=")+5)+data;
		                if(cook != undefined && cook != null){
		                    if(dataPath.indexOf("phone")==-1){
		                        dataPath = dataPath+"&phone="+cook;
		                    }
		                }
		                obj.attr("href",dataPath);
		            }
		        }
		    });
	}
	$("#rsidein .service").find("a:eq(0)").hover(function(){
		if(!BL.sidebar.isVip){
			BL.sidebar.isVip = true;
		    var obj = $(this);
		    BL.sidebar.isVipajax(obj);
	    }
	});
}

BL.sidebar.ui = {
	sidebarHide: function(){
        $("#rsidein div").css("backgroundColor", "");
	    $("#rside").stop().animate({ "right": "-276px" }, 200);
	    $(".currenttab").hide();
	},
	init: function(){
	  //窗口变化top出现和隐藏
	  $(window).scroll(function () {
		  if ($(document).scrollTop() > 100) {
			  $("#rside").find(".totop").fadeIn();
		  }
		  if ($(document).scrollTop() < 100) {
			  $("#rside").find(".totop").fadeOut();
		  }
	  });

	  //返回顶部
	  $("#rside").find(".totop").bind("click",function(){
	  	 if(jQuery.easing){
	  	   $("html,body").animate({scrollTop: 0},500,"easeOutStrong");
	  	 }
	  	 else{
	  	   $("html,body").animate({scrollTop: 0},500);
	  	 }
	  });

	  //移入图标显示tips
	  $("#rsidein>div").hover(
		function () {
			$(this).find(".mui-mbar-tab-tip").show().stop().animate({ "width": $(this).find(".mui-mbar-tab-tip>div").width() }, 200, function () { $(this).css("overflow", "visible"); });
		},
		function () {
		    $(this).find(".mui-mbar-tab-tip").css("overflow", "hidden").stop().animate({ "width": "0px" }, 200, function () { $(this).hide(); 
		});
	  });

      //读取sidebarLoad部分
      var sidebarShow = false;
      $(".login,.shopcar,.collection,.history,#user_not_login").bind("click",function(){
      	var _this = $(this);
      	if(!sidebarShow){
      	  sidebarShow = true;
          $("#rside").loadModule({requestUri:domain.js+"/resources/v4.2/"});
      	}
      });
      //------侧边栏展开与关闭动画，及定位当前打开的是哪个
	  //-----------购物车loading... ui
	    
		//function showbarloading() {
		  //$(".loading-warp").show();
		//}
		
		var oRight = null;
		var loadTimer = null;
        $(".login,.shopcar,.collection,.history").bind("click",function(ev){
        	var _this = $(this);
        	$(".currenttab").hide();
        	oRight = parseInt($("#rside").css("right"));
        	if($(this).hasClass("login")){
                 BL.sidebar.iNow = 0;
                 //$(".shopcar,.collection,.history").data("isopen",0);
        	}else if($(this).hasClass("shopcar")){
        		 BL.sidebar.iNow = 1;
        		 //$(".login,.collection,.history").data("isopen",0);
        	}
        	else if($(this).hasClass("collection")){
        		 BL.sidebar.iNow = 2;
        		 //$(".login,.shopcar,.history").data("isopen",0);
        	}
        	else if($(this).hasClass("history")){
        		 BL.sidebar.iNow = 3;
        		 //$(".login,.shopcar,.collection").data("isopen",0);
        	}


        	if (oRight === -276) {  //若侧边栏关闭中
                //加载数据
                $("#rsideinside").find("#conbar_" + BL.sidebar.iNow).show().siblings("div").stop().slideUp();
                $(this).css("backgroundColor", "#d62233").siblings().css("backgroundColor", "");

                 
                $("#rside").stop().animate({ "right": "0px" }, 300,function(){
                	sidebarCallBack.display="show";
                });

                if(true){ //若当前选项未被打开过
	                //showbarloading();
	                //开定时器去加载数据
	                clearInterval(loadTimer);
	                loadTimer = setInterval(function(){
			          	 if(BL.sidebarLoad.sloadOk){ //确认sidebarLoad加载成功
			                clearInterval(loadTimer);
			                BL.sidebarLoad.loadSideData(BL.sidebar.iNow);
			                //_this.data("isopen",1);
			          	 }
			        },500);
                }

            }else if (oRight === 0 && $("#rsideinside").find("#conbar_" + BL.sidebar.iNow).css("display") === "block") {  //若侧边栏打开中,且点击的为当前内页


                $("#rside").stop().animate({ "right": "-276px" }, 200,function(){
                	$("div[id^='conbar_']").hide();
                	if(BL.pageName=="product"){
                        if(!BL.Global.isLogin()){
                            sidebarCallBack.fun = function(){
							    window.location.reload();
							};
                        }
                	}else{
                	   sidebarCallBack.fun = ""; 
                    }
                });
                $("#rsidein div").css("backgroundColor", "");
                return;

            }else {

            	//$("#rsideinside").find("#conbar_" + BL.sidebar.iNow).show().siblings("div").stop().slideUp();
            	//$("#rsideinside").find("#conbar_" + BL.sidebar.iNow).appendTo($("#rsideinside")).show().siblings("div").stop().slideUp();
                $(this).css("backgroundColor", "#d62233").siblings().css("backgroundColor", "");

	                clearInterval(loadTimer);
	                loadTimer = setInterval(function(){
			          	 if(BL.sidebarLoad.sloadOk){ //确认sidebarLoad加载成功
			                clearInterval(loadTimer);
			                BL.sidebarLoad.loadSideData(BL.sidebar.iNow);
			                 //_this.data("isopen",1);
                            $("#rsideinside").find("#conbar_" + BL.sidebar.iNow).siblings("div").stop().slideUp().end().appendTo($("#rsideinside")).show();
                            //$("#rsideinside").find("#conbar_" + BL.sidebar.iNow).appendTo($("#rsideinside")).show().siblings("div").stop().slideUp();
			          	 }
			        },100);

            }
            $(this).find(".currenttab").show();
		    ev.stopImmediatePropagation();
        	
        });
		$(document).click(function (e) {
		    $(".show-bx").hide();
		    oRight = parseInt($("#rside").css("right")); //parseInt(getCurrentStyle(document.getElementById("rside"))["right"]); //
		    e = window.event || e;
		    obj = $(e.srcElement || e.target);
		    //console.log($(obj).parents(".right-slidebar")[0]);
		    //console.log(oRight);
		    if (oRight === -276) {
		        return;
		    } else {
		        if (!$(obj).parents(".right-slidebar")[0]) {
		            $("#rsidein div").css("backgroundColor", "");
		            $("#rside").stop().animate({ "right": "-276px" }, 200,function(){
		            	  if(BL.pageName=="product"){
	                        if(!BL.Global.isLogin()){
	                            sidebarCallBack.fun = function(){
								    window.location.reload();
								};
	                        }
	                	  }else{
	                	    sidebarCallBack.fun = ""; 
	                      }
		            });
                    
		            $(".currenttab").hide();
		        }
		    }
		});
		$(".sidebar-closed").click(function () {

		    $("#rsidein div").css("backgroundColor", "");
		    $("#rside").stop().animate({ "right": "-276px" }, 200,function(){
		    	  if(BL.pageName=="product"){
	                if(!BL.Global.isLogin()){
	                    sidebarCallBack.fun = function(){
						    window.location.reload();
						};
	                }
	        	  }else{
	        	    sidebarCallBack.fun = ""; 
	              }
		    });
		    $(".currenttab").hide();
		});
	}
}


      

//===================================================================================================init部分
if(window.seajs){
  BL.sidebar.init();
}
else{
  $(function(){
      BL.sidebar.include_js(domain.js+'/resources/v4.2/unit/sea.js', function () {
         BL.sidebar.init();
      });

  });
}
BL.sidebar.ui.init();
