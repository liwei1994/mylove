package com.weili.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.weili.model.ChartModel;

public interface ChartMapper {
	//学校考试人数根据区县计算，统计图计算
	@Select("SELECT CENTER AS center ,COUNT(CENTER) AS num FROM t_jyks_user WHERE IS_DELETE = '1' AND IS_ADMIN='1' AND CENTER IS NOT NULL GROUP BY CENTER ")
	List<ChartModel> chartFind();
	//查看县区考试人数统计图
	@Select("SELECT CENTER AS center ,COUNT(CENTER) AS testNum FROM t_jyks_user WHERE IS_DELETE = '1' AND IS_ADMIN='1' AND CENTER IS NOT NULL  AND IS_TEST='1' GROUP BY CENTER ")
	List<ChartModel> chartFindPerson();
}
