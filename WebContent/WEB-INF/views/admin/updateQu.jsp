<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.weili.model.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户信息</title>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link rel="stylesheet" href="resources/assets/materialize/css/materialize.min.css" media="screen,projection" />
    <!-- Bootstrap Styles-->
    <link href="resources/assets/css/bootstrap.css" rel="stylesheet" />
    <!-- FontAwesome Styles-->
    <link href="resources/assets/css/font-awesome.css" rel="stylesheet" />
    <!-- Morris Chart Styles-->
    <link href="resources/assets/js/morris/morris-0.4.3.min.css" rel="stylesheet" />
    <!-- Custom Styles-->
    <link href="resources/assets/css/custom-styles.css" rel="stylesheet" />
    <!-- Google Fonts-->
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css' />
    <link rel="stylesheet" href="resources/assets/js/Lightweight-Chart/cssCharts.css"> 
</head>


<body style="background:#fff3e1;">	
	    <div class="row">
                <div class="col-md-12">
                    <!-- Advanced Tables -->
                    <div class="card">
                        <div class="card-action">
                                                                          题目列表
                        </div>
                        <div class="card-content">
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                    <thead>
                                        <tr>
                                            <th>标题</th>
                                            <th>A</th>
                                            <th>B</th>
                                            <th>C</th>
                                            <th>D</th>
                                            <th>题目类型</th>
                                            <th>题目答案</th>
                                            <th>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    	<c:forEach items="${findQuestion }" var="allQ" varStatus="status">
	                                        <tr class="odd gradeX">
	                                              <td><c:out value="${allQ.title }"></c:out></td>
										   	  	  <td><c:out value="${allQ.answer1 }"></c:out></td>
										   	  	  <td><c:out value="${allQ.answer2 }"></c:out></td>
										   	  	  <td><c:out value="${allQ.answer3 }"></c:out></td>
										   	  	  <td><c:out value="${allQ.answer4 }"></c:out></td>
										   	  	  <td>
													<c:if test="${ allQ.type eq 1}">单选</c:if>
													<c:if test="${ allQ.type eq 2}">多选</c:if>
												  </td>
												  <td><c:out value="${allQ.answer }"></c:out></td>
												  <td>
													 <%--  <a href="/TechnologyTest/sublistAllQuestion?param=delete&idNum=${allQ.id }">删除</a>&nbsp;&nbsp;
													  <a href="/TechnologyTest/sublistAllQuestion?param=update&idNum=${allQ.id }">修改</a>
												   --%>
												     <a href="/exam/sublistAllQuestion?param=updateOk&idNum=${allQ.id }">修改</a>
												   </td>
	                                        </tr>
                                        </c:forEach>
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    </div>
                    <!--End Advanced Tables -->
                </div>
            </div>
	



  <!-- jQuery Js -->
    <script src="resources/assets/js/jquery-1.10.2.js"></script>
	
	<!-- Bootstrap Js -->
    <script src="resources/assets/js/bootstrap.min.js"></script>
	
	<script src="resources/assets/materialize/js/materialize.min.js"></script>
	
    <!-- Metis Menu Js -->
    <script src="resources/assets/js/jquery.metisMenu.js"></script>
    <!-- Morris Chart Js -->
    <script src="resources/assets/js/morris/raphael-2.1.0.min.js"></script>
    <script src="resources/assets/js/morris/morris.js"></script>
	
	
	<script src="resources/assets/js/easypiechart.js"></script>
	<script src="resources/assets/js/easypiechart-data.js"></script>
	
	 <script src="resources/assets/js/Lightweight-Chart/jquery.chart.js"></script>
	 <!-- DATA TABLE SCRIPTS -->
    <script src="resources/assets/js/dataTables/jquery.dataTables.js"></script>
    <script src="resources/assets/js/dataTables/dataTables.bootstrap.js"></script>
        <script>
            $(document).ready(function () {
                $('#dataTables-example').dataTable();
            });
    </script>
    <!-- Custom Js -->
    <script src="resources/assets/js/custom-scripts.js"></script> 
	
	
</body>
</html>