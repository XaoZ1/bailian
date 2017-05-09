/**
 * Created by Administrator on 2017/3/6 0006.
 */


$(function () {
    if($.cookie("user")){
        var user = JSON.parse(JSON.parse($.cookie("user")));
        $(".top ol li").eq(0).html("<a href=''>欢迎 "+user.username+"</a><a class='esc' href='##'>[退出]</a>");

        $(".top ol li").on("click",function () {
            $.cookie("user","",{expires:0, path:"/"});
            location.reload();
        });
    }else{
        $(".top ol li").eq(0).html("<a href='#' class='no-border' id='login1'>请登录</a><a href='register.html'>注册</a>")
    }




    if($.cookie("cart")){
        $("#end").html(JSON.parse($.cookie("cart")).length);
    }


    var myArr = [];


    $("#goods-list ").on("click", " .goods-list", function(){
        console.log("点击了商品");

        var index = $(this).index();
        //console.log(index);
        var myObj = myArr[index]; //我点击的商品信息
        console.log(myObj);

        //进入详情页面
        location.href = "detail.html?id=" + myObj.id;
    })


    //也可以在这里添加点击事件
    $("#goods-list").on("click", "a", function(e){
        //console.log("点击了加入购物车");
        e.stopPropagation();

        var index = $(this).index(".btn");
        //console.log(index);
        var goodsObj = myArr[index]; //当前点击的商品信息

        //console.log(goodsObj.id);
        //数组
        //如果第一次进入该页面(或者说第一次获取cart的cookie数据), 则该cookie数据是undefined, 否则是一个数组
        var cartArr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
        //console.log(cartArr)
        //先判断是否已经存在该商品, 如果存在则把num++, 否则添加新商品
        var isExist = false; //是否存在相同的商品
        for (var i=0; i<cartArr.length; i++){
            if (cartArr[i].id == goodsObj.id) {
                //如果进入if, 则说明存在相同的商品
                cartArr[i].num++;
                isExist = true; //说明存在相同商品
                //console.log(cartArr);
            }
        }

        //如果不存在相同的商品 ,则添加新商品
        if (isExist == false) {
            goodsObj.num = 1;
            cartArr.push(goodsObj);
        }
        //console.log(cartArr);
        //将arr序列化并存储到cookie中
        $.cookie("cart", JSON.stringify(cartArr), {expires:30, path:"/"});
        console.log( $.cookie("cart") );

        refresh();
    })


    $.get("../json/goods-list.json",function (data) {
        var arr = data;
        myArr = arr;

        //遍历数组
        for(var i=0; i<arr.length; i++){

            var obj = arr[i];
            $("<div class='goods-list'><img src="+ obj.image +" /><div class='price'>"+obj.unit +obj.price +" </div><div class='name'>"+ obj.name +" </div><a href='##' class='btn'>加入购物车</a></div>").appendTo("#goods-list");

        }
        // $("<img src="+ obj.image +" />").appendTo(".goods");
        // $("<div class='name'>"+ obj.name +" </div>").appendTo(".goods");
        // $("<div class='price'>"+"￥" +obj.price +" </div>").appendTo(".goods");
        
        var arr2 = $("#goods-list .goods-list");
        for(var k=0; k<arr2.length; k++){
            //console.log(k);
            if((k+1)%5 == 0){
                arr2.eq(k).css("margin-right","0");
            }
        }


    });


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
        })
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



    var offset = $("#end").offset();  //结束的地方的元素
    $("#goods-list").on("click", "a",function(event){   //是$(".addcar")这个元素点击促发的 开始动画的位置就是这个元素的位置为起点
        var addcar = $(this);
        var img = addcar.parent().find('img').attr('src');

        var flyer = $('<img class="u-flyer" src="'+img+'">');

        flyer.fly({
            //开始位置
            start: {
                left: event.clientX,
                top: event.clientY
            },
            //结束位置
            end: {
                left:$("#cart").offset().left,
                top: 335,
                width: 0,
                height: 0
            },
            //结束后
            onEnd: function(){
                $("#end").html(JSON.parse($.cookie("cart")).length);
                console.log("结束");
                //$("#msg").show().animate({width: '250px'}, 200).fadeOut(1000);
            }
        });
    });


})