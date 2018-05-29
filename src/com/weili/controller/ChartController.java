package com.weili.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.weili.model.ChartModel;
import com.weili.service.ChartService;

@Controller
public class ChartController {
	@Autowired
	private ChartService chartService;

	public ChartService getChartService() {
		return chartService;
	}

	public void setChartService(ChartService chartService) {
		this.chartService = chartService;
	}
	@RequestMapping(value="/chartFind")
	public ModelAndView chartFind(HttpServletRequest request,HttpServletResponse response){
		ModelAndView mv = new ModelAndView();
		List<ChartModel> chartAllPerson = chartService.chartFind();
		if(chartAllPerson != null){
			request.getSession().setAttribute("chartAllPerson", chartAllPerson);
			mv.setViewName("/admin/chart");
		}else{
			mv.setViewName("/admin/fail");
		}
		
		return mv;
	}
}
