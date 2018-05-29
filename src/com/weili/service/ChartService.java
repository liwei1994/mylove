package com.weili.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.weili.model.ChartModel;
import com.weili.model.mapper.ChartMapper;
/**
 * 
 * @Title:ChartService
 * @Description:
 * @author:weili23
 * @Date:2018年5月3日-下午3:54:16
 */
@Component
public class ChartService {
	@Autowired
	private ChartMapper chartMapper;

	public void setChartMapper(ChartMapper chartMapper) {
		this.chartMapper = chartMapper;
	}
	//根据区县计算人数，统计图计算
	public List<ChartModel> chartFind(){
		List<ChartModel> chartInfo = chartMapper.chartFind();
		List<ChartModel> testInfo = chartMapper.chartFindPerson();
		for (ChartModel chartModel : chartInfo) {
			for (ChartModel testModel : testInfo) {
				if (chartModel.getCenter().equals(testModel.getCenter())) {
					chartModel.setTestNum(testModel.getTestNum());
				}
			}
		}
		return chartInfo;
	}
}
