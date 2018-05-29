package com.weili.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.weili.model.JyksQuestion;
import com.weili.service.AdminService;

/**
 * 
 * @Title:UpdateController
 * @Description:
 * @author:weili23
 * @Date:2018年5月2日-下午2:48:12
 */
@Controller
public class UpdateController {
	@Autowired
	private AdminService adminService;

	public AdminService getAdminService() {
		return adminService;
	}
	public void setAdminService(AdminService adminService) {
		this.adminService = adminService;
	}
	@ResponseBody
	@RequestMapping(value="/updateQuestion")
	public String updateQuestion(HttpServletRequest request,HttpServletResponse response){
		//获取参数
		String qId = request.getParameter("questionId"); //获取题目id
		String title = request.getParameter("title");
		String selectA = request.getParameter("selectA");
		String selectB = request.getParameter("selectB");
		String selectC = request.getParameter("selectC");
		String selectD = request.getParameter("selectD");
		String questionType = request.getParameter("tmlx");
		String answer = request.getParameter("answer");
		String jiexi = request.getParameter("answer5");
		//保存参数到对象中
		JyksQuestion jquestion = new JyksQuestion();
		jquestion.setId(qId);
		jquestion.setTitle(title);
		jquestion.setAnswer1(selectA);
		jquestion.setAnswer2(selectB);
		jquestion.setAnswer3(selectC);
		jquestion.setAnswer4(selectD);
		jquestion.setAnswer5(jiexi);
		jquestion.setAnswer(answer);
		jquestion.setType(questionType);
		//根据题目id修改 
		boolean bool = adminService.updateQuestion(jquestion);
		if(bool){
			return "修改成功！！！";
		}else{
			return "修改失败，请重新修改！";
		}
	}
	
}
