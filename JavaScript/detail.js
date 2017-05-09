/**
 * Created by Administrator on 2017/3/7 0007.
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
        //---------------------动态获取-----------------------------------


        //console.log(111111111); //从index页面传过来的商品id
        var goodsId = location.search.slice(4);
        //console.log(goodsId); //从index页面传过来的商品id
         var myArr = [];
        //获取所有商品信息
        $.get("../json/goods-list.json", function(arr){
            for (var j=0; j<arr.length; j++){
                if (arr[j].id == goodsId) {
                    var obj = arr[j];
                    fn(obj);
                }
            }

        });

        function fn(obj){
            $("#bigbox img").attr("src", obj.image);
            $(".box1").eq(0).attr("src", obj.image);
            $(".box1").eq(1).attr("src", obj.image1);
            $(".box1").eq(2).attr("src", obj.image2);
            $(".box1").eq(3).attr("src", obj.image3);

            $("#n1 input").val(obj.num);


            $("#price em").html(obj.unit+"<i>"+obj.price+"</i>");

            $("#detail h1").html(obj.name);


            $("#bigbox-wrap").on("mouseenter",".box1",function () {
             $("#bigbox img").attr("src",$(this).attr("src"));

            })
            $("#bigbox").on("mouseenter","img",function () {
                $("#bigImg").attr("src",$(this).attr("src"));
            })



            $("#detail").on("click", "#detail1", function(){
                console.log("点击了加入购物车");

                var goodsObj = obj;
                //console.log(goodsObj.id);
                //数组
                //如果第一次进入该页面(或者说第一次获取cart的cookie数据), 则该cookie数据是undefined, 否则是一个数组
                var cartArr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
                //console.log(cartArr)
                //先判断是否已经存在该商品, 如果存在则把num++, 否则添加新商品
                var isExist = false; //是否存在相同的商品
                for (var i=0; i<cartArr.length; i++){
                    if (cartArr[i].id == goodsId) {

                        if($("#n1 input").val() != ""){
                            cartArr[i].num = (cartArr[i].num-0) + ($("#n1 input").val()-0);
                            isExist = true;
                        }else if($("#n1 input").val() == ""){
                            //如果进入if, 则说明存在相同的商品
                            cartArr[i].num++;
                            isExist = true; //说明存在相同商品
                            //console.log(cartArr);
                        }
                    }
                }
                //如果不存在相同的商品 ,则添加新商品
                if (isExist == false) {
                    if($("#n1 input").val() != ""){
                        goodsObj.num = $("#n1 input").val();
                    }else{
                        goodsObj.num = 1;
                    }

                    cartArr.push(goodsObj);
                }
                //console.log(cartArr);
                //将arr序列化并存储到cookie中
                $.cookie("cart", JSON.stringify(cartArr), {expires:30, path:"/"});
                //console.log( $.cookie("cart") );
                $("#end").html($("#list li").size());
                refresh();
            })


        }

    //---------------------else-----------------------------------
    $("#j-right ul li").eq(0).css({color:"#e6133c",borderTop:"2px solid #e6133c",marginTop:"-2px"});
    $("#j-right ul li").click(function () {

        $(this).css({color:"#e6133c",borderTop:"2px solid #e6133c",marginTop:"-2px"}).siblings().
        css({color:"#666666",borderTop:"none",marginTop:0});

    })
    
//---------------------else-----------------------------------

    //等比公式
    //小图width/大图width == 小区域width/大区域width
    $("#smallArea").width( $("#bigbox").width() * $("#bigArea").width() / $("#bigImg").width() );
    $("#smallArea").height( $("#bigbox").height() * $("#bigArea").height() / $("#bigImg").height() );

    //放大系数
    var scale = $("#bigImg").width() / $("#bigbox").width();

    //在小图中移动
    $("#bigbox").mousemove(function(e){
        $("#smallArea").show(); //显示小区域
        $("#bigArea").show(); //显示大区域

        var x = e.pageX - $("#bigbox").offset().left - $("#smallArea").width()/2;
        var y = e.pageY - $("#bigbox").offset().top - $("#smallArea").height()/2;

        //控制不超出左右边界
        if (x < 0){
            x = 0;
        }
        else if (x > $("#bigbox").width()-$("#smallArea").width()){
            x = $("#bigbox").width()-$("#smallArea").width();
        }
        //控制不超出上下边界
        if (y < 0){
            y = 0
        }
        else if (y > $("#bigbox").height()-$("#smallArea").height()) {
            y = $("#bigbox").height()-$("#smallArea").height();
        }

        //小区域移动
        $("#smallArea").css({left:x, top:y});

        //大图移动
        $("#bigImg").css({left: -scale*x,top: -scale*y});


    })
    $("#bigbox").mouseleave(function(){
        $("#smallArea").hide(); //隐藏小区域
        $("#bigArea").hide(); //隐藏大区域
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
        //console.log($("#shopping").css("right"))
        $("#r-login").animate({height:"0"});

        if(parseInt($("#shopping").css("right")) < 0){
            $("#shopping").animate({right:0},300);
            $(this).css("background-color","#d62233");
        }else{
            $("#shopping").animate({right:-270},300);
            $(this).css("background-color","#333333");
        }

    })




    var num = 0;
    //+
    $("#n1").on("click", ".up1", function(){
        //var index = $(this).index(".up1");
        //改cookie数据
        var arr = JSON.parse($.cookie("cart"));
            num++;
        $.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});

        $("#n1 input").val(num);
        //console.log($.cookie("cart"));
        refresh();
    });


    //-
    $("#n1").on("click", ".down1", function(){
        //var index = $(this).index(".down1");
        //改cookie数据
        var arr = JSON.parse($.cookie("cart"));
        if(num >0){
            num--;
        }
        $("#n1 input").val(num);
        //console.log($.cookie("cart"));
        refresh();
    });


//---------------------加入购物车-----------------------------------
    var offset = $("#end").offset();  //结束的地方的元素
    $("#detail1").click(function(event){   //是$(".addcar")这个元素点击促发的 开始动画的位置就是这个元素的位置为起点
        var addcar = $("#bigbox");
        var img = addcar.find('img').attr('src');

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