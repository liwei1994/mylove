package com.weili.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.weili.model.JyksAnswer;
import com.weili.model.JyksQuestion;

public interface JyksMapper {

	//查询单选的所有题目
	@Select("SELECT * FROM T_JYKS_QUESTION T  WHERE  T.TYPE = '1' AND IS_DELETE = '1'")
	List<JyksQuestion> selectSingleQuestion();
	
	//查询多选的所有题目
	@Select("SELECT * FROM T_JYKS_QUESTION T  WHERE  T.TYPE = '2' AND IS_DELETE = '1'")
	List<JyksQuestion> selectDoubleQuestion();
	
	//根据题目id查找正确答案
	@Select("SELECT ANSWER FROM T_JYKS_QUESTION T WHERE IS_DELETE = '1' AND ID = #{questionId}")
	String checkAnswer(String questionId);
	
	//插入正确的Answer表中考试信息
	@Insert("INSERT INTO T_JYKS_ANSWER(ID, USERID, QUESTIONID, ANSWER, ISRIGHT)" 
			+ "VALUES (#{id}, #{userid}, #{questionid}, #{answer}, #{right} ) " )
	int insertAnswer(JyksAnswer jUser);
	
	//插入正确的Answer表中考试信息
	@Insert("INSERT INTO T_JYKS_ANSWER(ID, USERID, QUESTIONID, ANSWER, ISRIGHT)"
			+ "VALUES(#{id}, #{userid}, #{questionid}, #{answer}, #{right}) " )
	int insertFailAnswer(JyksAnswer jUser);
		
	//查看成绩countGrade(String userId)
	@Select("SELECT COUNT(*) FROM T_JYKS_ANSWER WHERE ISRIGHT='1' AND USERID = #{userid} ")
	String countGrade(String userid);
	//查看考试题目
	
	//查看错题
	
	
	//标识用户已经考试过了 ,并且保存分数
	@Update("UPDATE T_JYKS_USER SET IS_TEST = '1',SCORE = #{countA} WHERE IDCARD = #{userid}")
	void userHaveTest(@Param("userid") String userid,@Param("countA") String countA);
}
