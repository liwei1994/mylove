<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
    

    
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>超级管理员</title>
	<meta name="description" content="">
	<meta name="keywords" content="">
	<link href="" rel="stylesheet">
</head>
<frameset rows="88,*,31" cols="*" frameborder="no" border="0" framespacing="0">
  <frame src="<c:url value='/top'/>" name="topFrame"  noresize="noresize" id="topFrame" title="topFrame" />
  <frameset cols="187,*" frameborder="no" border="0" framespacing="0">
    <frame src="<c:url value='/left'/>" name="leftFrame"  id="leftFrame" title="leftFrame" />
    <frame src="<c:url value='/index'/>" name="rightFrame" id="rightFrame" title="rightFrame" />
  </frameset>
  <frame src="<c:url value='/footer'/>" name="bottomFrame"  noresize="noresize" id="bottomFrame" title="bottomFrame" />
</frameset>
<noframes>

<body>
	<!-- <h1>Welcome to my world!  管理员 </h1> -->
</body>
</noframes>
</html>