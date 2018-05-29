package com.weili.model;

/**
 * @Title:PersonModel
 * @Description:
 * @author:weili23
 * @Date:2018年4月11日-下午3:30:41
 */
public class PersonModel {

	private String id;       //id
	private String realName;  //真实姓名
	private String idCard;    //身份证号
	private String mobile;    //手机号
	private String city;      //城市
	private String center;    //区县
	private String school;    //学校
	private String score;     //分数
	private String createTime;//注册时间
	private String userName;  //用户名
	private String password;  //密码
	private String password1;  //密码1
	private String is_delete;  //0 删除   1 未删除
	private String is_admin;  //0 管理员   1 用户
	private String logintime; //登录时间
	private String outtime; //退出时间
	private int is_test;  //是否参加过考试   0待考     1已考
	private byte[] pic;
	
	
	
	public byte[] getPic() {
		return pic;
	}
	public void setPic(byte[] pic) {
		this.pic = pic;
	}
	public String getLogintime() {
		return logintime;
	}
	public void setLogintime(String logintime) {
		this.logintime = logintime;
	}
	public String getOuttime() {
		return outtime;
	}
	public void setOuttime(String outtime) {
		this.outtime = outtime;
	}
	public int getIs_test() {
		return is_test;
	}
	public void setIs_test(int is_test) {
		this.is_test = is_test;
	}
	public String getPassword1() {
		return password1;
	}
	public void setPassword1(String password1) {
		this.password1 = password1;
	}
	public String getIs_delete() {
		return is_delete;
	}
	public void setIs_delete(String is_delete) {
		this.is_delete = is_delete;
	}
	public String getIs_admin() {
		return is_admin;
	}
	public void setIs_admin(String is_admin) {
		this.is_admin = is_admin;
	}
	public String getRealName() {
		return realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
	public String getIdCard() {
		return idCard;
	}
	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCenter() {
		return center;
	}
	public void setCenter(String center) {
		this.center = center;
	}
	public String getSchool() {
		return school;
	}
	public void setSchool(String school) {
		this.school = school;
	}
	public String getScore() {
		return score;
	}
	public void setScore(String score) {
		this.score = score;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	
	
	
}
