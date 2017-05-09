<?php
/**
 * Created by PhpStorm.
 * User: Jeff
 * Date: 2017/2/24
 * Time: 11:19
 */

//支持跨域
header('Access-Control-Allow-Origin:*');

//从前端获取的参数有三个参数:
$name = $_REQUEST["userid"]; //用户名
$pwd = $_REQUEST["pwd"]; //密码
$phone = $_REQUEST["phone"]; //手机号
$email = $_REQUEST["email"]; //邮箱

class Res{
    public $status;
    public  $msg;
}

//先判断是否已经存在相同的用户名
$conn2 = new mysqli("my5569091.xincache1.cn", "my5569091", "zk19968833", "my5569091") or die("连接失败");
$sql2 = "select * from userdata";
$result = $conn2->query($sql2); //执行sql语句

$isExist = false; //是否存在相同的用户名
if ($result->num_rows > 0) {

    while ( $row = $result->fetch_assoc() ){
        if ( $row["username"] == $name ){
            $isExist = true; //说明存在
        }
    }
    if ($isExist == true){ //存在
        $res = new Res();
        $res->status = 0;
        $res->msg = "name exist!";
        echo json_encode($res);
    }
    else { //不存在, 可以使用
        //echo "name not exist";
    }

}
else {
    //echo "name not exist";
}
 $conn2->close(); //关闭数据库

//如果没有相同的用户名, 则注册
if ($isExist == false) {

    //注册: 将用户名, 密码, 年龄插入到数据库booksdb的users表中
    $conn = new mysqli("my5569091.xincache1.cn", "my5569091", "zk19968833", "my5569091") or die("连接失败");
    $rand = rand(); //随机值
    $sql = "insert into userdata(username,password,phonenumber,email) values('$name', '$pwd', '$phone','$email')";
    $result = $conn->query($sql); //执行sql语句, 插入
    if ($result == true) {

        $res = new Res();
        $res->status = 1;
        $res->msg = "register success!";
        echo json_encode($res);
    } else {

        $res = new Res();
        $res->status = 2;
        $res->msg = "fail!";
        echo json_encode($res);
    }
    $conn->close(); //关闭数据库

}
