/**
 * 张进 2015/6/17
 */
var cookies = {
	fun : {
		init : function(productid) {
			var cook = cookies.fun.get("_IOKBL_B_P");

			if (cook == null || cook == "" || cook == "undefined") {
				cookies.fun.set("_IOKBL_B_P", productid, 365, domain.cookie);

			} else {
				cook = cookies.fun.get("_IOKBL_B_P");
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
						cookies.fun.set("_IOKBL_B_P", cook, 365, domain.cookie);
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
						cookies.fun.set("_IOKBL_B_P", proIds, 365,
								domain.cookie);
					}
				}
			}
		},
		set : function(name, value, expire, domain) {
			var exp = new Date();
			exp.setTime(exp.getTime() + expire * 24 * 60 * 60 * 1000);
			// document.cookie = name + "=" + encodeURIComponent(value,"UTF-8")
			// + ";expires=" + exp.toGMTString() + ";domain="+domain+";path=/";
			document.cookie = name + "=" + value + ";expires=" + 
					exp.toGMTString() + ";domain=" + domain + ";path=/";
		},
		get : function(key) {
			var cookies = document.cookie ? document.cookie.split("; ") : [];
			for (var i = 0, l = cookies.length; i < l; i++) {
				var parts = cookies[i].split("=");
				var name = parts.shift();
				var cookie = parts.join("=");
				if (key && key === name) {
					return cookie;
				}
			}
		},
		del : function(productid) {
			var cook = cookies.fun.get("_IOKBL_B_P");
			var proList = cook.split("_");
			for (var i = 0; i < proList.length; i++) {
				if (proList[i] == productid) {
					proList.splice(i, 1);
					break;
				}
			}
			var proIds = proList.join("_");
			cookies.fun.set("_IOKBL_B_P", proIds, 365, domain.cookie);
		}
	}
};
