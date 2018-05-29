<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>教育考试系统</title>

    <link rel="stylesheet" type="text/css" href="resources/css/demo.css" />
    <link rel="stylesheet" type="text/css" href="resources/css/style.css" />
    <link rel="stylesheet" type="text/css" href="resources/css/animate-custom.css" />
    <script type="text/javascript" src="resources/js/alert.js"></script>
    <script type="text/javascript" src="resources/js/ajax.js"></script>
    <script type="text/javascript" src="resources/js/regCheck.js"></script>
    <!-- <script type="text/javascript" src="resources/js/plugins/jquery-1.8.2.js"></script> -->
   
</head>
<body>
<div class="container">
           
         
            <header>
                <h1>欢迎来到教育考试系统</span></h1>
            </header>
            <section>				
                <div id="container_demo" >
                    <a class="hiddenanchor" id="toregister"></a>
                    <a class="hiddenanchor" id="tologin"></a>
                    <div id="wrapper">
                        <div id="login" class="animate form">
                            <form  action="checkLogin" autocomplete="on" method="post"> 
                                <h1>登录</h1> 
                                <p> 
                                    <label for="username" class="uname" data-icon="u" > 用户名/证件号 </label>
                                    <input id="username" name="idCard" required="required" type="text" placeholder="用户名/证件号"/>
                                </p>
                                <p> 
                                    <label for="password" class="youpasswd" data-icon="p"> 密码 </label>
                                    <input id="password" name="password" required="required" type="password" placeholder="例如:ADqw_123" /> 
                                </p>
                                <p class="keeplogin"> 
									<input type="checkbox" name="loginkeeping" id="loginkeeping" value="loginkeeping" /> 
									<label for="loginkeeping">记住密码</label>
								</p>
                                <p class="login button"> 
                                    <input  type="submit"  value="登录" />
								</p>
                                <p class="change_link">
									没有账号 ?
									<a href="#toregister" class="to_register">注册</a>
								</p>
                            </form>
                        </div>

                        <div id="register" class="animate form">
                            <form  action="userReg" autocomplete="on" name="regIndex" method="post" onsubmit="return checkForm();" > 
                                <h1> 注册 </h1> 
                                <p> 
                                    <label for="usernamesignup" class="uname" data-icon="u">用户姓名</label>
                                    <input id="usernamesignup" name="username" required="required" type="text" placeholder="例如:张三" />
                                </p>
                                <p> 
                                    <label for="emailsignup" class="youmail" data-icon="e" > 证件号</label>
                                    <input id="emailsignup" name="idCard" required="required" type="text" placeholder="例如:341281********1234"/> 
                                </p>
                                <p> 
                                    <label for="passwordsignup" class="youpasswd" data-icon="p">密码 </label>
                                    <input id="passwordsignup" name="passwordsignup" required="required" type="password" placeholder="例如:AAaa_123"/>
                                </p>
                                <p> 
                                    <label for="passwordsignup_confirm" class="youpasswd" data-icon="p">确认密码 </label>
                                    <input id="passwordsignup_confirm" name="passwordsignup_confirm" required="required" type="password" placeholder="例如:AAaa_123"/>
                                </p>
                                <p class="signin button"> 
									<input type="submit" value="注册"/> 
								</p>
                                <p class="change_link">  
									已有账号 ?
									<a href="#tologin" class="to_register"> 去登录 </a>
								</p>
                            </form>
                        </div>
						
                    </div>
                </div>  
            </section>
        </div>
</body>
</html>