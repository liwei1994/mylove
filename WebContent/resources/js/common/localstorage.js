/**
 * 公共信息存储js
 * @authors jiewei 
 * @date    2015-10-17 19:39:38
 * @version $Id$
 */
define([
    'jquery',
    CONTEXTPATH +STATICBASEPATH+'/js/common/dao.js',
], function($, dao) {
    window.yztUser = {};
    // 获取用户信息
    dao.getUser().done(function(data) {
        // 缓存用户信息
        $.extend(yztUser, {
            userData: data,
            userInfo: data.user,
            userName: data.user.name,
            userIdcard: data.user.sfzh,
            userName: data.user.name,
            userType: data.userDetail.description,
            orgCode: data.userDetailMap['ORG_CODE'],
            deptName: data.organization.name

        });
    }).fail(function() {

    });
    //获取加密后用户名
    dao.getEncriptUser().done(function(res) {
        if (res.flag == 'true') {
            $.extend(yztUser, {
                encryptionUser: res.data
            });
        }
    }).fail(function() {

    });
});
