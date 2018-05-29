/**
 * 表单页面逻辑
 * @author: zywu2
 */

(function(factory) {
    if (typeof define === "function" && define.amd) {
        var mod = [
            'jquery',
            'fly',
            CONTEXTPATH + STATICBASEPATH + '/js/common/dao.js',
            CONTEXTPATH + STATICBASEPATH + '/js/common/toolbar.js',
            CONTEXTPATH + STATICBASEPATH + '/js/common/localstorage.js',
            'form',
            'cred',
            'tab',
            'da',
            'rules',
            'editgrid',
            'sign'
        ];
        define(mod, factory);
    } else {
        factory(jQuery);
    }
}(function($, fly, dao, toolbar, lcs, form, cred, tab, da, rules) {

    var $body = $('body'),
        oneself;

    return $.widget("fly.entrance", {

        defaultElement: '<div>',

        options: {
            serviceId: '',
            projNo: '',
            stage: 0,
            formReadonly: false,
            materialReadonly: false,
            isView: false,
            toolbarOpts: {},
            downloadSlt: '.approveTd a',
            dao: '',
            credOpts: {
                showOther: true,
                readonly: true,
                person: {}
            },
            switchSign: APPCONFIG.signName || 'dianju',
            preauditTmpl: '#preauditInfoTmpl',
            preauditWrap: '#preauditInfoWrap',
            acceptTmpl: '#acceprInfoTmpl',
            acceptWrap: '#acceprInfoWrap',
            approveTmpl: '#auditInfoTmpl',
            approveWrap: '#auditInfoWrap',
            chargeTmpl: '#chargeInfoTmpl',
            chargeWrap: '#chargeInfoWrap',
            issueTmpl: '#issueInfoTmpl',
            issueWrap: '#issueInfoWrap',
            licenseTmpl: '#licenseInfoTmpl',
            licenseWrap: '#licenseInfoWrap',
            costTmpl: '#costInfoTmpl',
            costWrap: '#costInfoWrap',
            doneTmpl: '#doneInfoTmpl',
            doneWrap: '#doneInfoWrap',
            isApprove: false
        },

        _create: function() {
            oneself = this;
            oneself.$bizForms = $('#bizForms');
            oneself.$toolbar = $('#toolbar');
            oneself.$basicForm = $('#basicFormWrap');
            oneself.$bizForm = $('#bizForms');
            oneself.$credential = $('#credentials');
            oneself.$gotoPanel = $('.goto-canvas');
            oneself.setDataDone = 0;
            oneself.showToolbar = fly.utils.getQueryString('showToolbar') || true;
            workflow.projNo = workflow.projNo || fly.utils.getQueryString('projNo');
            workflow.registerFlag = fly.utils.getQueryString('registerFlag');
            if (workflow.linkCode != 'yzt_dj') {
                oneself.options.formReadonly = true;
                oneself.options.materialReadonly = true;
            }

        },

        _init: function() {
            //oneself._rderTab();
            if (workflow.projNo)
                oneself._loadViewData();
            else
                oneself._loadData();
        },

        _loadData: function() {
            var param = {
                itemId: workflow.serviceId,
                version: workflow.serviceVersion,
                linkCode: workflow.linkCode,
                projNo: workflow.projNo
            };
            $body.mask();
            oneself.request = 3;
            dao.getToolbarBtns(param).done(function(data) {
                oneself.request--;
                oneself.btnData = data.data || [];
                oneself._render();
            }).fail();
            dao.getForms(param).done(function(data) {
                oneself.request--;
                oneself.formData = data.data || [];
                oneself.printForms = {
                    normal: $.grep(data.data.printForms, function(n, i) {
                        return n.type == 3
                    }, false)
                };
                oneself._render();
            }).fail();
            dao.getCredentials(param).done(function(data) {
                oneself.request--;
                oneself.credData = data.data || [];
                oneself._render();
            }).fail();
            workflow.processPrintData = {};
        },

        _loadViewData: function() {
            var param = {
                itemId: workflow.serviceId,
                version: workflow.serviceVersion,
                linkCode: workflow.linkCode,
                projNo: workflow.projNo,
                workItemId: workflow.workItemId
            };
            oneself.request = 4;
            $body.mask();

            dao.getForms(param).done(function(data) {
                if (data.flag == 'true') {
                    var idata = data.data,
                        iprint = idata.printForms;
                    oneself.approveForms = idata.approveForms;
                    oneself.acceptForms = idata.acceptForms;
                    oneself.preauditForms = idata.preauditForms;
                    oneself.printForms = {
                        normal: $.grep(iprint, function(n, i) {
                            return n.type == 3
                        }, false)
                    };
                    oneself.confBizForms = idata.busiForms;
                }
                oneself.request--;
                oneself._render();
            }).fail();

            dao.getCredentials(param).done(function(data) {
                if (data.flag == 'true') {
                    oneself.approveMaterial = data.data;
                    oneself.acceptMaterial = data.data;
                }
                oneself.request--;
                oneself._render();
            }).fail();

            dao.getToolbarBtns(param).done(function(data) {
                oneself.btnData = data.data || [];
                oneself.request--;
                oneself._render();
            }).fail();

            dao.getProcessData(param).done(function(res) {
                if (res.flag === 'true') {
                    //登记节点
                    var data = res.data,
                        iprint = {};
                    $.each(data, function(i, obj) {
                        var ilink = obj.linkCode;
                        switch (ilink) {
                            case 'yzt_dj':
                                oneself.registNode = obj;
                                break;
                            case 'yzt_bj':
                                if (workflow.registerFlag != '1')
                                    oneself._rderDone(obj);
                                break;
                            case 'yzt_sl':
                                if (workflow.linkCode != 'yzt_sl') {
                                    if (workflow.registerFlag != '1')
                                        oneself._rderAccept(obj);
                                }
                                break;
                            case 'yzt_jf':
                                if (workflow.linkCode != 'yzt_jf') {
                                    if (workflow.registerFlag != '1')
                                        oneself._rderCost(obj, i);
                                }
                                break;
                            case 'yzt_zj':
                                if (workflow.linkCode != 'yzt_zj') {
                                    if (workflow.registerFlag != '1')
                                        oneself._rderLicense(obj, i);
                                }
                                break;
                            case 'yzt_special_sq':
                                if (workflow.linkCode != 'yzt_special_sq') {
                                    if (workflow.registerFlag != '1')
                                        oneself._rderSpecialApply(obj);
                                }
                                break;
                            case 'yzt_special_sl':
                                if (workflow.linkCode != 'yzt_special_sl') {
                                    if (workflow.registerFlag != '1')
                                        oneself._rderSpecialAccept(obj);
                                }
                                break;
                            default:
                                if (obj.linkCode.indexOf('yzt_sh') > -1) {
                                    if (workflow.registerFlag != '1')
                                        oneself._rderApprove(obj, i);
                                }
                                if (obj.linkCode.indexOf('yzt_sf') > -1) {
                                    if (workflow.registerFlag != '1') {
                                        oneself._rderCharge(obj, i);
                                    }
                                }
                                if (obj.linkCode.indexOf('yzt_fz') > -1) {
                                    if (workflow.registerFlag != '1') {
                                        oneself._rderIssue(obj, i);
                                    }
                                }
                                if (obj.linkCode.indexOf('yzt_ys') > -1) {
                                    if (workflow.registerFlag != '1')
                                        oneself._rderPreaudit(obj);
                                }
                                break;
                        }

                        var imtr = [];
                        if (obj.materialConfig && ilink.indexOf('yzt_special') < 0) {
                            $.merge(imtr, obj.materialConfig.necessary);
                            $.merge(imtr, obj.materialConfig.optional);
                            $.merge(imtr, obj.materialConfig.supplement);
                        }
                        iprint[ilink] = {
                            approveData: obj.approveData,
                            formData: oneself._formatFormData(obj.forms || []),
                            materialConfig: imtr,
                            linkCode: obj.linkCode,
                            linkName: obj.linkName
                        };

                    });
                    oneself.credData = oneself.registNode.materialConfig;
                    oneself.formData = {
                        baseForms: $.grep(oneself.registNode.forms, function(n, i) {
                            return n.formTypeCode === '1' || n.formTypeCode === ''
                        }, false),
                        busiForms: oneself._allBizForms($.grep(oneself.registNode.forms, function(n, i) {
                            return n.formTypeCode === '2'
                        }, false))
                    };
                    oneself.request--;
                    oneself._render();
                    workflow.processPrintData = iprint;
                } else {
                    $body.mask('remove');
                }
            }).fail();
        },

        _allBizForms: function(farr) {
            var cform = this.confBizForms,
                allForm = farr;
            if (workflow.registerFlag && cform && cform.length != farr.length) {
                $.each(cform, function(j, obj) {
                    if ($.grep(farr, function(n, i) {
                            return n.formCode === obj.code;
                        }, false).length == 0) {
                        allForm.push(obj);
                    }
                });
            }
            return allForm.sort(function(a, b) {
                return (a.orderIndex || a.sortOrder) > (b.orderIndex || b.sortOrder)
            });
        },

        _formatFormData: function(data) {
            var iform = {},
                basic = [],
                apply = [];
            basic = $.grep(data, function(n, i) {
                return n.formTypeCode == '1';
            }, false);
            apply = $.grep(data, function(n, i) {
                return n.formTypeCode != '1';
            }, false);
            if (basic[0]) {
                iform['basicForm'] = fly.json.evalJSON(basic[0].itemValuesJson);
            }
            if (apply.length == 1) {
                var itemValue = fly.json.evalJSON(apply[0].itemValuesJson);
                $.extend(iform, itemValue);
            } else {
                if (apply.length > 1) {
                    $.each(apply, function(j, jobj) {
                        var applyData = fly.json.evalJSON(jobj.itemValuesJson);
                        applyData[(jobj.code || jobj.formCode).replace(/[-]/g, '')] = fly.json.evalJSON(jobj.itemValuesJson);
                        $.extend(iform, applyData);
                    });
                }
            }
            return iform;
        },

        _render: function() {
            if (oneself.request == 0) {

                oneself._rderToolbar($.extend(oneself.options.toolbarOpts, {
                    buttons: oneself.btnData
                }));

                if (oneself.formData)
                    oneself._rderForms(oneself.formData.baseForms, oneself.formData.busiForms, oneself.credData);

                if (workflow.linkCode === 'yzt_sl') {
                    oneself.submitPanel.init('#acceptPanel', oneself.acceptForms, oneself.acceptMaterial);
                } else {
                    if (workflow.linkCode.indexOf('yzt_sh') > -1) {
                        oneself.submitPanel.init('#approvalPanel', oneself.approveForms, oneself.acceptMaterial);
                    } else if (workflow.linkCode.indexOf('yzt_sf') > -1) {
                        oneself.submitPanel.init('#chargePanel', oneself.approveForms, oneself.acceptMaterial);
                    } else if (workflow.linkCode.indexOf('yzt_ys') > -1) {
                        oneself.submitPanel.init('#preauditPanel', oneself.preauditForms, oneself.acceptMaterial);
                    } else if (workflow.linkCode.indexOf('yzt_fz') > -1) {
                        oneself.submitPanel.init('#issuePanel', oneself.approveForms, oneself.acceptMaterial);
                    }
                }
                oneself.judgePosition();
                oneself.addGotoEvents();
                $body.mask('remove');
            }
        },

        _rderTab: function() {
            oneself.$bizForms.tab({
                name: 'tabForm',
                isEdit: false,
                adding: true,
                onSelect: function($li) {
                    if (workflow.linkCode == 'yzt_dj') {
                        oneself.onSelectForm($li);
                    }
                }
            });
        },

        _rderToolbar: function(opts) {
            oneself.$toolbar.toolbar(opts);
            if (oneself.showToolbar === 'false') {
                oneself.$toolbar.hide();
            }
            oneself._withdraw();
        },

        _rderForms: function(base, biz, credData) {
            oneself.formNum = 1 + biz.length;
            oneself.setDataDone = oneself.formNum;
            //基础表单
            $.each(base, function(i, item) {
                if (i > 0)
                    return;
                var applyFormObj = oneself.formModel(item);

                //初始化证件持有者
                oneself.person = {
                    ownerIdcode: applyFormObj.itemValue.applyCardNumber,
                    ownerName: applyFormObj.itemValue.applyName
                }

                oneself.$basicForm.loadForm({
                    name: applyFormObj.formSign,
                    formData: fly.json.evalJSON(item.itemValuesJson),
                    formId: item.id,
                    itemShowPath: item.itemShowPath,
                    isFormShow: item.isFormShow,
                    stage: oneself.options.stage,
                    isView: oneself.options.formReadonly,
                    callback: function() {
                        var basicForm = this;
                        oneself.formNum--;
                        //暂存状态
                        if (workflow.linkCode == 'yzt_dj' && workflow.projNo) {
                            basicForm.action.element.bind('setDataComplete', function() {
                                oneself.setDataDone--;
                                oneself._rderCred(credData, oneself.person);
                            });
                        } else {
                            oneself._rderCred(credData, oneself.person);
                        }
                        basicForm.private = applyFormObj;
                        da.setBasicFormQuote(basicForm);
                    }
                });
                $('#basicFormName').text(applyFormObj.desc);
            });

            //业务表单
            if (biz.length) {
                oneself._rderTab();
                $.each(biz, function(i, item) {

                    var applyFormObj = oneself.formModel(item);

                    // 创建一个tab
                    oneself.$bizForm.data("flyTab").addTabForm({
                        name: applyFormObj.signGuid,
                        text: applyFormObj.desc
                    }, function() {

                        //在该tab下加载表单
                        $('[data-tab-content="' + applyFormObj.signGuid + '"]').loadForm({
                            name: applyFormObj.formSign,
                            formData: fly.json.evalJSON(item.itemValuesJson),
                            formId: item.id,
                            itemShowPath: item.itemShowPath,
                            isFormShow: item.isFormShow,
                            stage: oneself.options.stage,
                            isView: oneself.options.formReadonly,
                            callback: function() {
                                oneself.formNum--;
                                //暂存状态
                                if (workflow.linkCode == 'yzt_dj' && workflow.projNo) {
                                    this.action.element.bind('setDataComplete', function() {
                                        oneself.setDataDone--;
                                        oneself._rderCred(credData, oneself.person);
                                    });
                                } else {
                                    oneself._rderCred(credData, oneself.person);
                                }
                                this.private = applyFormObj;
                                da.setBizFormQuotes(this);
                            }
                        });
                    });
                });
                oneself.$bizForm.show().children(".fly-tab").children(".tab-ul").children().first().click();
                // 重新计算tab宽度
                oneself.$bizForm.data("flyTab").computeTabWidth(oneself.$bizForm.find('.tab-ul'));
            }

            oneself._getPrintForms(oneself.printForms);
        },

        _getPrintForms: function(data) {
            if (data)
                $('#toolbar').data('flyToolbar')._getPrintForms(data);
        },
        _withdraw: function() {
            $('#toolbar').data('flyToolbar')._withdraw();
        },

        //特别程序申请
        _rderSpecialApply: function(data) {
            $('#specialInfoWrap').append($('#specialApplyTmpl').tmpl(data)).parent().show();
        },
        //特别程序受理
        _rderSpecialAccept: function(data) {
            $('#specialInfoWrap').append($('#specialAcceptTmpl').tmpl(data)).parent().show();
        },
        _rderPreaudit: function(data) {
            var imtr = data.materialConfig;
            data.hasForms = data.forms.length > 0;
            data.hasMaterial = imtr.materials.length > 0;
            data.theSignName = data.approveData.projNo + data.linkCode;
            $(oneself.options.preauditTmpl).tmpl(data).appendTo(oneself.options.preauditWrap);
            $(oneself.options.preauditWrap).parent().show();
            var $node = $('.preauditTable[data-id="' + data.approveData.id + '"]'),
                $nodeForm = $node.find('.approval-form-view-wrapper'),
                $signTarget = $node.find('.span-sign-target'),
                $websign = $node.find('.sealBtn'),
                signWidget;
            //加载受理表单
            if (data.forms.length) {
                $nodeForm.tab({
                    name: 'preauditViewForm',
                    isEdit: false,
                    adding: true,
                    onSelect: function($li) {
                        oneself.onSelectForm($li);
                    }
                });
                $.each(data.forms, function(i, item) {
                    var applyFormObj = oneself.formModel(item);
                    // 创建一个tab
                    $nodeForm.data("flyTab").addTabForm({
                        name: applyFormObj.signGuid,
                        text: applyFormObj.desc
                    }, function() {
                        //在该tab下加载表单
                        $('[data-tab-content="' + applyFormObj.signGuid + '"]').loadForm({
                            name: applyFormObj.formSign,
                            formData: fly.json.evalJSON(item.itemValuesJson),
                            formId: item.id,
                            itemShowPath: item.itemShowPath,
                            isFormShow: item.isFormShow,
                            stage: 0,
                            isView: true
                        });
                    });
                });
                $nodeForm.children(".fly-tab").children(".tab-ul").children().first().click();
            }
            if (data.forms.length == 1) {
                $nodeForm.children(".fly-tab").addClass('hide');
            }
            //加载预审材料
            oneself.loadMaterialView($node, data.materialConfig);
            //加载印章
            if (data.approveData.signInfoCode != '') {
                var signInfoCode = {
                    signInfoCode: data.approveData.signInfoCode
                };
                oneself.createWebsign($websign, data.approveData.operateOpinion);
                signWidget = $websign.data('flyWebsign');
                if ((APPCONFIG.signName == 'jinge' || APPCONFIG.signName == 'jingeh5')) {
                    //使用文档id请求金格印章
                    signWidget && signWidget.setSeal(signInfoCode.signInfoCode);
                } else {
                    var theNodeNo = data.approveData.projNo + data.linkCode;
                    // 获取签章信息
                    dao.getSignInfo(signInfoCode).done(function(res) {
                        if (res) {
                            signWidget.setSeal(res.signInfo, 1);
                        }
                    }).fail(function() {});
                }
            }
        },
        /**
         * 受理信息表格
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        _rderAccept: function(data) {
            var imtr = data.materialConfig;
            data.hasForms = data.forms.length > 0;
            data.hasMaterial = imtr.materials.length > 0;
            data.theSignName = data.approveData.projNo + data.linkCode;
            $(oneself.options.acceptTmpl).tmpl(data).appendTo(oneself.options.acceptWrap);
            $(oneself.options.acceptWrap).parent().show();
            var $node = $('.acceptTable[data-id="' + data.approveData.id + '"]'),
                $nodeForm = $node.find('.approval-form-view-wrapper'),
                $signTarget = $node.find('.span-sign-target'),
                $websign = $node.find('.sealBtn'),
                signWidget;
            //加载受理表单
            if (data.forms.length) {
                $nodeForm.tab({
                    name: 'acceptViewForm',
                    isEdit: false,
                    adding: true,
                    onSelect: function($li) {
                        oneself.onSelectForm($li);
                    }
                });
                $.each(data.forms, function(i, item) {
                    var applyFormObj = oneself.formModel(item);
                    // 创建一个tab
                    $nodeForm.data("flyTab").addTabForm({
                        name: applyFormObj.signGuid,
                        text: applyFormObj.desc
                    }, function() {
                        //在该tab下加载表单
                        $('[data-tab-content="' + applyFormObj.signGuid + '"]').loadForm({
                            name: applyFormObj.formSign,
                            formData: fly.json.evalJSON(item.itemValuesJson),
                            formId: item.id,
                            itemShowPath: item.itemShowPath,
                            isFormShow: item.isFormShow,
                            stage: 0,
                            isView: true
                        });
                    });
                });
                $nodeForm.children(".fly-tab").children(".tab-ul").children().first().click();
                // 重新计算tab宽度
                //$nodeForm.data("flyTab").computeTabWidth($nodeForm.find('.tab-ul'));
            }
            if (data.forms.length == 1) {
                $nodeForm.children(".fly-tab").addClass('hide');
            }
            //加载受理材料
            oneself.loadMaterialView($node, data.materialConfig);
            //加载印章
            if (data.approveData.signInfoCode != '') {
                var signInfoCode = {
                    signInfoCode: data.approveData.signInfoCode
                };
                oneself.createWebsign($websign, data.approveData.operateOpinion);
                signWidget = $websign.data('flyWebsign');
                if ((APPCONFIG.signName == 'jinge' || APPCONFIG.signName == 'jingeh5')) {
                    //使用文档id请求金格印章
                    signWidget && signWidget.setSeal(signInfoCode.signInfoCode);
                } else if (APPCONFIG.signName == 'geer') {
                    //格尔签章

                    var theNodeNo = data.approveData.projNo + data.linkCode;
                    // 获取签章信息
                    dao.getSignInfo(signInfoCode).done(function(res) {
                        if (res) {
                            signWidget.setSeal(res.signInfo);
                        }
                    }).fail(function() {});
                } else {
                    var theNodeNo = data.approveData.projNo + data.linkCode;
                    // 获取签章信息
                    dao.getSignInfo(signInfoCode).done(function(res) {
                        if (res) {
                            signWidget.setSeal(res.signInfo, 1);
                        }
                    }).fail(function() {});
                }
            }
        },

        /**
         * 创建印章控件对象
         * @param  {[type]} $ele       [description]
         * @param  {[type]} verifyData [description]
         * @return {[type]}            [description]
         */
        createWebsign: function($ele, verifyData) {
            var options = fly.utils.parseOptions($ele.data('signOptions'));
            options.verifyData = verifyData;
            $ele.websign(options);
        },

        /**
         * 审核环节信息表格
         * @param  {[type]} data  [description]
         * @param  {[type]} index [description]
         * @return {[type]}       [description]
         */
        _rderApprove: function(data, index) {
            var imtr = data.materialConfig;
            data.hasForms = data.forms.length > 0;
            data.hasMaterial = imtr.materials.length > 0;
            //新老数据使用不同的印章name
            if (data.approveData.signImg) {
                data.theSignName = data.approveData.projNo + data.linkCode;
            } else {
                //老数据
                data.theSignName = data.approveData.nodeNo;
            }
            if (APPCONFIG.signName == 'jingeh5') {
                data.theSignName = data.approveData.projNo + data.linkCode;
            }
            $(oneself.options.approveTmpl).tmpl(data).appendTo(oneself.options.approveWrap);
            $(oneself.options.approveWrap).parent().show();
            var $node = $('.auditTable[data-id="' + data.approveData.id + '"]'),
                $nodeForm = $node.find('.approval-form-view-wrapper'),
                $signTarget = $node.find('.span-sign-target'),
                $websign = $node.find('.sealBtn'),
                signWidget;
            if (data.forms.length) {
                //加载审核表单
                $nodeForm.tab({
                    name: 'approveViewForm',
                    isEdit: false,
                    adding: true,
                    onSelect: function($li) {
                        oneself.onSelectForm($li);
                    }
                });
                $.each(data.forms, function(i, item) {
                    var applyFormObj = oneself.formModel(item);
                    // 创建一个tab
                    $nodeForm.data("flyTab").addTabForm({
                        name: applyFormObj.signGuid,
                        text: applyFormObj.desc
                    }, function() {
                        //在该tab下加载表单
                        $('[data-tab-content="' + applyFormObj.signGuid + '"]').loadForm({
                            name: applyFormObj.formSign,
                            formData: fly.json.evalJSON(item.itemValuesJson),
                            formId: item.id,
                            itemShowPath: item.itemShowPath,
                            isFormShow: item.isFormShow,
                            stage: 0,
                            isView: true
                        });
                    });
                });
                $nodeForm.children(".fly-tab").children(".tab-ul").children().first().click();
                // 重新计算tab宽度
                //$nodeForm.data("flyTab").computeTabWidth($nodeForm.find('.tab-ul'));
            }
            if (data.forms.length == 1) {
                $nodeForm.children(".fly-tab").addClass('hide');
            }
            //加载审核材料
            oneself.loadMaterialView($node, data.materialConfig);
            //加载签章
            if (data.approveData.signInfoCode != '') {
                var signInfoCode = {
                    signInfoCode: data.approveData.signInfoCode
                };
                oneself.createWebsign($websign, data.approveData.operateOpinion);
                signWidget = $websign.data('flyWebsign');
                if ((APPCONFIG.signName == 'jinge' || APPCONFIG.signName == 'jingeh5')) {
                    //使用文档id请求金格印章
                    signWidget && signWidget.setSeal(signInfoCode.signInfoCode);
                } else {
                    // 获取签章信息
                    dao.getSignInfo(signInfoCode).done(function(res) {
                        if (res) {
                            signWidget.setSeal(res.signInfo, 1);
                        }
                    }).fail(function() {});
                }
            }
        },

        /**
         * 审核收费信息表格
         * @param  {[type]} data  [description]
         * @param  {[type]} index [description]
         * @return {[type]}       [description]
         */
        _rderCharge: function(data, index) {
            var imtr = data.materialConfig;
            data.hasForms = data.forms.length > 0;
            data.hasMaterial = imtr.materials.length > 0;
            //新老数据使用不同的印章name
            if (data.approveData.signImg) {
                data.theSignName = data.approveData.projNo + data.linkCode;
            } else {
                //老数据
                data.theSignName = data.approveData.nodeNo;
            }
            $(oneself.options.chargeTmpl).tmpl(data).appendTo(oneself.options.chargeWrap);
            $(oneself.options.chargeWrap).parent().show();
            var $node = $('.chargeTable[data-id="' + data.approveData.id + '"]'),
                $nodeForm = $node.find('.approval-form-view-wrapper'),
                $signTarget = $node.find('.span-sign-target'),
                $websign = $node.find('.sealBtn'),
                signWidget;
            if (data.forms.length) {
                //加载审核表单
                $nodeForm.tab({
                    name: 'chargeViewForm',
                    isEdit: false,
                    adding: true,
                    onSelect: function($li) {
                        oneself.onSelectForm($li);
                    }
                });
                $.each(data.forms, function(i, item) {
                    var applyFormObj = oneself.formModel(item);
                    // 创建一个tab
                    $nodeForm.data("flyTab").addTabForm({
                        name: applyFormObj.signGuid,
                        text: applyFormObj.desc
                    }, function() {
                        //在该tab下加载表单
                        $('[data-tab-content="' + applyFormObj.signGuid + '"]').loadForm({
                            name: applyFormObj.formSign,
                            formData: fly.json.evalJSON(item.itemValuesJson),
                            formId: item.id,
                            itemShowPath: item.itemShowPath,
                            isFormShow: item.isFormShow,
                            stage: 0,
                            isView: true
                        });
                    });
                });
                $nodeForm.children(".fly-tab").children(".tab-ul").children().first().click();
            }
            if (data.forms.length == 1) {
                $nodeForm.children(".fly-tab").addClass('hide');
            }
            //加载审核材料
            oneself.loadMaterialView($node, data.materialConfig);

        },

        /**
         * 审核发证信息表格
         * @param  {[type]} data  [description]
         * @param  {[type]} index [description]
         * @return {[type]}       [description]
         */
        _rderIssue: function(data, index) {
            var imtr = data.materialConfig;
            data.hasForms = data.forms.length > 0;
            data.hasMaterial = imtr.materials.length > 0;
            //新老数据使用不同的印章name
            if (data.approveData.signImg) {
                data.theSignName = data.approveData.projNo + data.linkCode;
            } else {
                //老数据
                data.theSignName = data.approveData.nodeNo;
            }
            $(oneself.options.issueTmpl).tmpl(data).appendTo(oneself.options.issueWrap);
            $(oneself.options.issueWrap).parent().show();
            var $node = $('.issueTable[data-id="' + data.approveData.id + '"]'),
                $nodeForm = $node.find('.approval-form-view-wrapper'),
                $signTarget = $node.find('.span-sign-target'),
                $websign = $node.find('.sealBtn'),
                signWidget;
            if (data.forms.length) {
                //加载发证表单
                $nodeForm.tab({
                    name: 'issueViewForm',
                    isEdit: false,
                    adding: true,
                    onSelect: function($li) {
                        oneself.onSelectForm($li);
                    }
                });
                $.each(data.forms, function(i, item) {
                    var applyFormObj = oneself.formModel(item);
                    // 创建一个tab
                    $nodeForm.data("flyTab").addTabForm({
                        name: applyFormObj.signGuid,
                        text: applyFormObj.desc
                    }, function() {
                        //在该tab下加载表单
                        $('[data-tab-content="' + applyFormObj.signGuid + '"]').loadForm({
                            name: applyFormObj.formSign,
                            formData: fly.json.evalJSON(item.itemValuesJson),
                            formId: item.id,
                            itemShowPath: item.itemShowPath,
                            isFormShow: item.isFormShow,
                            stage: 0,
                            isView: true
                        });
                    });
                });
                $nodeForm.children(".fly-tab").children(".tab-ul").children().first().click();
            }
            if (data.forms.length == 1) {
                $nodeForm.children(".fly-tab").addClass('hide');
            }
            //加载发证材料
            oneself.loadMaterialView($node, data.materialConfig);

        },

        /**
         * 审核缴费信息表格
         * @param  {[type]} data  [description]
         * @param  {[type]} index [description]
         * @return {[type]}       [description]
         */
        _rderCost: function(data, index) {
            $(oneself.options.costTmpl).tmpl(data).appendTo(oneself.options.costWrap);
            $(oneself.options.costWrap).parent().show();
        },

        /**
         * 审核证件信息表格
         * @param  {[type]} data  [description]
         * @param  {[type]} index [description]
         * @return {[type]}       [description]
         */
        _rderLicense: function(data, index) {
            $(oneself.options.licenseTmpl).tmpl(data).appendTo(oneself.options.licenseWrap);
            $(oneself.options.licenseWrap).parent().show();
        },

        /**
         * 审核区域材料展示
         * @param  {[type]} $node     [description]
         * @param  {[type]} materials [description]
         * @return {[type]}           [description]
         */
        loadMaterialView: function($node, materials) {
            var options = {
                readonly: true,
                grouping: false
            };
            $.merge(materials.necessary, materials.optional);
            $.merge(materials.necessary, materials.supplement);
            options.necessary = materials.necessary;
            if (options.necessary.length > 0) {
                $node.find('.data-material-viewwrap').credentials(options);
            }
        },

        /**
         * 办结信息表格
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        _rderDone: function(data) {
            var $node = $('#doneTable'),
                imtr = data.materialConfig;
            data.hasForms = data.forms.length > 0;
            data.hasMaterial = imtr.materials.length > 0;
            $(oneself.options.doneWrap).parent().show();
            $(oneself.options.doneTmpl).tmpl(data).appendTo(oneself.options.doneWrap);
            var $nodeForm = $node.find('.approval-form-view-wrapper');
            if (data.forms.length) {
                //加载审核表单
                $nodeForm.tab({
                    name: 'doneViewForm',
                    isEdit: false,
                    adding: true,
                    onSelect: function($li) {
                        oneself.onSelectForm($li);
                    }
                });
                $.each(data.forms, function(i, item) {
                    var applyFormObj = oneself.formModel(item);
                    // 创建一个tab
                    $nodeForm.data("flyTab").addTabForm({
                        name: applyFormObj.signGuid,
                        text: applyFormObj.desc
                    }, function() {
                        //在该tab下加载表单
                        $('[data-tab-content="' + applyFormObj.signGuid + '"]').loadForm({
                            name: applyFormObj.formSign,
                            formData: fly.json.evalJSON(item.itemValuesJson),
                            formId: item.id,
                            itemShowPath: item.itemShowPath,
                            isFormShow: item.isFormShow,
                            stage: 0,
                            isView: true
                        });
                    });
                });
                $nodeForm.children(".fly-tab").children(".tab-ul").children().first().click();
                // 重新计算tab宽度
                $nodeForm.data("flyTab").computeTabWidth($nodeForm.find('.tab-ul'));
            }
            if (data.forms.length == 1) {
                $nodeForm.children(".fly-tab").addClass('hide');
            }
            //加载审核材料
            oneself.loadMaterialView($node, imtr);
        },

        _rderCred: function(credData, person) {
            //表单全部加载完成再渲染材料
            if (oneself.formNum === 0 && !oneself.credloaded) {
                oneself.credloaded = true;
                setTimeout(function() {
                    oneself.options.credOpts.person = person;
                    $.extend(oneself.options.credOpts, credData);
                    oneself.options.credOpts.readonly = oneself.options.materialReadonly;
                    oneself.$credential.credentials(oneself.options.credOpts);
                    oneself.$credential.data('loaded', true);
                    $.dialog.data('credPerson', person);

                    if ($('#credentials').height() > 0) {
                        $('.explain-remark').removeClass('hide');
                    }
                    //表单材料加载完成判断页面是否有滚动条
                    if (document.body.scrollHeight <= document.body.offsetHeight) {
                        $('#backToTop').parent().hide();
                        $('.icon-quick-wrap[data-type="backToTop"]').hide();
                    }
                }, 200);
            }
        },

        // 根据审批意见框的位置设定快捷定位的显示
        judgePosition: function() {
            if (oneself.panelId) {
                var topDistance = document.getElementById(oneself.panelId.replace('#', '')).getBoundingClientRect().top,
                    screenHeight = window.innerHeight,
                    distance = Number(screenHeight - topDistance);

                if (distance <= 0) {
                    oneself.$gotoPanel.removeClass('hide');
                } else {
                    oneself.$gotoPanel.addClass('hide');
                }
            }
            if (document.body.getBoundingClientRect().top == 0) {
                $('.goto-top').hide();
            } else {
                $('.goto-top').show();
            }
        },

        addGotoEvents: function() {
            window.onscroll = oneself.judgePosition;
            var $gotoApprove = $('.goto-approve'),
                $gotoTop = $('.goto-top');
            // 快捷锚点定位
            $gotoApprove.mouseover(function() {
                if (workflow.linkCode === 'yzt_sl') {
                    $gotoApprove.removeClass('approve-photo').addClass('word-background').text('处理意见');
                } else if (workflow.linkCode.indexOf('yzt_sh') > -1) {
                    $gotoApprove.removeClass('approve-photo').addClass('word-background').text('处理意见');
                }
            }).mouseleave(function() {
                $gotoApprove.removeClass('word-background').addClass('approve-photo').text('');
            });
            // 快捷锚点定位
            $gotoTop.mouseover(function() {
                $gotoTop.removeClass('top-photo').addClass('word-background').text('回到顶端');
            }).mouseleave(function() {
                $gotoTop.removeClass('word-background').addClass('top-photo').text('');
            });
            //特别程序附件下载
            $('#specialStepTable').on('click', '.link-file-download', function(e) {
                var $this = $(e.currentTarget),
                    path = $this.data('path'),
                    name = $this.text();
                window.open(CONTEXTPATH + '/common/file/download.do?fileid=' + encodeURIComponent(path) + '&fileName=' + encodeURIComponent(name.substr(0, name.lastIndexOf('.'))), '_blank');
            });
        },

        renderSignButton: function(id) {
            var $panel = $(id),
                signName = workflow.projNo + workflow.linkCode;
            var targetId = 'sign_' + signName;
            $panel.find('.stamp-btn').show();
            $panel.find('.span-sign-target').attr('id', targetId);
            //设置签章绑定元素的id
            $panel.find('.stamp-btn').websign({
                name: signName,
                target: signName,
                positionTarget: targetId,
                dataBindTarget: id + ' textarea'
            });
        },

        submitPanel: {
            init: function(id, forms, materials) {
                oneself.deleteFileList = '';
                oneself.$panel = $(id);
                oneself.panelForm = $(id).find('.canvas-form');
                //受理审核面板id
                oneself.panelId = id;
                $(oneself.panelId).removeClass('hide');
                oneself.$gotoPanel.attr('href', oneself.panelId);
                oneself.$gotoPanel.removeClass('hide');
                oneself.judgePosition();
                $('.goto-approve').attr('href', oneself.panelId);
                $('.anchor .goto-approve').removeClass('hide');
                //审核受理表单
                oneself.submitPanel.loadForms(forms);
                //审核受理材料
                oneself.submitPanel.loadMaterials(materials);
                //审核受理常用意见
                oneself.submitPanel.addNormalOpinionCombobox();
                oneself.submitPanel.getNormalOpinionDict();
                oneself.submitPanel.addEvent();
                //处理人信息
                var userT = setInterval(function() {
                    if (yztUser.userName) {
                        oneself.$panel.find('.canvas-inscribe').append($('#handlerTmpl').tmpl({
                            handler: yztUser.userName,
                            handleDept: yztUser.deptName
                        }));
                        clearInterval(userT);
                    }
                }, 1000);
            },
            loadMaterials: function(materials) {
                var options = {
                    readonly: false,
                    grouping: false,
                    person: oneself.person
                };
                $.merge(materials.necessary, materials.optional);
                $.merge(materials.necessary, materials.supplement);
                options.necessary = materials.necessary;
                if (options.necessary.length > 0) {
                    $(oneself.panelId).find('.canvas-upload').show();
                    var $theMtr = $(oneself.panelId).find('.form-content-credentials');
                    $theMtr.credentials(options);
                    $theMtr.data('flyCredentials').getAllCred();
                }
            },
            loadForms: function(data) {
                if (data.length == 0) return;
                oneself.$panel.find('.toggle-form-content').removeClass('hide');
                oneself.panelForm.tab({
                    name: 'approveTabForm',
                    isEdit: false,
                    adding: true,
                    onSelect: function($li) {
                        var index = $li.prev('li').length;
                        //当前tab内的filebtn
                        $('input[name="' + $('[data-tab-content="' + $li.attr('name') + '"]').find('.headphoto-local').attr('id') + '"][type="file"]').parent().show();
                        //隐藏tab内的filebtn
                        $('[data-tab-content="' + $li.attr('name') + '"]').siblings().find('.headphoto-local').each(function(i, obj) {
                            $('input[name="' + $(obj).attr('id') + '"][type="file"]').hide();
                            $('input[name="' + $(obj).attr('id') + '"][type="file"]').eq(index).show();
                        });
                    }
                });
                $.each(data, function(i, item) {
                    var applyFormObj = oneself.formModel(item);
                    // 创建一个tab
                    oneself.panelForm.data("flyTab").addTabForm({
                        name: applyFormObj.signGuid,
                        text: applyFormObj.desc
                    }, function() {
                        //在该tab下加载表单
                        $('[data-tab-content="' + applyFormObj.signGuid + '"]').loadForm({
                            name: applyFormObj.formSign,
                            formData: fly.json.evalJSON(item.itemValuesJson),
                            formId: item.id,
                            itemShowPath: item.itemShowPath,
                            isFormShow: item.isFormShow,
                            stage: 0,
                            isView: false,
                            callback: function() {
                                this.private = applyFormObj;
                                da.setAcceptFormQuotes(this, applyFormObj);
                                da.setApproveFormQuote(this, applyFormObj);
                                da.setPreauditFormQuote(this, applyFormObj);
                                da.setChargeFormQuote(this, applyFormObj);
                                da.setIssueFormQuote(this, applyFormObj);
                            }
                        });
                    });
                });
                oneself.panelForm.children(".fly-tab").children(".tab-ul").children().first().click();
                // 重新计算tab宽度
                oneself.panelForm.data("flyTab").computeTabWidth(oneself.panelForm.find('.tab-ul'));
                if (data.length == 1) {
                    oneself.panelForm.children(".fly-tab").addClass('hide');
                }
            },
            addEvent: function() {
                var eventControl = oneself.submitPanel.eventControl,
                    $theTArea = $(oneself.panelId + ' .canvas-textarea textarea');
                // 绑定审核表单折叠、展开事件
                $(document).on('click', '#toggle_form_content_btn', eventControl.toggleApprovalForm);
                //审批意见框最大字符限制
                $theTArea.on('keyup', function() {
                    if (this.value.length > 200) {
                        this.value = this.value.substr(0, 200);
                        $(this).testRemind("最多只能输入200个字符");
                    }
                });
                $theTArea.on('blur', function() {
                    if (this.value.length > 200) {
                        this.value = this.value.substr(0, 200);
                        $(this).testRemind("最多只能输入200个字符");
                    }
                });
            },
            eventControl: {
                // 审核表单折叠、展开
                toggleApprovalForm: function() {
                    var formObj = $(oneself.panelId + ' .canvas-form'),
                        $toggBtn = $(oneself.panelId + ' #toggle_form_content_btn');
                    if (formObj.hasClass('hide')) { // 审核表单隐藏状态
                        formObj.removeClass('hide');
                        $toggBtn.addClass('toggle-form-content-btn-fold');
                        $toggBtn.attr('title', '折叠表单');
                    } else { // 审核表单展示状态
                        formObj.addClass('hide');
                        $toggBtn.removeClass('toggle-form-content-btn-fold');
                        $toggBtn.attr('title', '展开表单');
                    };
                }
            },
            // 获取常用意见字典项
            getNormalOpinionDict: function() {
                var $wrap = $(oneself.panelId);
                dao.getDict('spyj').done(function(response) {
                    $('#normalOpi_selections_tmpl').tmpl(response).appendTo($wrap.find('#normalOpi_selections_ul'));
                    // 常用意见点击、失焦事件
                    $(oneself.panelId + ' .canvas-textarea .label').on('click', function(event) {
                        var $selections = $('#normalOpi_selections');
                        var $this = $(this);
                        var $textarea = $wrap.find('.canvas-textarea textarea');

                        if (!$textarea.hasClass('disabled')) { // 盖章后点击无效
                            if ($this.children('#normalOpi').length) {
                                if ($selections.hasClass('hide')) {
                                    $selections.removeClass('hide');
                                } else {
                                    $selections.addClass('hide');
                                };
                            } else {
                                $selections.addClass('hide');
                            };
                        };
                    });
                    // 父页面点击，常用意见失焦事件
                    $(top.document).on('click', function(event) {
                        var targetId = $(event.target).attr('id'),
                            targetTitle = $(event.target).attr('title');
                        if (targetId != 'normalOpi' && targetTitle != '审批意见' && targetTitle != '处理意见' && targetId != 'normalOpi_btn') {
                            $('#normalOpi_selections').addClass('hide');
                        }
                    });
                    // 选择常用意见赋值
                    $('#normalOpi_selections li').on('click', function() {
                        var opinion = $(this).text();
                        $wrap.find('.canvas-textarea textarea').val(opinion);
                    });
                }).fail(function(msg) {});
            },
            // 增加常用意见下拉框
            addNormalOpinionCombobox: function() {
                var $tmpl = $('<div id="normalOpi" class="normalOpi-wrap">' +
                    '<a id="normalOpi_btn" class="normalOpi-btn" href="javascript:void(0);"></a>' +
                    '<div id="normalOpi_selections" class="normalOpi-selections hide">' +
                    '<ul id="normalOpi_selections_ul"></ul>' +
                    '<ins class="arrow"><i></i></ins>' +
                    '</div>' +
                    '</div>');
                var $label = $(oneself.panelId + ' .canvas-textarea .label')
                $label.css('overflow', 'visible');
                $tmpl.appendTo($label);
            }
        },
        formModel: function(item) {
            // 判断版本号，如果是整型转换成浮点型
            if (String(item.formVersion).indexOf('.') < 0) {
                item.formVersion = item.formVersion + '.0';
            }
            return {
                formCode: (item.code || item.formCode),
                formVersion: item.formVersion,
                formSign: (item.code || item.formCode) + '-' + item.formVersion,
                signGuid: fly.utils.generateGUID(item.code || item.formCode),
                formName: item.desc || item.name || item.formName,
                desc: item.desc || item.name || item.formName,
                formVersion: item.formVersion,
                itemShowPath: item.itemShowPath,
                sortOrder: item.orderIndex || item.sortOrder,
                formTypeCode: item.formTypeCode || item.type,
                itemValuesJson: "",
                itemValue: fly.json.evalJSON(item.itemValuesJson)
            }
        },
        onSelectForm: function($li) {
            var index = $li.prev('li').length;
            //当前tab内的filebtn
            $('input[name="' + $('[data-tab-content="' + $li.attr('name') + '"]').find('.headphoto-local').attr('id') + '"][type="file"]').parent().show();
            //隐藏tab内的filebtn
            $('[data-tab-content="' + $li.attr('name') + '"]').siblings().find('.headphoto-local').each(function(i, obj) {
                $('input[name="' + $(obj).attr('id') + '"][type="file"]').hide();
                $('input[name="' + $(obj).attr('id') + '"][type="file"]').eq(index).show();
            });
        }

    });

    $('#basicFormWrap').delegate('[name="applyCardNumber"]', 'change', function() {
        var applyCardNumber = $(this).val();
        var sfzhm = $.extend($(this), rules.idcard);
        var $card = $(this).closest('.control').data('flyIdcard');
        if (!$card) {
            return;
        }
        if ($card && $card.options && $card.options.valid) {
            var validTitle = $card.options.valid.title;
            // 如果当前非身份证，则不执行
            if (validTitle && validTitle.indexOf('身份证') < 0) {
                return;
            }
        }
        if (!applyCardNumber || !sfzhm.defineValid(applyCardNumber)) {
            return;
        }
        $('body').mask({
            content: '正在加载数据...'
        });
        $.ajax({
            url: CONTEXTPATH + '/apasinfo/getHistoryApasByApplyIdNum.do',
            data: {
                applyCardNumber: applyCardNumber,
                serviceId: workflow.serviceId
            },
            dataType: 'json',
            type: 'post',
            success: function(res) {
                if (res.failCode == '-1') {
                    $('body').mask('remove');
                    return;
                }
                if (res.data && res.data.length > 0) {
                    var html = $('#historyProjTmpl').tmpl(res).html();
                    $.dialog({
                        content: html,
                        width: 800,
                        height: 100,
                        lock: true,
                        ok: true,
                        okVal: '确定',
                        title: '历史办件',
                    });
                } else {
                    $.dialog({
                        content: '该申请人未办理过该事项。',
                        width: 300,
                        height: 100,
                        ok: true,
                        okVal: '确定',
                        title: '历史办件',
                    })
                }
                $('body').mask('remove');
            },
            error: function() {
                $('body').mask('remove');
            }
        });
    });

}));
