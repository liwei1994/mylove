package com.weili.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.weili.model.JyksQuestion;
import com.weili.service.AdminService;
import com.weili.service.PersonService;
import com.weili.util.Constant;

@Controller
public class QuestionController {
	


	int pageNum;
	int pageSize = Constant.DEFAULT_PAGE_SIZE;
	int startSize;  
	String pageNo;   
	int countSize;   //总记录数
	@Autowired
	private PersonService personService;
	@Autowired
	private AdminService adminService;

	public AdminService getAdminService() {
		return adminService;
	}

	public void setAdminService(AdminService adminService) {
		this.adminService = adminService;
	}

	public PersonService getPersonService() {
		return personService;
	}

	public void setPersonService(PersonService personService) {
		this.personService = personService;
	}
	
	//管理员查看所有用户信息 分页显示
	@RequestMapping(value="/sublistQuestion")
	public String sublistTeacher(HttpServletRequest request,HttpServletResponse response){
		//查询用户总条数
		countSize = adminService.countQNoSize(); //总记录数
		pageNo = request.getParameter("pageNumber"); 
		//页面默认显示第一页
		if(pageNo == null || pageNo.isEmpty() || pageNo.equals("")){
			pageNum = Constant.DEFAULT_PAGE_NUM;  //默认第一页
			//pageSize = Constant.DEFAULT_PAGE_SIZE;
			startSize = (pageNum - 1) * pageSize;
			
		}else if(pageNo.equals("firstPage")){   //  点击首页的时候
			pageNum = Constant.DEFAULT_PAGE_NUM;
			//pageSize = Constant.DEFAULT_PAGE_SIZE;
			startSize = (pageNum - 1) * pageSize;
			
		}else if(pageNo.equals("endPage")){    //点击尾页
			//pageSize = Constant.DEFAULT_PAGE_SIZE;
			int pagenum =  countSize / pageSize;
			startSize = countSize % pageSize == 0 ? (pagenum-1) *pageSize  : pagenum *  pageSize;
			
			if((countSize % pageSize) == 0){
				pageNum = pagenum;
			}else{
				pageNum = ++pagenum;
			}
		}else if(pageNo.equals("previousPage")){ //点击上一页
			String currentValue = request.getParameter("currentValue");     
			pageNum = Integer.parseInt(currentValue);            
			if(pageNum <= 1){
				pageNum = Constant.DEFAULT_PAGE_NUM;
				//pageSize = Constant.DEFAULT_PAGE_SIZE;
				startSize = (pageNum - 1) * pageSize;
			}else {
				startSize = (pageNum - 1) * pageSize;
			}
		}else if(pageNo.equals("nextPage")){ //点击下一页
			String currentValue = request.getParameter("currentValue");     
			pageNum = Integer.parseInt(currentValue);  
			int allPageNum;
			//判断总页数star
			int pagenum =  countSize / pageSize;
			startSize = countSize % pageSize == 0 ? (pagenum-1) *pageSize  : pagenum *  pageSize;
			
			if((countSize % pageSize) == 0){
				allPageNum = pagenum;
			}else{
				allPageNum = ++pagenum;
			}
			//判断总页数end
			if(pageNum > allPageNum){    //下一页不能大于总页数
				pageNum = allPageNum;
			}else {
				startSize = (pageNum-1) * pageSize;
			}
		}else if(pageNo.equals("deleteNum")){ //  删除一条数据
			String idCard = request.getParameter("idNum");     
			//int idCard = Integer.parseInt(idNum);            
			boolean bool = adminService.deleteOneQuestion(idCard);
			countSize = adminService.countQNoSize(); //删除过后重查总记录数
		}
		
		
		
		List<JyksQuestion> findQuestion = adminService.findAllQuestion(startSize,pageSize);
		if(findQuestion != null && findQuestion.size() > 0){
			request.getSession().setAttribute("countSize", countSize);
			request.getSession().setAttribute("pageNum", pageNum);
			request.getSession().setAttribute("findQuestion",findQuestion);
			return "admin/sublistQuestion";
		}else{
			return "user/fail";
		}
	}
	
	//管理员查看所有题库信息
	@RequestMapping(value="/sublistAllQuestion")
	public String findAllQ(HttpServletRequest request,HttpServletResponse response){
		String param = request.getParameter("param");  //获取参数值
		String questionId = request.getParameter("idNum");  //获取操作的id
		if(param != null && param.equals("delete")){   //删除
			List<JyksQuestion> findQuestion = adminService.findAllQuestion();
			request.getSession().setAttribute("findQuestion",findQuestion);
			return "admin/deleteQuestion";
		}else if(param != null && param.equals("deleteOk")){ //点击删除
			boolean bool = adminService.deleteOneQuestion(questionId);
			if(bool){
				List<JyksQuestion> findQuestion = adminService.findAllQuestion();
				request.getSession().setAttribute("findQuestion",findQuestion);
				return "admin/deleteQuestion";
			}else{
				return "admin/fail";
			}			
		}else if(param != null && param.equals("update")){ //修改
			List<JyksQuestion> findQuestion = adminService.findAllQuestion();
			request.getSession().setAttribute("findQuestion",findQuestion);
			return "admin/updateQu";
		}else if(param != null && param.equals("updateOk")){ //点击修改新的页面
			JyksQuestion jQuestion = adminService.updateOneQuestion(questionId);
			request.getSession().setAttribute("jQuestion", jQuestion);
			return "admin/updateQuestion";
		}else if(param != null && param.equals("insert")){ //跳转到插入页面
			return "admin/insertQuestion";
		}else if(param != null && param.equals("insertOk")){ //插入页面点击确定
			//获取参数
			String title = request.getParameter("title");
			String selectA = request.getParameter("selectA");
			String selectB = request.getParameter("selectB");
			String selectC = request.getParameter("selectC");
			String selectD = request.getParameter("selectD");
			String questionType = request.getParameter("questionType");
			String answer = request.getParameter("answer");
			String jiexi = request.getParameter("jiexi");
			//保存参数到对象中
			JyksQuestion jquestion = new JyksQuestion();
			jquestion.setTitle(title);
			jquestion.setAnswer1(selectA);
			jquestion.setAnswer2(selectB);
			jquestion.setAnswer3(selectC);
			jquestion.setAnswer4(selectD);
			jquestion.setAnswer5(jiexi);
			jquestion.setAnswer(answer);
			jquestion.setType(questionType);
			//插入到库
			boolean bool = adminService.insertQuestion(jquestion);
			if(bool){
				request.getSession().setAttribute("tips", "插入成功！！！");
				return "admin/insertQuestion";
			}else{
				request.getSession().setAttribute("tips", "插入失败，请重新录入！");
				return "admin/fail";
			}
			
			
		}else if(param != null && param.equals("view")){ //查看
			JyksQuestion jQuestion = adminService.updateOneQuestion(questionId);
			request.getSession().setAttribute("jQuestion", jQuestion);
			return "admin/viewQuestion";
		}
		List<JyksQuestion> findQuestion = adminService.findAllQuestion();
		request.getSession().setAttribute("findQuestion",findQuestion);
		return "admin/sublistQuestion";
	}
	
}
