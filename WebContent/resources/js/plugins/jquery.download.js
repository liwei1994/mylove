jQuery.download = function(url, data, method) {
	var TOPWIN = top.window;
	if (url && data) {
		data = typeof data == 'string' ? data : jQuery.param(data);
		var inputs = '';
		
		var form_ = $('<form target="_self" enctype="application/x-www-form-urlencoded; charset=UTF-8" action="' + url + '" method="' + (method || 'post') + '">' + inputs + '</form>');
		
		jQuery.each(data.split('&'), function() {
			var pair = this.split('=');
			var key = pair[0];
			var val = pair[1];
			var input_ = $("<input type='hidden' name='" + key + "' value='' />");
			input_.val(encodeURI(val));			
			form_.append(input_);

		});
		form_.appendTo('body').submit().remove();	
		
		var num=0;
		delCookie("download-status");
		var alarmClose = getCookie("download-status");
		var  t1 = setInterval(function(){
			num++;
			var alarmClose = getCookie("download-status");
			if(alarmClose=="success" || num==10){
				clearInterval(t1);
		        delCookie("download-status");
				TOPWIN.$('body').mask('remove');
			}
		}, 1000  * 1 );
		
	};
	
	
	function getCookie(name) {
		var strCookie=document.cookie; 
		var arrCookie=strCookie.split("; "); 
		for(var i=0;i<arrCookie.length;i++){ 
			var arr=arrCookie[i].split("="); 
			if(arr[0]==name){
				return arr[1];
			} 
		} 
		return ""; 
	}
	
	function delCookie(name) {
		 var exp = new Date();
         exp.setTime(exp.getTime() - 1000);
         var cval = getCookie(name);
         if (cval && cval != "") {
             document.cookie = name + "=" + cval + ";expires=" +
                 exp.toGMTString()+"; path=/";
         }
	}
};