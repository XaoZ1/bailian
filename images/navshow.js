var BL = BL || {};
BL.getMenu = BL.getMenu || {};
BL.getMenu = {
	getHref:function(hotSearch){
		var href = "";
		var $type = Number(hotSearch.jumpType);
		switch ($type) {
		case 0:
			break;
		case 1:
			href = "href=\"" + domain.search + "/c-" + hotSearch.jumpId + ".html\" target=\"_blank\"";
			break;
		case 2:
			href = "href=\"" + domain.search + "/c-9999" + hotSearch.jumpId + ".html\" target=\"_blank\"";
			break;
		case 3:
			href = "href=\"" + domain.product + "/" + hotSearch.jumpId + ".html\" target=\"_blank\"";
			break;
		case 4:
			break;
		case 5:
			href = "href=\"" + hotSearch.jumpUrl + "\" target=\"_blank\"";
			break;
		case 6:
			href = "href=\"" + domain.channel + "/nl/basketry.html\" target=\"_blank\"";
			break;
		case 7:
			href = "href=\"" + domain.search + "/k-" + hotSearch.jumpUrl + ".html\" target=\"_blank\"";
			break;
		case 8:
			break;
		case 9:
			break;
		case 10:
			href = "href=\"" + domain.s + "/gs/saleStore.html?flashId=" + hotSearch.jumpId + "\" target=\"_blank\"";
			break;
		case 11:
			break;
		case 12:
			break;
		default:
			href = "";
		}
		return href;
	},
	picData:[],
	isPendtwo:false,
	loadLevone:function(locHref,domainDc2,navigaUrl,navigaMark){
		var _this = this;
        $.ajax({
				url : navigaUrl,
				type : "get",
				dataType : "jsonp",
				data:{navigaMark:navigaMark},
				cache : "true",
				success : function(data) {
					if (data != null && data.length > 0) {
						if (data.length < 14) {
							var firstNav = '<div class="banner-itemleft"><ul>';
						} else {
							var firstNav = '<div class="banner-itemleft int-nav index-none"><ul>';
						}
						var data_length=data.length;
						for (var i = 0; i < data_length; i++) {
							if (i < 14) {
								//一级导航开始拼接
								var categoryRoot = data[i];
								var showNames = categoryRoot.showNames;
								var urls = categoryRoot.urls;
								var category = categoryRoot.categoryId;
								var currFirstNav = '<li data_qid="'+category+'">';
								

								if (categoryRoot.categoryIcon !== undefined && categoryRoot.categoryIcon !== "") {
								    	currFirstNav += ' <i class='+categoryRoot.categoryIcon+'></i> ';
									
								}
								currFirstNav += '<span>';
								
								for (var s = 0; showNames != null && s < showNames.length; s++) {
									var searchUrl = urls[s] === ""?"javascript:;":urls[s];
									if(""!=searchUrl&&searchUrl.indexOf("#")){
										searchUrl = searchUrl.replace(/\#/g,"%23");
									}
										currFirstNav += '<a href="'+ searchUrl + '" target=\"_blank\" data_wa_type=\"ad\" data_wa_val=\"P668899_-_'+ category + '_-_3\">'+ showNames[s] +'</a>';
									if (showNames.length > 1 && s != showNames.length - 1) {
										currFirstNav += ' ';
									}
								}
								currFirstNav += '</span></li>';
								firstNav += currFirstNav;
                                //图片数据
                                var oImg = "";
                                var advposList = categoryRoot.advposList;
								oImg = '<div class="show-right">';
								if (typeof (advposList) != "undefined") {
									for (var n = 0; n < advposList.length; n++) {
										if (n < 2) {
											if (typeof (advposList[n]) != "undefined" && typeof (advposList[n].mediaUrl) != "undefined") {
												var href = _this.getHref(advposList[n]);
												oImg += '<div class="h200"><a  data_wa_type=\"ad\" data_wa_val=\"P668899_-_'+ category + '_-_3\"   '+ href + '><img  src="'+ advposList[n].mediaUrl+ '" width="170" height="200"></a></div>';
											}
										}
									}
								}
								oImg += '</div>';
								_this.picData.push(oImg);
								//一级导航拼接结束
								
							}
						}
						//console.log(_this.picData);
						firstNav += '</ul></div><div class="left-ul-show clearfix"><div class="gb-icon"></div><ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul></div>';
						$(".show-nav").html(firstNav);
						$(".nav-show").html(firstNav);

		                
		                _this.bindLoad(locHref,domainDc2);

						//离开大区域时整个关闭
						$(".nav-show,.hshow").hover(function() {
							
						}, function() {
							$(".left-ul-show").hide();
							$(".banner-itemleft").find("li").removeClass("on");
						});

					}
				}
			});
	},
	loadLevtwo:function(locHref,domainDc2,navigationId,index,_index){
		  var _this = this;
		  //console.log(_index)
		  //if(!_this.isPendtwo){
		  	 //_this.isPendtwo = true;
	          $.ajax({
					url : domainDc2+"/js/navigation/menuData.html",
					type : "get",
					dataType : "jsonp",
					data:{navigationId:navigationId},
					cache : "true",
					success : function(data) {
	                        var categoryParent = data;
	                        var currentTwoNav = '';
							if (categoryParent !== null && categoryParent !== undefined && categoryParent.length > 0) {
								for (var j = 0; j < categoryParent.length && j < 8; j++) {
									if (j === 0 || j === 4) {
										currentTwoNav += '<div class="show-left-1"><div style="height: 390px;" class="h390 clearfix">';
									}
									currentTwoNav += '<div class="show-w233">';
									var currentTwoNavTitle = '<div class="show-title">';
									var showNames = categoryParent[j].showNames;
									var urls = categoryParent[j].urls;
									var category = categoryParent[j].categoryId;
									var color = categoryParent[j].categoryColor;
									var colors = "";
									if (typeof (color) != "undefined" && color.indexOf(",") > 0) {
										colors = color.split(",");
									}							
	
										
										for (var m = 0; showNames != null && m < showNames.length; m++) {
											var searchUrl = urls[m] === ""?"javascript:;":urls[m];
											if(""!=searchUrl&&searchUrl.indexOf("#")){
												searchUrl = searchUrl.replace(/\#/g,"%23");
											}
											currentTwoNavTitle += '<a style="color:';
											if (typeof (color) != "undefined" && color.indexOf(",") > 0) {
												currentTwoNavTitle += colors[m];
											} else {
												currentTwoNavTitle += color;
											}
											currentTwoNavTitle += ';" href="'+ searchUrl + '" target=\"_blank\" data_wa_type=\"ad\" data_wa_val=\"P668899_-_'+ category + '_-_3\">' + showNames[m] + '</a>';
											if (showNames.length > 1 && m != showNames.length - 1) {
												currentTwoNavTitle += "、";
											}
										}
										currentTwoNavTitle += '</div>';
									
									

									//三级数据
									var currentTwoNavContent = '<div class="show-font">';
									var categorySon = categoryParent[j].categorys;
									if (categorySon != null) {
										for (var k = 0; k < categorySon.length; k++) {
											var showNames = categorySon[k].showNames;
											var urls = categorySon[k].urls;
											var category = categorySon[k].categoryId;
											
											var parentId=categorySon[k].parentId;
											var color = categorySon[k].categoryColor;
											var colors = "";
											if (typeof (color) != "undefined" && color.indexOf(",") > 0) {
												colors = color.split(",");
											}
											
												for (var n = 0; showNames != null && n < showNames.length; n++) {
													var searchUrl = urls[n] === ""?"javascript:;":urls[n];
													if(""!=searchUrl&&searchUrl.indexOf("#")){
														searchUrl = searchUrl.replace(/\#/g,"%23");
													}
													currentTwoNavContent += '<a href="'+ searchUrl+ '" target=\"_blank\" style="color:';
													if (typeof (color) != "undefined"&& color.indexOf(",") > 0) {
														currentTwoNavContent += colors[n];
													} else {
														currentTwoNavContent += color;
													}
													currentTwoNavContent += ';" data_wa_type=\"ad\" data_wa_val=\"P668899_-_'+ category+ '_-_3\">'+ showNames[n]+ '</a>';
												}
											
										
										}
									}
									currentTwoNavContent += '</div>';

									currentTwoNav += currentTwoNavTitle;
									currentTwoNav += currentTwoNavContent;
									currentTwoNav += '</div>';

									//j===3时,只有一个show-left-1,加闭合. j===7时即数据量满了时,加闭合.j为最后一个数据时,加闭合
									if (j === 3 || j === 7 || j === categoryParent.length-1) {
										currentTwoNav += '</div></div>';
									}
								}
							}
	                        $(".left-ul-show").eq(index).find("li").eq(_index).html(currentTwoNav+_this.picData[_index]);
	                        //_this.isPendtwo = false;
	                        //console.log("数据填了"+_index)

					},
					error:function(){
                            //_this.isPendtwo = false;
					}
			    });
            //}
	},
	bindLoad:function(locHref,domainDc2){
		    var _this = this;
            //移入一级导航时UI
			$(".banner-itemleft").each(function(i,o){
				$(o).find("li").mouseenter(function(){
					var that = $(this);
					var _index= $(this).index();
					that.addClass("on").siblings("li").removeClass("on");
					$(".left-ul-show").eq(i).css({marginLeft:"-10px",opacity:0.8}).show().stop(true).animate({marginLeft:0,opacity:1},300,'easeOut').find("li").eq(_index).show().siblings("li").hide();	
					$(".gb-icon").click(function(){
						$(".left-ul-show").hide();
					}); 
					$(".show-nav,.nav-show,.hshow").hover(function(){},function(){
						$(".left-ul-show").fadeOut();
						$(".banner-itemleft").find("li").removeClass("on");
					});
			    });
			});
            //bindLoadLevtwo
			$(".banner-itemleft").eq(0).find("li").mouseenter(function(){
				var that = $(this);
				var _index= $(this).index();
                if($(".left-ul-show").eq(0).find("li").eq(_index).html()!=""){   //判断当前的二级目录是否读取
					return false;
				}
				if($(".left-ul-show").eq(1).find("li").eq(_index).html()){  //判断另一处的二级目录是否读取
                    //复制节点
                    var oClone = $(".left-ul-show").eq(1).find("li").eq(_index).html();
                    $(".left-ul-show").eq(0).find("li").eq(_index).html(oClone);
				}else{
	                var navigationId = that.attr("data_qid");
	                _this.loadLevtwo(locHref,domainDc2,navigationId,0,_index);
				}
		    });
		    $(".banner-itemleft").eq(1).find("li").mouseenter(function(){
				var that = $(this);
				var _index= $(this).index();
                if($(".left-ul-show").eq(1).find("li").eq(_index).html()!=""){   //判断当前的二级目录是否读取
					return false;
				}
				if($(".left-ul-show").eq(0).find("li").eq(_index).html()!=""){  //判断另一处的二级目录是否读取
                    //复制节点
                    var oClone = $(".left-ul-show").eq(0).find("li").eq(_index).html();
                    $(".left-ul-show").eq(1).find("li").eq(_index).html(oClone);
				}else{
	                var navigationId = that.attr("data_qid");
	                _this.loadLevtwo(locHref,domainDc2,navigationId,1,_index);
	                //loadTwo(locHref,domainDc2,navigationId,1,_index);
				}
		    });
	},
	init:function(){
		 if ($(".show-nav").size() > 0 || $(".nav-show").size() > 0) {
			 	var locHref=window.location.href;
				locHref = locHref.substring(locHref.lastIndexOf("/"),locHref.lastIndexOf(".html"));
				
				var domainDc2 = domain.fashion;
				if(typeof(domainDc2)=="undefined"){
					domainDc2 = domain.fashion;
				}
				if(locHref=="/dl"||locHref=="/nh"){
					var navigaUrl = domainDc2 + "/commonHead/getSearchNavigationCross.html";
					navigaMark=$("#ecpNavigationId").val();
				}else{
					var navigaUrl = domainDc2 + "/commonHead/getSearchNavigationCross.html";
					var navigaMark="main";
				}
				

			    //loadLevone
			    this.loadLevone(locHref,domainDc2,navigaUrl,navigaMark);

		 }
	}
}

//==================
BL.getMenu.init();
