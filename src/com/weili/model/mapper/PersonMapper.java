package com.weili.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.weili.model.AnswerAndQuestion;
import com.weili.model.PersonModel;

public interface PersonMapper {
	//根据idcard查找
	@Select("SELECT * FROM T_JYKS_USER WHERE IDCARD = #{idCard}")
	PersonModel findByIdcard(String idCard);
	//根据身份证查看成绩
	@Select("SELECT SCORE FROM T_JYKS_USER WHERE IDCARD = #{idCard}")
	String selectScore(String idCard);
	
	@Insert("INSERT INTO T_PERSON (WID, NAME, GENDER, ID_CARD, PHONE, EMAIL)"
			+ " VALUES (#{wid}, #{name}, #{gender}, #{idCard}, #{phone}, #{email})")
	int insert(PersonModel person);
	
	/*@Delete("DELETE FROM T_PERSON WHERE WID = #{wid}")
	int deleteByWid(String wid);*/
	//查找所有用户
	@Select("SELECT * FROM T_JYKS_USER WHERE IS_ADMIN='1' AND IS_DELETE = '1'  LIMIT #{startSize},#{pageSize} ")
	List<PersonModel> findAllTeacher(@Param("startSize") int startSize,@Param("pageSize") int pageSize);
	//int startSize = (pageNum - 1) * pageSize;
	
	//用户修改密码
	@Update("UPDATE  T_JYKS_USER SET PASSWORD = #{password},PASSWORD1 = #{password1} WHERE IDCARD = #{idCard}")
	Integer updatePassword(PersonModel person);
	
	//用户修改个人信息
		@Update("UPDATE  T_JYKS_USER SET MOBILE = #{mobile},USERNAME = #{userName}, CENTER = #{center}, SCHOOL = #{school} WHERE IDCARD = #{idCard}")
		Integer updateInfo(PersonModel person);
	
	
	//用户完善个人信息
	@Update("UPDATE  T_JYKS_USER SET USERNAME = #{userName}, MOBILE = #{mobile}, CENTER = #{center}, SCHOOL = #{school},PIC = #{pic} WHERE IDCARD = #{idCard}")
	Integer userInsert(PersonModel person);
	
	//进行考试完善学区
	@Update("UPDATE  T_JYKS_USER SET  CENTER = #{city}, SCHOOL = #{school} WHERE IDCARD = #{idCard}")
	Integer InsertJyksUser(PersonModel person);
	
	//用户登录
	@Select("SELECT * FROM T_JYKS_USER WHERE IDCARD = #{idCard} AND  PASSWORD = #{password} and is_delete = '1'")
	PersonModel checkPesron(PersonModel uModel);
	
	//用户注册核对身份证是否重复
	@Select("SELECT count(1) FROM T_JYKS_USER WHERE IDCARD = #{idCard}")
	Integer regCheckIdCard(String idCard);
	
	//用户注册
	@Insert("INSERT INTO T_JYKS_USER (ID, IDCARD, CREATETIME, IS_ADMIN, IS_DELETE, REALNAME, PASSWORD, PASSWORD1)"
			+ " VALUES (#{id}, #{idCard}, #{createTime}, #{is_admin}, #{is_delete}, #{userName}, #{password}, #{password1})")
	int InsertUser(PersonModel person);
	
	//用户根据idcard查看已经考试的信息
	@Select("SELECT A.USERID,A.ISRIGHT,A.ANSWER AS 'yAnswer',Q.ANSWER AS 'qAnswer',Q.ANSWER1,Q.ANSWER2,Q.ANSWER3,Q.ANSWER4,Q.ANSWER5,Q.TITLE,Q.TYPE  FROM T_JYKS_ANSWER A,T_JYKS_QUESTION Q WHERE A.QUESTIONID = Q.ID AND A.USERID =  #{idCard}")
	List<AnswerAndQuestion> userAreadyTest(String idcard);
	//用户根据idcard查看已经考试的信息
	@Select("SELECT A.USERID,A.ISRIGHT,A.ANSWER AS 'yAnswer',Q.ANSWER AS 'qAnswer',Q.ANSWER1,Q.ANSWER2,Q.ANSWER3,Q.ANSWER4,Q.ANSWER5,Q.TITLE,Q.TYPE  FROM T_JYKS_ANSWER A,T_JYKS_QUESTION Q WHERE A.QUESTIONID = Q.ID AND A.ISRIGHT = '0' AND A.USERID =  #{idCard}")
	List<AnswerAndQuestion> userWrongTest(String idcard);
}
