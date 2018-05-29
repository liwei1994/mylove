package com.weili.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.weili.model.PersonModel;
import com.weili.service.PersonService;

@Controller
public class HomeController {

	@Autowired
	private PersonService personService;
	
	public void setPersonService(PersonService personService) {
		this.personService = personService;
	}

	/*@RequestMapping(value = "/log_reg")
	public String home() {
		return "log_reg";
	}*/
	//管理员页面信息start
	@RequestMapping(value = "/top")
	public String top() {
		return "admin/top";
	}
	@RequestMapping(value = "/footer")
	public String footer() {
		return "admin/footer";
	}
	@RequestMapping(value = "/index")
	public String index() {
		return "admin/index";
	}
	@RequestMapping(value = "/left")
	public String left() {
		return "admin/left";
	}
	//管理员页面信息end
	
	
	//用户信息start
	@RequestMapping(value = "/insertInfo")
	public String insertInfo() {
		return "user/insert";
	}
	@RequestMapping(value = "/updateInfo")
	public String updateInfo() {
		return "user/update";
	}
	@RequestMapping(value = "/chart")
	public String chart() {
		return "user/chart";
	}
	@RequestMapping(value = "/toTest")
	public String toTest() {
		return "user/toTest";
	}
	@RequestMapping(value = "/haveTest")
	public String haveTest() {
		return "user/haveTest";
	}
	@RequestMapping(value = "/practice")
	public String practice() {
		return "user/practice";
	}
	@RequestMapping(value = "/wrongTest")
	public String wrongTest() {
		return "user/wrongTest";
	}
	@RequestMapping(value = "/updatePassword")
	public String updatePassword() {
		return "user/updatePassword";
	}
	//用户信息end
	
	@RequestMapping(value = "/welcome", method = RequestMethod.GET)
	public String welcome() {
		return "welcome";
	}
}
