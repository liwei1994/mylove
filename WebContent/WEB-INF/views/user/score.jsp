<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title></title>
	<meta name="description" content="">
	<meta name="keywords" content="">
	<link href="" rel="stylesheet">
</head>
<body>
	<!-- 已经考试 -->
	<c:if test="${findUser.is_test == 1}">
		<h1>您的考试成绩</h1>
			<c:if test="${score >= 60}">
	          <p>恭喜您，您的考试成绩合格,是 <c:out value="${score}"/>分！！！<p>
	        </c:if>
			<c:if test="${score < 60}">
	          <p>很遗憾，您的考试成绩不合格,是 <c:out value="${score}"/>分！！！<p>
	        </c:if>
	
	</c:if>
	<!-- 未考试 -->
	<c:if test="${findUser.is_test == 0}">
		<p>您还没有参加考试，请随时关注信息等候通知</p>
	</c:if>

	
	
</body>
</html>