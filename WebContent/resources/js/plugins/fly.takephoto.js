var content,
    fileRootPath,
    scanCtrl,
    eThumbnails,
    imgNum,
    isHeadphoto,
    isApproval;
var curResW, curResH;
var browser = navigator.appName;
var b_version = navigator.appVersion;
var version = b_version.split(";");
var trim_Version = version[1].replace(/[ ]/g, "");
var isUserFilter = browser == "Microsoft Internet Explorer" && (trim_Version == "MSIE8.0" || trim_Version == "MSIE9.0");

var dao = {
    upload: function(name, base64) {
        var obj = new fly.utils.ajaxObj(),
            options = $.extend({}, obj.options);

        options.before();

        fly.utils.ajax.post('/material/uploadFile2.do', {
                fileType: 1,
                imageName: name,
                image: base64
            }, 'text')
            .done(function(data) {
                data = fly.utils.toObj(data);
                options.after();
                obj._done && obj._done(data);
            })
            .fail(function() {
                options.after();
                obj._fail && obj._fail();
            });

        return obj;
    }
};

var uploadFiles = 0,
    sum = 0,
    error = 0,
    success = 0,
    images = [],
    base64Images = {},
    currentDevValue;

$(function() {

    content = $('body');
    fileRootPath = 'C:\\WINDOWS\\Temp\\';
    scanCtrl = document.getElementById('ScanCtrl');
    eThumbnails = document.getElementById('EThumbnails');
    imgNum = fly.utils.getQueryString('imgNum');
    isHeadphoto = fly.utils.getQueryString('isHeadphoto') == 'true' ? true : false;
    isApproval = fly.utils.getQueryString('isApproval') == 'true' ? true : false;

    window.scanCtrl = scanCtrl;
    window.eThumbnails = eThumbnails;

    try {
        //先停止预览
        scanCtrl.StopPreviewEx();
        //设置默认摄像头
        setDefaultCapture();
        /* 预览 */
        var preInterval = setInterval(function() {
            if (scanCtrl.StartPreviewEx()) {
                clearInterval(preInterval);
            }
        }, 100);

        /* 初始化设备属性 */
        setDev();

        /* 设备 */
        var selDevData = [];
        for (var i = 0, count = scanCtrl.GetDeviceCount(); i < count; i++) {
            var s = ScanCtrl.GetDevName(i);
            selDevData.push({
                text: s,
                value: i
            });
        }

        /* 设备属性 */
        $('#dev-property').click(function() {
            scanCtrl.Property();
        });

        /* 拍照 */
        content.find('.take').click(function() {
            var date = new Date(),
                picName = fly.dateformat.format(date, 'yyyyMMddhhmmssS'),
                path = fileRootPath + picName + ".jpg",
                base64 = '';

            scanCtrl.EnableDateRecord(0);
            base64 = scanCtrl.ScanBase64(path);

            //如果没有取到照片
            if (!base64) return false;

            //添加到map中
            base64Images[picName] = base64;

            //IE9下使用滤镜预览，IE9以上使用base64串预览
            if (isUserFilter) {
                var picpreview = document.createElement('div');
                picpreview.className = 'base64-show';
                document.getElementById('photoShowArea').appendChild(picpreview);
                picpreview.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled="true",sizingMethod="scale",src="' + path + '")'; //使用滤镜效果 
                $(picpreview).data('imgname', picName);
                $(picpreview).data('filepath', path);
                $(picpreview).data('reswidth', curResW);
                $(picpreview).data('resheight', curResH);
            } else {
                $('<img id="pic' + picName + '" class="base64-show" data-filepath="' + path + '" data-reswidth="' + curResW + '" data-resheight="' + curResH + '"  data-imgname="' + picName + '" src="data:image/jpg;base64,' + base64 + '">').appendTo("#photoShowArea");
            }
        });

        // 监听img单击事件
        content.on('click', '.base64-show', function() {
            var $this = $(this);

            if ($this.hasClass('base64-selected')) {
                $this.removeClass('base64-selected');
            } else {
                $this.addClass('base64-selected');
            }

            return false;
        });

        content.on('dblclick', '.base64-show', function() {
            var $this = $(this);
            if (isUserFilter) {
                var url = CONTEXTPATH + '/fileUpload/viewOriginImg.do?filepath=' + $this.data('filepath') + '&reswidth=' + $this.data('reswidth') + '&resheight=' + $this.data('resheight');
            } else {
                var url = CONTEXTPATH + '/fileUpload/viewOriginImg.do?imgId=' + $this.attr('id') + '&reswidth=' + $this.data('reswidth') + '&resheight=' + $this.data('resheight');
            }

            openFullWindow(url);

            return false;
        });

        /* 镜头切换 */
        content.find('.switch').click(function() {
            var n = selDevData.length;
            if (currentDevValue >= 0 && currentDevValue + 1 < n) {
                currentDevValue = currentDevValue + 1;

            } else {
                currentDevValue = 0;
            }
            scanCtrl.SetCurDev(currentDevValue);
            setTimeout(function() {
                setDev();
            }, 0);
        });

        /* 放大 */
        content.find('.zoomout').click(function() {
            scanCtrl.SetZoomIn();
        });

        /* 缩小 */
        content.find('.zoomin').click(function() {
            scanCtrl.SetZoomOut();
        });

        /* 开始预览 */
        content.find('#start-preview').click(function() {
            scanCtrl.StartPreviewEx();
        });

        /* 结束预览 */
        content.find('#stop-preview').click(function() {
            scanCtrl.StopPreviewEx();
        });

        /* 转为base64后上传 */
        content.find('.save').click(function() {
            //去底色设置为false
            ScanCtrl.DelBackColor(false);
            startUpload();
        });

        /* 取消按钮 */
        content.find('.cancel').click(function() {
            $.dialog.close();
        });

    } catch (e) {
        $.dialog.through({
            title: '提示',
            content: '启动高拍仪出错！',
            ok: true
        });

        /* 取消按钮 */
        content.find('.cancel').click(function() {
            $.dialog.close();
        });
    }

    window.onunload=function(){
        scanCtrl.StopPreviewEx();
    }

});

