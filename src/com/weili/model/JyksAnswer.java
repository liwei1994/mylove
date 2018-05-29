package com.weili.model;

/**
 * @Title:JyksAnswer
 * @Description:
 * @author:weili23
 * @Date:2018年4月11日-下午3:30:47
 */
public class JyksAnswer {

	private String id;
	private String userid;  //用户标识
	private String questionid; //题目标识
	private String answer; //答案
	private String right; 
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getQuestionid() {
		return questionid;
	}
	public void setQuestionid(String questionid) {
		this.questionid = questionid;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public String getRight() {
		return right;
	}
	public void setRight(String right) {
		this.right = right;
	}
	
	
	
	
}
