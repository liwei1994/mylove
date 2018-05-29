<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title></title>
	<meta name="description" content="">
	<meta name="keywords" content="">
	
	<style>

	body{
		background:#cc6600;
	}
	*{ margin: 0; padding: 0; }
	img{border:0;}
	ul,li{list-style-type:none;}
	a {color:#000000;text-decoration:none;}
	a:hover {color:#bd0a01;text-decoration:underline;}
	.treebox{ width: 200px; margin: 20px auto; background-color:#cc6600; }
	.menu{ overflow: hidden; border-color: #ddd; border-style: solid ; border-width: 0 1px 1px ; }
	/*第一层*/
	.menu li.level1>a{ 
		display:block;
		height: 45px;
		line-height: 45px;
		color: #000000;
		padding-left: 50px;
		border-bottom: 1px solid #000; 
		font-size: 16px;
		position: relative;
		transition:all .5s ease 0s;
	 }
	 .menu li.level1 a:hover{ text-decoration: none;background-color:#ffff00;   }
	 .menu li.level1 a.current{ background: #cc6600; }

	/*============修饰图标*/
	 .ico{ width: 20px; height: 20px; display:block;   position: absolute; left: 20px; top: 10px; background-repeat: no-repeat; background-image: url(resources/images/ico1.png); }

	 /*============小箭头*/
	 .level1 i{ width: 20px; height: 10px; background-image:url(resources/images/arrow.png); background-repeat: no-repeat; display: block; position: absolute; right: 20px; top: 20px; }
	.level1 i.down{ background-position: 0 -10px; }

	 .ico1{ background-position: 0 0; }
	 .ico2{ background-position: 0 -20px; }
	 .ico3{ background-position: 0 -40px; }
	 .ico4{ background-position: 0 -60px; }
			 .ico5{ background-position: 0 -80px; }

	 /*第二层*/
	 .menu li ul{ overflow: hidden; }
	 .menu li ul.level2{ display: none;background: #cc6600;  }
	 .menu li ul.level2 li a{
		display: block;
		height: 45px;
		line-height: 45px;
		color: #fff;
		text-indent: 60px;
		/*border-bottom: 1px solid #ddd; */
		font-size: 14px;
		 transition:all 1s ease 0s;
	 }

</style>
</head>
	<body>
		<div style="text-align:center;clear:both"></div>
<div class="treebox">
	<ul class="menu">
		<li class="level1">
			<a href="#none"><em class="ico ico1"></em>题库管理<i class="down"></i></a>
			<ul class="level2">
				<li><a href="/exam/sublistAllQuestion" target="rightFrame">查看题库</a></li>
				<li><a href="/exam/sublistAllQuestion?param=insert" target="rightFrame">新增题库</a></li>
				<li><a href="/exam/sublistAllQuestion?param=delete" target="rightFrame">删除题目</a></li>
				<li><a href="/exam/sublistAllQuestion?param=update" target="rightFrame">修改题目</a></li>
			</ul>
		</li>
		<li class="level1">
			<a href="#none"><em class="ico ico2"></em>用户管理<i></i></a>
			<ul class="level2">
				<li><a href="/exam/sublistTech" target="rightFrame">查看用户</a></li>
				<li><a href="javascript:;" target="rightFrame">编辑用户</a></li>
				<li><a href="javascript:;" target="rightFrame">暂未开放</a></li>
				<li><a href="javascript:;" target="rightFrame">暂未开放</a></li>
			</ul>
		</li>
		<li class="level1">
			<a href="#none"><em class="ico ico3"></em>考试分析<i></i></a>
			<ul class="level2">
				<li><a href="/exam/chartFind" target="rightFrame">统计图</a></li>
				<li><a href="/exam/chartGrade" target="rightFrame">平均成绩</a></li>
				<li><a href="javascript:;" target="rightFrame">学校考试情况</a></li>
				<li><a href="javascript:;" target="rightFrame">导航选项</a></li>
			</ul>
		</li>
		<li class="level1">
			<a href="#none"><em class="ico ico4"></em>暂未开放<i></i></a>
			<ul class="level2">
				<li><a href="javascript:;">暂未开放</a></li>
				<li><a href="javascript:;">暂未开放</a></li>
				<li><a href="javascript:;">暂未开放</a></li>
				<li><a href="javascript:;">暂未开放</a></li>
			</ul>
		</li>
					<li class="level1">
			<a href="#none"><em class="ico ico5"></em>暂未开放<i></i></a>
			<ul class="level2">
				<li><a href="javascript:;">导航选项</a></li>
				<li><a href="javascript:;">导航选项</a></li>
				<li><a href="javascript:;">导航选项</a></li>
				<li><a href="javascript:;">导航选项</a></li>
			</ul>
		</li>
	</ul>
</div>

<!-- 引入 jQuery -->
<script src="resources/js/jquery1.8.3.min.js"></script>
<script src="resources/js/easing.js"></script>
<script>
//等待dom元素加载完毕.
$(function(){
	$(".treebox .level1>a").click(function(){
		$(this).addClass('current')   //给当前元素添加"current"样式
		.find('i').addClass('down')   //小箭头向下样式
		.parent().next().slideDown('slow','easeOutQuad')  //下一个元素显示
		.parent().siblings().children('a').removeClass('current')//父元素的兄弟元素的子元素去除"current"样式
		.find('i').removeClass('down').parent().next().slideUp('slow','easeOutQuad');//隐藏
		 return false; //阻止默认时间
	});
})
</script>

		
	
	</body>

</html>