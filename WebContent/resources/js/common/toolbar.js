/**
 * 办事项页面工具栏
 * @authors zywu2
 * @date    2015-07-16
 */

(function(factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define([
            "jquery",
            "fly",
            "commonDao",
            "message",
            'da',
            'bizDao',
            'rules',
            'ajaxdownload'
        ], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function($, fly, dao, message, assemble, navDao, commonRule, ajaxdownload) {

    workflow.serviceVersion = workflow.serviceVersion || fly.utils.getQueryString('version');

    var self = {};
    var util = fly.utils;
    var $credentials = $('#credentials');
    var TOPWIN = top.window;

    //弹框页面地址
    var popUrls = {
        getProcessUrl: CONTEXTPATH + '/apasinfo/flow-query.do?projid=' + workflow.projNo, //流程查询页面地址
        viewRegistUrl: CONTEXTPATH + '/flow/view.do?serviceId=' + workflow.serviceId + '&projNo=', //登记查看页面
        credRepairUrl: CONTEXTPATH + '/flow/check-material.do?projNo=' + workflow.projNo, //补齐补正
        credRepairEditUrl: CONTEXTPATH + '/flow/complete-material.do?projNo=' + workflow.projNo, //补齐补正材料上传
        viewAcceptUrl: CONTEXTPATH + '/flow/view.do?serviceId=' + workflow.serviceId + '&projNo=' + workflow.projNo, //受理查看页面
        printFormUrl: CONTEXTPATH + '/flow/print.do?workItemId=' + workflow.workItemId + '&projNo=' + workflow.projNo, //打印表单页面
        printRegistFormUrl: CONTEXTPATH + '/flow/print.do', //登记打印表单页面
        viewApproveUrl: CONTEXTPATH + '/flow/view.do?projNo=' + workflow.projNo, // 审核中心查看页面地址
        viewHistoryUrl: CONTEXTPATH + '/flow/view.do?itemId=' + workflow.serviceId + '&linkCode=' + workflow.linkCode + '&version=' + workflow.serviceVersion + '&projNo=',
        projectCheckUrl: APPCONFIG.projectCheckUrl,
        faceRecognitionUrl: APPCONFIG.faceRecognizeUrl
    };

    //确认框提示语
    var confirmTips = {
        save: '确认暂存吗？',
        submit: '确认提交吗？',
        back: '确认要打回该事项吗？',
        printReceipt: '',
        accept: '确认要受理该事项吗？',
        refuse: '确认不予受理吗？',
        repaire: '补齐补正',
        getProcesses: '流程查询',
        del: '确认要删除该记录吗？',
        abandon: '确认要废弃该记录吗？',
        revoke: '确认要回收该记录吗？',
        dfl: '提示',
        bouncingmail: '确认要退件吗？',
        acceptBack: '确认要退回吗？',
        specialProcedures: '特别程序申请',
        withdraw: '确认要撤回该事项吗？',
        refaudit: '确认预审不通过吗？',
        auditpass: '确认预受理吗？',
        pricingpass: '确认核价通过吗？',
        chargepass: '确认收费吗？',
        enterpass: '确认录入发证信息吗？',
        issuepass:'确认发证吗？'
    };
    //遮罩文本
    var maskTips = {
        save: '正在暂存',
        submit: '正在提交',
        back: '正在打回',
        printReceipt: '正在打印回执单',
        accept: '正在受理',
        refuse: '正在不予受理',
        repaire: '正在补齐补正',
        getProcesses: '',
        del: '正在删除',
        abandon: '正在废弃',
        revoke: '正在回收',
        dfl: '正在请求',
        bouncingmail: '正在退件',
        acceptBack: '正在退回',
        specialProcedures: '正在申请',
        withdraw: '正在撤回',
        refaudit:'正在预审不通过',
        auditpass:'正在预审受理',
        pricingpass: '正在核价通过',
        chargepass: '正在收费',
        enterpass:'正在录入',
        issuepass:'正在发证'
    };
    //确认框表单布局
    var popHtml = '<div class="form-content form-content-control" style="width:500px;border:none;padding: 15px 10px 10px 0;">' +
        '<form data-fly-form id="grxx">' +
        '</form>' +
        '</div>';
    var secondPopHtml = '<div class="form-content form-content-control" style="width:500px;border:none;padding: 0;">' +
        '<div id="confirmTip" style="width: 500px; height: 100px; text-align: center; line-height: 110px;">' + '</div>' +
        '<form data-fly-form id="grxx">' +
        '</form>' +
        '</div>';
    var auditcenterFinishPopHtml = '<div class="form-content form-content-control" style="width:250px;border:none;padding: 0;">' +
        '<div id="confirmTip" style="width: 250px; height: 100px; text-align: center; line-height: 110px;">' + '</div>' +
        '<form data-fly-form id="grxx">' +
        '</form>' +
        '</div>';
    var formFlag = '',
        tipFlag = '';
    var nextPhaseNotify = {
            title: '给接收人发送',
            name: 'nextPhaseNotify',
            type: 'checkbox',
            width: '1/2',
            labelWidth: 115,
            textField: 'mc',
            valueField: 'dm',
            data: [{
                mc: '消息',
                dm: '1'
            }, {
                mc: '短信',
                dm: '2'
            }],
            initValue: APPCONFIG.nextPhaseNotifyVal
        },
        applyerNotify = {
            title: '给申请人发送',
            name: 'applyerNotify',
            type: 'checkbox',
            width: '1/2',
            labelWidth: 90,
            textField: 'mc',
            valueField: 'dm',
            data: [{
                mc: '消息',
                dm: '1'
            }, {
                mc: '短信',
                dm: '2'
            }],
            initValue: APPCONFIG.applyerNotifyVal
        };
    var fields = {
        auditpass: [{
                title: '受理原因',
                name: 'remark',
                type: 'textarea',
                required: true,
                width: '1',
                labelWidth: 80
            },
            applyerNotify
        ],
        refuse: [{
                title: '不予受理原因',
                name: 'remark',
                type: 'textarea',
                required: true,
                width: '1',
                labelWidth: 80
            },
            applyerNotify
        ],
        refaudit: [{
                title: '不通过原因',
                name: 'remark',
                type: 'textarea',
                required: true,
                width: '1',
                labelWidth: 80
            },
            applyerNotify
        ],
        abandon: [{
                title: '作废原因',
                name: 'abandonReason',
                type: 'combobox',
                required: true,
                labelWidth: 60,
                width: '1'
            }, {
                title: '备注',
                name: 'abandonRemark',
                type: 'textarea',
                width: '1',
                labelWidth: 60
            },
            nextPhaseNotify, applyerNotify
        ],
        back: [{
                title: '打回原因',
                name: 'backReason',
                type: 'textarea',
                required: true,
                width: '1',
                labelWidth: 80
            },
            nextPhaseNotify, applyerNotify
        ],
        bouncingmail: [{
                title: '退件原因',
                name: 'bouncingmailReason',
                type: 'textarea',
                required: true,
                width: '1',
                labelWidth: 80
            },
            applyerNotify
        ],
        accept: [{
            title: '受理意见',
            name: 'curHandleOpinion',
            type: 'textarea',
            value: '同意',
            required: true,
            width: '1',
            labelWidth: 80
        }],
        acceptBack: [{
                title: '退回原因',
                name: 'curHandleOpinion',
                type: 'textarea',
                required: true,
                width: '1',
                labelWidth: 80
            },
            nextPhaseNotify, applyerNotify
        ],
        universal: [nextPhaseNotify, applyerNotify],
        auditcenterFinish: [{
            title: '给申请人发送',
            name: 'applyerNotify',
            type: 'checkbox',
            width: '1',
            labelWidth: 90,
            textField: 'mc',
            valueField: 'dm',
            data: [{
                mc: '消息',
                dm: '1'
            }, {
                mc: '短信',
                dm: '2'
            }],
            initValue: APPCONFIG.applyerNotifyVal
        }],
        specialProcedures: [{
                title: '特别程序种类',
                name: 'type',
                type: 'combobox',
                required: true,
                width: '2/3',
                labelWidth: 110,
                dict: 'tscxlb'
            }, {
                title: '特别程序时限',
                name: 'timeLimit',
                type: 'text',
                required: true,
                width: '1/2',
                labelWidth: 110,
                number: true,
                fraction: 0
            }, {
                title: '特别程序启动原因',
                name: 'startReason',
                type: 'textarea',
                required: true,
                width: '1',
                labelWidth: 110
            },
            nextPhaseNotify, applyerNotify
        ],
        onlyAppler: [applyerNotify]
    };
    //验证
    var fieldValid = {
        accept: {
            curHandleOpinion: {
                required: true,
                max: 500
            }
        },
        refuse: {
            remark: {
                required: true,
                max: 500
            }
        },
        abandon: {
            abandonReason: {
                title: '原因',
                required: true,
                max: 500
            },
            abandonRemark: {
                required: true,
                max: 50
            }
        },
        back: {
            backReason: {
                required: true,
                max: 200
            }
        },
        refaudit: {
        	remark: {
                required: true,
                max: 200
            }
        },
        bouncingmail: {
            bouncingmailReason: {
                required: true,
                max: 500
            }
        },
        acceptBack: {
            curHandleOpinion: {
                required: true,
                max: 500
            }
        },
        specialProcedures: {
            timeLimit: {
                required: true,
                type: 'number',
                min: 0,
                max: 999
            },
            startReason: {
                required: true,
                max: 500
            }
        }
    };

    var succTip = function(text, callback) {
        $.tip({
            type: 'success',
            text: text
        });
        $('#toolbar .btn').attr('disabled', true).addClass('btn-disabled');
        var t = setTimeout(function() {
            callback && callback();
        }, 3000);
    };

    var projectCheckParam = {};

    return $.widget("fly.toolbar", {

        defaultElement: '',

        options: {
            buttons: [],
            functionMap: {
                'registcenterSubmit': 'registcenterSubmit',
                'registcenterTempsave': 'registcenterTempsave',
                'print': 'print',
                'acceptcenterAccept': 'acceptcenterAccept',
                'acceptcenternotaccept': 'acceptcenternotaccept',
                'acceptcenterSavePatchInfo': 'acceptcenterSavePatchInfo',
                'acceptcenterBack': 'acceptcenterBack',
                'auditcenterSubmit': 'auditcenterSubmit',
                'auditcenterBack': 'auditcenterBack',
                'auditcenterTerminate': 'auditcenterTerminate',
                'auditcenterFinish': 'auditcenterFinish',
                'stamp': 'stamp',
                'processQuery': 'processQuery',
                'printReceipt': 'printReceipt',
                'itemExport': 'itemExport',
                'readGuide': 'readGuide',
                'projectCheck': 'projectCheck',
                'faceRecognition': 'faceRecognition',
                'backToTop': 'backToTop',
                'specialProcedures': 'specialProcedures',
                'withdraw': 'withdraw',
                'preauditSubmit': 'preauditSubmit',
                'preauditNoPass': 'preauditNoPass',
                'preauditReject': 'preauditReject',
                'pricingSubmit':'pricingSubmit',
                'chargeSubmit':'chargeSubmit',
                'evaluateBtn': 'evaluateBtn',
                'issueSubmit':'issueSubmit',
                'issueCenterSubmit':'issueCenterSubmit'
            }
        },

        _create: function() {
            self = this;

            self.$rightBar = $('#rightButtonBar');

            self.$anchor = $('.anchor');

            self.registMsgHtm = secondPopHtml;

            //权限
            this._loadButtons();
            //绑定事件
            this._addEvent();
        },

        _loadButtons: function() {
            var htmT = [],
                htmR = [],
                icon = [],
                panelId;

            //如果存在登记提交按钮，即打印表单时需校验数据
            self.isRegist = ($.grep(self.options.buttons, function(n, i) {
                return n.czCode == 'registcenterSubmit'
            }, false)).length > 0;
            $.each(self.options.buttons, function(i, iobj) {
                if (iobj.czCode == 'stamp') {
                    workflow.hasStamp = true;
                    if(workflow.linkCode == 'yzt_sl'){
                    	panelId = 'acceptPanel';
                    } else if(workflow.linkCode.indexOf('yzt_sh') > -1){
                    	panelId = 'approvalPanel';
                    } else {
                    	panelId = 'chargePanel';
                    }
                    workflow.$stamp = $('#' + panelId).find('.stamp-btn');
                    $('body').data('flyEntrance').renderSignButton('#' + panelId);
                } else {
                    iobj.backgroundColor = iobj.backgroundColor.replace('#', '');
                    var ihtm = '<div class="button-wrap">' + '<button type="button" id="' + iobj.czCode + '" class="btn ell" style="background:#' + (iobj.backgroundColor || 'ADD370') + ';" title="' + iobj.btnName + '" data-type="' + iobj.czCode + '">' + iobj.btnName + '</button>' + '</div>';
                    if (iobj.btnPosition == '001') {
                        htmT.push(ihtm);
                    } else {
                        htmR.push(ihtm);
                    }
                }
                if (iobj.btnPosition == '002') {
                    var iname = iobj.btnName.length > 4 ? iobj.btnName.substr(0, 3) + '..' : iobj.btnName;
                    var ipath = iobj.iconPath ? (CONTEXTPATH + '/file/download.do?fileid=' + iobj.iconPath) : (APPCONFIG.formResourceContext + 'img/write-option.png');
                    icon.push('<div class="icon-quick-wrap" data-type="' + iobj.czCode + '" title="' + iobj.btnName + '"><img src="' + ipath + '" class="icon-quick-btn"><span>' + iname + '</span></div>');
                }
                if (iobj.czCode == 'projectCheck') {
                    projectCheckParam = iobj.paramContent;
                    window.projectCheckParam = projectCheckParam;
                }
            });
            self.element.append(htmT.join(''));
            self.$anchor.prepend(icon.join(''));
            if (htmT.length == 0) {
                self.element.addClass('empty-toolbar');
                $('.bizcontent').addClass('biz-without-tool');
                return;
            } else {
                $('.bizcontent').css('padding-top', [$('.bizheader').height() + 10, 'px'].join(''));
            }
            //1024分辨率下调整右侧悬浮按钮位置
            if (screen.availWidth <= 1024) {
                $('.anchor').css('margin-left', '450px');
            }
        },

        _getPrintForms: function(data) {
            var self = this;
            var htm = [],
                htm2 = [],
                param = {
                    linkCode: workflow.linkCode,
                    projNo: workflow
                };
            //普通打印表单
            $.each(data.normal, function(i, obj) {
                htm.push('<div class="print-link ell text-left link-normal-form" data-code="' + obj.code + '-' + obj.formVersion + '" title="' + obj.desc + '" data-havedependform="'+obj.haveDependForm+'" data-dependformcode="'+obj.dependFormCode+'" data-dependformversion="'+obj.dependFormVersion+'" data-dependformname="'+obj.dependFormName+'">' + obj.desc + '</div>');
            });
            if (htm.length > 0 && workflow.projNo != '') {
                this.hasPrintForms = true;
                var isRight = self.element.find('#print').length ? '' : 'top:-' + (htm.length * 26 + 10) + 'px;';
                $('#print').after('<div class="toolbar-pop" style="' + isRight + '">' + htm.join('') + '</div>');
                $('.icon-quick-wrap[data-type="print"]').append('<div class="toolbar-pop" style="' + isRight + '">' + htm.join('') + '</div>');
            } else {
                // 如果没有打印表单，禁用打印按钮
                $('#print').addClass('disabled').attr('disabled', 'disabled');
            }

            dao.getProcessRecieptEnable({
                linkCode: workflow.linkCode,
                projNo: workflow.projNo
            }).done(function(res) {
                if (res.flag == "true") {
                    //回执单
                    $.each(res.data, function(i, obj) {
                        htm2.push('<div class="print-link ell text-left link-reciept" data-id="' + obj.id + '" title="' + obj.hzdmc + '" data-havedependform="'+obj.haveDependForm+'" data-dependformcode="'+obj.dependFormCode+'" data-dependformversion="'+obj.dependFormVersion+'" data-dependformname="'+obj.dependFormName+'">' + obj.hzdmc + '</div>');
                    });
                    if (htm2.length > 0 && workflow.projNo != '') {
                        self.hasPrintReceipt = true;
                        var isRight = self.element.find('#printReceipt').length ? '' : 'top:-' + (htm2.length * 26 + 10) + 'px;';
                        $('#printReceipt').after('<div class="toolbar-pop" style="' + isRight + '">' + htm2.join('') + '</div>');
                        $('.icon-quick-wrap[data-type="printReceipt"]').append('<div class="toolbar-pop" style="' + isRight + '">' + htm2.join('') + '</div>');
                    } else {
                        // 如果没有打印表单，禁用打印按钮
                        $('#printReceipt').addClass('disabled').attr('disabled', 'disabled');
                    }
                }
            }).fail();
        },

        //暂存
        registcenterTempsave: function() {
            if (this._save) {
                this._save();
                return;
            }
            var self = this;
            var data = assemble.getAssemblyData({
                operateFlag: 0
            });
            if (!data) return;
            self._standardDao({
                content: confirmTips.save,
                maskContent: maskTips.save,
                dao: dao.save,
                data: data,
                callback: function(res) {
                    location.href = CONTEXTPATH + '/flow/apply.do?projNo=' + res.projNo + '&version=' + workflow.serviceVersion;
                }
            });
        },

        //登记提交
        registcenterSubmit: function() {
            if (this._submit) {
                this._submit();
                return;
            }
            var self = this;
            var data = assemble.getAssemblyData({
                operateFlag: 1
            });
            if (!data) return;
            formFlag = 'universal';
            tipFlag = confirmTips.submit;
            self._standardDao({
                content: secondPopHtml,
                maskContent: maskTips.submit,
                dao: dao.submit,
                data: data,
                callback: function(res) {
                    self._viewRegist(res.projNo);
                    self.refreshNum();
                },
                getDataCall: function() {
                    var obj = self.$confirmForm.data('flyForm').getData();

                    return {
                        messageRequest: fly.json.toJSON({
                            nextPhaseNotify: obj.nextPhaseNotify,
                            applyerNotify: obj.applyerNotify
                        })
                    };
                }
            });
        },

        //审核提交
        auditcenterSubmit: function($this, state) {
            var self = this,
                daoAddress; //接口地址
            var data,
                content = state == '2' ? auditcenterFinishPopHtml : secondPopHtml;
            // 判断是否是审批完成的提交
            if (state == '2') {
                data = assemble.getApproveAssemblyData({
                    operateFlag: '2'
                });
                if (!data) return;
                daoAddress = dao.approveEnd;
                formFlag = 'auditcenterFinish';
            } else {
                var data = assemble.getApproveAssemblyData({
                    operateFlag: '1'
                });
                if (!data) return;
                daoAddress = dao.approveSubmit;
                formFlag = 'universal';
            }
            tipFlag = confirmTips.submit;
            self._standardDao({
                content: content,
                maskContent: maskTips.submit,
                dao: daoAddress,
                data: data,
                callback: function(res) {
                    self._viewApprove();
                    self.refreshNum();
                },
                getDataCall: function() {
                    var obj = self.$confirmForm.data('flyForm').getData();

                    return {
                        messageRequest: fly.json.toJSON({
                            nextPhaseNotify: obj.nextPhaseNotify,
                            applyerNotify: obj.applyerNotify
                        })
                    };
                }
            });
        },

        //审批完成
        auditcenterFinish: function($this) {
            this.auditcenterSubmit($this, '2');
        },

        //打回
        auditcenterBack: function() {
            var self = this,
                backData = assemble.getApproveBackAssemblyData({
                    operateFlag: '0',
                    linkCode: ''
                });
            formFlag = 'back';
            if (!backData) return;
            self._standardDao({
                title: confirmTips.back,
                content: popHtml,
                maskContent: maskTips.back,
                dao: dao.back,
                data: {},
                callback: function(res) {
                    self._viewApprove();
                    self.refreshNum();
                },
                getDataCall: function() {
                    // 获取打回意见
                    var textareaVal = self.$confirmForm.data('flyForm').getData({
                        valid: fieldValid.back
                    });
                    // 如果不符合条件
                    if (!textareaVal) {
                        return;
                    }
                    // 将打回意见放入backData中
                    backData.nodeData.operateOpinion = textareaVal.backReason;
                    // 返回的参数进行处理
                    backData.nodeData = fly.json.toJSON(backData.nodeData);

                    backData.messageRequest = fly.json.toJSON({
                        nextPhaseNotify: textareaVal.nextPhaseNotify,
                        applyerNotify: textareaVal.applyerNotify
                    });
                    return backData;
                }
            });
        },

        //退件
        auditcenterTerminate: function() {
            var self = this,
                bouncingmailData = assemble.getApproveBackAssemblyData({
                    operateFlag: '2'
                });
            formFlag = 'bouncingmail';
            if (!bouncingmailData) return;
            self._standardDao({
                title: confirmTips.bouncingmail,
                content: popHtml,
                maskContent: maskTips.bouncingmail,
                dao: dao.bouncingmail,
                data: {},
                callback: function(res) {
                    self._viewApprove();
                    self.refreshNum();
                },
                getDataCall: function() {
                    // 获取退件意见
                    var textareaVal = self.$confirmForm.data('flyForm').getData({
                        valid: fieldValid.bouncingmail
                    });
                    if (!textareaVal) {
                        return;
                    }
                    // 将退件意见放入bouncingmailData中
                    bouncingmailData.nodeData.operateOpinion = textareaVal.bouncingmailReason;
                    // 返回的参数进行处理
                    bouncingmailData.nodeData = fly.json.toJSON(bouncingmailData.nodeData);
                    // 发送消息信息
                    bouncingmailData.messageRequest = fly.json.toJSON({
                        nextPhaseNotify: textareaVal.nextPhaseNotify,
                        applyerNotify: textareaVal.applyerNotify
                    });

                    return bouncingmailData;
                }
            });
        },

        //受理
        acceptcenterAccept: function() {
            var self = this,
                data = assemble.getAcceptAssemblyData({
                    operateFlag: 1
                });
            if (!data)
                return;
            formFlag = 'universal';
            tipFlag = confirmTips.accept;
            self._standardDao({
                content: secondPopHtml,
                maskContent: maskTips.accept,
                dao: dao.acceptBiz,
                data: data,
                callback: function(res) {
                    self._viewAccept(res);
                    self.refreshNum();
                },
                getDataCall: function() {
                    var obj = self.$confirmForm.data('flyForm').getData();

                    return {
                        messageRequest: fly.json.toJSON({
                            nextPhaseNotify: obj.nextPhaseNotify,
                            applyerNotify: obj.applyerNotify
                        })
                    };
                }
            });
        },

        //不予受理
        acceptcenternotaccept: function() {
            var self = this,
                data = {
                    projNo: workflow.projNo,
                    workItemId: workflow.workItemId,
                    operateFlag: 7
                };
            formFlag = 'refuse';
            self._standardDao({
                title: confirmTips.refuse,
                content: popHtml,
                maskContent: maskTips.refuse,
                dao: dao.refuseBiz,
                data: data,
                callback: function(res) {
                    self._viewAccept(res);
                    self.refreshNum();
                },
                getDataCall: function() {
                    var formData = self.$confirmForm.data('flyForm').getData({
                        valid: fieldValid.refuse
                    });

                    if (!formData) {
                        return false;
                    } else {
                        formData.messageRequest = fly.json.toJSON({
                            nextPhaseNotify: formData.nextPhaseNotify,
                            applyerNotify: formData.applyerNotify
                        });
                        return formData;
                    }
                }
            });
        },

        // 受理退回
        acceptcenterBack: function() {
            var self = this,
                data = {
                    projNo: workflow.projNo,
                    workItemId: workflow.workItemId,
                    operateFlag: 0
                };
            formFlag = 'acceptBack';
            self._standardDao({
                title: confirmTips.acceptBack,
                content: popHtml,
                maskContent: maskTips.acceptBack,
                dao: dao.acceptBack,
                data: data,
                callback: function(res) {
                    self._viewAccept(res);
                    self.refreshNum();
                },
                getDataCall: function() {
                    var formData = self.$confirmForm.data('flyForm').getData({
                        valid: fieldValid.acceptBack
                    });
                    if (!formData) {
                        return false;
                    } else {
                        formData.messageRequest = fly.json.toJSON({
                            nextPhaseNotify: formData.nextPhaseNotify,
                            applyerNotify: formData.applyerNotify
                        });
                        return formData;
                    }
                }
            });
        },

        // 特殊程序申请
        specialProcedures: function() {
            var self = this,
                data = {
                    projNo: workflow.projNo,
                    workItemId: workflow.workItemId
                };
            formFlag = 'specialProcedures';
            self._standardDao({
                title: confirmTips.specialProcedures,
                content: popHtml,
                maskContent: maskTips.specialProcedures,
                dao: dao.specialProceduresApply,
                data: data,
                callback: function(res) {
                    self._viewAccept(res);
                    self.refreshNum();
                },
                getDataCall: function() {
                    var formData = self.$confirmForm.data('flyForm').getData({
                        valid: fieldValid.specialProcedures
                    });
                    if (!formData) {
                        return false;
                    } else {
                        return {
                            type: formData.type,
                            timeLimit: formData.timeLimit,
                            startReason: formData.startReason,
                            messageRequest: fly.json.toJSON({
                                nextPhaseNotify: formData.nextPhaseNotify,
                                applyerNotify: formData.applyerNotify
                            })
                        }
                    }
                }
            });
        },

        //删除
        _del: function() {
            var self = this;
            self._standardDao({
                content: confirmTips.del,
                maskContent: maskTips.del,
                dao: dao.submit,
                data: {}
            });
        },

        //废弃
        _abandon: function() {
            var self = this;
            formFlag = 'abandon';
            self._standardDao({
                title: confirmTips.abandon,
                content: popHtml,
                maskContent: maskTips.abandon,
                dao: dao.submit,
                data: {},
                getDataCall: function() {
                    var formData = self.$confirmForm.data('flyForm').getData({
                        valid: fieldValid.abandon
                    });
                    if (!formData) {
                        return false;
                    } else {
                        formData.messageRequest = fly.json.toJSON({
                            nextPhaseNotify: formData.nextPhaseNotify,
                            applyerNotify: formData.applyerNotify
                        });
                        return formData;
                    }
                }
            });
        },

        // 审批区域弹出框
        _openAuditArea: function() {
            var url = CONTEXTPATH + '/bizApprove/auditarea.do';

            $.dialog.open(url, {
                id: 'auditAreaDialog',
                title: '审批意见',
                width: 1000,
                height: 441,
                padding: 0
            });
        },

        // 提交审批意见
        _submitApprovalOpinion: function() {
            // var $approvalOpinionDialog = $(window.frames[0].document);
            $('#yes').trigger('click');
        },

        //流程查询
        processQuery: function() {
            bizUtil.queryProcedure(workflow.projNo);
        },

        //补齐补正
        acceptcenterSavePatchInfo: function() {
            var self = this;
            self._openCredRepairPop();
        },

        //预审受理
        preauditSubmit: function() {
            var self = this,
                /*data = {
                    projNo: workflow.projNo,
                    workItemId: workflow.workItemId,
                    operateFlag: 1
                };*/
            data = assemble.getPreauditAssemblyData({
                operateFlag: 1
            });
            if (!data)
            return;
            data.workItemId = workflow.workItemId;
            formFlag = 'universal';
            tipFlag = confirmTips.auditpass;
            self._standardDao({
                content: secondPopHtml,
                maskContent: maskTips.auditpass,
                dao: dao.getPreAuditPass,
                data: data,
                callback: function(res) {
                    self._viewAccept(res);
                    self.refreshNum();
                },
                getDataCall: function() {
                    var obj = self.$confirmForm.data('flyForm').getData();

                    return {
                        messageRequest: fly.json.toJSON({
                            nextPhaseNotify: obj.nextPhaseNotify,
                            applyerNotify: obj.applyerNotify
                        })
                    };
                }
            });
        },
        //预审-打回
        preauditReject: function() {
            var self = this,
                backData = assemble.getApproveBackAssemblyData({
                    operateFlag: '0',
                    linkCode: ''
                });
            formFlag = 'back';
            if (!backData) return;
            self._standardDao({
                title: confirmTips.back,
                content: popHtml,
                maskContent: maskTips.back,
                dao: dao.getPreAuditReject,
                data: {},
                callback: function(res) {
                    self._viewApprove();
                    self.refreshNum();
                },
                getDataCall: function() {
                    // 获取打回意见
                    var textareaVal = self.$confirmForm.data('flyForm').getData({
                        valid: fieldValid.back
                    });
                    // 如果不符合条件
                    if (!textareaVal) {
                        return;
                    }
                    // 将打回意见放入backData中
                    backData.remark = textareaVal.backReason;

                    backData.messageRequest = fly.json.toJSON({
                        nextPhaseNotify: textareaVal.nextPhaseNotify,
                        applyerNotify: textareaVal.applyerNotify
                    });
                    return backData;
                }
            });
        },

        //预审不通过
        preauditNoPass: function() {
            var self = this,
            data = {
                    projNo: workflow.projNo,
                    workItemId: workflow.workItemId,
                    operateFlag: 7
                };
            //formFlag = 'onlyAppler';
            formFlag = 'refaudit';
            self._standardDao({
                title: confirmTips.refaudit,
                content: popHtml,
                maskContent: maskTips.refaudit,
                dao: dao.getPreAuditNoPass,
                data: data,
                callback: function(res) {
                    self._viewAccept(res);
                    self.refreshNum();
                },
                getDataCall: function() {
                	var formData = self.$confirmForm.data('flyForm').getData({
                        valid: fieldValid.refaudit
                    });

                    if (!formData) {
                        return false;
                    } else {
                        formData.messageRequest = fly.json.toJSON({
                            nextPhaseNotify: formData.nextPhaseNotify,
                            applyerNotify: formData.applyerNotify
                        });
                        return formData;
                    }
                }
            });
        }, 
        //核价
        pricingSubmit: function() {
            var self = this,
            linkCode = workflow.linkCode.substr(0, 6);
            //预审中心核价
            if(linkCode ==='yzt_ys'){
            	data = assemble.getPreauditAssemblyData({
            		operateFlag: 1
            	});
            }else if (linkCode ==='yzt_sh'){
            	//审核中心核价
            	var data = assemble.getApproveAssemblyData({
            		operateFlag: '1'
            	});
            }else if (linkCode ==='yzt_sl'){
            	//受理中心核价
            	var data = assemble.getAcceptAssemblyData({
            		operateFlag: '1'
            	});
            }
            if (!data) return;
            data.workItemId = workflow.workItemId;
            data.currentActivityId=workflow.linkCode;
            formFlag = 'universal';
            tipFlag = confirmTips.pricingpass;
            self._standardDao({
                content: secondPopHtml,
                maskContent: maskTips.pricingpass,
                dao: dao.pricingSubmit,
                data: data,
                callback: function(res) {
                    self._viewAccept(res);
                    self.refreshNum();
                },
                getDataCall: function() {
                    var obj = self.$confirmForm.data('flyForm').getData();

                    return {
                        messageRequest: fly.json.toJSON({
                            nextPhaseNotify: obj.nextPhaseNotify,
                            applyerNotify: obj.applyerNotify
                        })
                    };
                }
            });
        },
        //收费
        chargeSubmit: function() {
            var self = this;
        	data = assemble.getChargeAssemblyData({
        		operateFlag: 1
        	});
            if (!data) return;
            data.currentActivityId=workflow.linkCode;
            formFlag = 'universal';
            tipFlag = confirmTips.chargepass;
            self._standardDao({
                content: secondPopHtml,
                maskContent: maskTips.chargepass,
                dao: dao.chargeSubmit,
                data: data,
                callback: function(res) {
                    self._viewAccept(res);
                    self.refreshNum();
                },
                getDataCall: function() {
                    var obj = self.$confirmForm.data('flyForm').getData();

                    return {
                        messageRequest: fly.json.toJSON({
                            nextPhaseNotify: obj.nextPhaseNotify,
                            applyerNotify: obj.applyerNotify
                        })
                    };
                }
            });
        },
        //发证信息录入
        issueSubmit: function() {
            var self = this;
            linkCode = workflow.linkCode.substr(0, 6);
            //预审中心发证录入
            if(linkCode ==='yzt_ys'){
            	var data = assemble.getPreauditAssemblyData({
            		operateFlag: 1
            	});
            }else if (linkCode ==='yzt_sh'){
            	//审核中心发证录入
            	var data = assemble.getApproveAssemblyData({
            		operateFlag: '1'
            	});
            }else if (linkCode ==='yzt_sl'){
            	//受理中心发证录入
            	var data = assemble.getAcceptAssemblyData({
            		operateFlag: '1'
            	});
            }
            if (!data) return;
            data.currentActivityId=workflow.linkCode;
            formFlag = 'universal';
            tipFlag = confirmTips.enterpass;
            self._standardDao({
                content: secondPopHtml,
                maskContent: maskTips.enterpass,
                dao: dao.issueSubmit,
                data: data,
                callback: function(res) {
                    self._viewAccept(res);
                    self.refreshNum();
                },
                getDataCall: function() {
                    var obj = self.$confirmForm.data('flyForm').getData();

                    return {
                        messageRequest: fly.json.toJSON({
                            nextPhaseNotify: obj.nextPhaseNotify,
                            applyerNotify: obj.applyerNotify
                        })
                    };
                }
            });
        },
        //发证中心发证
        issueCenterSubmit: function() {
            var self = this;
        	var data = assemble.getIssueAssemblyData({
        		operateFlag: '1'
        	});
            if (!data) return;
            data.currentActivityId=workflow.linkCode;
            formFlag = 'universal';
            tipFlag = confirmTips.issuepass;
            self._standardDao({
                content: secondPopHtml,
                maskContent: maskTips.issuepass,
                dao: dao.issueCenterSubmit,
                data: data,
                callback: function(res) {
                    self._viewAccept(res);
                    self.refreshNum();
                },
                getDataCall: function() {
                    var obj = self.$confirmForm.data('flyForm').getData();

                    return {
                        messageRequest: fly.json.toJSON({
                            nextPhaseNotify: obj.nextPhaseNotify,
                            applyerNotify: obj.applyerNotify
                        })
                    };
                }
            });
        },
        //格式化数据
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

        //登记，受理和审核环节页面数据获取
        _getLinkEditData: function() {
            var data = {},
                isValid = false,
                obj = {},
                ilink = workflow.linkCode.substr(0, 6),
                apr = {},
                param = {
                    operateFlag: 0,
                    isPrint: true
                };
            switch (ilink) {
                case 'yzt_dj':
                    data = assemble.getAssemblyData(param);
                    if (data) isValid = true;
                    break;
                case 'yzt_sl':
                    data = assemble.getAcceptAssemblyData(param);
                    if (data) {
                        isValid = true;
                        apr = {
                            curHandleOpinion: data.curHandleOpinion
                        };
                    }
                    break;
                case 'yzt_sh':
                    data = assemble.getApproveAssemblyData(param);
                    if (data) {
                        isValid = true;
                        apr = fly.json.evalJSON(data.nodeData);
                    }
                    break;
                case 'yzt_ys':
                    data = assemble.getPreauditAssemblyData(param);
                    if (data) {
                        isValid = true;
                        apr = fly.json.evalJSON(data.nodeData);
                    }
                    break;
            }
            if (!isValid) return null;
            var thisFd = fly.json.evalJSON(data.formData).applyForms;
            obj[workflow.linkCode] = {
                approveData: apr,
                formData: self._formatFormData(typeof thisFd == 'object' ? thisFd : fly.json.evalJSON(thisFd)),
                materialConfig: fly.json.evalJSON(data.credData),
                linkName: workflow.linkName
            };
            return obj;
        },

        _isPrintEdit: function() {
            return workflow.linkCode == 'yzt_dj' || workflow.linkCode == 'yzt_sl' || workflow.linkCode.indexOf('yzt_sh') > -1;
        },

        //打印回执单
        printReceipt: function(id, $ele) {
            var self = this;
            if (!$ele) {
                if (!self.hasPrintReceipt) {
                    $.tip({
                        type: 'warning',
                        text: '无可打印内容'
                    });
                }
                return false;
            }
            //登记环节的回执单需要分两步获取回执单
            if (self._isPrintEdit()) {
                var data = self._getLinkEditData();
                if (!data) return;
                var param = {
                    id: id,
                    itemId: workflow.serviceId,
                    version: workflow.serviceVersion,
                    jsonValue: fly.json.toJSON($.extend(workflow.processPrintData, data))
                };
            } else {
                var param = {
                    id: id,
                    itemId: workflow.serviceId,
                    version: workflow.serviceVersion,
                    projNo: workflow.projNo
                };
            }
            $('body').mask({
                content: '正在查询'
            });
            dao.getRecieptTempPdf(param).done(function(res) {
                $('body').mask('remove');
                if (res.flag == 'true') {
                    var url = CONTEXTPATH + '/common/file/downloadFastdfs.do?fileid=' + res.data;
                    message.openPrintWindow(url);
                } else {
                    $.tip({
                        type: 'warning',
                        text: '获取回执单失败'
                    });
                }
            }).fail(function() {
                $('body').mask('remove');
            });
        },

        //打印表单
        print: function(code, $ele) {
            var self = this;
            if (!$ele) {
                if (!self.hasPrintForms) {
                    $.tip({
                        type: 'warning',
                        text: '无可打印内容'
                    });
                }
                return false;
            }
            //登记环节需先进行暂存校验
            if (self._isPrintEdit()) {
                var data = self._getLinkEditData();
                if (!data) return;
                param = {
                    formSign: code,
                    jsonValue: fly.json.toJSON($.extend(workflow.processPrintData, data))
                };
            } else {
                param = {
                    formSign: code,
                    jsonValue: fly.json.toJSON(workflow.processPrintData)
                };
            }
 
 
            var  haveDependForm = $ele.data("havedependform"); 

            if(haveDependForm=="1"){ // 编辑表单
                var dependFormCode = $ele.data("dependformcode"); 
                var dependFormVersion = $ele.data("dependformversion");
                var dependFormName = $ele.data("dependformname"); 
                var timestamp=new Date().getTime(); 
                localStorage.setItem('printData'+timestamp,param.jsonValue);  
                var url=CONTEXTPATH+"/flow/editPrintForm.do?formSign="+code+"&printData=printData"+timestamp+"&dependFormCode="+dependFormCode+"&dependFormVersion="+dependFormVersion+"&dependFormName="+dependFormName;
                self.openDialog(url);
                return;
            }
            else{
                $('body').mask({
                    content: '正在查询'
                });
                dao.loadPDFForm(param).done(function(res) {
                    $('body').mask('remove');
                    if (res.flag == 'true') {
                        var url = CONTEXTPATH + '/common/file/downloadFastdfs.do?fileid=' + res.data;
                        message.openPrintWindow(url);
                    } else {
                        $.tip({
                            type: 'warning',
                            text: '获取打印表单失败'
                        });
                    }
                }).fail(function() {
                    $('body').mask('remove');
                });
            } 

        },

        openDialog: function(url) {
           TOPWIN.printFormDialog = $.dialog.open(url, {
                title: '打印表单',
                width: 1000,
                height: 500,
                padding: '10px'
            });
        },

        // 办事项导出
        itemExport: function() {
            var url = CONTEXTPATH + '/itemCommon/detailZipDown.do?projNo=' + workflow.projNo;
            TOPWIN.$('body').mask({
                content: '正在导出...'
            });
            $.download(url, 'post');

            //window.open(url, '_self');
        },
        _withdraw: function() {
            var data = {
                projNo: workflow.projNo
            };
            $('#withdraw').addClass('hide');
            util.ajax.post('/apasinfo/isAbleToWithdraw.do', data, 'text')
                .done(function(data) {
                    data = util.toObj(data);
                    if (data.data) {
                        $('#withdraw').removeClass('hide')
                    }
                });
        },
        // 撤回
        withdraw: function() {
            var data = {
                projNo: workflow.projNo
            };
            formFlag = 'withdraw';
            tipFlag = confirmTips.withdraw;
            self._standardDao({
                content: secondPopHtml,
                maskContent: maskTips.withdraw,
                dao: function(data) {
                    var obj = new util.ajaxObj(),
                        options = $.extend({}, obj.options);
                    options.before();
                    util.ajax.post('/apasinfo/withdraw.do', data, 'text')
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
                data: data,
                callback: function(res) {
                    location.href = CONTEXTPATH + '/flow/view.do?projNo=' + workflow.projNo + '&version=' + workflow.serviceVersion;
                }
            });
        },

        //查看指南
        readGuide: function() {
            var url = CONTEXTPATH + '/apasinfo/handleguide.do?itemId=' + workflow.serviceId + '&version=' + workflow.serviceVersion + '&linkCode=' + workflow.linkCode;
            message.openOnlyPage(url);
        },

        //回到顶部
        backToTop: function() {
            window.scrollTo(0, 0);
        },

        _viewRegist: function(res) {
            popUrls.viewHistoryUrl = popUrls.viewHistoryUrl + res;
            location.href = popUrls.viewHistoryUrl;
        },

        _viewAccept: function() {
            location.href = popUrls.viewHistoryUrl + workflow.projNo;
        },

        _viewApprove: function() {
            location.href = popUrls.viewHistoryUrl + workflow.projNo;
        },

        // 根据表单名称和字段名称查找校验规则
        findValidByName: function(formName, name) {
            var iaction = {};
            var ivalid = {};
            if (formName) {
                $.each(assemble.applyForm, function(i, obj) {
                    if (obj.action.element.find('form').attr('name') == formName) {
                        iaction = obj.action;
                        return false;
                    }
                });
            } else {
                iaction = assemble.basicForm.action;
            }
            ivalid[name] = iaction.rules[name];
            return ivalid;
        },

        //拼装核查参数
        makeCheckParam: function(arr) {
            var that = this;
            var flag = true;
            var isRegist = workflow.linkCode == 'yzt_dj';
            $.each(arr, function(i, obj) {
                if (!flag)
                    return false;
                var param = [];
                // 服务参数中的&字符被转成中文
                $.each(obj.param.replace(/＆/g, '&').split('&'), function(j, jobj) {
                    if (jobj.indexOf('{') > -1) {
                        var key = jobj.split('=')[0];
                        var expression = jobj.split('=')[1].replace(/\$\{/g, '').replace(/\}/g, '').split('.');
                        if (expression.length > 1) { // 是否非基本表单的字段
                            var formName = expression[0];
                            var jname = expression[1];
                            var $form = $('form[name="' + expression[0] + '"] input[name="' + jname + '"]').closest('.fly-form-element').form().data('flyForm');
                        } else {
                            var formName = 'basicForm';
                            var jname = expression[0];
                            var $form = $('#basicFormWrap input[name="' + expression[0] + '"]').closest('.fly-form-element').form().data('flyForm');
                        }
                        if (isRegist) { //登记环节数据从表单获取
                            if (expression.length > 1) {
                                var jvalid = that.findValidByName(expression[0], jname);
                                $('#bizForms .tab-ul-li[name="' + $form.element.closest('.fly-tab-item').attr('data-tab-content') + '"]').click();
                            } else {
                                var jvalid = that.findValidByName(null, expression[0]);
                            }
                            var data = $form.getData({
                                valid: jvalid
                            });
                            if (!data) {
                                flag = false;
                                return false;
                            } else {
                                param.push(jobj.split('=')[0] + '=' + data[jname]);
                            }
                        } else {
                            //登记的表单数据
                            var applyData = workflow.processPrintData.yzt_dj.formData;
                            param.push(jobj.split('=')[0] + '=' + applyData[formName.replace(/-/g, '')][jname]);
                        }
                    } else {
                        param.push(jobj);
                    }
                });
                arr[i].param = param.join('&');
            });
            if (!flag)
                return null;
            return arr;
        },
        //云签页面弹出
        makeCheckParam: function(arr) {
            var that = this;
            var flag = true;
            var isRegist = workflow.linkCode == 'yzt_dj';
            util.ajax.post('/apasinfo/withdraw.do', data, 'text')
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
        },
        projectCheck: function() {
            var that = this,
                param = fly.json.evalJSON(projectCheckParam);
            iparam = this.makeCheckParam(param);
            if (!iparam)
                return;
            $('body').mask();
            $.ajax({
                url: CONTEXTPATH + '/infocheck/param/encrpt.do',
                type: 'POST',
                data: {
                    paramContent: fly.json.toJSON(iparam),
                    projNo: workflow.projNo || ''
                },
                success: function(res) {
                    $('body').mask('remove');
                    if (res.flag == 'true') {
                        window.projectCheckResult = res.data;
                        message.openFullWindow(CONTEXTPATH + '/flow/project-check.do');
                    } else {
                        $.tip({
                            type: "warning",
                            text: '核查服务跳转失败'
                        });
                    }
                },
                error: function(res) {
                    $('body').mask('remove');
                    $.tip({
                        type: "warning",
                        text: '核查服务跳转失败'
                    });
                }
            });
        },

        faceRecognition: function() {
            window.open(popUrls.faceRecognitionUrl, '_blank');
        },

        _renderMsgChoose: function() {
            var self = this;
            setTimeout(function() {
                var content = $($.dialog.list['toolbarDialog'].content());
                var $form = content.find('form');
                self.$confirmForm = $form;
                if ($form.toArray().length > 0) {
                    var form = {
                        init: function() {
                            $form.form().empty();
                            this.flyForm = $form.data('flyForm');
                            this.render();
                        },
                        render: function() {
                            var f = this,
                                formElement = fields['universal'];
                            if (content.find('#confirmTip') != 0) {
                                content.find('#confirmTip').text(confirmTips.submit);
                            };
                            $.each(formElement, function(i, item) {
                                $('<div/>').appendTo($form).formElement(item);
                            });
                        }
                    };
                    form.init();
                }
            }, 20);
        },

        _getMsgData: function() {
            var self = this;
            var obj = self.$confirmForm.form().data('flyForm').getData();
            return {
                messageRequest: fly.json.toJSON({
                    nextPhaseNotify: obj.nextPhaseNotify,
                    applyerNotify: obj.applyerNotify
                })
            };
        },

        //标准dao执行流程
        _standardDao: function(param) {
            var self = this;
            window.confirmDialog = message.confirmDialog({
                id: 'toolbarDialog',
                title: param.title || '提示',
                content: param.content,
                width: param.width,
                padding: 0,
                init: function() {
                    setTimeout(function() {
                        self._renderForm();
                    }, 0);
                },
                ok: function() {
                    if (param.getDataCall) {
                        var confirmData = param.getDataCall();
                        if (!confirmData)
                            return false;
                        $.extend(param.data, confirmData);
                    }
                    $('body').mask({
                        content: param.maskContent
                    });
                    $.dialog.list['toolbarDialog'].close();
                    param.dao(param.data).done(function(res) {
                        $('body').mask('remove');
                        if (res.flag == 'true') {
                            self.element.find('.btn').attr('disabled', 'disabled');
                            //如果使用金格签章，需要保存签章信息
                            if (workflow.hasStamp && APPCONFIG.signName == 'jinge') {
                                var websign = workflow.$stamp.data('flyWebsign');
                                if (websign.$signature.val()) {
                                    websign.$protect.val(websign.dataBindTarget.val());
                                    websign.saveSeal();
                                }
                            }
                            if (res.isRedirect) {
                                location.href = res.location;
                            } else {
                                bizUtil.operateDone(message.get(res.result), function() {
                                    var winOpener = window.opener;
                                    if (winOpener && (winOpener.location.href.indexOf('agencyitems.do') > -1 || winOpener.location.href.indexOf('myregister.do') > -1
                                    		|| winOpener.location.href.indexOf('claimitems.do') > -1 || winOpener.location.href.indexOf('undoList.do') > -1
                                    		|| winOpener.location.href.indexOf('todoList.do') > -1)) {
                                    	var triggerRefresh = winOpener.location.triggerRefresh;
                                        triggerRefresh && triggerRefresh();
                                    }
                                    param.callback && param.callback(res.data);
                                });
                            }
                        } else {
                            message.alertDialog({
                                content: message.get(res.result)
                            });
                        }
                    }).fail(function() {
                        $('body').mask('remove');
                        message.alertDialog({
                            content: '系统异常！'
                        });
                    });

                    return false;
                },
                cancel: true
            });
        },

        //补齐补正窗口
        _openCredRepairPop: function() {
            var url = popUrls.credRepairUrl;
            if ($.dialog.data('handleCode') == '0202') {
                url = popUrls.credRepairEditUrl;
            } else {
                url = popUrls.credRepairUrl;
            }

            window.credRepairDialog = $.dialog.open(url, {
                id: 'credRepairDialog',
                title: '补交告知',
                padding: '10px 0',
                width: 700,
                height: 350,
                okVal: '确定',
                cancelVal: '取消',
                cancel: true,
                ok: function() {
                    top.window.saveRepairData();
                    return false;
                }
            });
            $.dialog.data('workflow', workflow);
        },

        _addEvent: function() {
            self.element.on('click', '.btn', function(e) {
                self._clickBtn(e);
            });
            self.$rightBar.on('click', '.btn', function(e) {
                self._clickBtn(e);
            });

            self.$anchor.on('click', '.icon-quick-wrap', function(e) {
                if ($(e.currentTarget).data('type') == 'stamp') {
                    $('.canvas').not('hide').find('.stamp-btn').click();
                    return;
                }
                self._clickBtn(e);
            });
            //打印普通表单
            self.element.delegate('.link-normal-form', 'click', function(e) {
                var $this = $(e.currentTarget);
                self.print($this.data('code'), $this);
            });
            self.$anchor.delegate('.link-normal-form', 'click', function(e) {
                var $this = $(e.currentTarget);
                self.print($this.data('code'), $this);
            });
            self.$rightBar.delegate('.link-normal-form', 'click', function(e) {
                var $this = $(e.currentTarget);
                self.print($this.data('code'), $this);
            });
            //打印回执单
            self.element.delegate('.link-reciept', 'click', function(e) {
                var $this = $(e.currentTarget);
                self.printReceipt($this.data('id'), $this);
            });
            self.$anchor.delegate('.link-reciept', 'click', function(e) {
                var $this = $(e.currentTarget);
                self.printReceipt($this.data('id'), $this);
            });
            self.$rightBar.delegate('.link-reciept', 'click', function(e) {
                var $this = $(e.currentTarget);
                self.printReceipt($this.data('id'), $this);
            });
        },

        _clickBtn: function(e) {
            var $this = $(e.currentTarget),
                id = $this.data('type'),
                ifun = self.options.functionMap[id];
            if (ifun && self[ifun]) {
                self[ifun]($this);
            }
        },

        //渲染操作表单
        _renderForm: function() {
            var self = this;
            var content = $($.dialog.list['toolbarDialog'].content());
            var $form = content.find('form');
            self.$confirmForm = $form;
            if ($form.toArray().length > 0) {
                var form = {
                    init: function() {
                        $form.form().empty();
                        this.flyForm = $form.data('flyForm');
                        this.render();
                    },
                    render: function() {
                        var f = this,
                            formElement = fields[formFlag];
                        if (content.find('#confirmTip') != 0) {
                            content.find('#confirmTip').text(tipFlag);
                        };
                        $.each(formElement, function(i,
                            item) {
                            $('<div/>').appendTo($form)
                                .formElement(item);
                            if (item.type === 'combobox' && item.dict) {
                                $form.data('flyForm').getControl(item.name).combobox({
                                    data: CONTEXTPATH + '/common/commboDict.do?lxjp=' + item.dict
                                });
                            }
                            if (item.name === 'timeLimit') {
                                var str = '<span style="float: left;margin: 5px 10px;width: 60px;height: 30px;line-height: 30px;font-size: 12px;">工作日</span>';
                                $form.append(str);
                            }
                        });
                    }
                };
                form.init();
            }
        },

        _switch: function(ele, param) {
            var self = this;
            if (param)
                ele.removeClass('btn-disabled').removeAttr('disabled');
            else
                ele.addClass('btn-disabled').attr('disabled', 'disabled');
        },

        refreshNum: function() {
            // 如果是在一站通系统操作并且父窗口存在刷新数字提示
            if (window.opener && location.href.indexOf('yzt/flow/apply') > -1) {
                window.opener.parent.refreshNum.refreshAll();
            }
        },
        
        //评价
        evaluateBtn: function() {
			data = {
				loginName: yztUser.userData.loginName,
				evaluateUserIdcard: workflow.processPrintData.yzt_dj.formData.basicForm.applyCardNumber,
				evaluateUserName: workflow.processPrintData.yzt_dj.formData.basicForm.applyName
			};
			url = EVALUATEPATH + '/sendMsg.do?callback=?';
			$('body').mask();
			$.ajax({
				url: url,
				data: data || {},
				type: 'GET',
				dataType:'jsonp',
				jsonp: 'callback',
				success: function(result){
					$('body').mask('remove');
					if(result.flag == 'true'){
						if(result.result == "SUCCESS"){
							$.tip({
								type: 'success',
								text: '推送评价消息成功'
							});
						}else{
							$.tip({
								type: 'warning',
								text: '推送评价消息失败'
							});
						}
					}else{
						if(result.result == "NO_USER_LOGIN"){
							$.tip({
								type: 'warning',
								text: '您尚未登录评价器'
							});
						}else{
							$.tip({
								type: 'warning',
								text: '推送评价消息失败'
							});
						}
						
					}
				},
				error: function(){
					$('body').mask('remove');
                    $.tip({
                        type: 'warning',
                        text: '推送评价消息失败'
                    });
				}
			});
		}

    });
}));
