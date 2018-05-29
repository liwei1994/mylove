<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Error</title>
	<meta name="description" content="">
	<meta name="keywords" content="">
	<meta http-equiv="refresh" content="5;url=/exam" />  
	<link href="" rel="stylesheet">
	<script type="text/javascript" src="resources/js/plugins/jquery-1.4.4.js"></script>
	<!-- <img src="resources/images/tip.jpg"> -->
	
	<script type="text/javascript">  
		$(function() {  
		    var wait = $(".second").html();  
		    timeOut();  
		    /**  
		     * 实现倒计时  
		     */  
		    function timeOut() {  
		        if(wait != 0) {  
		            setTimeout(function() {  
		                $('.second').text(--wait);  
		                timeOut();  
		            }, 1000);  
		        }  
		    }  
		});  
</script>  
</head>




 <body style="text-align:center">  
        <div >  
            <!-- BEGIN MAIN CONTENT -->  
            <section class="error-wrapper">  
                <img src="resources/images/tip.jpg">  
                <h3 style="color:red">登录账号或密码错误，请核实后重新登录</h3>  
                <p class="page-404">  
                    <span>页面自动</span>  
                    <a href="/exam">跳转</a>  
                    <span>等待时间：</span>  
                    <span class="second">5</span>  
                </p>  
            </section>  
            <!-- END MAIN CONTENT -->  
        </div>  
    </body>  
</html>