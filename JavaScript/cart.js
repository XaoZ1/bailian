/**
 * Created by Administrator on 2017/3/8 0008.
 */
$(function(){
    if($.cookie("user")){
        var user = JSON.parse(JSON.parse($.cookie("user")));
        $(".top ol li").eq(0).html("<a href=''>欢迎 "+user.username+"</a><a class='esc' href='##'>[退出]</a>");


    }else{
        $(".top ol li").eq(0).html("<a href='#' class='no-border' id='login1'>请登录</a><a href='register.html'>注册</a>")
    }

    $(".top ol li").on("click",".esc",function () {
        $.cookie("user","",{expires:0, path:"/"});
        location.reload();
    });
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
            for (var i=0; i<goodsArr.length; i++){
                var obj = goodsArr[i]; //购物车中的每个商品

                //创建节点

                var li = $("<li></li>");
                li.appendTo("#list");
                if (checkedArr[i] == true){ //如果勾选状态为true, 则显示选中状态
                    $('<input class="check" type="checkbox" checked="checked" />').appendTo(li);
                }
                else {
                    $('<input class="check" type="checkbox" />').appendTo(li);
                }
                $('<img src='+ obj.image +' />').appendTo(li);
                $('<span class="name">'+ obj.name +'</span>').appendTo(li);
                $('<span class="price">'+ obj.unit + obj.price +'</span>').appendTo(li);
                $('<input class="down" type="button" value="-" />').appendTo(li);
                $('<input class="num" type="text" value='+ obj.num +' />').appendTo(li);
                $('<input class="up" type="button" value="+" />').appendTo(li);

                $('<span class="price1">'+ obj.unit + (obj.num * obj.price) +'</span>').appendTo(li);
                $('<a  href="#">加入收藏</a>').appendTo(li);
                $('<a class="del" href="#">删除</a>').appendTo(li);

                //计算总价
                if (checkedArr[i] == true){
                    total += obj.num * obj.price;
                }
            }
            console.log(total);
            $("#total").html(obj.unit+total);
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
        if (arr[index].num > 1){
            arr[index].num--;
        }
        $.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});

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