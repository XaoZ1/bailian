<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/2/24 0024
 * Time: 下午 3:20
 */


//支持跨域
header('Access-Control-Allow-Origin:*');

//先获取前段提交的参数:name, pwd
$name = $_REQUEST["username"];
$pwd = $_REQUEST["pwd"];

class Res{
    public $status;
    public $msg;
    public $username;
    //public $level;
}

//登录
$conn = new mysqli("my5569091.xincache1.cn", "my5569091", "zk19968833", "my5569091") or die("连接失败");
$sql = "select * from userdata";
$result = $conn->query($sql);
if($result->num_rows>0){
    $isSuccess = false;//是否登录成功
    while($row = $result->fetch_assoc()){
        if($row["username"]==$name && $row["password"]==$pwd){
            $isSuccess = true;//表示登陆成功
            //$le = $row["level"];
        }
    }
    //登陆成功
    if($isSuccess == true){
        $res = new Res();
        $res->status = 1;
        $res->msg = "login success!";
        $res->username = $name;
        //$res->level = $le;
        echo json_encode($res);
    }
    //登陆失败
    else{
        $res = new Res();
        $res->status = 0;
        $res->msg = "fail!";
        echo json_encode($res);
    }
}
else{
    //登陆失败，没有用户
    $res = new Res();
    $res->status = 0;
    $res->msg = "fail!";
    echo json_encode($res);
}
