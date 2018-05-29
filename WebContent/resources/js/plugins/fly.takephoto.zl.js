require.config(requireConfig);

require(['jquery',
        'fly'
    ],
    function($, fly) {

        var content = $('body'),
            fileRootPath = 'C:\\WINDOWS\\Temp\\',
            scanCtrl = document.getElementById('ScanCtrl'),
            eThumbnails = document.getElementById('EThumbnails'),
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

        window.scanCtrl = scanCtrl;
        window.eThumbnails = eThumbnails;
        window.currentDevValue = 0;

        try {

            //不支持变焦和尺寸扫描
            $('#selScanSize').parent().hide();
            content.find('.zoomout,.zoomin').hide();

            //先停止预览
            CloseDeviceEx();
            /* 预览 */
            OpenDevice(0);

            /* 初始化设备属性 */
            setDev();

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

            /* 设备下拉框 */
            /*$('#selDev').combobox({
                name: 'selDev',
                data: selDevData,
                initValue: initDev < 0 ? 0 : initDev,
                onSelect: function(data) {
                    scanCtrl.SetCurDev(data.value);
                    setTimeout(function() {
                        setDev();
                    }, 0);
                }
            });*/

            /* 设备属性 */
            $('#dev-property').click(function() {
                ShowDevicePage(currentDevValue);
            });

            /* 拍照 */
            content.find('.take').click(function() {
                var date = new Date(),
                    picName = fly.dateformat.format(date, 'yyyyMMddhhmmssSSS'),
                    path = fileRootPath + picName + ".jpg",
                    base64 = '';

                //scanCtrl.EnableDateRecord(0);
                base64 = ScanBase64(path);

                //如果没有取到照片
                if (!base64) return false;

                //添加到map中
                base64Images[picName] = base64;

                //添加到预览中
                eThumbnails.AddToDisplay(path);
            });

            /* 镜头切换 */
            content.find('.switch').click(function() {
                var n = selDevData.length;
                if (currentDevValue >= 0 && currentDevValue + 1 < n) {
                    currentDevValue = currentDevValue + 1;

                } else {
                    currentDevValue = 0;
                }
                OpenDevice(currentDevValue);
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
                OpenDevice(currentDevValue);
            });

            /* 结束预览 */
            content.find('#stop-preview').click(function() {
                CloseDeviceEx();
            });

            /* 转为base64后上传 */
            content.find('.save').click(function() {
                //去底色设置为false
                ReduceShadow(1);
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

            //取消按钮 
            content.find('.cancel').click(function() {
                $.dialog.close();
            });
        }

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
            var flag = $("#delbkcolor").is(':checked') ? 1 : 0;
            ReduceShadow(flag);
            //fun();
        });
        $('#rotatecrop').click(function() {
            var flag = $("#rotatecrop").is(':checked') ? 1 : 0;
            SetCutPageType(currentDevValue, flag);
            //fun();
        });

        //拍摄
        function ScanBase64(path) {
            scanCtrl.GrabToFile(path);
            return scanCtrl.GetBase64FromFile(path);
        }

        //删除文件
        function DeleteMyFile(path) {

        }

        function OpenDevice(value) {
            var iDeviceIndex = parseInt(value);
            ScanCtrl.OpenDevice(iDeviceIndex);
            ScanCtrl.SetCameraExposure(iDeviceIndex, 10); //设置自动曝光
        }

        function CloseDeviceEx() {
            scanCtrl.CloseDeviceEx();
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
                return scanCtrl.GetResolutionCount(index);
            }
            //根据索引获取分辨率宽
        function GetResolutionWidth(index, i) {
                return scanCtrl.GetResolutionWidth(index, i);
            }
            //根据索引获取分辨率高
        function GetResolutionHeight(index, i) {
                return scanCtrl.GetResolutionHeight(index, i);
            }
            //设置分辨率
        function SetResolution(index, i) {
                var w = scanCtrl.GetResolutionWidth(index, i),
                    h = scanCtrl.GetResolutionHeight(index, i);
                return scanCtrl.SetResolusionByWH(index, w, h);
            }
            //获取当前扫描尺寸
        function GetCurScanSizeIndex() {
                return 0;
            }
            //获取当前设备支持的尺寸数
        function GetScanSizeCount() {
                return 0;
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
        function SetDeviceRotate(index, rotate) {
                scanCtrl.SetDeviceRotate(index, rotate);
            }
            //获取当前颜色
        function GetCurColor() {

            }
            //设置设备颜色
        function SetColorMode(value) {
            scanCtrl.SetColorMode(value);
        }

        function ReduceShadow(flag) {
            scanCtrl.ReduceShadow(flag);
        }

        function SetCutPageType(index, flag) {
            scanCtrl.SetCutPageType(index, flag);
        }

        function GetCurColor() {
            return 0;
        }

        //设备属性
        function ShowDevicePage(index) {
            scanCtrl.ShowDevicePages(index);
        }

        /* 初始化设备属性 */
        function setDev() {

            $('#delbkcolor,#rotatecrop').removeAttr('checked');

            /* 分辨率 */
            var selResData = [],
                initRes = 0;
            for (var i = 0, count = GetResolutionCount(currentDevValue); i < count; i++) {
                var w = GetResolutionWidth(currentDevValue, i);
                var h = GetResolutionHeight(currentDevValue, i);
                var str = w.toString() + "x" + h.toString();
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
                    SetResolution(currentDevValue, data.value);
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
                    SetDeviceRotate(currentDevValue, parseInt(selRotateData[data.value].text));
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
                    SetColorMode(data.value);
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

            for (var i = 0, l = eThumbnails.GetDisplayCount(); i < l; i++) {
                if (eThumbnails.IsChecked(i) == '1') {
                    var path = eThumbnails.GetFilePath(i);
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
                /*$.dialog.through({
                    title: '提示',
                    content: '请选择要上传的照片！',
                    ok: true
                });*/
                alert("请选择要上传的照片！");
                return false;
            } else if (imgNum != '' && files.length > imgNum) {
                /*$.dialog.through({
                    title: '提示',
                    content: '最多只能选择'+ imgNum +'照片！',
                    ok: true
                });*/
                alert('最多只能选择' + imgNum + '照片！');
                return false;
            }


            if (isApproval) { // 审批意见中使用高拍仪拍照
                uoloadOk(approvalScanData);
            } else { // 正常使用高拍仪拍照
                //删除照片
                for (var i = 0, l = eThumbnails.GetDisplayCount(); i < l; i++) {
                    var path = eThumbnails.GetFilePath(i);
                    DeleteMyFile(path);
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

            $.dialog.close();

            $.dialog.data('images', images);

            if (approvalScanData) {
                $.dialog.data('approvalScanData', approvalScanData);
            }

            //来源页面
            var win = $.dialog.open.origin;
            //win.credDialog.show();
            win.credInit();
        }

        /* 浏览器关闭之后，停止设备预览，释放资源  */
        window.onunload = onunload_handler;

        function onunload_handler() {
            try {
                CloseDeviceEx();
            } catch (e) {

            }
        }
    });
