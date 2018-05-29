<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title></title>
	<meta name="description" content="">
	<meta name="keywords" content="">
	<link href="" rel="stylesheet">
	<link href="resources/css/mainStyle.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="resources/js/jquery.js"></script>
	
	<script type="text/javascript">
$(function(){	
	//顶部导航切换
	$(".nav li a").click(function(){
		$(".nav li a.selected").removeClass("selected")
		$(this).addClass("selected");
	})	
})	
</script>
	
</head>

<body style="background:url(resources/images/topbg.gif) repeat-x;">

    <div class="topleft">
    <a href="main.html" target="_parent"><img src="resources/images/jyks.png" title="系统首页" /></a>
    </div>
        
    <ul class="nav">
    <li><a href="default.html" target="rightFrame" class="selected"><img src="resources/images/icon01.png" title="工作台" /><h2>工作台</h2></a></li>
    <li><a href="imgtable.html" target="rightFrame"><img src="resources/images/icon02.png" title="模型管理" /><h2>模型管理</h2></a></li>
    <li><a href="tools.html"  target="rightFrame"><img src="resources/images/icon04.png" title="常用工具" /><h2>常用工具</h2></a></li>
    <li><a href="tab.html"  target="rightFrame"><img src="resources/images/icon03.png" title="发布信息" /><h2>发布信息</h2></a></li>
    </ul>
            
    <div class="topright">    
    <ul>
    <li><span><img src="resources/images/help.png" title="帮助"  class="helpimg"/></span><a href="#">帮助</a></li>
    <li><a href="#">关于</a></li>
    <li><a href="/exam" target="_parent">退出</a></li>
    </ul>
     
    <div class="user">
    <span>${user.userName }</span>
    <i>消息</i>
    <b>0</b>
    </div>    
    
    </div>

</body>
</html>