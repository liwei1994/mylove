<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="refresh" content="" />  
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>修改信息</title>
	<meta name="description" content="">
	<meta name="keywords" content="">
	<link href="" rel="stylesheet">
</head>
<body>
	<h1>修改个人信息页面</h1>
	<form action="userUpdateInfo" method="post">
	<p>
		 <tr>
		 	<td>证件号码：</td>
		 	<td>
		 		<input type="text" name="" value="${IUser.idCard }" disabled="disabled">
		 	</td>
			<td>真实姓名：</td>
		 	<td>
		 		<input type="text" id="realName" name="realName" value="${IUser.realName }" disabled="disabled">
		 	</td>
		 </tr>
	 </p>
	 <p>
		 <tr>
		 	<td>手机号码：</td>
		 	<td>
		 		<input type="text" id="mobile" name="mobile" value="${IUser.mobile }" >
		 	</td>
			<td>用户名：</td>
		 	<td>
		 		<input type="text" id="userName" name="userName" value="${IUser.userName }" >
		 	</td>
		 </tr>
	 </p>
	 <p>
		 <tr>
		 	<td>中心校区：</td>
		 	<td>
		 		<input type="text" id="center" name="center" value="${IUser.center }" >
		 	</td>
			<td>所在学校：</td>
		 	<td>
		 		<input type="text" id="school" name="school" value="${IUser.school }" >
		 	</td>
		 </tr>
	 </p>
	
	<p>
		<input type="submit" value="确认修改信息">
	 </p>
	</form>
</body>
</html>