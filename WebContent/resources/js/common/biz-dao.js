/*
 *  工具栏dao
 *
 **/
define(['jquery', 'fly'], function($, fly) {

    var util = fly.utils;

    var dao = {

        /**
         * 获取登记页面表单和材料数据
         * @param {[[Type]]} data     事项参数
         */
        getRegistData: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/apas/applyDetail.do', data, 'text')
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
        },

        /**
         * 获取登记页面表单和材料数据
         * @param {[[Type]]} data     事项参数
         */
        getRegistEditData: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/apas/editDetail.do', data, 'text')
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
        },

        /**
         * 获取登记页面表单和材料数据(查看页面)
         * @param {[[Type]]} data     事项参数
         */
        getRegistViewData: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/itemCommon/viewDetail.do', data, 'text')
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
        },

        /**
         * 获取受理页面表单和材料数据
         * @param {[[Type]]} data     事项参数
         */
        getAcceptEditData: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before(); // /itemCommon/viewDetail.do
            util.ajax.post('/accept/applyDetail.do', data, 'text')
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
        },

        getAcceptViewData: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/itemCommon/viewDetail.do', data, 'text')
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
        },

        getDict: function(lxjp) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);

            util.ajax.post('/common/commboDict.do', {
                    lxjp: lxjp
                }, 'text').done(function(data) {
                    data = util.toObj(data);
                    obj._done && obj._done(data);
                })
                .fail(function() {
                    obj._fail && obj._fail();
                });

            return obj;
        },

        getDicts: function(lxjp) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);

            util.ajax.post('/common/dictList.do', {
                    lxjp: lxjp
                }, 'text').done(function(data) {
                    data = util.toObj(data);
                    if (data.flag && data.flag != 'false') {
                        obj._done && obj._done(data.data);
                    } else {
                        obj._fail && obj._fail(data);
                    }
                })
                .fail(function() {
                    obj._fail && obj._fail();
                });

            return obj;
        },

        getUniqDict: function(lxjp, dm) {
            return util.Ajax.get('/common/dict.do', {
                lxjp: lxjp,
                dm: dm
            });
        },

        /* 数据服务 */
        service: function(serviceId, conditionParams) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);

            options.before();

            util.ajax.post('/common/datacenter/service.do', {
                    serviceId: serviceId,
                    conditionParams: conditionParams
                }, 'text')
                .done(function(data) {
                    data = util.toObj(data);
                    setTimeout(function() {
                        options.after();
                        if (data.returnFlag && data
                            .returnFlag != 'false') {
                            if (data.data && data.data.FLAG !== false) {
                                obj._done && obj._done(
                                    util.toObj(data.data));
                            } else {
                                obj._empty && obj._empty();
                            }
                        } else {
                            obj._fail && obj._fail();
                        }
                    }, 0);
                })
                .fail(function() {
                    setTimeout(function() {
                        options.after();
                        obj._fail && obj._fail();
                    }, 0);
                });

            return obj;

        },

        /* 数据服务 */
        serviceUpdate: function(formCode, formServiceCode, conditionParams) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);

            options.before();

            util.ajax.post('/common/datacenter/dataserviceUpdate.do', {
                    formCode: formCode,
                    formServiceCode: formServiceCode,
                    conditionParams: conditionParams
                }, 'text')
                .done(function(data) {
                    data = util.toObj(data);
                    setTimeout(function() {
                        options.after();
                        if (data.returnFlag && data
                            .returnFlag != 'false') {
                            if (data.data && data.data.FLAG !== false) {
                                obj._done && obj._done(
                                    util.toObj(data.data));
                            } else {
                                obj._empty && obj._empty();
                            }
                        } else {
                            obj._fail && obj._fail();
                        }
                    }, 0);
                })
                .fail(function() {
                    setTimeout(function() {
                        options.after();
                        obj._fail && obj._fail();
                    }, 0);
                });

            return obj;

        },

        /*获取图片*/
        getFormPic: function(formId) {
            var _obj = new util.ajaxObj(),
                _options = $.extend({}, _obj.options);
            _options.before();
            util.ajax.get('/apasForm/formDetail.do', {
                    'formId': formId
                }, 'text')
                .done(function(data) {
                    data = util.toObj(data);
                    setTimeout(function() {
                        _options.after();
                        _obj._done && _obj._done(data);
                    }, 0);
                })
                .fail(function() {
                    setTimeout(function() {
                        _options.after();
                        _obj._fail && _obj._fail();
                    }, 0);
                });

            return _obj;
        },
        /*获取收费状态查询数据*/
        getChargeData: function(formData) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);

            util.ajax.post('/cost/queryCostListByProjNo.do', {
                    projNo: formData
                }, 'text').done(function(data) {
                    data = util.toObj(data);
                    obj._done && obj._done(data);
                })
                .fail(function() {
                    obj._fail && obj._fail();
                });

            return obj;
        },

        /*获取流程查询数据*/
        getFlowData: function(formData) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);

            util.ajax.post('/common/getProcessInfo.do', {
                    projNo: formData
                }, 'text').done(function(data) {
                    data = util.toObj(data);
                    obj._done && obj._done(data);
                })
                .fail(function() {
                    obj._fail && obj._fail();
                });

            return obj;
        },

        /* 暂存 */
        save: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);

            options.before();

            util.ajax.post('/bsx/common/tempSave.do', data,
                    'text')
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

        },

        /* 登记提交 */
        submit: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);

            options.before();

            util.ajax.post('/bsx/common/submit.do', data,
                    'text')
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
        },

        /* 审核提交 */
        approveSubmit: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);

            options.before();

            util.ajax.post('/bizApprove/submit.do', data,
                    'text')
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
        },

        // 传递高拍仪图片数据
        postScanData: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);

            options.before();

            util.ajax.post('/attachment/uploadImageAttach.do', data,
                    'text')
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
        },

        /* 审批完成 */
        approveEnd: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);

            options.before();

            util.ajax.post('/bizApprove/finish.do', data,
                    'text')
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
        },

        /* 打回 */
        back: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);

            options.before();

            util.ajax.post('/bizApprove/submit.do', data,
                    'text')
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

        },

        /* 退件  */
        bouncingmail: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);

            options.before();

            util.ajax.post('/bizApprove/terminate.do', data,
                    'text')
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

        },

        //获取证件材料查看数据
        getCredData: function(param) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();

            util.ajax.post('/preapasattr/getApasAttrInfo.do',
                    param, 'text').done(function(data) {
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
        },

        //获取证件材料编辑数据
        getEditCredData: function(param) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();

            util.ajax.post('/preapasattr/getAttrEditInfo.do',
                    param, 'text').done(function(data) {
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
        },



        //受理
        acceptBiz: function(param) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();

            util.ajax.post('/accept/submit.do',
                    param, 'text').done(function(data) {
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
        },

        //不予受理
        refuseBiz: function(param) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();

            util.ajax.post('/accept/submit.do',
                    param, 'text').done(function(data) {
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
        },

        //补齐补正
        repairBiz: function(param) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();

            util.ajax.post('/accept/savePatchInfo.do',
                    param, 'text').done(function(data) {
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
        },

        //根据申报号获取需要补齐补正的材料
        getCredToRepair: function(param) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();

            util.ajax.post('/accept/getPatchInfoByProNo.do',
                    param, 'text').done(function(data) {
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
        },

        //保存补交的材料
        saveRepairedCred: function(param) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();

            util.ajax.post('/accept/savePatchMaterials.do',
                    param, 'text').done(function(data) {
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
        },

        // 材料收取凭证回执单
        getReceiptvoucher: function(projNo) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);

            util.ajax.post('/apasForm/printDetail.do', {
                    projNo: projNo
                }, 'text').done(function(data) {
                    data = util.toObj(data);
                    obj._done && obj._done(data);
                })
                .fail(function() {
                    obj._fail && obj._fail();
                });

            return obj;
        },

        // 材料补正回执单
        getMaterialreceiving: function(projNo) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);

            util.ajax.post('/accept/patchMaterialsPrintDetail.do', {
                    projNo: projNo
                }, 'text').done(function(data) {
                    data = util.toObj(data);
                    obj._done && obj._done(data);
                })
                .fail(function() {
                    obj._fail && obj._fail();
                });

            return obj;
        },

        // 受理通知回执单
        getEventaccept: function(projNo) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);

            util.ajax.post('/accept/acceptPrintDetail.do', {
                    projNo: projNo
                }, 'text').done(function(data) {
                    data = util.toObj(data);
                    obj._done && obj._done(data);
                })
                .fail(function() {
                    obj._fail && obj._fail();
                });

            return obj;
        },


        // 不予受理回执单
        getNotaccept: function(projNo) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);

            util.ajax.post('/accept/acceptPrintDetail.do', {
                    projNo: projNo
                }, 'text').done(function(data) {
                    data = util.toObj(data);
                    obj._done && obj._done(data);
                })
                .fail(function() {
                    obj._fail && obj._fail();
                });

            return obj;
        },

        // 审核中心的审核页面数据请求
        getApproveEditData: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/approve/applyDetail.do', data, 'text')
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
        },

        getApproveViewData: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/itemCommon/viewDetail.do', data, 'text')
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
        },

        // 审核中心-审核页面的审批区域数据请求
        getCanvasData: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/approve/editDetail.do', {
                    workItemId: data.workItemId,
                    projNo: data.projNo,
                    serviceId: data.serviceId
                }, 'text')
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
        },

        // 获取表单打印数据
        getPrintData: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/approve/getApprovePrintData.do', data, 'text')
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
        },

        //获取登记和受理表单模板信息
        getPrintTmplData: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/functionconfig/node.do', data, 'text')
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
        },

        //获取登记和受理表单数据
        getPrintSHSLData: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/common/getApasInfoData.do', data, 'text')
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
        },

        // 获取签章数据
        getSignInfo: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/approve/searchSignInfoByCode.do', data, 'text')
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
        },

        // 获取插件下载数据
        getPluginInfo: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/plugin/queryList.do', data, 'text')
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
        },

        // 保存权力清单
        savePowerList: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/saveProjectInfo.do', data, 'text')
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
        },

        // 获取权力清单
        getPowerList: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/qryProjectInfoById.do', data, 'text')
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
        },

        // 获取行政区划
        getAdministrativeArea: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/getXzqhList.do', data, 'text')
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
        },

        // 删除权力清单
        deletePowerList: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/deleteProjectInfo.do', data, 'text')
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
        },

        // 获取权力清单历史信息
        getPowerListInfo: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/qryProjectEditInfoById.do', data, 'text')
                .done(function(data) {
                    data = util.toObj(data);
                    
                    if(data.data.pxz===0)
                		data.data.pxz=null;
                    
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
        },

        // 获取行政区划信息
        getAdministrativeAreaInfo: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/getXzqhListByRole.do', data, 'text')
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
        },
        getUserGroup:function(data){
        	var obj = new util.ajaxObj(),
            options = $.extend({}, obj.options);
	        options.before();
	        util.ajax.post('/uaac/getUserGroup.do', data, 'text')
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
        },
        // 删除消息 deletMesg
        deletMesg: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/message/deleteMessage.do', data, 'text')
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
        },

        // 消息详细
        getMesgDetail: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/message/getMessage.do', data, 'text')
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
        },
        
        // 回复消息
        sendMessage: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/message/sendMessage.do', data, 'text')
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
        },

        // 消息统计
        getInfoStatistics: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/statistics/proItemStatistics.do', data, 'text')
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
        },

        // 更新事项保存时间
        updateProjectInfoSrcTime: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/updateProjectInfoSrcTime.do', data, 'text')
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
        },
        
        // 判断办事项是否存在
        checkRepeat: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/repeatProject.do', data, 'text')
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
        },

        // 自动生成事项编号
        autoItemNumber:  function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/autoItemNumber.do', data, 'text')
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
        },

        // 获取消息配置
        getMessageConfig:  function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/messConfig/saveOrupdatePage.do', data, 'text')
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
        },
     // 获取导出模板配置
        getExportTempInfo:  function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/exportTempService/getTempById.do', data, 'text')
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
        },
     // 根据事项获取表单属性
        getAttrBySx:  function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/exportTempService/getAttrBySx.do', data, 'text')
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
        },

        // 根据事项获取表单名称
        getFormNameBySx:  function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/exportTempService/getFormNameBySx.do', data, 'text')
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
        },
        // 保存编辑消息配置
        saveMessageConfig:  function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/messConfig/saveOrUpdateMessConfig.do', data, 'text')
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
        },
     // 保存编辑导出模板
        saveExportTemp:  function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/exportTempService/saveTemp.do', data, 'text')
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
        },
        // 删除消息配置
        deleteMessageConfig:  function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/messConfig/deleteMessConfig.do', data, 'text')
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
        },
     // 删除导出模板
        deleteExportTemp:  function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/exportTempService/delTemp.do', data, 'text')
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
        },
        // 获取操作管理
        getOperateManage:  function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/operateService/getCzglById.do', data, 'text')
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
        },
        // 保存编辑操作管理
        saveOperateManage:  function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/operateService/saveCzgl.do', data, 'text')
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
        },
        //删除操作管理
        deleteOperateManage:function(data) {
            var obj = new util.ajaxObj(),
            	options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/operateService/delCzgl.do', data, 'text')
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
        },
        // 服务信息列表查询
        getPageGsbServiceList:  function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/getPageGsbServiceList.do', data, 'text')
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
        },

        // 服务信息保存
        saveGsbService: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/saveGsbService.do', data, 'text')
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
        },
        // 服务参数列表查询
        getGsbServiceParameterList: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/getGsbServiceParameterList.do', data, 'text')
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
        },
        // 服务参数信息保存
        saveGsbServiceParameter: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/saveGsbServiceParameter.do', data, 'text')
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
        },
        // 配置管理服务表单信息保存
        saveGsbForm: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/saveGsbForm.do', data, 'text')
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
        },
        // 根据配置管理服务表单信息id查询信息
        qryGsbFormEditById: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/qryGsbFormEditById.do', data, 'text')
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
        },
        // 根据配置管理服务表单信息id删除信息
        deleteGsbForm: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/deleteGsbForm.do', data, 'text')
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
        },
        // 根据服务id查询服务
        qryGsbServiceEditById: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/qryGsbServiceEditById.do', data, 'text')
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
        },
        // 根据服务id删除服务
        deleteGsbService: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/deleteGsbService.do', data, 'text')
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
        },
        // 根据服务参数信息id查询信息
        qryGsbServiceParameterEditById: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/qryGsbServiceParameterEditById.do', data, 'text')
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
        },
        // 服务参数信息id删除信息
        deleteGsbServiceParameter: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/deleteGsbServiceParameter.do', data, 'text')
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
        },
        // 消息配置删除选中事项
        delMessConfigItem:function(data){
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/messConfig/delMessConfigItem.do', data, 'text')
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
        },
        // 消息配置保存选中事项
        saveMessConfigItem:function(data){
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/messConfig/saveMessConfigItem.do', data, 'text')
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
        },
        // 配置管理服务表单信息列表查询
        getGsbFormeList:function(data){
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/getGsbFormeList.do', data, 'text')
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
        },
        // 配置管理服务表单信息保存
        saveGsbForm:function(data){
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/saveGsbForm.do', data, 'text')
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
        },
        // 根据配置管理服务表单信息id查询信息
        qryGsbFormEditById:function(data){
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/qryGsbFormEditById.do', data, 'text')
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
        },
        // 根据配置管理服务表单信息id删除信息
        deleteGsbForm:function(data){
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/deleteGsbForm.do', data, 'text')
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
        },
        // 获取回执单信息
        getReceiptById:  function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/getReceiptById.do', data, 'text')
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
        },
        // 获取回执单列表
        getReceiptPage:  function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/getReceiptPage.do', data, 'text')
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
        },
        // 删除消息配置
        deleteReceipt:  function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/deleteReceipt.do', data, 'text')
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
        },
        // 回执单保存
        saveOrUpdateReceipt:function(data){
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/config/saveOrUpdateReceipt.do', data, 'text')
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
        },
        // 功能按钮
        getCzglByLinkNode:function(data){
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/operateService/getCzglByLinkNode.do', data, 'text')
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
        },

        // 消息配置环节与配置联动
        getCzjgBySendNode:function(data){
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/messConfig/getCzjgBySendNode.do', data, 'text')
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
        },

        // 特殊程序受理
        saveApplyResult:function(data){
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/special/saveApplyResult.do', data, 'text')
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
        },
        /* 列表导出 */
        saveExportInfo: function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);

            options.before();
            debugger;
            util.ajax.post('/expExcel.do', data,
                    'text')
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

        },
        // 根据导出模板得到属性信息
        getListTempItem:  function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/exportTempService/getListTempItem.do', data, 'text')
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
        },
        // 列表页面导出时数据列表获取
        getExportListInfo:  function(data,url) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post(url, data, 'text')
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
        },
        //释放认领事项
        releaseClaimItem:  function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/claim/releaseTask.do', data)
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
        },
        //认领事项
        claimItem:  function(data) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/claim/receiveTask.do', data)
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
        },
         // 预审受理
        getPreAuditPass: function(param) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/preaudit/preAuditSubmit.do', data)
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
        },

        // 预审不通过
        getPreAuditNoPass: function(param) {
            var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/preaudit/preAuditSubmit.do', data)
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
        },

        // 预审打回
        getPreAuditReject: function(param) {
             var obj = new util.ajaxObj(),
                options = $.extend({}, obj.options);
            options.before();
            util.ajax.post('/preaudit/preAuditReject.do', data)
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
    };

    return dao;
});
