(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(y)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g,y=/^$|,+/;e.openTag="{{",e.closeTag="}}";var z=function(a,b){var c=b.split(":"),d=c.shift(),e=c.join(":")||"";return e&&(e=", "+e),"$helpers."+d+"("+a+e+")"};e.parser=function(a){a=a.replace(/^\s/,"");var b=a.split(" "),c=b.shift(),e=b.join(" ");switch(c){case"if":a="if("+e+"){";break;case"else":b="if"===b.shift()?" if("+b.join(" ")+")":"",a="}else"+b+"{";break;case"/if":a="}";break;case"each":var f=b[0]||"$data",g=b[1]||"as",h=b[2]||"$value",i=b[3]||"$index",j=h+","+i;"as"!==g&&(f="[]"),a="$each("+f+",function("+j+"){";break;case"/each":a="});";break;case"echo":a="print("+e+");";break;case"print":case"include":a=c+"("+b.join(",")+");";break;default:if(/^\s*\|\s*[\w\$]/.test(e)){var k=!0;0===a.indexOf("#")&&(a=a.substr(1),k=!1);for(var l=0,m=a.split("|"),n=m.length,o=m[l++];n>l;l++)o=z(o,m[l]);a=(k?"=":"=#")+o}else a=d.helpers[c]?"=#"+c+"("+b.join(",")+");":"="+a}return a},"function"==typeof define?define(function(){return d}):"undefined"!=typeof exports?module.exports=d:this.template=d}();


},{}],2:[function(require,module,exports){
var CAPTURETYPE = localStorage.getItem('captrueType');
var huatong = function() {
    $('body').append('<div id="idCardOcr"></div>');
    var str = '<object id="ocx_huatong" codebase="FirstActivex.cab#version=1,3,3,1" classid="CLSID:F225795B-A882-4FBA-934C-805E1B2FBD1B" width="0" height="0">' +
        '<param name="_Version" value="65536"/>' +
        '<param name="_ExtentX" value="2646"/>' +
        '<param name="_ExtentY" value="1323"/>' +
        '<param name="_StockProps" value="0"/>' +
        '</object>';
    if (!document.getElementById('ocx_huatong'))
        $('body').append(str);
    var idCardOcr = document.getElementById('idCardOcr');
    var ocx = document.getElementById('ocx_huatong');
    try {
        ocx.setPortNum(0);
        ocx.Flag = 0;
    } catch (e) {

    }
    idCardOcr.IDCardRecognize = function() {
        return ocx.ReadCard() == 0x90;
    };
    idCardOcr.GetIDCardName = function() {
        return ocx.NameL();
    }
    idCardOcr.GetIDCardSex = function() {
        return ocx.SexL();
    }
    idCardOcr.GetIDCardNation = function() {
        return ocx.NationL();
    }
    idCardOcr.GetIDCardBorn = function() {
        return ocx.BornL();
    }
    idCardOcr.GetIDCardAddr = function() {
        return ocx.Address();
    }
    idCardOcr.GetIDCardNo = function() {
        return ocx.CardNo();
    }
    idCardOcr.GetIDCardPolice = function() {
        return ocx.Police();
    }
    idCardOcr.GetIDCardActive = function() {
        return ocx.ActivityL();
    }
    idCardOcr.GetIDCardPhotoBase64 = function() {
        return ocx.GetImage();
    }
    idCardOcr.DeleteMyFile = function() {}
};
if (CAPTURETYPE == 'huatong') {
    huatong();
}
module.exports = {};

},{}],3:[function(require,module,exports){
/**
 * 证件材料目录管理
 * @author: zywu2
 */

//提示框
function alertDialog(param) {
    var options = {
        title: '提示',
        titleIcon: true,
        content: '',
        width: 378,
        height: 125,
        lock: true,
        okVal: '确定',
        ok: true
    };
    $.dialog($.extend(options, param));
}

/* underscore */
var _ = fly._;

/* DAO */
var dao = {

    //查询是否有该类型的证件材料
    getZjDetail: function(ownerIdcode, clmlCode, clmlVersion) {
        var obj = new fly.utils.ajaxObj(),
            options = $.extend({}, obj.options);

        options.before();

        fly.utils.ajax.post('/material/queryMaterialData.do', {
                ownerIdcode: ownerIdcode, //证件号码
                clmlCode: clmlCode,
                clmlVersion: clmlVersion
            }, 'text').done(function(data) {
                data = fly.utils.toObj(data);
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

    //保存添加其他材料
    saveOtherAdd: function(data) {
        var obj = new fly.utils.ajaxObj(),
            options = $.extend({}, obj.options);

        fly.utils.ajax.post('/preapasattr/saveApasAttrInfo.do',
            data, 'text').done(function(data) {
            data = fly.utils.toObj(data);

            if (data.flag == 'true') {
                obj._done && obj._done(data);
            } else {
                obj._fail && obj._fail();
            }
        }).fail(function() {
            obj._fail && obj._fail();
        });

        return obj;
    },

    //获取所有材料目录
    getCredDirecotry: function(data) {
        var obj = new fly.utils.ajaxObj(),
            options = $.extend({}, obj.options);

        fly.utils.ajax.post('/material/getMaterialContentList.do',
            data, 'text').done(function(data) {
            data = fly.utils.toObj(data);

            if (data.flag == 'true') {
                obj._done && obj._done(data);
            } else {
                obj._fail && obj._fail();
            }
        }).fail(function() {
            obj._fail && obj._fail();
        });

        return obj;
    }

};

var message = {};
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
    return $.dialog.through($.extend(options, param));
};

//线下材料备注
var remarkHtm = '<div class="form-content form-content-control" style="border:none;width:358px;">' +
    '<form data-fly-form>' +
    '</form>' +
    '</div>';
//证件材料表单
var zjField = {
    offline: [{
        title: '备注',
        type: 'textarea',
        name: 'remark',
        required: true,
        width: '1',
        labelWidth: 50,
        value: APPCONFIG.materialAcceptRemark
    }]
};

/* 证件的校验 */
var zjValid = {
    offline: {
        remark: {
            title: '备注',
            required: true,
            max: 200
        }
    }
};

var btnDelHtml = '<span class="span-del-cred">删除</span>';
var btnDownHtml = '<span class="span-download-temp" title="下载模板"></span>';
var stateHtm = function(item) {
    var iname = item.shareName || item.clmc;
    return {

        '_1': '<i class="zj-state zj-state-elec" data-value="1">电</i>',
        '_2': '<i class="zj-state zj-state-ori" data-type="yjbz" data-value="2">原<div class="explain"><div class="explain-content"><h3 class="ell text-left" title="' + iname + '">' + iname + '</h3><p class="text-left"></p></div><ins class="arrow"><i></i></ins></div></i>',
        '_3': '<i class="zj-state zj-state-copy" data-type="fyjbz" data-value="3">复<div class="explain"><div class="explain-content"><h3 class="ell text-left" title="' + iname + '">' + iname + '</h3><p class="text-left"></p></div><ins class="arrow"><i></i></ins></div></i>'
    }
};
var stateHtm2 = function(item) {
    var iname = item.shareName || item.clmc;
    return {
        '_1': '<i class="zj-state zj-state-elec has" data-value="1">电</i>',
        '_2': '<i class="zj-state zj-state-ori has" data-type="yjbz" data-value="2">原<div class="explain"><div class="explain-content"><h3 class="ell text-left" title="' + iname + '">' + iname + '</h3><p class="text-left"></p></div><ins class="arrow"><i></i></ins></div></i>',
        '_3': '<i class="zj-state zj-state-copy has" data-type="fyjbz" data-value="3">复<div class="explain"><div class="explain-content"><h3 class="ell text-left" title="' + iname + '">' + iname + '</h3><p class="text-left"></p></div><ins class="arrow"><i></i></ins></div></i>'
    }
};

/**
 * 证件材料组件
 * @iflytek.com
 */
return $.widget("fly.credentials", {

    defaultElement: '<div>',

    options: {
        necessary: [], //必备材料
        optional: [], //可选材料
        other: [], //其他材料
        supplement: [], //容缺后补材料
        showOther: false, //显示其他材料栏
        readonly: false, //附件上传面板不可操作
        fileUploadPanel: CONTEXTPATH + '/newcred/newCredChoose.do', //附件上传面板地址
        filePreviewPanel: CONTEXTPATH + '/fileUpload/newPreview.do', // 附件预览面板地址
        person: {}, //材料所属人
        isRepair: false, //是否补齐补正
        isRepairEdit: false,
        //默认材料持有人证件和姓名字段
        defaultOwner: {
            formName: 'biz-basic-info',
            ownerIdcode: 'applyCardNumber',
            ownerName: 'applyName'
        },
        onlineStyle: false,
        grouping: true
    },

    _create: function() {
        var self = this,
            name = '必备材料';

        self.options.defaultOwner.formName = $('#basicFormWrap form[data-fly-form]:first').attr('name');

        //补齐补正
        if (self.options.isRepair) {
            self.repairCheckbox = '<div class="check-box-wrap"><span class="check-box"></span></div>';
            self.repairInput = '<div class="repair-reason">' +
                '<p class="repair-reason-text">' +
                '<input type="text" name="patchReason" class="repair-reason-edit" />' +
                '</p>' +
                '</div>';
        } else {
            self.repairCheckbox = '';
            self.repairInput = '';
        }
        //补正要求
        if (self.options.isRepairEdit) {
            name = '补交材料';
            self.repairRemark = '<div class="repair-reason"><p class="repair-reason-text"></p></div>';
        }

        if (self.options.onlineStyle) {
            if (self.options.necessary.length != 0 || self.options.optional.length != 0 || self.options.supplement.length != 0) {
                this.wrapTitle = $('<h3 class="form-wrap-title">申报材料</h3>').appendTo(this.element);
                this.targetWrap = $('<div class="credentials-inner" />').appendTo(this.element);
            }
        } else {
            this.targetWrap = this.element;
        }

        //预定义材料dom
        this.necessary = $('<ul/>').addClass(
            'necessary clearfix');
        this.necessaryListWrap = $('<div/>').append(this.necessary);
        this.necessaryWrap = $('<dl class="' + (self.options.necessary.length > 0 ? '' : 'hide') + '" />')
            .append('<dt>' + name + '</dt>')
            .append(this.necessaryListWrap);

        //将必备材料添加到dom
        this.necessaryWrap.appendTo(this.targetWrap);
        this._renderNecessary();

        this.optional = $('<ul/ >').addClass(
            'optional clearfix');
        this.optionListWrap = $('<div/>').append(this.optional);
        this.optionalWrap = $('<dl class="' + (self.options.optional.length > 0 ? '' : 'hide') + '" />')
            .append('<dt>可选材料</dt>')
            .append(this.optionListWrap);

        //将可选材料添加到dom
        this.optionalWrap.appendTo(this.targetWrap);
        this._renderOptional();

        this.supplement = $('<ul/ >').addClass(
            'supplement clearfix');
        this.supplementListWrap = $('<div/>').append(this.supplement);
        this.supplementWrap = $('<dl class="' + (self.options.supplement.length > 0 ? '' : 'hide') + '" />')
            .append('<dt>容缺后补材料</dt>')
            .append(this.supplementListWrap);

        //将可选材料添加到dom
        this.supplementWrap.appendTo(this.targetWrap);
        this._renderSupplement();

        if (self.options.readonly && self.options.other.length == 0) {
            self.options.showOther = false;
        }
        if (self.options.showOther) {
            this.other = $('<ul/>').addClass('other clearfix');
            this.otherListWrap = $('<div/>').append(this.other);
            this.otherWrap = $('<dl/>')
                .append('<dt><span style="float:left;margin-right:10px;">其他材料</span></dt>')
                .append(this.otherListWrap);

            //将其他材料添加到dom
            this.otherWrap.appendTo(this.targetWrap);
            this._renderOther();
        }

        if (!self.options.readonly && !self.options.isRepairEdit) {
            self.element.find('.cred').closest('li').each(function(i, obj) {
                var $li = $(obj);
                if (($.grep($li.find('.item-cred-wrap'), function(n, i) {
                        return $(n).css('display') != 'none'
                    })).length == 0) {
                    $li.addClass('novalid').hide();
                } else {
                    $li.removeClass('novalid').show();
                }
            });
        }

        //绑定事件
        this._addEvent();
        this.ownerChanges = [];

    },

    //事件绑定
    _addEvent: function() {
        var self = this;
        //添加打开证件的事件
        self.element.on('click', '.zj-state-elec,.cred', function(e) {
            var $item = $(e.currentTarget),
                $this = $item.hasClass('zj-state-elec') ? $item.siblings('a.cred') : $item,
                thisCred = $this.data('cred');
            if (self.checkPeople(thisCred)) {
                if (!thisCred.ownerIdcode) {
                    $.extend(thisCred, self.options.person);
                }
                self.aCred = $this;
                self._openCredPop(thisCred, self.aCred);
            }
        });

        //添加其他材料
        if (self.options.readonly) {
            self.element.find('a.add').remove();
            self.element.find('.zj-state-ori,.zj-state-copy').css('cursor', 'default');
        } else {
            self.element.on('click', 'a.add', function() {
                self._addOtherCred();
            });

            //上传原件和复印件
            self.element.on('click', '.zj-state-ori,.zj-state-copy', function(e) {
                var $this = $(e.currentTarget);
                self._uploadOffline($this);
            });
        }

        self.element.on('click', '.explain', function(e) {
            e.stopPropagation();
        });

        //删除添加的材料
        self.element.on('click', '.span-del-cred', function() {
            var $this = $(this);
            window.deleteDialog = $.dialog({
                content: '确认删除材料吗？',
                padding: '15px 15px',
                width: 300,
                height: 80,
                ok: function() {
                    $this.parent().remove();
                },
                cancel: true
            });
        });

        //下载材料模板
        self.element.on('click', '.download-temp', function(e) {
            var $this = $(this),
                idata = $(this).parents('.span-download-temp').siblings('.cred').data('cred'),
                itype = $this.data('type'),
                fileName = idata[({
                    kbbg: 'blankTableName',
                    sfwb: 'demoTextName'
                })[itype]] || '';
            window.open(CONTEXTPATH + '/common/file/download.do?fileid=' + encodeURIComponent(idata[itype]) + '&fileName=' + encodeURIComponent(fileName.substr(0, fileName.lastIndexOf('.'))), '_blank');
        });

        // 复选框
        self.element.on('click', '.check-box', function() {
            var $this = $(this),
                hasChecked = $this.hasClass('checked');

            if (!hasChecked) {
                $this.addClass('checked');
            } else {
                $this.removeClass('checked');
            }
        });

    },

    _renderFiles: function(data, icred) {
        var htm = [];
        $.each(data, function(i, obj) {
            var clmc = icred.shareName || icred.clmc;
            htm.push('<a class="ell cred-temp-link text-left" href="' + CONTEXTPATH + '/common/file/download.do?fileid=' + encodeURIComponent(obj.savePath) +
                '&fileName=' + encodeURIComponent(clmc) + '" title="' + obj.fileName + '">' + obj.fileName + '</a>');
        });
        return htm.join('');
    },

    //渲染操作表单
    _renderForm: function(type) {
        var self = this;
        var content = $($.dialog.list['offlineCredDialog'].content());
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
                        formElement = zjField[type];
                    $.each(formElement, function(i,
                        item) {
                        $('<div/>').appendTo($form)
                            .formElement(item);
                    });
                }
            };
            form.init();
        }
    },

    _uploadOffline: function($ele) {
        var self = this;
        var param = {
                yjbz: {
                    title: '确定已收取原件？',
                    content: '确定取消收取原件？',
                    field: 'ori'
                },
                fyjbz: {
                    title: '确定已收取复印件？',
                    content: '确定取消收取复印件？',
                    field: 'copy'
                }
            },
            type = $ele.data('type'),
            value = $ele.data('value'),
            iparam = param[type];
        if ($ele.hasClass('has')) {
            message.confirmDialogThrough({
                id: 'offlineCredDialog',
                content: iparam.content,
                ok: function() {
                    var $icred = $ele.siblings('a.cred'),
                        idata = $icred.data('cred');
                    self.updateFormatAndState(false, $ele, $icred, $icred.parent().parent());
                    idata[type] = '';
                    $icred.data('cred', idata);
                    $ele.removeClass('zjState-hasRemark').find('p').text('');
                }
            });
        } else {
            message.confirmDialogThrough({
                id: 'offlineCredDialog',
                padding: '0',
                title: iparam
                    .title,
                content: remarkHtm,
                init: function() {
                    setTimeout(function() {
                        self._renderForm('offline');
                    }, 0);
                },
                ok: function() {
                    var data = self.$confirmForm.data('flyForm').getData({
                        valid: zjValid.offline
                    });
                    if (data) {
                        var $icred = $ele.siblings('a.cred'),
                            idata = $icred.data('cred');
                        idata[type] = data.remark;
                        $icred.data('cred', idata);
                        $ele.addClass('zjState-hasRemark').find('p').html('收取说明：' + data.remark);
                        self.updateFormatAndState(true, $ele, $icred, $icred.parent().parent());
                        return true;
                    }
                    return false;
                }
            });
        }
    },

    /* 渲染证件列表 */
    _render: function() {
        var self = this;
        self.necessary.empty();
        if (self.optional) self.optional.empty();
        if (self.other) {
            self.other.find('.cred').parent().remove();
        }
        self._renderByType('necessary');
        self._renderByType('optional');
        self._renderByType('supplement');
        self._renderByType('other');
    },

    _renderNecessary: function() {
        var self = this;
        this.necessary.empty();
        this._renderByType('necessary');
    },

    _renderOptional: function() {
        var self = this;
        if (this.optional) {
            this.optional.empty();
            this._renderByType('optional');
        }
    },

    _renderSupplement: function() {
        var self = this;
        if (this.supplement) {
            this.supplement.empty();
            this._renderByType('supplement');
        }
    },

    _renderOther: function() {
        var self = this;
        if (this.other) {
            this.other.empty();
            this._renderByType('other');
            if (self.options.showOther && !self.options.isRepairEdit && !self.options.readonly) {
                self.other.append('<li class="li-add-other"><a class="add" href="javascript:;">添加</a></li>');
                self.btnAdd = self.element.find('.add').parent();
            }
        }
    },

    /* 渲染证件分类 */
    _renderByType: function(type) {
        var self = this;
        if (type == 'other') {
            self[type].find('.cred').parent().remove();
        } else {
            self[type] && self[type].empty();
        }
        $.each(self.options[type], function(i, item) {
            self._createCred(type, item);
        });
    },

    _renderXm: function() {
        var self = this;
        self.element.find('ul:not(".other")').find('li:not(".member")').find('a.cred').each(function() {
            var cred = $(this).data('cred');
            cred.ownerName = self.options.person.ownerName;
        });
    },

    _getStateHtm: function(item) {
        item.clsqzt = item.clsqzt || '';
        var self = this;
        var htm = [],
            values = item.clsqzt.split(',');
        if (!self.options.grouping) {
            if (item.clbyx == '1') {
                htm.push('<i class="required zj-state">*</i>');
            } else {
                htm.push('<i class="zj-state zj-state-none" style="background:#fff;"></i>');
            }
        }
        $.each((item.clsqxs || '001').split(','), function(i, obj) {
            if ($.inArray(Number(obj).toString(), values) > -1)
                htm.push(stateHtm2(item)[('_' + Number(obj).toString())]);
            else
                htm.push(stateHtm(item)[('_' + Number(obj).toString())]);
        });
        return htm.join('');
    },

    _getClsqxsTxt: function(codes) {
        var map = {
                '001': '电子材料',
                '002': '原件',
                '003': '复印件'
            },
            arr = [];
        $.each(codes.split(','), function(i, obj) {
            arr.push(map[obj]);
        });
        return arr.join('、');
    },

    /* 创建一个证件条目 */
    _createCred: function(type, item) {
        var self = this,
            groupNo = [item.clbyx, '-', item.clfz].join('');
        //证件数据 没有身份证时为空
        var credData = (item.ownerIdcode) ? $.extend({}, item) :
            $.extend({}, item, self.options.person);
        var sortClass = ['cred-sort-', item.sortOrder].join('');

        var explainTxt = item.xxyq || '暂无',
            clsqxsTxt = self._getClsqxsTxt(item.clsqxs),
            credName = item.shareName || item.clmc,
            credNameCutOff = item.shareName || item.clmc;

        //添加到页面的a标签
        var thisCred = $('<a/>')
            .html('<span>' + credName + '</span>')
            .addClass('cred' + (item.clsqzt != '' ? ' exist' : ''))
            .addClass(sortClass)
            .attr('href', 'javascript:;')
            .css({
                position: 'relative'
            })
            .data('cred', credData);

        // 添加的材料说明
        var thisCredExplain = '<div class="explain">' +
            '<div class="explain-content">' +
            '<h3 class="ell" title="' + credName + '">' + credName + '</h3>' +
            '<p>收取形式：' + clsqxsTxt + '</p>' +
            '<p>详细要求：' + explainTxt + '</p>' +
            '</div>' +
            '<ins class="arrow"><i></i></ins>' +
            '</div>';

        //状态
        var isUpload = item.clsqzt ? ' uploaded' : '';

        if (!self.options.isRepair && !self.options.isRepairEdit && item.clfz != 0) {
            //是否是组材料（一组中存在一个即可）
            var thisGroup = self[type].find('.group' + groupNo);
            if (thisGroup.length) {
                thisCred.appendTo(thisGroup)
                    .wrap('<div class="item-cred-wrap clearfix"></div>')
                    .before(self._getStateHtm(item))
                    .append(thisCredExplain);
                //  分割线
                thisCred.parent().before('<span class="cut-off-rule">|</span>');
                if (item.clsqzt) thisGroup.addClass('uploaded');
                thisCred.siblings('.zj-state-none').remove();
            } else {
                thisCred.appendTo(self[type])
                    .wrap('<li class="group' + groupNo + isUpload + '"></li>')
                    .wrap('<div class="item-cred-wrap clearfix"></div>')
                    .before(self._getStateHtm(item))
                    .append(thisCredExplain);
            }
        } else {
            thisCred.appendTo(self[type])
                .wrap('<li class="' + isUpload + '" style="position: relative;"></li>')
                .wrap('<div class="item-cred-wrap clearfix"></div>')
                .before(self._getStateHtm(item))
                .append(thisCredExplain);
        }

        //补齐补正
        if (!thisCred.closest('li').hasClass('has-input')) {
            if (self.repairCheckbox != '') {
                thisCred.nextAll('.explain').addClass('padded');
                thisCred.closest('li').addClass('cred-li-auto');
            }
            thisCred.parent().prepend(self.repairCheckbox);
            thisCred.parent().append(self.repairInput);
            thisCred.closest('li').addClass('has-input');
        }

        //补正要求
        thisCred.parent().find('a').last().after(self.repairRemark || '');
        if (this.options.isRepairEdit) {
            thisCred.closest('li').addClass('cred-li-auto');
            thisCred.css('max-width', '628px');
            thisCred.closest('li').find('.repair-reason-text').text(item.patchReason).attr('title', item.patchReason);
        }
        if (this.options.isRepair) {
            thisCred.css('max-width', '580px');
        }
        if (!self.options.readonly) {
            if (item.kbbg || item.sfwb) {
                $('<span/>').attr('title', '下载模板')
                    .addClass('span-download-temp')
                    .html('<div class="explain"><div class="explain-content"><ul class="download-choose"></ul></div><ins class="arrow"><i></i></ins></div>')
                    .appendTo(thisCred.parent());
            }

            //样表
            if (item.kbbg) {
                $('<li/>').text('下载空白表格')
                    .attr('title', '下载空白表格')
                    .addClass('download-temp')
                    .addClass(sortClass)
                    .attr('data-type', 'kbbg')
                    .appendTo(thisCred.siblings('.span-download-temp').find('.download-choose'));
            }

            //范文
            if (item.sfwb) {
                $('<li/>').text('下载示范文本')
                    .attr('title', '下载示范文本')
                    .addClass('download-temp')
                    .addClass(sortClass)
                    .attr('data-type', 'sfwb')
                    .appendTo(thisCred.siblings('.span-download-temp').find('.download-choose'));
            }

            //其他材料
            if (item.clbyx == 0) {
                if (thisCred.parent().find('.span-del-cred').length == 0)
                    $('<span/>').attr('title', '删除')
                    .text('删除')
                    .addClass('span-del-cred')
                    .addClass(sortClass)
                    .appendTo(thisCred.parent());
            }

            if (!self.options.isRepairEdit) {
                //绑定材料持有人证件号码和姓名
                self._bindCredOwner(thisCred, credData);

                //绑定条件触发
                self.credTrigger(thisCred, credData);
            }
        }
        thisCred.siblings('.zj-state-ori.has').addClass('zjState-hasRemark').find('p').html('收取说明：' + item.yjbz);
        thisCred.siblings('.zj-state-copy.has').addClass('zjState-hasRemark').find('p').html('收取说明：' + item.fyjbz);
        self._adjustLiWidth(thisCred.parent().parent().not('.has-input'));
    },

    _adjustLiWidth: function($li) {
        if ($li.height() > 45)
            $li.css('width', '98%');
    },

    /* 打开证件窗口 */
    _openCredPop: function(cred, target) {
        var self = this;
        self.currentCred = cred;

        var he = 355,
            wd = 610,
            $target = target;
        var iname = cred.shareName || cred.clmc || cred.clmlName;

        if (self.options.readonly) {
            he = 284;
            wd = 800;
        }
        $.dialog.data('cred', $.extend(cred, {
            readonly: self.options.readonly, //只能查看
            projNo: workflow.projNo, //申报号
            applyName: cred.ownerName, //申请者名称
            applyCardNumber: cred.ownerIdcode, //申请者id
            $cred: self.aCred //当前材料dom元素
        }));
        if (self.options.readonly) {
            if (!$target.siblings('.zj-state-elec').hasClass('has')) {
                $.tip({
                    type: 'warning',
                    text: '没有可以预览的材料信息'
                });
            } else {
                //预览面板
                window.previewDialog = $.dialog.open(self.options.filePreviewPanel, {
                    title: iname,
                    padding: '15px 15px',
                    lock: true,
                    width: '100%',
                    height: '100%',
                    close: function() {
                        var selfDOM = this.DOM;
                        $(selfDOM.main).removeClass('aui_main_no_bgr');
                        $(selfDOM.outer).removeClass('aui_outer_no_bd');
                        $(selfDOM.titleBar).show();
                    },
                    init: function() {
                        var selfDOM = this.DOM;
                        $(selfDOM.main).addClass('aui_main_no_bgr');
                        $(selfDOM.outer).addClass('aui_outer_no_bd');
                        $(selfDOM.titleBar).hide();
                    }
                });
            };
        } else {
            var shareNameEntire = iname; // 材料名称全称

            // 材料名称超长截断处理
            if (shareNameEntire.length > 44) {
                shareNameEntire = shareNameEntire.slice(0, 44) + '...';
            };
            //操作面板
            window.credDialog = $.dialog.open(self.options.fileUploadPanel, {
                title: shareNameEntire,
                padding: '15px 15px',
                width: wd,
                height: he,
                padding: '0',
                okVal: '确认',
                cancelVal: '取消',
                ok: true,
                cancel: true,
                ok: function() {
                    this.iframe.contentWindow.saveFile();
                    return false;
                },
                close: function() {
                    var self = this,
                        $title = self.DOM.title;

                    $title.removeAttr('title');
                    this.iframe.contentWindow.setCredStatus();
                },
                init: function() {
                    var self = this,
                        $title = self.DOM.title;

                    $title.attr('title', iname);
                }
            });
            if (window.top) {
                window.top.credDialog = window.credDialog;
            }
        }

    },

    /* 更新证件状态 */
    _setCredStatus: function(uuid) {
        var self = this;
        var cred = self.currentCred,
            acred = self.aCred.data('cred');

        if (uuid) {
            self.aCred.addClass('exist')
                .siblings('.zj-state-elec').addClass('has')
                .parent().parent().addClass('uploaded');
        } else {
            var aParent = self.aCred.parent().parent();
            self.aCred.siblings('.zj-state-elec').removeClass('has');
            if (self.aCred.siblings('.has').length == 0) {
                self.aCred.removeClass('exist');
            }
            if (aParent.find('.exist').length == 0) {
                aParent.removeClass('uploaded');
            }
        }
        acred.cluuid = uuid;
    },

    /* 拉取所有证件信息 */
    getAllCred: function() {
        var self = this;
        var creds = self.element.find('li:not(".novalid")').find('a.cred');
        self.getStoredCertiData(creds, self.options.person);
    },

    /* 更新所有证件状态 */
    getAllCredStatus: function() {
        var self = this;
        var list = [];
        self.element.find('a.cred').each(function(i) {
            var thisCred = $(this).data('cred');
            list.push({
                identity: thisCred.ownerIdcode,
                type: thisCred.zjlb
            });
        });
        dao.licenseFileList(fly.json.toJSON(list)).done(
            function(res) {
                //TODO
            });
    },

    /* 判断是否存在people */
    checkPeople: function(cred) {
        var self = this;
        if (this.options.readonly)
            return true;
        if (this.options.isRepair)
            return true;
        if (this.options.isRepairEdit)
            return true;
        //必须存在持有人证件号码
        if (cred.ownerIdcode && cred.ownerName)
            return true;
        var param = cred.ownerCode ? fly.json.evalJSON(cred.ownerCode) : self.options.defaultOwner,
            $form = $('form[name="' + param.formName + '"]'),
            $idInput = $form.find('input[name="' + param.ownerIdcode + '"]'),
            $nameInput = $form.find('input[name="' + param.ownerName + '"]');
        if ($idInput.length == 0)
            return true;
        var $tab = $('.fly-tab').find('.tab-ul-li[name="' + $form.closest('.fly-tab-item').attr('data-tab-content') + '"]');
        if (!cred.ownerIdcode && !$.trim($idInput.val())) {
            $tab.click();
            $idInput.focus();
            $.tip({
                type: 'warning',
                text: '请先填写持有人证件号码'
            });
            return false;
        }
        if (!cred.ownerName && !$.trim($nameInput.val())) {
            $tab.click();
            $nameInput.focus();
            $.tip({
                type: 'warning',
                text: '请先填写持有人名称'
            });
            return false;
        }
        if ($.trim($idInput.val()) && $.trim($nameInput.val())) {
            return true;
        }
        return false;
    },

    /* 检测必备材料上传状态 */
    checkUpload: function() {
        var self = this;
        if (!self.options.grouping) {
            if (self.necessary.find('i.required').parent().parent('li:not(".uploaded"):not(".download-temp")').length)
                return false;
            else
                return true;
        } else {
            if (self.necessary && self.necessary.find('li:not(".novalid"):not(".uploaded"):not(".download-temp")').length) {
                return false;
            } else {
                return true;
            }
        }
    },

    /* 获取所有材料 */
    getCredData: function() {
        var self = this;
        var list = [];
        self.element.find('li a.cred').each(function(i) {
            var cred = $(this).data('cred');
            cred.clbh = cred.clbh || fly.utils.generateGUID('other-cred');
            cred.istake = cred.istake || 0;
            cred.clbyx = cred.clbyx || 0;
            cred.projNo = workflow.projNo;
            cred.selectedMeterials = cred.selectedMeterials || fly.json.toJSON([]);
            cred.$cred = '';
            list.push(cred);
        });
        return list;
    },

    //获取可视材料
    getVisibleCredData: function() {
        var self = this;
        var list = [];
        self.element.find('li a.cred').not('.cred-invalid').each(function(i) {
            var cred = $(this).data('cred');
            cred.clbh = cred.clbh || fly.utils.generateGUID('other-cred');
            cred.istake = cred.istake || 0;
            cred.clbyx = cred.clbyx || 0;
            cred.projNo = workflow.projNo;
            cred.selectedMeterials = cred.selectedMeterials || fly.json.toJSON([]);
            cred.$cred = '';
            list.push(cred);
        });
        return list;
    },


    //获取补齐补正材料data
    getCredRepairData: function() {
        var self = this;
        var list = [],
            pass = true;
        var valid = {
            patchReason: {
                title: '补正要求',
                required: true,
                max: 500
            }
        };
        self.element.find('li').find('.cred').each(function(i) {
            if (!pass)
                return;
            if ($(this).siblings('.check-box-wrap').find('.checked').length == 0)
                return;
            var $this = $(this).data('cred');
            var reason = $(this).siblings('.repair-reason').find('input[name="patchReason"]').val();
            if (reason === '') {
                reason = '';
                $(this).siblings('.repair-reason').focus();
                pass = false;
                $(this).siblings('.repair-reason').testRemind("请填写补正要求");
                return;
            } else if (reason.length > 100) {
                pass = false;
                $(this).siblings('.repair-reason').focus();
                $(this).siblings('.repair-reason').testRemind("补交说明不得超过100个字符");
                $(this).siblings('.repair-reason').find('input[name="patchReason"]').selectRange(100, reason.length);
                return;
            }
            list.push({
                attrId: $this.id,
                patchReason: reason
            });
        });
        if (pass && list.length == 0) {
            $.tip({
                text: '请选择需要补齐补正的材料'
            });
        }
        return pass ? list : [];
    },

    /* 获取补交的材料信息 */
    getRepairedCredData: function() {
        var self = this;
        var list = [];
        if (self.element && self.element.find('li:not(".uploaded")').length) {
            return null;
        }
        self.element.find('li.uploaded').find('a.exist').each(function(i) {
            var $this = $(this).data('cred');
            list.push({
                id: $this.id,
                attrCode: $this.clbh,
                attrName: $this.shareName,
                istake: $this.istake || 0,
                clsqzt: $this.clsqzt || '',
                clsqxs: $this.clsqxs || '',
                clkVersion: $this.clkVersion || '',
                patchReason: $this.patchReason,
                patchId: $this.patchId,
                selectedMeterials: $this.selectedMeterials || fly.json.toJSON([]),
                yjbz: $this.yjbz || '',
                fyjbz: $this.fyjbz || ''
            });
        });
        return list;
    },

    //修改插件参数
    _setOption: function(key, value) {
        var self = this;
        self._super(key, value);

        if (key == 'necessary') {
            this._renderNecessary();
        }
        if (key == 'optional') {
            this._renderOptional();
        }
        if (key == 'other') {
            this._renderOther();
        }
    },

    _destroy: function() {

    },

    //修改证件号码：重置材料状态，获取证照文库数据
    modifyOwnerIdcode: function($cred, idcode, clear) {
        var self = this;
        if (self.options.readonly)
            return;
        var cred = $cred.data('cred'),
            $item = $cred.parent().parent(),
            $iele = $cred.siblings('.zj-state-elec'),
            reset = {};
        //置空材料
        reset = self.joinOldMaterials(cred.selectedMeterials, "[]", clear);
        cred.ownerIdcode = idcode;
        cred.selectedMeterials = reset.selectedMeterials;
        cred.istake = clear ? '0' : cred.istake;
        $cred.data('cred', cred);
        //设置电原复状态
        if (clear)
            $cred.siblings('i').removeClass('has').removeClass('zjState-hasRemark');
        self.updateFormatAndState(cred.istake == '1', $iele, $cred, $item);
        if (!cred.ownerIdcode)
            return;
        dao.getZjDetail(cred.ownerIdcode, cred.clmlCode, cred.clkVersion).done(function(res) {
            if (res.flag == 'true') {
                var data = res.data,
                    cred = $cred.data('cred');
                //重置材料
                reset = self.joinOldMaterials(cred.selectedMeterials, data.selectedMeterials, clear);
                cred.selectedMeterials = reset.selectedMeterials;
                cred.istake = clear ? data.istake : (cred.istake || data.istake);
                cred.ownerIdcode = data.ownerIdcode;
                $cred.data('cred', cred);
                self.updateFormatAndState((cred.istake == '1'), $iele, $cred, $item);
            } else {
                self.updateFormatAndState(false, $iele, $cred, $item);
            }
        }).fail(function() {
            self.updateFormatAndState(false, $iele, $cred, $item);
        });
    },

    updateFormatAndState: function(flag, $format, $state, $item) {
        var self = this,
            states = [],
            icred = $state.data('cred');
        if (flag)
            $format.addClass('has');
        else
            $format.removeClass('has');
        if ($state.siblings('.has').length == 0)
            $state.removeClass('exist');
        else
            $state.addClass('exist');
        if ($item.find('.exist').length == 0)
            $item.removeClass('uploaded');
        else
            $item.addClass('uploaded');
        $state.siblings('i.has').each(function(i, obj) {
            states.push($(obj).data('value').toString());
        });
        icred.clsqzt = states.join(',');
        $state.data('cred', icred);
    },

    joinOldMaterials: function(olds, mtrs, clear) {
        var reset = {};
        if (clear) {
            reset.selectedMeterials = mtrs;
        } else {
            var oldsArr = fly.json.evalJSON(olds),
                mtrsArr = fly.json.evalJSON(mtrs),
                alls = [];
            //去重    
            $.each(mtrsArr, function(i, obj) {
                if ($.grep(oldsArr, function(n, j) {
                        return n.attrSourceCode == obj.attrSourceCode;
                    }, false).length == 0) {
                    oldsArr.push(obj);
                }
            });
            reset.selectedMeterials = fly.json.toJSON(oldsArr);
        }
        reset.istake = (fly.json.evalJSON(reset.selectedMeterials)).length > 0 ? '1' : '0';
        return reset;
    },

    isReloadCred: function($ele, callback, cacheChanges) {
        var self = this;
        if ($ele.hasClass('error')) {
            self.ownerChanges = [];
            return false;
        }
        var oldValue = $.trim(($ele.data('valForReload') || '').toUpperCase()),
            nowValue = $.trim(($ele.val() || '').toUpperCase());
        $ele.data('valForReload', nowValue);
        if (!nowValue) {
            self.ownerChanges = [];
            return false;
        }
        //修改
        if ((oldValue && oldValue != nowValue) || $ele.data('_ownerchange')) {
            cacheChanges && cacheChanges();
            $ele.data('_ownerchange', true);
            if (!self.ownerChanged) {
                self.ownerChanged = true;
                self.dialogOwnerConfirm = message.confirmDialog({
                    id: 'dialogOwnerConfirm',
                    content: '证件编号已变更，是否清空已上传材料？',
                    okVal: '清空',
                    cancelVal: '不清空',
                    init: function() {
                        this.DOM.close.hide();
                    },
                    ok: function() {
                        self.dialogOwnerConfirm.hide();
                        message.confirmDialog({
                            content: '确定清空已上传材料？',
                            init: function() {
                                this.DOM.close.hide();
                            },
                            ok: function() {
                                //清空已上传
                                $.each(self.ownerChanges, function(i, item) {
                                    item(true);
                                });
                                $.dialog.list['dialogOwnerConfirm'].close();
                            },
                            cancel: function() {
                                self.dialogOwnerConfirm.show();
                            }
                        });
                        return false;
                    },
                    cancel: function() {
                        //不清空已上传
                        $.each(self.ownerChanges, function(i, item) {
                            item(false);
                        });
                    },
                    close: function() {
                        self.ownerChanges = [];
                        self.ownerChanged = false;
                    }
                });
            }
        } else {
            //第一次录入
            self.ownerChanges = [];
            callback && callback();
        }
    },

    //绑定材料持有人证件号码和姓名
    _bindCredOwner: function(thisCred, credData) {
        var self = this;
        var param = credData.ownerCode ? fly.json.evalJSON(credData.ownerCode) : self.options.defaultOwner,
            formCode = param.formName,
            idInput = param.ownerIdcode,
            nameInput = param.ownerName;
        var $form = $('form[name="' + formCode + '"]'),
            $this = $form.find('input[name="' + idInput + '"]');
        if ($form.length != 0 && $this.length > 0) {
            var bindNum = $this.data('bindcrednum') || 0;
            $this.data('bindcrednum', bindNum + 1);
            $this.data('bindcrednumtotal', bindNum + 1);
            $this.data('valForReload', $this.val());
            var $idcard = $form.data('flyForm').getControl(idInput);
            $idcard.change(function(e) {
                var idcardWidget = $idcard.closest('.control').data('flyIdcard');
                if (idcardWidget && !fly.validate.isPass(idcardWidget.control, idcardWidget.options.valid, false)) {
                    return;
                }
                var idValue = $.trim($this.val()),
                    cred = thisCred.data('cred');
                if (!idValue)
                    return;
                self.isReloadCred($this, function() {
                    self.modifyOwnerIdcode(thisCred, idValue, true);
                }, function() {
                    self.ownerChanges.push(function(clear) {
                        self.modifyOwnerIdcode(thisCred, idValue, clear);
                    });
                });
            });
            $form.data('flyForm').getControl(nameInput).change(function(e) {
                self.modifyOwnerName(thisCred, $form.find('input[name="' + nameInput + '"]').val());
            });
            $form.bind('changeOwnerName', function() {
                self.modifyOwnerName(thisCred, $form.find('input[name="' + nameInput + '"]').val());
            })
        }
    },

    //修改姓名：同步修改材料持有人姓名
    modifyOwnerName: function($cred, name) {
        var self = this;
        if (self.options.readonly)
            return;
        var cred = $cred.data('cred');
        cred.ownerName = name;
        $cred.data('cred', cred);
    },

    //获取证照文库数据
    getStoredCertiData: function(creds) {
        var self = this;
        var credLength = creds.length;
        for (var i = 0, l = credLength; i < l; i++) {
            (function(t) {
                setTimeout(function() {
                    (function(y) {
                        var $cred = creds.eq(y),
                            $item = $cred.parent().parent(),
                            $iele = $cred.siblings('.zj-state-elec'),
                            cred = $cred.data('cred');
                        cred.istake = '0';
                        cred.selectedMeterials = "[]";
                        $cred.data('cred', cred);
                        if (!self.options.readonly) {
                            dao.getZjDetail(cred.ownerIdcode, cred.clmlCode, cred.clkVersion).done(function(res) {
                                credLength--;
                                if (res.flag == 'true') {
                                    var data = res.data;
                                    cred.selectedMeterials = data.selectedMeterials;
                                    cred.istake = data.istake;
                                    $cred.data('cred', cred);
                                    self.updateFormatAndState((data.istake == 1), $iele, $cred, $item);
                                }
                            }).fail(function() {
                                credLength--;
                            });
                        }
                    })(t);
                }, t * 500);
            })(i);
        }
    },

    //条件触发
    credTrigger: function($cred, credData) {
        var self = this;
        if (!credData.cltj) return;
        var conditions = fly.json.evalJSON(credData.cltj);
        $.each(conditions, function(i, obj) {
            var $form = $('form[name="' + obj.formName + '"]');
            if ($form.length == 0) {
                return;
            }
            $control = $form.data('flyForm').getControl(obj.controlName);
            if ($control.length > 0) {
                self.credConditionInit($cred, $control, obj, credData);
                $control.change(function(e) {
                    self.credConditionInit($cred, $(this), obj, credData);
                });
            }
        });
    },

    //条件初始化
    credConditionInit: function($cred, $control, obj, credData) {
        var self = this;
        var arr = obj.value.split(';'),
            type = obj.controlTypeName,
            value = '';
        switch (type) {
            case 'combobox':
                value = $control.find('input[name="' + obj.controlName + '"]').val();
                break;
            case 'radio':
                value = $control.find('input[name="' + obj.controlName + '"]:checked').val();
                break;
        };
        if (!value) return;
        var result1 = obj.result == '1' ? 'show' : 'hide',
            result2 = result1 == 'show' ? 'hide' : 'show',
            $li = $cred.closest('li');
        if ($.inArray(value, arr) > -1) {
            $cred.parent()[result1]();
            if (result1 == 'show') {
                $cred.removeClass('cred-invalid');
                $li.show();
            } else {
                $cred.addClass('cred-invalid');
            }
            self.updateItem($cred);
        } else {
            $cred.parent()[result2]();
            if (result2 == 'show') {
                $cred.removeClass('cred-invalid');
                $li.show();
            } else {
                $cred.addClass('cred-invalid');
            }
            self.updateItem($cred);
        }

    },

    //切换材料目录样式
    updateItem: function($cred) {
        var self = this;
        var $li = $cred.closest('li');
        $li.removeClass('novalid').show();
        if (($.grep($li.find('.item-cred-wrap'), function(n, i) {
                return $(n).css('display') != 'none'
            })).length == 0) {
            $li.addClass('novalid').hide();
        } else {
            if ($li.find('.exist').length == 0) {
                $li.removeClass('uploaded');
            } else {
                $li.addClass('uploaded');
            }
            $li.show();
        }

    }

});

var handler = function() {};

module.exports = handler;

},{}],4:[function(require,module,exports){
/**
 * 申请审核提交数据组装
 * 依赖自定义表单引擎
 */
var message = require('./message');
var $basicForm = {},
    $applyForm = [],
    $approveForm = [],
    $acceptForm = [],
    $preauditForm = [],
    $chargeForm = [],
    $issueForm = [],
    applicant = {},
    approveFormInfo = {},
    validRel = { // 验证规则
        submitReason: {
            textarea: {
                title: '审批意见',
                required: true,
                max: 200
            }
        }
    };

var CompareForSort = function(first, second) {
    var f = Number(first.private.sortOrder || first.private.orderIndex),
        s = Number(second.private.sortOrder || second.private.orderIndex);
    if (f == s)
        return 0;
    if (f < s)
        return -1;
    else
        return 1;
}

var dataAssemble = {

    applyForm: [],

    //取得表单引用
    setBasicFormQuote: function($ele) {
        $basicForm = $ele;
        this.basicForm = $ele;
    },

    setBizFormQuotes: function($ele) {
        $applyForm.push($ele);
        this.applyForm.push($ele);
    },

    setAcceptFormQuotes: function($ele) {
        $acceptForm.push($ele);
    },

    // 审核表单引用
    setApproveFormQuote: function($ele, obj) {
        $approveForm.push($ele);
    },
    // 预审表单引用
    setPreauditFormQuote: function($ele, obj) {
        $preauditForm.push($ele);
    },
    // 收费表单引用
    setChargeFormQuote: function($ele, obj) {
        $chargeForm.push($ele);
    },
    // 发证表单引用
    setIssueFormQuote: function($ele, obj) {
        $issueForm.push($ele);
    },
    //基本信息
    getBasicData: function(param) {
        var data = $basicForm.action.getData(true, param.operateFlag == 1);
        if (!data)
            return null;
        data.projPwd = workflow.projPwd;
        applicant.applyName = data.applyName;
        applicant.applyCardNumber = data.applyCardNumber;
        if (data.useSSZT) {
            data.receiveDeptCode = workflow.sszt;
            data.receiveDeptName = workflow.ssztName;
            data.receiveOrgcode = workflow.sszt;
        }
        applicant.basicData = data;
        return fly.json.toJSON(data);
    },

    //申请信息
    getApplyData: function(param) {
        var arr = [],
            ispass = true;
        var $newApply = $applyForm;

        //提交时不保存主动隐藏的表单
        if (param.operateFlag == 1) {
            $newApply = $.grep($newApply, function(n, i) {
                return !n.action.element.hasClass('invalid');
            }, false);
        }

        $newApply = $newApply.sort(CompareForSort);

        $.each($newApply, function(i, iobj) {
            if (!ispass)
                return;
            //先切换到当前tab页
            var $myTab = iobj.action.element.closest('.fly-tab-item');
            if ($myTab.length) {
                $myTab.parent().parent()
                    .data('flyTab').switchTab(
                        $myTab.data(
                            'tabContent'
                        ));
            }
            var data = iobj.action.getData((param.operateFlag == 1), param.operateFlag == 1);
            if (!data) {
                ispass = false;
                return false;
            }
            arr.push($.extend({}, iobj.private, {
                itemValuesJson: fly.json.toJSON(data)
            }));
        });
        if (arr.length != $newApply.length) return null;
        arr.push($.extend({}, $basicForm.private, {
            itemValuesJson: fly.json.toJSON(applicant.basicData)
        }));
        arr.sort(function(a, b) {
            return a.sortOrder > b.sortOrder;
        });
        return fly.json.toJSON(arr);
    },

    //材料信息
    getCredData: function(param) {
        var cred = $('#credentials').data('flyCredentials');
        if (param.operateFlag == '1' && !cred.checkUpload()) {
            message.alertDialog({
                content: '请上传所有的必备材料！'
            });
            return null;
        }
        if (param.operateFlag == '0') {
            return fly.json.toJSON(cred.getCredData());
        }
        return fly.json.toJSON(cred.getVisibleCredData());
    },

    //数据组装
    getAssemblyData: function(param) {
        var basicData = this.getBasicData(param);
        if (!basicData)
            return null;
        var applyData = this.getApplyData(param);
        if (!applyData)
            return null;
        var credData = this.getCredData(param);
        if (!credData)
            return null;
        return {
            formData: fly.json.toJSON({
                basicFormData: basicData,
                applyForms: applyData
            }),
            credData: credData,
            projNo: workflow.projNo,
            serviceId: workflow.serviceId,
            serviceCode: workflow.serviceCode,
            serviceVersion: workflow.serviceVersion,
            applyName: applicant.applyName,
            applyCardNumber: applicant.applyCardNumber,
            operateFlag: param.operateFlag,
            registerFlag: fly.utils.getQueryString('registerFlag') || ''
        };
    },

    /**
     * 获取审核表单数据
     * @param   {object} param  校验参数
     * @returns {json}
     */
    getApproveData: function(param) {
        var arr = [],
            ispass = true,
            notPrint = !param.isPrint; //不是打印时才校验

        $approveForm = $approveForm.sort(CompareForSort);

        $.each($approveForm, function(i, iobj) {
            if (!ispass)
                return;
            //先切换到当前tab页
            var $myTab = iobj.action.element.closest('.fly-tab-item');
            if ($myTab.length) {
                $myTab.parent().parent().data('flyTab').switchTab(
                    $myTab.data(
                        'tabContent'
                    ));
            }
            var data = iobj.action.getData(true && notPrint, true && notPrint);
            if (!data) {
                ispass = false;
                return false;
            }
            arr.push($.extend({}, iobj.private, {
                itemValuesJson: fly.json.toJSON(data)
            }));
        });
        if (arr.length != $approveForm.length) return null;
        arr.sort(function(a, b) {
            return a.sortOrder > b.sortOrder;
        });
        return fly.json.toJSON(arr);
    },

    /**
     * 获取审核材料数据
     * @param   {object} param  校验参数
     * @returns {object}
     */
    getApproveCredData: function(param) {
        var cred = $('#approvalPanel .form-content-credentials').data('flyCredentials');
        if (!cred)
            return [];
        //如果是打印，不需校验必备材料
        if (param.isPrint)
            return cred.getVisibleCredData();
        if (!cred.checkUpload()) {
            message.alertDialog({
                content: '请上传所有的必备材料！'
            });
            return null;
        }
        return cred.getVisibleCredData();
    },

    // 审核数据组装
    getApproveAssemblyData: function(param) {
        // 定义审核区域表单信息
        var approveData = [],
            workflowData = workflow,
            theCreds,
            approveSendInfo,
            signInfo = '',
            signImgBase64 = '',
            approveStamp = {},
            hasStamp = workflow.hasStamp,
            notPrint = !param.isPrint,
            signData = {
                signInfo: '',
                signImg: '',
                documentId: ''
            },
            $opinion = $('#approvalPanel textarea[name="approveOpinion"]'),
            ivalid = {
                title: '处理意见',
                required: true && notPrint,
                max: 200
            };
        // 先判断是否有表单,如果有
        if ($approveForm.length) {
            $('#approvalPanel').find('#toggle_form_content_btn').addClass('toggle-form-content-btn-fold');
            $('#approvalPanel').find('.canvas-form').removeClass('hide');
            // 获取表单信息
            approveData = this.getApproveData(param);
            if (!approveData)
                return null;
        }

        // 验证意见框
        if (notPrint) {
            var reasonResult = fly.validate.isPass($opinion, ivalid);
            if (!reasonResult) {
                $opinion.get(0).scrollIntoView();
                $opinion.selectRange(200, $.trim($opinion.val()).length);
                return;
            }
        }
        reasonResult = {
            approveOpinion: $.trim($opinion.val())
        };

        // 判断是否需要盖章,如果是打印不需要
        if (hasStamp) {
            approveStamp = $('#approveStampBtn').data('flyWebsign');
            btnVal = approveStamp.control.val();

            // 判断是否盖了章
            if ((btnVal == '' || btnVal == undefined) && notPrint) {
                $.tip({
                    text: '请盖章'
                });
                return;
            } else {
                signInfo = btnVal;
                signImgBase64 = approveStamp.imgBase64;
            }

            signData = (APPCONFIG.signName == 'jinge' || APPCONFIG.signName == 'jingeh5') ? {
                signInfo: approveStamp.$signature.val(),
                signImg: signImgBase64,
                documentId: approveStamp.$docId.val()
            } : {
                signInfo: signInfo,
                signImg: signImgBase64,
                documentId: ''
            };
        }

        //受理材料数据
        theCreds = this.getApproveCredData(param);
        if (!theCreds)
            return;

        // 返回参数
        returnData = {
            projNo: workflow.projNo,
            workItemId: workflow.workItemId,
            linkCode: workflow.linkCode,
            operateFlag: param.operateFlag,
            nodeData: fly.json.toJSON($.extend({
                operateOpinion: reasonResult.approveOpinion
            }, signData)),
            formData: fly.json.toJSON({
                applyForms: approveData
            }),
            credData: fly.json.toJSON(theCreds)
        }

        return returnData;
    },

    // 审核打回数据组装
    getApproveBackAssemblyData: function(param) {
        workflowData = workflow,
            returnData = {
                'nodeData': {
                    'nodeNo': approveFormInfo.nodeNo
                },
                'linkCode': workflowData.linkCode,
                'projNo': workflowData.projNo,
                'workItemId': workflowData.workItemId,
                'operateFlag': param.operateFlag
            };
        return returnData;
    },

    //获取受理表单数据
    getAcceptData: function(param) {
        var arr = [],
            ispass = true,
            notPrint = !param.isPrint;

        $acceptForm = $acceptForm.sort(CompareForSort);

        $.each($acceptForm, function(i, iobj) {
            if (!ispass)
                return;
            //先切换到当前tab页
            var $myTab = iobj.action.element.closest('.fly-tab-item');
            if ($myTab.length) {
                $myTab.parent().parent().data('flyTab').switchTab(
                    $myTab.data(
                        'tabContent'
                    ));
            }
            var data = iobj.action.getData(true && notPrint, true && notPrint);
            if (!data) {
                ispass = false;
                return false;
            }
            arr.push($.extend({}, iobj.private, {
                itemValuesJson: fly.json.toJSON(data)
            }));
        });
        if (arr.length != $acceptForm.length) return null;
        arr.sort(function(a, b) {
            return a.sortOrder > b.sortOrder;
        });
        return fly.json.toJSON(arr);
    },

    //获取受理材料数据
    getAcceptCredData: function(param) {
        var cred = $('#acceptPanel .form-content-credentials').data('flyCredentials');
        if (!cred)
            return [];
        if (param.isPrint)
            return cred.getVisibleCredData();
        if (!cred.checkUpload()) {
            message.alertDialog({
                content: '请上传所有的必备材料！'
            });
            return null;
        }
        return cred.getVisibleCredData();
    },

    // 受理数据组装
    getAcceptAssemblyData: function(param) {
        var acceptData = [],
            theCreds,
            acceptSendInfo,
            acceptStamp = {},
            hasStamp = workflow.hasStamp,
            workflowData = workflow,
            signInfo = '',
            signImgBase64 = '',
            notPrint = !param.isPrint,
            signData = {
                signInfo: '',
                signImg: '',
                documentId: ''
            },
            $opinion = $('#acceptPanel textarea[name="handleOpinion"]'),
            ivalid = {
                title: '处理意见',
                required: true,
                max: 200
            };

        //受理表单数据
        if ($acceptForm.length > 0) {
            $('#acceptPanel').find('#toggle_form_content_btn').addClass('toggle-form-content-btn-fold');
            $('#acceptPanel').find('.canvas-form').removeClass('hide');
            acceptData = this.getAcceptData(param);
            if (!acceptData)
                return;
        }

        // 验证意见框
        if (notPrint) {
            var reasonResult = fly.validate.isPass($opinion, ivalid);
            if (!reasonResult) {
                $opinion.get(0).scrollIntoView();
                $opinion.selectRange(200, $.trim($opinion.val()).length);
                return;
            }
        }
        reasonResult = {
            handleOpinion: $.trim($opinion.val())
        };

        // 判断是否需要盖章
        if (hasStamp) {
            acceptStamp = $('#acceptStampBtn').data('flyWebsign');
            btnVal = acceptStamp.control.val();
            // 判断是否盖了章
            if ((btnVal == '' || btnVal == undefined) && notPrint) {
                $.tip({
                    text: '请盖章'
                });
                return;
            } else {
                signInfo = btnVal;
                signImgBase64 = acceptStamp.imgBase64;
            }
            signData = (APPCONFIG.signName == 'jinge' || APPCONFIG.signName == 'jingeh5') ? {
                signInfo: acceptStamp.$signature.val(),
                signImg: signImgBase64,
                documentId: acceptStamp.$docId.val()
            } : {
                signInfo: signInfo,
                signImg: signImgBase64,
                documentId: ''
            };
        }

        //受理材料数据
        theCreds = this.getAcceptCredData(param);
        if (!theCreds)
            return;

        return $.extend({
            projNo: workflow.projNo,
            workItemId: workflow.workItemId,
            operateFlag: param.operateFlag,
            curHandleOpinion: reasonResult.handleOpinion,
            formData: fly.json.toJSON({
                applyForms: acceptData
            }),
            credData: fly.json.toJSON(theCreds)
        }, signData);
    },

    // 预审数据组装
    getPreauditAssemblyData: function(param) {
        var preauditData = [],
            theCreds,
            acceptSendInfo,
            preauditStamp = {},
            hasStamp = workflow.hasStamp,
            workflowData = workflow,
            signInfo = '',
            signImgBase64 = '',
            notPrint = !param.isPrint,
            signData = {
                signInfo: '',
                signImg: '',
                documentId: ''
            },
            $opinion = $('#preauditPanel textarea[name="handleOpinion"]'),
            ivalid = {
                title: '处理意见',
                required: true,
                max: 200
            };

        //预审表单数据
        if ($preauditForm.length > 0) {
            $('#preauditPanel').find('#toggle_form_content_btn').addClass('toggle-form-content-btn-fold');
            $('#preauditPanel').find('.canvas-form').removeClass('hide');
            preauditData = this.getPreauditData(param);
            if (!preauditData)
                return;
        }

        // 验证意见框
        if (notPrint) {
            var reasonResult = fly.validate.isPass($opinion, ivalid);
            if (!reasonResult) {
                $opinion.get(0).scrollIntoView();
                $opinion.selectRange(200, $.trim($opinion.val()).length);
                return;
            }
        }
        reasonResult = {
            handleOpinion: $.trim($opinion.val())
        };

        // 判断是否需要盖章
        if (hasStamp) {
            preauditStamp = $('#preauditStampBtn').data('flyWebsign');
            btnVal = preauditStamp.control.val();
            // 判断是否盖了章
            if ((btnVal == '' || btnVal == undefined) && notPrint) {
                $.tip({
                    text: '请盖章'
                });
                return;
            } else {
                signInfo = btnVal;
                signImgBase64 = preauditStamp.imgBase64;
            }
            signData = (APPCONFIG.signName == 'jinge' || APPCONFIG.signName == 'jingeh5') ? {
                signInfo: preauditStamp.$signature.val(),
                signImg: signImgBase64,
                documentId: preauditStamp.$docId.val()
            } : {
                signInfo: signInfo,
                signImg: signImgBase64,
                documentId: ''
            };
        }

        //预审材料数据
        theCreds = this.getPreauditCredData(param);
        if (!theCreds)
            return;

        return $.extend({
            projNo: workflow.projNo,
            workItemId: workflow.workItemId,
            operateFlag: param.operateFlag,
            curHandleOpinion: reasonResult.handleOpinion,
            remark: reasonResult.handleOpinion,
            formData: fly.json.toJSON({
                applyForms: preauditData
            }),
            credData: fly.json.toJSON(theCreds)
        }, signData);
    },
    //获取预审表单数据
    getPreauditData: function(param) {
        var arr = [],
            ispass = true,
            notPrint = !param.isPrint;

        $preauditForm = $preauditForm.sort(CompareForSort);

        $.each($preauditForm, function(i, iobj) {
            if (!ispass)
                return;
            //先切换到当前tab页
            var $myTab = iobj.action.element.closest('.fly-tab-item');
            if ($myTab.length) {
                $myTab.parent().parent().data('flyTab').switchTab(
                    $myTab.data(
                        'tabContent'
                    ));
            }
            var data = iobj.action.getData(true && notPrint, true && notPrint);
            if (!data) {
                ispass = false;
                return false;
            }
            arr.push($.extend({}, iobj.private, {
                itemValuesJson: fly.json.toJSON(data)
            }));
        });
        if (arr.length != $acceptForm.length) return null;
        arr.sort(function(a, b) {
            return a.sortOrder > b.sortOrder;
        });
        return fly.json.toJSON(arr);
    },
    //获取预审材料数据
    getPreauditCredData: function(param) {
        var cred = $('#preauditPanel .form-content-credentials').data('flyCredentials');
        if (!cred)
            return [];
        if (param.isPrint)
            return cred.getVisibleCredData();
        if (!cred.checkUpload()) {
            message.alertDialog({
                content: '请上传所有的必备材料！'
            });
            return null;
        }
        return cred.getVisibleCredData();
    },
    // 收费数据组装
    getChargeAssemblyData: function(param) {
        var chargeData = [],
            theCreds,
            acceptSendInfo,
            chargeStamp = {},
            hasStamp = workflow.hasStamp,
            workflowData = workflow,
            signInfo = '',
            signImgBase64 = '',
            notPrint = !param.isPrint,
            signData = {
                signInfo: '',
                signImg: '',
                documentId: ''
            },
            $opinion = $('#chargePanel textarea[name="handleOpinion"]'),
            ivalid = {
                title: '处理意见',
                required: true,
                max: 200
            };
        //收费表单数据
        if ($chargeForm.length > 0) {
            $('#chargePanel').find('#toggle_form_content_btn').addClass('toggle-form-content-btn-fold');
            $('#chargePanel').find('.canvas-form').removeClass('hide');
            chargeData = this.getChargeData(param);
            if (!chargeData)
                return;
        }

        // 验证意见框
        if (notPrint) {
            var reasonResult = fly.validate.isPass($opinion, ivalid);
            if (!reasonResult) {
                $opinion.get(0).scrollIntoView();
                $opinion.selectRange(200, $.trim($opinion.val()).length);
                return;
            }
        }
        reasonResult = {
            handleOpinion: $.trim($opinion.val())
        };

        // 判断是否需要盖章
        if (hasStamp) {
            chargeStamp = $('#approveStampBtn').data('flyWebsign');
            btnVal = chargeStamp.control.val();
            // 判断是否盖了章
            if ((btnVal == '' || btnVal == undefined) && notPrint) {
                $.tip({
                    text: '请盖章'
                });
                return;
            } else {
                signInfo = btnVal;
                signImgBase64 = chargeStamp.imgBase64;
            }
            signData = (APPCONFIG.signName == 'jinge' || APPCONFIG.signName == 'jingeh5') ? {
                signInfo: chargeStamp.$signature.val(),
                signImg: signImgBase64,
                documentId: chargeStamp.$docId.val()
            } : {
                signInfo: signInfo,
                signImg: signImgBase64,
                documentId: ''
            };
        }

        //收费材料数据
        theCreds = this.getChargeCredData(param);
        if (!theCreds)
            return;

        return $.extend({
            projNo: workflow.projNo,
            workItemId: workflow.workItemId,
            operateFlag: param.operateFlag,
            curHandleOpinion: reasonResult.handleOpinion,
            remark: reasonResult.handleOpinion,
            formData: fly.json.toJSON({
                applyForms: chargeData
            }),
            credData: fly.json.toJSON(theCreds)
        }, signData);
    },
    //获取收费材料数据
    getChargeCredData: function(param) {
        var cred = $('#chargePanel .form-content-credentials').data('flyCredentials');
        if (!cred)
            return [];
        if (param.isPrint)
            return cred.getVisibleCredData();
        if (!cred.checkUpload()) {
            message.alertDialog({
                content: '请上传所有的必备材料！'
            });
            return null;
        }
        return cred.getVisibleCredData();
    },
    //获取收费表单数据
    getChargeData: function(param) {
        var arr = [],
            ispass = true,
            notPrint = !param.isPrint;

        $chargeForm = $chargeForm.sort(CompareForSort);

        $.each($chargeForm, function(i, iobj) {
            if (!ispass)
                return;
            //先切换到当前tab页
            var $myTab = iobj.action.element.closest('.fly-tab-item');
            if ($myTab.length) {
                $myTab.parent().parent().data('flyTab').switchTab(
                    $myTab.data(
                        'tabContent'
                    ));
            }
            var data = iobj.action.getData(true && notPrint, true && notPrint);
            if (!data) {
                ispass = false;
                return false;
            }
            arr.push($.extend({}, iobj.private, {
                itemValuesJson: fly.json.toJSON(data)
            }));
        });
        if (arr.length != $acceptForm.length) return null;
        arr.sort(function(a, b) {
            return a.sortOrder > b.sortOrder;
        });
        return fly.json.toJSON(arr);
    },
    // 发证数据组装
    getIssueAssemblyData: function(param) {
        var issueData = [],
            theCreds,
            acceptSendInfo,
            issueStamp = {},
            hasStamp = workflow.hasStamp,
            workflowData = workflow,
            signInfo = '',
            signImgBase64 = '',
            notPrint = !param.isPrint,
            signData = {
                signInfo: '',
                signImg: '',
                documentId: ''
            },
            $opinion = $('#issuePanel textarea[name="handleOpinion"]'),
            ivalid = {
                title: '处理意见',
                required: true,
                max: 200
            };
        //发证表单数据
        if ($issueForm.length > 0) {
            $('#issuePanel').find('#toggle_form_content_btn').addClass('toggle-form-content-btn-fold');
            $('#issuePanel').find('.canvas-form').removeClass('hide');
            issueData = this.getIssueData(param);
            if (!issueData)
                return;
        }

        // 验证意见框
        if (notPrint) {
            var reasonResult = fly.validate.isPass($opinion, ivalid);
            if (!reasonResult) {
                $opinion.get(0).scrollIntoView();
                $opinion.selectRange(200, $.trim($opinion.val()).length);
                return;
            }
        }
        reasonResult = {
            handleOpinion: $.trim($opinion.val())
        };

        // 判断是否需要盖章
        if (hasStamp) {
            issueStamp = $('#approveStampBtn').data('flyWebsign');
            btnVal = issueStamp.control.val();
            // 判断是否盖了章
            if ((btnVal == '' || btnVal == undefined) && notPrint) {
                $.tip({
                    text: '请盖章'
                });
                return;
            } else {
                signInfo = btnVal;
                signImgBase64 = issueStamp.imgBase64;
            }
            signData = (APPCONFIG.signName == 'jinge' || APPCONFIG.signName == 'jingeh5') ? {
                signInfo: issueStamp.$signature.val(),
                signImg: signImgBase64,
                documentId: issueStamp.$docId.val()
            } : {
                signInfo: signInfo,
                signImg: signImgBase64,
                documentId: ''
            };
        }

        //发证材料数据
        theCreds = this.getIssueCredData(param);
        if (!theCreds)
            return;

        return $.extend({
            projNo: workflow.projNo,
            workItemId: workflow.workItemId,
            operateFlag: param.operateFlag,
            curHandleOpinion: reasonResult.handleOpinion,
            remark: reasonResult.handleOpinion,
            formData: fly.json.toJSON({
                applyForms: issueData
            }),
            credData: fly.json.toJSON(theCreds)
        }, signData);
    },
    //获取发证材料数据
    getIssueCredData: function(param) {
        var cred = $('#issuePanel .form-content-credentials').data('flyCredentials');
        if (!cred)
            return [];
        if (param.isPrint)
            return cred.getVisibleCredData();
        if (!cred.checkUpload()) {
            message.alertDialog({
                content: '请上传所有的必备材料！'
            });
            return null;
        }
        return cred.getVisibleCredData();
    },
    //获取发证表单数据
    getIssueData: function(param) {
        var arr = [],
            ispass = true,
            notPrint = !param.isPrint;

        $issueForm = $issueForm.sort(CompareForSort);

        $.each($issueForm, function(i, iobj) {
            if (!ispass)
                return;
            //先切换到当前tab页
            var $myTab = iobj.action.element.closest('.fly-tab-item');
            if ($myTab.length) {
                $myTab.parent().parent().data('flyTab').switchTab(
                    $myTab.data(
                        'tabContent'
                    ));
            }
            var data = iobj.action.getData(true && notPrint, true && notPrint);
            if (!data) {
                ispass = false;
                return false;
            }
            arr.push($.extend({}, iobj.private, {
                itemValuesJson: fly.json.toJSON(data)
            }));
        });
        if (arr.length != $issueForm.length) return null;
        arr.sort(function(a, b) {
            return a.sortOrder > b.sortOrder;
        });
        return fly.json.toJSON(arr);
    }

};

module.exports = dataAssemble;

},{"./message":18}],5:[function(require,module,exports){
/**
 * 所属社区联动选择
 *
 * by lcmj
 */

var _ = fly._;
var util = fly.utils;
var $ = fly.$;

//定义jsonp方法
util.ajax.postJsonp = function(url, data) {
    return $.ajax({
        url: APPCONFIG.formContextPath + url,
        data: data || {},
        dataType: 'jsonp',
        type: 'POST',
        jsonp: "callback"
    });
};

var popHtml = '<form data-fly-form class="division-pop clearfix">' +
    '<span class="holder hide"></span><span class="holder hide"></span><span class="holder hide"></span>' +
    '</form>';

var division = $.widget('fly.division', {

    defaultElement: '<div>',

    options: {
        url: 'org/getOrgListByCode.do',
        valueName: 'receiveDeptCode',
        queryBtn: '',
        copyBtn: [],
        fullName: false,
        fullCode: false,
        editable: false,
        defaultMesg: true,
        divField: 'xzqhId',
        items: [{
            name: 'county',
            title: '县(区)'
        }, {
            name: 'countryside',
            title: '乡(街道)'
        }, {
            name: 'village',
            title: '村(社区)'
        }],
        itemOption: {
            type: 'combobox',
            width: '1/3',
            labelWidth: 70,
            textField: 'orgName',
            valueField: 'orgCode',
            emptyText: '请选择'
        },
        onSelect: null
    },

    _create: function() {
        var self = this;

        self.control = self.element.find('.control').addClass('fly-division');
        self.controlEm = self.element.find('.control em');

        //创建保存值的输入框
        self.textInput = self.control.find('.text').attr('readonly', true);
        self.valueInput = $('<input type="hidden" name="' + self.options.valueName + '" />').insertAfter(self.textInput);
        self.jsonInput = $('<input type="hidden" name="' + self.options.valueName + 'Json" />').insertAfter(self.textInput);

        self._selects = [];

        //一站通环境下才渲染默认值
        if ((typeof workflow == "undefined" || !workflow.projNo) && self.options.defaultMesg && CONTEXTPATH.indexOf('yzt') > -1) {
            //获取用户信息
            $.ajax({
                url: CONTEXTPATH + '/getUserInfo.do',
                success: function(res) {
                    if (res && res.organization && res.organization.xzqhId) {
                        var org = res.organization;
                        var code = org.xzqhId;
                        if (code.substring(0, 6) == ($('#ql_xzqhbm').val() || code).substring(0, 6)) {
                            self.defaultDivision();
                        }
                    }
                }
            })
        }

        //创建获取数据的按钮
        if (self.options.queryBtn) {
            self.$read = $('<span class="read" />').insertBefore(self.controlEm).text(self.options.queryBtn);
            self.readWidth = self.$read.width();
        }

        self._renderCopyBtns();

        //设置输入框宽度
        self._setInputWidth();

        self.valid = {};

        self.$body = $('body');

        this._addEvent();
    },

    defaultDivision: function() {
        var self = this;
        //用户默认行政区划
        var code = localStorage.getItem('yztUserOrgCode'),
            name = localStorage.getItem('yztUerOrgName'),
            names = [];

        self.valueInput.val(code);
        var divisionLevel = 5,
            divObj = {};
        divObj['village'] = code || '';
        if (code && code != '') {
            divObj['countryside'] = [code.substr(0, 12), '00000000'].join('');
            divObj['county'] = [code.substr(0, 8), '000000000000'].join('');
        } else {
            divObj['countryside'] = '';
            divObj['county'] = '';
        }
        this.jsonInput.val(fly.json.toJSON(divObj));

        self._getComboData().done(function(res) {
            var name1;
            var obj1 = ($.grep(res, function(n, i) {
                return n.orgCode == divObj.county
            }, false));

            if (obj1.length > 0) {
                name1 = obj1[0].orgName;
            } else {
                name1 = '';
            };

            if (name1 !== divObj) {
                names.push(name1);
            }

            self._getComboData(divObj.county).done(function(res1) {
                var name2;
                var obj2 = ($.grep(res1, function(n, i) {
                    return n.orgCode == divObj.countryside
                }, false));

                if (obj2.length > 0) {
                    name2 = obj2[0].orgName;
                } else {
                    name2 = '';
                };

                if (name2 !== divObj) {
                    names.push(name2);
                }
                if (name2 != name)
                    names.push(name);
                self.textInput.val(name);
            }).fail();

        }).fail();
    },

    //渲染数据复制按钮
    _renderCopyBtns: function() {
        var self = this;
        self.copyBtn = [];
        self.btnWidth = self.readWidth || 0;
        $.each(self.options.copyBtn, function(i, obj) {
            var $spans = self.control.find('span');
            var $btn = $('<span class="copy" />').insertBefore($spans.length > 0 ? $spans.eq(0) : self.controlEm).text(obj.text).css('width', obj.width + 'px');
            self.copyBtn.push($btn);
            self.btnWidth += $btn.width();
            self._bindCopyData($btn, obj);
        });
    },

    //设置输入框宽度
    _setInputWidth: function() {
        this.element.find('.control em').css('margin-right', (this.btnWidth + 6).toString() + 'px');
    },

    _initCombo: function() {
        var self = this,
            len = self.options.items.length,
            values = [],
            dataObj;

        self.jsonObj = fly.json.evalJSON(this.jsonInput.val());

        self.$body.mask();
        self._getComboData('').done(function(res) {

            if (res != 'null') {
                $.each(self.options.items, function(i, obj) {

                    //生成校验规则
                    self.valid[obj.name] = {
                        title: obj.title,
                        required: obj.required
                    };

                    //默认值
                    values.push(self.jsonObj[obj.name]);
                    //
                    var onSelect = i == len - 1 ? {} : {
                        onSelect: function(obj) {

                            //清空所有下属机构
                            for (var j = i + 1; j < self.options.items.length; j++) {
                                var jOption = $.extend(
                                    self.options.items[j], {
                                        data: []
                                    },
                                    self.options.itemOption
                                );
                                jOption.initValue = '';
                                self._renderCombo(jOption);
                            }

                            thisitem = self.options.items[i + 1];
                            //获取字典数据
                            self._getComboData(obj.orgCode).done(function(data) {

                                var thisOption = $.extend(
                                    thisitem, {
                                        data: data
                                    },
                                    self.options.itemOption
                                );
                                thisOption.initValue = '';
                                self._renderCombo(thisOption);

                            }).fail();

                        }
                    };

                    var initValue = {
                        initValue: values[i]
                    };

                    //设置选项数据
                    if (i == 0) {
                        dataObj = {
                            data: res
                        };
                        self._addElement(obj, dataObj, onSelect, initValue, i);
                    } else {
                        if (values[i - 1]) {
                            self._getComboData(values[i - 1]).done(function(res) {
                                dataObj = {
                                    data: res
                                };
                                self._addElement(obj, dataObj, onSelect, initValue, i);
                            });
                        } else {
                            dataObj = {
                                data: []
                            };
                            self._addElement(obj, dataObj, onSelect, initValue, i);
                        }
                    }
                });
            }
            self.$body.mask('remove');
        }).fail(function() {
            self.$body.mask('remove');
        });

    },

    _addElement: function(obj, dataObj, onSelect, initValue, level) {
        var self = this,
            myOpt = $.extend(obj, self.options.itemOption, dataObj, onSelect, initValue);
        if (level != 0) {
            myOpt.onAfterRender = function(data) {
                $.merge(self._selects, data);
            };
        }
        $('<div/>').insertAfter(self.$form.find('.holder').eq(level)).formElement(myOpt);
    },

    _renderCombo: function(item) {
        var $control = this.flyForm.getControl(item.name).parent(),
            $holder = $control.prev('.holder');
        $control.remove();
        $('<div/>').insertAfter($holder).formElement(item);
    },

    //更新验证规则
    _updateValid: function() {
        var self = this;
        $.each(self.options.items, function(i, obj) {
            var $this = self.flyForm.getControl(obj.name).data('flyCombobox');
            if ($this.element.find('li').length == 0) {
                $this.valueInput.removeAttr('required');
                self.valid[obj.name].required = false;
            } else {
                self.validLevel = i;
            }
        });
    },

    _updateResult: function() {
        var self = this,
            strs = [],
            values = [],
            divs = [];
        //self._updateValid();
        var data = self.$form.data('flyForm').getData({
            valid: self.valid
        });
        if (data) {
            self.readDialog.close();
            self.jsonInput.val(fly.json.toJSON(data));

            $.each(self.options.items, function(i, obj) {
                var value = data[obj.name];
                //存在一级没有数据，直接跳过后面的
                if (data[obj.name + 'Txt'] == self.options.itemOption.emptyText) {
                    return false;
                }
                var text = data[obj.name + 'Txt'];
                strs.push(text);
                if (value)
                    values.push(value);
                if (data[self.options.divField])
                    divs.push(data[self.options.divField]);
            });

            if (self.options.fullName) {
                self.textInput.val(strs.join(' '));
            } else {
                self.textInput.val(strs[strs.length - 1]);
            }
            if (self.options.fullCode) {
                self.valueInput.val(values.join(';'));
            } else {
                self.valueInput.val(values[values.length - 1]);
            }
            var theXzqh = $.grep(self._selects, function(obj, i) {
                return obj[self.options.itemOption.valueField] == values[values.length - 1]
            }, false)[0];
            this._relateLinkage(theXzqh && theXzqh.xzqhId, strs, values);
        }
        self.options.onSelect && self.options.onSelect(data);
    },

    _relateLinkage: function(code, strs, values) {
        if (!code)
            return;
        $('[data-fly-linkagebox]').each(function(i, obj) {
            var $lka = $(obj).data('flyLinkagebox');
            if (!$lka.saved && $lka.options.defaultMesg) {
                var ctor = {},
                    end = 0,
                    step = 2;
                $.each($lka.options.items, function(i, obj) {

                    step = i > 2 ? 3 : 2;
                    end += step;
                    ctor[obj.name] = [code.substring(0, end), '000000000000'].join('').substring(0, 12);
                });
                $lka.jsonInput.val(fly.json.toJSON(ctor));
                if ($lka.options.fullName) {
                    $lka.textInput.val(strs.join(' '));
                } else {
                    $lka.textInput.val(strs[strs.length - 1]);
                }
                if ($lka.options.fullCode) {
                    $lka.valueInput.val(values.join(';'));
                } else {
                    $lka.valueInput.val(values[values.length - 1]);
                }
            }
        });
    },

    _getComboData: function(orgCode) {
        var self = this,
            userXzqh;
        if (!window.yztUser) {
            var _user = {
                userData: {
                    organization: {
                        xzqhId: ''
                    }
                }
            };
        } else {
            var _user = window.yztUser;
            _user.userData = _user.userData || {};
            _user.userData.organization = _user.userData.organization || {};
        }
        userXzqh = _user.userData.organization.xzqhId;
        var obj = new util.ajaxObj(),
            options = $.extend({}, obj.options);
        options.before();
        util.ajax.postJsonp(self.options.url, {
                orgCode: orgCode,
                xzqhId: $('#ql_xzqhbm').val() || userXzqh
            })
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

    _addEvent: function() {
        var self = this;

        //弹出数据选择
        self.$read && self.$read.click(function() {
            self.readDialog = $.dialog({
                title: self.options.queryBtn,
                content: popHtml,
                init: function() {
                    //this.DOM.close.hide();
                    setTimeout(function() {
                        self.$form = $(self.readDialog.content()).find('.division-pop');
                        self.$form.form();
                        self.flyForm = self.$form.data('flyForm');
                        self._initCombo();
                    }, 0);
                },
                padding: '10px 10px',
                ok: function() {
                    self._updateResult();
                    return false;
                }
            });
        });

    },

    _bindCopyData: function($btn, obj) {
        var self = this;
        $btn.click(function() {
            var $target = $('input[name="' + obj.target + '"]').closest('[data-fly-division]').data('flydivision');
            self.textInput.val($target.textInput.val());
            self.jsonInput.val($target.jsonInput.val());
            self.valueInput.val($target.valueInput.val());
        });

    },

    _init: function() {

    },

    _setOption: function(key, value) {
        this._super(key, value);
    },

    _destroy: function() {

    }
});

module.exports = {};

},{}],6:[function(require,module,exports){
/**
 * 表单模型解析工具
 *
 * by lcmj
 */

var $ = fly.$;
var division = require('../js/fly.division');
var linkagebox = require('../js/fly.linkagebox');
var headphoto = require('../js/fly.headphoto');
var editgrid = require('../js/fly.multiLineForm');
var camera = require('../js/fly.camera');
var woption = require('./fly.widget.options');
var rules = require('./rules');
var SVP = require('./fly.service.js');
var dictNation = [];

$.widget("fly.formparser", {

    defaultElement: '<div>',

    options: {
        data: {},
        onComplete: function() {

        }
    },

    _create: function() {
        var that = this;
        that.element.data('handler', that);
        that.initRender();
    },

    initRender: function() {
        var that = this;
        that.valid = {};
        that.handleForm = [];
        that.formElement = $('<div class="clearfix form-parser" data-fly-form />').appendTo(that.element);
        that.action = {};
        that.action.getData = function() {
            return that.getData.call(that);
        };
        that.action.element = that.element;
        that.widgets(that.options.data);
    },

    widgets: function(data) {
        var that = this;
        var lxjps = [];
        var items = [];
        var handleFormDict = [];
        $.each(data.container || [], function(i, iobj) {
            $.each(iobj.component, function(j, jobj) {
                // 多行表单
                if (jobj.type == 'gridformdesign') {
                    var handlename = jobj.attrs.name;
                    var newCol = [];
                    // 多行表单字典缓存数组
                    handleFormDict[handlename] = [];
                    // 多行表单校验
                    that.valid[handlename] = {};
                    $.each(jobj.columns, function(c, cobj) {
                        var attrs = woption(cobj.type, cobj.attrs);
                        attrs.width = '';
                        cobj.valids = cobj.valids || {};
                        // 字典信息
                        if (attrs.dict) {
                            lxjps.push(attrs.dict);
                            //记录多行表单字典
                            handleFormDict[handlename].push(attrs.dict);
                        }
                        // 特殊校验类型
                        if (cobj.valids.verifyType) {
                            $.extend(cobj.valids, rules[cobj.valids.verifyType]);
                        }
                        // 校验信息
                        that.valid[handlename][attrs.name] = cobj.valids;
                        //正则处理
                        if (typeof(cobj.valids.pattern) == 'string')
                            that.valid[handlename][attrs.name]['pattern'] = eval(cobj.valids.pattern);
                        newCol.push(attrs);
                    });
                    jobj.attrs = $.extend({ columns: newCol }, jobj.attrs);
                    items.push(jobj);
                } else { //普通控件
                    var attrs = woption(jobj.attrs.type, jobj.attrs);
                    jobj.valids = jobj.valids || {};
                    // 字典信息
                    if (attrs.dict) {
                        lxjps.push(attrs.dict);
                    }
                    // 特殊校验类型
                    if (jobj.valids.verifyType) {
                        $.extend(jobj.valids, rules[jobj.valids.verifyType]);
                    }
                    // 校验信息
                    that.valid[attrs.name] = jobj.valids;
                    // 异常处理
                    if (typeof(jobj.valids.max) != 'undefined' && jobj.valids.max == '') {
                        that.valid[attrs.name]['max'] = 50;
                    }
                    //正则处理
                    if (typeof(jobj.valids.pattern) == 'string')
                        that.valid[attrs.name]['pattern'] = eval(jobj.valids.pattern);
                    jobj.attrs = attrs;
                    items.push(jobj);
                }
            });
        });
        that.dicts(lxjps, items, handleFormDict);
        that.formElement.attr('name', data.form.attrs.name);
    },

    createWidget: function(options) {
        var that = this;
        var attrs = options.attrs;
        var ivalid = options.valid;
        var type = attrs.type;
        var $ele = $('<div/>').appendTo(that.formElement);
        if (type == 'address') {
            $ele.formElement($.extend({}, attrs, { type: 'text' }));
            $ele.linkagebox(attrs);
        } else if (type == 'division') {
            $ele.formElement($.extend({}, attrs, { type: 'text' }));
            $ele.division(attrs);
        } else if (type == 'suggest') {
            $ele.formElement(attrs);
        } else if (type == 'photo') {
            that.formElement.addClass('form-has-headphoto');
            $ele.addClass('has-headimg').html('<div class="headimg"></div>').find('.headimg').headphoto(attrs);
        } else if (type == 'gridformdesign') {
            $ele = $('<form data-fly-handform name="' + attrs.name + '" class="handleform-wrap"></form>').insertAfter(that.formElement);
            $ele.before('<div class="column-title">' + attrs.title + '<span class="column-flag"></span></div>');
            that.handleForm.push($ele.handleForm(attrs).data('flyHandleForm'));
        } else {
            if (type == 'datepicker' || type == 'daterange') {
                $('<div/>').formElement(attrs).appendTo(that.formElement);
                $ele.remove();
            } else {
                $ele.formElement(attrs);
                if (attrs.hide) {
                    $ele.hide();
                    $ele.find('input[name="receiveDeptCode"],input[name="receiveDeptName"]').remove();
                }
                // 证件组件绑定服务
                if (type == "idcard") {
                    SVP.bind($ele, options, that.valid[attrs.name], dictNation);
                }
            }
        }
    },

    dicts: function(lxjps, items, handleFormDict) {
        var that = this;
        if (lxjps.length == 0) {
            $.each(items, function(i, obj) {
                that.createWidget(obj);
            });
            that.onComplete();
        } else {
            $.ajax({
                url: FORMCONTEXT + 'datacenter/queryGsbDictService.do',
                data: {
                    formServiceCode: 'rest_getcommdict',
                    lxjp: lxjps.join(';')
                },
                dataType: 'jsonp',
                success: function(res) {
                    var dictIndex = 0;
                    $.each(res.data, function(d, dobj) {
                        // 记录民族字典
                        if (dobj && (dobj.length == 56 || dobj.length == 57)) {
                            dictNation = dobj;
                        }
                    });
                    $.each(items, function(i, obj) {
                        var idata = res.data[dictIndex];
                        if (obj.attrs.type == "gridformdesign") {
                            if (handleFormDict[obj.attrs.name]) {
                                obj.attrs.dict = {};
                                $.each(handleFormDict[obj.attrs.name], function(d, dobj) {
                                    obj.attrs.dict[dobj] = res.data[dictIndex];
                                    dictIndex++;
                                })
                            }
                        } else if (obj.attrs.dict) {
                            obj.attrs.data = idata;
                            dictIndex++;
                        }
                        that.createWidget(obj);
                    });
                    that.onComplete();
                }
            });
        }
    },
    getData: function(flag, isValid) {
        var that = this;
        var flag = true;
        var fname = that.options.data.form.attrs.name.replace(/-/g, '_');
        var serializeData = {};
        var ivalid = that.valid;
        if (isValid === false) {
            ivalid = {};
        }
        var idata = that.formElement.data('flyForm').getData({
            valid: that.valid
        });
        if (!idata)
            return idata;
        if (that.handleForm.length > 0) {
            $.each(that.handleForm, function(h, hobj) {
                var hdata = hobj.getData({
                    valid: that.valid[hobj.options.name]
                });
                if (!hdata) {
                    flag = false;
                    return false;
                }
                serializeData[hobj.options.name] = hdata;
            });
            serializeData[fname] = idata;
            $.extend(serializeData, idata);
        } else {
            serializeData = idata;
        }
        if (flag == false)
            return null;
        return serializeData;
    },

    setData: function() {
        var that = this;
        that.formElement.data('flyForm').setData(that.options.jsonData);
        // TODO 头像控件特殊处理
        this.formElement.find('.headimg').each(function() {
            $(this).data('flyHeadphoto').setData();
        });
        if (that.handleForm.length > 0) {
            $.each(that.handleForm, function(h, hobj) {
                hobj.setData(that.options.jsonData[hobj.options.name]);

            });
        }
    },

    onComplete: function() {
        var that = this;
        that.formElement.form();
        that.setData(that.options.jsonData);
        that.options.onComplete(that);
    },

    _setOption: function(key, value) {
        var that = this;
        if (key == 'data') {
            that.options.data = value;
            that.initRender();
        } else {
            that.options.onComplete = value;
        }
    },

    _destroy: function() {

    }
});

module.exports = {};

},{"../js/fly.camera":2,"../js/fly.division":5,"../js/fly.headphoto":9,"../js/fly.linkagebox":10,"../js/fly.multiLineForm":11,"./fly.service.js":12,"./fly.widget.options":15,"./rules":19}],7:[function(require,module,exports){
/**
 * 表格模型生成 table
 */
var artTpl = require('./artTemplate');
var tpl=require('./fly.formtable.tpl');
$.widget("fly.formtable", {

    defaultElement: '<div>',

    valid: {},

    options: {
        data: {},
        onComplete:function(){}
    },

    _create: function() {
        var that = this;
        that.$element = that.element;
        that.element.data('handler', that);
        if (!that.element.find('colgroup').length) {
            that.element.html('<div class="fly-grid-body">' +
                '<table class="fly-table table-info form-table">' +
                '<colgroup></colgroup>' +
                '<tbody class="fly-table-body"></tbody>' +
                '</table>' +
                '</div>');
        }
        that.tableTpl=template.compile(tpl.table);
        that.formInfo = that.options.data.form;
        that.createData(that.options.data);
    },

    /**
     * 生成144列的col
     *
     */
    colTmpl: function() {
        var colgroup = '',
            col = '<col />';
        for (var i = 0; i < 144; i++) {
            colgroup += col;
        };
        return colgroup;
    },

    /**
     * 创建查看dom
     *
     */
    createDOM: function(data) {
        var that = this;
        that.$element.find('colgroup').html(that.colTmpl());
        that.$element.find('tbody').html(that.tableTpl(data));
        that.createStyle();
        that.specialCol();
        that.options.onComplete.call(that);
    },

    /**
     * 特殊问题处理 -- by heimayu
     *
     */
    specialCol: function() {
        var that = this,
            $tr = that.$element.find('tr'),
            len = $tr.length;
        for (var i = 0; i < len; i++) {
            var imgLen = $tr.eq(i).find('.form-view-img').length;
            //暂只针对一个头像的情况做处理
            if (imgLen === 1) {
                //判断没有头像的行是否满行
                for (var j = i + 4; j < len; j++) {
                    var $td = $tr.eq(j).find('td'),
                        col = 0;
                    $.each($td, function(k, td) {
                        var c = parseInt($(td).attr('colspan'));
                        col += c;
                    });
                    if (col < 144) {
                        var space = 144 - col,
                            $lastTd = $td.last(),
                            lastCol = parseInt($lastTd.attr('colspan')) + space;

                        $lastTd.attr('colspan', lastCol);
                    }
                }
            }
        };

        //解决IE下table布局问题 
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            var ieNo = $.browser.version;
            if (ieNo == '9.0' || ieNo == '10.0') {
                that.$element.find('colgroup').css({ 'display': 'table-row' }).find('col').css({ 'display': 'table-cell' });

                var $td = that.$element.find('td'),
                    unitWidth = 100 / 144;

                $.each($td, function(i, item) {
                    var colspan = parseInt($(item).attr('colspan')),
                        width = unitWidth * colspan;

                    $(item).css('width', width + '%');
                });
            }
        }
    },

    /**
     * 样式处理
     *
     */
    createStyle: function() {
        var that = this,
            $element = that.$element,
            width = 96;
        if (that.labelWidth > width) {
            $element.find('.form-view-title').css({
                width: that.labelWidth
            });
            width = that.labelWidth;
        };
    },

    /**
     * [_analysisGridFormColumns 针对特殊类型数据的解析 多行表单]
     * @param  {[type]} columns [列数据]
     * @return {[type]}         [description]
     */
    _analysisGridFormColumns: function(columns) {
        var items = [];
        $.each(columns, function(j, unit) {
            var component = {},
                attrs = unit.attrs;

            component.type = unit.type;
            component.width = attrs.labelWidth == "" ? 0 : parseInt(attrs.labelWidth);
            component.colspan = component.labelWidth;
            component.title = attrs.title;
            component.name = attrs.name;
            if (unit.type == 'photo') {
                component.actionPath = CONTEXTPATH + '/file/download.do?fileid=';
            }
            if (unit.type == 'gridformdesign') {
                component.columns = unit.columns;
            }
            items.push(component);
        });
        return items;
    },
    /**
     * [_analysisGridFormValues 针对特殊类型数据的解析 多行表单]
     * @param  {[type]} values [数据]
     * @param  {[type]} columns [列数据]
     * @return {[type]}         [description]
     */
    _analysisGridFormValues: function(values, columns) {
        var items = [],
            columnName = {};
        for (var i = 0; i < columns.length; i++) {
            columnName[columns[i].name] = columns[i].name;
        };
        $.each(values, function(j, unit) {
            var _valArr = [];
            for (var key in columnName) {
                _valArr.push({
                    name: key,
                    value: unit[key + 'Txt'] || unit[key]
                });
            };
            items.push(_valArr);
        });
        return items;
    },

    /**
     * 数据改造
     * @param  {[type]} data [查看数据集合]
     * @return {[type]}      [description]
     */
    createData: function(data) {

        var that = this;
        var myFormData = data.formData;
        that.container = data.container; //容器
        that.formdata = data.formData; //提交的值
        that.labelWidth = 0; //记录最大的labelWidth
        that.dictLxjp = []; //记录数据源简拼
        that.dictValue = []; //记录数据源选中数据

        that.$element.attr('name', that.formInfo.attrs.name);

        // 记录一个  特殊容器的位置 by ziqin ''
        var place = false;

        //将每个容器内部数据分行，并替换value及colspan值
        $.each(that.container, function(i, item) {

            var containerWidth = parseInt(item.width),
                components = item.component;

            item.width = containerWidth;
            item.totalCol = 12 * item.width;

            item.table = [];
            delete item.componentCount;
            if (!components)
                return;
            $.each(components, function(j, unit) {
                if (unit.attrs.hide)
                    return;
                var component = {};
                var attrs = unit.attrs;
                var jtype = attrs.type;
                var txtName = attrs.txtName || (attrs.name + 'Txt');

                component.type = jtype;
                component.width = parseInt(attrs.width);
                component.colspan = component.width * containerWidth;
                component.title = attrs.title;
                component.name = attrs.name;
                component.value = myFormData[txtName] || myFormData[attrs.name];

                if (jtype == 'photo') {
                    component.actionPath = CONTEXTPATH + '/file/download.do?fileid=';
                } else if (jtype == 'gridformdesign') {
                    component.columns = that._analysisGridFormColumns(unit.columns);
                    component.value = that._analysisGridFormValues(component.value, component.columns);
                } else if (jtype == 'division') {
                    component.value = myFormData['receiveDeptName'];
                } else if (jtype == 'linkagebox') {
                    component.value = myFormData[attrs.name];
                } else if (jtype == 'daterange') {
                    component.value = (myFormData[attrs.startname] || '') + '～' + (myFormData[attrs.endname] || '');
                };

                //宽度替换
                var labelWidth = parseInt(attrs.labelWidth);
                if (labelWidth > that.labelWidth) {
                    that.labelWidth = labelWidth;
                };

                //存放当前容器内的TR数据
                if (!item.table.length) {
                    //第一次存放
                    var obj = {};
                    obj.tr = [];

                    obj.tr.push(component);
                    obj.totalWidth = component.width;
                    item.table.push(obj);
                } else {

                    var tableLen = item.table.length,
                        lastTableItem = item.table[tableLen - 1],
                        lastTableItemWidth = lastTableItem.totalWidth,
                        totalCount = lastTableItemWidth + component.width;


                    if (lastTableItemWidth === 12 || totalCount > 12) {
                        //新建一个tr数据
                        var obj = {};
                        obj.tr = [];

                        obj.tr.push(component);
                        obj.totalWidth = component.width;
                        item.table.push(obj);
                    } else {
                        //放入最后一个tr中
                        lastTableItem.tr.push(component);
                        lastTableItem.totalWidth = totalCount;
                    }
                }
            });
            delete item.component;
            //补足不齐列
            item = that.judegeData(item);
        });

        // 移除不需要的布局行  by ziqin 
        if (place !== false) {
            that.container.splice(place, 1);
        };

        if (that.container.length === 1) {
            var newTable = [];
            $.each(that.container[0].table, function(i, item) {

                var obj = {};
                obj.tr = [];
                obj.tr = obj.tr.concat(item.tr);
                newTable.push(obj);
            });
            that.createDOM(newTable);
        } else {
            that.containerMerge();
        }
    },

    /**
     * 判断当前容器内的组件行是否满列，不满列的补齐
     * @param  {[type]} data [数据集合]
     * @return {[type]} data [数据集合]
     */
    judegeData: function(data) {
        var totalCol = data.totalCol;

        $.each(data.table, function(i, item) {
            var itemCol = 0;

            $.each(item.tr, function(j, unit) {
                itemCol += unit.colspan;
            });

            if (itemCol < totalCol) {
                var space = totalCol - itemCol,
                    len = item.tr.length;

                item.tr[len - 1].colspan = item.tr[len - 1].colspan + space;
            }
        });

        return data;
    },

    /**
     * 把12列的容器分别放到一起
     *
     */
    containerMerge: function() {
        var that = this;
        that.newContainer = [];

        $.each(that.container, function(i, item) {

            var currentWidth = item.width;

            if (!that.newContainer.length) {

                //第一次放
                var obj = {};
                obj.containers = [];

                obj.total = currentWidth;
                obj.containers.push(item.table);
                obj.trLen = item.table.length;

                that.newContainer.push(obj);

            } else {

                var len = that.newContainer.length,
                    lastNewItem = that.newContainer[len - 1],
                    lastNewItemTotal = lastNewItem.total,
                    totalCount = lastNewItemTotal + currentWidth;

                if (lastNewItemTotal === 12 || totalCount > 12) {
                    //新建一个
                    var obj = {};
                    obj.containers = [];

                    obj.total = currentWidth;
                    obj.containers.push(item.table);
                    obj.trLen = item.table.length;

                    that.newContainer.push(obj);
                } else {
                    //放入最后一个containers中
                    var nowLen = item.table.length;

                    lastNewItem.trLen = (nowLen >= lastNewItem.trLen) ? nowLen : lastNewItem.trLen;
                    lastNewItem.containers.push(item.table);
                    lastNewItem.total = totalCount;
                }
            }
        });

        that.createTableData();
    },

    /**
     * 创建最终table数据
     *
     */
    createTableData: function() {
        var that = this;
        var tableData = [];
        $.each(that.newContainer, function(i, item) {
            var table = [];
            var trLen = item.trLen;
            //在table数据中创建trLen个行
            for (var i = 0; i < trLen; i++) {
                var obj = {};
                obj.tr = [];
                table.push(obj);
            };
            $.each(item.containers, function(j, unit) {
                $.each(unit, function(k, value) {

                    //将对应的行放到大table下的行中去
                    table[k].tr = table[k].tr.concat(value.tr);
                })
            });
            tableData = tableData.concat(table);
        });
        // 创建表格dom
        that.createDOM(tableData);
    },

    _destroy: function() {

    }

});

module.exports = {};

},{"./artTemplate":1,"./fly.formtable.tpl":8}],8:[function(require,module,exports){
var tpl = {};
tpl.table ='{{each $data as item i }}'+
	        '<tr>'+
	            '{{each item.tr as unit j}}'+
	                '{{if unit.type === "photo"}}'
	                    '<td colspan="{{unit.colspan}}" rowspan="4" class="form-view-img">'+
	                        '{{if unit.value}}'+
	                            '<img src="{{unit.actionPath}}{{unit.value}}" alt="{{unit.title}}">'+
	                        '{{else}}'+
	                            '<div class="default-photo"></div>'+
	                        '{{/if}}'+
	                    '</td>'+
	                '{{else if unit.type=="gridformdesign"}}'+
	                    '{{if item.length > 1}}'+
	                        '<td colspan="14" class="cell-label">{{unit.title}}</td>'+
	                    '{{/if}}'+
	                    '<td colspan="{{if item.length > 1}}{{unit.colspan-14}}{{else}}{{unit.colspan}}{{/if}}" style="padding:0;border-top:none;border-bottom:none;border-right:none;">'+
	                        '<table class="fly-table table-normal fly-handleform-table">'+
	                            '<thead>'+
	                                '<tr>'+
	                                    '{{each unit.columns as column ci}}'+
	                                        '<th title="{{column.title}}" {{if column.width != 0}}width="{{column.width}}"{{/if}}>{{column.title}}</th>'+
	                                    '{{/each}}'+
	                                '</tr>'+
	                            '</thead>'+
	                            '<tbody>'+
	                                '{{each unit.value as gridformval vi}}'+
	                                    '<tr>'+
	                                        '{{each gridformval as gfv gfvi}}'+
	                                            '<td title="{{gfv.value}}" >{{gfv.value}}</td>'+
	                                        '{{/each}}'+
	                                    '</tr>'+
	                                '{{/each}}'+
	                            '</tbody>'+
	                        '</table>'+
	                        '{{if unit.value.length == 0}}'+
	                            '<div class="fly-grid-empty">暂无数据</div>'+
	                        '{{/if}}'+
	                    '</td>'+
	                '{{else}}'+
	                    '<td colspan="14" class="cell-label" title="{{unit.title}}">{{unit.title}}</td>'+
	                    '<td colspan="{{unit.colspan-14}}" name="{{unit.name}}" >{{unit.value}}</td>'+
	                '{{/if}}'+
	            '{{/each}}'+
	        '</tr>'+
	        '{{/each}}' ;
module.exports = tpl;

},{}],9:[function(require,module,exports){
/**
 * 头像上传
 *
 * by lcmj
 */

var $ = fly.$;
window.GLOBAL = window.GLOBAL || {
    yztconfig: ''
};
var _config = window.GLOBAL.yztconfig || {},
    _size = _config['yzt.appconfig.attachment.image.size'] || 3145728;

var uploadLimitSize = (fly.calculate.div(parseInt(_size), 1024 * 1024)).toString(),
    tipStr = {
        '-100': '上传的文件数量已经超出系统限制',
        '-110': '请上传不大于 ' + uploadLimitSize + ' MB 的图片',
        '-120': '您选择的文件没有内容，请重新选择',
        '-130': '请上传jpg、jpeg、png、bmp或gif格式的图片'
    };

var $body = $('body');

var _ = fly._;
var widget = $.widget("fly.headphoto", {
    defaultElement: '<div>',
    options: {
        name: '',
        value: '',
        zjwz: '',
        readonly: false,
        required: false,
        fileRootPath: 'D:\\',
        basePath: '/file/download.do?fileid=',
        defaultPath: 'img/temp-image.jpg',
        contextpath: '/yzt'
    },

    _create: function() {
        var self = this;

        this.options.defaultPath=this.options.defaultPath||'img/temp-image.jpg';

        this.$photoWarp = $('<div class="avator">')
            .addClass((this.options.readonly ? 'disable' : ''));

        this.$photo = $('<img class="defalut">')
            .attr('src', APPCONFIG.formResourceContext + this.options.defaultPath)
            .appendTo(this.$photoWarp);
        if (!self.options.readonly) {
            self.uploadBtnId = fly.utils.generateGUID('headphoto-local-');
            this.$uploadBtn = $('<span class="headphoto-local" id="' + self.uploadBtnId + '" />')
                .text('本地')
                .appendTo(this.$photoWarp);
            this.$scanBtn = $('<span class="headphoto-scan" />')
                .text('高拍仪')
                .appendTo(this.$photoWarp);
            this.$delBtn = $('<span class="delete" style="display:none;" title"删除" />')
                .appendTo(this.$photoWarp);
        }

        this.$value = $('<input type="hidden"/>')
            .attr('name', this.options.name)
            .appendTo(this.$photoWarp);

        this.$wjwz = $('<input type="hidden"/>')
            .attr('name', this.options.name + "Uuid")
            .appendTo(this.$photoWarp);

        this.$contextpath = $('<input type="hidden"/>')
            .attr('name', "CONTEXTPATH")
            .appendTo(this.$photoWarp).val(this.options.contextpath);

        this.$value.val(this.options.value);
        this.$wjwz.val(this.options.zjwz);

        this._addEvent();
        this._render();
    },

    _addEvent: function() {
        var self = this;
        //添加打开证件的事件
        this.element.on('click', '.headphoto-scan', function() {
            if (!self.options.readonly) {
                self._openScanPop();
            }
        });

        //删除头像
        this.element.on('click', '.delete', function() {
            if (!self.options.readonly) {
                self._delPhoto();
            }
        });

    },

    /* 渲染证件列表 */
    _render: function() {
        var self = this;
        if (this.options.value != '') {
            this.$photo.attr('src', CONTEXTPATH + this.options.basePath + this.options.value);
        }
        this.element.html(this.$photoWarp);

        if (!self.options.readonly) {
            var t = setInterval(function() {
                if ($('#' + self.uploadBtnId).length > 0) {
                    self._openUploadPop();
                    clearInterval(t);
                }
            }, 50);
        }
    },
    _setData: function() {
        var img = $.dialog.data('headphoto');
        this.$photo.attr('src', CONTEXTPATH + this.options.basePath + img.wjwz);
        this.$value.val(img.wjwz);
        this.$wjwz.val(img.uuid);
        this.$delBtn.show();
    },
    _setUploadData: function() {
        var imgs = $.dialog.data('localImages');
        this.$photo.attr('src', CONTEXTPATH + this.options.basePath + imgs[0].wjwz);
        this.$value.val(imgs[0].wjwz);
        this.$wjwz.val(imgs[0].uuid);
        this.$delBtn.show();
    },
    setData: function(data) {
        if (this.$value.val()) {
            this.$photo.attr('src', CONTEXTPATH + this.options.basePath + this.$value.val());
            this.$delBtn.show();
        }

    },
    /* 打开高拍仪界面 */
    _openScanPop: function() {
        var self = this;
        //js预览控件
        var url = CONTEXTPATH + '/fileUpload/cred.do?imgNum=1&isHeadphoto=true&initDev=1';
        //良田ocx版图片预览控件
        if (APPCONFIG.capture == '') {
            url = CONTEXTPATH + '/fileUpload/cred-EThumbnails.do?imgNum=1&isHeadphoto=true&initDev=1';
        }
        window.scanDialog = $.dialog.open(url, {
            title: '高拍仪',
            padding: '15px 15px',
            lock: true,
            width: 776,
            height: 590,
            close: function() {
                var frame = this.iframe;
                frame.contentWindow.document.write(''); //清空iframe的内容
                frame.contentWindow.close(); //避免iframe内存泄漏
            }
        });

        window.credInit = function() {
            self._setData();
        };
    },

    /* 打开本地上传界面 */
    _openUploadPop: function() {
        var self = this,
            id = typeof(SESSIONID) === 'undefined' ? '' : ';jsessionid=' + SESSIONID;
        $('#' + self.uploadBtnId).uploadify({
            swf: CONTEXTPATH + '/resource/js/plugins/uploadify/uploadify.swf',
            uploader: CONTEXTPATH + '/material/uploadFile.do' + id,
            debug: false,
            formData: {},
            multi: false,
            itemTemplate: false,
            width: 38,
            height: 16,
            buttonText: '本地',
            buttonClass: 'headphoto-local',
            fileSizeLimit: fly.calculate.div(parseInt(_size), 1024),
            fileTypeExts: '*.jpg;*.jpeg;*.png;*.bmp;*.gif',
            fileTypeDesc: '请上传jpg、jpeg、png、bmp或gif格式的图片',
            onInit: function() {
                $(".uploadify-queue").hide();
            },
            onSelect: function(file) {
                if (file.name.length > 100) {
                    $.tip({
                        type: 'warning',
                        text: '文件名长度不能大于100'
                    });
                    return false;
                }
                return true;
            },
            onSelectError: function(file, errorCode, errorMsg) {
                $.tip({
                    type: 'warning',
                    text: tipStr[errorCode.toString()]
                });
                return false;
            },
            onUploadStart: function(file) {
                $body.mask({
                    content: '上传头像...'
                });
                return true;
            },
            onUploadComplete: function(res) {
                $body.mask('remove');
            },
            onUploadSuccess: function(file, res, response) {
                var res = fly.json.evalJSON(res);
                if (res['flag'] == "true") {
                    var data = [];
                    data.push({
                        wjwz: res.data[0].downloadUrl,
                        uuid: res.data[0].id
                    });

                    $.dialog.data('localImages', data);
                    self._setUploadData();

                } else {
                    $.tip({
                        type: 'warning',
                        text: '文件上传失败'
                    });
                }
            },
            onUploadError: function(file, errorCode, errorMsg, errorString) {
                $.tip({
                    type: 'warning',
                    text: '文件上传失败'
                });
            }
        });
    },

    //删除头像
    _delPhoto: function() {
        this.$photo.attr('src', APPCONFIG.formResourceContext + this.options.defaultPath);
        this.$value.val('');
        this.$wjwz.val('');
        this.$delBtn.hide();
    },

    /* 添加其他材料 */
    _addOther: function() {

    },

    _init: function() {

    },

    _setOption: function(key, value) {
        this._super(key, value);

        if (key == 'value') {
            this._render();
        }
    },

    _destroy: function() {

    }
});

module.exports = {};

},{}],10:[function(require,module,exports){
/**
 * 户籍地选择
 *
 * by lcmj
 */

var _ = fly._;
var util = fly.utils;
var $ = fly.$;

//定义jsonp方法
util.ajax.postJsonp = function(url, data) {
    return $.ajax({
        url: APPCONFIG.formContextPath + url,
        data: data || {},
        dataType: 'jsonp',
        type: 'POST',
        jsonp: "callback"
    });
};

var popHtml = '<form data-fly-form class="linkagebox-pop clearfix">' +
    '<span class="holder hide"></span>' +
    '<span class="holder hide"></span>' +
    '<span class="holder hide"></span>' +
    '<span class="holder hide"></span>' +
    '<span class="holder hide"></span>' +
    '<span class="holder hide"></span>' +
    '</form>';

var linkagebox = $.widget('fly.linkagebox', {

    defaultElement: '<div>',

    options: {
        url: 'datacenter/queryGsbRestService.do',
        serviceId: 'tmp_hjxx_1001',
        condition: '{}',
        supid: '',
        type: '',
        valueName: 'deptname',
        queryBtn: '',
        copyBtn: [],
        fullName: true,
        fullCode: false,
        editable: false,
        defaultMesg: false,
        jsonp: true,
        textJoin: '',
        items: [{
            name: 'province',
            title: '省',
            required: true
        }, {
            name: 'city',
            title: '市',
            required: true
        }, {
            name: 'county',
            title: '县(区)',
            required: true
        }, {
            name: 'countryside',
            title: '乡(街道)',
            required: true
        }, {
            name: 'village',
            title: '村(社区)',
            required: true
        }, {
            name: 'group',
            title: '组(自然村)'
        }],
        textField: '',
        valueField: '',
        itemOption: {
            type: 'combobox',
            width: '1/2',
            labelWidth: 70,
            textField: 'aeraName',
            valueField: 'aeraID',
            emptyText: '请选择'
        }
    },

    _create: function() {
        var self = this;

        this.saved = false;

        if (this.options.textField)
            this.options.itemOption.textField = this.options.textField;
        if (this.options.valueField)
            this.options.itemOption.valueField = this.options.valueField;

        if (!self.options.jsonp && !self.options.supid)
            self.options.supid = '000000000000';

        self.control = self.element.find('.control').addClass('fly-linkagebox');
        self.controlEm = self.element.find('.control em');

        //创建保存值的输入框
        self.textInput = self.control.find('.text').attr('readonly', !self.options.editable);
        self.valueInput = $('<input type="hidden" name="' + self.options.valueName + '" />').insertAfter(self.textInput);
        self.jsonInput = $('<input type="hidden" name="' + self.options.valueName + 'Json" />').insertAfter(self.textInput);

        //创建获取数据的按钮
        if (self.options.queryBtn) {
            self.$read = $('<span class="read" />').insertBefore(self.controlEm).text(self.options.queryBtn);
            self.readWidth = self.$read.width();
        }

        self._renderCopyBtns();

        //设置输入框宽度
        self._setInputWidth();

        self._defaultVal();

        self.valid = {};

        this._addEvent();
    },

    _defaultVal: function() {
        var self = this;
        //默认值处理
        if (CONTEXTPATH != '/sqdj' && self.options.defaultMesg && (typeof workflow == "undefined" || !workflow.projNo) && (typeof yztUser != "undefined")) {
            //获取用户信息
            $.ajax({
                url: CONTEXTPATH + '/getUserInfo.do',
                success: function(res) {
                    if (res && res.organization && res.organization.xzqhId) {
                        var org = res.organization;
                        var code = org.xzqhId;
                        var name = org.name || org.fullName,
                            ctor = {},
                            end = 0,
                            step = 2;
                        self.textInput.val(name);
                        self.valueInput.val(code);
                        $.each(self.options.items, function(i, obj) {
                            step = i > 2 ? 3 : 2;
                            end += step;
                            ctor[obj.name] = self.options.jsonp ? code.substring(0, end) : [code.substring(0, end), '000000000000'].join('').substring(0, 12);
                        });
                        self.jsonInput.val(fly.json.toJSON(ctor));
                    }
                }
            })
        }
    },

    //渲染数据复制按钮
    _renderCopyBtns: function() {
        var self = this;
        self.copyBtn = [];
        self.btnWidth = self.readWidth || 0;
        $.each(self.options.copyBtn, function(i, obj) {
            var $spans = self.control.find('span');
            var $btn = $('<span class="copy" />').insertBefore($spans.length > 0 ? $spans.eq(0) : self.controlEm).text(obj.text).css('width', obj.width + 'px');
            self.copyBtn.push($btn);
            self.btnWidth += $btn.width();
            self._bindCopyData($btn, obj);
        });
    },

    //设置输入框宽度
    _setInputWidth: function() {
        this.element.find('.control em').css('margin-right', (this.btnWidth + 6).toString() + 'px');
    },

    _initCombo: function() {
        var self = this,
            len = self.options.items.length,
            values = [],
            dataObj;
        self.jsonObj = fly.json.evalJSON(this.jsonInput.val());

        self._getComboData(self.options.supid, self.options.type).done(function(res) {

            if (res != 'null') {
                $.each(self.options.items, function(i, obj) {

                    //生成校验规则
                    self.valid[obj.name] = {
                        title: obj.title,
                        required: obj.required
                    };

                    //默认值
                    values.push(self.jsonObj[obj.name]);
                    //
                    var onSelect = i == len - 1 ? {} : {
                        onSelect: function(obj) {

                            //清空所有下属机构
                            for (var j = i + 1; j < self.options.items.length; j++) {
                                var jOption = $.extend(
                                    self.options.items[j], {
                                        data: []
                                    },
                                    self.options.itemOption
                                );
                                jOption.initValue = '';
                                self._renderCombo(jOption);
                            }

                            thisitem = self.options.items[i + 1];
                            //获取字典数据
                            self._getComboData(obj[self.options.itemOption.valueField], self.options.type).done(function(data) {
                                var thisOption = $.extend(
                                    thisitem, {
                                        data: data
                                    },
                                    self.options.itemOption
                                );
                                thisOption.initValue = '';
                                self._renderCombo(thisOption);

                            }).fail();

                        }
                    };

                    var initValue = {
                        initValue: values[i]
                    };

                    //设置选项数据
                    if (i == 0) {
                        dataObj = {
                            data: res
                        };
                        self._addElement(obj, dataObj, onSelect, initValue, i);
                    } else {
                        if (values[i - 1]) {
                            self._getComboData(values[i - 1], self.options.type).done(function(res) {
                                dataObj = {
                                    data: res
                                };
                                self._addElement(obj, dataObj, onSelect, initValue, i);
                            });
                        } else {
                            dataObj = {
                                data: []
                            };
                            self._addElement(obj, dataObj, onSelect, initValue, i);
                        }
                    }
                });
            }

        }).fail();

    },

    _addElement: function(obj, dataObj, onSelect, initValue, level) {
        var self = this,
            myOpt = $.extend(obj, self.options.itemOption, dataObj, onSelect, initValue);
        $('<div/>').insertAfter(self.$form.find('.holder').eq(level)).formElement(myOpt);
    },

    _renderCombo: function(item) {
        var $control = this.flyForm.getControl(item.name).parent(),
            $holder = $control.prev('.holder');
        $control.remove();
        $('<div/>').insertAfter($holder).formElement(item);
    },

    _updateResult: function() {
        var self = this,
            strs = [],
            values = [];
        var data = self.$form.data('flyForm').getData({
            valid: self.valid
        });
        if (data) {
            self.readDialog.close();
            self.jsonInput.val(fly.json.toJSON(data));

            $.each(self.options.items, function(i, obj) {
                var value = data[obj.name],
                    text = data[obj.name + 'Txt'] == self.options.itemOption.emptyText ? '' : data[obj.name + 'Txt'];
                strs.push(text);
                if (value)
                    values.push(value);
            });

            if (self.options.fullName) {
                self.textInput.val(strs.join(self.options.textJoin));
            } else {
                self.textInput.val(strs[strs.length - 1]);
            }
            if (self.options.fullCode) {
                self.valueInput.val(values.join(';'));
            } else {
                self.valueInput.val(values[values.length - 1]);
            }
            this.saved = true;
        }
    },

    _getComboData: function(supid, type) {
        var self = this;
        var params;
        var url = self.options.url;
        var func = '';
        var param;
        if (type != '') {
            params = fly.json.toJSON({
                supid: supid,
                type: type
            });
        } else {
            params = fly.json.toJSON({
                supid: supid
            });
        }
        if (!self.options.jsonp) {
            if (url == 'datacenter/queryGsbRestService.do') {
                url = '/common/xzqh/qryChildAdministrativeDivisionByCode.do';
            }
            func = 'post';
            param = {
                code: supid
            };
        } else {
            func = 'postJsonp';
            param = {
                formServiceCode: self.options.serviceId,
                conditionParams: params
            };
        }
        var obj = new util.ajaxObj(),
            options = $.extend({}, obj.options);
        options.before();
        util.ajax[func](url, param, 'text')
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

    _addEvent: function() {
        var self = this;

        //弹出数据选择
        self.$read && self.$read.click(function() {
            self.readDialog = $.dialog({
                title: self.options.queryBtn,
                content: popHtml,
                init: function() {
                    //this.DOM.close.hide();
                    setTimeout(function() {
                        self.$form = $(self.readDialog.content()).find('.linkagebox-pop');
                        self.$form.form();
                        self.flyForm = self.$form.data('flyForm');
                        self._initCombo();
                    }, 0);
                },
                padding: '10px 10px',
                ok: function() {
                    self._updateResult();
                    return false;
                }
            });
        });

    },

    _bindCopyData: function($btn, obj) {
        var self = this;
        $btn.click(function() {
            var $target = $('input[name="' + obj.target + '"]').closest('[data-fly-linkagebox]').data('flyLinkagebox');
            self.textInput.val($target.textInput.val());
            self.jsonInput.val($target.jsonInput.val());
            self.valueInput.val($target.valueInput.val());
        });

    },

    _init: function() {

    },

    _setOption: function(key, value) {
        this._super(key, value);
    },

    _destroy: function() {

    }
});
module.exports = {};

},{}],11:[function(require,module,exports){
/**
 * 多行表单
 *
 * by lcmj
 */

var $ = fly.$;
var flyHandleForm = $.widget('fly.handleForm', {
    defaultElement: 'form',
    options: {
        data: [],
        title: '',
        columns: [],
        required: false,
        emptyText: '请添加成员',
        radios: [],
        afterAdd: function() {},
        eventTarget: 'body',
        formType: null,
        unique: '',
        dict: {},
        valid: {},
        hasCopy: false,
        addBtn: true,
        removeBtn: true,
        constraintOne: false, //强制保留一行
        leastOne: false, // 至少保留一行
        haveOneMax: false, //至多存在一行
        afterRemove: function() {},
        beforeRemove: function() {
            return true;
        },
        afterSort: function() {},
        afterRendreRow: function() {}
    },

    _create: function() {
        var self = this;
        self._$layout = $(self._tmpl()).addClass('fly-grid fly-family');
        self._$header = self._$layout.find('.fly-table-header');
        self._$body = self._$layout.find('.fly-table-body');
        self._$empty = self._$layout.find('.fly-grid-empty');

        self._$header.html(self._renderHeader());
        var _$trs = self._$body.empty();
        for (var i = 0, len = self.options.data.length; i < len; i++) {
            var _item = self.options.data[i],
                _$tr = $('<tr>').append(self._renderRow(_item)).data(_item);
            _$tr.find('td:last').addClass('fly-table-tr-last');
            _$trs.append(_$tr);
        }

        this.element.html(this._$layout);
        this._initControl();
        this._addEvent();
        this._updateState();

    },

    _init: function() {

    },

    _setOption: function(key, value) {
        this._super(key, value);
    },

    _destroy: function() {},

    _addEvent: function() {
        var self = this;
        $(self._$layout).on('click', '.operation', function() {
            var _$that = $(this);
            self.$operation = _$that;

            if (_$that.hasClass('add')) {
                if (self.options.haveOneMax) {
                    if (self.element.find('tbody tr').length == 1) {
                        $.tip({
                            text: '至多存在一行'
                        });
                        return;
                    }
                }
                self._add.call(self, _$that);

            } else if (_$that.hasClass('remove')) {
                if ((self.options.constraintOne == true) && self.element.find('tbody tr').length == 1) { // 强制用户保留一行
                    $.tip({
                        type: 'warning',
                        text: '必须保留一行内容'
                    });
                    return;
                } else {
                    if (self.options.leastOne && self.element.find('tbody tr').length == 1) { // 如果需要至少保留一行
                        $.dialog({
                            content: '是否删除最后一行数据？',
                            width: 300,
                            height: 100,
                            padding: '15px 15px',
                            lock: true,
                            ok: function() {
                                if (self.options.beforeRemove && self.options.beforeRemove()) {
                                    self._remove.call(self);
                                };
                            }
                        });
                    } else {
                        if (self.options.beforeRemove && self.options.beforeRemove()) {
                            self._remove.call(self);
                        };
                    };
                };
            }
        });

    },

    _renderHeader: function() {
        var _columns = this.options.columns,
            _rowTr = '',
            _self = this,
            $that = _self.element;

        /* 将增加按钮作为可配置 */
        if (_self.options.addBtn) {
            _rowTr +=
                '<th width="40"><a class="operation add" href="javascript:;" title="增加"></a></th>';
        }

        $.each(_columns, function(index, item) {
            if (typeof item != 'undefined') {
                var _temTd = '',
                    _width = item.width && item.width != '' ? item.width : 'auto';
                _rowTr += '<th width="' + _width + '" title="' + item.title + '"><div>' +
                    item.title + '</div></th>';
            }
        });
        return _rowTr;
    },

    _renderRow: function(data) {
        var _rowTr = '',
            _self = this,
            _columns = _self.options.columns,
            $that = _self.element;

        if (_self.options.removeBtn) {
            _rowTr +=
                '<td width="40"><a class="operation remove" href="javascript:;" title="删除"></a></td>';
        }

        $.each(_columns, function(index, item) {
            var oldName = item.name;
            if (item.type == 'radio') {
                item.name = [item.name, _self._$body.find('tr').length].join('-');
            }
            _rowTr += '<td><div class="control"></div></td>';
            item.name = oldName;
        });

        return _rowTr;
    },
    /**
     * 控件的渲染 貌似比想象中的复杂
     * 主要是值的绑定
     * @return {[type]} [description]
     */
    _initControl: function() {
        var self = this;

        self._$body.find('tr:last').find('div.control').each(function(i, obj) {
            var options = $(this).data('flyOptions');
            options = self.options.columns[i];
            options.valid = self.options.valid[options.name];
            var $this = $(this);
            var key = options.type;
            if (options.dict) {
                options.data = self.options.dict[options.dict];
            }
            if (options.type == 'text') {
                key = 'textbox';
            }
            $this[key](options);
        });
    },

    // 添加行
    _add: function($dom) {
        // 根据指定字段判重
        var self = this,
            _$tr = $('<tr data-fly-form ></tr>').append(self._renderRow()),
            _trClass = '';
        _$tr.find('td:last').addClass('fly-table-tr-last');
        _$tr.form().appendTo(self._$body);
        self._updateState();
        self._initControl();
        self.options.afterAdd && self.options.afterAdd.call(self, _$tr);
    },

    // 删除行
    _remove: function() {
        var self = this;

        var _$tr = self.$operation.closest('tr'),
            _$nextTr = self.$operation.closest('tr').next().length !== 0 ? self.$operation.closest('tr').next() :
            self.$operation.closest('tr').prev();
        // 删除回调
        _$tr.trigger('_change', 'remove');
        _$tr.remove();
        this._updateState();

        // 改变排序按钮的状态
        self._initOrderState();
        self.options.afterRemove();
    },
    _updateState: function() {
        var _$trs = this._$body.find('tr');
        _$trs.each(function(i, item) {
            var _trClass = '';
            if (i % 2 == 0)
                _trClass = 'fly-table-tr-odd';
            else
                _trClass = 'fly-table-tr-even';

            $(this).removeClass('fly-table-tr-odd fly-table-tr-even').addClass(_trClass);
        });

        if (_$trs.length)
            this._$empty.hide();
        else
            this._$empty.show();

    },

    /**
     * 设置字典
     * @param {String} dict 字典名
     * @param {Array}  data 字典数据
     */
    setDict: function(dict, data) {
        this.options.dict[dict] = data;
    },

    //字段唯一验证
    _isUnique: function(trData) {
        var self = this;
        var isUnique = true;
        $.each(self.options.unique.split(';'), function(i, obj) {
            if (!isUnique)
                return false;
            $.each(trData, function(j, jobj) {
                var len = ($.grep(trData, function(n, i) {
                    //去除左右空格
                    return $.trim(jobj[obj]) && (n[obj].toUpperCase() == jobj[obj].toUpperCase());
                }, false)).length;
                if (len > 1) {
                    isUnique = false;
                    $('.fly-tab').find('.tab-ul-li[name="' + self.element.closest('.fly-tab-item').attr('data-tab-content') + '"]').click();
                    var item = $.grep(self.options.columns, function(n, i) {
                        return n.name == obj;
                    }, false);
                    self._$body.find('input[name="' + obj + '"]').eq(j).closest('.control').testRemind(item[0].title + '不允许重复');
                    return false;
                }
            });

        });
        return isUnique;
    },

    getData: function(params) {
        var self = this,
            params = params || {},
            $trs = self._$body.find('tr'),
            trData = [],
            sfzhmArr = [],
            flag = true;
        if (self.options.required && !$trs.length) {
            fly.tip({
                type: 'error',
                text: self.options.title + '至少要有一行！'
            });
            return null;
        }
        for (var i = 0, l = $trs.length; i < l; i++) {
            var _jtxx = $trs.eq(i).data('flyForm').getData(params);
            if (!_jtxx) {
                flag = false;
                return false;
            }

            //处理radio字段的数据
            $.each(self.options.radios, function(j, obj) {
                _jtxx[obj] = _jtxx[[obj, i].join('-')];
                _jtxx[[obj, 'Txt'].join('')] = _jtxx[[obj, i].join('-') + 'Txt'];
            });

            trData.push(_jtxx);
        }
        if (!flag)
            return null;

        return self._isUnique(trData) ? trData : null;
    },

    reload: function(data) {
        var self = this;

        if (data) {
            self._$body.empty();
            self.setData(data);
        }
    },

    setData: function(data) {
        var self = this;
        $.merge(self.options.data, data);
        for (var i = 0, len = data.length; i < len; i++) {
            var _item = data[i],
                _$tr = $('<tr data-fly-form />').append(self._renderRow(_item)).data(_item).form();
            _$tr.find('td:last').addClass('fly-table-tr-last');
            self._$body.append(_$tr);
            self._initControl();
            self.options.afterRendreRow(data[i], _$tr);
        }

        this._updateState();
    },

    setReadOnly: function() {
        this._$body.find('input').each(function(i, iObj) {
            $(iObj).attr('disabled', true).attr('title', $(iObj).val()).addClass(
                'disabled');
        });
        this._$layout.off('click', '.operation');
        this._$body.find('.fly-combobox-arrow').unbind();
    },

    /**
     * 渲染按钮的方法
     * @param {object, object} [$(this), {...}]
     * 添加按钮的DOM，该列的参数
     */
    _renderButton: function($this, options) {
        var self = this,
            _obj = {};
        for (var i = 0, max = options.name.length; i < max; i++) {
            _obj = {
                name: options.name[i],
                text: options.text[i]
            };
            self._addButton($this, _obj, self.options.events[_obj.name]);
        };
    },

    /**
     * 渲染排序按钮的方法
     * @param {object, object} [$(this), {...}]
     * 添加按钮的DOM，该列的参数
     */
    _renderOrder: function($this, options) {
        var self = this,
            _obj = {},
            _buttonDom = "";

        for (var i = 0, max = options.name.length; i < max; i++) {
            _buttonDom += "<button type='button' class='multi-btn' name='" + options.name[i] +
                "'>" + options.text[i] + "</button>";
        };
        $this.append(_buttonDom);
        self._addOrderEvent();
        // 改变排序按钮的状态
        self._initOrderState();
    },

    /**
     * 渲染配置按钮的方法
     * @param {object, object} [$(this), {...}]
     * 添加按钮的DOM，该列的参数
     */
    _renderConfiguration: function($this, options) {
        var self = this,
            _obj = {},
            _buttonDom = "";

        for (var i = 0, max = options.name.length; i < max; i++) {
            _buttonDom += "<button type='button' class='config-btn' data-dymbTxt='' data-dymb='' data-cznl='' name='" + options.name[i] +
                "'>" + options.text[i] + "</button>";
        };
        $this.append(_buttonDom);
        // self._addOrderEvent();
        // 改变排序按钮的状态
        // self._initOrderState();
    },

    // 添加顺序的事件
    _addOrderEvent: function() {
        var self = this;
        // 复制
        self.element.find("[name='copy']").off().on("click", function() {

            var _$this = $(this),
                _$thisTr = _$this.parent().parent().parent(),
                _$tbody = _$thisTr.parent(),
                _index = _$thisTr.index(),
                trData = [],
                _jtxx = _$thisTr.data('flyForm').getData();

            if (!_jtxx) return false;

            //处理radio字段的数据
            $.each(self.options.radios, function(j, obj) {
                _jtxx[obj] = _jtxx[[obj, i].join('-')];
                _jtxx[[obj, 'Txt'].join('')] = _jtxx[[obj, i].join('-') + 'Txt'];
            });

            trData.push(_jtxx);
            trData[0].demoText = '';
            // 触发增加一行按钮事件
            self.element.data('flyHandleForm').setData(trData);
            _$tbody.children(':last').find('input[name="sfzhm"]').val(_$tbody.children().length);
        });

        self.element.find("[name='upMove']").off().on("click", function() {

            var _$this = $(this),
                _$thisTr = _$this.parent().parent().parent(),
                _index = _$thisTr.index(),
                _num = _$thisTr.parent().children().length - 1;

            if (_$this.hasClass("disabled-btn")) {
                return false;
            }
            _$thisTr.after(_$thisTr.prev());
            // 改变排序按钮的状态
            self._initOrderState();
            self.options.afterSort(self.element);
        });

        self.element.find("[name='downMove']").off().on("click", function() {

            var _$this = $(this),
                _$thisTr = _$this.parent().parent().parent(),
                _index = _$thisTr.index(),
                _num = _$thisTr.parent().children().length - 1;

            if (_$this.hasClass("disabled-btn")) {
                return false;
            }
            _$thisTr.before(_$thisTr.next());
            // 改变排序按钮的状态
            self._initOrderState();
            self.options.afterSort(self.element);
        });
    },

    // 设置初始化按钮的状态
    _initOrderState: function() {
        var self = this;
        // 将所有排序按钮的禁用解除
        $(self.element).find(".disabled-btn").removeClass("disabled-btn");
        // 将第一个上移按钮设置禁用
        $(self.element).find("[name='upMove']").first().addClass("disabled-btn");
        // 将最后一个下移按钮设置禁用
        $(self.element).find("[name='downMove']").last().addClass("disabled-btn");
    },

    /**
     * 扩展按钮，以及事件绑定
     * @param {object, object, function} [$(this), {name: "sc", text: "上传"}, cb]
     * 添加按钮的DOM，包含名称和文本的对象，回调函数
     */
    _addButton: function($that, obj, cb) {
        var self = this;
        var _buttonDom = "<button type='button' class='multi-btn' name='" + obj.name + "'>" +
            obj.text + "</button>";
        $that.append(_buttonDom);
        $("[name='" + obj.name + "']").off().on("click", function() {
            var _$this = $(this),
                _data = _$this.parent().parent().parent().form().data("flyForm").getData();
            cb && cb.call(self, _$this.parent().parent().parent(), _data);
        });
    },

    _tmpl: function() {
        var _self = this;
        if (_self.options.addBtn) {
            return [
                '<div class="fly-grid-body">',
                '<table class="fly-table" cellspacing="0" cellpadding="0">',
                '<thead class="fly-table-header">',
                '</thead>',
                '<tbody class="fly-table-body" id="cbsxlist_cont">',

                '</tbody>',
                '</table>',
                '<div class="fly-grid-empty">' + _self.options.emptyText + '</div>',
                '</div>',
            ].join('');
        } else {
            return [
                '<div class="fly-grid-body">',
                '<table class="fly-table" cellspacing="0" cellpadding="0">',
                '<thead class="fly-table-header">',
                '</thead>',
                '<tbody class="fly-table-body" id="cbsxlist_cont">',

                '</tbody>',
                '</table>',
                '<div class="fly-grid-empty">暂无数据</div>',
                '</div>',
            ].join('');
        }
    }

});

module.exports = {};

},{}],12:[function(require,module,exports){
var util = require('../js/util');
var utils = fly.utils;
var service = {};
var dictNation = [];
var encryptionUser = localStorage.getItem('encryptionUser');
// GSB服务数据请求地址
var SERVICEACTION = FORMCONTEXTPATH + '/service/callGsbService.do';

// 服务参数处理
var entryParam = function($input, flyForm, options, value) {
    var service = options.server;
    var vm = options.vm;
    //统一的基础入参
    var params = {};
    var entry = {
        conditionParams: '',
        formServiceCode: service.serviceCode, //表单服务标识
        formCode: service.formName, //表单标识
        clientInfo: encryptionUser
    };
    // 服务参数处理字典，1：当前控件值；2：自定义入参
    if (service.paramFixType == 1) {
        params.value = value;
    } else {
        $.each(service.paramMap, function(i, obj) {
            var paramVal;
            if (obj.mapFunc) { //如果有函数
                var f = new Function('value', 'options', obj.mapFunc);
                paramVal = f.call($input, value, options);
            } else if (obj.fieldName) {
                paramVal = obj.parameterValue.replace('${value}', flyForm.getData()[obj.fieldName]);
            } else {
                paramVal = obj.parameterValue.replace('${value}', value);
            }
            params[obj.name] = paramVal;
        });
    }
    entry.conditionParams = fly.toJSON(params);
    return entry;
};

// 照片上传
var uploadPhoto = function(name, base64) {
    var obj = new utils.ajaxObj(),
        options = $.extend({}, obj.options);
    options.before();
    utils.ajax.post('/material/uploadFile2.do', {
            fileType: 1,
            imageName: name,
            image: base64
        }, 'text')
        .done(function(data) {
            data = utils.toObj(data);
            options.after();
            obj._done && obj._done(data);
        })
        .fail(function() {
            options.after();
            obj._fail && obj._fail();
        });
    return obj;
};

service.copyIdcardModel = function(data) {
    var info = data;
    info.XM = data.name;
    info.XB = data.sex;
    info.MZ = data.nation;
    info.CSRQ = data.born;
    info.HJDZ = data.addr;
    return info;
};

// 身份证读取或计算信息处理
service.makeIdCardInfo = function(info, value, mapping, readOption, $form) {
    var newData = {};
    var idInfo = info;
    var born = info.born;
    var originIdCard = info;
    var theDict;
    var dateFormat = readOption.dateFormat || 'yyyy-MM-dd';
    var formMap = readOption.formMap || {};
    var ageRule = readOption.ageRule;
    idInfo.sex = (idInfo.sex == '男' || idInfo.sex == '1') ? '1' : '2';
    idInfo.born = born.substr(0, 4) + '-' + born.substr(5, 2) + '-' + born.substr(8, 2);
    idInfo.AGE = util.getAgeByRule(idInfo.born, ageRule);
    idInfo.born = util.getFormatBirth(dateFormat, idInfo.born);
    idInfo.nationMc = idInfo.nation + '族';
    theDict = $.grep(dictNation, function(n, i) {
        return n.mc == idInfo.nationMc || n.dm == idInfo.nation;
    }, false);
    idInfo.nation = theDict.length == 0 ? '' : theDict[0].dm;
    // 读取信息映射
    for (var key in mapping) {
        if (mapping.hasOwnProperty(key) && idInfo[key]) {
            var mkey = mapping[key];
            if (mkey.indexOf(',') > -1) {
                $.each(mkey.split(','), function(i, obj) {
                    newData[obj] = idInfo[key];
                });
            } else {
                newData[mkey] = idInfo[key];
            }
        }
    }
    $form.data('flyForm').setData(newData);
    $form.trigger('changeOwnerName');
    //不同表单的字段关联
    if (formMap) {
        idInfo = service.copyIdcardModel(idInfo);
        $.each(formMap, function(i, obj) {
            var imap = obj.split(';'),
                iform = $('form[name="' + imap[1] + '"]').data('flyForm'),
                idata = {};
            if (idInfo[imap[0]]) {
                idata[imap[2]] = idInfo[imap[0]];
            }
            iform && iform.setData(idata);
        });
    }
    //如果读取出图片base64
    if (idInfo.photo) {
        var $photo = $form.find('[data-fly-headphoto]').data('flyHeadphoto');
        if ($photo) {
            uploadPhoto('', idInfo.photo).done(function(res) {
                if (res.flag == 'true') {
                    var img = {
                        id: res.data[0].id,
                        fileName: res.data[0].fileName,
                        wjwz: res.data[0].savePath,
                        wjlj: res.data[0].downloadUrl
                    };
                    $.dialog.data('headphoto', img);
                    $photo._setData();
                }
            });
        }
    }
    return originIdCard;
};

service.setGridForm = function(selector, data) {
    var handform = $(selector).data('flyHandleForm');
    if (handform && handform.setData)
        handform.setData(data);
};
// 赋值
service.setData = function($input, flyForm, data, options) {
    if (data.length == 0) {
        return;
    }
    if (data.length == 1) {
        data = data[0];
    }
    // 返回结果处理 3：当前表单映射 1：跨表单映射 2：扩展处理
    $.each(options.server.resFix, function(i, config) {
        // 返回结果处理方式是否生效
        if (config.available != 1)
            return;
        // 3：当前表单映射
        if (config.resFixType == 3) {
            // 如果数组长度大于1则调用多行表单
            if (data.length > 1) {
                action.setGridForm('form[name="' + options.server.formName + '"]', data);
            } else {
                flyForm.setData(data);
            }
            // 1：跨表单映射
        } else if (config.resFixType == 1) {
            $.each(config.resFieldMap, function(i, obj) {
                var value = data[obj.name] || data;
                if (obj.mapFunc) {
                    var myFct = new Function('value', 'options', obj.mapFunc);
                    value = myFct.call($input, value, obj);
                }
                //如果没有自定义函数，或者自定义函数有返回值，则执行字段值的自动映射
                if (value) {
                    if (data.length > 1) {
                        action.setGridForm('form[name="' + obj.formName + '"]', value);
                    } else {
                        flyForm.setData(data);
                    }
                }
            });
            // 2：扩展处理
        } else if (config.resFixType == 2) {
            if (config.resMapFunc) {
                var myFct = new Function('data', 'options', config.resMapFunc);
                myFct.call(e, data, options);
            }
        }
    });
};

service.query = function($input, flyForm, options, value) {
    if (!options.servers.serviceCode)
        return;
    //自定义服务入参处理
    condition = entryParam($input, flyForm, options, value);
    // 服务请求
    $.ajax({
        url: SERVICEACTION,
        data: condition,
        jsonp: true,
        success: function(res) {
            if (res.returnFlag == "true") {
                action.setData($input, flyForm, res.data, options);
            } else {
                alert(ALERT_CONFIG.GET_MESSAGE_FAIL);
            }
        },
        error: function() {
            alert(ALERT_CONFIG.GET_MESSAGE_FAIL);
        }
    });
};

/**
 * 运行服务
 * @param  {[type]} control    [description]
 * @param  {[type]} param      [description]
 * @param  {[type]} eleOptions [description]
 * @return {[type]}            [description]
 */
service.run = function($ele, options, cardWidget) {
    var $form = cardWidget.element.closest('[data-fly-form]');
    var flyForm = $form.data('flyForm');
    //idInfo是身份证读卡器读取的信息
    cardWidget.change && cardWidget.change(function(value, idInfo) {
        value = $.trim(value.toUpperCase());
        //如果当前身份证没有使用身份证读取则手动计算
        if (!idInfo || value != idInfo.no) {
            idInfo = {
                sex: util.getSex(value),
                born: util.getBirth(value),
                AGE: util.getAge(value)
            };
        }
        if (!value) return;
        if (idInfo) {
            var mapping = options.attrs.mapping;
            var readOption = options.attrs.readOption || {};
            if (typeof(mapping) == 'string')
                mapping = fly.json.evalJSON(mapping);
            service.makeIdCardInfo(idInfo, value, mapping, readOption, $form);
        }
        service.query($ele, flyForm, options, value);
    });
};

/**
 * 绑定服务
 * @param  {[type]} $ele       [证件输入框]
 * @param  {[type]} options    [字段配置]
 * @param  {[type]} ivalid     [字段校验]
 * @param  {[type]} dictNation [民族字典用于匹配民族编码]
 * @return {[type]}            [description]
 */
service.bind = function($ele, options, ivalid, dictNation) {
    var cardWidget = $ele.find('.control').data('flyIdcard');
    if (!cardWidget)
        return;
    var sopt = options.servers;
    var attrs = options.attrs;
    cardWidget.options['valid'] = ivalid;
    dictNation = dictNation;
    service.run($ele, options, cardWidget);
};

module.exports = service;

},{"../js/util":20}],13:[function(require,module,exports){
var flyTab = $.widget("fly.tab", {

    options: {
        name: 'tab',
        isEdit: false, // 是否可编辑
        orderAble: false, // 是否允许可编辑的tab排序
        max: 3, // 控制最多选项卡的个数
        data: [],
        adding: false,
        // 在添加新选项卡之前触发
        beforeAddTab: function() {
            // console.log("beforeAddTab");
            return true;
        },
        // 在添加新选项卡之后触发
        afterAddTab: function(name, $that) {
            // console.log("afterAddTab");
        },
        afterDelTab: function() {

        },
        onSelect: function() {} //选中之后
    },

    // 新增tab的默认配置
    _defaultConfig: {
        name: "flyTab",
        num: 0
    },

    // 创建tab
    _create: function() {

        var oneself = this;
        $(oneself.element).attr("name", oneself.options.name);

        if (oneself.options.isEdit === true) {
            if (oneself.options.orderAble === true) {
                oneself._renderOrderTab();
                oneself._addOrderTab();
            } else {
                oneself._renderAddTab();
            }
            oneself._addEditEvent();
        }

        if (oneself.options.isEdit === false) {

            if (oneself.options.adding === true) {
                oneself._renderTab();
                return oneself;
            }
            if (oneself.options.data.length === 0) {
                oneself._packageData();
            }
            oneself._renderTab();
            oneself._addEvent();
            oneself._renderSelectTab();
        }
    },

    // 初始化tab
    _init: function() {

    },

    // 不可编辑的tab数据组装, 未写data的情况
    _packageData: function() {

        var oneself = this,
            _data = [],
            _$contents = $(oneself.element).children(".tab-content-wrapper").children();

        for (var i = 0, max = _$contents.length; i < max; i++) {
            _data.push(fly.utils.parseOptions($(_$contents[i]).attr("data-tab-target")));
            $(_$contents[i]).attr("data-tab-content", _data[i].name);
        };
        oneself.options.data = _data;
    },

    // 如果为设置默认打开tab，则默认为第一个选项卡
    _setDefaultTab: function() {

        var oneself = this;
        if (oneself.options.data.length === 0) return false;
        for (var i = 0, max = oneself.options.data.length; i < max; i++) {
            if (oneself.options.data.selected === true) {
                return true;
            }
        };
        oneself.options.data[0].selected = true;
    },

    // 给不可编辑的tab绑定事件
    _addEvent: function() {

        var oneself = this;

        $(oneself.element).children(".fly-tab").children(".tab-ul").children(".tab-ul-li").on("click", function() {
            var _$that = $(this),
                _name = _$that.attr("name");
            if (!_$that.hasClass("tab-select")) {
                //_$that.addClass("tab-select").siblings().removeClass("tab-select");
                oneself.switchTab(_name);
                oneself.options.onSelect(_$that);
            }
        });
    },

    // 给可编辑的tab绑定事件
    _addEditEvent: function() {

        var oneself = this;

        $(oneself.element).children(".fly-tab").children(".tab-ul").children("[name='addTab']").on("click", function() {
            oneself._addTab();
        });

        $(oneself.element).on("click", ".tab-del", function() {
            var $that = $(this);
            oneself.delTab($that.parent().attr("name"));
        });

        $(oneself.element).on("click", ".tab-edit-switch", function() {
            var $that = $(this),
                name = $that.parent().attr("name");
            if (!$that.parent().hasClass("tab-select")) {
                oneself.switchTab(name);
            }
        });
    },

    // 渲染tab
    _renderTab: function() {

        var oneself = this,
            _li = '',
            _tab = '<div class="fly-tab"><ul class="tab-ul clearfix">';

        // 解决未设置默认tab的情况
        oneself._setDefaultTab();

        for (var i = 0, max = oneself.options.data.length; i < max; i++) {
            if (oneself.options.data[i].selected) {
                _li += '<li class="tab-ul-li tab-select" name=\"' + oneself.options.data[i].name + '\"><a title="' + oneself.options.data[i].text + '" href="javascript:;" onfocus="this.blur();">' + oneself.options.data[i].text + '</a></li>';
            } else {
                _li += '<li class="tab-ul-li" name=\"' + oneself.options.data[i].name + '\"><a title="' + oneself.options.data[i].text + '" href="javascript:;" onfocus="this.blur();">' + oneself.options.data[i].text + '</a></li>';
            }
        }
        if ($(oneself.element).children().hasClass(".tab-content-wrapper")) {
            _tab += _li + '</ul></div>';
        } else {
            _tab += _li + '</ul></div><div class="tab-content-wrapper"></div>';
        }

        $(oneself.element).prepend(_tab);
    },

    // 渲染添加tab的那个选项卡
    _renderAddTab: function() {

        var oneself = this,
            _tab = "";

        _tab = '<div class="fly-tab fly-tab-edit">' + '<ul class="tab-ul clearfix">' + '<li class="tab-ul-add" name="addTab"><a href="javascript:;" onfocus="this.blur();">添加</a><i></i></li>' + '</ul>' + '</div>' + '<div class="tab-content-wrapper"></div>';
        $(oneself.element).prepend(_tab);
    },

    // 渲染可排序的tab
    _renderOrderTab: function() {
        var oneself = this,
            _tab = "";

        _tab = '<div class="fly-tab fly-tab-edit">' + '<ul class="tab-ul clearfix">' + '<li class="tab-ul-add" name="addTab"><a href="javascript:;" onfocus="this.blur();">添加</a><i></i></li>' + '<li class="tab-ul-forward" name="forwardTab"><i></i><a href="javascript:;" onfocus="this.blur();">左移</a></li>' + '<li class="tab-ul-back" name="backTab"><a href="javascript:;" onfocus="this.blur();">右移</a><i></i></li>' + '</ul>' + '</div>' + '<div class="tab-content-wrapper"></div>';

        $(oneself.element).prepend(_tab);
    },

    // 添加排序的按钮事件
    _addOrderTab: function() {

        var oneself = this;

        $(oneself.element).find("[name='forwardTab']").on("click", function() {
            oneself._forwardTab();
        });

        $(oneself.element).find("[name='backTab']").on("click", function() {
            oneself._backTab();
        });
    },

    // 往前移动的事件
    _forwardTab: function() {

        var oneself = this,
            $selectedTab = $(this.element).find('li.tab-select'),
            $selectedContent = $(this.element).find('[data-tab-content]:visible');

        // 已经到头了，不能越界
        if ($selectedTab.prev().length === 0) {
            return;
        }

        $selectedTab.after($selectedTab.prev());
        $selectedContent.after($selectedContent.prev());
    },

    // 往后移动的事件
    _backTab: function() {

        var oneself = this,
            $selectedTab = $(oneself.element).find('li.tab-select'),
            $selectedContent = $(this.element).find('[data-tab-content]:visible');

        // 已经到头了，不能越界
        if ($selectedTab.next().attr('name') === 'addTab') {
            return;
        }
        $selectedTab.before($selectedTab.next());
        $selectedContent.before($selectedContent.next());
    },

    _initNewHeader: function(obj) {

        var _tmpl,
            textTitle,
            oneself = this,
            name = obj ? obj.name : oneself._defaultConfig.name + oneself._defaultConfig.num,
            text = obj ? obj.text : "未知的表单";

        _tmpl = '<li class="tab-ul-li" name="' + name + '"><a class="tab-edit-switch" title="' + text + '" href="javascript:;" onfocus="this.blur();">' + text + '</a><i class="tab-del"></i></li>';
        $(oneself.element).children(".fly-tab").children(".tab-ul").children("[name='addTab']").before(_tmpl);
    },

    // 初始化Tab的内容
    _initNewContent: function(obj) {
        var oneself = this,
            _tmpl,
            _name = obj ? obj.name : oneself._defaultConfig.name + oneself._defaultConfig.num;

        _tmpl = '<div class="fly-tab-item" data-tab-content="' + _name + '"></div>';
        $(oneself.element).children('.tab-content-wrapper').append(_tmpl);
        //$(oneself.element).children("[data-tab-content]").eq(oneself._defaultConfig.num-1).siblings("[data-tab-content]").hide();
        oneself.switchTab(_name);
    },

    // 渲染新Tab
    _renderNewTab: function(obj) {

        var oneself = this;
        oneself._defaultConfig.num++;
        oneself._initNewHeader(obj);
        oneself._initNewContent(obj);
    },

    // 渲染默认选择的tab
    _renderSelectTab: function() {

        var oneself = this;

        for (var i = 0, max = oneself.options.data.length; i < max; i++) {
            if (oneself.options.data[i].selected) {
                oneself.switchTab(oneself.options.data[i].name);
                return;
            }
        }
    },

    // 切换tab
    switchTab: function(param) {

        var oneself = this,
            $tabUl = $(oneself.element).children(".fly-tab").children(".tab-ul"),
            $tabCtn = $(oneself.element).children(".tab-content-wrapper");

        if (typeof param === "number") {
            var $theTab = $tabCtn.children().eq(param);
            if ($theTab.css('display') != 'none') {
                $tabUl.children().eq(param).addClass("tab-select").siblings(".tab-ul-li").removeClass("tab-select");
                //先显示控件再显示tab，避免闪动
                $theTab.show();
                $theTab.siblings('[data-tab-content]').hide();
            }
        } else {
            var $theTab = $tabCtn.children('[data-tab-content="' + param + '"]');
            if ($tabUl.children("[name='" + param + "']").css('display') != 'none') {
                $tabUl.children("[name='" + param + "']").addClass("tab-select").siblings(".tab-ul-li").removeClass("tab-select");
                $theTab.find('input,textarea').show();
                $theTab.show();
                $theTab.siblings('[data-tab-content]').hide();
            }
        }

        //添加对tab第一次加载事件回调
        var tablSelect = $(oneself.element).children(".fly-tab").children(".tab-ul").children(".tab-select");
        if (!tablSelect.data("_init")) {
            tablSelect.trigger("onCreateEvent");
            //onCreate方法只会调用一次
            tablSelect.data("_init", true);
        }
    },

    // 增加tab
    _addTab: function(obj) {

        var oneself = this,
            name;

        if (oneself._addTabLimit() === false) {
            return false;
        }

        if (oneself.options.beforeAddTab && oneself.options.beforeAddTab() === false) {
            return false;
        }
        oneself._renderNewTab(obj);
        name = obj ? obj.name : oneself._defaultConfig.name + oneself._defaultConfig.num;
        oneself.options.afterAddTab && oneself.options.afterAddTab(name, $(oneself.element).children(".tab-content-wrapper").children('[data-tab-content="' + name + '"]'));
    },

    _addTabLimit: function() {

        var oneself = this;

        if ($("[name='" + oneself.options.name + "'] .tab-ul li:not([name='addTab'], [name='forwardTab'], [name='backTab'])").length >= oneself.options.max) {
            $.tip({
                type: 'warning',
                text: '添加不能超出' + oneself.options.max + '个选项卡'
            });
            return false;
        }
        return true;
    },

    /**
     * 添加可编辑tab
     * @author wqli
     */
    addEditTab: function(obj, cb) {
        var oneself = this;

        oneself._addTab(obj);

        cb && cb($(oneself.element).children(".tab-content-wrapper").children('[data-tab-content="' + obj.code + '"]'));
    },

    addTabForm: function(obj, cb, isEdit) {
        var oneself = this,
            _tmpl = '',
            _li = '',
            name = oneself._defaultConfig.name + oneself._defaultConfig.num;

        if (obj.hasOwnProperty("name")) {
            _tmpl = '<div class="fly-tab-item" data-tab-content="' + obj.name + '"></div>';
            _li = '<li class="tab-ul-li" name=\"' + obj.name + '\"><a title="' + obj.text + '" href="javascript:;" onfocus="this.blur();">' + obj.text + '</a></li>';
        } else {
            _tmpl = '<div class="fly-tab-item" data-tab-content="' + name + '"></div>';
            _li = '<li class="tab-ul-li" name=\"' + name + '\"><a title="' + obj.text + '"  href="javascript:;" onfocus="this.blur();">' + obj.text + '</a></li>';
        }

        if (isEdit) {
            $(oneself.element).children(".fly-tab").children(".tab-ul").children("[name='addTab']").before(_li);
        } else {
            $(oneself.element).children(".fly-tab").children(".tab-ul").append(_li);
        }

        $(oneself.element).children(".tab-content-wrapper").append(_tmpl);
        oneself._addEvent();
        oneself._defaultConfig.num++;
        cb && cb($(oneself.element).children(".tab-content-wrapper").children('[data-tab-content="' + name + '"]'));
    },

    // 修改了选项卡的名称
    rename: function(name, rename) {
        var oneself = this;

        // 可编辑tab截断 by ruwang3
        // if(rename.length > 5){
        //     rename = rename.slice(0, 5) + '...';
        // }

        $(oneself.element).children(".fly-tab").children(".tab-ul").children("[name='" + name + "']").children("a").html(rename).attr('title', rename);
    },

    // 根据name获取tab选项卡的名字
    getTabText: function(name) {
        var oneself = this,
            text = $(oneself.element).children(".fly-tab").children(".tab-ul").children("[name='" + name + "']").children("a").html();
        return text;
    },

    // 删除tab
    delTab: function(name) {

        var oneself = this,
            $delTab = $(oneself.element).children(".fly-tab").children(".tab-ul").children("[name='" + name + "']");

        if ($delTab.hasClass("tab-select")) {
            $delTab.remove();
            $(oneself.element).children(".fly-tab").children(".tab-ul").children(".tab-ul-li").children(".tab-edit-switch").click();
        } else {
            $delTab.remove();
        }
        $(oneself.element).children(".tab-content-wrapper").children('[data-tab-content="' + name + '"]').remove();

        oneself.options.afterDelTab && oneself.options.afterDelTab(name);
    },

    // 禁用tab
    disableTab: function(names) {
        var nameArray = names.split(","),
            oneself = this,
            tabs = $(oneself.element).children(".fly-tab").children(".tab-ul");
        for (var i = 0, max = nameArray.length; i < max; i++) {
            tabs.children("[name=" + nameArray[i] + "]").addClass("disabled");
            tabs.children("[name=" + nameArray[i] + "]").off();
        };
    },

    // 解除tab
    relieveTab: function(names) {
        var nameArray = names.split(","),
            oneself = this,
            tabs = $(oneself.element).children(".fly-tab").children(".tab-ul");
        for (var i = 0, max = nameArray.length; i < max; i++) {
            tabs.children("[name=" + nameArray[i] + "]").removeClass("disabled");
            tabs.children("[name=" + nameArray[i] + "]").off().on("click", function() {
                var _$that = $(this),
                    _name = _$that.attr("name");
                if (!_$that.hasClass("tab-select")) {
                    oneself.switchTab(_name);
                    oneself.options.onSelect(_$that);
                }
            });
        };
    },

    /*
     * tab标签计算重新排列 
     */
    computeTabWidth: function(tabWrap) {
        // var $(oneself.element),
        var $tabWrap = $(tabWrap), // tab容器dom
            $liList = $tabWrap.find('.tab-ul-li'), // tab标签的集合
            $aDom = $liList.find('a'); // tab标签下的a标签

        var wrapWidth = parseInt($('.tab-ul').width()), // tab容器宽度
            num = $liList.length, // tab个数
            limWidth = 0, // 所有tab实际宽度总和
            liWList = []; // 所有tab宽度集合

        var marginLeft = parseInt($liList.css('margin-left').replace('px', '')) || 0, // li的左外边距
            marginRight = parseInt($liList.css('margin-right').replace('px', '')) || 0, // li的右外边距
            paddingLeft = parseInt($liList.css('padding-left').replace('px', '')) || 0, // li的左内边距
            paddingRight = parseInt($liList.css('padding-right').replace('px', '')) || 0, // li的右内边距
            borderLeft = parseInt($liList.css('border-left-width').replace('px', '')) || 0, // li的左边框
            borderRight = parseInt($liList.css('border-right-width').replace('px', '')) || 0; // li的右边框

        var aDomMarginLeft = parseInt($aDom.css('margin-left').replace('px', '')) || 0, // 内部a标签左外边距
            aDomMarginRight = parseInt($aDom.css('margin-right').replace('px', '')) || 0, // 内部a右外边距
            aDomPaddingLeft = parseInt($aDom.css('padding-left').replace('px', '')) || 0, // 内部a左内边距
            aDomPaddingRight = parseInt($aDom.css('padding-right').replace('px', '')) || 0; // 内部a右内边距

        $.each($liList, function(i, item) {
            var sumWidth = 0,
                width = parseInt($(item).width());
            if (i === 0) {
                sumWidth = width + marginRight + paddingLeft + paddingRight + borderLeft + borderRight; // 计算单个tab的实际占位宽
            } else {
                sumWidth = width + 2 * marginRight + paddingLeft + paddingRight + borderLeft + borderRight; // 计算单个tab的实际占位宽度
            }
            liWList.push(sumWidth);
            limWidth += sumWidth; // 每个tab相加求和
        });

        // 如果实际宽度总和大于页面容器宽度
        if (limWidth > wrapWidth) {
            var itemWidth = 0,
                arr = liWList,
                newArr = [],
                indexArr = [],
                newIndexArr = [],
                syWidth = wrapWidth; // 剩余宽度
            /*
             * 循环li宽度集合，
             * 小于均分宽度的保留原宽度，
             * 大于均分宽度的放入新的数组中，
             * 进行下一次循环处理
             */
            while (num > 0) {
                itemWidth = (syWidth / num);

                for (var i = 0, len = arr.length; i < len; i++) {
                    if (arr[i] < itemWidth) {
                        syWidth -= arr[i];
                        num -= 1;
                    } else {
                        newArr.push(arr[i]);
                        if (indexArr.length === 0) {
                            newIndexArr.push(i);
                        } else {
                            newIndexArr.push(indexArr[i]);
                        }

                    }
                }

                if (arr.length === newArr.length) {
                    num = 0;
                }
                arr = newArr;
                indexArr = newIndexArr;
                newArr = [];
                newIndexArr = [];
            }

            // 超出的部分重新设定宽度
            if (indexArr.length > 0) {
                var aWidth1 = itemWidth - (marginRight + paddingLeft + paddingRight + borderLeft + borderRight) - (aDomMarginLeft + aDomMarginRight + aDomPaddingLeft + aDomPaddingRight),
                    aWidth2 = aWidth1 - marginRight;
                for (var i = 0, len = indexArr.length; i < len; i++) {
                    if (indexArr[i] == 0) {
                        $aDom.eq(indexArr[i]).css('width', aWidth1).addClass('ell');
                    } else {
                        $aDom.eq(indexArr[i]).css('width', aWidth2).addClass('ell');
                    }
                }
            }
        }
    }
});

module.exports={};
},{}],14:[function(require,module,exports){
/**
 * 一站通电子签章插件
 * 点聚 : dianju
 * 金格 : jinge
 * 百城 : bicengSign
 * 格尔 : geer
 * 金格H5 : jingeh5
 */

var da = require('./fly.dataAggregation');
var util = fly.utils;
//点聚
var dianjuSign;
// 金格 html2
var jingeSign;
// 百城
var bicengSign;
// 金格 html5
var jingeh5;

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
        self.saveSignObjectElement = $("object[name=iHtmlSignature]:last");
        //盖章定位元素位置
        self.saveSignObjectElement.appendTo($("#" + self.options.positionTarget));


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
            $("object[name=iHtmlSignature]:last").appendTo('#sign_' + self.options.name);
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
        switchFormElement($('#canvasFrom input,#canvasFrom textarea'), true);
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

//格尔
geerSign = {

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
            var signObject = '<div style="position:relative;z-index:1;top:0px;left:0px;border:0px solid white" >&nbsp;<object class="webSignObject" ' + ' classid="CLSID:FC55FF90-0D9A-422E-A8E8-D283C94763EC" ' + ' style="position:absolute;left:0px;top:0px;"  >' + '</object> </div>'

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
                //webSignSeal.DrawModeUnsign = 0;
                //webSignSeal.DrawMode = 6;

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
        if (self.webSignSeal.object == null) {
            alert("没安装签章客户端框架或者BCFCtrlLib.dll或者没启用控件。");
            return;
        }

        //显示签章
        self.webSignSeal.SignSeal(true, "文档标题");

        self.webSignSeal.Refresh();
        var size = self.webSignSeal.RealSize;
        self.webSignSeal.style.width = 110 + "px";
        self.webSignSeal.style.height = 110 + "px";
        self.webSignSeal.style.display = 'inherit';
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
        //self.webSignSeal.removeSeal();
        //控制签章隐藏
        self.webSignSeal.style.display = 'none';

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
        return self.webSignSeal.SealData.SaveAs(0x10000);
    },

    /* 设置印章数据 */
    setSeal: function(data) {
        var self = this;
        if (!data)
            return;
        try {

            //self._movePos(self.options.name);
            self.webSignSeal.SealData.LoadFrom(data);
            self.webSignSeal.Refresh();
            var size = self.webSignSeal.RealSize;
            self.webSignSeal.style.width = 110 + "px";
            self.webSignSeal.style.height = 110 + "px";
            self.webSignSeal.style.display = 'inherit';
            self.webSignSeal.SealData = data;
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

// 金格h5
jingeh5 = {

    defaultElement: '<div>',

    options: {
        positionTarget: '',
        dataBindTarget: '',
        documentId: ''
    },

    _create: function() {
        var self = this;
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
        if (!self.options.positionTarget) {
            self.options.positionTarget = 'sign_' + self.options.name;
        }
        self.positionTarget = $('#' + self.options.positionTarget);
        self.positionTarget.css({
            position: 'absolute',
            right: '150px',
            top: '-110px'
        });
        self.positionTarget.parent().css({
            position: 'relative'
        });

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
        if (self.$signature.val()) {
            self.showOrHide(true);
            self.element.text('取消').addClass('sealed');
            self.control.val(self.documentId);
        } else {
            var signatureCreator = Signature.create();
            var protectedItems = signatureCreator.run({
                protectedItems: [], //设置定位页面DOM的id，自动查找ID，自动获取保护DOM的kg-desc属性作为保护项描述，value属性为保护数据。不设置，表示不保护数据，签章永远有效。
                position: self.options.positionTarget, //设置盖章定位dom的ID，必须设置
                okCall: function(fn, img) { //点击确定后的回调方法，this为签章对象 ,签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,保存成功后必须回调fn(true/false)渲染签章到页面上
                    fn(true);
                    self.signatureId = this.getSignatureid();
                    var $isign = $('#kg-img-div-' + self.signatureId + '-' + self.options.positionTarget);
                    var $target = $('#' + self.options.positionTarget);
                    $target.css({
                        marginRight: '40px'
                    });
                    $isign.css({
                        top: '0px',
                        left: '0px'
                    }).appendTo($target);
                    self.element.text('取消').addClass('sealed');
                    // 记录文档ID
                    self.control.val(self.documentId);
                    // 记录印章ID
                    self.$signatureId.val(self.signatureId);
                    self.$docId.val(self.signatureId);
                    // 记录印章数据
                    self.$signature.val(this.getSignatureData());
                    //印章图片base64
                    self.imgBase64 = img.imgdata; //gif格式
                    //禁用审批意见文本框
                    switchFormElement(self.dataBindTarget, false);
                    switchFormElement($('#canvasFrom input,#canvasFrom textarea'), false)
                },
                cancelCall: function() { //点击取消后的回调方法
                    console.log("取消！")
                }
            });
        }
    },

    /* 取消 */
    _removeSeal: function() {
        var self = this;
        self.showOrHide(false);
        self.element.text('盖章').removeClass('sealed');
        self.control.val('');
        //启用审批意见文本框
        switchFormElement(self.dataBindTarget, true);
        switchFormElement($('#canvasFrom input,#canvasFrom textarea'), true)
    },

    showOrHide: function(flag) {
        var sign = Signature.list[this.signatureId];
        if (flag)
            sign.show();
        else
            sign.hide();
    },

    /* 设置印章数据 */
    setSeal: function(data) {
        var self = this;
        if (!data)
            return;
        $.ajax({
            url: CONTEXTPATH + '/webSignH5/getSignatureH5ByCode.do',
            data: {
                signInfoCode: data
            },
            type: 'post',
            success: function(res) {
                try {
                    Signature.loadSignatures([{
                        signatureid: res.data.signatureId,
                        signatureData: res.data.signatureData
                    }]);
                    self._movePos(res.data.signatureId);
                } catch (e) {};
            }
        });
    },

    //保存印章数据
    saveSeal: function() {
        var self = this;
        var param = {
            command: 'SAVESIGNATURE',
            userName: 'jingesign_h5',
            documentId: self.signatureId,
            signatureId: self.signatureId,
            signatureData: self.$signature.val()
        };
    },

    _movePos: function(signId) {
        var self = this;
        var itv = setInterval(function() {
            var $isign = $('#kg-img-div-' + signId + '-' + self.options.positionTarget);
            if (!$isign.length) {
                return;
            } else {
                clearInterval(itv);
            }
            var $target = $('#' + self.options.positionTarget);
            var $itable = $target.closest('table');
            var signHeight = $isign.height();
            var theight = $itable.height();
            $isign.css({
                top: '0px',
                left: '0px'
            }).appendTo($target);
            $target.css('top', '-' + (signHeight - 30) + 'px');
            //动态设置表格高度
            if (theight < signHeight) {
                $itable.find('.operate-opinion').css('height', (signHeight - theight + 40).toString() + 'px');
            }
        }, 50);
    },

    _setSealZIndex: function() {},

    _init: function() {

    },

    _setOption: function(key, value) {
        this._super(key, value);
    },

    _destroy: function() {

    }
};

//金格h5签章控件初始化
var jingeh5Init = function() {
    if (!window['console']) { //IE8，没有改对象，创建一个对象
        window['console'] = { log: function() {} }
    }
    Signature.init({ //初始化属性
        clientConfig: { //初始化客户端参数
            'SOFTTYPE': '0' //0为：标准版， 1：网络版
        },
        valid: false, //签章和证书有效期判断， 缺省不做判断
        icon_move: true, //移动签章按钮隐藏显示，缺省显示
        icon_remove: true, //撤销签章按钮隐藏显示，缺省显示
        icon_sign: true, //数字签名按钮隐藏显示，缺省显示
        icon_signverify: true, //签名验证按钮隐藏显示，缺省显示
        icon_sealinfo: true, //签章验证按钮隐藏显示，缺省显示
        signable: false,
        certType: 'client', //设置证书在签章服务器
        sealType: 'client', //设置印章从签章服务器取
        documentid: 'yzt' + (new Date()).getTime(), //设置文档ID
        documentname: '一站通事项审批', //设置文档名称
        pw_timeout: 's1800' //s：秒；h:小时；d:天
    })
};

var flyWebsign = null;
//根据配置文件检查使用签章插件
if (APPCONFIG.signName == 'jinge') {
    flyWebsign = $.widget("fly.websign", jingeSign);
} else if (APPCONFIG.signName == 'biceng') {
    flyWebsign = $.widget("fly.websign", bicengSign);
} else if (APPCONFIG.signName == 'dianju') {
    flyWebsign = $.widget("fly.websign", dianjuSign);
} else if (APPCONFIG.signName == 'geer') {
    flyWebsign = $.widget("fly.websign", geerSign);
} else if (APPCONFIG.signName == 'jingeh5') {
    jingeh5Init();
    flyWebsign = $.widget("fly.websign", jingeh5);
}

module.exports = {};

},{"./fly.dataAggregation":4}],15:[function(require,module,exports){
/**
 * flyui1.0和0.6组件参数转换
 *
 * by lcmj
 */
var PROVINCE = {
    name: 'province',
    title: '省',
    required: true
};
var CITY = {
    name: 'city',
    title: '市',
    required: true
};
var COUNTY = {
    name: 'county',
    title: '县(区)',
    required: true
};
var COUNTRYSIDE = {
    name: 'countryside',
    title: '乡(街道)',
    required: true
};
var VILLAGE = {
    name: 'village',
    title: '村(社区)',
    required: true
};
var GROUP = {
    name: 'group',
    title: '组(自然村)'
};

var widget = function(type, options) {
    var ioptions = options;
    if (type == 'address') {
        ioptions = $.extend(options, {
            type: 'address',
            name: options.name + 'Txt',
            valueName: options.name,
            url: options.url.replace('/form', ''),
            fullName: options.fullText
        });
        if (!ioptions.queryBtn) {
            ioptions.queryBtn = '选择';
        }
        // 此处暂时假定该配置项不可修改
        if (ioptions.items == "['province', 'city', 'county', 'countryside', 'village']") {
            ioptions.items = [PROVINCE, CITY, COUNTY, COUNTRYSIDE, VILLAGE, GROUP];
        }
    } else if (type == 'checkbox') {
        ioptions = $.extend(options, {
            type: 'checkbox'
        });
        if (typeof(options.source) == 'string') {
            ioptions.dict = options.source;
        } else if (typeof(options.source) == 'object') {
            ioptions.data = options.source;
        }
    } else if (type == 'daterange') {
        ioptions.startName = options.startname;
        ioptions.endName = options.endname;
    } else if (type == 'division') {
        ioptions = $.extend(options, {
            type: 'division',
            name: 'receiveDeptName',
            valueName: 'receiveDeptCode',
            fullName: options.fullText
        });
        if (!ioptions.queryBtn) {
            ioptions.queryBtn = '选择';
        }
        if (ioptions.url) {
            if (ioptions.url.indexOf('org/getOrgListByCode.do') > -1) {
                ioptions.url = 'org/getOrgListByCode.do';
            } else {
                ioptions.url = options.url.replace('/form', '');
            }
        } else {
            ioptions.url = 'org/getOrgListByCode.do';
        }
        if (ioptions.items == "['county', 'countryside', 'village']") {
            ioptions.items = [COUNTRYSIDE, VILLAGE, GROUP];
        }
    } else if (type == 'dropdown') {
        ioptions = $.extend(options, {
            type: 'combobox'
        });
        if (typeof(options.source) == 'string') {
            ioptions.dict = options.source;
        } else if (typeof(options.source) == 'object') {
            ioptions.data = options.source;
        }
    } else if (type == 'dropdowntree') {
        ioptions = $.extend(options, {
            type: 'combobox'
        });
        if (typeof(options.source) == 'string') {
            ioptions.dict = options.source;
        } else if (typeof(options.source) == 'object') {
            ioptions.data = options.source;
        }
    } else if (type == 'textbox') {
        ioptions = $.extend(options, {
            type: 'text'
        });
    } else if (type == 'radio') {
        ioptions = $.extend(options, {
            type: 'radio'
        });
        if (typeof(options.source) == 'string') {
            ioptions.dict = options.source;
        } else if (typeof(options.source) == 'object') {
            ioptions.data = options.source;
        }
    } else if (type == 'textarea' || type == 'textfield') {
        ioptions = $.extend(options, {
            type: 'textarea'
        });
    } else if (type == 'suggestbox') {
        if(!ioptions.data){
            ioptions.data='/common/district.do';
        }
    } else if (type == 'button') {
        ioptions = $.extend(options, {
            type: 'text'
        });
    }
    ioptions.width = [options.width, '/', 12].join('');
    ioptions.labelWidth = Number(options.labelWidth);
    return ioptions;
};

module.exports = widget;

},{}],16:[function(require,module,exports){
var util = require('./util');

var rules = {};

// 姓名
rules.name = {
    max: 20
};

// 地址 
rules.address = {
    max: 40
};

// 身份证号码
rules.idcard = {
    title: '身份证号',
    validNow: false,
    defineValid: function(val) {
        var msg = '',
            $this = $(this),
            gender = $this.parents('[data-fly-form-element]').data('gender');
        val = $.trim(val).toUpperCase();
        $this.val(val);
        var validData = idcard.valid(val, $this);

        if (!validData.pass) {
            msg = $this.val() == '' ? '您尚未输入身份证号' : '身份证格式错误';
            $this.testRemind(msg);
        } else {

            //身份证号性别验证
            if (gender) {
                var sex = (util.getSex(val) == '男' ? 'man' : 'woman');
                if (gender != sex) {
                    msg = '身份证号性别错误';
                    $this.testRemind(msg);
                    validData.pass = false;
                }
            }
        }

        return validData.pass;
    }
};

// 校验非必填身份证输入框
rules.idcardNoRequired = {
    title: '身份证号',
    validNow: false,
    defineValid: function(val) {
        if ($.trim(val) == '') { // 用户不输入时不给予校验提示
            return true;
        } else {
            var msg = '',
                $this = $(this);
            var validData = idcard.valid(val, $this);
            if (!validData.pass) {
                msg = '身份证格式错误';
                $this.testRemind(msg);
            }
            return validData.pass;
        };
    }
};

// 手机号码
rules.mobile = {
    max: 15,
    pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/
};

// 固定电话
rules.telephone = {
    max: 15,
    pattern: /^([0-9]{3,4}-)?[0-9]{7,8}$/
};

// 联系电话
// 固话和手机均可
rules.phone = {
    title: '联系电话',
    max: 20,
    pattern: /^((0\d{2,3}-\d{7,8})|(\d{7,8})|(1[35784]\d{9}))$/
};

// 年龄
// 只能是整数
rules.age = {
    title: '年龄',
    type: 'number',
    min: 0,
    max: 199
};

// 银行卡号
// 正则
rules.bankCardNumber = {
    title: '银行卡号',
    max: 20,
    pattern: /^$|(^[0-9]\d{0,19}$)/i
};

// 护照
// 正则
rules.passport = {
    title: '护照',
    max: 20
};

// 组织机构代码
rules.orgCode = {
    title: '组织机构代码',
    validNow: false,
    defineValid: function(val) {
        var validData = orgCode.valid(val);
        var msg = '',
            $this = $(this);
        if (!validData.pass) {
            msg = $this.val() == '' ? '您尚未输入组织机构代码' : '组织机构代码格式错误';
            $this.testRemind(msg);
        }
        return validData.pass;
    }
};

// 军官证
rules.offCert = {
    title: '军官证',
    max: 9
};

// 营业执照
rules.busCode = {
    title: '营业执照',
    max: 15
};

// 税务登记证
rules.taxRegCert = {
    title: '税务登记证',
    max: 15
};

//地址（加长）
rules.addrLong = {
    title: '地址',
    max: 200
};

// 低保证号
rules.lowAssuCard = {
    title: '低保证号',
    max: 20,
    pattern: /^[0-9]*$/
};

// 一卡通账号
rules.oneCard = {
    title: '一卡通账号',
    max: 50,
    pattern: /^[0-9]*$/
};

// 邮编
rules.zipCode = {
    title: '邮编',
    max: 6,
    pattern: /^[0-9][0-9]{5}$/
};

/* 对身份证号码的校验 */
var idcard = (function() {

    var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
    var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X
    var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    };

    function IdCardValidate(idCard, $input) {
        var result = {
                pass: false,
                tip: '身份证格式错误',
                data: null
            },
            data = {};

        //去掉字符串头尾空格
        idCard = trim(idCard.replace(/ /g, ""));
        idCard = idCard.toUpperCase();
        //空值
        if (!idCard) {
            result.tip = "身份证号不能为空";
            result.pass = false;
            result.isEmpty = true;
            return result;
        }

        if (idCard.length == 15) {

            //进行15位身份证的验证
            if (isValidityBrithBy15IdCard(idCard)) {
                result.pass = true;
            }

        } else if (idCard.length == 18) {

            //进行18位身份证的基本验证和第18位的验证
            var a_idCard = idCard.split("");
            if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {
                result.pass = true;
            }

        }

        if (result.pass) {
            result.tip = "身份证格式正确";
            if ($input) {
                data[$input.attr('name')] = idCard;
                data['no'] = idCard;
            }
            data.sex = getSex(idCard);
            data.born = getBirth(idCard);
            data.AGE = getAge(idCard);
            result.data = data;

            $input.data('idinfo', data);
        }

        return result;
    }

    /**
     * 判断身份证号码为18位时最后的验证位是否正确
     * @param a_idCard 身份证号码数组
     * @return
     */
    function isTrueValidateCodeBy18IdCard(a_idCard) {
        var sum = 0; // 声明加权求和变量
        if (a_idCard[17].toLowerCase() == 'x') {
            a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
        }
        for (var i = 0; i < 17; i++) {
            sum += Wi[i] * a_idCard[i]; // 加权求和
        }
        valCodePosition = sum % 11; // 得到验证码所位置
        if (a_idCard[17] == ValideCode[valCodePosition]) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 验证18位数身份证号码中的生日是否是有效生日
     * @param idCard 18位书身份证字符串
     * @return
     */
    function isValidityBrithBy18IdCard(idCard18) {
        var year = idCard18.substring(6, 10);
        var month = idCard18.substring(10, 12);
        var day = idCard18.substring(12, 14);
        var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
        // 这里用getFullYear()获取年份，避免千年虫问题
        if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 验证15位数身份证号码中的生日是否是有效生日
     * @param idCard15 15位书身份证字符串
     * @return
     */
    function isValidityBrithBy15IdCard(idCard15) {
        var year = idCard15.substring(6, 8);
        var month = idCard15.substring(8, 10);
        var day = idCard15.substring(10, 12);
        var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
        // 对于老身份证中的年龄则不需考虑千年虫问题而使用getYear()方法
        if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
            return false;
        } else {
            return true;
        }
    }

    //去掉字符串头尾空格
    function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    /**
     * 通过身份证判断是男是女
     */
    function getSex(idCard) {
        idCard = trim(idCard.replace(/ /g, "")); // 对身份证号码做处理。包括字符间有空格。
        if (idCard.length == 15) {
            if (idCard.substring(14, 15) % 2 == 0) {
                return 2;
            } else {
                return 1;
            }
        } else if (idCard.length == 18) {
            if (idCard.substring(14, 17) % 2 == 0) {
                return 2;
            } else {
                return 1;
            }
        } else {
            return null;
        }
    }

    /**
     * 通过身份证获取生日
     */
    function getBirth(idCard) {
        idCard = trim(idCard.replace(/ /g, ""));
        if (idCard.length == 15) {
            var year = idCard.substring(6, 8);
            var month = idCard.substring(8, 10);
            var day = idCard.substring(10, 12);
            return '19' + year + '-' + month + '-' + day;
        } else if (idCard.length == 18) {
            var year = idCard.substring(6, 10);
            var month = idCard.substring(10, 12);
            var day = idCard.substring(12, 14);
            return year + '-' + month + '-' + day;
        } else {
            return null;
        }
    }

    /**
     * 通过身份证获取年龄
     */
    function getAge(idCard) {
        var year1;
        idCard = trim(idCard.replace(/ /g, ""));

        if (idCard.length == 15) {
            year1 = Number('19' + idCard.substring(6, 8));
        } else if (idCard.length == 18) {
            year1 = Number(idCard.substring(6, 10));
        } else {
            return null;
        }

        var year2 = (new Date()).getFullYear();

        return (year2 - year1);
    }

    return {
        valid: IdCardValidate
    };

})();

// 验证组织机构代码
var orgCode = (function() {

    function orgCodeValidate(code) {
        var result = {
            pass: false,
            tip: '组织机构代码格式错误',
            data: null
        };

        //去掉字符串头尾空格
        code = $.trim(code.replace(/ /g, ""));
        code = code.toUpperCase();
        //空值
        if (!code) {
            result.tip = "组织机构代码不能为空";
            result.pass = false;
            result.isEmpty = true;
            return result;
        }

        if (checkOrgCode(code)) {
            result.pass = true;
        }

        return result;
    }

    function checkOrgCode(code) {
        var ws = [3, 7, 9, 10, 5, 8, 4, 2];
        var str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var reg = /^([0-9A-Z]){8}-[0-9|X]$/; // /^[A-Za-z0-9]{8}-[A-Za-z0-9]{1}$/
        var sum = 0;
        for (var i = 0; i < 8; i++) {
            sum += str.indexOf(code.charAt(i)) * ws[i];
        }
        var c9 = 11 - (sum % 11);
        //c9 = c9 == 10 ? 'X' : c9
        if (c9 == 10) {
            c9 = 'X';
        } else if (c9 == 11) {
            c9 = 0;
        }
        if (!reg.test(code) || !(c9 == code.charAt(9))) {
            return false;
        }
        return true;
    }

    //去掉字符串头尾空格
    function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    return {
        valid: orgCodeValidate
    };
})();

// 营业执照验证
var busCode = (function() {

    function busCodeValidate(busCode) {
        var result = {
            pass: false,
            tip: '营业执照格式错误',
            data: null
        };

        //去掉字符串头尾空格
        busCode = $.trim(busCode.replace(/ /g, ""));
        busCode = busCode.toUpperCase();
        //空值
        if (!busCode) {
            result.tip = "营业执照不能为空";
            result.pass = false;
            result.isEmpty = true;
            return result;
        }

        if (isValidBusCode(busCode)) {
            result.pass = true;
        }

        return result;
    }

    function isValidBusCode(busCode) {
        var ret = false;
        if (busCode.length == 15) {
            var s = [];
            var p = [];
            var a = [];
            var m = 10;
            p[0] = m;
            for (var i = 0; i < busCode.length; i++) {
                a[i] = parseInt(busCode.substring(i, i + 1), m);
                s[i] = (p[i] % (m + 1)) + a[i];
                if (0 == s[i] % m) {
                    p[i + 1] = 10 * 2;
                } else {
                    p[i + 1] = (s[i] % m) * 2;
                }
            }
            if (1 == (s[14] % m)) {
                //营业执照编号正确!
                ret = true;
            } else {
                ret = false;
            }
        }
        return ret;
    }

    //去掉字符串头尾空格
    function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    return {
        valid: busCodeValidate
    };
})();

module.exports = rules;

},{"./util":20}],17:[function(require,module,exports){
jQuery.download = function(url, data, method) {
	var TOPWIN = top.window;
	if (url && data) {
		data = typeof data == 'string' ? data : jQuery.param(data);
		var inputs = '';
		
		var form_ = $('<form target="_self" enctype="application/x-www-form-urlencoded; charset=UTF-8" action="' + url + '" method="' + (method || 'post') + '">' + inputs + '</form>');
		
		jQuery.each(data.split('&'), function() {
			var pair = this.split('=');
			var key = pair[0];
			var val = pair[1];
			var input_ = $("<input type='hidden' name='" + key + "' value='' />");
			input_.val(encodeURI(val));			
			form_.append(input_);

		});
		form_.appendTo('body').submit().remove();	
		
		var num=0;
		delCookie("download-status");
		var alarmClose = getCookie("download-status");
		var  t1 = setInterval(function(){
			num++;
			var alarmClose = getCookie("download-status");
			if(alarmClose=="success" || num==10){
				clearInterval(t1);
		        delCookie("download-status");
				TOPWIN.$('body').mask('remove');
			}
		}, 1000  * 1 );
		
	};
	
	
	function getCookie(name) {
		var strCookie=document.cookie; 
		var arrCookie=strCookie.split("; "); 
		for(var i=0;i<arrCookie.length;i++){ 
			var arr=arrCookie[i].split("="); 
			if(arr[0]==name){
				return arr[1];
			} 
		} 
		return ""; 
	}
	
	function delCookie(name) {
		 var exp = new Date();
         exp.setTime(exp.getTime() - 1000);
         var cval = getCookie(name);
         if (cval && cval != "") {
             document.cookie = name + "=" + cval + ";expires=" +
                 exp.toGMTString()+"; path=/";
         }
	}
};
},{}],18:[function(require,module,exports){
/* 统一提示语信息 */

var data = {
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
    "PASSWORD_ERROR": "原始密码错误！",
    "PASSWORD_NOT_CHANGE": "新密码必须与原始密码不同！",
    "PASSWORD_CHANGE": "两次输入的新密码必须保持一致！",
    "PASSWORD_ALL_BLANK": "密码不能全部为空！",
    "PHASE_IS_NULL": "至少要有一个阶段！",
    "UPLOAD_LARGE_FAIL": "文件大于2M，请重新上传！",
    "PHASE_EXCCED_MAX_SIZE": "专题阶段数量不能超过{MAX_PHASE_NUMBER}个!",
    "ITEM_EXCCED_MAX_SIZE": "阶段事项数量不能超过{MAX_ITEM_NUMBER}个!",
    "FORM_ATTR_REF": "事项表单属性不能相互引用"
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
    return $.dialog.through($.extend(options, param));
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
    return $.dialog($.extend(options, param));
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
    szFeatures += "resizable=yes"; // channelmode
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
/**
 * 打印pdf的窗口
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
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
    var lgouturl = localStorage.getItem('LOGOUT');
    var win = window.top || window;
    var appUrl = win.location.href;
    var appUrl = (appUrl.indexOf('yzt') > -1 ? appUrl.substr(0, appUrl.indexOf('yzt') + 3) : appUrl);
    var path = '';
    var times = -1;
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
                res = eval('(' + res + ')');
                var status = res.status;
                if (status !== '' && status === false) {
                    win.message.alertDialog({
                        content: '用户信息失效，将返回登录页！',
                        close: function() {
                            setTimeout(function() {
                                win.location.href = path;
                            }, 500);
                        }
                    });
                }
            } catch (e) {

            }

        }
    });
};

globalAjaxSetup();

module.exports = message;

},{}],19:[function(require,module,exports){
'use strict';

 var rules = {};

 /**
  * 必填校验 
  * 不能为空    
  */
 rules.required = {
     required: true
 };

 /**
  * 数字校验
  * 必须为数字    
  */
 rules.number = {
     type: 'number'
 };

 /**
  * 数字及字母校验
  * 字母或数字    
  */
 rules.letterOrNumber = {
     pattern: /^[A-Za-z][A-Za-z0-9]*$/
 };

 /**
  * 名称
  * 最大长度 20
  */
 rules.name = {
     max: 20
 };    

 /**
  * 身份证    
  * 正则
  */
 rules.idcard1 = {
     title: '身份证',
     pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/
 };

 /**
  * 二代身份证    
  * 正则
  */
 rules.idcard = {
     title: '二代身份证',
     pattern: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
 };

 /**
  * 手机号码    
  * 正则
  */
 rules.mobile = {
     title: '手机号码',
     max: 15,
     pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/
 };

 /**
  * 固定电话    
  * 正则
  */
 rules.telephone = {
     title: '固定电话',
     max: 15,
     pattern: /^([0-9]{3,4}-)?[0-9]{7,8}$/
 };

 /**
  * 联系电话（手机号码或固定电话）  
  * 正则
  */
 rules.contactNumber = {
     title: '联系电话',
     max: 20,
     pattern: /^((0\d{2,3}-\d{7,8})|(\d{7,8})|(1[35784]\d{9}))$/
 };

 /**
  * 年龄    
  * 数字 整数 0-199
  */
 rules.age = {
     title: '年龄',
     type: 'number',
     min: 0,
     max: 199
 };

 /**
  * 银行卡号    
  * 正则
  */
 rules.bankCardNumber = {
     title: '银行卡号',
     max: 20,
     pattern: /^$|(^[0-9]\d{0,19}$)/i
 };

 /**
  * 电子邮箱    
  * 正则
  */
 rules.email = {
     title: '电子邮箱',
     pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
 };

 /**
  * 邮编    
  * 正则
  */
 rules.zipCode = {
     title: '邮编',
     max: 6,
     pattern: /^[0-9][0-9]{5}$/
 };

 /**
  * 日期    
  * 正则（包括闰年的验证）
  */
 rules.date = {
     title: '日期',        
     pattern: /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([13579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/
 };

module.exports = rules;

},{}],20:[function(require,module,exports){
//window对象
var originWin = window.parent;

//工具
var util = fly.utils;

//dao方法
var dao = {
    /**
     * 根据申报号获取流程实例ID
     * @param {[[Type]]} projNo     申报号
     */
    getInstIdByProjNo: function(data) {
        var obj = new util.ajaxObj(),
            options = $.extend({}, obj.options);
        options.before();
        util.ajax.post('/proItem/getPreApasinfo.do', data, 'text')
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

var bizUtil = {
    //流程查询
    queryProcedure: function(id) {
        var instId = '',
            url = CONTEXTPATH + '/bizcommon/flow-query.do?projNo=' + id + '&processInstID=' + instId;
        dao.getInstIdByProjNo({
            projNo: id
        }).done(function(res) {
            instId = res.data.processInstId || '';
            url = CONTEXTPATH + '/bizcommon/flow-query.do?projNo=' + id + '&processInstID=' + instId;
            bizUtil.openProcessDialog(url);
        }).fail(function() {
            bizUtil.openProcessDialog(url);
        });
        //bizUtil.openProcessDialog(url);
    },

    //弹出流程查询
    openProcessDialog: function(url) {
        $.dialog.open(url, {
            title: '流程查询',
            width: 800,
            height: 400,
            padding: '10px'
        });
    },

    //根据出生日期计算年龄
    //yyyy-mm-dd
    getAgeByBirth: function(birth) {
        var year1 = (new Date()).getFullYear(),
            year2 = birth.substr(0, 4);
        return year1 - year2;
    },

    //返回指定格式的出生日期
    getFormatBirth: function(format, birth) {
        switch (format) {
            case 'yyyy-mm':
                return birth.substr(0, 7);
                break;
            default:
                return birth;
                break;
        }
    },

    /**
     * 去除表单查询条件的首尾空格
     * @param  {Object} originOptions 原始查询参数
     * @return {Object} trimOptions   trim后的查询参数
     */
    trimSpace: function(originOptions) {
        var trimOptions = {},
            index;

        for (index in originOptions) {
            if (typeof originOptions[index] != 'number') {
                trimOptions[index] = $.trim(originOptions[index]);
            } else {
                trimOptions[index] = originOptions[index];
            };
        };
        return trimOptions;
    },

    /**
     * 通过身份证获取年龄
     */
    getAge: function(idCard) {
        var year1;
        idCard = $.trim(idCard);

        if (idCard.length == 15) {
            year1 = Number('19' + idCard.substring(6, 8));
        } else if (idCard.length == 18) {
            year1 = Number(idCard.substring(6, 10));
        } else {
            return null;
        }

        var year2 = (new Date()).getFullYear();

        return (year2 - year1);
    },

    /**
     * 通过身份证获取性别
     */
    getSex: function(idCard) {
        idCard = $.trim(idCard); // 对身份证号码做处理。包括字符间有空格。
        if (idCard.length == 15) {
            if (idCard.substring(14, 15) % 2 == 0) {
                return '女';
            } else {
                return '男';
            }
        } else if (idCard.length == 18) {
            if (idCard.substring(14, 17) % 2 == 0) {
                return '女';
            } else {
                return '男';
            }
        } else {
            return null;
        }
    },

    /**
     * 通过身份证获取出生日期
     */
    getBirth: function(idCard) {
        idCard = $.trim(idCard);
        if (idCard.length == 15) {
            var year = idCard.substring(6, 8);
            var month = idCard.substring(8, 10);
            var day = idCard.substring(10, 12);
            return '19' + year + '-' + month + '-' + day;
        } else if (idCard.length == 18) {
            var year = idCard.substring(6, 10);
            var month = idCard.substring(10, 12);
            var day = idCard.substring(12, 14);
            return year + '-' + month + '-' + day;
        } else {
            return null;
        }
    },

    /**
     * 根据年龄精确度计算
     * @param  {string} csrq 出生日期
     * @param {string} ageRule 年龄的计算规则
     * @return 年龄
     */
    getAgeByRule: function(csrq, ageRule) {
        switch (ageRule) {
            case 'year':
                return this.getAgeByBirth(csrq);
                break;
            case 'month':
                return this.getAgeByMonth(csrq);
                break;
            case 'date':
                return this.getAgeByDate(csrq);
                break;
            default:
                // 默认计算年龄精确到年
                return this.getAgeByBirth(csrq);
                break;
        }
    },

    /**
     * 计算年龄精确到月
     * @param  {string} csrq 出生日期
     * @return {Number} age 年龄
     */
    getAgeByMonth: function(csrq) {

        var year = csrq.substring(0, 4),
            month = csrq.substring(5, 7),
            age = (new Date).getFullYear() - Number(year) - 1;
        if (Number(month) <= (new Date).getMonth() + 1) {
            age = age + 1;
        }
        return age;
    },

    /**
     * 计算年龄精确到日
     * @param  {string} csrq 出生日期
     * @return {Number} age 年龄
     */
    getAgeByDate: function(csrq) {

        var date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            age = year - Number(csrq.substring(0, 4)) - 1;
        if (Number(csrq.substring(5, 7)) < month || Number(csrq.substring(5, 7)) == month && Number(csrq.substring(8, 10)) <= day) {
            age++;
        }
        return age;
    },

    /**
     * 信息缓存方法
     */
    infoTempSave: function(key, value) {
        $.dialog.data(key, value);
    },

    /**
     * 最顶层加遮罩
     */
    addTopMask: function() {
        if (window.top) {
            $(window.top.$('body')).mask();
        }
    },

    /**
     * 最顶层清除遮罩
     */
    clearTopMask: function() {
        if (window.top) {
            $(window.top.$('body')).mask('remove');
        }
    },

    /**
     * 获取印章图片
     *param signName:印章名称
     *param targetId:印张图片容器元素id
     */
    getSignImg: function(signName, targetId) {
        var imgBase64 = document.all.DWebSignSeal.GetSealBmpString(signName, 'gif');
        $('<img/>').attr('src', 'data:image/gif;base64,' + imgBase64).css({
            position: 'absolute',
            top: -130,
            left: -150
        }).appendTo(targetId);
    },

    //操作成功tip
    succTip: function(text, callback) {
        $.tip({
            type: 'success',
            text: text
        });
        this.disableBtn(originWin.$('#toolbar .btn'));
        this.disableBtn($('#toolbar .btn'));
        var t = setTimeout(function() {
            callback && callback();
        }, 2000);
    },

    //禁用按钮
    disableBtn: function($ele) {
        $ele.attr('disabled', true).addClass('disabled');
    },

    //启用按钮
    enableBtn: function($ele) {
        $ele.removeClass('disabled').removeAttr('disabled');
    },

    //操作成功统一响应
    operateDone: function(text, callback) {
        this.succTip(text, callback);
    },

    /**
     * 模拟placeholder
     * @param  {[type]} input      [输入框]
     * @param  {[type]} keyword    [输入框提示]
     * @param  {[type]} focusClass [聚焦的字体样式,唯一,不可重复]
     */
    imitatePlaceholder: function(input, keyword, focusClass) {
        var $tip = $('<span class="' + focusClass + '">' + keyword + '</span>'),
            $input = $(input);

        $input.after($tip);
        if ($input.val() != '') {
            $tip.hide();
        }
        $(document).on('focus', input, function() {
            if ($tip.css('display') != 'none') {
                $tip.hide();
                $input.val('');
            }
        });
        $(document).on('blur', input, function() {
            if ($.trim($input.val()) == '') {
                $tip.show();
            }
        });
        $(document).on('click', '.' + focusClass, function() {
            $input.trigger('focus');
        });
    }
};

module.exports = bizUtil;

},{}],21:[function(require,module,exports){
/**
 * 申请审核页面渲染逻辑
 * 依赖表单数据模型
 */
var dao = require('./dao');
var toolbar = require('./toolbar');
var lcs = require('./localstorage');
var applyHistory = require('./applyHistory');
var formparser = require('../fly.formparser');
var formtable = require('../fly.formtable');
var da = require('../fly.dataAggregation');
var sign = require('../fly.websign');
var tab = require('../fly.tabform');
var cred = require('../fly.credentials-0.5');
var $body = $('body');
var oneself;

// 如果办事项表单使用数据模型，则切换表单引擎
if (workflow.sfsybdsjq == 1) {
    $.fn.loadForm = function(options) {
        if (options.isView) {
            $(this).formtable({
                data: $.extend({
                    formData: options.formData
                }, options.data),
                onComplete: function(obj) {
                    options.callback.call(obj);
                }
            });
        } else {
            $(this).formparser({
                data: options.data,
                jsonData: options.formData,
                onComplete: function(obj) {
                    options.callback.call(obj);
                    obj.action.element.trigger('setDataComplete');
                }
            });
        }
    };
}

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
                data: fly.json.evalJSON(item.jsonValue),
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
                        data: fly.json.evalJSON(item.jsonValue),
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
                        data: fly.json.evalJSON(item.jsonValue),
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
                        data: fly.json.evalJSON(item.jsonValue),
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
                        data: fly.json.evalJSON(item.jsonValue),
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
                        data: fly.json.evalJSON(item.jsonValue),
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
                        data: fly.json.evalJSON(item.jsonValue),
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
                        data: fly.json.evalJSON(item.jsonValue),
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
                        data: fly.json.evalJSON(item.jsonValue),
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

},{"../fly.credentials-0.5":3,"../fly.dataAggregation":4,"../fly.formparser":6,"../fly.formtable":7,"../fly.tabform":13,"../fly.websign":14,"./applyHistory":22,"./dao":23,"./localstorage":24,"./toolbar":25}],22:[function(require,module,exports){
/**
 * 申请人历史办件信息查询
 * @type {[type]}
 */
var rules = require('../form.rules');
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

},{"../form.rules":16}],23:[function(require,module,exports){
/*
 *  工具栏dao
 *
 **/
var util = fly.utils;

var ajaxPost = function(url, param) {
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

/**
 * jsonp方式的get请求
 * @param   {string} name  路径
 * @param   {Object} data  参数
 * @param   {string} type  数据类型
 * @returns {Object}
 */
util.ajax.getJsonp = function(url, data, type) {
    return $.ajax({
        url: APPCONFIG.formContextPath + url,
        data: data || {},
        dataType: "jsonp",
        jsonp: "callback",
        type: 'GET'
    });
};

var dao = {

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

    getUser: function(data) {
        return ajaxPost('/getUserInfo.do', data);
    },

    // 获取加密后的用户名
    getEncriptUser: function(data) {
        return ajaxPost('/peripheral/userInfo.do', data);
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

    /* 数据服务 */
    service: function(serviceId, param, model) {
        if (typeof yztUser == 'undefined') {
            window.yztUser = {};
        }
        var obj = new fly.utils.ajaxObj(),
            options = $.extend({}, obj.options);
        options.before();
        util.ajax.postJsonp('datacenter/queryGsbRestService.do', {
                formCode: serviceId,
                formServiceCode: serviceId,
                clientInfo: yztUser.encryptionUser || '',
                conditionParams: param,
                model: model
            }, 'text')
            .done(function(data) {
                data = util.toObj(data);
                setTimeout(function() {
                    options.after();
                    obj._done && obj._done(data);
                }, 0);
            })
            .fail(function() {
                options.after();
                obj._fail && obj._fail();
            });
        return obj;

    },

    /* 数据服务 */
    gsbRestService: function(formCode, formServiceCode, param, model) {
        if (typeof yztUser == 'undefined') {
            window.yztUser = {};
        }
        var obj = new fly.utils.ajaxObj(),
            options = $.extend({}, obj.options);
        options.before();
        util.ajax.postJsonp('datacenter/queryGsbRestService.do', {
                formCode: formCode,
                formServiceCode: formServiceCode,
                clientInfo: yztUser.encryptionUser || '',
                conditionParams: param,
                model: model
            }, 'text')
            .done(function(data) {
                data = util.toObj(data);
                setTimeout(function() {
                    options.after();
                    obj._done && obj._done(data);
                }, 0);
            })
            .fail(function() {
                options.after();
                obj._fail && obj._fail();
            });
        return obj;

    },

    /* 数据服务 */
    serviceUpdate: function(formCode, formServiceCode, param, model) {
        if (typeof yztUser == 'undefined') {
            window.yztUser = {};
        }
        var obj = new fly.utils.ajaxObj(),
            options = $.extend({}, obj.options);
        options.before();
        util.ajax.postJsonp('datacenter/queryGsbDatacenterService.do', {
                formCode: formCode,
                formServiceCode: formServiceCode,
                clientInfo: yztUser.encryptionUser || '',
                conditionParams: param,
                model: model
            }, 'text')
            .done(function(data) {
                data = fly.utils.toObj(data);
                options.after();
                if (data.returnFlag && data
                    .returnFlag != 'false') {
                    if (data.data && data.data.FLAG !== false) {
                        obj._done && obj._done(util.toObj(data.data));
                    } else {
                        obj._empty && obj._empty();
                    }
                } else {
                    obj._fail && obj._fail();
                }
            })
            .fail(function() {
                options.after();
                obj._fail && obj._fail();
            });
        return obj;

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
    },

    // 核价
    pricingSubmit: function(param) {
        return ajaxPost('/pricing/submit.do', param);
    },
    //收费
    chargeSubmit: function(param) {
        return ajaxPost('/cost/saveCostInfo.do', param);
    },
    //发证信息录入
    issueSubmit: function(param) {
        return ajaxPost('/issue/submit.do', param);
    },
    //发证中心提交
    issueCenterSubmit: function(param) {
        return ajaxPost('/issue/saveIssueInfo.do', param);
    }
};
module.exports = dao;

},{}],24:[function(require,module,exports){
/**
 * 公共信息存储js
 */
var dao = require('./dao');
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
});
//获取加密后用户名
dao.getEncriptUser().done(function(res) {
    if (res.flag == 'true') {
        $.extend(yztUser, {
            encryptionUser: res.data
        });
    }
});

},{"./dao":23}],25:[function(require,module,exports){
/**
 * 办事项页面工具栏
 */
var dao = require('./dao');
var message = require('../message');
var bizUtil = require('../util');
var assemble = require('../fly.dataAggregation');
var commonRule = require('../form.rules');
var download = require('../jquery.download');

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
    issuepass: '确认发证吗？'
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
    refaudit: '正在预审不通过',
    auditpass: '正在预审受理',
    pricingpass: '正在核价通过',
    chargepass: '正在收费',
    enterpass: '正在录入',
    issuepass: '正在发证'
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
            'pricingSubmit': 'pricingSubmit',
            'chargeSubmit': 'chargeSubmit',
            'evaluateBtn': 'evaluateBtn',
            'issueSubmit': 'issueSubmit',
            'issueCenterSubmit': 'issueCenterSubmit'
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
                if (workflow.linkCode == 'yzt_sl') {
                    panelId = 'acceptPanel';
                } else if (workflow.linkCode.indexOf('yzt_sh') > -1) {
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
            htm.push('<div class="print-link ell text-left link-normal-form" data-code="' + obj.code + '-' + obj.formVersion + '" title="' + obj.desc + '">' + obj.desc + '</div>');
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
                    htm2.push('<div class="print-link ell text-left link-reciept" data-id="' + obj.id + '" title="' + obj.hzdmc + '">' + obj.hzdmc + '</div>');
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
        if (linkCode === 'yzt_ys') {
            data = assemble.getPreauditAssemblyData({
                operateFlag: 1
            });
        } else if (linkCode === 'yzt_sh') {
            //审核中心核价
            var data = assemble.getApproveAssemblyData({
                operateFlag: '1'
            });
        } else if (linkCode === 'yzt_sl') {
            //受理中心核价
            var data = assemble.getAcceptAssemblyData({
                operateFlag: '1'
            });
        }
        if (!data) return;
        data.workItemId = workflow.workItemId;
        data.currentActivityId = workflow.linkCode;
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
        data.currentActivityId = workflow.linkCode;
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
        if (linkCode === 'yzt_ys') {
            var data = assemble.getPreauditAssemblyData({
                operateFlag: 1
            });
        } else if (linkCode === 'yzt_sh') {
            //审核中心发证录入
            var data = assemble.getApproveAssemblyData({
                operateFlag: '1'
            });
        } else if (linkCode === 'yzt_sl') {
            //受理中心发证录入
            var data = assemble.getAcceptAssemblyData({
                operateFlag: '1'
            });
        }
        if (!data) return;
        data.currentActivityId = workflow.linkCode;
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
        data.currentActivityId = workflow.linkCode;
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
                                if (winOpener && (winOpener.location.href.indexOf('agencyitems.do') > -1 || winOpener.location.href.indexOf('myregister.do') > -1 || winOpener.location.href.indexOf('claimitems.do') > -1 || winOpener.location.href.indexOf('undoList.do') > -1 || winOpener.location.href.indexOf('todoList.do') > -1)) {
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
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function(result) {
                $('body').mask('remove');
                if (result.flag == 'true') {
                    if (result.result == "SUCCESS") {
                        $.tip({
                            type: 'success',
                            text: '推送评价消息成功'
                        });
                    } else {
                        $.tip({
                            type: 'warning',
                            text: '推送评价消息失败'
                        });
                    }
                } else {
                    if (result.result == "NO_USER_LOGIN") {
                        $.tip({
                            type: 'warning',
                            text: '您尚未登录评价器'
                        });
                    } else {
                        $.tip({
                            type: 'warning',
                            text: '推送评价消息失败'
                        });
                    }

                }
            },
            error: function() {
                $('body').mask('remove');
                $.tip({
                    type: 'warning',
                    text: '推送评价消息失败'
                });
            }
        });
    }

});

},{"../fly.dataAggregation":4,"../form.rules":16,"../jquery.download":17,"../message":18,"../util":20,"./dao":23}]},{},[21]);
