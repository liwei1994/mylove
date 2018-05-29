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
               <div class="col-md-6">
                     <!--    Context Classes  -->
                    <div class="card">
                       
                        <div class="card-action">
                                                                             题目详情
                        </div>
                        
                        <div class="card-content">
                            <div class="table-responsive">
                                <table class="table">
                                    <!-- <thead>
                                        <tr>
                                            <th>序号</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Username</th>
                                        </tr>
                                    </thead> -->
                                    <tbody>
                                        <tr class="success">
                                            <td>1</td>
                                            <td>标题</td>
                                            <td>${jQuestion.title }</td>
                                        </tr>
                                        <tr class="info">
                                            <td>2</td>
                                            <td>A</td>
                                            <td>${jQuestion.answer1 }</td>
                                        </tr>
                                        <tr class="warning">
                                            <td>3</td>
                                            <td>B</td>
                                            <td>${jQuestion.answer2 }</td>
                                        </tr>
                                        <tr class="danger">
                                            <td>4</td>
                                            <td>C</td>
                                            <td>${jQuestion.answer3 }</td>
                                        </tr>
                                        <tr class="success">
                                            <td>5</td>
                                            <td>D</td>
                                            <td>${jQuestion.answer4 }</td>
                                        </tr>
                                        <tr class="info">
                                            <td>6</td>
                                            <td>题目类型</td>
                                            <td><c:if test="${ jQuestion.type eq 1}">单选</c:if><c:if test="${ jQuestion.type eq 2}">多选</c:if></td>
                                        </tr>
                                        <tr class="warning">
                                            <td>7</td>
                                            <td>题目答案</td>
                                            <td>${jQuestion.answer }</td>
                                        </tr>
                                        <tr class="danger">
                                            <td>8</td>
                                            <td>解析</td>
                                            <td>${jQuestion.answer5 }</td>
                                        </tr>
                                        <tr class="danger">
                                          <td></td>
                                          <td></td>
                                          <td><a href="/exam/sublistAllQuestion">返回</a></td>
                                           
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <!--  end  Context Classes  -->
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