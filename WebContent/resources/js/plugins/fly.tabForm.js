/* 表单的插件 */

(function(factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define([
            "jquery",
            "fly"
        ], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function($) {
        
    var flyTab = $.widget("fly.tab", {

        options: {
            name: 'tab',
            isEdit: false,    // 是否可编辑
            orderAble: false,    // 是否允许可编辑的tab排序
            max: 3,    // 控制最多选项卡的个数
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
            afterDelTab: function(){

            },
            onSelect:function(){}   //选中之后
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
                // 不可编辑tab截断 by ruwang3
                oneself.options.data[i].textTitle = oneself.options.data[i].text;
                if(oneself.options.data[i].text.length > 5){
                    oneself.options.data[i].text = oneself.options.data[i].text.slice(0, 5) + '...';
                }

                if (oneself.options.data[i].selected) {
                    _li += '<li class="tab-ul-li tab-select" name=\"' + oneself.options.data[i].name + '\"><a title="' + oneself.options.data[i].textTitle + '" href="javascript:;" onfocus="this.blur();">' + oneself.options.data[i].text + '</a></li>';
                } else {
                    _li += '<li class="tab-ul-li" name=\"' + oneself.options.data[i].name + '\"><a title="' + oneself.options.data[i].textTitle + '" href="javascript:;" onfocus="this.blur();">' + oneself.options.data[i].text + '</a></li>';
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

            _tab = '<div class="fly-tab fly-tab-edit">'
                 +     '<ul class="tab-ul clearfix">' 
                 +          '<li class="tab-ul-add" name="addTab"><a href="javascript:;" onfocus="this.blur();">添加</a><i></i></li>'
                 +     '</ul>'
                 + '</div>'
                 + '<div class="tab-content-wrapper"></div>';
            $(oneself.element).prepend(_tab);
        },

        // 渲染可排序的tab
        _renderOrderTab: function() {
            var oneself = this,
                _tab = "";

            _tab = '<div class="fly-tab fly-tab-edit">'
                 +     '<ul class="tab-ul clearfix">' 
                 +          '<li class="tab-ul-add" name="addTab"><a href="javascript:;" onfocus="this.blur();">添加</a><i></i></li>'
                 +          '<li class="tab-ul-forward" name="forwardTab"><i></i><a href="javascript:;" onfocus="this.blur();">左移</a></li>'
                 +          '<li class="tab-ul-back" name="backTab"><a href="javascript:;" onfocus="this.blur();">右移</a><i></i></li>'
                 +     '</ul>'
                 + '</div>'
                 + '<div class="tab-content-wrapper"></div>';

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
                name = obj? obj.name : oneself._defaultConfig.name + oneself._defaultConfig.num,
                text = obj? obj.text : "未知的表单";

            //初始化tab截断 by ruwang3
            textTitle = text;
            if(text.length > 5){
                text = text.slice(0, 5) + '...';
            }

            _tmpl = '<li class="tab-ul-li" name="' + name
            + '"><a class="tab-edit-switch" title="' +textTitle + '" href="javascript:;" onfocus="this.blur();">'+text+'</a><i class="tab-del"></i></li>';
            $(oneself.element).children(".fly-tab").children(".tab-ul").children("[name='addTab']").before(_tmpl);
        },

        // 初始化Tab的内容
        _initNewContent: function(obj) {
            var oneself = this,
                _tmpl,
                _name = obj? obj.name : oneself._defaultConfig.name + oneself._defaultConfig.num;

            _tmpl = '<div class="fly-tab-item" data-tab-content="' + _name + '"></div>';
            $(oneself.element).children('.tab-content-wrapper').append(_tmpl);
            //$(oneself.element).children("[data-tab-content]").eq(oneself._defaultConfig.num-1).siblings("[data-tab-content]").hide();
            oneself.switchTab(_name);
        },

        // 渲染新Tab
        _renderNewTab: function(obj) {

            var oneself = this;
            oneself._defaultConfig.num ++;
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
                $tabUl=$(oneself.element).children(".fly-tab").children(".tab-ul"),
                $tabCtn=$(oneself.element).children(".tab-content-wrapper");

            if (typeof param === "number") {
                var $theTab=$tabCtn.children().eq(param);
                if($theTab.css('display') != 'none') {
                    $tabUl.children().eq(param).addClass("tab-select").siblings(".tab-ul-li").removeClass("tab-select");
                    //先显示控件再显示tab，避免闪动
                    $theTab.show();
                    $theTab.siblings('[data-tab-content]').hide();
                }
            } else {
                var $theTab=$tabCtn.children('[data-tab-content="' + param + '"]');
                if($tabUl.children("[name='" + param + "']").css('display') != 'none') {
                    $tabUl.children("[name='" + param + "']").addClass("tab-select").siblings(".tab-ul-li").removeClass("tab-select");
                    $theTab.find('input,textarea').show();
                    $theTab.show();
                    $theTab.siblings('[data-tab-content]').hide();
                }
            }

            //添加对tab第一次加载事件回调
             var  tablSelect = $(oneself.element).children(".fly-tab").children(".tab-ul").children(".tab-select");
                if(!tablSelect.data("_init") ){                
                      tablSelect.trigger("onCreateEvent");          
                        //onCreate方法只会调用一次
                    tablSelect.data("_init" , true);
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
            name = obj? obj.name : oneself._defaultConfig.name + oneself._defaultConfig.num;
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
        } ,

        /**
         * 添加可编辑tab
         * @author wqli
         */
        addEditTab: function(obj, cb){
            var oneself = this;

            oneself._addTab(obj);

            cb && cb($(oneself.element).children(".tab-content-wrapper").children('[data-tab-content="' + obj.code + '"]'));
        },

        addTabForm: function(obj, cb, isEdit) {
            var oneself = this,
                _tmpl = '',
                _li = '',
                name = oneself._defaultConfig.name + oneself._defaultConfig.num;

            //可编辑tab截断 by ruwang3
            obj.textTitle = obj.text;
            if(obj.text.length > 5){
                obj.text = obj.text.slice(0, 5) + '...';
            }
            if (obj.hasOwnProperty("name")) {
                _tmpl = '<div class="fly-tab-item" data-tab-content="' + obj.name + '"></div>';
                _li = '<li class="tab-ul-li" name=\"' + obj.name + '\"><a title="' + obj.textTitle + '" href="javascript:;" onfocus="this.blur();">' + obj.text + '</a></li>';
            } else {
                _tmpl = '<div class="fly-tab-item" data-tab-content="' + name + '"></div>';
                _li = '<li class="tab-ul-li" name=\"' + name + '\"><a title="' + obj.textTitle + '"  href="javascript:;" onfocus="this.blur();">' + obj.text + '</a></li>';
            }

            if(isEdit){
                $(oneself.element).children(".fly-tab").children(".tab-ul").children("[name='addTab']").before(_li);
            }else{
                $(oneself.element).children(".fly-tab").children(".tab-ul").append(_li);
            }

            $(oneself.element).children(".tab-content-wrapper").append(_tmpl);
            oneself._addEvent();
            oneself._defaultConfig.num ++;
            cb && cb($(oneself.element).children(".tab-content-wrapper").children('[data-tab-content="' + name + '"]'));
        },

        // 修改了选项卡的名称
        rename: function(name, rename) {
            var oneself = this,
                renameTitle = rename;

            // 可编辑tab截断 by ruwang3
            if(rename.length > 5){
                rename = rename.slice(0, 5) + '...';
            }

            $(oneself.element).children(".fly-tab").children(".tab-ul").children("[name='" + name + "']").children("a").html(rename).attr('title', renameTitle);
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
        }
    });
    
    fly.ready(function(context) {
        $('[data-fly-tab]', context).each(function(i,obj) {
            var opts = $(this).data('tabOptions');
            if (opts == 'this.text') opts = $(this).text();
            $(this).tab(fly.utils.parseOptions(opts));
        });
    });
    
    return flyTab;
}));