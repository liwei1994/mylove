package com.weili.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.weili.model.JyksQuestion;

public interface AdminMapper {

	//计算用户总条数  用于分页
	@Select("SELECT COUNT(*) FROM T_JYKS_USER WHERE IS_ADMIN='1' AND IS_DELETE = '1'")
	Integer countPageSize();
	//计算题库总条数 用于分页
	@Select("SELECT COUNT(*) FROM T_JYKS_QUESTION WHERE IS_DELETE = '1'")
	Integer countQNoSize();
	//管理员删除一条用户
	@Update("UPDATE T_JYKS_USER SET IS_DELETE = '0' WHERE IDCARD = #{idcard}")
	Integer deleteOnePerson(String idcard);
	//管理员删除一条题目信息
	@Update("UPDATE T_JYKS_QUESTION SET IS_DELETE = '0' WHERE ID =#{id}")
	Integer deleteOneQuestion(String id);
	//查询所有题目信息
	@Select("SELECT * FROM T_JYKS_QUESTION WHERE IS_DELETE = '1'  LIMIT #{startSize},#{pageSize} ")
	List<JyksQuestion> findAllQuestion(@Param("startSize") int startSize,@Param("pageSize") int pageSize);

	//查询所有题目信息
	@Select("SELECT * FROM T_JYKS_QUESTION WHERE IS_DELETE = '1'")
	List<JyksQuestion> findAllQuestion1();
	//根据题目id查找
	@Select("SELECT * FROM T_JYKS_QUESTION WHERE ID = #{id}")
	JyksQuestion updateOneQuestion(String id);
	//管理员插入一条题目信息insertQuestion
	@Insert("INSERT INTO T_JYKS_QUESTION (TITLE,ANSWER1,ANSWER2,ANSWER3,ANSWER4,ANSWER5,ANSWER,TYPE)"
			+ "VALUES(#{title},#{answer1},#{answer2},#{answer3},#{answer4},#{answer5},#{answer},#{type})")
	Integer insertQuestion(JyksQuestion question);
	//根据题目id修改题目信息
	@Update("UPDATE T_JYKS_QUESTION SET TITLE = #{title},ANSWER1 = #{answer1},ANSWER2 = #{answer2},ANSWER3 = #{answer3},ANSWER4 = #{answer4},ANSWER5 = #{answer5} ,ANSWER = #{answer},TYPE = #{type} WHERE ID = #{id}")
	Integer updateQuestion(JyksQuestion question);
	
}
