/*
 *  工具栏dao
 *
 **/
define(['jquery', 'fly'], function($, fly) {

    var util = fly.utils;

    function ajaxPost(url, param) {
        var obj = new util.ajaxObj(),
            options = $.extend({}, obj.options);
        options.before();
        util.ajax.post(url, param, 'text')
            .done(function(data) {
                data = util.toObj(data);
                setTimeout(function() {
                    options.after();
                    obj._done && obj._done(data);
                }, 0);
            })
            .fail(function() {
                setTimeout(function() {
                    options.after();
                    obj._fail && obj._fail();
                }, 0);
            });
        return obj;
    }

    var dao = {

        //获取用户信息
        getUser: function(data) {
            return ajaxPost('/getUserInfo.do', data);
        },

        // 获取加密后的用户名
        getEncriptUser: function(data) {
            return ajaxPost('/peripheral/userInfo.do', data);
        },

        /**
         * 获取工具栏按钮
         * @param {[[Type]]} data     事项参数
         */
        getToolbarBtns: function(data) {
            return ajaxPost('/config/query/toolbarbtns.do', data);
        },

        /**
         * 获取表单信息
         * @param {[[Type]]} data     事项参数
         */
        getForms: function(data) {
            return ajaxPost('/config/query/getForms.do', data);
        },

        /**
         * 获取材料信息
         * @param {[[Type]]} data     事项参数
         */
        getCredentials: function(data) {
            return ajaxPost('/config/query/getMaterials.do', data);
        },

        /**
         * 获取全流程数据
         * @param {[[Type]]} data     事项参数
         */
        getProcessData: function(data) {
            return ajaxPost('/approve/link/query.do', data);
        },

        /**
         * 获取回执单数据
         * @param {[[Type]]} data     申报号
         */
        getRecieptData: function(data) {
            return ajaxPost('/approve/link/query.do', data);
        },

        /**
         * 获取单个字典
         * @param {[[Type]]} lxjp     类型简拼
         */
        getDict: function(lxjp) {
            var data = {
                lxjp: lxjp
            };
            return ajaxPost('/common/commboDict.do', data);
        },

        getUniqDict: function(lxjp, dm) {
            return util.Ajax.get('/common/dict.do', {
                lxjp: lxjp,
                dm: dm
            });
        },

        /*获取流程查询数据*/
        getFlowData: function(projNo) {
            var param = {
                projNo: projNo
            };
            return ajaxPost('/common/getProcessInfo.do', param);
        },

        /* 暂存 */
        save: function(data) {
            return ajaxPost('/bsx/common/tempSave.do', data);
        },

        /* 登记提交 */
        submit: function(data) {
            return ajaxPost('/bsx/common/submit.do', data);
        },

        /* 审核提交 */
        approveSubmit: function(data) {
            return ajaxPost('/bizApprove/submit.do', data);
        },

        // 传递高拍仪图片数据
        postScanData: function(data) {
            return ajaxPost('/attachment/uploadImageAttach.do', data);
        },

        /* 审批完成 */
        approveEnd: function(data) {
            return ajaxPost('/bizApprove/finish.do', data);
        },

        /* 打回 */
        back: function(data) {
            return ajaxPost('/bizApprove/submit.do', data);

        },

        /* 退件  */
        bouncingmail: function(data) {
            return ajaxPost('/bizApprove/terminate.do', data);
        },
        
        //获取证件材料查看数据
        getCredData: function(param) {
            return ajaxPost('/preapasattr/getApasAttrInfo.do', param);
        },

        //获取证件材料编辑数据
        getEditCredData: function(param) {
            return ajaxPost('/preapasattr/getAttrEditInfo.do', param);
        },

        //受理
        acceptBiz: function(param) {
            return ajaxPost('/accept/submit.do', param);
        },

        //不予受理
        refuseBiz: function(param) {
            return ajaxPost('/accept/submit.do', param);
        },

        // 受理退回
        acceptBack: function(param) {
            return ajaxPost('/accept/back.do', param);
        },
        
        //补齐补正
        repairBiz: function(param) {
            return ajaxPost('/accept/savePatchInfo.do', param);
        },

        //根据申报号获取需要补齐补正的材料
        getCredToRepair: function(param) {
            return ajaxPost('/accept/getPatchInfoByProNo.do', param);
        },

        //保存补交的材料
        saveRepairedCred: function(param) {
            return ajaxPost('/accept/savePatchMaterials.do', param);
        },

        // 获取签章数据
        getSignInfo: function(data) {
            return ajaxPost('/approve/searchSignInfoByCode.do', data);
        },

        // 获取插件下载数据
        getPluginInfo: function(data) {
            return ajaxPost('/plugin/queryList.do', data);
        },

        // 获取行政区划
        getAdministrativeArea: function(data) {
            return ajaxPost('/config/getXzqhList.do', data);
        },

        // 获取行政区划信息
        getAdministrativeAreaInfo: function(data) {
            return ajaxPost('/config/getXzqhList.do', data);
        },

        loadPDFForm: function(data) {
            return ajaxPost('/form/downLoadPdf.do', data);
        },

        //获取配置的可打印回执单
        getRecieptEnable: function(data) {
            return ajaxPost('/config/query/link/receipt.do', data);
        },

        //获取流程状态对应可打印的回执单
        getProcessRecieptEnable: function(data) {
            return ajaxPost('/apasinfo/hzdlist.do', data);
        },

        //获取回执单pdf临时文件名
        getRecieptTempPdf: function(data) {
            return ajaxPost('/config/receiptPdf.do', data);
        },

        // 补交不来
        cannotPatch: function(data) {
            return ajaxPost('/accept/cannotPatch.do', data);
        },

        // 特别程序申请
        specialProceduresApply: function(data) {
            return ajaxPost('/special/saveApply.do', data);
        },

        // 预审受理
        getPreAuditPass: function(param) {
            return ajaxPost('/preaudit/preAuditSubmit.do', param);
        },

        // 预审不通过
        getPreAuditNoPass: function(param) {
            return ajaxPost('/preaudit/preAuditSubmit.do', param);
        },

        // 预审打回
        getPreAuditReject: function(param) {
            return ajaxPost('/preaudit/preAuditReject.do', param);
        }

    };

    return dao;
});
