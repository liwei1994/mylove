package com.weili.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.weili.model.AnswerAndQuestion;
import com.weili.model.PersonModel;
import com.weili.service.PersonService;
import com.weili.util.InputStreamToByte;
import com.weili.util.MD5Util;
import com.weili.util.UUIDTool;
import com.weili.util.getCurrentTime;


@Controller
public class PersonController {
	
	@Autowired
	private PersonService personService;

	public PersonService getPersonService() {
		return personService;
	}

	public void setPersonService(PersonService personService) {
		this.personService = personService;
	}
	//用户修改密码跳转
	@RequestMapping(value="log_reg")
	public ModelAndView log_reg(HttpServletResponse response,HttpServletRequest request){
		ModelAndView mv = new ModelAndView();
		mv.setViewName("log_reg");
		return mv;
	}
	//用户修改密码跳转
	@RequestMapping(value="/userUpdatePassword")
	public ModelAndView userUpdatePassword(HttpServletResponse response,HttpServletRequest request){
		ModelAndView mv = new ModelAndView();
		mv.setViewName("user/updatePassword");
		return mv;
	}

	
	//点击完善信息或者修改信息-跳转页面
	@RequestMapping(value="/usercheckInsertInfo")
	public ModelAndView usercheckInsertInfo(HttpServletResponse response,HttpServletRequest request,String param1){
		ModelAndView mv = new ModelAndView();
		//取值
		String param = request.getParameter("param");
		if (param == null || param == "") {
			param = param1;
		}
	    PersonModel person = (PersonModel) request.getSession().getAttribute("user");
	    String idCard = person.getIdCard();
	    //存值
	    PersonModel puser = new PersonModel();
	    puser.setIdCard(idCard);
	    //调用查询方法
	    PersonModel findUser = personService.selectUserInfo(idCard);
	    if(findUser != null && param.equals("insert")){       //插入方法
	    	//把查询出来的结果 保存到session中
	    	request.getSession().setAttribute("IUser", findUser);
	    	mv.setViewName("/user/insert");
	    }else if(findUser != null && param.equals("viewInfo")){  //修改方法
	    	//把查询出来的结果 保存到session中
	    	request.getSession().setAttribute("IUser", findUser);
	    	 mv.setViewName("/user/viewInfo");
	    }else if(findUser != null && param.equals("update")){  //修改方法
	    	//把查询出来的结果 保存到session中
	    	request.getSession().setAttribute("IUser", findUser);
	    	 mv.setViewName("/user/update");
	    }else if(findUser != null && param.equals("toTest")){
	    	//把查询出来的结果 保存到session中
	    	request.getSession().setAttribute("IUser", findUser);
	    	mv.setViewName("/user/toTest");
	    }
	    
	    else if(findUser != null && param.equals("updatePassword")){   //修改密码
	    	//把查询出来的结果 保存到session中
	    	request.getSession().setAttribute("IUser", findUser);
	    	//获取输入的原密码
			String password = request.getParameter("password");
			//输入的原密码加密和数据库加密的密码比较
			if(MD5Util.MD5(password).equals(findUser.getPassword())){
				//获取输入的新密码
				String idCard1 = findUser.getIdCard();   //获取idcard
				String newpassword = request.getParameter("newpassword");
				String newpassword1 = request.getParameter("newpassword1");
				PersonModel nperson = new PersonModel();
				nperson.setIdCard(idCard1);
				nperson.setPassword(MD5Util.MD5(newpassword));
				nperson.setPassword1(newpassword1);
				boolean bool = personService.updatePassword(nperson);
				if(bool){
					mv.setViewName("user/updatePasswordSuccess");
				}else{
					mv.setViewName("user/fail");
				}
			}else{
				 mv.setViewName("/user/updatePasswordFail");
			}
			
			
	    	
	    }else{
	    	 mv.setViewName("/user/fail");
	    }
	    
	    
		return mv;
	}
	//用户查看已经考试的题库信息
	@RequestMapping(value="userAreadyTest")
	public ModelAndView userAreadyTest(HttpServletRequest request,HttpServletResponse response){
		ModelAndView mv = new ModelAndView();
		String idcard = request.getParameter("idcard");
		PersonModel findUser = personService.selectUserInfo(idcard);
		if(findUser != null && findUser.getIs_test() == 1){
			List<AnswerAndQuestion>  aqInfo = personService.userAreadyTest(idcard);
			request.getSession().setAttribute("aqInfo", aqInfo);
			mv.setViewName("user/haveTest");
		}else{
			mv.setViewName("user/hasnotTest");
		}
		return mv;
	}
	//用户查看已经考试的错误信息
		@RequestMapping(value="userWrongTest")
		public ModelAndView userWrongTest(HttpServletRequest request,HttpServletResponse response){
			ModelAndView mv = new ModelAndView();
			String idcard = request.getParameter("idcard");
			PersonModel findUser = personService.selectUserInfo(idcard);
			if(findUser != null && findUser.getIs_test() == 1){
				List<AnswerAndQuestion>  aqInfo = personService.userWrongTest(idcard);
				request.getSession().setAttribute("aqInfo", aqInfo);
				mv.setViewName("user/haveTest");
			}else{
				mv.setViewName("user/hasnotTest");
			}
			return mv;
		}
	//用户查看分数
	@RequestMapping(value="/userScore")
	public ModelAndView userScore(HttpServletResponse response,HttpServletRequest request,String param){
		ModelAndView mv = new ModelAndView();
		String idCard = request.getParameter("idcard");
		PersonModel findUser = personService.selectUserInfo(idCard);
		request.getSession().setAttribute("findUser", findUser);
		String score = personService.selectScore(idCard);
		request.getSession().setAttribute("score", score);
		mv.setViewName("user/score");
		return mv;
	}
	
