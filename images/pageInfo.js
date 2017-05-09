var mid = "";
$(document).ready(function(){
	var pageId = jsonPageInfo.pageId;
	if (pageId == "" || pageId == undefined || pageId == "NaN") {
		pageId = "PC_缺省_"+$("title").html();
	};
	var categoryId = jsonPageInfo.categoryId;
	if (categoryId == "" || categoryId == undefined || categoryId == "NaN") {
		categoryId = "PC_Category";
	};
	mid = getUck("_m_t_i").length > 0 ?base64_decode(getUck("_m_t_i")).split("&mi=")[1]:"";
	var blList;
	var zywId="";
	var zywnrId="";
	var zywlx="";
	if (bl_ad.length > 0) {
		blList = bl_ad.split("_-_");
		zywId = blList[0]==undefined?"":blList[0];
		zywnrId = blList[1]==undefined?"":blList[1];
		zywlx = blList[2]==undefined?"":blList[2];
		cmCreatePageviewTag(pageId, categoryId, jsonPageInfo.searchTerm, jsonPageInfo.searchResult,jsonPageInfo.exportAttributes+"-_--_--_--_--_-"+bl_mmc+"-_-PC-_--_--_-"+mid+"-_-"+bl_nurl+"-_-"+bl_sourceurl+"-_-"+zywId+"-_-"+zywnrId+"-_--_-"+zywlx);
	}else{
		cmCreatePageviewTag(pageId, categoryId, jsonPageInfo.searchTerm, jsonPageInfo.searchResult,jsonPageInfo.exportAttributes+"-_--_--_--_--_-"+bl_mmc+"-_-PC-_--_--_-"+mid+"-_-"+bl_nurl+"-_-"+bl_sourceurl);
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
	
});

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

function getUck(key){
	var cookies = document.cookie ? document.cookie.split("; ") : [];
	for (var i = 0, l = cookies.length; i < l; i++) {
		var parts = cookies[i].split("=");
		var name = parts.shift();
		var cookie = parts.join("=");
		if (key && key === name) {
			return cookie;
		}
	}
	return "";
}

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
(function()
{ var mvl = document.createElement('script'); mvl.type = 'text/javascript'; mvl.async = true; mvl.src = ('https:' == document.location.protocol ? 'https://cdn.dsp.com/static/js/loader.js' : 'http://cdn.dsp.com/static/js/loader.js'); var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(mvl, s); }
)(); 
});
