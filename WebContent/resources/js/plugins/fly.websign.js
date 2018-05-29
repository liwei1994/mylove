/**
 *  点聚 电子印章
 * @author: zywu2
 */

(function(factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define([
            "jquery",
            "fly",
            'da'
        ], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function($, fly, da) {

    var util = fly.utils;
    //点聚和金格签章封装对象
    var dianjuSign,
        jingeSign,
        bicengSign;

    var signConfig = {
        width: '100px',
        height: '100px',
        border: '0'
    };

    //点聚方法定义
    dianjuSign = {

        defaultElement: '<div>',

        options: {
            name: '',
            target: ''
        },

        _create: function() {
            var self = this;

            //插入控件
            if (!document.getElementById('DWebSignSeal')) {
                var signObject = '<object id="DWebSignSeal" ' + '    classid="CLSID:77709A87-71F9-41AE-904F-886976F99E3E" ' + '    style="position:absolute;width:0px;height:0px;left:0px;top:0px;" ' + '    codebase="./dll/WebSign.cab#version=4.5.0.6">' + '</object>'
                $('body').append(signObject);
                window.webSignSeal = document.getElementById('DWebSignSeal');
            }

            self.control = $('<input type="hidden" name="' + self.options.name + '" />')
                .insertAfter(self.element);

            self.control.bind('setvalue', function() {
                self.setSeal(self.control.val());
            });

            //位置绑定
            if (self.options.positionTarget) {
                self.positionTarget = $('#' + self.options.positionTarget);
            }

            //数据绑定
            if (self.options.dataBindTarget) {
                self.dataBindTarget = $(self.options.dataBindTarget);
            }

            self.element.click(function() {
                self.dataBindTarget.val($.trim(self.dataBindTarget.val()));
                if ($(this).hasClass('sealed')) {
                    self._removeSeal();
                } else {
                    if (!$.trim(self.dataBindTarget.val())) {
                        self.dataBindTarget.testRemind('请先输入处理意见');
                        self.dataBindTarget.get(0).scrollIntoView();
                        return false;
                    } else if ($.trim(self.dataBindTarget.val()).length > 200) {
                        self.dataBindTarget.testRemind('最多输入200个字符');
                        self.dataBindTarget.get(0).scrollIntoView();
                        return false;
                    }
                    var $canvas = self.element.closest('.canvas'),
                        getDataFunc = $canvas.attr('id').indexOf('approval') > -1 ? 'getApproveData' : 'getAcceptData';
                    if ($canvas.find('.canvas-form form').length) {
                        $canvas.find('#toggle_form_content_btn').addClass('toggle-form-content-btn-fold');
                        $canvas.find('.canvas-form').removeClass('hide');
                        var data = da[getDataFunc]({});
                        if (!data) {
                            return false;
                        }
                    }
                    self._addSeal();
                }
            });
        },

        /**
         * 盖章
         */
        _addSeal: function() {
            var self = this;
            var sign = '';
            if (self._checkSeal()) {
                var pos = self.positionTarget.position();
                webSignSeal.SetPosition(pos.left - 160, pos.top - 140, self.options.name);
                webSignSeal.SetSignData('-');
                webSignSeal.SetSignData("+DATA:" + '');
                sign = webSignSeal.AddSeal('', self.options.name);
                webSignSeal.LockSealPosition(self.options.name);
            } else {
                //has add  seal 
                webSignSeal.ShowSeal(self.options.name, 1);
                webSignSeal.SetSignData('-');
                webSignSeal.SetSignData("+DATA:" + '');
                sign = '1';
            }
            if (sign) {
                var $close = $('#' + self.options.name),
                    oTop = 30 - $close.height(),
                    oLeft = 0 - $close.width();
                $('#' + self.options.name).remove();
                $close.css({
                    top: oTop,
                    left: oLeft
                }).appendTo(self.positionTarget);
                webSignSeal.LockSeal(sign, 1);
                webSignSeal.SetMenuItem(self.options.name, 4);
                self.control.val(self.getSeal(self.options.name));
                self.element.text('取消').addClass('sealed');
                //禁用审批意见文本框
                switchFormElement(self.dataBindTarget, false);
                switchFormElement($('#canvasFrom input,#canvasFrom textarea'), false);
                //印章图片base64
                self.imgBase64 = document.all.DWebSignSeal.GetSealBmpString(self.options.name, 'gif');
            }

        },

        /**
         * 检查是否盖章
         * @return {[type]} [description]
         */
        _checkSeal: function() {
            var self = this,
                strObjectName = webSignSeal.FindSeal('', 0);
            while (strObjectName != '') {
                if (self.options.name == strObjectName) {
                    return false;
                }
                strObjectName = webSignSeal.FindSeal(strObjectName, 0);
            }
            return true;
        },

        /**
         * 取消（隐藏）印章
         * @return {[type]} [description]
         */
        _removeSeal: function() {
            var self = this;
            //remove all sign data
            webSignSeal.ShowSeal(self.options.name, 0);
            webSignSeal.SetSignData("-");
            self.element.text('盖章').removeClass('sealed');
            self.control.val('');
            //启用审批意见文本框
            switchFormElement(self.dataBindTarget, true);
            switchFormElement($('#canvasFrom input,#canvasFrom textarea'), true)
        },

        /**
         * 获取印章数据
         * @return {[type]} [description]
         */
        getSeal: function() {
            var self = this;
            return webSignSeal.GetStoreData();
        },

        /**
         * 设置印章数据,显示并重新定位
         * @param {[type]}  data   [description]
         * @param {Boolean} isMove [description]
         */
        setSeal: function(data, isMove) {
            var self = this;
            if (!data)
                return;

            //缓存所有印章
            self.nowObjects = $('object').parent('div:not(#DWebSignSeal)');

            //设置数据
            webSignSeal.SetStoreData(data);

            try {
                //显示印章
                webSignSeal.ShowWebSeals();

                //缓存所有印章
                self.thenObjects = $('object').parent('div:not(#DWebSignSeal)');

                //数据校验
                webSignSeal.SetSealSignData(self.options.name, '');
                webSignSeal.VerifyDoc(self.options.name);

                //右键菜单
                webSignSeal.SetMenuItem(self.options.name, 4);

                //移动印章重新定位
                if (isMove)
                    self._movePos(self.options.name);

                self.element.text('取消').addClass('sealed');
            } catch (e) {}
        },

        /**
         * 移动印章重新定位
         * @param  {[type]} theNodeNo [description]
         * @return {[type]}           [description]
         */
        _movePos: function(theNodeNo) {
            var self = this,
                $close = $('#' + theNodeNo),
                oTop,
                oLeft,
                $inode, //印章
                $itable, //表格
                theight,
                hasId; //表格高度

            //老数据印章id未知
            if (!$close.length) {
                $close = self._getMyObject(theNodeNo);
                oTop = 0 - $close.height();
                oLeft = -20 - $close.width();
                $('#' + self.nodeNo).remove();
                hasId = false;
            } else {
                oTop = 0 - $close.height();
                oLeft = -20 - $close.width();
                $('#' + theNodeNo).remove();
                hasId = true;
            }
            //移动印章并设置位置
            $close.css({
                top: oTop + 20,
                left: oLeft
            }).appendTo($('#sign_' + theNodeNo));

            if (hasId) {
                $inode = $('#' + theNodeNo);
                $itable = $inode.closest('table');
                theight = $itable.height();
            } else {
                $inode = $('#' + self.nodeNo);
                $itable = $('#sign_' + theNodeNo).closest('table');
                theight = $itable.height();
            }

            //动态设置表格高度
            if (theight < $inode.height()) {
                $itable.find('.operate-opinion').css('height', ($inode.height() - theight + 40).toString() + 'px');
            }
        },

        /**
         * 找出dom中新增的印章object
         * @return {[type]} [description]
         */
        _getMyObject: function(theNodeNo) {
            var self = this,
                now = [],
                then = [];
            $.each(self.nowObjects, function(i, obj) {
                now.push($(obj).attr('id'));
            });
            $.each(self.thenObjects, function(i, obj) {
                then.push($(obj).attr('id'));
            });
            self.nodeNo = then.join('').replace(now.join(''), '');

            //数据校验
            webSignSeal.SetSealSignData(self.nodeNo, $('#sign_' + theNodeNo).closest('table').find('.operate-opinion div').text());
            webSignSeal.VerifyDoc(self.nodeNo);

            //右键菜单
            webSignSeal.SetMenuItem(self.nodeNo, 4);

            //不显示黑杠
            webSignSeal.SetDocAutoVerify(self.nodeNo, 0);

            return $('#' + self.nodeNo);
        },

        _init: function() {

        },

        _setOption: function(key, value) {
            this._super(key, value);
        },

        _destroy: function() {

        }
    };

    //金格方法定义
    jingeSign = {

        defaultElement: '<div>',

        options: {
            ServiceUrl: APPCONFIG.jingeSignContext,
            //ServiceUrl: 'http://192.168.58.135:8089/iSignatureHTML/Service.jsp',
            SaveHistory: 'False',
            CharSetName: '1',
            WebAutoSign: '0',
            isFieldsXml: false,
            FieldsXml: '',
            positionTarget: '',
            dataBindTarget: '',
            documentId: ''
        },

        _create: function() {
            var self = this;

            //插入控件
            if (!document.getElementById('SignatureControl')) {
                var filedXml = self.options.isFieldsXml ? '<param name="FieldsXml" value="' + self.options.FieldsXml + '">' : '';
                var signObject = '<OBJECT id="SignatureControl" classid="clsid:D85C89BE-263C-472D-9B6B-5264CD85B36E" width=0 height=0>' +
                    '<param name="ServiceUrl" value="' + self.options.ServiceUrl + '">' + //读取数据库相关信息
                    '<param name="SaveHistory" value="' + self.options.SaveHistory + '">' + //是否自动保存历史记录
                    '<param name="CharSetName" value="' + self.options.CharSetName + '">' + //签章系统显示的语言,详细信息参阅技术白皮书
                    '<param name="WebAutoSign" value="' + self.options.WebAutoSign + '">' + //是否自动签名(0:不启用，1:启用)
                    '<param name="MenuDocLocked" value="false">' + //菜单文档锁定
                    '<param name="MenuDeleteSign" value="false">' + //菜单撤消签章
                    '<param name="MenuMoveSetting" value="false">' +
                    filedXml + //如果以XML形式保护数据，请启用此参数
                    '</OBJECT>';
                $('body').append(signObject);

                window.webSignSeal = document.getElementById('SignatureControl');
                webSignSeal.EnableMove = false;
                webSignSeal.AutoSave = 'false';
                webSignSeal.SignatureID = self.options.positionTarget;
                webSignSeal.FieldsList = (this.element.closest('.canvas').attr('id') == 'acceptPanel' ? 'acceptOpinion' : 'approveOpinion') + ':处理意见';
            }

            this.$form = this.element.closest('.table-content').find('form[name="DocForm"]');
            if (this.$form.length) {
                self.documentId = [workflow.projNo, (new Date()).getTime()].join('-');
                self.$docId = $('<input type="hidden" name="DocumentID" value="' + self.documentId + '" />').appendTo(self.$form);
                self.$protect = $('<input type="hidden" name="approvalDecision" class="approval-decision" />').appendTo(self.$form);
                self.$signatureId = $('<input type="hidden" name="signatureId" />').appendTo(self.$form);
                self.$signature = $('<input type="hidden" name="signature" />').appendTo(self.$form);
                self.control = $('<input type="hidden" name="' + self.options.name + '" />').insertAfter(self.element);
            }

            //位置绑定
            if (self.options.positionTarget) {
                self.positionTarget = $('#' + self.options.positionTarget);
            }

            //数据绑定
            if (self.options.dataBindTarget) {
                self.dataBindTarget = $(self.options.dataBindTarget);
            }

            self.element.click(function() {
                if ($(this).hasClass('sealed')) {

                    self._removeSeal();
                } else {
                    if (!$.trim(self.dataBindTarget.val())) {
                        self.dataBindTarget.testRemind('请先输入处理意见');
                        self.dataBindTarget.get(0).scrollIntoView();
                        return false;
                    } else if ($.trim(self.dataBindTarget.val()).length > 200) {
                        self.dataBindTarget.testRemind('最多输入200个字符');
                        self.dataBindTarget.get(0).scrollIntoView();
                        return false;
                    }
                    var $canvas = self.element.closest('.canvas'),
                        getDataFunc = $canvas.attr('id').indexOf('approval') > -1 ? 'getApproveData' : 'getAcceptData';
                    if ($canvas.find('.canvas-form form').length) {
                        $canvas.find('#toggle_form_content_btn').addClass('toggle-form-content-btn-fold');
                        $canvas.find('.canvas-form').removeClass('hide');
                        var data = da[getDataFunc]({});
                        if (!data) {
                            return false;
                        }
                    }
                    self._addSeal();
                }
            });
        },

        /* 盖章 */
        _addSeal: function() {
            var self = this;
            var sign = '';
            webSignSeal.divId = "";
            //是否启用金格印章测试用软件证书
            if (APPCONFIG.useSoftwareKey == 'true')
                webSignSeal.UserName = 'lyj';
            webSignSeal.Position(-170, -110);
            $('#' + self.options.positionTarget).css('position', 'relative');
            sign = webSignSeal.RunSignature(true);
			
			//保存最后一次添加的签章对象
			self.saveSignObjectElement  = $("object[name=iHtmlSignature]:last");
			//盖章定位元素位置
			self.saveSignObjectElement.appendTo($("#"+self.options.positionTarget));			
			
			
			//self.options.positionTarget
            if (sign) {
                self.element.text('取消').addClass('sealed');
                self.control.val(self.documentId);
                var theSeal = self.saveSignObjectElement[0];
                self.$signatureId.val(webSignSeal.SignatureID);
                self.$signature.val(theSeal.SignatureValueStr);
                self.imgBase64 = theSeal.GetBase64SignImage(1); //gif格式
                self._setSealZIndex();
                //禁用审批意见文本框
                switchFormElement(self.dataBindTarget, false);
                switchFormElement($('#canvasFrom input,#canvasFrom textarea'), false)
            }
        },

        /* 取消 */
        _removeSeal: function() {
            var self = this;
            //jquery dom移除
            self.positionTarget.empty();
            self.element.text('盖章').removeClass('sealed');
            self.control.val('');
            //启用审批意见文本框
            switchFormElement(self.dataBindTarget, true);
            switchFormElement($('#canvasFrom input,#canvasFrom textarea'), true)
        },

        /* 设置印章数据 */
        setSeal: function(data) {
            var self = this;
            if (!data)
                return;
            try {
                webSignSeal.ShowSignature(data);
				
				var  signatureList =  $("object[name=iHtmlSignature]");				
				for(var i=0;i < signatureList.length; i++ ){
					var item  =  signatureList[i];
					if(data ==  item.documentId){
						$(item).appendTo('#sign_' + self.options.name);
					}					
				}	
				
                //var signs = document.getElementsByName("iHtmlSignature");
            } catch (e) {}
            self._setSealZIndex();
        },

        //保存印章数据
        saveSeal: function() {
            var self = this;
            var param = {
                command: 'SAVESIGNATURE',
                userName: document.getElementsByName("iHtmlSignature")[0].UserName || 'test',
                documentId: self.$docId.val(),
                signature: self.$signature.val()
            };
            $.ajax({
                url: CONTEXTPATH + '/webSign/Service.do',
                data: param,
                type: 'post',
                success: function(res) {
                    debugger;
                },
                error: function() {}
            });
        },

        _setSealZIndex: function() {
            $('.span-sign-target').css('z-index', 0);
            $('.span-sign-target object').css('z-index', 0);
        },

        _init: function() {

        },

        _setOption: function(key, value) {
            this._super(key, value);
        },

        _destroy: function() {

        }
    };

    //禁用启用控件
    var switchFormElement = function($eles, flag) {
        if (!flag) {
            $eles.each(function(i, obj) {
                var $this = $(obj);
                $this.attr('disabled', 'disabled').addClass('disabled');
            });
        } else {
            $eles.each(function(i, obj) {
                var $this = $(obj);
                $this.removeAttr('disabled').removeClass('disabled');
            });
        }
    };

    var getWebSignServer = function() {
        var obj = new util.ajaxObj(),
            options = $.extend({}, obj.options);
        options.before();
        util.ajax.post('/common/getAppConfig.do', {}, 'text')
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
    };

    //百城
    bicengSign = {

        defaultElement: '<div>',
        options: {
            name: '',
            target: ''
        },
        webSignSeal: null,
        _create: function() {

            var self = this;

            //插入控件
            if (!self.webSignSeal) {
                var signObject = '<div style="position:relative;z-index:1;top:0px;left:0px;border:0px solid white" >&nbsp;<object class="webSignObject" ' + ' classid="CLSID:C1FB7513-9A44-4C64-B653-63C6965D7F4C" ' + ' style="position:absolute;left:0px;top:0px;"  >' + '</object> </div>'

                //$('body').append(signObject);
                var parent = $(signObject);
                parent.css('width', signConfig.width);
                parent.css('height', signConfig.height);
                parent.css('margin-top', "-80px");

                if (signConfig.border == '1') {
                    parent.css("border", "1px solid black");
                }
                var $inode = $('#sign_' + self.options.target);
                $inode.append(parent);

                var $itable = $inode.closest('table');
                $itable.find('.operate-opinion').css('height', ($inode.height() - parseInt(signConfig.height) + 150).toString() + 'px');

                //放大审核区域
                var opiontTargetDiv = $('#sign_' + self.options.target);


                //查询当前控制的websign对象
                self.webSignSeal = parent.find(".webSignObject")[0];

                var webSignSeal = self.webSignSeal;
                if (webSignSeal != null) {
                    //初始化印章控件
                    webSignSeal.DrawModeUnsign = 0;
                    webSignSeal.DrawMode = 6;

                    webSignSeal.style.left = "0px";
                    webSignSeal.style.top = "0px";

                    webSignSeal.style.width = signConfig.width;
                    webSignSeal.style.height = signConfig.height;
                }
            }

            self.control = $('<input type="hidden" name="' + self.options.name + '" />')
                .insertAfter(self.element);

            self.control.bind('setvalue', function() {
                self.setSeal(self.control.val());
            });

            //位置绑定
            if (self.options.positionTarget) {
                self.positionTarget = $('#' + self.options.positionTarget);
            }

            //数据绑定
            if (self.options.dataBindTarget) {
                self.dataBindTarget = $(self.options.dataBindTarget);
            }

            self.element.click(function() {
                self.dataBindTarget.val($.trim(self.dataBindTarget.val()));
                if ($(this).hasClass('sealed')) {
                    self._removeSeal();
                } else {
                    if (!$.trim(self.dataBindTarget.val())) {
                        self.dataBindTarget.testRemind('请先输入处理意见');
                        self.dataBindTarget.get(0).scrollIntoView();
                        return false;
                    } else if ($.trim(self.dataBindTarget.val()).length > 200) {
                        self.dataBindTarget.testRemind('最多输入200个字符');
                        self.dataBindTarget.get(0).scrollIntoView();
                        return false;
                    }
                    var $approvalForm = $('.form-wrap-content');
                    if ($approvalForm.hasClass('hide')) {
                        // 审核表单处于折叠状态
                        $('#toggle_form_content_btn').trigger('click');
                    };
                    if (da.$approveForm) {
                        var data = da.getApproveData();
                        if (!data) {
                            return false;
                        }
                    }
                    self._addSeal();
                }
            });
        },
        _movePos: function(theNodeNo) {
            var $close = $('#' + theNodeNo),
                oTop = 0 - $close.height(),
                oLeft = -20 - $close.width();
            $('#' + theNodeNo).remove();
            $close.css({
                top: oTop + 20,
                left: oLeft
            }).appendTo($('#sign_' + theNodeNo));
            var $inode = $('#' + theNodeNo);
            var $itable = $inode.closest('table');
            var theight = $itable.height();
            if (theight < $inode.height()) {
                $itable.find('.operate-opinion').css('height', ($inode.height() - theight + 40).toString() + 'px');
            }
        },
        /* 盖章 */
        _addSeal: function() {

            var self = this;

            var sign = '1';

            //显示签章
            self.webSignSeal.SignSeal(true);

            if (sign) {
                var $close = $('#' + self.options.name);
                $('#' + self.options.name).remove();
                $close.css({
                    top: -140,
                    left: -160
                }).appendTo(self.positionTarget);

                self.control.val(self.getSeal(self.options.name));
                self.element.text('取消').addClass('sealed');
                //禁用审批意见文本框
                switchFormElement(self.dataBindTarget, false);
                switchFormElement($('#canvasFrom input,#canvasFrom textarea'), false);
            }


        },

        /* 检查是否盖章 */
        _checkSeal: function() {
            return false;
        },
        /* 取消 */
        _removeSeal: function() {
            var self = this;
            //remove all sign data
            self.webSignSeal.Remove();

            self.element.text('盖章').removeClass('sealed');
            self.control.val('');
            //启用审批意见文本框
            switchFormElement(self.dataBindTarget, true);
            switchFormElement($('#canvasFrom input,#canvasFrom textarea'), true)
        },
        _getPosition: function() {
            var self = this;
            var width = this.target.width();
            var height = this.target.height();
            if (!self.target) {
                var offset = this.target.offset();
                return {
                    left: offset.left + width - 80,
                    top: offset.top + height - 150
                };
            } else {
                return {
                    left: width - 100,
                    top: height - 100
                };
            }
        },

        /* 获取印章数据 */
        getSeal: function() {
            var self = this;
            return self.webSignSeal.SignedData;
        },

        /* 设置印章数据 */
        setSeal: function(data) {
            var self = this;
            if (!data)
                return;
            try {
                self.webSignSeal.SignedData = data;
                //self._movePos(self.options.name);
            } catch (e) {};
            try {
                //印章数据验证 todo
                //webSignSeal.SetMenuItem(self.options.name, 4);
                self.element.text('取消').addClass('sealed');
            } catch (e) {
                /*$.tip({
                    text:'签章显示失败'
                });*/
            }
            self._setSealZIndex();
        },

        _init: function() {

        },
        _setSealZIndex: function() {
            $('.span-sign-target').css('z-index', 0);
            $('.span-sign-target object').css('z-index', 0);
        },
        _setOption: function(key, value) {
            this._super(key, value);
        },

        _destroy: function() {

        }
    };

    var flyWebsign = null;
    //根据配置文件检查使用签章插件
    if (APPCONFIG.signName == 'jinge') {
        flyWebsign = $.widget("fly.websign", jingeSign);
    } else if (APPCONFIG.signName == 'biceng') {
        flyWebsign = $.widget("fly.websign", bicengSign);
    } else if (APPCONFIG.signName == 'dianju') {
        flyWebsign = $.widget("fly.websign", dianjuSign);
    }
    return flyWebsign;

}));
