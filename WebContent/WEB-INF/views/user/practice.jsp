<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %> 
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>    
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="content-type" content="text/html;charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>在线考试</title>
<link href="resources/jyks/main.css" rel="stylesheet" type="text/css" />
<link href="resources/jyks/iconfont.css" rel="stylesheet" type="text/css" />
<link href="resources/jyks/test.css" rel="stylesheet" type="text/css" />
<script src="resources/jyks/jquery-1.11.3.min.js"></script>
<script src="resources/jyks/jquery.easy-pie-chart.js"></script>
<!--时间js-->
<script src="resources/jyks/time/jquery.countdown.js"></script>


		<style>
		.hasBeenAnswer {
			background: #5d9cec;
			color:#fff;
		}
		
		</style>
		<script type="text/javascript">
		
		 $(function() { 
			$("#test_jiaojuan").click(function(){
				debugger;
				var con ;
				var sf;
				
				json = $("form[name='singleForm']").serializeArray(); //单选
				//JSONArray myJsonArray = JSONArray.parseArray("[" + json + "]");
				if(json.length<50){
				    con = confirm("你还有未选择的题目确定要提交吗？");
				} 
				if(json.length>=50){
					con = true;
				}
				
	      if(con){
	    	  
	    	  sf = confirm("确定要交卷吗？");
	    	  if(sf){
				
		    var arr = new Array();
			var jsonArr = jsonLoop(json,arr);
			//循环json数组
			function jsonLoop(json,arr){
			    for(var m in json){
			        var jsonValue = json[m];
			        var mn = findValue(arr,jsonValue.name);
			        if(mn>=0){//大于0 说明存在相同的
			            arr[mn] = addValue(arr[mn],"value",jsonValue.value);
			        }else{
			            arr.push(JSON.stringify(jsonValue))
			        }
			    }   
			    console.info(arr)
			}

			//查找是否存相同value,在并返回下标
			function findValue(json,value){
			    for(var n in json){
			        var jsonValue = JSON.parse(json[n])
			         if(jsonValue.name == value){
			            return parseInt(n);
			        }
			    }
			    return -1;
			}

			// 存在相同value值合并
			function addValue(json,key,value){
			    var jsonValue = JSON.parse(json);
			    var j = new Array(jsonValue[key])
			        j.push(value)
			        jsonValue[key] = j.toString();
			    return JSON.stringify(jsonValue);
			}
				
				
				 //var json = JSON.stringify(json)
				 $.ajax({
					type:"POST",
					url:"/exam/submitJyksQuestion?userId=${user.idCard }",
					data:{
						'singleForm':arr.toString()
					     },
					beforeSend: function () {
						    // 禁用按钮防止重复提交
						    //waitingDialog.show("正在提交数据，请稍候",{dialogSize: 'sm'});  
						    $("#test_jiaojuan").attr({ disabled: "disabled" });
						},
					 success:function(msg){
						alert(msg);
						$("#test_jiaojuan").attr({ disabled: "disabled" });
						javascript:history.go(-2);
						//hideMask();
					  } 
					
					}) 
					
	        }
	      } 
	      
	      
				})
				
		 }); 
		 
		 
		 
		//显示遮罩层    
		    function showMask(){     
		        $("#mask").css("height",$(document).height());     
		        $("#mask").css("width",$(document).width());     
		        $("#mask").show();     
		    }  
		    //隐藏遮罩层  
		    function hideMask(){     
		          
		        $("#mask").hide();     
		    }  
		</script>
</head>

