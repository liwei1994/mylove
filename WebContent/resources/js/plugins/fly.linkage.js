/**
 * 市、县、街道、社区联动选择控件
 * @author wqli & yangzhang7
 * @date 2015.07.14
 */
(function(factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define([
            "jquery",
            "fly",
            'apasinfo/dao'
        ], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function($, fly, dao) {

    var userDao = function(options) {
        var obj = new util.ajaxObj(),
            options = $.extend({}, obj.options, options);

        options.before();

        util.ajax.get('/getUserInfo.do', null, 'text')
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
    
    var mapping = {
        	"province":{"id":"province","value":0},
        	"city":{"id":"citys","value":1},
        	"district":{"id":"counties","value":2},
        	"town":{"id":"towns","value":3},
        	"box":{"id":"boxs","value":4},
        	"0": "province",
        	"1": "city",
        	"2": "district",
        	"3": "town",
        	"4": "box"
    };

    fly.ready(function(context) {
        $('[data-fly-linkage]', context).each(function() {
            var opts = $(this).data('linkageOptions');
            $(this).linkage(fly.utils.parseOptions(opts));
        });
    });

    return $.widget("fly.linkage", {
    	
        options: {
            name: 'linkage',
            isEdit: false, // 是否可编辑
            max: 5, // 控制最多选项卡的个数
            data: [],
            afterRender: function() {
            	var i=0,
            		xzlevel_start = mapping[XZLEVEL].value,
            		xzlevel_end = mapping[XZLEVEL_END].value;
            	
            	if(xzlevel_start > xzlevel_end){
            		alert("yzt.appconfig.root_level要大于yzt.appconfig.root_level_end")
            	} else {
            		for(i=0; i<xzlevel_start; i++){
            			$('#area-tab li').eq(i).hide();
            			$('#'+ mapping[mapping[i]].id).hide();
            		}
            		$('#area-tab li').eq(xzlevel_start).trigger('click');
            		
            		for(i=(xzlevel_end+1); i<=4; i++) {
            			$('#area-tab li').eq(i).hide();
            			$('#'+ mapping[mapping[i]].id).hide();
            		}
            	}
            	
            }
        },

        // 新增tab的默认配置
        _defaultConfig: {
            name: "flyLinkage",
            num: 0
        },

        _create: function() {
            var defaultDom = '<div id="linkage" class="dn">' +
                '<ul class="tab-ul clearfix" id="area-tab">' +
                '<li class="tab-select" data-tab-target="province"><a href="javascript:">' + APPCONFIG.province_text + '</a></li>' +
                '<li data-tab-target="citys"><a href="javascript:">' + APPCONFIG.city_text + '</a></li>' +
                '<li data-tab-target="counties"><a href="javascript:">' + APPCONFIG.district_text + '</a></li>' +
                '<li data-tab-target="towns"><a href="javascript:">' + APPCONFIG.town_text + '</a></li>' +
                '<li data-tab-target="boxs"><a href="javascript:">' + APPCONFIG.box_text + '</a></li>' +
                '</ul>' +
                '<div id="la-wrap">' +
                '<ul class="ovh" id="province">' +

                '</ul>' +
                '<ul class="dn ovh" id="citys"><div class="sel-tip">请先选择省级！</div>' +

                '</ul>' +
                '<ul class="dn ovh" id="counties"><div class="sel-tip">请先选择市区！</div>' +

                '</ul>' +
                '<ul class="dn ovh" id="towns"><div class="sel-tip">请先选择区县！</div>' +

                '</ul>' +
                '<ul class="dn ovh" id="boxs"><div class="sel-tip">请先选择乡镇（街道）！</div>' +

                '</ul>' +
                '</div>' +
                '<div class="sel-area-wrap">当前已选择：<span id="sel-area"></span>' +
                '</div>' +
                '<div class="btn-wrap">' +
                '<button id="con-btn">确定</button>' +
                '</div>' +
                '</div>';

            $('body').append(defaultDom);
            this.loadDate();
        },

        loadDate: function() {
            var self = this;

            dao.getCounties({
                cityCode: ROOTORGCODE
            }).done(function(province) {
                self._renderLinkage._renderProvince(province);
                self._addEvent();
                $('#province').find('li[data-code="' + DEFAULTPROVICE + '"]').click();
            }).fail(function() {});
        },

        _renderLinkage: {
            _renderProvince: function(province) {
                var provinceHtml = "";

                if (province && province.length) {
                    for (var i = 0, len = province.length; i < len; i++) {
                        provinceHtml += '<li data-code="' + province[i].code + '">' + province[i].name + '</li>';
                    }
                    $("#province").html(provinceHtml);
                    
                    $('#location_view').data('flyLinkage').options.afterRender && $('#location_view').data('flyLinkage').options.afterRender();
                }
            },

            _renderCitys: function(cities) {
                var cityHtml = "";

                if (cities && cities.length) {
                    for (var i = 0, len = cities.length; i < len; i++) {
                        cityHtml += '<li data-code="' + cities[i].code + '">' + cities[i].name + '</li>';
                    }
                    $("#citys").html(cityHtml);

                    $('#location_view').data('flyLinkage').options.afterRender && $('#location_view').data('flyLinkage').options.afterRender();

                }
            },

            _renderCounties: function(counties) {
                var countyHtml = "";

                if (counties && counties.length) {
                    for (var i = 0, len = counties.length; i < len; i++) {
                        countyHtml += '<li data-code="' + counties[i].code + '">' + counties[i].name + '</li>';
                    }
                    $("#counties").html(countyHtml);
                    
                    $('#location_view').data('flyLinkage').options.afterRender && $('#location_view').data('flyLinkage').options.afterRender();
                }
            },
            
            _renderTowns: function(towns) {
                var townHtml = "";

                if (towns && towns.length) {
                    for (var i = 0, len = towns.length; i < len; i++) {
                    	townHtml += '<li data-code="' + towns[i].code + '">' + towns[i].name + '</li>';
                    }
                    $("#towns").html(townHtml);

                    $('#location_view').data('flyLinkage').options.afterRender && $('#location_view').data('flyLinkage').options.afterRender();
                }
            },
            
            _renderBoxs: function(boxs) {
                var boxHtml = "";

                if (boxs && boxs.length) {
                    for (var i = 0, len = boxs.length; i < len; i++) {
                    	boxHtml += '<li data-code="' + boxs[i].code + '">' + boxs[i].name + '</li>';
                    }
                    $("#boxs").html(boxHtml);

                    $('#location_view').data('flyLinkage').options.afterRender && $('#location_view').data('flyLinkage').options.afterRender();
                }
            }
        },

        _addEvent: function() {
            var self = this,
                isReloadProvince = false,
                isReloadCitys = false,
                isReloadCounties = false,
                isReloadTowns = false;

            $(self.element).click(function(e) {
                var ishide = $("#linkage").css("display") === "none" ? true : false;

                if (ishide) {
                    $("#linkage").show();
                } else {
                    $("#linkage").hide();
                }

                e.stopPropagation();
            });

            $("#area-tab li").click(function() {
                var target = $(this).data("tab-target");
                $(this).addClass("tab-select").siblings().removeClass("tab-select");
                $("#" + target).show().siblings().hide();
            });
            
            $("#linkage").on("click", "#boxs li", function() {
            	var name = '';

                $(this).addClass("area-select").siblings().removeClass("area-select");

                
                if (XZLEVEL === 'city') {
                    name = self._getSelectedCity() + self._getSelectedArea() + self._getSelectedTown() + self._getSelectedBox();
                } else if (XZLEVEL === 'district') {
                    name = self._getSelectedArea() + self._getSelectedTown() + self._getSelectedBox();
                } else if (XZLEVEL === 'town') {
                    name = self._getSelectedTown() + self._getSelectedBox();
                } else if (XZLEVEL === 'box') {
                    name = self._getSelectedBox();
                } else {
                    name = self._getSelectedProvince() + self._getSelectedCity() + self._getSelectedArea() + self._getSelectedTown() + self._getSelectedBox();
                }

                $("#sel-area").text(name);
                $('#location_view').text(name);
                
            });

            
            $("#linkage").on("click", "#towns li", function() {
            	var townCode = $(this).data("code"),
    				name = '';

                $(this).addClass("area-select").siblings().removeClass("area-select");

                if (XZLEVEL === 'city') {
                    name = self._getSelectedCity() + self._getSelectedArea() + self._getSelectedTown();
                } else if (XZLEVEL === 'district') {
                    name = self._getSelectedArea() + self._getSelectedTown();
                } else if (XZLEVEL === 'town') {
                    name = self._getSelectedTown();
                } else {
                    name = self._getSelectedProvince() + self._getSelectedCity() + self._getSelectedArea() + self._getSelectedTown();
                }

                $("#sel-area").text(name);
                $('#location_view').text(name);
                
                dao.getCounties({
                    "cityCode": townCode
                }).done(function(boxs) {
                    self._renderLinkage._renderBoxs(boxs);
                    
                    var divisionCode = top.userAdministrationDivisionCode || '',
                        $userBox = $('#boxs li[data-code="' + divisionCode + '"]');
                    if ($userBox.length > 0) {
                        var originTxt = $('#location_view').text();
                        if (!isReloadTowns) {
                        	if(mapping[XZLEVEL_END].value >= 4) {
                        		$('#location_view').attr('data-code', $userBox.attr('data-code')).text(originTxt + $userBox.text());
                        		$userBox.click();
                        	}
                        }
                    };
                    window.loadBoxsComplete = true; // 告知县区数据加载完成
                    isReloadTowns = true;

                }).fail(function() {});
                
            });

            $("#linkage").on("click", "#counties li", function() {
            	var countyCode = $(this).data("code"),
        			name = '';

                $(this).addClass("area-select").siblings().removeClass("area-select");

                if (XZLEVEL === 'city') {
                    name = self._getSelectedCity() + self._getSelectedArea();
                } else if (XZLEVEL === 'district') {
                    name = self._getSelectedArea();
                } else {
                    name = self._getSelectedProvince() + self._getSelectedCity() + self._getSelectedArea();
                }

                $("#sel-area").text(name);
                $('#location_view').text(name);
                
                dao.getCounties({
                    "cityCode": countyCode
                }).done(function(towns) {
                    $("#boxs").html("<div class=\"sel-tip\">请先选择乡镇（街道）！</div>");
                	
                    self._renderLinkage._renderTowns(towns);
                    
                    var divisionCode = top.userAdministrationDivisionCode || '',
                        $userTown = $('#towns li[data-code="' + [divisionCode.substring(0, 9), '000'].join('') + '"]');
                    if ($userTown.length > 0) {
                        var originTxt = $('#location_view').text();
                        if (!isReloadCounties) {
                        	if(mapping[XZLEVEL_END].value >= 3) {
                        		$('#location_view').attr('data-code', $userTown.attr('data-code')).text(originTxt + $userTown.text());
                        		$userTown.click();
                        	}
                        }
                    };
                    window.loadTownsComplete = true; // 告知乡镇数据加载完成
                    isReloadCounties = true;

                }).fail(function() {});
            });

            $("#linkage").on("click", "#citys li", function() {
                var cityCode = $(this).data("code"),
                    name = '';

                $(this).addClass("area-select").siblings().removeClass("area-select");

                if (XZLEVEL === 'city') {
                    name = self._getSelectedCity();
                } else if (XZLEVEL === 'province') {
                    name = self._getSelectedProvince() + self._getSelectedCity()
                }

                $("#sel-area").text(name);
                $('#location_view').text(name);

                dao.getCounties({
                    "cityCode": cityCode
                }).done(function(counties) {
                	$("#towns").html("<div class=\"sel-tip\">请先选择区县！</div>");
                	$("#boxs").html("<div class=\"sel-tip\">请先选择乡镇（街道）！</div>");
                	
                    self._renderLinkage._renderCounties(counties);
                    
                    var divisionCode = top.userAdministrationDivisionCode || '',
                        $userCounty = $('#counties li[data-code="' + [divisionCode.substring(0, 6), '000000'].join('') + '"]');
                    if ($userCounty.length > 0) {
                        var originTxt = $('#location_view').text();
                        if (!isReloadCitys) {
                        	if(mapping[XZLEVEL_END].value >= 2) {
                        		$('#location_view').attr('data-code', $userCounty.attr('data-code')).text(originTxt + $userCounty.text());
                        		$userCounty.click();
                        	}
                        }
                    };
                    window.loadCountiesComplete = true; // 告知县区数据加载完成
                    isReloadCitys = true;

                }).fail(function() {});
            });

            $("#linkage").on("click", "#province li", function() {
                var provinceCode = $(this).data("code"),
                    name = '';

                $(this).addClass("area-select").siblings().removeClass("area-select");
                if (XZLEVEL === 'province') {
                    name = self._getSelectedProvince();
                }

                $("#sel-area").text(name);
                $('#location_view').text(name);

                dao.getCounties({
                    "cityCode": provinceCode
                }).done(function(counties) {
                	$("#counties").html("<div class=\"sel-tip\">请先选择市区！</div>");
                	$("#towns").html("<div class=\"sel-tip\">请先选择区县！</div>");
                	$("#boxs").html("<div class=\"sel-tip\">请先选择乡镇（街道）！</div>");
                	
                    self._renderLinkage._renderCitys(counties);

                    var divisionCode = DEFAULTCITY,
                        $userCitys = $('#citys li[data-code="' + divisionCode + '"]');
                    if ($userCitys.length > 0) {
                        var originTxt = $('#location_view').text();
                        if (!isReloadProvince) {
                        	if(mapping[XZLEVEL_END].value >= 1) {
                        		$('#location_view').attr('data-code', $userCitys.attr('data-code')).text(originTxt + $userCitys.text());
                        		$userCitys.click();
                        	}
                        }
                    };
                    window.loadCitysComplete = true; // 告知城市数据加载完成
                    isReloadProvince = true;

                }).fail(function() {});
            });

            $("#con-btn").click(function() {
                var code;
                
                if ($("#counties li.area-select").length) {
                    code = $("#counties li.area-select").data("code");
                } else {
                    code = $("#citys li.area-select").data("code");
                }

                $(self.element).text(self._getSelectedArea()).attr("data-code", code);
                $("#linkage").hide();

                var administrativeCode = $(self.element).attr('data-code'); // 获取当前行政区划编码
                dao.getDepData({
                    xzqh: administrativeCode
                }).done(function(data) {
                    $('#dep_items').empty();
                    $('#dep_items_tmpl').tmpl(data).appendTo('#dep_items');
                }).fail(function() {
                    $.fly.tip({
                        text: '获取部门信息失败！',
                        type: 'error'
                    });
                });

            });

            $("#linkage").click(function(e) {
                e.stopPropagation();
            })

            $(document).click(function() {
                $("#linkage").hide();
            });
        },

        _init: function() {
            // $("#citys li").first().click();
        },

        _getSelectedArea: function() {
            return $("#counties li.area-select").text();
        },

        _getSelectedCity: function() {
            return $("#citys li.area-select").text();
        },

        _getSelectedProvince: function() {
            return $("#province li.area-select").text();
        },
        
        _getSelectedTown: function() {
        	return $("#towns li.area-select").text();
        },
        
        _getSelectedBox: function() {
        	return $("#boxs li.area-select").text();
        }
    });
}));
