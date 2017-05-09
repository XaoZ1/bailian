/**
 * Created by Administrator on 2017/3/1 0001.
 */


$(function () {



    if($.cookie("user")){
        var user = JSON.parse(JSON.parse($.cookie("user")));
        $(".top ol li").eq(0).html("<a href=''>欢迎 "+user.username+"</a><a class='esc' href='##'>[退出]</a>");
        $(".float ul").html("<li><a href=''>欢迎 "+user.username+"</a></li><li><a class='esc' href='##'>[退出]</a></li>");


    }else{
        $(".top ol li").eq(0).html("<a href='#' class='no-border' id='login1'>请登录</a><a href='register.html'>注册</a>")
        $(".float ul").html('<li><span>登录</span></li> <li><span style="border:none">注册</span></li>');
    }

    $(".top ol li,.float ul").on("click",".esc",function () {
        $.cookie("user","",{expires:0, path:"/"});
        location.reload();
    });
    

    if($.cookie("cart")){
        $("#end").html(JSON.parse($.cookie("cart")).length);
    }

//----------------导航栏--------------------
    $("#navlist li").mouseenter(function () {

        $(this).find("i").animate({bottom:0},200);
    });
    $("#navlist li").mouseleave(function () {

        $(this).find("i").animate({bottom:-2},200);
    });
    
    
//-----------------轮播图------------------
    
    $.get("../json/bannerJson.json",function (data) {
        var arr = data;

        //遍历数组
        for(var i=0; i<arr.length; i++){
            var obj = arr[i];
            $("<li><img src="+ obj.image +" /></li>").appendTo("#list1");
            $("<li></li>").appendTo("#list2");
        }
        $("#list2 li").eq(0).addClass("active");
        lunbo();
    });
    
    
    //开始轮播
    function lunbo() {
        $("#box span").eq(0).css({top:177,left:-40,background:"url('../images/bg_direction_nav.png') no-repeat 0 0"});
        $("#box span").eq(1).css({top:177,left:785,background:"url('../images/bg_direction_nav.png') no-repeat -40px 0"});

        $("#list1 li").first().show().siblings().hide();
        var i = 0;
        var size = $("#list1 li").size();
       // console.log(size);
        var timer = setInterval(function () {
            i++;
            move();

        },5000);
        function move() {
            if(i >=size){
                i = 0;
            }
            if(i<0){
                i = size-1;
            }
            $("#list1 li").eq(i).fadeToggle(1000).siblings().hide();
            if(i == 0){
                $("#banner-wrap").css("background","#ddf2f5");
            }else if(i == 1){
                $("#banner-wrap").css("background","#eef7ff");
            }
            else if(i == 2){
                $("#banner-wrap").css("background","#b4cd11");
            }
            else if(i == 3){
                $("#banner-wrap").css("background","#aeccd7");
            }
            $("#list2 li").eq(i).animate({width:30},300).siblings().animate({width:14},300);
            $("#list2 li").eq(i).css("background","#e6133c").siblings().css("background","#222222");
        }
        $("#box span").eq(0).click(function () {
            i--;
            move();
        });
        $("#box span").eq(1).click(function () {
            i++;
            move();
        });

        //-------------------------
        $("#list2 li").click(function () {
            i = $(this).index();
            move();
        });
        $("#box").mouseenter(function () {
            clearInterval(timer);
            $("#box span").eq(0).animate({left:0});
            $("#box span").eq(1).animate({left:745});

            //鼠标移入
            $("#box span").eq(0).mouseenter(function () {
                $(this).css("background","url('../images/bg_direction_nav.png') no-repeat 0 -70px");
            });
            $("#box span").eq(1).mouseenter(function () {
                $(this).css("background","url('../images/bg_direction_nav.png') no-repeat -40px -70px");
            });
            //鼠标移除
            $("#box span").eq(0).mouseleave(function () {
                $(this).css("background","url('../images/bg_direction_nav.png') no-repeat 0 0");
            });
            $("#box span").eq(1).mouseleave(function () {
                $(this).css("background","url('../images/bg_direction_nav.png') no-repeat -40px 0");
            });
        });
        $("#box").mouseleave(function () {
            $("#box span").eq(0).animate({left:-40});
            $("#box span").eq(1).animate({left:785});
            timer = setInterval(function () {
                i++;
                move();

            },5000);
        });
    }


    //-----------------小轮播图------------------



    $.get("../json/minBanner.json",function (data) {
        var arr = data;

        //遍历数组
        for(var i=0; i<arr.length; i++){
            var obj = arr[i];
            $("<li><img src="+ obj.image +" /></li>").appendTo(".minlist");
            $("<li><span></span></li>").appendTo(".minlist2");
        }
        $(".minlist2 li ").eq(0).find("span").css("width","30px");
        lunbo1();
    });


    //开始轮播
    function lunbo1() {




        //jq轮播图
        var list1 = $(".minlist");
        var list2 = $(".minlist2");
        var li1 = $(".minlist li");
        var li2 = $(".minlist li");

        //复制第一张图到最后
        li1.first().clone(true).appendTo(list1);

        var size = $(".minlist li").size();
        var i = 0;

        var timer = setInterval(function () {
            i++;
            move();

        },4000);
        function move() {

            if (i >= size){
                list1.css("left", 0);
                i = 1;
            }

            list1.stop().animate({left:-i*306}, 500);


            $(".minlist2 li span").eq(i).stop().animate({width:30},3500).parent().siblings().find("span").css("width",0);
            if(i == size-1){
                $(".minlist2 li span").eq(0).stop().animate({width:30},3500).parent().siblings().find("span").css("width",0);
            }
        }
        $(".minlist2 li").click(function () {
            i = $(this).index();
            move()

        });
        $("#box1").mouseenter(function () {
            clearInterval(timer);
        })
        $("#box1").mouseleave(function () {
            timer = setInterval(function () {
                i++;
                move();

            },4000);
        })


    }



    //-----------------F1---------------------------------------
    $("#floor1 div").mouseenter(function () {
        $(this).find("img").stop().animate({left:-10},200).parent().parent().siblings().find("img");
    });
    $("#floor1 div").mouseleave(function () {
        $(this).find("img").stop().animate({left:0},200).parent().parent().siblings().find("img");
    });

    //-----------------F2---------------------------------------
    $("#floor2 div").mouseenter(function () {
        $(this).find("img").stop().animate({left:-10},200).parent().parent().siblings().find("img");
    });
    $("#floor2 div").mouseleave(function () {
        $(this).find("img").stop().animate({left:0},200).parent().parent().siblings().find("img");
    });
    //-----------------F3---------------------------------------
    $("#floor3 div").mouseenter(function () {
        $(this).find("img").stop().animate({left:-10},200).parent().parent().siblings().find("img");
    });
    $("#floor3 div").mouseleave(function () {
        $(this).find("img").stop().animate({left:0},200).parent().parent().siblings().find("img");
    });
    //-----------------F4---------------------------------------
    $("#floor4 div").mouseenter(function () {
        $(this).find("img").stop().animate({left:-10},200).parent().parent().siblings().find("img");
    });
    $("#floor4 div").mouseleave(function () {
        $(this).find("img").stop().animate({left:0},200).parent().parent().siblings().find("img");
    });
    //-----------------F5---------------------------------------
    $("#floor5 div").mouseenter(function () {
        $(this).find("img").stop().animate({left:-10},200).parent().parent().siblings().find("img");
    });
    $("#floor5 div").mouseleave(function () {
        $(this).find("img").stop().animate({left:0},200).parent().parent().siblings().find("img");
    });
    //-----------------F6---------------------------------------
    $("#floor6 div").mouseenter(function () {
        $(this).find("img").stop().animate({left:-10},200).parent().parent().siblings().find("img");
    });
    $("#floor6 div").mouseleave(function () {
        $(this).find("img").stop().animate({left:0},200).parent().parent().siblings().find("img");
    });
    //-----------------F7---------------------------------------
    $("#floor7 div").mouseenter(function () {
        $(this).find("img").stop().animate({left:-10},200).parent().parent().siblings().find("img");
    });
    $("#floor7 div").mouseleave(function () {
        $(this).find("img").stop().animate({left:0},200).parent().parent().siblings().find("img");
    });
    //-----------------F8---------------------------------------
    $("#floor8 div").mouseenter(function () {
        $(this).find("img").stop().animate({left:-10},200).parent().parent().siblings().find("img");
    });
    $("#floor8 div").mouseleave(function () {
        $(this).find("img").stop().animate({left:0},200).parent().parent().siblings().find("img");
    });

//---------------------猜你喜欢-----------------------------------

    $.get("../json/goods.json",function (data) {
        var arr1 = data;

        //遍历数组
        for(var i=0; i<arr1.length; i++){

            var obj = arr1[i];
            $("<div class='goods'><img src="+ obj.image +" /><div class='name'>"+ obj.name +" </div><div class='price'>"+"￥" +obj.price +" </div></div>").appendTo("#goods-main");

        }
        // $("<img src="+ obj.image +" />").appendTo(".goods");
        // $("<div class='name'>"+ obj.name +" </div>").appendTo(".goods");
        // $("<div class='price'>"+"￥" +obj.price +" </div>").appendTo(".goods");
        var arr2 = $("#goods-main .goods");
        for(var k=0; k<arr2.length; k++){
            //console.log(k);
            if((k+1)%5 == 0){
                arr2.eq(k).css("margin-right","0");
            }
        }
    });



//---------------------左导航栏div-----------------------------------

    $("#item-main li").hover(function () {
        var that = $(this).index();
        $("#itemlist div").eq(that).stop().fadeIn(300).siblings().hide();
        $("#itemlist div").eq(that).animate({left:190},300).siblings().hide();
        $("#item-main li").eq($(this).index()).css({background:"#f9f9f9"}).find("a").css("color","#000");


    },function () {
        var that = $(this).index();
        $("#item-main li").eq($(this).index()).css({background:"#e6133c"}).find("a").css("color","#fff");
       
    });
    $("#itemlist div").hover(function () {
        $("#item-main li").eq($(this).index()).css({background:"#f9f9f9"}).find("a").css("color","#000");
        $(this).show()
    },function () {
        $("#item-main li").eq($(this).index()).css({background:"#e6133c"}).find("a").css("color","#fff");
        $(this).hide()
    })



    $("#item-main li").mouseleave(function () {
        var that = $(this).index();
        $("#itemlist div").eq(that).hide().siblings().hide();
        //$("#itemlist div").eq(that).css("left",150).siblings().hide();

    });
    $("#itemlist div b").click(function () {
        $(this).parent().hide();
    })



//---------------------楼梯div-----------------------------------

    $("#last").click(function () {
        $("html, body").stop().animate({scrollTop:0}, 500);
    });


    var isMoving = false;
    $("#loutiNav li").click(function () {
        $(this).find("span").show().parent().siblings().find("span").hide();

        var index = $(this).index();
        //console.log(index);
        var top = $(".louti").eq(index).offset().top-200;
        //console.log(top);
        isMoving = true;
        $("html, body").stop().animate({scrollTop:top}, 500, function(){
            isMoving = false;
        });
    })

    //scroll
    $(window).scroll(function(){
        var scrol = $(window).scrollTop();
        if(scrol > 150){
            $("#float-wrap").stop().animate({top:0});
        }else{
            $("#float-wrap").stop().animate({top:-75});
        }

        var scrolltop = $(window).scrollTop();


        if(scrolltop < 900){
            $("#loutiNav").hide();
        }
        else {
            $("#loutiNav").show();
        }

        if (isMoving == false) {

            var scrollTop = $(window).scrollTop();
            //console.log(scrollTop);

            //遍历
            var index = 0;
            $(".louti").each(function(){
                var top1 = $(this).offset().top;

                //console.log(scrollTop);
                //console.log(top1);

                if (scrollTop >= top1-300 ){
                    //console.log(top);
                    index = $(this).index(".louti");
                }
            })
            //console.log(index);

            //改变楼梯按钮的选中状态
            $("#loutiNav li").eq(index).find("span").show()
                .parent().siblings().find("span").hide();
        }
    })

    var checkedArr = [];
    var arr = $.cookie("cart");
    if (arr){
        arr = JSON.parse(arr); //json解析
        for (var i=0; i<arr.length; i++){
            checkedArr.push(true);
        }
    }

    function refresh(){
        var goodsArr = $.cookie("cart");
        if (goodsArr) { //如果购物车cart有商品

            //JSON 解析
            goodsArr = JSON.parse(goodsArr);

            //清除旧的li
            $("#list").empty();

            //添加新li
            //将cookie中的所有购物车商品添加到页面上
            var total = 0; //保存总价
            for (var i=0; i<goodsArr.length; i++){
                var obj = goodsArr[i]; //购物车中的每个商品

                //创建节点

                var li = $("<li></li>");
                li.appendTo("#list");
                $('<img src='+ obj.image +' />').appendTo(li);
                $('<span class="name">'+ obj.name +'</span>').appendTo(li);
                $('<span class="price1">'+ obj.unit + (obj.num * obj.price) +'</span>').appendTo(li);
                $('<span class="price">'+ obj.unit + obj.price+"x"+obj.num +'</span>').appendTo(li);
                $('<input class="down" type="button" value="-" />').appendTo(li);
                $('<input class="num" type="text" value='+ obj.num +' />').appendTo(li);
                $('<input class="up" type="button" value="+" />').appendTo(li);


                //$('<a  href="#">加入收藏</a>').appendTo(li);
                $('<a class="del" href="#"></a>').appendTo(li);

                //计算总价
                if (checkedArr[i] == true){
                    total += obj.num * obj.price;
                }

                $("#list li").mouseenter(function () {
                    $(this).css("background","#f2f2f2").siblings().css("background","#fff");
                    $(this).find(".up").css("display","block");
                    $(this).find(".down").css("display","block");
                    $(this).find(".num").css("display","block");
                    $(this).find(".price").css("display","none");
                    $(this).find(".del").css("display","block");
                })
                $("#list li").mouseleave(function () {
                    //$(this).css("background","#f2f2f2").siblings().css("background","#fff");
                    $(this).find(".up").css("display","none");
                    $(this).find(".down").css("display","none");
                    $(this).find(".num").css("display","none");
                    $(this).find(".price").css("display","block");
                    $(this).find(".del").css("display","none");
                })

            }
            //console.log(total);
            $("#total").html(obj.unit+total);
        }
    }
//---------------------购物车-----------------------------------
    $(".c-right").load("right_cart.html #right-cart",function () {
        cartcookie();
        $("#hou").click(function () {
            //console.log($("#shopping").css("right"))
            if(parseInt($("#shopping").css("right")) < 0){
                $("#shopping").animate({right:0},300);
            }else{
                $("#shopping").animate({right:-270},300);
            }
        });
        $("#r-login #login").click(function () {

                var input1 = $("#r-login input").eq(0).val();
                var input2 = $("#r-login input").eq(1).val();
                //console.log($("#r-login input").eq(0).val());//console.log($("#r-login input").eq(1).val());

                $.get("http://10.36.135.115/bailian/php/loginPhp.php",{username:input1,pwd:input2},function (data) {
                    var obj = JSON.parse(data);

                    if(obj.status == 1){
                        $.cookie("user", JSON.stringify(data), {expires:1, path:"/"});
                        //console.log($.cookie("user"));
                        location.reload();
                    }else{
                        alert("用户名或密码错误！");
                    }
                })
        });
    });

    $("#info").click(function () {

        if(parseInt($("#r-login").css("height")) > 0 ){
            $("#r-login").stop().animate({height:0});

        }else {
            $("#r-login").stop().animate({height:"100%"});
        }
    });
    $("#login1").click(function () {
        $("#r-login").stop().animate({height:"100%"});
        if(parseInt($("#shopping").css("right")) < 0){
            $("#shopping").animate({right:0},300);
        }else{
            $("#shopping").animate({right:-270},300);
        }
    });

   // if(parseInt($("#shopping").css("right")) < 0) { $(this).css("background-color", "#d62233");}
        $("#shopping .c-left div").mouseenter(function () {
            if(parseInt($("#shopping").css("right")) == -270) {
                $(this).css("background-color", "#d62233");
            }
            $(this).find("span").stop().animate({left:-100,width:100},200);

        })
        $("#shopping .c-left div").mouseleave(function () {
            if(parseInt($("#shopping").css("right")) == -270) {
                $(this).css("background-color", "#333333");
            };
            $(this).find("span").stop().animate({left:-1,width:0},200);
        })

    $("#shopping .c-left #cart").click(function () {
        $("#r-login").animate({height:"0"});
        //console.log($("#shopping").css("right"))
        if(parseInt($("#shopping").css("right")) < 0){
            $("#shopping").animate({right:0},300);
            $(this).css("background-color","#d62233");
        }else{
            $("#shopping").animate({right:-270},300);
            $(this).css("background-color","#333333");
        }

    })

    //---------------------banner-ul-----------------------------------

        $(".float ul li").eq(0).find("span").click(function () {
            location.href = "login.html";
        })
        $(".float ul li").eq(1).find("span").click(function () {
            location.href = "register.html";
        })


})