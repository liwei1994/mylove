package com.weili.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.weili.model.PersonModel;
import com.weili.service.AdminService;
import com.weili.service.PersonService;
import com.weili.util.Constant;

@Controller
public class PageController {

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
	@RequestMapping(value="/sublistTech")
	public String sublistTeacher(HttpServletRequest request,HttpServletResponse response){
		//查询用户总条数
		countSize = adminService.countPageNoSize(); //总记录数
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
			boolean bool = adminService.deletePerson(idCard);
			countSize = adminService.countPageNoSize(); //删除过后重查总记录数
		}
		
		
		List<PersonModel> findUser = personService.findAllTeacher(startSize,pageSize);
		if(findUser != null && findUser.size() > 0){
			request.getSession().setAttribute("countSize", countSize);
			request.getSession().setAttribute("pageNum", pageNum);
			request.getSession().setAttribute("findTech",findUser);
			return "admin/sublistTeacher";
		}else{
			return "user/fail";
		}
	}
	
	/*public String sublistTeacher(){
		return "admin/sublistTeacher";
	}*/
	
	
}
