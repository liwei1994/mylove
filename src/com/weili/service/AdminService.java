package com.weili.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.weili.model.JyksQuestion;
import com.weili.model.mapper.AdminMapper;

@Component
public class AdminService {

	@Autowired
	private AdminMapper adminMapper;

	public void setAdminMapper(AdminMapper adminMapper) {
		this.adminMapper = adminMapper;
	}
	//计算用户总条数
	public Integer countPageNoSize(){
		return adminMapper.countPageSize();
	}
	//删除一条用户数据
	public boolean deletePerson(String idcard){
		Integer count = adminMapper.deleteOnePerson(idcard);
		return count == null || count == 0 ?false:true;
	}
	//查询所有题目信息展示参数
	public List<JyksQuestion> findAllQuestion(int startSize,int pageSize){
		List<JyksQuestion>  findQuestion = adminMapper.findAllQuestion(startSize,pageSize);
		return findQuestion;
	} 
	//查询所有题目信息展示不带参数
		public List<JyksQuestion> findAllQuestion(){
			List<JyksQuestion>  findQuestion = adminMapper.findAllQuestion1();
			return findQuestion;
		} 
	//计算题目总条数
	public Integer countQNoSize(){
		return adminMapper.countQNoSize();
		}
	//删除一条题目数据
	public boolean deleteOneQuestion(String id){
		Integer count = adminMapper.deleteOneQuestion(id);
		return count == null || count == 0 ?false:true;
	}
	//根据题目id查找 
	public JyksQuestion updateOneQuestion(String id){
		JyksQuestion jyksQue = adminMapper.updateOneQuestion(id);
		return jyksQue;
	}
	//插入一条题目信息
	public boolean insertQuestion(JyksQuestion question){
		Integer count = adminMapper.insertQuestion(question);
		return count == null || count == 0 ?false:true;
	}
	//修改id题目信息
	public boolean updateQuestion(JyksQuestion question){
		Integer count  = adminMapper.updateQuestion(question);
		return count == null || count == 0 ?false:true;
	}
	
	
	
	
}
