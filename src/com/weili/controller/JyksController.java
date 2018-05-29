package com.weili.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.weili.model.JyksAnswer;
import com.weili.model.JyksQuestion;
import com.weili.model.PersonModel;
import com.weili.service.JyksService;
import com.weili.service.PersonService;
import com.weili.util.UUIDTool;

@Controller
public class JyksController {

	@Autowired
	private JyksService jyksService;
	
	public JyksService getJyksService() {
		return jyksService;
	}
	
	public void setJyksService(JyksService jyksService) {
		this.jyksService = jyksService;
	}

	@Autowired
	private PersonService personService;

	public PersonService getPersonService() {
		return personService;
	}

	public void setPersonService(PersonService personService) {
		this.personService = personService;
	}
	
	//点击交卷
	@ResponseBody
	@RequestMapping("/submitJyksQuestion")
	public String submitJyksQuestion(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String str = "您的考试成绩是：";
		String str1 = "您已经参加过考试了，请不要再次考试！";
		String userId = request.getParameter("userId"); //用户id
		PersonModel pUser = personService.selectUserInfo(userId);
		if(pUser.getIs_test() == 1){
			return str1;
		}
		else{
		String sleForm = request.getParameter("singleForm");  //接收json字符串
		JSONArray myJsonArray = JSONArray.parseArray("[" + sleForm + "]");
		for (int i = 0; i < myJsonArray.size(); i++) {
			JSONObject myjObject = myJsonArray.getJSONObject(i);
			String questionId = myjObject.getString("name");  //题目id   (根据题目id查找这个的正确答案)
			String value = myjObject.getString("value"); //所选择的ABCD
			value = value.replace(",","");
			String QuesionAnser = jyksService.checkAnswer(questionId); //查找题目的正确选项
			JyksAnswer jUser = new JyksAnswer();
			jUser.setId(UUIDTool.getUUID());
			jUser.setQuestionid(questionId);
			jUser.setUserid(userId);
			jUser.setAnswer(value);   //value 变成了 QuesionAnser
			if(QuesionAnser.equals(value)){
				//插入一张新的answer表
				jUser.setRight("1");
			    jyksService.insertAnswer(jUser);
			}else{
				jUser.setRight("0");
			    jyksService.insertFailAnswer(jUser);
			}
		}
		//计算分数
		String count = jyksService.countGrade(userId);
		int countA = Integer.parseInt(count)*2;
		//标识用户已经考试过,且保存分数
		jyksService.userHaveTest(userId,String.valueOf(countA));
		return str+countA;
	  }
	}
	
	@RequestMapping("/insertJyksUser.do")
	public ModelAndView InsertJyksUser(PersonModel person,HttpServletRequest req,HttpServletResponse res){
		
		ModelAndView mv = new ModelAndView();
		if(person != null){
			personService.InsertJyksUser(person); //插入学区
		}
		//查询单选的
		List<JyksQuestion> singleQ =jyksService.selectSingleQuestion();
		//查询多选的
		List<JyksQuestion> doubleQ =jyksService.selectDoubleQuestion();
		req.setAttribute("singleQ", singleQ);
		req.setAttribute("doubleQ", doubleQ);
		mv.setViewName("/user/practice");
		return mv;
	}
	
}
