var content = $('body'),
    fileRootPath = 'C:\\WINDOWS\\Temp\\',
    EloamGlobal,
    EloamDevice,    // 设备对象
    EloamVideo,     // 视频对象
    //EloamView = document.getElementById('EloamView'),
    //eThumbnails = document.getElementById('EloamThumbnail'),
    imgNum = fly.utils.getQueryString('imgNum'),
    isHeadphoto = fly.utils.getQueryString('isHeadphoto') == 'true' ? true : false,
    isApproval = fly.utils.getQueryString('isApproval') == 'true' ? true : false;

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
    base64Images = {};

/* 把页面上存在的预览控件移过来 */
//$(eThumbnails).insertBefore('#thumbnails');

window.EloamGlobal = EloamGlobal;
//window.scanCtrl = scanCtrl;
//window.eThumbnails = eThumbnails;
window.currentDevValue = 0;

$(function() {
    try {
        // 初始化
        EloamGlobal = document.getElementById("EloamGlobal_ID");
        EloamGlobal.InitDevs();

        
        
        /* 设备 */
        var selDevData = [],
            initDev = 0;
        currentDevValue = initDev < 0 ? 0 : initDev;
        for (var i = 0, count = GetDeviceCount(); i < count; i++) {
            var s = GetDeviceName(i);
            selDevData.push({
                text: s,
                value: i
            });
        }   

        /* 设备属性 */
        $('#dev-property').click(function() {
            EloamDevice.ShowProperty(EloamView);
        });

        /* 拍照 */
        content.find('.take').click(function() {
            var date = new Date(),
                picName = fly.dateformat.format(date, 'yyyyMMddhhmmssSSS'),
                path = fileRootPath + picName + ".jpg",
                base64 = '';

            var image = EloamVideo.CreateImage(0, EloamView.GetView());
            // 转换成Base64
            base64 = image.GetBase64(2, 0);

            //如果没有取到照片
            if (!base64) return false;

            //添加到map中
            base64Images[picName] = base64;
            if (image) {
                EloamView.PlayCaptureEffect();
                image.Save(Name, 0);
                //添加到预览中
                eThumbnails.AddItem(path);
                image.Destroy();
                image = null;
            }
        });

        /* 镜头切换 */
        content.find('.switch').click(function() {
            // 先关闭视图
            CloseVideo();
            // 创建设备
            EloamDevice = EloamGlobal.CreateDevice(1, currentDevValue);
            // 创建视频对象   （分辨率索引， 视图模式）
            EloamVideo = EloamDevice.CreateVideo(0, 1);

            if (EloamVideo)
            {
                EloamView.SelectVideo(EloamVideo);
                EloamView.SetText("打开视频中，请等待...", 0);
            }
        });

        /* 缩小 */
        content.find('.zoomout').click(function() {
            if (EloamView) {
                EloamView.SetZoomOut();
            }
        });

        /* 放大 */
        content.find('.zoomin').click(function() {
            if (EloamView) {
                EloamView.SetZoomIn();
            }
        });

        /* 开始预览 */
        content.find('#start-preview').click(function() {
            CloseVideo();
            if(EloamDevice){
                EloamDevice.Destroy();
                EloamDevice = null;
            }
            EloamGlobal.InitDevs();
        });

        /* 结束预览 */
        content.find('#stop-preview').click(function() {
           if (EloamVideo){
                EloamView.SetText("", 0);
                EloamVideo.Destroy();
                EloamVideo = null;
            }   
        });

        /* 转为base64后上传 */
        content.find('.save').click(function() {
            startUpload();
        });

        /* 取消按钮 */
        content.find('.cancel').click(function() {
            $.dialog.close();
        });
        /* 初始化设备属性 */
        setDev();
    } catch (e) {
        $.dialog.through({
            title: '提示',
            content: '启动高拍仪出错！',
            ok: true
        });

        //取消按钮 
        content.find('.cancel').click(function() {
            $.dialog.close();
        });
    }
    // 展示高级功能
    $('#advanced').click(function() {
        if ($(this).hasClass('close')) {
            $('#advanced-setting').show();
            $(this).removeClass('close');
        } else {
            $('#advanced-setting').hide();
            $(this).addClass('close');
        }
    });
    // 去底色
    $('#delbkcolor').click(function() {
        var flag = $("#delbkcolor").is(':checked') ? 1 : 0;
        if (EloamVideo){
            if (flag === 1)
                EloamVideo.EnableDelBkColor(0);
            else
                EloamVideo.DisableDelBkColor();
        };
    });
    // 纠偏裁边
    $('#rotatecrop').click(function() {
        var flag = $("#rotatecrop").is(':checked') ? true : false;
        if (EloamVideo){
            if (flag === 1)
                EloamVideo.EnableDeskewEx(1);
            else
                EloamVideo.DisableDeskew();
        }
    });
})
        

function OpenDevice(value) {
    var iDeviceIndex = parseInt(value);
    ScanCtrl.StartPreview(iDeviceIndex);
    //ScanCtrl.SetCameraExposure(iDeviceIndex, 10); //设置自动曝光
}

function CloseDeviceEx(index) {
    if (scanCtrl) {
        EloamView.SetText("", 0);
        EloamVideo.Destroy();
        EloamVideo = null;   
    }
}

//获取摄像头个数
function GetDeviceCount() {
    return 2;
}

//根据索引获取设备名称
function GetDeviceName() {
    return '';
}

function GetResolutionCount(index) {
        return scanCtrl.GetResCount(index);
    }
    //根据索引获取分辨率宽  (设备类型，分辨率索引)
