package com.weili.model;
/**
 * 
 * @Title:AnswerAndQuestion
 * @Description:
 * @author:weili23
 * @Date:2018年4月11日-下午3:28:37
 */
public class AnswerAndQuestion {

	private String userid; //用户id
	private String yAnswer; //你选择的答案
	private String isright; //是否正确   1正确     0 错误
	private String title;   //题目标题
	private String qAnswer;  //题目正确答案
	private String answer1;   //A
	private String answer2;   //B
	private String answer3;   //C
	private String answer4;   //D
	private String answer5;   //答案解析
	private String type;    //题目类型   1单选   2多选
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getyAnswer() {
		return yAnswer;
	}
	public void setyAnswer(String yAnswer) {
		this.yAnswer = yAnswer;
	}
	public String getIsright() {
		return isright;
	}
	public void setIsright(String isright) {
		this.isright = isright;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getqAnswer() {
		return qAnswer;
	}
	public void setqAnswer(String qAnswer) {
		this.qAnswer = qAnswer;
	}
	public String getAnswer1() {
		return answer1;
	}
	public void setAnswer1(String answer1) {
		this.answer1 = answer1;
	}
	public String getAnswer2() {
		return answer2;
	}
	public void setAnswer2(String answer2) {
		this.answer2 = answer2;
	}
	public String getAnswer3() {
		return answer3;
	}
	public void setAnswer3(String answer3) {
		this.answer3 = answer3;
	}
	public String getAnswer4() {
		return answer4;
	}
	public void setAnswer4(String answer4) {
		this.answer4 = answer4;
	}
	public String getAnswer5() {
		return answer5;
	}
	public void setAnswer5(String answer5) {
		this.answer5 = answer5;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	
	
	
}
