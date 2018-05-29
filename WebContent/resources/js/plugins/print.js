/* web套打 */
$(function() {

    var HKEY_Root = "HKEY_CURRENT_USER",
        HKEY_Path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\",
        HKEY_Key,
        head,
        foot,
        top,
        bottom,
        left,
        right;

    // 取得页面打印设置的原参数数据
    function pageSetup_temp() {
        try {
            var Wsh = new ActiveXObject("WScript.Shell");
            HKEY_Key = "header";
            // 取得页眉默认值
            head = Wsh.RegRead(HKEY_Root + HKEY_Path + HKEY_Key);
            HKEY_Key = "footer";
            // 取得页脚默认值
            foot = Wsh.RegRead(HKEY_Root + HKEY_Path + HKEY_Key);
            HKEY_Key = "margin_bottom";
            // 取得下页边距
            bottom = Wsh.RegRead(HKEY_Root + HKEY_Path + HKEY_Key);
            HKEY_Key = "margin_left";
            // 取得左页边距
            left = Wsh.RegRead(HKEY_Root + HKEY_Path + HKEY_Key);
            HKEY_Key = "margin_right";
            // 取得右页边距
            right = Wsh.RegRead(HKEY_Root + HKEY_Path + HKEY_Key);
            HKEY_Key = "margin_top";
            // 取得上页边距
            top = Wsh.RegRead(HKEY_Root + HKEY_Path + HKEY_Key);
        } catch (e) {}
    }

    // 设置网页打印的页眉页脚和页边距为默认值
    function pageSetup_Default() {
        try {
            var Wsh = new ActiveXObject("WScript.Shell");
            HKEY_Key = "header";
            // 还原页眉
            Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, head);
            HKEY_Key = "footer";
            // 还原页脚
            Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, foot);
            HKEY_Key = "margin_bottom";
            // 还原下页边距
            Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, bottom);
            HKEY_Key = "margin_left";
            // 还原左页边距
            Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, left);
            HKEY_Key = "margin_right";
            // 还原右页边距
            Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, right);
            HKEY_Key = "margin_top";
            // 还原上页边距
            Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, top);
        } catch (e) {}
    }

    //设置网页打印的页眉页脚和页边距
    function PageSetup_Null() {
            try {
                var Wsh = new ActiveXObject("WScript.Shell");
                HKEY_Key = "header";
                //设置页眉（为空）
                //Wsh.RegRead(HKEY_Root+HKEY_Path+HKEY_Key)可获得原页面设置   
                Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, "");
                HKEY_Key = "footer";
                //设置页脚（为空）   
                Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, "");
                HKEY_Key = "margin_left";
                //设置左页边距
                Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, "0");
                HKEY_Key = "margin_right";
                //设置右页边距
                Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, "0");
                HKEY_Key = "margin_top";
                //设置上页边距
                Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, "0");
                HKEY_Key = "margin_bottom";
                //设置下页边距   
                Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, "0");
            } catch (e) {
                //alert("ActiveX控件被禁用,请按下面步骤操作：\n1、请打开浏览器‘工具’菜单/‘选项’/‘安全’下的‘自定义级别’，\n把‘对没有标记为安全的activex控件进行初始化和脚本运行’设置为‘启用’。\n2、刷新本页 ");
            }
        }
        //设置网页
    window.printSetup = PageSetup_Null;
    window.pageSetup_Default = pageSetup_Default;

    window.onunload = function() {
        pageSetup_Default();
    }

    pageSetup_temp();
    PageSetup_Null();
});
