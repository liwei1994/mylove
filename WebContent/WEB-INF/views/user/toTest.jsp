<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %> 
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

	<meta charset="utf-8" />
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
	<meta content="yes" name="apple-mobile-web-app-capable">
	<meta content="black" name="apple-mobile-web-app-status-bar-style">
	<meta content="telephone=no" name="format-detection">
	<title>在线测试</title>
	<% String path=this.getServletContext().getContextPath();%>
	<script type="text/javascript" src="<%=path%>/resources/common/jquery-1.11.0.js"></script>
	<script type="text/javascript" src="<%=path%>/resources/common/form.js"></script>
	
	<!--自定义-->
	<link href="resources/jyks/css/style.css" rel='stylesheet' type='text/css' />
	<link rel="stylesheet" href="<%=path%>/resources/css/jyks/index.css" />
	<link rel="stylesheet" href="<%=path%>/resources/css/jyks/style.css" />
	
</head>

<body>
		 <!-----start-main---->
	 <div class="main">
		<div class="login-form">
			<h1>请确认您的信息</h1>
					<div class="head">
					<c:if test="${! empty IUser.pic }" var="rs">
					  <span class="prfil-img"><img src="<c:url value='getUserLogo'/>" width="150px" height="150px"/> </span> 
					</c:if>	
					<c:if test="${ empty IUser.pic }" var="rs">
					  <img src="resources/jyks/images/user.png" alt=""/>
					</c:if>	
						
					</div>
					<form>
					        <input type="hidden"  value="${IUser.idCard }" id="idCardNumber" disabled>
							<input type="hidden" value="${IUser.realName }" id="realNameNumber" disabled>
							<input type="text" class="text" value="身份证:${IUser.idCard }"  disabled>
							<input type="text" value="姓名:${IUser.realName }"  disabled>
							<div class="school">
								<select class="countrySide" name="countrySide" id="countrySide">
									<option value="">请选择所在县区</option>
								</select>
							</div>
							<div class="school">
								<select name="countrySideSchool" class="countrySideSchool" id="countrySideSchool">
									<option value="">请选择所属学校</option>
								</select>
							</div>
							<div class="submit">
								<input type="button" id="okBtn" class="okBtn" value="确认无误" >
						    </div>	
						<p><a href="javascript:history.go(-1);">返回</a></p>
					</form>
			</div>
		</div>
		
	</body>
		<script type="text/javascript">
		$(function() {
			/*所在县区-中心校-select*/
			var temp;
			debugger;
			$.getJSON("resources/js/selectData.json", function(data) {
				temp = data;
				addPlace();
			});
			//赋值县区
			var addPlace = function() {
				$.each(temp, function(i, place) {
					$(".countrySide").append('<option value="' + i + '">' + place.place + '</option>');
				});
				addSchool();
			};
			//赋值学校
			var addSchool = function() {
				if ($(".countrySideSchool option").length != 0) {
					$(".countrySideSchool option").remove();
				}
				var n = $(".countrySide option:selected").val();
				if (n == "") {
					$(".countrySideSchool").append('<option value="">请选择中心学校</option>');
				} else {
					$.each(temp[n].school, function(i, school) {
						$(".countrySideSchool").append('<option value="' + i + '">' + school + '</option>');
					});
				}
			};
			$(".countrySide").change(function() {
				addSchool();
			}); 
			
			/*点击提交*/
			$("#okBtn").click(function() {
				debugger;
				var idCard = $("#idCardNumber").val();
				var realName = $("#realNameNumber").val();
				var city = $("#countrySide").find("option:selected").text();
				var school = $("#countrySideSchool").find("option:selected").text();
			
				if(city=="请选择所在县区" || school=="请选择所属学校"){
					alert("请把资料填写完整");
					return false;
				}else{
					debugger;
					 $.ajax({
						type:"post",
					    url:"insertJyksUser.do",
						async:false,
						data:{
 							"realName":realName,
 							"idCard":idCard,
 							"city":city,
 							"school":school
						},
 						success:function(msg){
							window.location.href="/exam/insertJyksUser.do"
						}
					})

					/*  $.post("insertJyksUser.do",{realName:realName,idCard:idCard,city:city,school:school},
							
							function(result){
					if(true){
						window.location.href="/TechnologyTest/insertJyksUser.do"
					}
						
				    });  */
				}
				
				
			});
		});
	</script>
</html>