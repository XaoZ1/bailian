//购物车公共方法
//tag: 0-添加,1-删除,2-清空
//goodsId:商品id
//goodsNumber:商品数量
//salePrice:销售价
//originalPrice:原价
//productName:商品名称
//productUrl:商品图片地址
//activityId:活动id,0-无活动，其它-对应活动id
//activityType:活动类型
function updateShoppingCart(goodsId, goodsNumber, salePrice, tag, productName,
		originalPrice, productUrl, activityId, activityType,categoryID,brandSid,priceType,rule,type,dpId,addGoodsPrice) {
	
	var quality = "";
	var isSuccess = false;
	var goodsList = new Array();
	var goods = new Object();
	goods.goodsNumber = goodsNumber;
	goods.goodsId = goodsId;
	goods.salePrice = salePrice;
	//goods.goodsName = productName;
	goods.originalPrice = originalPrice;
	goods.goodsPicUrl = productUrl;
	goods.activityId = activityId;
	goods.activityType = activityType;
	goods.rule = rule;
	goods.type = type;
	goods.categoryid = categoryID;
	goods.addGoodsPrice=addGoodsPrice;
	goodsList.push(goods);
	var goodsWebDto = {};
	goodsWebDto.tag = tag;
	goodsWebDto.goodsList = goodsList;
		// 加入购物车
		$.ajax({
			type : "post",
			dataType : "json",
			data:{"goodsList":$.toJSON(goodsWebDto)} ,
			url : "/cart/updateShoppingCart.html",
			async : false,
			error : function() {
				alert('错误提示');
			},
			success : function(data) {
				if (data == null) {
					isSuccess = false;
					alert("未成功加入购物车!","返回信息");
				}else if(data.resultCode=='200'){
					quality =  data.resultInfo.currentGoodsNumber;
					var blList;
					var zywId ="";
					var zywnrId="";
					var zywlx ="";
					if (window.location.href.indexOf("/k-")>0 ) {
						zywId = "P668822";//资源位ID
						zywnrId = $("#first_header_search_input").val();//资源位内容ID
						zywlx = "5"//类型
					}else if(document.referrer.indexOf("/k-")>0){
						var urlText =  document.referrer.substr(document.referrer.indexOf("/k-")+3,document.referrer.indexOf(".html")-document.referrer.indexOf("/k-")-3)
						zywId = "P668822";//资源位ID
						zywnrId = decodeURI(decodeURI(urlText));//资源位内容ID
						zywlx = "5"//类型
					}else if (bl_ad.length > 0) {
						blList = bl_ad.split("_-_");
						zywId = blList[0]==undefined?"":blList[0];//资源位ID
						zywnrId = blList[1]==undefined?"":blList[1];//资源位内容ID
						zywlx = blList[2]==undefined?"":blList[2];//类型
					}
					AddCart(goodsId,categoryID,productName,quality,salePrice*1,zywId,zywnrId,zywlx);
				   isSuccess = true;
				   /*if(tag==0){
					 alert("加入购物车成功","返回信息");
				   }
				   if(tag==1){
					 alert("删除购物车成功","返回信息");
				   }
				   if(tag==2){
					 alert("清空购物车成功","返回信息");
				   }*/
				   if($(".product-show").length > 0){
					   //刷新侧边栏购物车
					   $.ajax({
	               		type:"POST",
						     url:"/cart/queryShoppingCart.html?pageNo=1&pageSize=9999",
						     //data:{"pageNo":"1","pageSize":"9999"},
						     //contentType: "application/json",
						     async:false,
						     error:function(dataTwo){
						    	  
						     },
						     success:function(dataTwo){
						    	if(dataTwo){
						    		if(dataTwo.resultInfo){
						    			 if(dataTwo.resultInfo.totalGoodsNumber > 0 && dataTwo.resultInfo.totalGoodsNumber < 100){
				    			    		 $("#cartNum").text(dataTwo.resultInfo.totalGoodsNumber);
				    			    		 $("#cartNum").show();
				    			    	 }else if(dataTwo.resultInfo.totalGoodsNumber > 99){
				    			    		 $("#cartNum").text("99+");
				    			    		 $("#cartNum").show();
				    			    	 }
				    			    	 else{
				    			    		 $("#cartNum").hide();
				    			    	 }
						    		}
						    	}
						     }
	               		});
				   }
				}else if(data.resultCode.substr(0,3)=='400'){
					isSuccess = false;
					alert(data.resultMsg,"返回信息");
				}else{
					isSuccess = false;
					alert("未成功加入购物车!","返回信息");
				}
			}
		});

		if (isSuccess) {
			var oPrice = originalPrice;
			var zkl = (salePrice*1)/(oPrice*1);
			var exportAttributes = "";
			if (dpId == undefined) {
				dpId = "";
			}
			if (tag!=1) {
				var blList = [];
				if (bl_ad.length > 0) {
					blList = bl_ad.split("_-_");
					 var zywId = blList[0]==undefined?"":blList[0];
	                  var zywnrId = blList[1]==undefined?"":blList[1];
	                  var zywlx = blList[2]==undefined?"":blList[2];
					 exportAttributes =priceType+"-_-"+(zkl).toFixed(2)+"-_-"+brandSid+"-_-1-_--_--_--_-1-_-"+dpId+"-_-PC-_-"+mid+"-_-"+bl_nurl+"-_-"+bl_sourceurl+"-_-"+zywId+"-_-"+zywnrId+"-_--_-"+bl_mmc+"-_-"+zywlx;
				}else{
					 exportAttributes =priceType+"-_-"+(zkl).toFixed(2)+"-_-"+brandSid+"-_-1-_--_--_--_-1-_-"+dpId+"-_-PC-_-"+mid+"-_-"+bl_nurl+"-_-"+bl_sourceurl+"-_--_--_--_-"+bl_mmc;
				}
			}else{
				var blList = [];
				if (bl_ad.length > 0) {
					blList = bl_ad.split("_-_");
					var zywId = blList[0]==undefined?"":blList[0];
	                  var zywnrId = blList[1]==undefined?"":blList[1];
	                  var zywlx = blList[2]==undefined?"":blList[2];
					 exportAttributes =priceType+"-_-"+(zkl).toFixed(2)+"-_-"+brandSid+"-_-2-_--_--_--_--_-"+dpId+"-_-PC-_-"+mid+"-_-"+bl_nurl+"-_-"+bl_sourceurl+"-_-"+zywId+"-_-"+zywnrId+"-_--_-"+bl_mmc+"-_-"+zywlx;
				}else{
					 exportAttributes =priceType+"-_-"+(zkl).toFixed(2)+"-_-"+brandSid+"-_-2-_--_--_--_--_-"+dpId+"-_-PC-_-"+mid+"-_-"+bl_nurl+"-_-"+bl_sourceurl+"-_--_--_--_-"+bl_mmc;
				}
			}
			if (undefined == priceType || null == priceType) {
				priceType = "0";
			}
			cmCreateShopAction5Tag(goodsId,productName,quality,salePrice,categoryID,exportAttributes);
			cmDisplayShops();
		}
	
	
	return isSuccess;
}
//购物车公共方法
//tag: 0-添加,1-删除,2-清空
//goodsId:商品id
//goodsNumber:商品数量
//salePrice:销售价
//originalPrice:原价
//productName:商品名称
//productUrl:商品图片地址
//activityId:活动id,0-无活动，其它-对应活动id
//activityType:活动类型
function updateShoppingCartObj(goodsId, goodsNumber, salePrice, tag, productName,
		originalPrice, productUrl, activityId, activityType,categoryID,brandSid,priceType,rule,type,dpId,goodsLineNbr,addGoodsPrice) {
	var quality = "";
	var isSuccess = false;
	var goodsList = new Array();
	var goods = new Object();
	var resultObj=new Object();
	resultObj.isSuccess=isSuccess;
	goods.goodsNumber = goodsNumber;
	goods.goodsId = goodsId;
	goods.salePrice = salePrice;
	//goods.goodsName = productName;
	goods.originalPrice = originalPrice;
	goods.goodsPicUrl = productUrl;
	goods.activityId = activityId;
	goods.activityType = activityType;
	goods.rule = rule;
	goods.type = type;
	goods.goodsLineNbr = goodsLineNbr;
	goods.addGoodsPrice=addGoodsPrice;
	goodsList.push(goods);
	var goodsWebDto = {};
	goodsWebDto.tag = tag;
	goodsWebDto.goodsList = goodsList;
		// 加入购物车
		$.ajax({
			type : "post",
			dataType : "json",
			data:{"goodsList":$.toJSON(goodsWebDto)} ,
			url : "/cart/updateShoppingCart.html",
			async : false,
			error : function() {
				alert('错误提示');
			},
			success : function(data) {
				if(data.resultCode=='200'){
					
				   isSuccess = true;
				   resultObj.isSuccess=isSuccess;
				   if(tag==0){
					   quality = data.resultInfo.currentGoodsNumber;
						resultObj.resultMsg="加入购物车成功";
						var blList;
						var zywId ="";
						var zywnrId="";
						var zywlx ="";
						if (window.location.href.indexOf("/k-")>0 ) {
							zywId = "P668822";//资源位ID
							zywnrId = $("#first_header_search_input").val();//资源位内容ID
							zywlx = "5"//类型
						}else if(document.referrer.indexOf("/k-")>0){
							var urlText =  document.referrer.substr(document.referrer.indexOf("/k-")+3,document.referrer.indexOf(".html")-document.referrer.indexOf("/k-")-3)
							zywId = "P668822";//资源位ID
							zywnrId = decodeURI(decodeURI(urlText));//资源位内容ID
							zywlx = "5"//类型
						}else if (bl_ad.length > 0) {
							blList = bl_ad.split("_-_");
							zywId = blList[0]==undefined?"":blList[0];//资源位ID
							zywnrId = blList[1]==undefined?"":blList[1];//资源位内容ID
							zywlx = blList[2]==undefined?"":blList[2];//类型
						}
						AddCart(goodsId,categoryID,productName,quality,salePrice*1,zywId,zywnrId,zywlx);
				   }
				   if(tag==1){
					   quality = "0";
						resultObj.resultMsg="删除购物车成功";
						
				   }
				   if(tag==2){
					   quality = "0";
						resultObj.resultMsg="清空购物车成功";
				   }
				   if($(".product-show").length > 0){
					   //刷新侧边栏购物车
					   $.ajax({
	               		type:"POST",
						     url:"/cart/queryShoppingCart.html?pageNo=1&pageSize=9999",
						     //data:{"pageNo":"1","pageSize":"9999"},
						     //contentType: "application/json",
						     async:false,
						     error:function(dataTwo){
						    	  
						     },
						     success:function(dataTwo){
						    	 if(dataTwo){
						    		 if(dataTwo.resultInfo){
						    			 if(dataTwo.resultInfo.totalGoodsNumber > 0 && dataTwo.resultInfo.totalGoodsNumber < 100){
				    			    		 $("#cartNum").text(dataTwo.resultInfo.totalGoodsNumber);
				    			    		 $("#cartNum").show();
				    			    	 }else if(dataTwo.resultInfo.totalGoodsNumber> 99){
				    			    		 $("#cartNum").text("99+");
				    			    		 $("#cartNum").show();
				    			    	 }
				    			    	 else{
				    			    		 $("#cartNum").hide();
				    			    	 }
						    		 }
						    	 }
						     }
	               		});
				   }
				}else{
					isSuccess = false;
					resultObj.isSuccess=isSuccess;
					resultObj.resultMsg=data.resultMsg;
				}
			}
		});

	if (isSuccess) {
		var oPrice = originalPrice;
		var zkl = (salePrice*1)/(oPrice*1);
		if (undefined == priceType || null == priceType) {
			priceType = "0";
		}
		if (dpId == undefined) {
			dpId = "";
		}
		var exportAttributes = "";
		if (tag!=1) {
			var blList = [];
			if (bl_ad.length > 0) {
				blList = bl_ad.split("_-_");
				var zywId = blList[0]==undefined?"":blList[0];
				var zywnrId = blList[1]==undefined?"":blList[1];
				var zywlx = blList[2]==undefined?"":blList[2];
				 exportAttributes =priceType+"-_-"+(zkl).toFixed(2)+"-_-"+brandSid+"-_-1-_--_--_--_-1-_-"+dpId+"-_-PC-_-"+mid+"-_-"+bl_nurl+"-_-"+bl_sourceurl+"-_-"+zywId+"-_-"+zywnrId+"-_--_-"+bl_mmc+"-_-"+zywlx;
			}else{
				 exportAttributes =priceType+"-_-"+(zkl).toFixed(2)+"-_-"+brandSid+"-_-1-_--_--_--_-1-_-"+dpId+"-_-PC-_-"+mid+"-_-"+bl_nurl+"-_-"+bl_sourceurl+"-_--_--_--_-"+bl_mmc;
			}
		}else{
			var blList = [];
			if (bl_ad.length > 0) {
				blList = bl_ad.split("_-_");
				var zywId = blList[0]==undefined?"":blList[0];
				var zywnrId = blList[1]==undefined?"":blList[1];
				var zywlx = blList[2]==undefined?"":blList[2];
				 exportAttributes =priceType+"-_-"+(zkl).toFixed(2)+"-_-"+brandSid+"-_-2-_--_--_--_--_-"+dpId+"-_-PC-_-"+mid+"-_-"+bl_nurl+"-_-"+bl_sourceurl+"-_-"+zywId+"-_-"+zywnrId+"-_--_-"+bl_mmc+"-_-"+zywlx;
			}else{
				 exportAttributes =priceType+"-_-"+(zkl).toFixed(2)+"-_-"+brandSid+"-_-2-_--_--_--_--_-"+dpId+"-_-PC-_-"+mid+"-_-"+bl_nurl+"-_-"+bl_sourceurl+"-_--_--_--_-"+bl_mmc;
			}
		}
		cmCreateShopAction5Tag(goodsId,productName,quality,salePrice,categoryID,exportAttributes);
		cmDisplayShops();
	}
	
	
	return resultObj;
}

