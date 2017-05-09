/***特殊部署**/
$(document).ready(function(){
	var pic = ($("#q_price").val()*1)/($("#q_productSalePrice").val()*1).toFixed(2);
	setTimeout(function(){
		var productPrice=$("#q_price").val();
		if(BL.product&&BL.product.getPrice){
			productPrice=BL.product.getPrice(); 
		}
		var blList = [];
		var zywId,zywnrId,zywlx;
		 if(document.referrer.indexOf("/k-")>0){
				var urlText =  document.referrer.substr(document.referrer.indexOf("/k-")+3,document.referrer.indexOf(".html")-document.referrer.indexOf("/k-")-3)
				zywId = "P668822";//资源位ID
				zywnrId = decodeURI(decodeURI(urlText));//资源位内容ID
				zywlx = "5"//类型
				cmCreateProductviewTag($("#q_productid").val(), $("#q_productSalesName").val(),$("#categorysid").val(),"-_--_--_-"+$("#mid").val()+"-_-"+bl_nurl+"-_-"+bl_sourceurl);
		}
		 else if (bl_ad.length > 0) {
			 blList = bl_ad.split("_-_");
			 zywId = blList[0]==undefined?"":blList[0];
			 zywnrId = blList[1]==undefined?"":blList[1];
			 zywlx = blList[2]==undefined?"":blList[2];
			cmCreateProductviewTag($("#q_productid").val(), $("#q_productSalesName").val(),$("#categorysid").val(),"-_--_--_-"+$("#mid").val()+"-_-"+bl_nurl+"-_-"+bl_sourceurl+"-_-"+zywId+"-_-"+zywnrId+"-_--_-"+zywlx);
		}else{
			cmCreateProductviewTag($("#q_productid").val(), $("#q_productSalesName").val(),$("#categorysid").val(),"-_--_--_-"+$("#mid").val()+"-_-"+bl_nurl+"-_-"+bl_sourceurl);
		}
		ViewProduct($("#q_productid").val(),$("#categorysid").val(),$("#q_productSalesName").val(),productPrice,zywId,zywnrId,zywlx,$("#brandid").val(),$("#q_productSalePrice").val(),$("#mid").val(),$("#q_store").val(),$("#q_priveType").val())
	},2000)
});

$(document).ready(function(){
	var storeID="";//商户
	if($("#q_store").val()!=undefined){
	    storeID=$("#q_store").val();
	}
    var pageId = jsonPageInfo.pageId;
    if (pageId == "" || pageId == undefined || pageId == "NaN") {
        pageId = "PC_缺省_"+$("title").html();
    };
    var categoryId = jsonPageInfo.categoryId;
    if (categoryId == "" || categoryId == undefined || categoryId == "NaN") {
        categoryId = "PC_Category";
    };
    var prefixAttributes=jsonPageInfo.exportAttributes?jsonPageInfo.exportAttributes:"-_--_--_--_--_-";
    var bladAttributes="";
    var zywId,zywnrId,zywlx;
    if (bl_ad.length > 0) {
		blList = bl_ad.split("_-_");
		 zywId = blList[0]==undefined?"":blList[0];
		 zywnrId = blList[1]==undefined?"":blList[1];
		 zywlx = blList[2]==undefined?"":blList[2];
		bladAttributes="-_-"+zywId+"-_-"+zywnrId+"-_--_-"+zywlx;
    }	
    cmCreatePageviewTag(pageId, categoryId, jsonPageInfo.searchTerm, jsonPageInfo.searchResult,prefixAttributes+bl_mmc+"-_-PC-_--_-"+storeID+"-_-"+mid+"-_-"+bl_nurl+"-_-"+bl_sourceurl+bladAttributes);
  //神策PageView
	sa.registerPage({
		memberId:$("#mid").val(),
		resourceId:zywId,
		resourceType:zywlx,
		deployId:unescape("\""+zywnrId+"\""),
		pageId:pageId,
		categoryId:categoryId,
		mmc:bl_mmc
	  });
	sa.quick('autoTrack');
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
(function()
{ var mvl = document.createElement('script'); mvl.type = 'text/javascript'; mvl.async = true; mvl.src = ('https:' == document.location.protocol ? 'https://cdn.dsp.com/static/js/loader.js' : 'http://cdn.dsp.com/static/js/loader.js'); var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(mvl, s); }
)(); 
});
