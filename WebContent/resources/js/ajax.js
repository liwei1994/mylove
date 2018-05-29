
//输入框失焦事件
$(document).ready(function(){
	
	$('#emailsignup').change(function(){
		debugger;
			var idcard = $('#emailsignup').val();
			$.ajax({
	            url:'/TechnologyTest/idCardCheck',
	            type: 'POST',async:false,
	            data: {
	                'idcard': idcard
	            },
	            success: function(res) {
	            	res = JSON.parse(res);
	            	if(res!=null){
	            		if(res=="true"){
	            			alert('证件号存在');
	            		} 
	            	}
	            },
	            error: function() {
	            }
	        });
		});


	
	
	
});

