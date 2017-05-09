//BL object
window.BL = window.BL || {};
window.BL.Global=window.BL.Global||{};
window.BL.Global = {
		version:"1.0",
		cookie:{
			f:function (c){
				return"string"===typeof c && ""!==c;
			},
			get:function(key){
				var a,d;
				if(this.f(key)&&(d=(""+document.cookie).match(RegExp("(?:^| )"+key+"(?:(?:=([^;]*))|;|$)")))){
					a=d[1]?decodeURIComponent(d[1].replace(/\+/g," ")):"";
				}
				return a;
			},
			set:function(key,val,d,domain,path){
				var a=""+encodeURIComponent(val),e=d;"number"===typeof e && (e=new Date,e.setTime(e.getTime()+864E5*d));
				e instanceof Date&&(a+="; expires="+e.toUTCString());this.f(domain)&&(a+="; domain="+domain);this.f(path)&&(a+="; path="+path);
				/*secure&&(a+="; secure");*/
				document.cookie=key+"="+a;
			},
			remove:function(key,domain,path){
				this.set(key,"",-1,domain,path);
			}
		},
		productCookie:{
			init : function(productid) {
				var cook = BL.Global.cookie.get("_IOKBL_B_P");
				if (cook == null || cook == "" || cook == "undefined") {
					BL.Global.cookie.set("_IOKBL_B_P", productid, 365, domain.cookie);

				} else {
					cook = BL.Global.cookie.get("_IOKBL_B_P");
					var proList = cook.split("_");// eval('('+cook+')');
					var type = true;
					if (proList.length < 25) {
						for (var i = 0; i < proList.length; i++) {
							if (proList[i] == productid) {
								type = false;
								break;
							}
						}
						if (type) {
							cook = cook + "_" + productid;
							BL.Global.cookie.set("_IOKBL_B_P", cook, 365, domain.cookie);
						}
					} else {
						for (var i = 0; i < proList.length; i++) {
							if (proList[i] == productid) {
								type = false;
								break;
							}
						}
						if (type) {
							proList.splice(0, 1);
							proList.push(productid);
							var proIds = proList.join("_");
							BL.Global.cookie.set("_IOKBL_B_P", proIds, 365,
									domain.cookie);
						}
					}
				}
			},
			del : function(productid) {
				var cook = BL.Global.cookie.get("_IOKBL_B_P");
				var proList = cook.split("_");
				for (var i = 0; i < proList.length; i++) {
					if (proList[i] == productid) {
						proList.splice(i, 1);
						break;
					}
				}
				var proIds = proList.join("_");
				BL.Global.cookie.set("_IOKBL_B_P", proIds, 365, domain.cookie);
			}
		},
		isLogin:function(){
		    var t=this.cookie.get("_m_t_i");
		    var m=this.cookie.get("__mn");
		    return !!(t&&m);
		},
		getNick:function(){
			return this.cookie.get("__mn");
		},
		getHost:function(){
			if(window.location.host.indexOf(".st.")>0){
               return "st.iokbl";
			}else if(window.location.host.indexOf(".ut.")>0){
               return "ut.bl";
			}else if(window.location.host.indexOf(".bl.")>0){
               return "bl";
			}else{

			}
		},
		getUrlParam:function(name){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]); return null;
		},
		include_js:function(file, callback){
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
		        js.onreadystatechange = function () {
		            if (js.readyState == 'loaded' || js.readyState == 'complete') {
		                if (callback) {
		                    callback();
		                }
		            }
		        }
		    }
		    return false;
		},
		base64Decode:function(str){
			var c1, c2, c3, c4;
			var base64DecodeChars = new Array(
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57,
			58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0,  1,  2,  3,  4,  5,  6,
            7,  8,  9,  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
            37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1,
            -1, -1);
			var i=0, len = str.length, string = '';
			while (i < len){
				do{
					c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
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
                    if (c3 == 61) return string;
                    c3 = base64DecodeChars[c3];
                } while (
                	i < len && c3 == -1
                );
				if (c3 == -1) break;
				string += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
	           do{
	        	   c4 = str.charCodeAt(i++) & 0xff;
	        	   if (c4 == 61) return string;
	        	   c4 = base64DecodeChars[c4];
	           } while (
        		   i < len && c4 == -1
	           );
	           if (c4 == -1) break;
	           string += String.fromCharCode(((c3 & 0x03) << 6) | c4)
			}
			return string;
		},
		isMobile:function(){var e=navigator.userAgent;return!!e.match(/AppleWebKit.*Mobile.*/)||"ontouchstart"in document.documentElement;}

};
window.BL.Init = (function(){
	/*domain*/
	var domain = window.domain || {};
	var selfHttp = window.location.protocol + "//";
	domain.nowHost= BL.Global.getHost();  //判断环境,本地环境返回空
	domain.Static = function(restype){
		if(BL.Global.getHost()=="st.iokbl"){
		   return selfHttp+"img.iblimg.com/respc-1";
		}else if(BL.Global.getHost()=="ut.bl"){
		   return selfHttp+"img.ut.iblimg.com/respc-1";
		}else if(BL.Global.getHost()=="bl"){
		   return selfHttp+"img.iblimg.com/respc-1";
		}else{
	
		}
	};
	domain.Mobile = function(){
		if(BL.Global.getHost()=="st.iokbl"){
		   return "http://m.st.bl.com/h5-web/page/view_Index.html";
		}else if(BL.Global.getHost()=="ut.bl"){
		   return "http://m.ut.bl.com/h5-web/page/view_Index.html";
		}else if(BL.Global.getHost()=="bl"){
		   return "http://m.bl.com/h5-web/page/view_Index.html";
		}else{
	
		}
	};
	domain.GetPayment = function(){
		if(BL.Global.getHost()=="st.iokbl"){
		   return "http://zf.st.iokbl.com";
		}else if(BL.Global.getHost()=="ut.bl"){
		   return "https://payment.ut.bl.com";
		}else if(BL.Global.getHost()=="bl"){
		   return "https://payment.bl.com";
		}else{
		   
		}
	};
	domain.v = 201701170301;
	domain.version = (new Date()).getTime();
	domain.main = domain.nowHost?"http://www."+domain.nowHost+".com":domain.main;
	domain.help = domain.nowHost?"http://help."+domain.nowHost+".com":domain.help;
	domain.my = domain.nowHost?"http://my."+domain.nowHost+".com":domain.my;
	domain.global = domain.nowHost?"http://global."+domain.nowHost+".com":domain.global;
	domain.cart = domain.nowHost?"http://cart."+domain.nowHost+".com":domain.cart;
	domain.fashion = domain.nowHost?"http://fashion."+domain.nowHost+".com":domain.fashion;
	domain.life = domain.nowHost?"http://life."+domain.nowHost+".com":domain.life;
	domain.product = domain.nowHost?"http://product."+domain.nowHost+".com":domain.product;
	domain.search = domain.nowHost?"http://search."+domain.nowHost+".com":domain.search;
	domain.qiang = domain.nowHost?"http://qiang."+domain.nowHost+".com":domain.qiang;
	domain.tuan = domain.nowHost?"http://tuan."+domain.nowHost+".com":domain.tuan;
	domain.hot = domain.nowHost?"http://hot."+domain.nowHost+".com":domain.hot;
	domain.order= domain.nowHost?"http://channel."+domain.nowHost+".com":domain.order;
	domain.chongzhi = domain.nowHost?"http://chongzhi."+domain.nowHost+".com":domain.chongzhi;
	domain.jiaofei = domain.nowHost?"http://jiaofei."+domain.nowHost+".com":domain.jiaofei;
	domain.coupon = domain.nowHost?"http://coupon."+domain.nowHost+".com":domain.coupon;
	domain.trade = domain.nowHost?"http://trade."+domain.nowHost+".com":domain.trade;
	domain.promotion = domain.nowHost?"http://promotion."+domain.nowHost+".com":domain.promotion;
	domain.cookie = "."+domain.nowHost+".com";
	domain.dc1= domain.nowHost?"http://dc1."+domain.nowHost+".com":domain.dc1;
	domain.dt1 = domain.nowHost?"http://dt1."+domain.nowHost+".com":domain.dt1;
	domain.dc2 = domain.nowHost?"//dc2."+domain.nowHost+".com":domain.dc2;
	domain.s = domain.nowHost?"http://s."+domain.nowHost+".com":domain.s;
	domain.blk = domain.nowHost?"http://blk."+domain.nowHost+".com":domain.blk;
	//https
	domain.passport = domain.nowHost?"https://passport."+domain.nowHost+".com":domain.passport;
	domain.reg = domain.nowHost?"https://reg."+domain.nowHost+".com":domain.reg;
	domain.payment = domain.GetPayment()?domain.GetPayment():domain.payment;
	domain.safe = domain.nowHost?"https://safe."+domain.nowHost+".com":domain.safe;
	domain.httpsImg = "https://img.iblimg.com";
	//特殊的
	domain.js = domain.Static("js")?domain.Static("js"):domain.js;
	domain.image = domain.Static("image")?domain.Static("image"):domain.image;
	domain.m = domain.Mobile()?domain.Mobile():domain.m;
	
	window.domain = domain;
	
	//整站传递
	window.bl_mmc = "";
	window.bl_ad = "";
	var sUrl = window.location.search;
	if(sUrl.indexOf("cm_mmc")>0){
		window.bl_mmc =  BL.Global.getUrlParam("cm_mmc").replace(/-_-/g, "_-_");
	}
	if(sUrl.indexOf("bl_mmc")>0){
		window.bl_mmc =  BL.Global.getUrlParam("bl_mmc");
	}
	if(sUrl.indexOf("bl_ad")>0){
		window.bl_ad =  BL.Global.getUrlParam("bl_ad");
	}
	//营销投放
	if(BL.Global.getUrlParam("cm_mmc") != null){
		var g = window.BL;
		var c = domain.cookie;
		g.Global.cookie.set("cm_mmc", BL.Global.getUrlParam("cm_mmc"), 1, c);
		// 业态
		g.Global.cookie.set("buid", BL.Global.getUrlParam("buid"), 1, c);
		// 门店
		g.Global.cookie.set("store_id", BL.Global.getUrlParam("store_id"), 1, c);
		// 投放批次号
		g.Global.cookie.set("batch_id", BL.Global.getUrlParam("batch_id"), 1, c);
		// 来源渠道
		g.Global.cookie.set("adverChannel", BL.Global.getUrlParam("adverChannel"), 1, c);
		// 合作渠道(对方会员ID)
		g.Global.cookie.set("ads_uid", BL.Global.getUrlParam("ads_uid"), 1, c);
	}
})();