function GetResolutionWidthEx(index, i) {
        return scanCtrl.GetResWidth(index, i);
    }
    //根据索引获取分辨率高
function GetResolutionHeightEx(index, i) {
        return scanCtrl.GetResHeight(index, i);
    }
//设置分辨率   (选择的分辨率索引，视频模式索引)
function SetResolution(index, i) {
    CloseVideo();
    // 分辨率和模式
    EloamVideo = EloamDevice.CreateVideo(index, i);
    if (EloamVideo){
        EloamView.SelectVideo(EloamVideo);
        EloamView.SetText("打开视频中，请等待...", 0);
    }
}
    //获取当前扫描尺寸
function GetCurScanSizeIndex() {
    return EloamDevice.GetScanSize();
}
//获取当前设备支持的尺寸数
function GetScanSizeCount() {
    return EloamDevice.GetResolutionCountEx(1);
}
//获取当前尺寸名
function GetScanSizeName() {
    return '';
}
    //设置尺寸
function SetScanSize() {

    }
    //获取当前旋转角度
function GetCurRotateAngle() {
        return 0;
    }
//设置设备旋转角度
function SetDeviceRotate(berfor, after) {
    var dValue = after - berfor;
        num = Math.abs(dValue) / 90,
        FunName = dValue == Math.abs(dValue) ? 'RotateLeft' : 'RotateRight';
    
    for(var i = 0; i < num; i++) {
        EloamVideo[FunName]();
    }
}
    //获取当前颜色
function GetCurColor() {

    }
//设置设备颜色
function SetColorMode(beforColor, value) {
    var mapping = {
        '0': '',
        '1': 'DisableGray',
        '2': 'DisableThreshold',
    };
    // 选择了彩色
    if(value == 0) {
        if(beforColor != 0) {
            EloamVideo[mapping[beforColor]]();
        }
    }else if(value == 1) {    // 灰度化
        if(beforColor == 2) {
            EloamVideo.DisableThreshold();
        }
        EloamVideo.EnableGray();
    }else if(value == 2) {    // 黑白
        if(beforColor == 1) {
            EloamVideo.DisableGray();
        }
        EloamVideo.EnableThreshold(128);
    }
}

function ReduceShadow(flag) {
    return ;//scanCtrl.ReduceShadow(flag);
}

function SetCutPageType(index, flag) {
    return ;
}

function GetCurColor() {
    return 0;
}

/* 初始化设备属性 */
function setDev() {

    $('#delbkcolor,#rotatecrop').removeAttr('checked');

    // 获取分辨率个数
    var selResData = [],
        nResolution = EloamDevice.GetResolutionCountEx(subtype);
    // 根据选择的模式设置分辨率下拉框的值
    for(var i = 0; i < nResolution; i++) {
        var width = EloamDevice.GetResolutionWidthEx(subtype, i);
        var heigth = EloamDevice.GetResolutionHeightEx(subtype, i);
        var str = width.toString() + "x" + heigth.toString();
        selResData.push({
            text: str,
            value: i
        });
    }

    $('#selRes').combobox({
        name: 'selRes',
        data: selResData,
        initValue: initRes < 0 ? 0 : initRes,
        onSelect: function(data) {
            SetResolution(data.value, 1);
        }
    });


    /* 扫描尺寸 */
    /*var selScanSizeData = [],
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
    });*/


    /* 旋转角度 */
    var selRotateData = [],
        initRotate = 0;
    if (initRotate != -1) {
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
            var berforRotate = parseInt($('input[name="selRotateTxt"]').val());
            SetDeviceRotate(berforRotate, parseInt(selRotateData[data.value].text));
        }
    });


    /* 颜色设置 */
    var selColorData = [],
        initColor = 0;
    if (GetCurColor() != -1) {
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
            var berforColor = $('input[name="selRotate"]').val();
            SetColorMode(berforColor, data.value);
        }
    });
}

/* 上传 */
function startUpload() {
    var files = [];
    images = [];
    approvalScanData = []; // 审核意见框高拍仪数据
    //approvalImages = ""; // base64
    uploadFiles = 0;
    // 获取勾选图片的base64缓存起来
    for (var i = 0, l = eThumbnails.GetCount(); i < l; i++) {
        if (eThumbnails.GetCheck(i)) {
            var path = eThumbnails.GetFileName(i);
            var name = path.substring(fileRootPath.length, path.lastIndexOf('.'));
            var fullName = path.substring(fileRootPath.length, path.length);
            files.push(base64Images[name]);

            var scanObj = {
                image: files[i],
                imageName: fullName
            };
            approvalScanData.push(scanObj);

            uploadFiles++;
        }
    }

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
        //删除照片
        for (var i = 0, l = eThumbnails.GetCount(); i < l; i++) {
            eThumbnails.remove(i, true);
        }

        sum = files.length, error = 0, success = 0;
        self.uploadFiles = files.length;
        $('body').mask({
            content: '正在上传照片'
        });

        for (var i = 0, l = files.length; i < l; i++) {
            (function(t) {
                setTimeout(function() {
                    (function(y) {
                        dao.upload('', files[y]).done(function(res) {
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

                    })(t);
                }, t * 1000);
            })(i);
        };
    };

}

/* 上传进行中 */
function uploading() {
    //$('body').mask({content: '正在上传照片，成功' + success + '张，失败' + error + '张，共' + sum + '张'});
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
    //win.credDialog.show();
    win.credInit();

    $.dialog.close();
}

/* 浏览器关闭之后，停止设备预览，释放资源  */
window.onunload = onunload_handler;

function onunload_handler() {
    try {
        CloseDeviceEx();
    } catch (e) {

    }
}
