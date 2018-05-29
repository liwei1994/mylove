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
	<script>
            $(document).ready(function() {
                var flag = "${tips}";
                if(flag!=""){
                	alert(flag);
                }
            });
    </script>
	
	
	<script type="text/javascript">
		function checkForm(){
			var title = document.forms["questionForm"].title;
			var selectA = document.forms["questionForm"].selectA;
			var selectB = document.forms["questionForm"].selectB;
			var selectC = document.forms["questionForm"].selectC;
			var selectD = document.forms["questionForm"].selectD;
			var questionType = document.forms["questionForm"].questionType;
			var answer = document.forms["questionForm"].answer;
			var jiexi = document.forms["questionForm"].jiexi;
			
			var regSpace = /^\S+$/;  //不能为空
			var abcd = /^[A-D]+$/ ;  //ABCD
			var num = /^[1-2]*$/     //只能输入1 2 
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
			}if(!regSpace.test(questionType.value)){
				alert("选项类型不能为空");
				return false;	
			}if(!num.test(questionType.value)){
				alert("选项类型格式不正确，1单选，2多选");
				return false;	
			}if(!regSpace.test(answer.value)){
				alert("选项的正确答案不能为空");
				return false;	
			}if(!abcd.test(answer.value)){
				alert("选项的正确答案格式不正确，只能输入'ABCD'!!!");
				return false;	
			}if(!regSpace.test(questionType.value)){
				alert("选项类型不能为空");
				return false;	
			}
		}
	
	</script>



</head>


<body style="background:#fff3e1;">	
	    <div class="row">
               <div class="col-md-6" style="width:100%">
                     <!--    Context Classes  -->
                    <div class="card">
                       
                        <div class="card-action">
                                                                           新增题目信息
                        </div>
                        
                        <div class="card-content">
                            <div class="table-responsive">
                             <form name="questionForm" action="/exam/sublistAllQuestion?param=insertOk" method="post"  onsubmit="return checkForm()">
                                <table class="table">
                                    <tbody>
                                        <tr class="success">
                                            <td>1</td>
                                            <td>标题</td>
                                            <td><input type="text" name="title" placeholder="请输入题目的标题"/></td>
                                        </tr>
                                        <tr class="info">
                                            <td>2</td>
                                            <td>A</td>
                                            <td><input type="text" name="selectA" placeholder="请输入题目的A选项"/></td>
                                        </tr>
                                        <tr class="warning">
                                            <td>3</td>
                                            <td>B</td>
                                            <td><input type="text" name="selectB" placeholder="请输入题目的B选项"/></td>
                                        </tr>
                                        <tr class="danger">
                                            <td>4</td>
                                            <td>C</td>
                                            <td><input type="text" name="selectC" placeholder="请输入题目的C选项"/></td>
                                        </tr>
                                        <tr class="success">
                                            <td>5</td>
                                            <td>D</td>
                                            <td><input type="text" name="selectD" placeholder="请输入题目的D选项"/></td>
                                        </tr>
                                        <tr class="info">
                                            <td>6</td>
                                            <td>题目类型</td>
                                            <td><input type="text" name="questionType" placeholder="请输入题目的类型   1单选   2多选"/></td>
                                        </tr>
                                        <tr class="warning">
                                            <td>7</td>
                                            <td>题目答案</td>
                                            <td><input type="text" name="answer" placeholder="请输入题目答案 A B C D "/></td>
                                        </tr>
                                        <tr class="danger">
                                            <td>8</td>
                                            <td>解析</td>
                                            <td><input type="text" name="jiexi" placeholder="请输入正确答案的解析(不必填)"/></td>
                                        </tr>
                                        <tr class="danger">
                                          <td></td>
                                          <td><a href="/exam/sublistAllQuestion">返回</a></td>
                                          <td><input type="submit" value="提交"/></td>
                                           
                                        </tr>
                                    </tbody>
                                </table>
                               </form>
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