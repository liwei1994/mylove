package com.weili.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weili.model.JyksAnswer;
import com.weili.model.JyksQuestion;
import com.weili.model.mapper.JyksMapper;
@Service
public class JyksService {
	@Autowired
	private JyksMapper jyksMapper;

	public void setJyksMapper(JyksMapper jyksMapper) {
		this.jyksMapper = jyksMapper;
	}
	
	//查询单选题目40题
	public List<JyksQuestion> selectSingleQuestion(){
		List<JyksQuestion> list = jyksMapper.selectSingleQuestion(); //查询所有单选题目
		List<JyksQuestion> returnList = new ArrayList<JyksQuestion>();   //把单选的抽取出来放进去
		//随机选择题目
		Random random = new Random();
		Set<Integer> set = new HashSet<Integer>();
		int j=0;
		if (list != null && list.size() > 0) {
			for (;;) {
				j=random.nextInt(40);
				if(!set.contains(j)){  //未包含  未抽取
					returnList.add(list.get(j));
					set.add(j);
				}
				if (returnList.size() == 40) {
					break;
				}
			}
		}
		
		
		return returnList;
	}
	
	//查询多选题目
	public List<JyksQuestion> selectDoubleQuestion(){
		List<JyksQuestion> list = jyksMapper.selectDoubleQuestion(); //查询所多选题目
		List<JyksQuestion> returnList = new ArrayList<JyksQuestion>();  //把多选的抽取出来放进去
		
		//随机选择题目
		Random random = new Random();
		Set<Integer> set = new HashSet<Integer>();
		int j=0;
		if (list != null && list.size() > 0) {
			for (;;) {
				j=random.nextInt(10);
				if(!set.contains(j)){  //未包含  未抽取
					returnList.add(list.get(j));
					set.add(j);
				}
				if (returnList.size() == 10) {
					break;
				}
			}	
		}
		
		return returnList;
	}
	
	//根据题目id查找答案
	public String checkAnswer(String questionId){
		String qid = jyksMapper.checkAnswer(questionId);
		return qid;
	}
	//插入ANSWER表中信息  答案正确
	public boolean insertAnswer(JyksAnswer jUser){
		Integer count = jyksMapper.insertAnswer(jUser);
		return count == null || count == 0 ? false : true;
	}
	//插入ANSWER表中信息  答案错误
	public boolean insertFailAnswer(JyksAnswer jUser){
		Integer count = jyksMapper.insertFailAnswer(jUser);
		return count == null || count == 0 ? false : true;
	}
	//计算分数countGrade
	public String countGrade(String userid){
		String countGrade = jyksMapper.countGrade(userid);
		return countGrade;
	}
	//标识用户已经考试过了
	public void userHaveTest(String userid,String countA){
		jyksMapper.userHaveTest(userid,countA);
	}
}
