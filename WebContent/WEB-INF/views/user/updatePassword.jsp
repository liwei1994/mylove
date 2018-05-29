<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>修改密码</title>
	<meta name="description" content="">
	<meta name="keywords" content="">
	<link href="" rel="stylesheet">
	<script type="text/javascript">
	function checkPassword(){
		var passwordsignup = document.forms["formPass"].newpassword.value;
		var passwordsignup_confirm = document.forms["formPass"].newpassword1.value;
		
		var regSpace = /^\S+$/;     //不能为空
		var regPwd = /^[\w\W]{6,}$/;  //字符串长度大于六位
		
		if(!regPwd.test(passwordsignup)){
			alert("密码长度要大于六位");
			return false;	
		} 
		if(passwordsignup != passwordsignup_confirm){
		    alert("您好!两次密码不一致，请重新输入");
			return false;	
		} 
	}
	</script>
</head>
<body>
	<h1>修改密码</h1>
	<form action="usercheckInsertInfo?param=updatePassword" method="post" name="formPass" onsubmit="return checkPassword()">
	<p>
		 <tr>
		 	<td>原密码：</td>
		 	<td>
		 		<input type="password" name="password" >
		 	</td>
			
		 </tr>
	 </p>
	 <p>
		 <tr>
		 	<td>新密码：</td>
		 	<td>
		 		<input type="password" name="newpassword" " >
		 	</td>
			<td>确认密码：</td>
		 	<td>
		 		<input type="password" name="newpassword1"  >
		 	</td>
		 </tr>
	 </p>
	
	<p>
		<input type="submit" value="确认修改密码">
	 </p>
	</form>
</body>
</html>