$('#advanced').click(function() {
    if ($(this).hasClass('close')) {
        $('#advanced-setting').show();
        $(this).removeClass('close');
    } else {
        $('#advanced-setting').hide();
        $(this).addClass('close');
    }
});

$('#delbkcolor').click(function() {
    ScanCtrl.DelBackColor($("#delbkcolor").is(':checked'));
    //fun();
});
$('#rotatecrop').click(function() {
    ScanCtrl.SetRotateCrop($("#rotatecrop").is(':checked'));
    //fun();
});

//设置默认摄像头
function setDefaultCapture() {
    var pidvid = scanCtrl.GetCurDevPIDVID(),
        assistId = pidvid.split('_')[0]; //辅摄像头pid
    var initDev = scanCtrl.GetCurDevIndex();
    currentDevValue = isHeadphoto ? INITHEADDEV : INITCREDDEV;//currentDevValue = initDev; 通过配置项获取默认启用的摄像头
    if ($.inArray(assistId, CAPTUREDEVICE.split(',')) > -1) { //厂商提供的辅助摄像头的硬件编号
        //currentDevValue = initDev == 1 ? 0 : 1;
        scanCtrl.SetCurDev(currentDevValue);
    }
}

/* 初始化设备属性 */
function setDev() {

    /* 分辨率 */
    var selResData = [],
        initRes = scanCtrl.GetCurResolutionIndex();
    for (var i = 0, count = scanCtrl.GetResolutionCount(); i < count; i++) {
        var w = ScanCtrl.GetResolutionWidth(i);
        var h = ScanCtrl.GetResolutionHeight(i);
        var str = w.toString() + "x" + h.toString();
        selResData.push({
            text: str,
            value: i
        });
        if (i == initRes) {
            curResW = w;
            curResH = h;
        }
    }

    $('#selRes').combobox({
        name: 'selRes',
        data: selResData,
        initValue: initRes < 0 ? 0 : initRes,
        onSelect: function(data) {
            scanCtrl.SetResolution(data.value);
            var text = data.text.split('x');
            curResW = text[0];
            curResH = text[1];
        }
    });


    /* 扫描尺寸 */
    var selScanSizeData = [],
        initScanSize = scanCtrl.GetCurScanSizeIndex();
    for (var i = 0, count = scanCtrl.GetScanSizeCount(); i < count; i++) {
        var s = ScanCtrl.GetScanSizeName(i);
        selScanSizeData.push({
            text: s,
            value: i
        });
    }
    selScanSizeData.push({
        text: '自定义',
        value: selScanSizeData.length
    });

    $('#selScanSize').combobox({
        name: 'selScanSize',
        data: selScanSizeData,
        initValue: initScanSize < 0 ? 0 : initScanSize,
        onSelect: function(data) {
            scanCtrl.SetScanSize(data.value);
        }
    });


    /* 旋转角度 */
    var selRotateData = [],
        initRotate = scanCtrl.GetCurRotateAngle();
    if (initRotate != -1 || true) {
        selRotateData.push({
            text: '0',
            value: '0'
        });
        selRotateData.push({
            text: '90',
            value: '1'
        });
        selRotateData.push({
            text: '180',
            value: '2'
        });
        selRotateData.push({
            text: '270',
            value: '3'
        });
    }

    $('#selRotate').combobox({
        name: 'selRotate',
        data: selRotateData,
        initValue: initRotate < 0 ? 0 : initRotate,
        onSelect: function(data) {
            scanCtrl.SetVideoRotate(data.value);
        }
    });


    /* 颜色设置 */
    var selColorData = [],
        initColor = scanCtrl.GetCurColor();
    if (scanCtrl.GetCurColor() != -1 || true) {
        selColorData.push({
            text: '彩色',
            value: '0'
        });
        selColorData.push({
            text: '灰度',
            value: '1'
        });
        selColorData.push({
            text: '黑白',
            value: '2'
        });
    }

    $('#selColor').combobox({
        name: 'selColor',
        data: selColorData,
        initValue: initColor < 0 ? 0 : initColor,
        onSelect: function(data) {
            scanCtrl.SetVideoColor(data.value);
        }
    });
}

