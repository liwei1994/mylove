package com.weili.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.weili.model.AnswerAndQuestion;
import com.weili.model.PersonModel;
import com.weili.model.mapper.PersonMapper;

@Component
public class PersonService {

	@Autowired
	private PersonMapper personMapper;

	public void setPersonMapper(PersonMapper personMapper) {
		this.personMapper = personMapper;
	}
	
	
	public boolean addPerson(PersonModel model) {
		int count = personMapper.insert(model);
		return count > 0 ? true : false;
	}
	
	/*public boolean deltePerson(String wid) {
		int count = personMapper.deleteByWid(wid);
		return count > 0 ? true : false;
	}*/
	//查询所有用户信息 
	public List<PersonModel> findAllTeacher(int startSize,int pageSize){
		List<PersonModel> person = personMapper.findAllTeacher(startSize,pageSize);
		return person;
	}
	
	//根据idcard 查找人
	public PersonModel selectUserInfo(String idCard){
		PersonModel person = personMapper.findByIdcard(idCard);
		return person;
	}
	//根据idcard查看考试的题目记录
	public List<AnswerAndQuestion> userAreadyTest(String idcard){
		List<AnswerAndQuestion> aquestion = personMapper.userAreadyTest(idcard);
		return aquestion;
	}
	//根据idcard查看考试的错误题库记录
	public List<AnswerAndQuestion> userWrongTest(String idcard){
		List<AnswerAndQuestion> aquestion = personMapper.userWrongTest(idcard);
		return aquestion;
		}
	//根据身份证查成绩
	public String selectScore(String idcard){
		String score = personMapper.selectScore(idcard);
		return score;
	}
	//用户修改密码
	public boolean updatePassword(PersonModel person){
		Integer count = personMapper.updatePassword(person);
		return count == null || count == 0 ? false : true;
	}
	//用户修改个人信息
	public boolean updateInfo(PersonModel person){
		Integer count = personMapper.updateInfo(person);
		return count == null || count == 0 ? false : true;
	}
	
	public void InsertJyksUser(PersonModel person){
		personMapper.InsertJyksUser(person);
		//return count == null || count == 0 ? false : true;
	}
	//用户完善个人信息
	public boolean userInsert(PersonModel person){
		Integer count   = personMapper.userInsert(person);
		return count == null || count == 0 ? false : true;
	}
	
	
	//用户登录验证
	public PersonModel checkPesron(PersonModel userModel){
		PersonModel findUser = personMapper.checkPesron(userModel);
		return findUser;
	}
	//用户注册检查idCard是否重复
	public boolean regCheckIdCard(String idCard){
		Integer count = personMapper.regCheckIdCard(idCard);
		return count == null || count == 0 ? false : true;
	}
	//注册用户
	public boolean InsertUser(PersonModel person){
		Integer count  = personMapper.InsertUser(person);
		return count == null || count == 0 ? false : true;
	}
}
