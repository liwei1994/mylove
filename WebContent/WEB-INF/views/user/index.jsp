toTest.htmltoTest.html<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="" />  
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>统一用户</title>
	<meta name="description" content="">
	<meta name="keywords" content="">
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>

<!-- Bootstrap Core CSS -->
<link href="resources/user/css/bootstrap.css" rel='stylesheet' type='text/css' />

<!-- Custom CSS -->
<link href="resources/user/css/style.css" rel='stylesheet' type='text/css' />

<!-- font-awesome icons CSS -->
<link href="resources/user/css/font-awesome.css" rel="stylesheet"> 
<!-- //font-awesome icons CSS -->

 <!-- side nav css file -->
 <link href='resources/user/css/SidebarNav.min.css' media='all' rel='stylesheet' type='text/css'/>
 <!-- side nav css file -->
 
 <!-- js-->
<script src="resources/user/js/jquery-1.11.1.min.js"></script>
<script src="resources/user/js/modernizr.custom.js"></script>

<!--webfonts-->
<link href="http://fonts.googleapis.com/css?family=PT+Sans:400,400i,700,700i&amp;subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet">
<!--//webfonts--> 

<!-- Metis Menu -->
<script src="resources/user/js/metisMenu.min.js"></script>
<script src="resources/user/js/custom.js"></script>
<link href="resources/user/css/custom.css" rel="stylesheet">
<!--//Metis Menu -->