<body>
	<div class="main" id="mask">
		<!--nr start-->
		<div class="test_main">
			<div class="nr_left">
				<div class="test">
					<form action="#" method="post" name="singleForm">
						<div class="test_title">
							<p class="test_time">
								<i class="icon iconfont">&#xe6fb;</i><b class="alt-1">01:40</b>
							</p>
							<font><input id="test_jiaojuan" type="button" name="test_jiaojuan" value="交卷"></font>
						</div>
						
							<div class="test_content">
								<div class="test_content_title">
									<h2>单选题${user.idCard }</h2>
									<p>
										<span>共</span><i class="content_lit">40</i><span>题，</span><span>合计</span><i class="content_fs">80</i><span>分</span>
									</p>
								</div>
							</div>
							
							<div class="test_content_nr">
								<ul>
									<c:forEach items="${singleQ}" var="single" varStatus="status">
										<li id="qu_0_${status.count-1}">
											<div class="test_content_nr_tt">
												<i>${status.count}</i><span>(2分)</span><font>${single.title }</font><b class="icon iconfont">&#xe881;</b>
											</div> 

											<div class="test_content_nr_main">
												<ul>
													
														<li class="option">
																<%-- <input type="hidden" name="${single.id }" value="${single.answer }"> --%>
																<input type="radio" class="radioOrCheck" name="${single.id }"   
																	id="0_answer_${status.count}_option_1" value="A"
																/>
															
															
															<label for="0_answer_${status.count}_option_1">
																A.
																<p class="ue" style="display: inline;">${single.answer1 }</p>
															</label>
														</li>
													
														<li class="option">
															
																<input type="radio" class="radioOrCheck" name="${single.id }"
																	id="0_answer_${status.count}_option_2" value="B"
																/>
															
															
															<label for="0_answer_${status.count}_option_2">
																B.
																<p class="ue" style="display: inline;">${single.answer2 }</p>
															</label>
														</li>
													
														<li class="option">
															
																<input type="radio" class="radioOrCheck" name="${single.id }"
																	id="0_answer_${status.count}_option_3" value="C"
																/>
															
															
															<label for="0_answer_${status.count}_option_3">
																C.
																<p class="ue" style="display: inline;">${single.answer3 }</p>
															</label>
														</li>
													
														<li class="option">
															
																<input type="radio" class="radioOrCheck" name="${single.id }"
																	id="0_answer_${status.count}_option_4" value="D"
																/>
															
															
															<label for="0_answer_${status.count}_option_4">
																D.
																<p class="ue" style="display: inline;">${single.answer4 }</p>
															</label>
														</li>
													
												</ul>
											</div>
										</li>
									
									</c:forEach>
									
								</ul>
							</div>
						
							<div class="test_content">
								<div class="test_content_title">
									<h2>多选题</h2>
									<p>
										<span>共</span><i class="content_lit">10</i><span>题，</span><span>合计</span><i class="content_fs">20</i><span>分</span>
									</p>
								</div>
							</div>
						
							<div class="test_content_nr">
								<ul>
									<c:forEach items="${doubleQ}" var="doubleQ" varStatus="status">
										<li id="qu_1_${status.count-1}">
											<div class="test_content_nr_tt">
												<i>${status.count}</i><span>(2分)</span><font>${doubleQ.title }</font><b class="icon iconfont">&#xe881;</b>
											</div>

											<div class="test_content_nr_main">
												<ul>
													
														<li class="option">
															
															
																<input type="checkbox" class="radioOrCheck" name="${doubleQ.id }"
																	id="1_answer_${status.count}_option_1" value="A"
																/>
															
															<label for="1_answer_${status.count}_option_1">
																A.
																<p class="ue" style="display: inline;">${doubleQ.answer1 }</p>
															</label>
														</li>
													
														<li class="option">
															
															
																<input type="checkbox" class="radioOrCheck" name="${doubleQ.id }"
																	id="1_answer_${status.count}_option_2" value="B"
																/>
															
															<label for="1_answer_${status.count}_option_2">
																B.
																<p class="ue" style="display: inline;">${doubleQ.answer2 }</p>
															</label>
														</li>
													
														<li class="option">
															
															
																<input type="checkbox" class="radioOrCheck" name="${doubleQ.id }"
																	id="1_answer_${status.count}_option_3" value="C"
																/>
															
															<label for="1_answer_${status.count}_option_3">
																C.
																<p class="ue" style="display: inline;">${doubleQ.answer3 }</p>
															</label>
														</li>
													
														<li class="option">
															
															
																<input type="checkbox" class="radioOrCheck" name="${doubleQ.id }"
																	id="1_answer_${status.count}_option_4"  value="D"
																/>
															
															<label for="1_answer_${status.count}_option_4">
																D.
																<p class="ue" style="display: inline;">${doubleQ.answer4 }</p>
															</label>
														</li>
													
												</ul>
											</div>
										</li>
									
										
									 </c:forEach>		
								</ul>
							</div>
						
					</form>
				</div>

			</div>
			<div class="nr_right">
				<div class="nr_rt_main">
					<div class="rt_nr1">
						<div class="rt_nr1_title">
							<h1>
								<i class="icon iconfont">&#xe692;</i>答题卡
							</h1>
							<p class="test_time">
								<i class="icon iconfont">&#xe6fb;</i><b class="alt-1">01:40</b>
							</p>
						</div>
						
							<div class="rt_content">
								<div class="rt_content_tt">
									<h2>单选题</h2>
									<p>
										<span>共</span><i class="content_lit">40</i><span>题</span>
									</p>
								</div>
								<div class="rt_content_nr answerSheet">
									<ul>
										
											<li><a href="#qu_0_0">1</a></li>
										
											<li><a href="#qu_0_1">2</a></li>
										
											<li><a href="#qu_0_2">3</a></li>
										
											<li><a href="#qu_0_3">4</a></li>
										
											<li><a href="#qu_0_4">5</a></li>
										
											<li><a href="#qu_0_5">6</a></li>
										
											<li><a href="#qu_0_6">7</a></li>
										
											<li><a href="#qu_0_7">8</a></li>
										
											<li><a href="#qu_0_8">9</a></li>
										
											<li><a href="#qu_0_9">10</a></li>
										
											<li><a href="#qu_0_10">11</a></li>
										
											<li><a href="#qu_0_11">12</a></li>
										
											<li><a href="#qu_0_12">13</a></li>
										
											<li><a href="#qu_0_13">14</a></li>
										
											<li><a href="#qu_0_14">15</a></li>
										
											<li><a href="#qu_0_15">16</a></li>
										
											<li><a href="#qu_0_16">17</a></li>
										
											<li><a href="#qu_0_17">18</a></li>
										
											<li><a href="#qu_0_18">19</a></li>
										
											<li><a href="#qu_0_19">20</a></li>
										
											<li><a href="#qu_0_20">21</a></li>
										
											<li><a href="#qu_0_21">22</a></li>
										
											<li><a href="#qu_0_22">23</a></li>
										
											<li><a href="#qu_0_23">24</a></li>
										
											<li><a href="#qu_0_24">25</a></li>
										
											<li><a href="#qu_0_25">26</a></li>
										
											<li><a href="#qu_0_26">27</a></li>
										
											<li><a href="#qu_0_27">28</a></li>
										
											<li><a href="#qu_0_28">29</a></li>
										
											<li><a href="#qu_0_29">30</a></li>
										
											<li><a href="#qu_0_30">31</a></li>
										
											<li><a href="#qu_0_31">32</a></li>
										
											<li><a href="#qu_0_32">33</a></li>
										
											<li><a href="#qu_0_33">34</a></li>
										
											<li><a href="#qu_0_34">35</a></li>
										
											<li><a href="#qu_0_35">36</a></li>
										
											<li><a href="#qu_0_36">37</a></li>
										
											<li><a href="#qu_0_37">38</a></li>
										
											<li><a href="#qu_0_38">39</a></li>
										
											<li><a href="#qu_0_39">40</a></li>
									</ul>
								</div>
							</div>
						
							<div class="rt_content">
								<div class="rt_content_tt">
									<h2>多选题</h2>
									<p>
										<span>共</span><i class="content_lit">10</i><span>题</span>
									</p>
								</div>
								<div class="rt_content_nr answerSheet">
									<ul>
										
											<li><a href="#qu_1_0">1</a></li>
										
											<li><a href="#qu_1_1">2</a></li>
										
											<li><a href="#qu_1_2">3</a></li>
										
											<li><a href="#qu_1_3">4</a></li>
										
											<li><a href="#qu_1_4">5</a></li>
										
											<li><a href="#qu_1_5">6</a></li>
										
											<li><a href="#qu_1_6">7</a></li>
										
											<li><a href="#qu_1_7">8</a></li>
										
											<li><a href="#qu_1_8">9</a></li>
										
											<li><a href="#qu_1_9">10</a></li>
										
											
										
									</ul>
								</div>
							</div>
						
					</div>

				</div>
			</div>
		</div>
		<!--nr end-->
		<div class="foot"></div>
	</div>

	
	<script>
		window.jQuery(function($) {
			"use strict";
			
			$('time').countDown({
				with_separators : false
			});
			$('.alt-1').countDown({
				css_class : 'countdown-alt-1'
			});
			$('.alt-2').countDown({
				css_class : 'countdown-alt-2'
			});
			
		});
		
		
		$(function() {
			$('li.option label').click(function() {
			debugger;
				var examId = $(this).closest('.test_content_nr_main').closest('li').attr('id'); // 得到题目ID
				var cardLi = $('a[href=#' + examId + ']'); // 根据题目ID找到对应答题卡
				// 设置已答题
				if(!cardLi.hasClass('hasBeenAnswer')){
					cardLi.addClass('hasBeenAnswer');
				}
				
			});
		});
	</script>
<div style="text-align:center;">
</div>

</body>

</html>