/**
 * 公共信息存储js
 * @authors jiewei (jiewei@iflytek.com)
 * @date    2015-10-17 19:39:38
 * @version $Id$
 */
define(['jquery', '../apps/index/dao'], function($, dao) {
	// 获取用户信息
	dao.getUser().done(function(data) {
		// 缓存用户信息
        localStorage.setItem('USERINFO', data.user);
        localStorage.setItem('username', data.user.name);
        localStorage.setItem('useridcard', data.user.sfzh);
        if(data.organization){
        	localStorage.setItem('xzqhbm', data.organization.xzqhId);
        }
        // 缓存用户类型
        if(data.userDetail.description){
        	localStorage.setItem('usertype', data.userDetail.description);
        }
        // 缓存企业组织机构编码
        if(data.userDetailMap){
        	localStorage.setItem('org_code',data.userDetailMap['ORG_CODE']);
        }
    }).fail(function(){

    });
});
