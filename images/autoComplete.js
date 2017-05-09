var addUrl = "";
function URLencode(sStr){
	sStr = encodeURI(sStr).replace(/\//g,"%2F")
	.replace(/\$/g,"%24").replace(/\@/g,"%40")
	.replace(/\\/g,"%5C").replace(/\#/g,'%23')
	.replace(/\;/g,"%3B").replace(/\?/g,'%3F')
	.replace(/\&/g,'%26').replace(/\+/g,'%2B')
	.replace(/\</g,'%3C').replace(/\>/g,'%3E')
	.replace(/\^/g,'%5E').replace(/\%/g,'%25');
    return sStr;
}

var top_searchAut = {
		len_ : 17,
	showCount : 10,// 历史搜索最多显示数量
	domin : domain.cookie,// .iokbl.com
	cookieName : "i_h_s",// cookie的名称
	cookieHours : 20,// cookies 超时时间
	count : 1,// count 用于控制 请求时常大于手动输入速度
	catoryId : "0",//
	url : "",
	placeholder : "",
	searchValLenght:200,//查询关键字的长度限制
	onecStoreLength:20,//每次存入cookie的长度
	_event : function(_searchInput, flag, searchBtu) {
		var parentThis = this;
		_searchInput.focus(function() {
			this.index = undefined;
			parentThis.focusF(this, flag);
		});
		_searchInput.blur(function() {
			parentThis.blurB(parentThis,this);
		});
		_searchInput.keyup(function(event) {
			parentThis.autoComplete(this, event, flag);
		});
		if (searchBtu) {
			searchBtu.click(function() {
				parentThis.butClick(this);
			});
		}
		if (flag) {
			$(".header-input-title-fr").click(
					function() {
						parentThis.delCookie(parentThis.cookieName);
						var serarInput = $(this).parent().parent().parent()
								.siblings().find("input");
						var search_show_div = $(this).parent().parent()
								.parent();
						parentThis.exporHistory(serarInput, search_show_div);
					});
		}
	},
	butClick : function(_this) {//
		var value = $(_this).parent().siblings().find("input").val();
		if (URLencode(value) !== ""&&!$(_this).parent().siblings().find("input").hasClass("gray")) {
			value=this.getAfterSubValue(value,this.searchValLenght);
			addUrl ="?bl_ad=P668822_-_"+escape(value)+"_-_5";
			if (bl_mmc!=undefined && bl_mmc != "") {
				addUrl += "&bl_mmc="+bl_mmc;
			}
			window.location.href = domain.search + "/k-" + URLencode(value) + ".html"+addUrl;
		}else{
			var url = top_searchAut.url;
			if(url!==""&&typeof(url)!="undefined"){
				if(url.indexOf("?")<0){
					url = url+addUrl;
				}else{
					url = url+addUrl.replace("?","&");
				}
				window.location.href = url;
			}
		}
	},
	getAfterSubValue:function(value,needLength){
		if(typeof(value)!="undefined"){
			if(value.length>needLength){
				value=value.substr(0,needLength);
			}
		}
		return value;
	},
	focusF : function(_this, falg) {// 获取焦点触发的方法
		var search_show_div = $(_this).parent().siblings("div").not(
				$("div:has(button)"));
		search_show_div.hide();
		if (($(_this).val() === "" || ($(_this).hasClass("gray") && $(_this).val() != "")) && falg) {
			search_show_div.first().show();
			this.exporHistory(_this, search_show_div.first());
		} else {
			this.toAutoComplete(_this, search_show_div, falg);
		}
		if($(_this).hasClass("gray")){
			$(_this).removeClass("gray").attr("value","");
		}
	},
	blurB : function(parentThis,_this){
		if($(_this).val()==""&&!$(_this).hasClass("gray")){
			$(_this).addClass("gray").attr("value",parentThis.placeholder);
		}else{
			if($(_this).attr("id")=="first_float_serarch_input"&&$(_this).parents(".top-header")){
				return;
			}else{
				$(_this).removeClass("gray");
			}
		}
	},
	autoComplete : function(_this, _event, falg) {
		var search_show_div = $(_this).parent().siblings("div").not(
				$("div:has(button)"));
		if (_event.keyCode == 8 || _event.keyCode >= 65 && _event.keyCode <= 95|| _event.keyCode >= 97 && _event.keyCode <= 122|| _event.keyCode >= 48 && _event.keyCode <= 57|| _event.keyCode == 32) {
			_this.index = undefined;
			this.toAutoComplete(_this, search_show_div, falg);
		}
		var lis;
		if ($(_this).val() === "") {
			lis = search_show_div.first().find("dd");
		} else {
			lis = search_show_div.last().find("dd");
		}
		var current_li;
		// 方向下建40 上建38
		if (_event.keyCode == 40) {
			if (_this.index === undefined || _this.index >= lis.length - 1) {
				_this.index = 0;
			} else {
				_this.index++;
			}
			current_li= lis.eq(_this.index);
			current_li.parent().parent().parent().find("dd").removeClass(
					"on");
			current_li.addClass("on");
			return;
		}
		if (_event.keyCode == 38) {
			if (_this.index === undefined || _this.index <= 0) {
				_this.index = lis.length;
			} else {
				_this.index--;
			}
			current_li = lis.eq(_this.index);
			current_li.parent().parent().parent().find("dd").removeClass("on");
			current_li.addClass("on");
			return;
		}
		// 回车键处理
		if (_event.keyCode === 13) {
			if (_this.index !== undefined) {
				if (lis.eq(_this.index).find("strong").length > 0) {
					var keyword = lis.eq(_this.index).siblings("dd").find("span").html();
					seaInpVlue = this.catoryId;
					if ($(_this).val() !== "") {
						addUrl = "&bl_ad=P668822_-_"+escape(keyword)+"_-_5";
						if (bl_mmc!=undefined && bl_mmc != "") {
							addUrl += "&bl_mmc="+bl_mmc;
						}
						window.location.href = domain.search + "/c-"+ seaInpVlue + ".html?k="+URLencode(keyword)+addUrl;
					}
					return;
				} else {
					if (lis.eq(_this.index).find("span").length > 0) {
						seaInpVlue = lis.eq(_this.index).find("span").text();
					} else {
						var li=lis.eq(_this.index);
						var text=li.text();
						if(text.indexOf("...")>0){
							seaInpVlue = li.attr("title");
						}else{
							seaInpVlue = li.text();
						}
					}
				}
				$(_this).val(seaInpVlue);
			}
			_this.index = undefined;
			if ($(_this).val() !== "") {
				var value=this.getAfterSubValue($(_this).val(),this.searchValLenght);
				addUrl = "?bl_ad=P668822_-_"+escape(value)+"_-_5";
				if (bl_mmc!=undefined && bl_mmc != "") {
					addUrl += "&bl_mmc="+bl_mmc;
				}
				window.location.href = domain.search + "/k-" + URLencode(value) + ".html"+addUrl;
			}
			return;
		}
	},
	toAutoComplete : function(_this, search_show_div, flag) {
		search_show_div.first().hide();
		this.count++;
		var temp = this.count;// 保存请求前的记录
		var parentThis = this;
		search_show_div.last().hide();
		var kw = encodeURI($.trim($(_this).val()));
		if (kw !== "") {
			var url = domain.search + "/autoComputele.html";
			var params = {
				"kw" : kw,
				"count" : 11,
				"channel" : 3
			};
			// $.get(url, params, function(data) {
			$.ajax({
					type : "get",
					url : url,
					data : params,
					dataType : "jsonp",
					success : function(data) {
						if (data.result.resultInfo === null || data.result.resultInfo === undefined){
							return;
						}
						var showKeywords = data.result.resultInfo.showKeywords;
						var ul1 = search_show_div.last().find("dl").first();
						var ul2 = search_show_div.last().find("dl").last();
						ul1.empty();
						ul2.empty();
						if (showKeywords === null ||showKeywords === undefined || temp != parentThis.count){
							return;
						}
						search_show_div.hide();
						search_show_div.last().show();
						var isShow = false;// 如果结果数量都为0 则影藏div
						if (showKeywords.length > 0) {
							var spli_Categorys;// 三级分类 带有分类id 如(32342_手机)
							var categorys = "";// 分类li
							spli_Categorys = data.result.resultInfo.showCategorys;
							if (spli_Categorys !== null & spli_Categorys !== undefined) {
								isShow = true;
								var allCategoryName='';
								var name=spli_Categorys[0].name;
								var categoryId= spli_Categorys[0].categoryId;
								var li2 = $("<dd></dd>");
								if(showKeywords[0].showKeyWord!==undefined){
									$("<a href=\"javascript:;\"><span>"+ showKeywords[0].showKeyWord+ "</span></a>").appendTo(li2);
								}
								li2.appendTo(ul1);
								if(typeof(name)!='undefined'){
									parentThis.catoryId=categoryId;
									allCategoryName="<span>"+name+"</span>";
									var li1 = $("<dd></dd>");
									$("<a href=\"javascript:;\">在<strong>" + allCategoryName+ "</strong>分类 中搜索</a>").appendTo(li1);
									li1.appendTo(ul1);
								}
								ul1.parent().show();
							} else {
								ul1.parent().hide();
							}
							ul2.parent().hide();
							for (var i = 1; i < showKeywords.length; i++) {
								if (showKeywords[i].rowCount !== "0") {
									isShow = true;
									var li = $("<dd></dd>");
									var a = $("<a href=\"javascript:;\"></a>");
									var skw = showKeywords[i].showKeyWord;
									var cskw = top_searchAut.highLightKeyWord($(_this).val(), skw);
									var span = $("<span class=\"fl\">"+cskw+"</span>");
									var _i = $("<i>约"+ showKeywords[i].rowCount+ "个结果</i>");
									ul2.parent().show();
									span.appendTo(a);
									_i.appendTo(a);
									a.appendTo(li);
									li.appendTo(ul2);
								}
							}
							if (!isShow)
								search_show_div.last().hide();

						}
						parentThis.getValue(search_show_div.last());
					}
				});
		} else if (flag) {
			search_show_div.hide();
			//parentThis.hotSearchKeyWord(_this, search_show_div);
			parentThis.exporHistory(_this, search_show_div.first());
			search_show_div.first().show();
		}
	},
	getValue : function(search_show_div) {// 为li绑定事件
		var parentThis = this;
		search_show_div.find("dd").mousedown(
				function() {
					var seaInpVlue;// 搜索框值
					var inputEle = $(this).parent().parent().parent().parent().find("input");
					if ($(this).find("strong").length > 0) {
						seaInpVlue = parentThis.catoryId;
						var keyword = $(this).siblings("dd").find("span").html();
						addUrl = "&bl_ad=P668822_-_"+escape(keyword)+"_-_5";
						if (bl_mmc!=undefined && bl_mmc != "") {
							addUrl += "&bl_mmc="+bl_mmc;
						}
						window.location.href = domain.search + "/c-"+ seaInpVlue + ".html?k="+URLencode(keyword)+addUrl;
						return;
					} else {
						if ($(this).find("span").length > 0) {
							inputEle.val($(this).find("span").text());
							seaInpVlue = $(this).find("span").text();
						} else {
							if ($(this).find("span").length > 0) {
								inputEle.val($(this).find("span").text());
								seaInpVlue = $(this).find("span").text();
							} else {
								var text=$(this).text();
								if(text.indexOf("...")>0){
									inputEle.val($(this).attr("title"));
									seaInpVlue = $(this).attr("title");
								}else{
									inputEle.val($(this).text());
									seaInpVlue = $(this).text();
								}
								
							}
						}
					}
					addUrl = "?bl_ad=P668822_-_"+escape(seaInpVlue)+"_-_5";
					if (bl_mmc!=undefined && bl_mmc != "") {
						addUrl += "&bl_mmc="+bl_mmc;
					}
					window.location.href = domain.search + "/k-" + URLencode(seaInpVlue) + ".html"+addUrl;
					$(".header-input-show1").hide();
				});
		search_show_div.find("dd").mouseover(function() {
			$(this).addClass("on").siblings().removeClass("on");
			$(this).parent("dl").siblings().find("dd").removeClass("on");
		});
		search_show_div.find("dd").mouseout(function() {
			$(this).removeClass("on").siblings().removeClass("on");
			$(this).parent("dl").siblings().find("dd").removeClass("on");
		});
	},
	getHref : function(hotSearch){
		var href="";
		var $type = Number(hotSearch.jumpType);
		switch($type){
		case 0:
			href="href=\"javascript:void(0);\"";
			break;
		case 1:
			href="href=\""+domain.search+"/c-"+hotSearch.jumpId+".html\" target=\"_blank\"";
			break;
		case 2:
			href="href=\""+domain.search+"/c-9999"+hotSearch.jumpId+".html\" target=\"_blank\"";
			break;
		case 3:
			href="href=\""+domain.product+"/"+hotSearch.jumpId+".html\" target=\"_blank\"";
			break;
		case 4:
			href="href=\"javascript:void(0);\"";
			break;
		case 5:
			href="href=\""+hotSearch.jumpUrl+"\" target=\"_blank\"";
			break;
		case 6:
			href="href=\""+domain.channel+"/nl/basketry.html\" target=\"_blank\"";
			break;
		case 7:
			href="href=\""+domain.search+"/k-"+URLencode(hotSearch.jumpUrl)+".html\" target=\"_blank\"";
			break;
		case 8:
			href="href=\"javascript:void(0);\"";
			break;
		case 9:
			href="href=\"javascript:void(0);\"";
			break;
		case 10:
			href="href=\""+domain.s+"/gs/saleStore.html?flashId="+hotSearch.jumpId+"\" target=\"_blank\"";
			break;
		case 11:
			href="href=\"javascript:void(0);\"";
			break;
		case 12:
			href="href=\"javascript:void(0);\"";
			break;
		default:
			href="href=\"javascript:void(0);\"";
		}
		return href;
	},
	hotSearchKeyWord : function(_this,search_show_div) {// 热门关键字
		if(search_show_div.size()>0){
			var pageType = "";
			var cateId = "";
			var locHref = window.location.href;
			var locDomain = locHref.substring(0,locHref.lastIndexOf("/"));
			var term = "";
			if(locDomain==domain.search){
				if(window.location.href.indexOf("c-")<0){
					pageType = "search";
					term = $("#form input[type='hidden'][name='k']").val();
					if(term == ''){
						var props = $("#form input[type='hidden'][name='props']").val();
						if(props != '' && typeof(props)!="undefined"){
							var fullSearchName = props['fullSearchName'];
							if(typeof(fullSearchName)!="undefined"){
								term = fullSearchName;
							}
						}
					}else if(typeof(term)=="undefined"){
						term = "";
					}
				}else{
					if(locHref.indexOf(",")<0 && locHref.indexOf("c-9999")<0){
						pageType = "category";
						cateId = $("#form input[type='hidden'][name='c']").val().replace("a","");
					}else{
						pageType = "index";
					}
				}
			}else if(locDomain==domain.product){
				pageType = "product";
				cateId =  $("#q_categoryId").val().replace("a","");
			}else{
				pageType = "index";
			}
			$.ajax({
				type : "get",
				url : domain.coupon + "/commonHead/searchHotKeyWord.html?pageType="+pageType+"&cateId="+cateId+"&num=10&term="+term,
				dataType : "jsonp",
				jsonpCallback : 'callbackFunctionHot',
				async:false,
				success : function(data) {
					var headKeyWords = data;
					if (headKeyWords !== null && headKeyWords.length > 0) {
						var hotDIV = search_show_div;
						hotDIV.empty();
						for (var i = 0; i < headKeyWords.length; i++) {
							var hotSearch = headKeyWords[i];
							var hotUrl = hotSearch.url;
							var start = 0;
							if(hotUrl!=null && hotUrl.length>7){
								start = hotUrl.indexOf("/",7,hotUrl.length)+1;
							}
							var hotDomain = hotUrl.substring(0,start);
							var param = hotUrl.substring(start,hotUrl.length);
							if(param != null && param != ""){
								if(!(!param.match(/^k-(.)+.html$/))){
									param = encodeURI(param).replace(/\//g,"%2F")
									.replace(/\$/g,"%24").replace(/\@/g,"%40")
									.replace(/\\/g,"%5C").replace(/\#/g,'%23')
									.replace(/\;/g,"%3B").replace(/\+/g,'%2B')
									.replace(/\</g,'%3C').replace(/\>/g,'%3E')
									.replace(/\^/g,'%5E').replace(/\%/g,'%25');
								}
							}
							var aElement = $("<a href='"+hotDomain+param+"'>"+ hotSearch.keyword + "</a>");
							aElement.appendTo(hotDIV);
							if((i+1)<headKeyWords.length){
								$("<span>|</span>").appendTo(hotDIV);
							}
						}
					}
				}
			});
		}
	},
	secondaryLogo : function(_this,logoId) {// 第二logo
		if(logoId.size()>0){
			$.ajax({
				type : "get",
				url : domain.main + "/queryCommonPhoto.html",
				dataType : "jsonp",
				jsonpCallback : 'callbackFunctionPhoto',
				success : function(data) {
					var headKeyWords = data.obj;
					if (headKeyWords !== null && headKeyWords.length > 0) {
						var logoDIV = logoId;
						logoDIV.empty();
						for (var i = 0; i < 1; i++) {
							var hotSearch = headKeyWords[i];
							var href = _this.getHref(hotSearch);
							var title = hotSearch.hint;
							if(title!="undefined"&&typeof(title)!="undefined"){
								title = " title=\""+title+"\"";
							}else{
								title = "";
							}
							var aElement = $("<a "+href+title+"><img src=\""+hotSearch.mediaUrl+"\"></a>");
							aElement.appendTo(logoDIV);
						}
					}
				}
			});
		}
	},
	exporHistory : function(_this, search_show_div) {// 把历史记搜索记录添加到后面
		var cookies = this.getCookie(this.cookieName);
		var history;
		if (cookies === undefined) {
			history = undefined;
		} else {
			history = cookies.split("_");
		}
		var ul2 = search_show_div.find("dl");
		ul2.empty();// 清空ul中的li
		var ck_length = history === undefined ? 0 : history.length;
		for (var i = 0; i < ck_length; i++) {
			var h_li;
			if(history[i]!=""){
				try{
					var temp=decodeURI(history[i]);
					if(temp.length>this.len_){
						var text=temp.substr(0,this.len_)+"...";
						if(typeof(temp)!="undefined"){
							temp = temp.replace(/\"/g, '&#34;').replace(/\'/g, '&#39;');
						}
						var h_li = $("<dd title=\""+temp+"\"><a href='javascript:;'>" + text + "</a></dd>");
						h_li.appendTo(ul2);
					}else{
						var h_li = $("<dd><a href='javascript:;'>" + temp + "</a></dd>");;
						h_li.appendTo(ul2);
					}
				}catch(e){
				}
			}
		}
		this.getValue(search_show_div);
	},
	delCookie : function(_name) {// 为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.getCookie(_name);
		if (cval !== null)
			document.cookie = _name + "=" + escape(cval) + ";expires="+ exp.toGMTString() + ";domain=" + this.domin + ";path=/";
	},
	addCookie : function(name, value, expire, domain) {// 添加cookie
		var cookie = this.getCookie(name);// 获取cookie
			//value=this.getAfterSubValue(value,this.onecStoreLength);//value 超过20个要截取掉，cookie 太多会到导致浏览器无法访问网站
		var processCookieOfater = this.processCookie(cookie, value);// 处理cookie
		var exp = new Date();
		exp.setTime(exp.getTime() + expire * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(processCookieOfater)+ ";expires=" + exp.toGMTString() + ";domain=" + domain+ ";path=/"; //
	},
	getCookie : function(key) {
		var cookies = document.cookie ? document.cookie.split('; ') : [];
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = parts.shift();
			var cookie = parts.join('=');
			if (key && key === name) {
				return unescape(cookie);
			}
		}
	},
	processCookie : function(cookie, value) {// 处理自动补全的历史搜索
		if (cookie !== undefined) {
			var cookies = cookie.split("_");
			cookie = value;// 当前搜索值放在最前面
			if (cookies.length == this.showCount) {// 历史记录长度大于10的情况 需要移除最老历史
				var flag = true;
				if (this.contians(cookies, value))
					flag = false;
				for (var i = 0; i < this.showCount; i++) {
					if (cookies[i] == value) {
					} else {
						if (i != this.showCount - 1) {
							cookie = cookie + "_" + cookies[i];
						} else if (!flag) {// 如果cookie包含当前搜索值则不要移除最老历史
							cookie = cookie + "_" + cookies[i];
						}
					}
				}
			} else { // 不足10个搜索历史追加到前面
				for (var j = 0; j < cookies.length; j++) {
					if (value == cookies[j]) {// 当前搜索值存在cookie中则不追加
					} else {
						cookie = cookie + "_" + cookies[j];
					}
				}
			}
		} else {
			cookie = value;
		}
		return cookie;
	},
	contians : function(arr, value) {// 判断一个数组是否包含某个值
		if (!arr || arr.length === 0) {
			return false;
		}
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == value) {
				return true;
			}
		}
		return false;
	},
	getPlaceholder : function(){//输入框提示placeholder
		if($("#first_float_serarch_input").size()>0||$("#first_header_search_input").size()>0||$("#header_search_mybailian_input").size()>0){
			$.ajax({
				type : "get",
				url : domain.main + "/queryCommonYuSheword.html",
				dataType : "jsonp",
				jsonpCallback : 'callbackFunctionYushe',
				async:false,
				success : function(data) {
					var headKeyWords = data.obj;
					if (headKeyWords !== null && headKeyWords.length > 0) {
						for (var i = 0; i < headKeyWords.length; i++) {
							var hotSearch = headKeyWords[i];
							var url="";
							var $type = Number(hotSearch.jumpType);
							switch($type){
							case 1:
								url=domain.search+"/c-"+hotSearch.jumpId+".html";
								break;
							case 2:
								url=domain.search+"/c-9999"+hotSearch.jumpId+".html";
								break;
							case 3:
								url=domain.product+"/"+hotSearch.jumpId+".html";
								break;
							case 5:
								url=hotSearch.jumpUrl;
								break;
							case 6:
								url=domain.channel+"/nl/basketry.html";
								break;
							case 7:
								url=domain.search+"/k-"+URLencode(hotSearch.jumpUrl)+".html";
								break;
							case 10:
								url=domain.s+"/gs/saleStore.html?flashId="+hotSearch.jumpId;
								break;
							default:
								url="";
							}
							top_searchAut.url = url;
							top_searchAut.placeholder = hotSearch.deployName;
							if($("#first_float_serarch_input").size()>0){
								if($("#first_float_serarch_input").val()==""){
									$("#first_float_serarch_input").addClass("gray").attr("value",hotSearch.deployName);
								}else{
									$("#first_float_serarch_input").removeClass("gray");
								}
							}
							if($("#first_header_search_input").size()>0){
								if($("#first_header_search_input").val()==""){
									$("#first_header_search_input").addClass("gray").attr("value",hotSearch.deployName);
								}else{
									$("#first_header_search_input").removeClass("gray");
								}
							}
							if($("#header_search_mybailian_input").size()>0){
								if($("#header_search_mybailian_input").val()==""){
									$("#header_search_mybailian_input").addClass("gray").attr("value",hotSearch.deployName);
								}else{
									$("#header_search_mybailian_input").removeClass("gray");
								}
							}
						}
					}
				}
			});
		}
	},
    highLightKeyWord:function(key,key2) {
        var keyWord = key || "";
        if (keyWord != "") {
            var pattern = new RegExp(keyWord, "gi");
            var html = key2; //可使用innerHTML替换
            html = html.replace(pattern, "<b>" + keyWord + "</b>");
            return html;
        }
    }
};
$(document).ready(function() {
	top_searchAut.getPlaceholder();
	// 浮动搜索框
	var _searchInput_float = $("#first_float_serarch_input");
	_searchInput_float.val("");
	var searchBtu = $(".header-search-button").find("button");
	top_searchAut._event(_searchInput_float, true, searchBtu);
	// 首页，单品页，搜索首页 搜索框
	var _searchInput = $("#first_header_search_input");
	_searchInput.val("");
	top_searchAut._event(_searchInput, true);
	top_searchAut.hotSearchKeyWord(top_searchAut,$(".header-search-font"));
	top_searchAut.secondaryLogo(top_searchAut,$(".secondary-logo"));
	// 我的百联搜索框
	var myBaili_searchInput = $("#header_search_mybailian_input");
	myBaili_searchInput.val("");
	var myBaili_searchBtu = $("#header_search_mybailian_Btu");
	top_searchAut._event(myBaili_searchInput, false,
			myBaili_searchBtu);
	$(document).click(function(event) {
		if ($(event.target).parents(
			".header-search")[0] === undefined
			& !$(event.target).hasClass(
					".header-search")
			& $(event.target).parents(
					".header-search-1")[0] === undefined
			& !$(event.target).hasClass(
					".header-search-1")
			& $(event.target).parents(
					".ibrilliance-search")[0] === undefined
			& !$(event.target).hasClass(
					".ibrilliance-search")) {
			$(".header-input-show").hide();
			$(".header-input-show1").hide();
		}
	});
	setNavOn();
});
function setNavOn(){
	var locHref = window.location.protocol+"//"+window.location.hostname+window.location.pathname;
	$(".nav-right").find("li").removeClass("on");
	$(".nav-right").find("li").each(function(){
		var thHref = $(this).find("a").attr("href");
		if(thHref.indexOf("?")>=0){
			thHref = thHref.substring(0,thHref.indexOf("?"));
		}
		if(thHref.indexOf(".html")<0){
			thHref = thHref+"/";
		}
		if(thHref==locHref){
			$(this).addClass("on");
		}
	});
}