	//用户修改信息
	@RequestMapping(value="/userUpdateInfo")
	public ModelAndView updateInfo(HttpServletResponse response,HttpServletRequest request){
		ModelAndView mv = new ModelAndView();
		//获取值
		PersonModel user = (PersonModel) request.getSession().getAttribute("user");
		String idCard = user.getIdCard();
		String mobile = request.getParameter("mobile");
		String userName = request.getParameter("userName");
		String center = request.getParameter("center");
		String school = request.getParameter("school");
		//保存值
		PersonModel person = new PersonModel();
		person.setIdCard(idCard);
		person.setMobile(mobile);
		person.setUserName(userName);
		person.setCenter(center);
		person.setSchool(school);
		//调用方法
		boolean bool = personService.updateInfo(person);
		if(bool){
			//更新session
			PersonModel user1 = (PersonModel) request.getSession().getAttribute("user");
			user1.setUserName(userName);
			user1.setMobile(mobile);
			user1.setCenter(center);
			user1.setSchool(school);
			request.getSession().setAttribute("user", user1);
			mv.setViewName("user/updateSuccess");
		}else{
			mv.setViewName("user/fail");
		}
		return mv;
	}
	
	//用户登录验证
	@RequestMapping(value="/checkLogin")
	public ModelAndView checkLogin(HttpServletRequest request,HttpServletResponse response){
		response.setCharacterEncoding("utf-8");
		ModelAndView mv = new ModelAndView();
		String idCard = request.getParameter("idCard");
		String password = request.getParameter("password");
		PersonModel userModel = new PersonModel();
		userModel.setIdCard(idCard);
		userModel.setPassword(MD5Util.MD5(password));
		PersonModel findUser = personService.checkPesron(userModel);
		if(findUser != null && findUser.getIs_delete().equals("1")){
			if(findUser.getIs_admin().equals("1")){
				request.getSession().setAttribute("user", findUser);
				mv.setViewName("user/index");
			}
			else if(findUser.getIs_admin().equals("0")){
				request.getSession().setAttribute("user", findUser);
				mv.setViewName("admin/welcomeAdmin");
			}
		}else{
			mv.setViewName("/fail");
		}
		return mv;
	}
	
	
	//用户注册验证idcard 是否重复
	@RequestMapping(value = "/idCardCheck")
	public ModelAndView idCardCheck(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setCharacterEncoding("utf-8");
		String idcard = request.getParameter("idcard");
		ModelAndView mv  = new ModelAndView();
		PersonModel uModel = new PersonModel();
		uModel.setIdCard(idcard);
		boolean bool = personService.regCheckIdCard(idcard);
		Gson gson = new Gson();
		String reJson = gson.toJson(bool);
		response.getWriter().append(reJson);
		return mv;
	}
	//用户完善信息
	@RequestMapping(value="/userInsert")
	public ModelAndView userInsert(HttpServletRequest request,HttpServletResponse response, @RequestParam(value = "touxiang")  MultipartFile file) throws ServletException, IOException{
		ModelAndView mv = new ModelAndView();
		PersonModel person = (PersonModel) request.getSession().getAttribute("user");
		String idCard = person.getIdCard();
		 PersonModel pModel = new PersonModel(); 
		// 判断request请求中是否有文件上传
        if(!file.isEmpty()){
        	// 获得输入流
            InputStream in = file.getInputStream();
            byte[] data = new byte[] {};
            try {
				data = InputStreamToByte.inputStreamToByte(in);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}finally{
				 in.close();
			}// 将文件保存到字节数组中
            pModel.setPic(data); // 将字节数组保存到对象中

           
        }
		
		String userName = request.getParameter("userName");
		String mobile = request.getParameter("mobile");
		String center = request.getParameter("center");
		String school = request.getParameter("school");
		//String picUrl = request.getParameter("touxiang");
		
		pModel.setIdCard(idCard);
		pModel.setUserName(userName);
		pModel.setMobile(mobile);
		pModel.setCenter(center);
		pModel.setSchool(school);
		boolean bool = personService.userInsert(pModel);
		if(bool){
			//更新session
			PersonModel user2 = (PersonModel) request.getSession().getAttribute("user");
			user2.setUserName(userName);
			user2.setCenter(center);
			user2.setSchool(school);
			user2.setMobile(mobile);
			request.getSession().setAttribute("user", user2);
			mv.setViewName("user/userInfoAll");
		}else{
			mv.setViewName("user/fail");
		}
		return mv;
	}
	/**
	 * 获取用户logo
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/getUserLogo")
	public void getUserLogo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		PersonModel person = (PersonModel) request.getSession().getAttribute("user");
		String idCard = person.getIdCard();
		PersonModel sUser = personService.selectUserInfo(idCard);
	     if (sUser != null) {
	         if (sUser.getPic() != null) {
	             byte[] data = new byte[] {};
	             data = (byte[]) sUser.getPic(); //获取当前用户对象中的logo数据，转为字节数组
	             response.setContentType("image/jpg");
	             OutputStream outputStream = response.getOutputStream(); //response的输出流
	             for (int i = 0; i < data.length; i++) {
	                 outputStream.write(data[i]); //resp出字节流
	             }
	             outputStream.close(); //关闭输出流
	         }
	     }
	}
	
	//用户注册
	@RequestMapping(value="/userReg")
	public  ModelAndView userReg(HttpServletRequest request,HttpServletResponse response){
		ModelAndView mv = new ModelAndView();
		response.setCharacterEncoding("utf-8");
		String username = request.getParameter("username");
		String idCard = request.getParameter("idCard");
		String passwordsignup = request.getParameter("passwordsignup");
		String passwordsignup_confirm = request.getParameter("passwordsignup_confirm");
		PersonModel uModel = new PersonModel();
		uModel.setId(UUIDTool.getUUID());  //id序列
		uModel.setCreateTime(getCurrentTime.getCurTime());  //当前注册时间
		uModel.setIs_admin("1");  //设置普通用户
		uModel.setIs_delete("1");  //设置未删除状态（注册就有效）
		uModel.setUserName(username);
		uModel.setIdCard(idCard);
		uModel.setPassword(MD5Util.MD5(passwordsignup));
		uModel.setPassword1(passwordsignup);
		//检查idCard是否重复
		boolean bool = personService.regCheckIdCard(idCard);
		if(bool){
			mv.setViewName("idCardCkeck");
		}else{
			personService.InsertUser(uModel);
			mv.setViewName("log_reg");
		}
		return mv;
	}
	
}
