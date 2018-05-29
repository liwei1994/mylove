/* 业务工具 */

(function(factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define([
            'jquery',
            'fly'
        ], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function($, fly) {

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
            var instId='',
                url = CONTEXTPATH + '/bizcommon/flow-query.do?projNo=' + id+ '&processInstID=' + instId;
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
            if($input.val() != ''){
                $tip.hide();
            }
            $(document).on('focus', input, function() {
                if($tip.css('display') != 'none'){
                    $tip.hide();
                    $input.val('');
                }  
            });
            $(document).on('blur', input, function() {
                if($.trim($input.val()) == ''){
                    $tip.show();
                }else if ($.trim($input.val()) != '') {
                    $tip.hide();
                }
            });
            $(document).on('click', '.'+focusClass,function(){
                $input.trigger('focus');
                $input.trigger('click');
            });
        },

        /**
         * 数组选中元素上移下移
         * @param  {[arrary]} arrary     [源数组对象]
         * @param  {[number]} index    [目标元素序号]
         * @param  {[number]} flag [移动位置标识：1-上移  0-下移]
         */
        upAndDownDataReplace: function(arrary, index, flag) {
            var newArray = arrary,
                arrLen = newArray.length,
                itemObj, siblingsIndex;

            if(arrLen === 1) {
                fly.tip({
                    text: '当前唯一一条信息无法移动',
                    type: 'warning'
                });
                return false;
            }else if(arrLen === (index+1) && flag === 0){
                fly.tip({
                    text: '最后一条信息无法下移',
                    type: 'warning'
                });
                return false;
            }else if(index === 0 && flag === 1) {
                fly.tip({
                    text: '第一条信息无法上移',
                    type: 'warning'
                });
                return false;
            }else {
                if(flag === 1) {
                    siblingsIndex = index - 1;
                }else {
                    siblingsIndex = index + 1;
                }
            }

            // 交换位置
            itemObj = newArray[index];
            newArray[index] = newArray[siblingsIndex];
            newArray[siblingsIndex] = itemObj;

            return newArray;
        }  
    };

    window.bizUtil = bizUtil;

    return bizUtil;
}));
