package com.weili.model;

import java.io.Serializable;
import java.util.List;

/**
 * @Title:Pager
 * @Description:
 * @author:weili23
 * @param <T>
 * @Date:2018年4月11日-下午3:30:32
 */
public class Pager<T> implements Serializable {
	
	private static final long serialVersionUID = -3372191853167373560L;

	private int pagerSize;//每页显示多少条记录
	private int currentPage;//当前第几页数据
	private int totalRecord;//一共多少条记录
	private int totalPager;//一共多少页记录
	private List<T> dataList;//要显示的数据
	
	public Pager() {
		super();
	}
	
	
	public Pager(int pageNum,int pageSize,List<T> sourceList){
			if(sourceList == null){
				return;
			}
			//总记录条数
			this.totalRecord=sourceList.size();
			
			//每页显示多少条数据
			this.pagerSize=pageSize;
			
			//获取总页数
			this.totalPager = this.totalRecord/this.pagerSize;
			if(this.totalRecord % this.pagerSize != 0){
				this.totalPager = this.totalPager+1;
			}
			
			//当前第几页数据
			this.currentPage = this.totalPager<pageNum ? this.totalPager : pageNum;
			
			//起始索引
			int fromIndex = this.pagerSize*(this.currentPage-1);
			
			//结束索引
			int toIndex = this.pagerSize*this.currentPage>this.totalRecord ? this.totalRecord : this.pagerSize*this.currentPage;

			this.dataList = sourceList.subList(fromIndex, toIndex);
	}
	public Pager(int pagerSize, int currentPage, int totalRecord,
			int totalPager, List<T> dataList) {
		super();
		this.pagerSize = pagerSize;
		this.currentPage = currentPage;
		this.totalRecord = totalRecord;
		this.totalPager = totalPager;
		this.dataList = dataList;
	}
	public int getPagerSize() {
		return pagerSize;
	}
	public void setPagerSize(int pagerSize) {
		this.pagerSize = pagerSize;
	}
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public int getTotalRecord() {
		return totalRecord;
	}
	public void setTotalRecord(int totalRecord) {
		this.totalRecord = totalRecord;
	}
	public int getTotalPager() {
		return totalPager;
	}
	public void setTotalPager(int totalPager) {
		this.totalPager = totalPager;
	}
	public List<T> getDataList() {
		return dataList;
	}
	public void setDataList(List<T> dataList) {
		this.dataList = dataList;
	}
	
}
