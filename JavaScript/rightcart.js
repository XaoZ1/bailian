/**
 * Created by Administrator on 2017/3/7 0007.
 */


function cartcookie() {

    $(function () {


        $("body").on("click", "#car", function () {
            //console.log(1);
            location.href="cart.html";
        })

        //------------------------------购物车---------------------------------------------------
        //console.log( $.cookie("cart") );

        //checkArr: 用来保存每个商品的选中状态
        var checkedArr = [];
        var arr = $.cookie("cart");
        if (arr){
            arr = JSON.parse(arr); //json解析
            for (var i=0; i<arr.length; i++){
                checkedArr.push(true);
            }
        }


        refresh();
        //刷新页面: 清除旧的li, 再根据最新的cookie添加新的li
        function refresh(){
            //获取cookie中购物车的所有商品信息
            var goodsArr = $.cookie("cart");
            if (goodsArr) { //如果购物车cart有商品
                //JSON 解析
                goodsArr = JSON.parse(goodsArr);

                //清除旧的li
                $("#list").empty();

                //添加新li
                //将cookie中的所有购物车商品添加到页面上
                var total = 0; //保存总价
                var myUnit = "￥";
                //console.log(goodsArr.length);
                for (var i=0; i<goodsArr.length; i++){
                    var obj = goodsArr[i]; //购物车中的每个商品
                    myUnit = obj.unit;
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
                $("#total").html(myUnit + total);
            }
        }

        //删除
        $("#list").on("click", ".del", function(){
            var index =  $(this).index(".del");
            //console.log(index);

            //从cookie中获取最新的购物车数据
            var arr = JSON.parse($.cookie("cart"));
            arr.splice(index, 1); //删除数组arr的第index个
            checkedArr.splice(index, 1); //删除checkArr中的第index个


            //重新将修改后的arr保存到cookie中
            $.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
            //console.log( $.cookie("cart") );

            //判断是否全选了
            checkAll();

            //刷新数据
            refresh();
        })

        //-
        $("#list").on("click", ".down", function(){
            var index = $(this).index(".down");

            //改cookie数据
            var arr = JSON.parse($.cookie("cart"));
            //console.log(arr);
            if (arr[index].num > 1){
                arr[index].num--;
            }
            $.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
            console.log( $.cookie("cart"));
            refresh();
        })

        //+
        $("#list").on("click", ".up", function(){
            var index = $(this).index(".up");

            //改cookie数据
            var arr = JSON.parse($.cookie("cart"));
            arr[index].num++;
            $.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});

            refresh();
        })


        //勾选/取消勾选
        $("#list").on("click", ".check", function(){
            var index = $(this).index(".check");

            //取反(勾选或取消勾选)
            checkedArr[index] = !checkedArr[index];

            //判断是否全选了
            checkAll();

            //刷新数据
            refresh();
        })

        //全选
        $("#allChecked").click(function(){
            console.log( $(this).prop("checked") );

            if ($(this).prop("checked") == true){ //全选了
                $.each(checkedArr, function(i) {
                    checkedArr[i] = true;
                });
            }
            else { //取消全选
                $.each(checkedArr, function(i) {
                    checkedArr[i] = false;
                });
            }

            //刷新
            refresh();
        })

        //删除选中
        $("#deletePart").click(function(){
            //获取cookie中的商品
            var arr = JSON.parse($.cookie("cart"));

            var newArr = [];
            var newCheckArr = [];
            for (var i=0; i<arr.length; i++){
                if (checkedArr[i] == false){
                    newArr.push(arr[i]);
                    newCheckArr.push(checkedArr[i]);
                }

            }
            checkedArr = newCheckArr;

            $.cookie("cart", JSON.stringify(newArr), {expires:30, path:"/"});

            refresh();
        })

        //判断是否全选了
        function checkAll(){
            var sum = 0;
            for (var i=0; i<checkedArr.length; i++){
                sum += checkedArr[i];
            }

            if (sum == checkedArr.length){ //是全选
                $("#allChecked").prop("checked", true); //勾选全选
            }
            else {
                $("#allChecked").prop("checked", false); //不勾选全选
            }
        }
    })



    $("#ohter a").eq(0).hover(function () {
        $(this).css("background","url('../images/../images/login-cion-1.png') no-repeat 0 -22px")
    },function () {
        $(this).css("background","url(../images/../images/login-cion-1.png) no-repeat 0 0")
    });





}

