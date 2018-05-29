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
	<link href="resources/css/mainStyle.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="resources/js/jquery.js"></script>
</head>

<body>
	<div class="place">
    <span>位置：</span>
    <ul class="placeul">
    <li><a href="#">首页</a></li>
    </ul>
    </div>
    
    <div class="mainindex">
    
    
    <div class="welinfo">
    <span><img src="resources/images/sun.png" alt="天气" /></span>
    <b>${user.userName }您好，欢迎进入教育考试系统</b>
    <a href="#">帐号设置</a>
    </div>
    
    <div class="welinfo">
    <span><img src="resources/images/time.png" alt="时间" /></span>
    <i>您上次登录的时间：2017-01-04 16:22</i> （不是您登录的？<a href="#">请点这里</a>）
    </div>
    
    <div class="xline"></div>
    
    <ul class="iconlist">
    
    <li><img src="resources/images/ico01.png" /><p><a href="#">管理设置</a></p></li>
    <li><img src="resources/images/ico02.png" /><p><a href="#">添加商品</a></p></li>
    <li><img src="resources/images/ico03.png" /><p><a href="#">数据统计</a></p></li>
    <li><img src="resources/images/ico04.png" /><p><a href="#">文件上传</a></p></li>
    <li><img src="resources/images/ico05.png" /><p><a href="#">员工管理</a></p></li>
    <li><img src="resources/images/ico06.png" /><p><a href="#">查询</a></p></li> 
            
    </ul>
    
    <div class="ibox"><a class="ibtn"><img src="resources/images/iadd.png" />添加新的快捷功能</a></div>
    
    <div class="xline"></div>
    <div class="box"></div>
    
    <div class="welinfo">
    <span><img src="resources/images/dp.png" alt="提醒" /></span>
    <b>教育考试管理系统</b>
    </div>
    
    <ul class="infolist">
    <li><span>您可以对教师用户进行管理</span><a class="ibtn">对用户的增删改查</a></li>
    <li><span>您可以对考试题库进行管理</span><a class="ibtn">添加题库等</a></li>
    <li><span>您可以进行密码修改、账户设置等操作</span><a class="ibtn">账户管理</a></li>
    </ul>
    
    <div class="xline"></div>
    
    <div class="uimakerinfo"><b>详细信息请关注网站使用指南信息</b></div>
    
    <ul class="umlist">
    <li><a href="#">如何管理用户</a></li>
    <li><a href="#">如何管理题库</a></li>
    <li><a href="#">如何统计数据</a></li>
    <li><a href="#">后台用户设置(权限)</a></li>
    <li><a href="#">系统设置</a></li>
    </ul>
    
    
    </div>
    
    

</body>
</html>