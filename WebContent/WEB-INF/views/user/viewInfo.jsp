<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
   <% String path=this.getServletContext().getContextPath();%>
   <meta http-equiv="refresh" content="" />  
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>个人信息</title>
	<meta name="description" content="">
	<meta name="keywords" content="">
	<link href="" rel="stylesheet">
	<script type="text/javascript" src="/resources/js/selectData.js"></script>
	
</head>
<body>
           
         
            <header>
            </header>
              
                            <form > 
                                <h1> 查看个人信息 </h1> 
                                <p> 
                                    <label for="usernamesignup" class="uname" data-icon="u">证件号码</label>
                                    <input id="usernamesignup" name="idCard" required="required" type="text" value="${IUser.idCard }"  disabled />
                                    <label for="usernamesignup" class="uname" data-icon="u">真实姓名</label>
                                    <input id="usernamesignup" name="realName" required="required" value="${IUser.realName }" disabled type="text"/>
                                </p>
                                <p> 
                                    <label for="usernamesignup" class="uname" data-icon="u">用户名</label>
                                    <input id="usernamesignup" name="userName" required="required" value="${IUser.userName }"  type="text" disabled/>
                                    <label for="emailsignup" class="youmail" data-icon="e" >手机号码</label>
                                    <input id="emailsignup" name="mobile" required="required" value="${IUser.mobile }"type="text"  disabled/> 
                                </p>
                                <p> 
                                    <label for="passwordsignup" class="youpasswd  countydistrict" data-icon="p">所属县区 </label>
                                    <input id="passwordsignup" name="center" required="required" value="${IUser.center }"  disabled/>
                                    <label for="passwordsignup_confirm" class="youpasswd examineecenterschool" data-icon="p">学校全称 </label>
                                    <input id="passwordsignup_confirm" name="school" required="required" value="${IUser.school }" disabled/>
                                </p>
                                <p> 
                                	头像：
                                   <img src="getUserLogo" width="100px" height="100px"/>
                                </p>
                             </form>
                     
       
</body>
</html>