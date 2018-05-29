package com.weili.controller;

import java.util.ArrayList;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class Test {

	public static void main(String[] args) {
		  String jsonMessage="{\"key\":\"e5f83436f695a3a316183f4e82702d36ca034ce4\",\"category\":\"brand\",\"ids\":[32,45,67,94,43]}";  
	        JSONObject jsonObject = JSONObject.fromObject(jsonMessage);  
	        String category = jsonObject.getString("category");  
	        JSONArray array = jsonObject.getJSONArray("ids");  
	        ArrayList<Integer> arrayList = new ArrayList<Integer>();  
	        for (int i = 0; i < array.size(); i++) {  
	            arrayList.add(array.getInt(i));  
	        }  
	        System.out.println(category);  
	        System.out.println(array);  
	        System.out.println(arrayList);  
	    }  
}