</head> 
<body class="cbp-spmenu-push">
	<div class="main-content">
	<div class="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left" id="cbp-spmenu-s1">
		<!--left-fixed -navigation-->
		<aside class="sidebar-left">
      <nav class="navbar navbar-inverse">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".collapse" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            </button>
            <h1><a class="navbar-brand" href="index.html"><span class="fa fa-area-chart"></span> Welcome<span class="dashboard_text">教育考试系统</span></a></h1>
          </div>
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="sidebar-menu">
              <li class="header">事项清单</li>
              <li class="treeview">
                <a href="index.html">
                <i class="fa fa-dashboard"></i> <span>教育考试 系统</span>
                </a>
              </li>
			  <li class="treeview">
                <a href="#">
                <i class="fa fa-laptop"></i>
                <span>个人信息</span>
                <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                  <li class="zzmiao-tabsLi">
					<a href="/exam/usercheckInsertInfo?param=viewInfo" target="rightFrame"><i class="fa fa-angle-right"></i><i class="zzmiaoI">查看个人信息</i></a>
				  </li>
                  <li class="zzmiao-tabsLi">
					<a href="/exam/usercheckInsertInfo?param=insert" target="rightFrame"><i class="fa fa-angle-right"></i><i class="zzmiaoI">完善个人信息</i></a>
				  </li>
				  <li class="zzmiao-tabsLi">
					<a href="/exam/usercheckInsertInfo?param=update" target="rightFrame"><i class="fa fa-angle-right"></i><i class="zzmiaoI"> 修改个人信息</i></a>
				  </li>
				  <li class="zzmiao-tabsLi">
					<a href="/exam/userScore?idcard=${user.idCard }" target="rightFrame"><i class="fa fa-angle-right"></i><i class="zzmiaoI"> 查看成绩</i></a>
				  </li>
				  <li class="zzmiao-tabsLi">
					<a href="/exam/userUpdatePassword" target="rightFrame"><i class="fa fa-angle-right"></i><i class="zzmiaoI"> 修改密码</i></a>
				  </li>
                </ul>
              </li>
              <li class="treeview zzmiao-tabsLi">
                <a href="javascript:void(0)">
                <i class="fa fa-pie-chart zzmiaoI"></i>
                <span>图表数据</span>
                <span class="label label-primary pull-right">new</span>
                </a>
              </li>
              <li class="treeview">
                <a href="#">
                <i class="fa fa-laptop"></i>
                <span>考试信息</span>
                <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
	                  <li class="zzmiao-tabsLi"><a href="/exam/usercheckInsertInfo?param=toTest"><i class="fa fa-angle-right"></i><i class="zzmiaoI">开始考试</i></a></li>
	                  <li class="zzmiao-tabsLi"><a href="/exam/userAreadyTest?idcard=${user.idCard }" target="rightFrame"><i class="fa fa-angle-right"></i><i class="zzmiaoI">考试记录</i></a></li>
	                  <li class="zzmiao-tabsLi"><a href="javascript:void(0)" target="rightFrame"><i class="fa fa-angle-right" ></i><i class="zzmiaoI">测试练习</i></a></li>
	                  <li class="zzmiao-tabsLi"><a href="/exam/userWrongTest?idcard=${user.idCard }" target="rightFrame"><i class="fa fa-angle-right" ></i><i class="zzmiaoI">错误题库</i></a></li>
                </ul>
              </li>
			  <li>
                <a href="#">
                <i class="fa fa-th"></i> <span>查看分数</span>
                <!-- <small class="label pull-right label-info">08</small> -->
                </a>
              </li>
           
            </ul>
          </div>
          <!-- /.navbar-collapse -->
      </nav>
    </aside>
	</div>
		<!--left-fixed -navigation-->
		
		<!-- header-starts -->
		<div class="sticky-header header-section ">
			<div class="header-left">
				
				<!--toggle button start-->
				<button id="showLeftPush"><i class="fa fa-bars"></i></button>
				<!--toggle button end-->
				<div class="profile_details_left"><!--notifications of menu start -->
					<ul class="nofitications-dropdown">
						<li class="dropdown head-dpdn">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-envelope"></i><span class="badge">4</span></a>
							<ul class="dropdown-menu">
								<li>
									<div class="notification_header">
										<h3>You have 3 new messages</h3>
									</div>
								</li>
								<li><a href="#">
								   <div class="user_img"><img src="resources/user/images/1.jpg" alt=""></div>
								   <div class="notification_desc">
									<p>Lorem ipsum dolor amet</p>
									<p><span>1 hour ago</span></p>
									</div>
								   <div class="clearfix"></div>	
								</a></li>
								<li class="odd"><a href="#">
									<div class="user_img"><img src="resources/user/images/4.jpg" alt=""></div>
								   <div class="notification_desc">
									<p>Lorem ipsum dolor amet </p>
									<p><span>1 hour ago</span></p>
									</div>
								  <div class="clearfix"></div>	
								</a></li>
								<li><a href="#">
								   <div class="user_img"><img src="resources/user/images/3.jpg" alt=""></div>
								   <div class="notification_desc">
									<p>Lorem ipsum dolor amet </p>
									<p><span>1 hour ago</span></p>
									</div>
								   <div class="clearfix"></div>	
								</a></li>
								<li>
									<div class="notification_bottom">
										<a href="#">See all messages</a>
									</div> 
								</li>
							</ul>
						</li>
						<li class="dropdown head-dpdn">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-bell"></i><span class="badge blue">4</span></a>
							<ul class="dropdown-menu">
								<li>
									<div class="notification_header">
										<h3>You have 3 new notification</h3>
									</div>
								</li>
								<li><a href="#">
									<div class="user_img"><img src="resources/user/images/4.jpg" alt=""></div>
								   <div class="notification_desc">
									<p>Lorem ipsum dolor amet</p>
									<p><span>1 hour ago</span></p>
									</div>
								  <div class="clearfix"></div>	
								 </a></li>
								 <li class="odd"><a href="#">
									<div class="user_img"><img src="resources/user/images/1.jpg" alt=""></div>
								   <div class="notification_desc">
									<p>Lorem ipsum dolor amet </p>
									<p><span>1 hour ago</span></p>
									</div>
								   <div class="clearfix"></div>	
								 </a></li>
								 <li><a href="#">
									<div class="user_img"><img src="resources/user/images/3.jpg" alt=""></div>
								   <div class="notification_desc">
									<p>Lorem ipsum dolor amet </p>
									<p><span>1 hour ago</span></p>
									</div>
								   <div class="clearfix"></div>	
								 </a></li>
								 <li>
									<div class="notification_bottom">
										<a href="#">See all notifications</a>
									</div> 
								</li>
							</ul>
						</li>	
						<li class="dropdown head-dpdn">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-tasks"></i><span class="badge blue1">8</span></a>
							<ul class="dropdown-menu">
								<li>
									<div class="notification_header">
										<h3>You have 8 pending task</h3>
									</div>
								</li>
								<li><a href="#">
									<div class="task-info">
										<span class="task-desc">Database update</span><span class="percentage">40%</span>
										<div class="clearfix"></div>	
									</div>
									<div class="progress progress-striped active">
										<div class="bar yellow" style="width:40%;"></div>
									</div>
								</a></li>
								<li><a href="#">
									<div class="task-info">
										<span class="task-desc">Dashboard done</span><span class="percentage">90%</span>
									   <div class="clearfix"></div>	
									</div>
									<div class="progress progress-striped active">
										 <div class="bar green" style="width:90%;"></div>
									</div>
								</a></li>
								<li><a href="#">
									<div class="task-info">
										<span class="task-desc">Mobile App</span><span class="percentage">33%</span>
										<div class="clearfix"></div>	
									</div>
								   <div class="progress progress-striped active">
										 <div class="bar red" style="width: 33%;"></div>
									</div>
								</a></li>
								<li><a href="#">
									<div class="task-info">
										<span class="task-desc">Issues fixed</span><span class="percentage">80%</span>
									   <div class="clearfix"></div>	
									</div>
									<div class="progress progress-striped active">
										 <div class="bar  blue" style="width: 80%;"></div>
									</div>
								</a></li>
								<li>
									<div class="notification_bottom">
										<a href="#">See all pending tasks</a>
									</div> 
								</li>
							</ul>
						</li>	
					</ul>
					<div class="clearfix"> </div>
				</div>
				<!--notification menu end -->
				<div class="clearfix"> </div>
			</div>
			<div class="header-right">
				
				
				<!--search-box-->
				<div class="search-box">
					<form class="input">
						<input class="sb-search-input input__field--madoka" placeholder="Search..." type="search" id="input-31" />
						<label class="input__label" for="input-31">
							<svg class="graphic" width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">
								<path d="m0,0l404,0l0,77l-404,0l0,-77z"/>
							</svg>
						</label>
					</form>
				</div><!--//end-search-box-->
				
				<div class="profile_details">		
					<ul>
						<li class="dropdown profile_details_drop">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
								<div class="profile_img" id="profile_img">
									<c:if test="${! empty user.pic }" var="rs">
								       <span class="prfil-img"><img src="<c:url value='getUserLogo'/>" width="50px" height="50px"/> </span> 
								    </c:if>	
								    <c:if test="${ empty user.pic }" var="rs">
								       <span class="prfil-img"><img src="resources/user/images/2.jpg" alt=""> </span> 
								    </c:if>	
									<!-- <span class="prfil-img"><img src="resources/user/images/2.jpg" alt=""> </span>  -->
									<div class="user-name">
										<p>${user.realName }</p>
										<span>您好~</span>
									</div>
									<i class="fa fa-angle-down lnr"></i>
									<i class="fa fa-angle-up lnr"></i>
									<div class="clearfix"></div>	
								</div>	
							</a>
							<ul class="dropdown-menu drp-mnu">
								<li> <a href="#"><i class="fa fa-cog"></i> 基本设置</a> </li> 
								<li> <a href="#"><i class="fa fa-user"></i> 账号信息</a> </li>
								<li  class="zzmiao-tabsLi"> <a href="javascript:void(0)"><i class="fa fa-suitcase zzmiaoI"></i>修改密码</a> </li> 
								<li> <a href="/exam"><i class="fa fa-sign-out"></i> 安全退出</a> </li>
							</ul>
						</li>
					</ul>
				</div>
				<div class="clearfix"> </div>				
			</div>
			<div class="clearfix"> </div>	
		</div>
		<!-- //header-ends -->
		<!-- main content start-->
		
		
			<div id="page-wrapper">
			<div class="main-page zzmiaoMain">
				<h2 class="title1">欢迎您来到教育考试系统</h2>
				<div class="blank-page widget-shadow scroll" id="style-2 div1">
					<p>
					1.系统从题库中随机出题，每个人的题目都不一样。正确答案只有一个。(The system is randomly assigned from the question bank, and everyone's topic is different. There is only one correct answer.)
					</p>
					<p>
					2.一旦进入考试，系统开始计时。时间结束，强制交卷，未作答的题目以错误来定。(Once in the exam, the system starts to clock. The end of time, mandatory hand in hand, the unwritten topic is determined by mistake.)
					</p>
					<p>
					3.考试期间不能浏览其他页面，不能切屏，否则也会强制交卷。(Can't browse other page during the test, it will not cut screen, otherwise their papers will be mandatory)
					</p>
					<p>
					4.凡有考试作弊行为的，后果自负。(Anyone who has cheated in the exam will have the consequences.)
					</p>
				</div>
			</div>
			<iframe name="rightFrame"   id="leftFrame" width="100%" height="100%" title="leftFrame" /></iframe>
			</div>
		</div>
		
		<!--footer-->
		<div class="footer">
		   <p>Copyright &copy; 仅供学习交流使用，Email:851751972@qq.com</p>
	   </div>
        <!--//footer-->
	</div>
	
	<!-- side nav js -->
	<script src='resources/user/js/SidebarNav.min.js' type='text/javascript'></script>
	<script>
      $('.sidebar-menu').SidebarNav()
      
      /* setInterval(function() {
    	  $.ajax({  
              type : "get",  
              async : false,  //同步请求  
              url : url,  
              data : data,  
              timeout:1000,  
              success:function(dates){  
                  //alert(dates);  
                  $("#mainContent").html(dates);//要刷新的div  
              },  
              error: function() {  
                 // alert("失败，请稍后再试！");  
              }  
          });  
        		
        	},200) */
    </script>
	<!-- //side nav js -->
	
	<!-- Classie --><!-- for toggle left push menu script -->
		<script src="resources/user/js/classie.js"></script>
		<script>
			var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
				showLeftPush = document.getElementById( 'showLeftPush' ),
				body = document.body;
				
			showLeftPush.onclick = function() {
				classie.toggle( this, 'active' );
				classie.toggle( body, 'cbp-spmenu-push-toright' );
				classie.toggle( menuLeft, 'cbp-spmenu-open' );
				disableOther( 'showLeftPush' );
			};
			
			function disableOther( button ) {
				if( button !== 'showLeftPush' ) {
					classie.toggle( showLeftPush, 'disabled' );
				}
			}
		</script>
	<!-- //Classie --><!-- //for toggle left push menu script -->
	
	<!--scrolling js-->
	<script src="resources/user/js/jquery.nicescroll.js"></script>
	<script src="resources/user/js/scripts.js"></script>
	<!--//scrolling js-->
	<!--zzmiao-->
	<script type="text/javascript" src="resources/user/js/zzmiaoTabs.js"></script>
	<!-- Bootstrap Core JavaScript -->
   <script src="resources/user/js/bootstrap.js"> </script>
   
</body>

</html>