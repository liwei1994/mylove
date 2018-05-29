/* 统一提示语信息 */

(function(factory) {
    if (typeof define === "function" && define.amd) {
        define(['jquery'], factory);
    } else {
        factory();
    }
}(function($) {

    var data = {

        /* 系统提示语 */
        "SAVE_FAIL": "保存失败！",
        "SAVE_SUCCESS": "保存成功！",
        "LOAD_ERROR": "数据加载失败！",
        "WORKITEM_FINISHED": "该工作项已经办结，不能重复操作！",
        "OPERATION_SUCCESS": "操作成功！",
        "OPERATION_FAIL": "操作失败！",
        "WKITEMIDEMPTY": "当前任务未经过初审提交，无法回收！",
        "RETRIEVE_FAIL1": "当前任务已经提交审批，无法回收！",
        "RETRIEVE_FAIL2": "当前任务已在待办任务中，无法回收！",
        "LACKAUTHORITY": "该用户缺少操作当前任务的权限！",
        "BSX_WC": "当前办事项流程已办理完成，无法回收！",
        "BSX_ZZ": "当前办事项流程已终止，无法回收！",
        "BSX_RUNNING": "此办事项正在办理中！ ",
        "BSX_REPEAT": "此办事项已办理，不能重复办理！",
        "BSX_NOT_HANDLE": "尚未办理低保申请！",
        "MSG_NOT_PASS_THREE": "您已办理了主动退保，（审批完时间+3个月）前不能申请低保！",
        "BSX_NOT_CSBJ": "尚未办理长寿保健费申请！",
        "BSX_DO_REPEAT": "请重新申请该办事项！",
        "SUBMMITED": "当前事项已办理提交！",
        "INVALIDDATA": "当前办事项不存在！",
        "PASSWORD_ERROR":"原始密码错误！",
        "PASSWORD_NOT_CHANGE" : "新密码必须与原始密码不同！",
        "PASSWORD_CHANGE" : "两次输入的新密码必须保持一致！",
        "PASSWORD_SUCCESS" : "密码修改成功！",
        'NOT_FOUND_NEXT_APPROVER':'未找到下一步处理人！',
        "material_nececery_not_upload": "请确认所有必备材料已上传。",
        "releasetask_info" : "不需要进行释放！"
    };

    var message = {
        get: function(key) {
            if (!key) {
                return data['LOAD_ERROR'];
            }
            var keys = key.split(','),
                msg = [];
            for (var i = 0, l = keys.length; i < l; i++) {
                if (data[keys[i]]) msg.push(data[keys[i]]);
            }
            return msg.join('<br/>');
        }
    };

    //统一确认框
    message.confirmDialog = function(param) {
        var options = {
            title: '提示',
            titleIcon: true,
            content: '',
            width: 378,
            height: 125,
            padding: '10px',
            okVal: '确定',
            cancelVal: '取消',
            lock: true,
            ok: true,
            cancel: true
        };
        return $.dialog($.extend(options, param));
    };

    //统一确认框(可穿越框架)
    message.confirmDialogThrough = function(param) {
        var options = {
            title: '提示',
            titleIcon: true,
            content: '',
            width: 378,
            height: 125,
            padding: '10px',
            okVal: '确定',
            cancelVal: '取消',
            lock: true,
            ok: true,
            cancel: true
        };
        $.dialog.through($.extend(options, param));
    };

    //统一提示框
    message.alertDialog = function(param) {
        var options = {
            title: '提示',
            titleIcon: true,
            content: '',
            width: 378,
            height: 125,
            lock: true,
            okVal: '确定',
            ok: true,
            init: function() {
                this.DOM.close.hide();
            }
        };
        $.dialog($.extend(options, param));
    };

    message.openFullWindow = function(url, name) {

        var redirectUrl = url;
        var width = screen.availWidth - 10;
        var height = screen.availHeight - 50;
        var szFeatures = "top=0,";
        szFeatures += "left=0,";
        szFeatures += "width=" + width + ",";
        szFeatures += "height=" + height + ",";
        szFeatures += "directories=no,";
        szFeatures += "status=no,toolbar=no,location=no,";
        szFeatures += "menubar=yes,";
        szFeatures += "scrollbars=yes,";
        szFeatures += "resizable=no"; // channelmode
        szFeatures += "fullscreen=yes";
        window.open(redirectUrl, '_blank', szFeatures);
    };
    message.openOnlyPage = function(url, name) {
        var redirectUrl = url;
        var width = screen.availWidth;
        var height = screen.availHeight;
        var szFeatures = "top=0,";
        szFeatures += "left=0,";
        szFeatures += "width=" + width + ",";
        szFeatures += "height=" + height + ",";
        szFeatures += "directories=no,";
        szFeatures += "status=no,toolbar=no,location=no,";
        szFeatures += "menubar=no,";
        szFeatures += "scrollbars=yes,";
        szFeatures += "resizable=yes"; // channelmode
        szFeatures += "fullscreen=yes";
        window.open(redirectUrl, '_blank', szFeatures);
    };

    message.openPrintWindow = function(url) {
        var redirectUrl = url;
        var width = screen.availWidth;
        var height = screen.availHeight;
        var szFeatures = "top=0,";
        szFeatures += "left=0,";
        szFeatures += "width=" + 1000 + ",";
        szFeatures += "height=" + height + ",";
        szFeatures += "directories=no,";
        szFeatures += "status=no,toolbar=no,location=no,";
        szFeatures += "menubar=no,";
        szFeatures += "scrollbars=yes,";
        szFeatures += "resizable=no"; // channelmode
        szFeatures += "fullscreen=no";
        window.open(redirectUrl, '_blank', szFeatures);
    };

    /* 
     *  设置未来(全局)的AJAX请求默认选项
     * 主要设置了AJAX请求遇到Session过期的情况
     */
    function globalAjaxSetup() {
        var lgouturl = localStorage.getItem('LOGOUT'),
            win = window.top || window,
            appUrl = win.location.href,
            appUrl = (appUrl.indexOf('yzt') > -1 ? appUrl.substr(0, appUrl.indexOf('yzt')+3) : appUrl);
            path = '',
            times = -1;
        if (lgouturl) {
            path = lgouturl + '?service=' + appUrl;
        } else {
            path = appUrl;
        }
        $.ajaxSetup({
            type: 'POST',
            complete: function(xhr, status) {
                var res = xhr.responseText;
                try {
                    res = eval('(' + res + ')'),
                        status = res.status;
                    if (status !== '' && status === false) {
                        win.message.alertDialog({
                            content: '用户信息失效，将返回登录页！',
                            close: function() {
                                setTimeout(function() {
                                    win.location.href = CONTEXTPATH;
                                }, 500);
                            }
                        });
                    }
                } catch (e) {

                }

            }
        });
    }

    globalAjaxSetup();

    window.message = message;

    return message;
}));
