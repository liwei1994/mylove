package com.weili.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class getCurrentTime {
	public getCurrentTime(){
		
	}
	public static String getCurTime(){
		Date date= new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return formatter.format(date);
	}
	
	public static void main(String[] args) {
		System.out.println(getCurTime());
	}
}
