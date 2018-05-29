<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.weili.model.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="icon" href="https://static.jianshukeji.com/highcharts/images/favicon.ico">
<title>图表信息</title>
	<style>#datatable {
	    border: 1px solid #ccc;
	    border-collapse: collapse;
	    border-spacing: 0;
	    font-size: 12px;
	}
	td,th {
	    border: 1px solid #ccc;
	    padding: 4px 20px;
	}
	</style>
	<script src="https://img.hcharts.cn/jquery/jquery-1.8.3.min.js"></script>
	<script src="https://img.hcharts.cn/highcharts/highcharts.js"></script>
	<script src="https://img.hcharts.cn/highcharts/modules/exporting.js"></script>
	<script src="https://img.hcharts.cn/highcharts/modules/data.js"></script>
	<script src="https://img.hcharts.cn/highcharts-plugins/highcharts-zh_CN.js"></script>

</head>


<body>	
			<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
			<p>数据表格</p>
			<table id="datatable">
			    <thead>
			        <tr>
			            <th>县区\人数</th>
			            <th>总人数</th>
			            <th>考试人数</th>
			        </tr>
			    </thead>
			    <tbody>
				    <c:forEach items="${chartAllPerson }" var="chartAll">
					    <tr>
				            <th><c:out value="${chartAll.center }"></c:out></th>
				            <td><c:out value="${chartAll.num }"></c:out></td>
				            <td><c:out value="${chartAll.testNum }"></c:out></td>
				        </tr>
				    </c:forEach>
			    </tbody>
			</table>
			
			<script>
	$(function () {
    $('#container').highcharts({
        data: {
            table: 'datatable'
        },
        chart: {
            type: 'column'
        },
        title: {
            text: '县区人数和考试人数柱形图'
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: '人',
                rotation: 0
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    this.point.y + ' 个' + this.point.name.toLowerCase();
            }
        }
    });
});
</script>
	
</body>
</html>