/* 上传 */
function startUpload() {
    var files = [];
    images = [];
    approvalScanData = []; // 审核意见框高拍仪数据
    uploadFiles = 0;

    var $imgs = $('.base64-show'),
        len = $imgs.length;
    for (var i = 0; i < len; i++) {
        var $this = $imgs.eq(i);
        if ($imgs.eq(i).hasClass('base64-selected')) {
            files.push(base64Images[$this.data('imgname')]);
            var scanObj = {
                image: base64Images[$this.data('imgname')],
                imageName: $this.data('imgname') + '.jpg'
            };
            approvalScanData.push(scanObj);

            uploadFiles++;
        }
    }
    //测试数据
    /* files.push('iVBORw0KGgoAAAANSUhEUgAAAyQAAAKGCAIAAAA0y8gCAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAgAElEQVR4nOzdeYxl130n9t/Zz93eVnuv3BdxEUmZFiXakmV5RM/IyRixkUyC0cSBBSIZJA6CGBnEcMDR5I8kgBMgQYJgCHvgQTDJWN5HHipkLGsZaWhtFC2Ji7h0k73W/l69d5ezn/zRVLvd3dyaXV3dzfNBo3m3d+/h66p63/qdc89Fjz32GCRJkiRJkiS7A+91A5IkSZIkSa5nKWwlSZIkSZLsohS2kiRJkiRJdlEKW0mSJEmSJLsoha0kSZIkSZJdRC/5lTHGEIL3PoQQY7yMbUqSJEmSJLmGIIQwxoQQjDFC6Ly9lx62QggTufSt/kMbfOG9tTBJkiRJkuQatmA2PjT9djk5KoQghJy399K7Eb33KWklSZIkSZJs8IVv939Sa+29v3DvpYetEEJKWkmSJEmSJACwxeaVUiGEC3ddethK47SSJEmSJEnO8t5fNB2luxGTJEmSJEl2UQpbSZIkSZIkuyiFrSRJkiRJkl2UwlaSJEmSJMkuojs7O5f2yq7rLm9TkiRJkiRJrl11XVNKjTHnbaf9fv/Szsg5f8+tSpIkSZIkuU6UZdnv97MsO2976kZMkiRJkiTZRSlsJUmSJEmS7KIUtpIkSZIkSXbRHoetI48efue7Lnrw2Y1vcaokSZIkSZK9Qq/w9d42Qt30+Otv9sI323X2hW97TJIkSZIkyRV2pcPWJYShC2tXZ0/yZukqpa4kSZIkSa4SVzpsnXHRLr9zI9TZhTMbz01OF62NXXhYkiRJkiTJhR5/ZPFU7f7xN7Yv3LW/pP/Xp5c+86/XTtbuMl5xb8IWXBCMzo1QZ3a9bXUqDdJKkiRJkuTdevTJ9T/8xeV//PDovLy1v6S//3eXn3qtvbxJC/YwbL3HqHQmip05yXmjtVIfYpIkSZIkb+GX/mT1vLx1NmldtOL1Hu1N2HqHYehsbLowmaU4lSRJkiTJJTs3b+1q0oKr4W7E85ytV8E5ieqtx2zBOcWtVNZKkiRJkuSdOJO3/pdPzD+0T+5e0oI9qWy9RRg62y0I776fMSWtJEmSJEnelV/7882n/v19L26b3UtacPWM2XrvISlVtpIkSZIkeefO9B7+/o/qexb4hePlL6M9C1twsbke3sw7OeDs7A8pbyVJkiRJ8tbOG6d10fsTL5e9DFvnRahzV9+i7vUW82ydPTjlrSRJkiRJ3syFI+LPjN/6w19c/qU/Wb3k0zZNwzl37vyZI9Bjjz12aWfsuu73b/6Hl9ygJEmSJEmSK+8t7j38w19cBoBLzls/+63/fm5uLsuy87bv8YOokyRJkiRJrqT/7efm3+zewzMx61furi7vFfeyGzFJkiRJkuQKe+v');
     uploadFiles=1;*/

    if (files.length == 0) {
        alert("请选择要上传的照片！");
        return false;
    } else if (imgNum != '' && files.length > imgNum) {
        alert('最多只能选择' + imgNum + '照片！');
        return false;
    }

    if (isApproval) { // 审批意见中使用高拍仪拍照
        uoloadOk(approvalScanData);
    } else { // 正常使用高拍仪拍照
        sum = files.length, error = 0, success = 0;
        self.uploadFiles = files.length;
        $('body').mask({
            content: '正在上传照片'
        });

        //TODO 这一块还需要闭包来控制顺序
        for (var i = 0, l = files.length; i < l; i++) {
            dao.upload('', files[i]).done(function(res) {
                uploadFiles--;
                success++;

                if (isHeadphoto) {
                    $.dialog.data('headphoto', {
                        id: res.data[0].id,
                        fileName: res.data[0].fileName,
                        wjwz: res.data[0].savePath,
                        wjlj: res.data[0].downloadUrl
                    });
                } else {
                    images.push({
                        id: res.data[0].id,
                        fileName: res.data[0].fileName,
                        wjwz: res.data[0].savePath,
                        wjlj: res.data[0].downloadUrl,
                        createTime: $.FUI.dateformat.formatDate(res.data[0].createTime, "yyyy-MM-dd hh:mm:ss"),
                        attrSource: '0', //  本地上传标识
                        fileType: 'jpg'
                    });
                }

                uploading();
            }).fail(function() {
                uploadFiles--;
                error++;
                uploading();
            });
        }
    };
}

/* 上传进行中 */
function uploading() {
    if (uploadFiles == 0) {
        uoloadOk();
    }
}

/* 上传完成 */
function uoloadOk(approvalScanData) {
    if (!approvalScanData) {
        $('body').mask('removeAll');
    };

    $.dialog.data('images', images);

    if (approvalScanData) {
        $.dialog.data('approvalScanData', approvalScanData);
    }

    //来源页面
    var win = $.dialog.open.origin;
    win.credInit();
    $.dialog.close();
}

function openFullWindow(url) {

    var redirectUrl = url;
    var width = screen.availWidth - 10;
    var height = screen.availHeight - 50;
    var szFeatures = "top=0,";
    szFeatures += "left=0,";
    szFeatures += "width=" + width + ",";
    szFeatures += "height=" + height + ",";
    szFeatures += "directories=no,";
    szFeatures += "status=yes,toolbar=no,location=yes,";
    szFeatures += "menubar=no,";
    szFeatures += "scrollbars=yes,";
    szFeatures += "resizable=yes"; // channelmode
    window.open(redirectUrl, '_blank', szFeatures);
};
