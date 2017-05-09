function base64_decode(str){
    var c1, c2, c3, c4;
    var base64DecodeChars = new Array(
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57,
            58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0,  1,  2,  3,  4,  5,  6,
            7,  8,  9,  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
            37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1,
            -1, -1
    );
    var i=0, len = str.length, string = '';

   while (i < len){
            do{
                    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
            } while (
                    i < len && c1 == -1
            );

           if (c1 == -1) break;

           do{
                    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
            } while (
                    i < len && c2 == -1
            );

           if (c2 == -1) break;

           string += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

           do{
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 == 61)
                            return string;

                   c3 = base64DecodeChars[c3]
            } while (
                    i < len && c3 == -1
            );

           if (c3 == -1) break;

           string += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

           do{
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 == 61) return string;
                    c4 = base64DecodeChars[c4]
            } while (
                    i < len && c4 == -1
            );

           if (c4 == -1) break;

           string += String.fromCharCode(((c3 & 0x03) << 6) | c4)
    }
    return string;
}
var mid = "";
function URLencode(sStr,isb){
	sStr = encodeURI(sStr).replace(/\//g,"%2F")
	.replace(/\$/g,"%24").replace(/\@/g,"%40")
	.replace(/\\/g,"%5C").replace(/\#/g,'%23')
	.replace(/\;/g,"%3B").replace(/\?/g,'%3F')
	.replace(/\&/g,'%26').replace(/\+/g,'%2B')
	.replace(/\</g,'%3C').replace(/\>/g,'%3E')
	.replace(/\^/g,'%5E');
	if(isb||isb===undefined){
		sStr = sStr.replace(/\%/g,'%25');
	}
    return sStr;
}

function addCmCreateElementTag(goodsId,goodsMsg,brandSid){
	var k = $.trim($("input[type='hidden'][name='k']").val());
	var c = $("input[type='hidden'][name='c']").val();
	var pageIndex = Number($("#pageIndex").val());
	cmCreateElementTag("搜索点击","PC_搜索","PC_搜索-_-"+goodsId+"-_-"+goodsMsg+"-_--_--_--_--_-"+k+"-_-"+c+"-_-"+brandSid);
}

//防止用户输入非数字
function checkNum(obj){
    //先把非数字的都替换掉，除了数字和. 
    obj.val(obj.val().replace(/[^\d.]/g,"")); 
    //必须保证第一个为数字而不是. 
    obj.val(obj.val().replace(/^\./g,"")); 
    //保证只有出现一个.而没有多个. 
    obj.val(obj.val().replace(/\.{2,}/g,".")); 
    //保证.只出现一次，而不能出现两次以上 
    obj.val(obj.val().replace(".","$#$").replace(/\./g,"").replace("$#$","."));
    //只保留小数点后两位
    //obj.val(obj.val().replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
}
$.fn.numeral=function(){
	$(this).keyup(function(event){
		var obj = $(this);
		//允许左右方向键移动 
		var currKey=0,e=e||event;
		currKey=e.keyCode||e.which||e.charCode;
	    if(currKey == 37 || currKey == 39){ 
	        return;
	    }
		checkNum(obj);
    });
	this.bind("blur", function() {
		checkNum($(this));
		//为了去除最后一个. 
		$(this).val($(this).val().replace(/\.$/g,""));
	});
}
function getTrace(cook){
	$.ajax({
		type: "POST",
		url: domain.search+'/cms/json/getTrace.html',
		data:"cook="+cook,
	    success: function(data) {
	    	var str = "";
	    	if(data.length>0){
	    		str +="<li>";
	    	}
	    	for(var i = 0;i<data.length;i++){
	    		str +="<div class=\"pro-recommend\">";
	    		str +="<div class=\"pro-img\"><a href=\""+domain.product+"/"+data[i].id+".html\" target=\"_blank\" title=\""+data[i].name+"\">" +
	    			"<img src=\""+data[i].url+"\" width=\"200\" height=\"200\"></a></div>";
	    		str +="<div class=\"recommend-money\">￥"+data[i].price+"</div></div>";
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
	    }
	});
}

var miniK = "";
$(function() {
	var sequence_height=$("#sequence-list").offset().top;
	window.onscroll = function() {
		var u = $(this).scrollTop();
		if (u <= sequence_height) {
			$("#sequence-list").removeClass("sequence-fixed");	
			$(".prolist").css("margin-top","10px");
		} else {
			$("#sequence-list").addClass("sequence-fixed");				
			$(".prolist").css("margin-top","66px");
		}
	}
	var searchId=$("label[name='searchId']").html();
	var k = $.trim($("input[type='hidden'][name='k']").val());
	$(".search").siblings("input").val(k);
	if(k!=""){
		top_searchAut.addCookie(top_searchAut.cookieName, encodeURI(k).replace(/\_/g,'%5F'),top_searchAut.cookieHours, top_searchAut.domin);
	}
	if(window.location.href.indexOf('k-')>-1){
		var c = $.trim($("label[name='searchId']").html());
		if(c!=""&&c!=null){
			$("input[type='hidden'][name='c']").val(c);
		}else{
			c = $("input[type='hidden'][name='c']").val();
		}
	}else{
		c = $("input[type='hidden'][name='c']").val();
	}
	c = c.replace(/\#/g,'%23');
	if (k !== '') {
		$(".header-search-input").find("input").val(k);
	}
	// 仅显示有货
	if($.trim($("input[type='hidden'][name='isava']").val())!=""){
		$(".option").find("label").find("input[data-code='isava']").attr("checked",'true');
	}else{
		$(".option").find("label").find("input[data-code='isava']").removeAttr("checked");
	}
	//自营
	if($.trim($("input[type='hidden'][name='yunType']").val())!=""){
		$(".option").find("label").find("input[data-code='yunType']").attr("checked",'true');
	}else{
		$(".option").find("label").find("input[data-code='yunType']").removeAttr("checked");
	}
	// 全球购
	if($.trim($("input[type='hidden'][name='goodsType']").val())!=""){
		$(".option").find("label").find("input[data-code='goodsType']").attr("checked",'true');
	}else{
		$(".option").find("label").find("input[data-code='goodsType']").removeAttr("checked");
	}
	// 促销
	if($.trim($("input[type='hidden'][name='act']").val())!="" || $.trim($("input[type='hidden'][name='promotion']").val())!=""){
		$(".option").find("label").find("input[data-code='promotion']").attr("checked",'true');
	}else{
		$(".option").find("label").find("input[data-code='promotion']").removeAttr("checked");
	}
	// 支持自提
	if($.trim($("input[type='hidden'][name='ifPickup']").val())!=""){
		$(".option").find("label").find("input[data-code='ifPickup']").attr("checked",'true');
	}else{
		$(".option").find("label").find("input[data-code='ifPickup']").removeAttr("checked");
	}
	$("#priceAreaMin").numeral();
	$("#priceAreaMax").numeral();

	// 添加面包屑
	var tVal=$("label[name='choosePropTitles']").html();
	var choosePropTitles="";
	if(tVal!=""&&typeof(tVal)!="undefined"){
		choosePropTitles = eval("("+tVal+")");
	}
	var pVal=$("label[name='chooseProps']").html();
	var chooseProps="";
	if(pVal!=""&&typeof(pVal)!="undefined"){
		chooseProps = eval("("+pVal+")");
	}
	//添加分类
	var categoryHtml="";
	var choosedPropsJson = {};
	var isClear = true;
	for(var i=0;i<choosePropTitles.length;i++){
		var key=choosePropTitles[i].code;
		var name=choosePropTitles[i].name+"：";
		var vals=eval(chooseProps[key]);
		var ies="";
		var ititle=name;
		var val = "";
		for(var j=0;j<vals.length;j++){
			ititle += vals[j].name;
			val += vals[j].code;
			ies += "<i>"+vals[j].name+"</i>";
			if((j+1)<vals.length){
				ies += "、";
				ititle += "、";
				val += ",";
			}
		}
		choosedPropsJson[key] = val;
		if(ecp == ""){
			categoryHtml += "<div class=\"path-icon\">";
			categoryHtml += "<div class=\"path-show-1\" title=\""+ititle+"\">"
			categoryHtml += "<div class=\"fl\">"+name+"</div>";
			categoryHtml += "<div class=\"white\">";
			categoryHtml += ies;
			categoryHtml += "</div><div class=\"white-gb\" data-code=\""+key+"\"></div></div></div>";
		}
		if(key=="salePrice"){
			try{
				if(typeof(val)!="undefined"&&val.indexOf("-")>0){
					var prices = val.split("-");
					$("#priceAreaMin").val(prices[0]);
					$("#priceAreaMax").val(prices[1]);
					isClear = false;
				}
			}catch(e){}
		}
	}
	if(isClear){
		$("#priceAreaMin").val("");
		$("#priceAreaMax").val("");
	}
	$("#form input[name='props']").val(JSON.stringify(choosedPropsJson));
	categoryHtml += "<div class=\"path-icon\">";
	$("#keySearchInput").val(k);
	$(".searchBox").before(categoryHtml);
	var totalPage = 1;
	var search = {
		param: {
			k: encodeURI(k).replace(/\//g,"%2F")
			.replace(/\$/g,"%24").replace(/\@/g,"%40")
			.replace(/\\/g,"%5C").replace(/\#/g,'%23')
			.replace(/\;/g,"%3B").replace(/\?/g,'%3F')
			.replace(/\&/g,'%26').replace(/\+/g,'%2B')
			.replace(/\</g,'%3C').replace(/\>/g,'%3E')
			.replace(/\^/g,'%5E'),
			c: $("input[type='hidden'][name='c']").val().replace(/\%23/g,'#'),
			isava: $("#form input[name='isava']").val(),
			act: $("#form input[name='act']").val(),
			promotion: $("#form input[name='promotion']").val(),
			actType:$("#form input[name='actType']").val(),
			ruleNo:$("#form input[name='ruleNo']").val(),
			yunType: $("#form input[name='yunType']").val(),
			isColl: "",
			isMatch: $("#form input[name='isMatch']").val(),
			ifPickup: $("#form input[name='ifPickup']").val(),
			goodsType:$("#form input[name='goodsType']").val(),
			props: $("#form input[name='props']").val(),
			sorCol: "",
			sorTye: "",
			priceArea: "",
			pageIndex: "1",
			pageSize: "50"
		},
		fn: {
			ajaxFindGoods: function() {
				var hasGoodFlag = false;
				var params = {
					"k": search.param.k,
					"c": search.param.c,
					"isava": search.param.isava,
					"act": search.param.act,
					"promotion": search.param.promotion,
					"actType": search.param.actType,
					"ruleNo": search.param.ruleNo,
					"yunType": search.param.yunType,
					"isColl": search.param.isColl,
					"isMatch": search.param.isMatch,
					"ifPickup": search.param.ifPickup,
					"goodsType": search.param.goodsType,
					"sorCol": search.param.sorCol,
					"sorTye": search.param.sorTye,
					"props": search.param.props,
					"priceArea": search.param.priceArea,
					"pageIndex": search.param.pageIndex,
					"pageSize": search.param.pageSize
				};
				$.ajax({
					type: "POST",
					url: domain.search + '/mainGoodList.html',
					data: params,
				    success: function(result) {
				    	var html = "";
				    	$(".prolist").remove("");
				    	$(".newnone").remove("");
				    	$(".page-show").before(result);
						if(new RegExp("newnone").test(result)) {
							hasGoodFlag = false;
							$(".page-show").html("");
						} else {
							hasGoodFlag = true;
							$(".prolist img").lazyload({effect: "fadeIn", threshold : 200});
						}
				    }, 
				    complete: function() {
				    	search.param.isColl=$("input[type='hidden'][id='isColl']").val();
				    	var totalCount = $("#totalCount").val();
				    	$("#merchantCount").text(totalCount);
				    	totalPage = Number($("#totalPage").val());
				    	var pageIndex = Number($("#pageIndex").val());
				    	$("#merchantCountPage").text(totalPage);
				    	$("#merchantCountPage1").text(totalPage);
				    	$("#currentPageIndex").text(search.param.pageIndex);
				    	if (hasGoodFlag) {
				    		if ($("#currentPageIndex").text() === '0') {
								$("#currentPageIndex").text("1");
							}
				    		if(pageIndex=='1'||pageIndex=='0'){
				    			$(".sequence-right-pt").find(".fr-show").find("a:eq(0)").hide();
				    		}else{
				    			$(".sequence-right-pt").find(".fr-show").find("a:eq(0)").show();
				    		}
				    		if(pageIndex==totalPage||totalPage=='1'){
				    			$(".sequence-right-pt").find(".fr-show").find("a:eq(1)").hide();
				    		}else{
				    			$(".sequence-right-pt").find(".fr-show").find("a:eq(1)").show();
				    		}
				    		$(".page-show").show();
				    		$(".sequence-right-pt").show();
				    	} else {
				    		$(".page-show").hide();
				    		$("#currentPageIndex").text("0");
				    		$(".sequence-right-pt").hide();
				    	}
				    	search.param.pageIndex = pageIndex;
				    	$(".page-show").pager({
				    		pagenumber: 1, 
				    		pagecount: totalPage, 
				    		buttonClickCallback: search.fn.pageClick
				    	});
				    	search.fn.addToShoppingCart();
				    	
				    	search.fn.proListComplete();

				    	// 用户行为特殊部署
				    	search.fn.blMd(hasGoodFlag);
				    }
				});
			},
			pageClick: function(pageIndex) {
				$(".page-show").pager({
		    		pagenumber: pageIndex, 
		    		pagecount: totalPage, 
		    		buttonClickCallback: search.fn.pageClick
		    	});
				var pageParams = {
					"k": search.param.k,
					"c": search.param.c,
					"isava": search.param.isava,
					"act": search.param.act,
					"promotion": search.param.promotion,
					"actType": search.param.actType,
					"ruleNo": search.param.ruleNo,
					"yunType": search.param.yunType,
					"isColl":search.param.isColl,
					"isMatch": search.param.isMatch,
					"ifPickup": search.param.ifPickup,
					"goodsType": search.param.goodsType,
					"sorCol": search.param.sorCol,
					"sorTye": search.param.sorTye,
					"props": search.param.props,
					"pageIndex": pageIndex,
					"pageSize": search.param.pageSize
				};
                $.ajax({
                	type: "POST",
                    url: domain.search + '/mainGoodList.html',
                    data: pageParams, 
                    success: function(result) {
                    	var html = "";
				    	$(".prolist").remove("");
				    	$(".newnone").remove("");
				    	$(".page-show").before(result);
						if(new RegExp("newnone").test(result)) {
							hasGoodFlag = false;
							$(".page-show").html("");
						} else {
							hasGoodFlag = true;
							$(".prolist img").lazyload({effect: "fadeIn", threshold : 200});
						}
                    },
                    complete: function() {
                    	search.param.isColl=$("input[type='hidden'][id='isColl']").val();
                    	$(".pgNext").eq(1).css("margin-right",10);
				    	$("#currentPageIndex").text(pageIndex);
				    	if (hasGoodFlag) {
				    		if(pageIndex=='1'){
				    			$(".sequence-right-pt").find(".fr-show").find("a:eq(0)").hide();
				    		}else{
				    			$(".sequence-right-pt").find(".fr-show").find("a:eq(0)").show();
				    		}
				    		if(pageIndex==totalPage){
				    			$(".sequence-right-pt").find(".fr-show").find("a:eq(1)").hide();
				    		}else{
				    			$(".sequence-right-pt").find(".fr-show").find("a:eq(1)").show();
				    		}
				    		$(".sequence-right-pt").show();
				    	} else {
				    		$(".sequence-right-pt").hide();
				    	}
				    	// 分页跳转到产品列表
				    	$(".sequence").removeClass("sequence-fixed");
				    	$("html,body").animate({scrollTop: $(".sequence").offset().top}, 100);
						// 加入购物车
						search.fn.addToShoppingCart();
						
						search.fn.proListComplete();

						// 用户行为特殊部署
						search.fn.blMd(hasGoodFlag);
				    }
                });
			},
			addToShoppingCart: function() {
				// 加入购物车事件
				$(".pro-button").find(".addCard").click(function() {
					var proButton = $(this).parent(".pro-button");
					var goodsId = proButton.find("input:eq(0)").val();
					var salePrice = proButton.find("input:eq(1)").val();
					var originalPrice = proButton.find("input:eq(2)").val();
					var productName = proButton.find("input:eq(3)").val();
					var productUrl = proButton.find("input:eq(4)").val();
					var categoryid = proButton.find("input:eq(5)").val();
					var brandSid = proButton.find("input:eq(6)").val();
					var activityType = proButton.find("input:eq(7)").val();
					if (!activityType) {
						activityType = '0';
					}
					var a = $(this).parents("div.pro-show").find(".pro-assess-right").find("a");
					var mshopId = "";
					if(typeof(a)!="undefined"&&a.size()>0){
						var h = a.attr("href");
						mshopId = h.substring(h.lastIndexOf("-")+1,h.lastIndexOf(".html"));
					}
					var activityCode = proButton.find("input:eq(8)").val();
					var retObj = updateShoppingCartObj(goodsId, 1, salePrice, 0, productName, originalPrice, 
							productUrl,"",activityType,categoryid, brandSid,"",activityCode,activityType,mshopId);
					if (retObj) {
						if (retObj.isSuccess) {
							// 商品图片从当前位置漂移到购物车的动画效果
							var good = $(this).parents(".pro-show").find("img");
							var goodLeft = good.offset().left, 
								goodTop = good.offset().top,
								carLeft = $(".shopcar").offset().left,
								carTop = $(".shopcar").offset().top;
							var copyGood = good.clone();
							$("body").append(copyGood);
							copyGood.css({position: 'absolute', left: goodLeft, top: goodTop});
							copyGood.animate({width: 20, height: 20, left: carLeft, top: carTop, opacity: 0.5}, 900, function(){
								copyGood.remove();
							});
						} else {
							$(this).unbind("click");
							$(this).removeClass("btn-primary addCard").addClass("btn-notprimary");
							$(this).removeClass("btn-primary addCard").html("卖完啦");
							$("#pop-body01").find(".name").html(retObj.resultMsg);
							$("#pop-body01").popbox({title:'提示信息'});
							$("#pop-body01").find("button:eq(0)").click(function(){
							    $("#pop-close").click();
							});
						}
					}
				});
			},
			removeAllFilterConds: function() {
				$(".screening-conditions").html('');
				$("#choosedDiv").hide();
				$("#form input[name='props']").val('');
				search.param.props = '';
				search.fn.formSubmit();
			},
			getChoosedProps: function() {
				// 把form表单中的props属性值转换成json
		 		var choosedProp = $("#form input[name='props']").val();
		 		if (choosedProp) {
		 			choosedProp = eval("(" + choosedProp + ")");
		 		}
		 		return choosedProp;
			},
			delLastChar: function(str) {
				if (str !== '') {
					str = str.substr(0, str.length - 1);
				}
				return str;
			},
			inputPrice:function(priceAreaMin,priceAreaMax){
				var priceAreaValue = "";// 最低价、最高价设置
				var tih = null;
				// 替换
				if(Number(priceAreaMin)>Number(priceAreaMax)){
					tih = priceAreaMin;
					priceAreaMin = priceAreaMax;
					priceAreaMax = tih;
					$("#priceAreaMin").val(priceAreaMin);
					$("#priceAreaMax").val(priceAreaMax);
				}
				if ((priceAreaMin !== '' && priceAreaMin !=null)  || (priceAreaMax !== '' && priceAreaMax !=null)) {
					if (priceAreaMin !== '' && (priceAreaMax === '' || priceAreaMax == null)) {
						priceAreaValue = priceAreaMin + "-*";
					} else if ((priceAreaMin === '' || priceAreaMin == null) && priceAreaMax !== '') {
						priceAreaValue = "0-" + priceAreaMax;
					} else {
						priceAreaValue = priceAreaMin + "-" + priceAreaMax;
					}
				}

				var choosedPropsJson = search.fn.getChoosedProps();
				if (priceAreaValue !== "") {
					var priceKey = "";
					$(".screening-conditions").find("span").each(function() {
						if ($(this).text() == '价格：') {
							priceKey = $(this).attr("data-type");
							if (choosedPropsJson[priceKey] !== null) {
								delete choosedPropsJson[priceKey];
							}
						}
					});
					if (priceKey !== "") {
						choosedPropsJson[priceKey] = priceAreaValue;
					} else {
						choosedPropsJson['salePrice'] = priceAreaValue;
					}
					$("#form input[name='props']").val(JSON.stringify(choosedPropsJson));
					search.param.props = JSON.stringify(choosedPropsJson);
				} else {
					var existdPriceKey = "";
					$(".screening-conditions").find("span").each(function() {
						if ($(this).text() == '价格：') {
							existdPriceKey = $(this).attr("data-type");
							var existdPriceValue = $.trim($(this).parent("li").find("i:eq(1)").text());
							if (choosedPropsJson[existdPriceKey] != existdPriceValue) {
								choosedPropsJson[existdPriceKey] = existdPriceValue;
							}
						}
					});
					if (choosedPropsJson['salePrice'] !== '') {
						delete choosedPropsJson['salePrice'];
					}
					$("#form input[name='props']").val(JSON.stringify(choosedPropsJson));
					search.param.props = JSON.stringify(choosedPropsJson);
				}
			},
			getInputPrice: function(priceAreaMin,priceAreaMax) {
				search.fn.inputPrice(priceAreaMin,priceAreaMax);
				//search.fn.ajaxFindGoods(); //局部刷新
				search.fn.formSubmit();
			},
			formSubmit: function() {
				if(window.location.href.indexOf('k-')>-1 && k!=""){
					$("input[type='hidden'][name='k']").remove();
					$("#form").attr("action", domain.search + "/k-" + URLencode(k) + ".html");
				}else{
					$("input[type='hidden'][name='c']").remove();
					$("#form").attr("action", domain.search + "/c-" + c + ".html");
					if(k!=""){
						$("input[type='hidden'][name='k']").val(encodeURI(k).replace(/\//g,"%2F")
								.replace(/\$/g,"%24").replace(/\@/g,"%40")
								.replace(/\\/g,"%5C").replace(/\#/g,'%23')
								.replace(/\;/g,"%3B").replace(/\?/g,'%3F')
								.replace(/\&/g,'%26').replace(/\+/g,'%2B')
								.replace(/\</g,'%3C').replace(/\>/g,'%3E')
								.replace(/\^/g,'%5E'));
					}
				}
				search.param.isMatch = '0';
				$("input[type='hidden'][name='isMatch']").val("0");
				$("#form").submit();
			},
			proListComplete: function(){
				//SPU 聚合商品图片展示
				var uit=$(".listicon-1").length;
				for(var j=0;uit>j;j++){
					var uiu= $(".listicon-1").eq(j).find("dd").length;
					if(uiu>6){
						$(".listicon-1").eq(j).find(".right-bg").show().siblings(".left-bg").show();
						$(".listicon-1").eq(j).find("dl").css("left",17);
					}else{
						$(".listicon-1").eq(j).find(".right-bg").hide().siblings(".left-bg").hide();
					}
				}
				
				$(".left-bg").click(function(){
					var ges=parseInt($(this).siblings("dl").attr("id"));
					ges++;
					$(this).siblings(".right-bg").removeClass("bn-2");
					if(ges>=0){
						ges=0;
						$(this).addClass("bn-1");
					}
					$(this).siblings("dl").attr("id",ges).animate({left:ges*34+17},100);
				});
				$(".right-bg").click(function(){
					var ges=parseInt($(this).siblings("dl").attr("id"));
					ges--;
					$(this).siblings(".left-bg").removeClass("bn-1");
					if(ges<=(-($(this).siblings("dl").find("dd").length-5))){
						ges=(-($(this).siblings("dl").find("dd").length-5));
						$(this).addClass("bn-2");
					}
					$(this).siblings("dl").attr("id",ges).animate({left:ges*34+17},100);
				});
				
				$(".listicon-1").find("dd").mouseover(function(){
					$(this).addClass("on").siblings("dd").removeClass("on");
					var proImg = $(this).parents(".listicon-1").siblings(".pro-img");
					proImg.find("img").attr("src",$(this).find("img").attr("src"));
					proImg.find("img").attr("title",$(this).find("span").attr("goodsName"));
					proImg.find("a").attr("href",$(this).find("span").attr("goodsUrl"));
					var proNameA = $(this).parents(".listicon-1").siblings(".pro-name").find("a");
					proNameA.attr("href",$(this).find("span").attr("goodsUrl"));
					proNameA.html($(this).find("span").attr("goodsName"));
					proNameA.attr("title",$(this).find("span").attr("goodsName"));
				});
			},blMd: function(hasGoodFlag){
				var totalCount = $("#totalCount").val(),blList,zywId = "",zywnrId="",zywlx="",pageId,pageIndex = Number($("#pageIndex").val()),val,vkey,vk,categoryId="";
				if (bl_ad.length) {
					blList = bl_ad.split("_-_");
					zywId = blList[0]==undefined?"":blList[0];
					zywnrId = blList[1]==undefined?"":blList[1];
					zywlx = blList[2]==undefined?"":blList[2];
				}
				if (hasGoodFlag) {
					if(k){
						pageId = "PC_搜索结果页";
						val = k,vk="搜索词",vkey="搜索词-_-1";
						categoryId = "PC_Search";
					}else if(c){
						pageId = c.indexOf("a") < 0 ? "PC_页面目录页_"+c : "PC_类目列表页_"+c;
						categoryId = c.indexOf("a") < 0 ? "PC_PageCatalogue" : "PC_List";
						val = c,vk="分类",vkey="分类-_-2";
					}
					cmPageId = "PC_搜索结果页_"+vk+"_第" + pageIndex + "页";
				}else{
					pageId = "PC_搜索无结果页";
					cmPageId = "PC_搜索无结果页";
					categoryId = "PC_Search";
				}
				//coremetrics
				if (bl_ad.length) {
					cmCreatePageviewTag(cmPageId, jsonPageInfo.categoryId, val, totalCount, vkey+'-_--_--_--_-'+bl_mmc+'-_-PC-_--_--_-'+mid+'-_-'+bl_nurl+"-_-"+bl_sourceurl+"-_-"+zywId+"-_-"+zywnrId+"-_--_-"+zywlx);
				}else{
	                cmCreatePageviewTag(cmPageId, jsonPageInfo.categoryId, val, totalCount, vkey+'-_--_--_--_-'+bl_mmc+'-_-PC-_--_--_-'+mid+'-_-'+bl_nurl+"-_-"+bl_sourceurl+"-_--_-"+bl_ad);
				}
				//神策PageView
            	sa.registerPage({
            		memberId:mid,
            		resourceId:zywId,
            		resourceType:zywlx,
            		deployId:unescape("\""+zywnrId+"\""),
            		pageId:pageId,
            		categoryId:categoryId,
            		mmc:bl_mmc
            	});
            	sa.quick('autoTrack');
			}
		}
	};
//  trace.fun.init(cook);
	//侧边栏浏览记录
//	commonTrace.fun.init(cook);
	
	var mti = cookies.fun.get("_m_t_i");
	if(typeof(mti)!="undefined" && mti.length > 0){
		mid = base64_decode(mti).split("&mi=")[1];
	}
	
	//品牌首字母过滤
	var  hdl=$(".hdl:eq(0) dd");      
    hdl.click(function(){
    	$(this).addClass("on").siblings().removeClass("on");
    	var text=$(this).text();
    	var index=$(this).index();
    	$(".list-class1 li[myattr!="+text+"]").hide();
    	$(".list-class1 li[myattr="+text+"]").show();
    	index===0?$(".list-class1 li").show():null;
	});
    
    //是否展开
    var spread = true;
    //是否多选显示
    var multiselect = true;
    //是否多选
    var ismulti = false;
	//展开收起
	$(".frbutton1").click(function(){
		//已选择品牌
		var choiceShow="";
		//$(this).toggleClass("zk-icon").parents(".fr-button").siblings(".wid-list").find(".sx-show").eq(0).show().toggleClass("shshow").siblings(".sx-show").hide();
		$(".list-class1").find("li").removeClass("on");
		$(".list-class").find("li.on").each(function(){
			var i = $(this).index();
			$(".list-class1").find("li").eq(i).addClass("on");
		});
		if(spread){
			spread = false;
			$(this).text("收起");
			$(this).parents(".fr-button").siblings(".wid-list").find(".sx-show").eq(1).show().siblings(".sx-show").hide();
			$(".showbutton").hide();
		}else{
			spread = true;
			$(this).text("展开");
			$(this).parents(".fr-button").siblings(".wid-list").find(".sx-show").eq(1).hide().siblings(".sx-show").show();
		}
		$(".choice-show").html("");
		$(".list-class1").find("li.on").each(function(){
			choiceShow+="<label><input type=\"checkbox\" checked='checked' value=\""+$(this).find("i").attr("data-code")+"\"><span>"+$(this).find("i").html()+"</span></label>";
		});
		$(".choice-show").html(choiceShow);
		if($(".list-class1").find(".on").length>0){
			$(".choice").show();
		}else{
			$(".choice").hide();
		}
		multiselect = true;
		ismulti = false;
	});
	
	//多选展开
	$(".fr-button-1").click(function(){
		//已选择品牌
		var choiceShow="";
		$(".list-class1").find("li").removeClass("on");
		$(".list-class").find("li.on").each(function(){
			var i = $(this).index();
			$(".list-class1").find("li").eq(i).addClass("on");
		});
		if(multiselect){
			multiselect = false;
			$(this).parents(".fr-button").siblings(".wid-list").find(".sx-show").eq(1).show().siblings(".sx-show").hide();
			$(".showbutton").show();
			spread = true;
			$(".frbutton1").text("展开");
			ismulti = true;
		}else{
			multiselect = true;
			$(this).parents(".fr-button").siblings(".wid-list").find(".sx-show").eq(1).hide().siblings(".sx-show").show();
		}
		$(".choice-show").html("");
		$(".list-class1").find("li.on").each(function(){
			choiceShow+="<label><input type=\"checkbox\" checked='checked' value=\""+$(this).find("i").attr("data-code")+"\"><span>"+$(this).find("i").html()+"</span></label>";
		});
		$(".choice-show").html(choiceShow);
		if($(".list-class1").find(".on").length>0){
			$(".choice").show();
		}else{
			$(".choice").hide();
		}
	});
	//品牌切换
	$(".listicon-1").find("dd").hover(function(){
		$(this).parents(".listicon-1").siblings(".pro-img").find("img").attr("src",$(this).find("img").attr("src"));
	});
	//列表类型
	$(".option").find("label").find("input").die().live("click",function() {
		var act = "";
		var isava = "";
		var yunType = "";
		var ifPickup = "";
		var goodsType = "";
		var promotion = "";
		$(this).parents().find("label").each(function() {
			var c=$(this).find("input").attr("checked");
			var code=$(this).find("input").attr("data-code");
			if (c == "checked") {
				if (code == "isava") {//库存
					isava = "1";
				} else if(code == "promotion"){//促销
					act = "4,5,11,7,13";
					promotion = "1,6";
				} else if(code == "yunType"){//百联自营
					yunType = "1";
				} else if(code == "ifPickup"){//可自提
					ifPickup = "1";
				} else if(code == "goodsType"){//全球购
					goodsType = "8";
				}
			}
		});
		// 用于查询过滤列表
		$("#form input[name='isava']").val(isava);
		$("#form input[name='act']").val(act);
		$("#form input[name='promotion']").val(promotion);
		$("#form input[name='yunType']").val(yunType);
		$("#form input[name='ifPickup']").val(ifPickup);
		$("#form input[name='goodsType']").val(goodsType);
		search.param.isava = isava;// 用于查询商品列表
		search.param.act = act;
		search.param.promotion = promotion;
		search.param.yunType = yunType;
		search.param.ifPickup = ifPickup;
		search.param.goodsType = goodsType;
		//search.fn.ajaxFindGoods();// 异步加载商品列表
		search.fn.formSubmit();
	});
	// 排序??sorCol  排序类别新增两种，后台调整
	$(".listclass").find("li").click(function() {
		if($(this).find("a").hasClass("disable")){
			return;
		}
		var $a = $(this).find("a");
		var sorTye = "";// 排序类型（升序、降序）
		// 排序字段
		var sorCol = $(this).attr("data-value");
		if($(this).hasClass("upanddown")){
			if ($(this).hasClass("on")) {//即表示现在为降序（无class时是箭头向下）
				return; 
			}else{
				$(this).removeClass("down").addClass("on");
				sorTye = "0";// 降序
			}
		}else {
			if(sorCol == 'pri'){//价格排序
				$(this).toggleClass("down");
				$(this).addClass("on");
				if ($(this).hasClass("down")) {//即表示现在为降序（无class时是箭头向下）
					sorTye = "1";// 升序
					$a.attr("title","点击后价格从高到低");
				}else{
					sorTye = "0";// 降序
					$a.attr("title","点击后价格从低到高");
				}
			} else if(sorCol == ''){
				$(this).parents(".listclass").find("li.on").each(function(){
					var col = $(this).attr("data-value");
					if(col == 'sal'){//销量排序
						$(this).find("a").attr("title","点击后按销量从高到低");
					}else if(col == 'com'){//评论排序
						$(this).find("a").attr("title","点击后按评论从高到低");
					}else if(col == 'crd'){
						$(this).find("a").attr("title","");
					}else if(col == 'pri'){
						$(this).find("a").attr("title","点击后价格从低到高");
					}
				});
				$(this).removeClass("down").addClass("on");
			}
		}
		$(this).siblings("li").removeClass("on down");
		if($(this).parent().find("li.on").size()==0){
			$(this).parent().find("li").eq(0).addClass("on");
		}
		search.param.sorCol = sorCol;
		search.param.sorTye = sorTye;
		search.fn.ajaxFindGoods();// 异步加载商品列表
		// 分页跳转到产品列表
		$(".sequence").removeClass("sequence-fixed");
    	$("html,body").animate({scrollTop: $(".sequence").offset().top}, 100);
	});
	// 多选品牌
	$(".list-class1").find("li").click(function() {
		if(ismulti){
			$(this).toggleClass("on");
			var code = $(this).find("i").attr("data-code");
			var i = $(this).index();
			if($(this).attr('class') === 'on'){
				var choiceShow="<label><input type=\"checkbox\" checked='checked' value=\""+code+"\"><span>"+$(this).find("i").html()+"</span></label>";
				$(".choice-show").append(choiceShow);
			}else{
				$(".choice-show").find("label").find("input[value='"+code+"']").parent().remove();
			}
			if($(".list-class1").find(".on").length>0){
				$(".choice").show();
			}else{
				$(".choice").hide();
			}
		}else{
			var choosedPropsJson = search.fn.getChoosedProps();
			var key = $(this).parents(".filter-right").siblings(".filter-left").find("span").attr("data-code");
			var value = choosedPropsJson[key];
			var code = $(this).find("i :eq(0)").attr("data-code");// 当前选择的品牌代码
			var leftValue = "";// 除当前选中的这个值除外的其它值
			if (value) {
				if (new RegExp(code + ",").test(value)) {
					leftValue = value.replace(new RegExp(code + ","), "");
				} else {
					leftValue = value.replace(new RegExp(code), "");
				}
			}
			if ($(this).attr('class') === 'on') {
				// 如果去掉某个选中的值
				if (leftValue) {
					choosedPropsJson[key] = leftValue;
				} else {
					delete choosedPropsJson[key];
				}
			} else {
				choosedPropsJson[key] = $(this).children("i").attr("data-code");
			}
			$("#form input[name='props']").val(JSON.stringify(choosedPropsJson));
			search.param.props = JSON.stringify(choosedPropsJson);
			cmCreateElementTag("品牌分类点击","PC_搜索","PC_搜索-_--_--_--_--_--_--_-"+k+"-_-"+$("input[type='hidden'][name='c']").val()+"-_-"+$(this).children("i").attr("data-code")+"-_-");
			search.fn.formSubmit();
		}
	});
	$(".choice-show").find("label").find("input").die().live("click",function() {
		var code = $(this).val();
		if(ismulti){
			$(".list-class1").find("li").each(function(){
				if($(this).find("i").attr("data-code")==code){
					$(this).removeClass("on");
				}
			});
			$(this).parent().remove();
			if($(".list-class1").find(".on").length>0){
				$(".choice").show();
			}else{
				$(".choice").hide();
			}
		}else{
			var choosedPropsJson = search.fn.getChoosedProps();
			var key = $(this).parents(".filter-right").siblings(".filter-left").find("span").attr("data-code");
			var value = choosedPropsJson[key];
			var leftValue = "";// 除当前选中的这个值除外的其它值
			if (value) {
				if (new RegExp(code + ",").test(value)) {
					leftValue = value.replace(new RegExp(code + ","), "");
				} else {
					leftValue = value.replace(new RegExp(code), "");
				}
			}
			if (leftValue) {
				choosedPropsJson[key] = leftValue;
			} else {
				delete choosedPropsJson[key];
			}
			$("#form input[name='props']").val(JSON.stringify(choosedPropsJson));
			search.param.props = JSON.stringify(choosedPropsJson);
			search.fn.formSubmit();
		}
	});
	// 选择多个筛选条件，如多个品牌
	$(".wid-list li").click(function() {
		if($(this).parent().attr("class")!=='ulfclass'){
			var choosedPropsJson = search.fn.getChoosedProps();
			var key = $(this).parents(".filter-right").siblings(".filter-left").find("span").attr("data-code");
			var value = choosedPropsJson[key];
			var code = $(this).find("i :eq(0)").attr("data-code");// 当前选择的品牌代码
			var leftValue = "";// 除当前选中的这个值除外的其它值
			if (value) {
				if (new RegExp(code + ",").test(value)) {
					leftValue = value.replace(new RegExp(code + ","), "");
				} else {
					leftValue = value.replace(new RegExp(code), "");
				}
			}
			if (!$(".wid-list .shshow").is(":hidden") && $(".wid-list .pt6").is(":hidden")) {
				if ($(this).attr('class') === 'on') {
					// 如果去掉某个选中的值
					if (leftValue) {
						choosedPropsJson[key] = leftValue;
					} else {
						delete choosedPropsJson[key];
					}
				} else {
					choosedPropsJson[key] = $(this).children("i").attr("data-code");
				}
				$("#form input[name='props']").val(JSON.stringify(choosedPropsJson));
				search.param.props = JSON.stringify(choosedPropsJson);
				cmCreateElementTag("品牌分类点击","PC_搜索","PC_搜索-_--_--_--_--_--_--_-"+k+"-_-"+$("input[type='hidden'][name='c']").val()+"-_-"+$(this).children("i").attr("data-code")+"-_-");
				search.fn.formSubmit();
			}
		}
	});
	// 多选下拉框中的“确定”事件
	$(".showbutton").find("button:eq(0)").click(function() {
		var pdiv = $(this).parent().parent();
		if(ismulti||!pdiv.is(":hidden")){
			var choosedPropsJson = search.fn.getChoosedProps();
			// 取到用户多选的值
			var code = "";
			$(".list-class1").find("li.on").each(function() {
				code += $(this).find("i :eq(0)").attr("data-code") + ",";
			});
			$(this).parents().find(".multiselect").find("input[type='checkbox']:checked").each(function(){
				code += $(this).val() + ",";
			});
			$(this).parents(".morechoice").find("input[type='checkbox']:checked").each(function(){
				code += $(this).val() + ",";
			});
			// 取到当前的过滤条件(品牌、价格等)
			var key = $(this).parents(".filter-right").siblings(".filter-left").find("span").attr("data-code");
			if(typeof(key)=="undefined"){
				key = $(this).parents(".morechoice").find(".showbg").attr("data-parent");
			}
			if (code === '') {
				//return false;
				delete choosedPropsJson[key];
			} else {
				code = code.substr(0, code.length - 1);
				choosedPropsJson[key] = code;
			}
			$("#form input[name='props']").val(JSON.stringify(choosedPropsJson));
			search.param.props = JSON.stringify(choosedPropsJson);
			cmCreateElementTag("品牌分类点击","PC_搜索","PC_搜索-_--_--_--_--_--_--_-"+k+"-_-"+$("input[type='hidden'][name='c']").val()+"-_-"+code.replace(/\,/g,"_")+"-_-");
			search.fn.formSubmit();
		}
	});
	// "取消"按钮事件
	$(".showbutton").find("button:eq(1)").click(function() {
		if(ismulti){
			if($(this).hasClass("prop-btn")){
				return;
			}
			$(".fr-button-1").trigger("click");
			$(".list-class1").find("li").removeClass("on");
		}
	});
	
	$(".prop-btn").click(function() {
		$(this).parents(".multiselect").find("input[type='checkbox']").attr("checked",false);
		$(this).parents(".sx-show").toggle().siblings(".sx-show").toggle();
	});
	
	$(".multiselect").find("label").click(function(){
		if($(this).parent().find("input:checked[type=checkbox]").length>0){
			$(this).parent().find("button.sbutton").removeClass("btn-notsubmit").addClass("btn-secondary").removeAttr("disabled");
		}else{
			$(this).parent().find("button.sbutton").addClass("btn-notsubmit").removeClass("btn-secondary").attr("disabled","disabled");
		}
	});
	$(".frbutton3").click(function(){
		$(this).parents(".fr-button").siblings(".wid-list").find(".sx-show").eq(1).toggle().siblings(".sx-show").toggle();
	});
	
	$("#keySearch").click(function(){
		keySearch($(this).siblings("input"));
	});
	
	$(".search").click(function(){
		keySearch($(this).siblings("input"));
	});
	
	$(".search").siblings("input").keydown(function(e){
		var theEvent = window.event || e; 
		var code = theEvent.keyCode || theEvent.which;
		//13是键盘上面固定的回车键
		if (code == 13) {
			keySearch($(this));
		}
	});
	
	$("#keySearchInput").keydown(function(e){
		var theEvent = window.event || e; 
		var code = theEvent.keyCode || theEvent.which;
		//13是键盘上面固定的回车键
		if (code == 13) {
			keySearch($(this));
		}
	});
	function keySearch(obj){
		var v = obj.val();
		var kc = $("input[type='hidden'][name='c']").val();
		if(kc==""&&v==""){
			window.location.href = window.location.href;
			return;
		}
		if(window.location.href.indexOf('k-')>-1 && kc!=""){
			window.location.href = domain.search + "/k-" + URLencode(v) + ".html?c="+kc;
			return;
		}else{
			window.location.href = domain.search + "/c-" + kc + ".html?k="+URLencode(v);
			return;
		}
	}
	
	// 选择单一筛选条件，有多选的除外??面包屑的展示
	$(".filter-item a").click(function() {
		var choosedProp = search.fn.getChoosedProps();
		// 用户点击的过滤条件放到props属性值中，如果是一级分类，parentCode中有'@'，用这个区分
		var parentCode = $(this).attr("data-parent");
		var code = $(this).attr("data-code");
		if (search.param.k == '' && parentCode.indexOf('@') > 0 && code.indexOf('@') > 0) {
			var subId = code.substr(code.indexOf('@') + 1);
			cmCreateElementTag("品牌分类点击","PC_搜索","PC_搜索-_--_--_--_--_--_--_-"+k+"-_-"+subId+"-_--_-");
			$("#form").attr("action", domain.search + "/c-" + subId + ".html");
			$("input[type='hidden'][name='k']").val(URLencode(k,false));
			$("#form").submit();
		} else if (search.param.k == '' && parentCode.indexOf('category') > -1) {
			cmCreateElementTag("品牌分类点击","PC_搜索","PC_搜索-_--_--_--_--_--_--_-"+k+"-_-"+code+"-_--_-");
			$("#form").attr("action", domain.search + "/c-" + code + ".html");
			$("input[type='hidden'][name='k']").val(URLencode(k,false));
			$("#form").submit();
		} else if(search.param.k !== ''){
			//关键字搜索时
			if (parentCode.indexOf('@') > 0 && code.indexOf('@') > 0) {
				var subId = code.substr(code.indexOf('@') + 1);
				cmCreateElementTag("品牌分类点击","PC_搜索","PC_搜索-_--_--_--_--_--_--_-"+k+"-_-"+subId+"-_--_-");
				$("#form").attr("action", domain.search + "/c-" + subId + ".html");
				$("input[type='hidden'][name='k']").val(URLencode(k,false));
				$("#form").submit();
			} else if (parentCode.indexOf('category') > -1) {
				cmCreateElementTag("品牌分类点击","PC_搜索","PC_搜索-_--_--_--_--_--_--_-"+k+"-_-"+code+"-_--_-");
				$("#form").attr("action", domain.search + "/c-" + code + ".html");
				$("input[type='hidden'][name='k']").val(URLencode(k,false));
				$("#form").submit();
			} else {
				choosedProp[parentCode] = code;
				$("#form input[name='props']").val(JSON.stringify(choosedProp));
				search.param.props = JSON.stringify(choosedProp);
				search.fn.formSubmit();
			}
		} else {
			choosedProp[parentCode] = code;
			$("#form input[name='props']").val(JSON.stringify(choosedProp));
			search.param.props = JSON.stringify(choosedProp);
			search.fn.formSubmit();
		}
	});
	
	// 去掉某个筛选条件??
	$(".screening-conditions img").click(function() {
		var choosedPropsJson = search.fn.getChoosedProps();
		var key = $(this).attr("data-code");
		delete choosedPropsJson[key];
		$("#form input[name='props']").val(JSON.stringify(choosedPropsJson));
		search.param.props = JSON.stringify(choosedPropsJson);
		search.fn.formSubmit();
	});

	// 清除所有筛选条件??
	$(".frmr15 a").click(function() {
		search.fn.removeAllFilterConds();
	});

	// 加载商品
	search.fn.ajaxFindGoods();
	
	// 左右分页点击事件
	$(".sequence-right-pt .fr-show a").click(function() {
		var pageIndex = Number($("#currentPageIndex").text());
		var pageCount = Number($("#merchantCountPage1").text());
		if (this.className == 'swicon buledt') {
			pageIndex = pageIndex - 1;
			if (pageIndex === 0)
				return false;
		}
		if (this.className == 'swicon buridt') {
			pageIndex = pageIndex + 1;
			if (pageIndex > pageCount)
				return false;
		}
		search.fn.pageClick(pageIndex);
	});
	
	$(".ulfclass").find(".spc").hover(function(){
		if($(this).find("dd").length>=3){
			$(this).find(".showbg dl").width($(this).find("dd").innerWidth()*3);
			$(this).find(".showbg").width($(this).find("dd").innerWidth()*3+66);
		}else{
			$(this).find(".showbg dl").width($(this).find("dd").innerWidth()*$(this).find("dd").length);
			$(this).find(".showbg").width($(this).find("dd").innerWidth()*$(this).find("dd").length+66);
		}
	});
	$(".ulfclass").find(".normal").hover(function(){
		if($(this).find("dd").length>=3){
			$(this).find(".showbg dl").width($(this).find("dd").innerWidth()*3);			
		}else{
			$(this).find(".showbg dl").width($(this).find("dd").innerWidth()*$(this).find("dd").length);			
		}
	});
	

	function ft(){
		var o=0;
		for(var le=0;le<$(".path-icon").length;le++){
			o=o+$(".path-icon").eq(le).innerWidth();
		}
		var wi=$(".path-left").innerWidth();
		var wd=$(".pathclip").width();
		var gt=0;
		if(gt>=0){
			$(".path-tue1").hide();
		}else{
			$(".path-tue1").show();
		}
		$(".path-pa").width(o+250);
		$(".path-tue").click(function(){
			gt--;
			if((o+wd*gt)>wd){
				$(".path-pa").animate({left:gt*wd},300);
				$(".path-tue").show();
			}else{
				gt=-Math.floor(o/wd);
				$(".path-pa").animate({left:gt*wd},300);
				$(".path-tue").hide();
			}
			if(gt>=0){
				$(".path-tue1").hide();
			}else{
				$(".path-tue1").show();
			}
		});
		$(".path-tue1").click(function(){
			gt++;
			if((o+wd*gt)>wd){
				$(".path-pa").animate({left:gt*wd},300);
				$(".path-tue").show();
			}else{
				gt=-Math.floor(o/wd);
				$(".path-pa").animate({left:gt*wd},300);
				$(".path-tue").hide();
			}
			if(gt>=0){
			$(".path-tue1").hide();
			}else{
				$(".path-tue1").show();
			}
		});
		
		if(o<wi){
			$(".path-tue").hide();
		}else{
			$(".path-tue").show();
		}
	}
	$(function(){
		$(".wid-list").find(".show1").each(function(){
			var w = 0;
			$(this).find(".filter-right-item").each(function(){
				w = w+$(this).outerWidth(true);
			});
			var pw = $(this).width();
			if(w>pw){
				$(this).parent().siblings(".fr-button").append("<div class=\"fr-button-b frbutton2\">展开</div>");
			}
		});
		$(".frbutton2").click(function(){
			$(this).toggleClass("zk-icon").parents(".fr-button").siblings(".wid-list").find(".sx-show").eq(0).show().toggleClass("show1").siblings(".sx-show").hide();
			if($(this).text()=="展开"){
				$(this).text("收起");
			}else{
				$(this).text("展开");
			}
		});
		ft();
		var t=139;/*元素li宽度*/
		var s=6;/*每行个数*/
		$(".path-show").hover(function(){
			var i=$(this).find("li").length;/*元素li总个数*/
			var h=$(this).find("li").find("dd").height();/*元素li中子元素高度*/
			var r=0;/*元素li中的默认个数*/
			for(var d=0;d<i;d++){
				var ri=$(this).find("li").eq(d).find("dd").length;
				if(ri>=r){
					r=ri;
				}
				/*元素li中的最多个数*/
			}
			$(this).find("li").height(h*r);
			/*元素li的高度*/
			if(i>s){
				$(this).find(".show-drop-bg").width(t*s);
				/*元素li个数大于6时 度宽度*/
			}else{
				$(this).find(".show-drop-bg").width(t*i);
				/*元素li个数小于6时 度宽度*/
			}
		});
		$(".path-input").find("input").focus(function(){
			$(this).parents(".path-input").addClass("path-input-bk");
			$(this).attr("placeholder"," ");
		});
		$(".path-input").find("input").blur(function(){
			$(this).parents(".path-input").removeClass("path-input-bk");
			$(this).attr("placeholder","在当前条件下搜索");
		});
		$(".white-gb").click(function(){
			$(this).parents(".path-icon").remove();
			ft();
			var choosedPropsJson = search.fn.getChoosedProps();
			delete choosedPropsJson[$(this).attr("data-code")];
			$("#form input[name='props']").val(JSON.stringify(choosedPropsJson));
			search.param.props = JSON.stringify(choosedPropsJson);
			if(window.location.href.indexOf('k-')>-1 && k!=""){
				$("#form").attr("action", domain.search + "/k-" + URLencode(k) + ".html");
				$("input[type='hidden'][name='k']").remove();
			}else{
				$("#form").attr("action", domain.search + "/c-" + $("input[type='hidden'][name='c']").val() + ".html");
				$("input[type='hidden'][name='k']").val(encodeURI(k).replace(/\//g,"%2F")
							.replace(/\$/g,"%24").replace(/\@/g,"%40")
							.replace(/\\/g,"%5C").replace(/\#/g,'%23')
							.replace(/\;/g,"%3B").replace(/\?/g,'%3F')
							.replace(/\&/g,'%26').replace(/\+/g,'%2B')
							.replace(/\</g,'%3C').replace(/\>/g,'%3E')
							.replace(/\^/g,'%5E'));
				$("input[type='hidden'][name='c']").remove();
			}
			if($(this).attr("data-code")=="displayBrandSid"){
				search.param.isMatch = '0';
				$("input[type='hidden'][name='isMatch']").val("0");
			}
			$("#form").submit();
		});
		var pla="¥ 最低价";
		var plb="¥ 最高价";
		$(".moneyshow").find("input").focus(function(){
			$(this).addClass("inp-focus").siblings(".ltshow").show().parent().addClass("showheight");
			$(this).attr("placeholder"," ");
		});
		$(".moneyshow").find("input").blur(function(){
			$(this).removeClass("inp-focus");
			if($(".moneyshow").find("input").eq(0).val()==""){
				$(".moneyshow").find("input").eq(0).attr("placeholder",pla);
			}
			if($(".moneyshow").find("input").eq(1).val()==""){
				$(".moneyshow").find("input").eq(1).attr("placeholder",plb);
			}
		});
		$(".ltshow").find(".fl").click(function(){
			$("#priceAreaMin").val("");
			$("#priceAreaMax").val("");
			$(".moneyshow").find("input").eq(0).attr("placeholder",pla);
			$(".moneyshow").find("input").eq(1).attr("placeholder",plb);
			$(".moneyshow").removeClass("showheight").find(".ltshow").hide();
			var  priceAreaMin = $("#priceAreaMin").val();
			var  priceAreaMax = $("#priceAreaMax").val();
			search.fn.getInputPrice(priceAreaMin,priceAreaMax);
		});
		$(".ltshow").find(".fr").click(function(){
			$(".moneyshow").removeClass("showheight").find(".ltshow").hide();
			var  priceAreaMin = $("#priceAreaMin").val();
			var  priceAreaMax = $("#priceAreaMax").val();
			search.fn.getInputPrice(priceAreaMin,priceAreaMax);
		});
		var uit=$(".listicon-1").length;
		for(var j=0;uit>j;j++){
			var uiu= $(".listicon-1").eq(j).find("dd").length;
			if(uiu>6){
				$(".listicon-1").eq(j).find(".right-bg").show().siblings(".left-bg").show();
				$(".listicon-1").eq(j).find("dl").css("left",17);
			}else{
				$(".listicon-1").eq(j).find(".right-bg").hide().siblings(".left-bg").hide();
			}
		}
		$(".path").hover(function(){
			$(this).find(".pathclip").removeClass("ovhidden");
		});
	});
	
	$(document).click(function(){
		$(".moneyshow").removeClass("showheight").find(".ltshow").hide();
	});
	$(".moneyshow").click(function(event){
		event.stopPropagation();
	});
	
	$(".morechoicebutton").click(function(){
	    $(this).parents(".onechoice").hide();
		$(this).parents(".onechoice").siblings(".morechoice").show();
	});
	
	$(".btn-submitclick").click(function(){
	    $(this).parents(".morechoice").hide();
        $(this).parents(".morechoice").siblings(".onechoice").show();
        $(this).parents(".morechoice").find("input[type='checkbox']").attr("checked",false);
	});
	
	$(".showbg").find("label").click(function(){
		if($(this).parent().find("input:checked[type=checkbox]").length>0){
			$(this).parent().find("button.sbutton").removeClass("btn-notsubmit").addClass("btn-secondary").removeAttr("disabled");
		}else{
			$(this).parent().find("button.sbutton").addClass("btn-notsubmit").removeClass("btn-secondary").attr("disabled","disabled");
		}
	});
	
	//最近浏览 加入cook
	var cook = cookies.fun.get("_IOKBL_B_P");
	//浏览记录
	getTrace(cook);
});

//百度监控JS代码
$(document).ready(function() {
	var _hmt = _hmt || []; 
	(function() { 
		var hm = document.createElement("script"); 
		hm.src = "//hm.baidu.com/hm.js?d4bb30b3ba58b04cd3d04be8ebb57263";
		var s = document.getElementsByTagName("script")[0]; 
		s.parentNode.insertBefore(hm, s);
	})(); 
});

//进行DSP流量统计代码的部署
$(document).ready(function() {
	var _mvq = window._mvq || [];
	window._mvq = _mvq;
	_mvq.push(['$setAccount', 'm-220844-0']);
	_mvq.push(['$setGeneral', '', '','', '']);
	_mvq.push(['$logConversion']);
	(function(){ 
		var mvl = document.createElement('script'); mvl.type = 'text/javascript'; mvl.async = true; 
		mvl.src = ('https:' == document.location.protocol ? 'https://cdn.dsp.com/static/js/loader.js' : 'http://cdn.dsp.com/static/js/loader.js'); var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(mvl, s); 
	 }
	)(); 
});
