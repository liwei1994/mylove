<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.weili.model.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%-- <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%> --%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>修改题目信息</title>
<script src="resources/jyks/jquery-1.11.3.min.js"></script>
<script type="text/javascript">
	function checkUpdateForm(){
		debugger;
		var title = document.forms["updateForm"].title;
		var selectA = document.forms["updateForm"].selectA;
		var selectB = document.forms["updateForm"].selectB;
		var selectC = document.forms["updateForm"].selectC;
		var selectD = document.forms["updateForm"].selectD;
		//var questionType = document.forms["updateForm"].questionType;
		var answer = document.forms["updateForm"].answer;
		var jiexi = document.forms["updateForm"].answer5;
		var regSpace = /^\S+$/;  //不能为空
		var abcd = /^[A-D]+$/ ;  //ABCD
		/* var num = /^[1-2]*$/     //只能输入1 2  */
		if(!regSpace.test(title.value)){
			alert("标题不能为空");
			return false;	
		}if(!regSpace.test(selectA.value)){
			alert("选项A不能为空");
			return false;	
		}if(!regSpace.test(selectB.value)){
			alert("选项B不能为空");
			return false;	
		}if(!regSpace.test(selectC.value)){
			alert("选项C不能为空");
			return false;	
		}if(!regSpace.test(selectD.value)){
			alert("选项D不能为空");
			return false;	
		}if(!regSpace.test(answer.value)){
			alert("选项的正确答案不能为空");
			return false;	
		}if(!abcd.test(answer.value)){
			alert("选项的正确答案格式不正确，只能输入'ABCD'!!!");
			return false;
		}
		$.ajax({
			type:"POST",
			url:"/exam/updateQuestion",
			data:$("#updateForm").serialize(),
			success:function(res){
				alert(res);
			}
			
		})
	}

</script>
</head>


<body style="background:#fff3e1;">	
	<div class="tableTopSearch">
			<form action="#" id="updateForm"  method="post" name="updateForm">
			<input type="hidden" name="questionId" value="${jQuestion.id }"  style="width:100%"></br>
			标题:
				<input type="text" name="title" value="${jQuestion.title }"  style="width:100%"></br>
			A:
				<input type="text" name="selectA" value="${jQuestion.answer1 }"  style="width:100%"></br>
			B:
				<input type="text" name="selectB" value="${jQuestion.answer2 }"  style="width:100%"></br>
			C:
				<input type="text" name="selectC" value="${jQuestion.answer3 }"  style="width:100%"></br>
			D:
				<input type="text" name="selectD" value="${jQuestion.answer4 }"  style="width:100%"></br>
			题目类型:
			<c:if test="${ jQuestion.type eq 1}">
				单选：<input type="radio" name="tmlx" value="1"  checked="true" style="width:120px">
				多选：<input type="radio" name="tmlx" value="2"  style="width:120px"></br>
			</c:if>
			<c:if test="${ jQuestion.type eq 2}">
				单选：<input type="radio" name="tmlx" value="1"  style="width:120px">
				多选：<input type="radio" name="tmlx" value="2"  checked="true" style="width:120px"></br>
			</c:if>
			题目答案:
				<input type="text" name="answer" value="${jQuestion.answer }"  style="width:100%"></br>
			解析:
				<input type="text" name="answer5" value="${jQuestion.answer5 }"  style="width:100%"></br>
			    <input type="button" id="okUpdate" onclick="checkUpdateForm()" value="确认修改" width="100%">
			    <a href="/exam/sublistAllQuestion?param=update">返回</a>
			</form>
			<hr>
	</div>
	<%-- <div class="tableCenterSearch">
		<table border="solid 5px red">
			
			<tr>
			  <td>标题:</td><td>${jQuestion.title }</td>
			 </tr>
			<tr>
			  <td>A:</td><td>${jQuestion.answer1 }</td>
			</tr>
			<tr>
			  <td>B:</td><td>${jQuestion.answer2 }</td>
			</tr>
			<tr>
			  <td>C:</td><td>${jQuestion.answer3 }</td>
			</tr>
			<tr>
			  <td>D:</td><td>${jQuestion.answer4 }</td>
			</tr>
			<tr>
			  <td>题目类型:</td>
			  <td><c:if test="${ jQuestion.type eq 1}">单选</c:if><c:if test="${ jQuestion.type eq 2}">多选</c:if></td>
			</tr>
			<tr>
			  <td>题目答案:</td><td>${jQuestion.answer }</td>
			</tr>
			<tr>
			  <td>解析:</td><td>${jQuestion.answer5 }</td>
			</tr>
		<a href="location"/> 返回</a>
		</table>
	
	</div> --%>
	
</body>
</html>