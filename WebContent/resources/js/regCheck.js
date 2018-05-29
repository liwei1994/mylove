	function openTip(title,content) { 
		   var _msg = "<font color=red><b>"+title+"：</b></font><br/>"+content+"！"; 
		   MessageBox(_msg); 
		} 
				
		function checkForm(){
			debugger;
			var username = document.forms["regIndex"].username;
			var applycardnumber = document.forms["regIndex"].idCard;
			var passwordsignup = document.forms["regIndex"].passwordsignup.value;
			var passwordsignup_confirm = document.forms["regIndex"].passwordsignup_confirm.value;
			
			var regSpace = /^\S+$/;     //不能为空
			var regPwd = /^[\w\W]{6,}$/;  //字符串长度大于六位
			var regCardNumber = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证正则表达式
	
			if(!regSpace.test(username.value)){
				openTip("用户名","不能有空格");
				return false;	
			}
			if(!regCardNumber.test(applycardnumber.value)){
				openTip("身份证","格式不对");
				return false;	
			}
			
			if(!regPwd.test(passwordsignup)){
				openTip("密码","密码长度要大于六位");
				return false;	
			} 
		    if(passwordsignup != passwordsignup_confirm){
				openTip("您好~~","两次密码不一致，请重新输入");
				return false;	
			} 
		}
	