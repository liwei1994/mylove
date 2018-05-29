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
<title>用户信息</title>
</head>
<%-- <%
	// 获取请求的上下文
	String context = request.getContextPath();
%>
 --%>

<body style="background:#fff3e1;">	
	<div class="tableTopSearch">
			<form action="/sublist/SublistServlet"   id="stuForm"  method="post">
				证件号码
				<input type="text" name="zjhm"  style="width:120px">
				&nbsp;&nbsp;
				真实姓名
				<input type="text" name="xm" style="width:120px">
				&nbsp;&nbsp;
				手机号码
				<input type="text" name="xm"  style="width:120px" >
				&nbsp;&nbsp;
				中心校区
				<input type="text" name="xm" style="width:120px" >
				&nbsp;&nbsp;<br>
				学校名称
				<input type="text" name="xm" style="width:120px" >
				&nbsp;&nbsp;
				考试分数
				<input type="text" name="xm"  style="width:120px" >
				&nbsp;&nbsp;
				申请时间
				<input type="text" name="xm"  style="width:120px" >
				&nbsp;&nbsp;
				
				<input type="submit"  value="点&nbsp;&nbsp;击&nbsp;&nbsp;查&nbsp;&nbsp;询">
			</form>
			<hr>
	</div>
	<div class="tableCenterSearch">
		<table border="solid 5px red">
			<thead>
			      <tr>
			        <th width="150px">证件号码</th>
			        <th width="150px">真实姓名</th>
			        <th width="150px">手机号码</th>
			        <th width="150px">中心校区</th>
			        <th width="150px">学校名称</th>
			        <th width="150px">考试分数</th>
			        <th width="150px">申请时间</th> 
			        <th width="150px">操作信息</th>
			      </tr>
	       </thead>
		   <tbody>
		   <%
		   List<PersonModel> person = ( List<PersonModel>)request.getSession().getAttribute("findTech");
		   for(PersonModel tech:person){
		   %> 
		   <tr>
		   	<td><%=tech.getIdCard() %></td>
		   	<td><%=tech.getRealName() %></td>
		   	<td><%=tech.getMobile() %></td>
		   	<td><%=tech.getCenter() %></td>
		   	<td><%=tech.getSchool() %></td>
		   	<td><%=tech.getScore() %></td>
		   	<td><%=tech.getCreateTime() %></td>
		   	<td>
			   	<a href="/exam/sublistTech?pageNumber=deleteNum&idNum=<%=tech.getIdCard() %>">删除</a>&nbsp;&nbsp;
			   	<a href="/exam/sublistTech?pageNumber=updateNum&idNum=<%=tech.getIdCard() %>">修改</a>
			</td>
		   </tr>
		   <% 
		   }
		   %>
		   
		  
		   </tbody>
		  
		   <div align="right">
	      	            <a href="/exam/sublistTech?pageNumber=firstPage">首页</a>
						<a href="/exam/sublistTech?pageNumber=previousPage&currentValue=${pageNum-1 }">上一页</a>
						<a href="/exam/sublistTech?pageNumber=nextPage&currentValue=${pageNum+1 }">下一页</a>
						<a href="/exam/sublistTech?pageNumber=endPage">尾页</a>
						总共${countSize }条记录,当前是第${pageNum }页
	       </div>
		  
		  
		</table>
	
	</div>
	
</body>
</html>