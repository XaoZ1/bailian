// JavaScript Document
$(function(){
		$.fn.rollorshade=function(option){
			//"use strict";  //严格模式
		    
			var size=$(this).size();
					 while(size--){
						 var mainBody=$(this).eq(size);
							 if(!mainBody.data("execute")){
								 option.effect=="shade"?shade():null;
								 option.effect=="roll"?roll():null;
								 mainBody.data("execute",true);
							 };
						};
			//################################
			   function shade(){
				      var state=option.state;
					  var shadeBody=mainBody.find(".main-top-scroll");//$(option.rollUL);
					  var rollBody=shadeBody.parent("div").css("width","100%");
					  var li=shadeBody.children("li");
					  //shadeBody.css({"width":"100%"});
					  var sHeight=shadeBody.height();
					  var liL=li.size();
					  li.css({"position":"relative","visibility":"hidden"});
					  while(liL--){
						  liL!=0?li.eq(liL).css("top","-"+(sHeight*liL)+"px"):null;
						  }; 
					  li.eq(0).css("visibility","visible");
					  var img=shadeBody.find("img");
					  var imgL=li.size();
					  var lL=li.size();
					  if(imgL>1){
						var str=returnUL(imgL,option.controlBar,state);
						//th.append(str.join(""))
						  mainBody.append(str.join(""));
						  var mainOl=mainBody.find(".progress-bar-ol");//$(".progress-bar-ol");
						  var ol=mainOl.children("li");
						  var liW=ol.outerWidth();
						  var liMar=parseInt(ol.css("margin-right"));
						  var liMar2=parseInt(ol.css("margin-left"));
						  //console.log("liMar="+liMar+"   liMar2="+liMar2);
						  var olL=ol.size();
							  //state===2?liW+=2:null;
							   mainOl.attr("style","width:"+((liW+liMar+liMar2)*olL+50)+"px").css("visibility","visible");
							   option.toolbar===0?ol.css("display","none"):null;
							   option.toolbar===2?ol.css("display","none"):null;
						  var reFlag=0;
						  var meFlag=null;
						  var prev=mainBody.find(".prev");//$(".prev");
						  var next=mainBody.find(".next");//$(".next");
						  option.toolbar===1?(prev.css("display","none"),next.css("display","none")):null;
						  option.toolbar===2?(prev.css("display","none"),next.css("display","none")):null;
						  var autoFlag2=true;
					  //var hoverFlag=true;
						 try{ 
						   function adc(){
										   var a=ol.eq(reFlag).children("a");
										   var a2=null;
											   meFlag!=null?a2=ol.eq(meFlag).children("a"):null;
										 switch (state){
													   case 0:
														  
														   a.eq(0).removeClass("li-a-black-l").addClass("li-a-bred-l"); 
														   a.eq(2).removeClass("li-a-black-r").addClass("li-a-bred-r"); 
														   a.eq(1).animate({"width":"12px"},200).css("background-color","red");
														   function spring(){
																   a2.eq(0).removeClass("li-a-bred-l").addClass("li-a-black-l"); 
																   a2.eq(2).removeClass("li-a-bred-r").addClass("li-a-black-r"); 
																   a2.eq(1).animate({"width":"0px"},200).css("background-color","black");
															   };
															  a2?spring():null;
															   break;
														case 1:
															a.removeClass("li-a-circle-black").addClass("li-a-circle-red");
															a2?a2.removeClass("li-a-circle-red").addClass("li-a-circle-black"):null;
															break;
														case 2:
														 function manual(){
															  a.stop(true,false);
															 a2?a2.stop(true,false):null;
															   a.css("width","100%");
															   a2?a2.css("width","0%"):null;
															 };
														 function auto(){
															   a.animate({"width":"0%"},0);
															   a.animate({"width":"100.1%"},option.changeTime);
															   a2?a2.animate({"width":"0%"},0):null;
																 };
																autoFlag2?auto():manual();
														 break;
													};
							   };
						 }catch(e){
							 };
						   try{
						   mainbodyHover(mainBody);
						   }catch(e){
							   };
					    adc();
						 var anFlag=true;
						 var timerPo1 = null;
					   ol.mouseenter(function(e){
						//////console.log("11111")
						   var _this = $(this);
						   timerPo1 = setTimeout(function(){
                                 var me=_this;
							     var index=me.index();
								 if(index!=reFlag&&anFlag){
										// hoverFlag=false;
										 anFlag=false;
										 meFlag=reFlag;
										 reFlag=index;
										 adc();
											 me.stop(true,true);
											 //////console.log("meFlag="+meFlag+"     index="+index);
											 li.eq(meFlag).fadeTo(300,0.5);
											 li.eq(index).css({"opacity":"0.5","visibility":"visible"}); 
											 li.eq(index).fadeTo(300,1,function(){
												  li.eq(meFlag).css("visibility","hidden");
												  anFlag=true;
												 });
									   };
							},200);
						}).mouseleave(function(){
							clearTimeout(timerPo1);
						});
						   var ani;
						    
						 function autoAnimate(){
							    clearInterval(ani);
							     ani=setInterval(anim,option.changeTime);
								 function anim(){
									 if(anFlag){
										    autoFlag2=true;
										    anFlag=false;
										var maX=olL-1;
										    meFlag=reFlag;
										    reFlag++;
										    reFlag>maX?reFlag=0:null;
										  ////console.log("reFlag="+reFlag+"     meFlag="+meFlag);
										    adc();
											  li.eq(meFlag).fadeTo(300,0.5);
											  li.eq(reFlag).css({"opacity":"0.5","visibility":"visible"}); 
											  li.eq(reFlag).fadeTo(300,1,function(){
													  li.eq(meFlag).css("visibility","hidden");
													  anFlag=true;
												 }); 
									   };
								  };
							 };
							 autoAnimate();
						   try{
						   mainBody.mouseover(function(){autoFlag2=false;state!=0?adc():null;clearInterval(ani);});
						   mainBody.mouseleave(function(){autoFlag2=true;state!=0?adc():null;autoAnimate();})
						   }catch(e){
							   
							   };
						//**************
						prev.click(function(e){
							e.preventDefault();
							if(anFlag){
								 autoFlag2=false;
								  anFlag=false;
							  var maX=olL-1;
								  meFlag=reFlag;
								  reFlag--;
								  reFlag<0?reFlag=maX:null;
								  adc();
								  li.eq(meFlag).fadeTo(300,0.5);
								  li.eq(reFlag).css({"opacity":"0.5","visibility":"visible"}); 
								  li.eq(reFlag).fadeTo(300,1,function(){
										  li.eq(meFlag).css("visibility","hidden");
												  anFlag=true;
											 });
								  };
							});
						next.click(function(e){
							//////console.log("next="+anFlag)
							e.preventDefault();
							if(anFlag){
								       autoFlag2=false;
									   anFlag=false;
								   var maX=olL-1;
									   meFlag=reFlag;
									   reFlag++;
									   reFlag>maX?reFlag=0:null;
									  ////console.log("reFlag="+reFlag+"     meFlag="+meFlag);
									   adc();
									  li.eq(meFlag).fadeTo(300,0.5);
									  li.eq(reFlag).css({"opacity":"0.5","visibility":"visible"}); 
									  li.eq(reFlag).fadeTo(300,1,function(){
									  li.eq(meFlag).css("visibility","hidden");
													anFlag=true;
											});
							   };
							});
						
					    };
					};//end
				
			//************************************渐变动画***********************************************************************************************************************************************************************************************************
			//######################################滚动################################################################################################################################################################################################################
					function roll(){
						var state=option.state;
						     var shadeBody=mainBody.find(".main-top-scroll");//$(option.rollUL);
							 var rollBody=shadeBody.parent("div");
							 //var rollBody=$(".rollBody");
						     var li=shadeBody.children("li");
							 var liSize=li.size();
							 var liWidth=li.eq(0).find("img").width();
							if(liSize>1){
								 //rollBody.width(liWidth);  原来的
							var shadeBodyWidth1=liWidth*(liSize+2)+"px";
							  var shadeBodyWidth2=100*(liSize+2)+"%";
								 //shadeBody.css({"width":shadeBodyWidth2,"position":"relative","left":"-100%"});
								   shadeBody.css({"width":shadeBodyWidth2,"margin-left":"-100%"});
							     //li.css({"float":"left","width":""+liWidth+"px"});
								 li.css({"float":"left","width":""+(100/(liSize+2))+"%"});
								var cloneFirst=li.eq(0).clone();
								var cloneEnd=li.eq(liSize-1).clone();
								    shadeBody.prepend(cloneEnd).append(cloneFirst);
								  var str=returnUL(liSize,option.controlBar,state);// 返回填充标签
								      mainBody.append(str.join(""));
								  var ol=mainBody.find(".progress-bar-ol");//$(".progress-bar-ol");
								  var olLi=ol.children("li");
								  var liW=olLi.outerWidth();
								  var liMar=parseInt(olLi.css("margin-right"));
								  var liMar2=parseInt(ol.css("margin-left"));
								  var olL=olLi.size();
								       state==2?liW+=2:null;
									  ol.attr("style","width:"+((liW+liMar+liMar2)*olL)+"px").css("visibility","visible");
								  option.toolbar===0?ol.css("display","none"):null;
								  option.toolbar===2?ol.css("display","none"):null;
								 var reFlag=0;
								 var meFlag=null;
								 var autoFlag=false;
								 liSize==2?autoFlag=true:null;
								 var prev=mainBody.find(".prev");//$(".prev");
								 var next=mainBody.find(".next");//$(".next");
								  option.toolbar===1?(prev.css("display","none"),next.css("display","none")):null;
								  option.toolbar===2?(prev.css("display","none"),next.css("display","none")):null;
								 var autoFlag2=true;
								 
								 var adc=function(){
										    
											   var a=olLi.eq(reFlag).children("a");
											   var a2=null;
											   meFlag!=null?a2=olLi.eq(meFlag).children("a"):null;
											   
											   switch (state){
												   case 0:
													   var s=(new Date()).getTime();
													   a.eq(0).removeClass("li-a-black-l").addClass("li-a-bred-l"); 
													   a.eq(2).removeClass("li-a-black-r").addClass("li-a-bred-r"); 
													   a.eq(1).animate({"width":"12px"},200).css("background-color","red");
													 
													   function spring(){
															   a2.eq(0).removeClass("li-a-bred-l").addClass("li-a-black-l"); 
															   a2.eq(2).removeClass("li-a-bred-r").addClass("li-a-black-r"); 
															   e=(new Date()).getTime() -s;
															   a2.eq(1).animate({"width":"0px"},100).css("background-color","black");
														   };
														   a2?spring():null;
														   break;
													case 1:
													    a.removeClass("li-a-circle-black").addClass("li-a-circle-red");
														a2?a2.removeClass("li-a-circle-red").addClass("li-a-circle-black"):null;
														break;
													case 2:
													 function manual(){
														  a.stop(true,false);
														 a2?a2.stop(true,false):null;
														   a.css("width","100%");
													       a2?a2.css("width","0%"):null;
														 };
													 function auto(){
														   a.animate({"width":"0%"},0);
														   a.animate({"width":"100.1%"},option.changeTime);
														   a2?a2.animate({"width":"0%"},0):null;
													         };
														   autoFlag2?auto():manual();
													 break;
											      };
								            };
											//adc end
										adc();
										 
									mainbodyHover(mainBody); 
									
								 var moveFlag=true;
								     prev.click(function(){
											 if(moveFlag){
												 autoFlag=true
												 autoFlag2=false;
												 moveFlag=false;
												var maX=olL-1;
													meFlag=reFlag;
													reFlag--;
													reFlag<0?reFlag=maX:null;
													adc();
													//console.log("reFlag="+reFlag+"   meFlag="+meFlag);
													animation();
											   };
										 });
									 next.click(function(){
											 if(moveFlag){
												 autoFlag=true;
												 autoFlag2=false;
												 moveFlag=false;
												var maX=olL-1;
													meFlag=reFlag;
													reFlag++;
													reFlag>maX?reFlag=0:null;
													adc();
													animation();
											   };
										 });
								var timerPo = null;
								olLi.mouseenter(function(e){
									var _this = $(this);
									timerPo = setTimeout(function(){
                                         var me= _this;
										 var index=me.index();
										 //console.log(index);
											 if(index!=reFlag&&moveFlag){
												 moveFlag=false;
												 meFlag=reFlag;
												 reFlag=index;
												 adc();
													animation();
											  };

										},200);
						         }).mouseleave(function(){
						         	 clearTimeout(timerPo);
						         });
								 //autoFlag2 自动动画
								 //autoFlag  点击动画
							var animation=function(){
									         var movePosition;
											 var special=null;
											     movePosition="-"+(reFlag*100+100)+"%";
											 var m2=movePosition;
											liSize==2?(reFlag===1&meFlag===0&&autoFlag?(movePosition="-200%",m2="0%",special=true):null):reFlag==olL-1&&meFlag==0?(movePosition="0%",special=true):null;	
											liSize==2?(reFlag===1&meFlag===0&&autoFlag2?(movePosition="-200%",m2="0%",special=true):null):reFlag==0&&meFlag==olL-1?(movePosition="-"+((meFlag+2)*100)+"%",special=true):null;
												 move();
											  function move(){
													shadeBody.animate({
														"margin-left":movePosition
														},300,function(){
															special?(shadeBody.css("margin-left",m2)):null;
															moveFlag=true;
															});
												  };
									     };  
										 
							       function startA(){
											if(moveFlag){
												autoFlag2=true;
												autoFlag=false;
											    moveFlag=false;
										    var maX=olL-1;
											    meFlag=reFlag;
											    reFlag++;
											    reFlag>maX?reFlag=0:null;
												adc();
												animation();
										      };
									};
							var timeAnimate=setInterval(startA,option.changeTime);
							    //timeAnimate=setInterval(startA,4000);
								
									
							mainBody.mouseover(function(){autoFlag2=false;state!=0?adc():null;clearInterval(timeAnimate);});
						    mainBody.mouseleave(function(){autoFlag=false;autoFlag2=true;state!=0?adc():null;clearInterval(timeAnimate); timeAnimate=setInterval(startA,option.changeTime);})
							
				};
			};
			//**********************
			//##############################################返回填充标签字符串#################################################################################
			  function returnUL(len,flag,state){
				    var imgL=len;
					var str=new Array();
					if(flag){
				     	  str[0]="<ol class='pagechange-ol'><li class='prev'></li><li class='next'></li></ol><ol class='progress-bar-ol'>"
					  while(len--){
							     state===0?str[len+1]="<li> <a class='li-a-black-l'></a><a class='li-spring'></a><a class='li-a-black-r'></a> </li>":null;
							     state===1? str[len+1]="<li><a class='li-a-circle-black' onselectstart='return false'>"+(len+1)+"</a></li>":null; 
								 state===2?  str[len+1]="<li class='listyle'><a class='li-a-process'></a></li>":null;
						         };
						 
						str[imgL+1]="</ol>";
						return str;
					 }else{
						 
						return str;
						};
				  };
			//######################################over 共同事件#####
			function mainbodyHover(mainBody){
				var hover=option.hover;
				  var leave=option.leave;
				      hover==undefined?hover=['59','41']:null;
					  leave==undefined?leave=['12','-7']:null;
				  var prev=mainBody.find(".prev");//$(".prev");
				  var next=mainBody.find(".next");//$(".next");
				   var hoverFlag=true;
						var setTim;
						var setTim2;
						//var ani; //自动动画计时器
						mainBody.mouseenter(function(e){
							//clearInterval(ani);
							clearTimeout(setTim);
							clearTimeout(setTim2);
							setTim2=setTimeout(over,210);
							   if(hoverFlag){
								     prev.stop(true,false);
							         next.stop(true,false);	
									 prev.animate({"margin-left":""+hover[0]+"px"},200);
									 next.animate({"margin-right":""+hover[1]+"px"},200,function(){hoverFlag=false;});
							   };
							   function over(){
								     prev.animate({"margin-left":""+hover[0]+"px"},200);
									 next.animate({"margin-right":""+hover[1]+"px"},200,function(){hoverFlag=false;});
								};
						});
					   mainBody.mouseleave(function(e){
							  // autoAnimate();
								   clearTimeout(setTim);
								   clearTimeout(setTim2);
								   setTim=setTimeout(out,210);
							   if(!hoverFlag){
								   prev.stop(true,false);
								   next.stop(true,false);
								   prev.animate({"margin-left":""+leave[0]+"px"},200);
								   next.animate({"margin-right":""+leave[1]+"px"},200,function(){hoverFlag=true;});
								  };
								function out(){
								  prev.animate({"margin-left":""+leave[0]+"px"},200);
								   next.animate({"margin-right":""+leave[1]+"px"},200,function(){hoverFlag=true;});
									};
						    });
						mainBody.mousemove(function(e){
							  e.preventDefault();
						   	});
				};
			};
			
			//************************************************`
			
		
	//$("#adv-slides").rollorshade({effect:"shade",controlBar:true,changeTime:4000,state:2,toolbar:null});
	 //$("#adv-slides").rollorshade({effect:"roll",controlBar:true,changeTime:4000,state:2,toolbar:null});
	
	//$(".adv-slides").eq(0).rollorshade({effect:"roll",controlBar:true,changeTime:4000,state:0,toolbar:null});
	//$(".adv-slides").eq(1).rollorshade({effect:"roll",controlBar:true,changeTime:4000,state:1,toolbar:null});
	//$(".adv-slides").eq(2).rollorshade({effect:"roll",controlBar:true,changeTime:4000,state:2,toolbar:null});
	
	//$(".adv-slides").eq(0).rollorshade({effect:"shade",controlBar:true,changeTime:4000,state:0,toolbar:null});
	//$(".adv-slides").eq(1).rollorshade({effect:"shade",controlBar:true,changeTime:4000,state:1,toolbar:null});
	//$(".adv-slides").eq(2).rollorshade({effect:"shade",controlBar:true,changeTime:4000,state:2,toolbar:null});
});
