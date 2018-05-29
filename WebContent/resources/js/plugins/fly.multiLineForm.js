/* 多行表单 */

(function(factory) {

    if (typeof define === "function" && define.amd) {
        define([
            "jquery",
            "fly"
        ], factory);
    } else {
        factory(jQuery);
    }
}(function($, fly) {

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
                    } else{
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
                var isSuggestbox = item.type == 'suggestbox' ? {
                    valueTxt: (data ? data[item.name + 'Txt'] : '')
                } : {};
                var isDaterange = item.type == 'daterange' ? {
                    startValue: (data ? data[item.startName] : ''),
                    endValue: (data ? data[item.endName] : '')
                } : {};
                _rowTr += '<td><div class="control" data-fly-options="' + fly.json.toJSON(
                    $.extend({}, item, {
                        value: data ? data[item.name] : ''
                    }, isSuggestbox, isDaterange)).replace(/\"/g, '\'') + '"></div></td>';
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

            self._$body.find('tr:last').find('div.control').each(function() {
                var options = $(this).data('flyOptions');
                options = fly.utils.parseOptions(options);
                options.valid = self.options.valid[options.name];
                var $this = $(this);

                switch (options.type) {
                    case 'radio':
                        options.initValue = options.value;
                        var t = setInterval(function() {
                            options.data = self.options.dict[options.dict];
                            if (options.data && options.data.length > 0) {
                                $this.radio(options);
                                clearInterval(t);
                            }
                        }, 20);
                        break;
                    case 'checkbox':
                        break;
                    case 'textarea':
                        $this.textarea(options);
                        $this.css('margin','2px 0');
                        break;
                    case 'idcard':
                        $(this).idcard(options);
                        if(IDCARdINPUT && IDCARdINPUT == 'close' && $(this).hasClass('fly-textbox-idcard')) {
                            $(this).find('input').attr('readonly', 'readonly');
                        }
                        break;
                    case 'combobox':
                        options.initValue = options.value;
                        var t = setInterval(function() {
                            options.data = self.options.dict[options.dict] || options.data;
                            if (options.data && options.data.length > 0) {
                                $this.combobox(options);
                                clearInterval(t);
                            }
                        }, 20);
                        break;
                    case 'suggestbox':
                        // TODO  意见框需要调整
                        $this.suggestbox(options);
                        $this.find('input[name="' + options.name + '"]').val(options.value);
                        $this.find('input[name="' + options.name + 'Txt"]').val(options.valueTxt);
                        break;
                    case 'datepicker':
                        $(this).datepicker(options);
                        break;
                    case 'daterange':
                        $(this).daterange(options);
                        break;
                    case 'button':
                        // 渲染按钮方法
                        self._renderButton($(this), options);
                        break;
                    case 'order':
                        if(self.options.hasCopy) {
                            // 内部添加属性，不需要外部添加
                            $.extend(options, {
                                name: ['copy', 'upMove', 'downMove'],
                                text: ['复制', '上移', '下移']
                            });
                        }else {
                            // 内部添加属性，不需要外部添加
                            $.extend(options, {
                                name: ['upMove', 'downMove'],
                                text: ['上移', '下移']
                            });
                        }

                        // 渲染排序方法
                        self._renderOrder($(this), options);
                        break;
                    case 'configuration':
                        $.extend(options, {
                            name: ['configuration'],
                            text: ['配置']
                        });
                        // 渲染配置方法
                        self._renderConfiguration($(this), options);
                        break;
                    case 'textarea':
                        $this.textarea(options);
                        break;    
                    default:
                        $(this).textbox(options);
                }
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

            var _$tr = self.$operation.closest('tr').length === 0 ? self._$body.find('tr:last') : self.$operation.closest('tr'),
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
                sfzhmArr = [];
            if (self.options.required && !$trs.length) {
                fly.tip({
                    type: 'error',
                    text: self.options.title + '至少要有一行！'
                });
            }
            for (var i = 0, l = $trs.length; i < l; i++) {
                var _jtxx = $trs.eq(i).data('flyForm').getData(params);
                if (!_jtxx) return false;

                //处理radio字段的数据
                $.each(self.options.radios, function(j, obj) {
                    _jtxx[obj] = _jtxx[[obj, i].join('-')];
                    _jtxx[[obj, 'Txt'].join('')] = _jtxx[[obj, i].join('-') + 'Txt'];
                });

                trData.push(_jtxx);
            }

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
            $.merge(self.options.data,data);
            for (var i = 0, len = data.length; i < len; i++) {
                var _item = data[i],
                    _$tr = $('<tr data-fly-form>').append(self._renderRow(_item)).data(_item).form();
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

    fly.ready(function(context) {
        $('[data-fly-handleForm]', context).each(function() {
            var opts = $(this).data('flyOptions');
            if (opts == 'this.text') opts = $(this).text();
            $(this).handleForm(fly.utils.parseOptions(opts));
        });
    });

    return flyHandleForm

}));
