<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
   <% String path=this.getServletContext().getContextPath();%>
   <meta http-equiv="refresh" content="" />  
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>完善信息</title>
	<meta name="description" content="">
	<meta name="keywords" content="">
	<link href="" rel="stylesheet">
	<!-- <script type="text/javascript" src="/resources/js/selectData.js"></script> -->
	
	<script>
	window.onload=function() { 
	  document.getElementById("file").onchange = function() {
	    var imgFile = this.files[0];
	    var fr = new FileReader();
	    fr.onload = function() {
	        document.getElementById("image").getElementsByTagName("img")[0].src = fr.result;
	    };
	    fr.readAsDataURL(imgFile);
	};
	}
</script>
	
</head>
<body>
           
         
            <header>
            </header>
              
                            <form  action="userInsert"  enctype="multipart/form-data" method="post"  > 
                                <h1> 完善个人信息 </h1> 
                                <p> 
                                    <label for="usernamesignup" class="uname" data-icon="u">证件号码</label>
                                    <input id="usernamesignup" name="idCard" required="required" type="text" value="${IUser.idCard }"  disabled />
                                    <label for="usernamesignup" class="uname" data-icon="u">真实姓名</label>
                                    <input id="usernamesignup" name="realName" required="required" value="${IUser.realName }" disabled type="text"/>
                                </p>
                                <p> 
                                    <label for="usernamesignup" class="uname" data-icon="u">用户名</label>
                                    <input id="usernamesignup" name="userName" required="required" value="${IUser.userName }"  type="text"/>
                                    <label for="emailsignup" class="youmail" data-icon="e" >手机号码</label>
                                    <input id="emailsignup" name="mobile" required="required" value="${IUser.mobile }"type="text" placeholder="例如:131********"/> 
                                </p>
                                <p> 
                                    <label for="passwordsignup" class="youpasswd  countydistrict" data-icon="p">所属县区 </label>
                                    <input id="passwordsignup" name="center" required="required" value="${IUser.center }" placeholder="谯城区"/>
                                    <label for="passwordsignup_confirm" class="youpasswd examineecenterschool" data-icon="p">学校全称 </label>
                                    <input id="passwordsignup_confirm" name="school" required="required" value="${IUser.school }" placeholder="亳州一中南校"/>
                                </p>
                                  
                                 <label for="passwordsignup_confirm" class="youpasswd examineecenterschool" data-icon="p">上传头像 </label>
                                 <input name="touxiang" type="file"  accept="image/jpg,image/png,image/JPG" id="file"/>
                                
                                <div id="image"> 
								        <img src="getUserLogo" width="100px" height="100px" />
                                </div>
                                <p > 
									<input type="submit" value="确认完善信息"/> 
								</p>
                              </form>
                     
       
</body>

</html>