//批量添加,删除购物车
//goodsList:商品列表,结构参考updateShoppingCart
//tag
function updateShoppingCartBath(goodsList,tag) {
	var goodsWebDto = {};
	var quality = "";
	goodsWebDto.tag = tag;
	goodsWebDto.goodsList = goodsList;
		// 加入购物车
		$.ajax({
			type : "post",
			dataType : "json",
			data:{"goodsList":$.toJSON(goodsWebDto)} ,
			url : "/cart/updateShoppingCart.html",
			async : false,
			error : function() {
				alert('错误提示');
			},
			success : function(data) {
				if(data.resultCode=='200'){
					quality =  data.resultInfo.currentGoodsNumber;
				   isSuccess = true;
				   if(tag==0){
					 alert("加入购物车成功","返回信息");
				   }
				   if(tag==1){
					 alert("删除购物车成功","返回信息");
				   }
				   if(tag==2){
					 alert("清空购物车成功","返回信息");
				   }
				   if($(".product-show").length > 0){
					   //刷新侧边栏购物车
					   $.ajax({
	               		type:"POST",
						     url:"/cart/queryShoppingCart.html?pageNo=1&pageSize=9999",
						     //data:{"pageNo":"1","pageSize":"9999"},
						     //contentType: "application/json",
						     async:false,
						     error:function(dataTwo){
						    	  
						     },
						     success:function(dataTwo){
						      if(dataTwo){
						    	  if(dataTwo.resultInfo){
						    			 if(dataTwo.resultInfo.totalGoodsNumber > 0 && dataTwo.resultInfo.totalGoodsNumber < 100){
				    			    		 $("#cartNum").text(dataTwo.resultInfo.totalGoodsNumber);
				    			    		 $("#cartNum").show();
				    			    	 }else if(dataTwo.resultInfo.totalGoodsNumber > 99){
				    			    		 $("#cartNum").text("99+");
				    			    		 $("#cartNum").show();
				    			    	 }
				    			    	 else{
				    			    		 $("#cartNum").hide();
				    			    	 }
						    	  }
						      }
						     }
	               		});
				   }
				}else{
					isSuccess = false;
					alert(data.resultMsg,"返回信息");
				}
			}
		});
	if (isSuccess) {
		for (var i = 0; i < goodsList.length; i++) {
			var good = goodsList[i];
			var productID = good.goodsId;
			var name = good.productName;
			var price = good.salePrice;
			var categoryID = good.categoryID;
			var brandSid = good.brandSid;
			var priceType = good.priceType;
			var oPrice = good.originalPrice;
			var zkl = (price*1)/(oPrice*1);
			var dpId = "";
			var exportAttributes = "";
			if (tag!=1) {
				var blList = [];
				if (bl_ad.length > 0) {
					blList = bl_ad.split("_-_");
					var zywId = blList[0]==undefined?"":blList[0];
					var zywnrId = blList[1]==undefined?"":blList[1];
					var zywlx = blList[2]==undefined?"":blList[2];
					 exportAttributes =priceType+"-_-"+(zkl).toFixed(2)+"-_-"+brandSid+"-_-1-_--_--_--_-1-_-"+dpId+"-_-PC-_-"+mid+"-_-"+bl_nurl+"-_-"+bl_sourceurl+"-_-"+zywId+"-_-"+zywnrId+"-_--_-"+bl_mmc+"-_-"+zywlx;
				}else{
					 exportAttributes =priceType+"-_-"+(zkl).toFixed(2)+"-_-"+brandSid+"-_-1-_--_--_--_-1-_-"+dpId+"-_-PC-_-"+mid+"-_-"+bl_nurl+"-_-"+bl_sourceurl+"-_--_--_--_-"+bl_mmc;
				}
			}else{
				var blList = [];
				if (bl_ad.length > 0) {
					blList = bl_ad.split("_-_");
					var zywId = blList[0]==undefined?"":blList[0];
					var zywnrId = blList[1]==undefined?"":blList[1];
					var zywlx = blList[2]==undefined?"":blList[2];
					 exportAttributes =priceType+"-_-"+(zkl).toFixed(2)+"-_-"+brandSid+"-_-2-_--_--_--_--_-"+dpId+"-_-PC-_-"+mid+"-_-"+bl_nurl+"-_-"+bl_sourceurl+"-_-"+zywId+"-_-"+zywnrId+"-_--_-"+bl_mmc+"-_-"+zywlx;
				}else{
					 exportAttributes =priceType+"-_-"+(zkl).toFixed(2)+"-_-"+brandSid+"-_-2-_--_--_--_--_-"+dpId+"-_-PC-_-"+mid+"-_-"+bl_nurl+"-_-"+bl_sourceurl+"-_--_--_--_-"+bl_mmc;
				}
			}
			cmCreateShopAction5Tag(productID,name,quality,price,categoryID,exportAttributes);
		}
		cmDisplayShops();
	}
	
	return isSuccess;
}

function deletecar(goodsId, goodsNumber, salePrice, tag) {
	jConfirm("确定要删除此商品吗?", '', function(result) {
		if (result) {
			updateShoppingCart(goodsId, goodsNumber, salePrice, tag);
		}
	});
}
