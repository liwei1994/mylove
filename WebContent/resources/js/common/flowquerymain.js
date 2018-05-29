/**
 * 流程查询
 * @authors wgxu (wgxu@iflytek.com)
 * @date    2015-07-15 14:18:00
 * @version $Id$
 */
require.config(requireConfig);

require(['jquery','fly','../common/biz-dao','message','tab',],
    function($,fly,dao,message,tab) {
        fly.flyReady();
        var util = fly.utils;
        	
        //url参数
        var params = util.getQueryString('projNo'),
            processInstID = util.getQueryString('processInstID')||'';

        //dom元素
        var $iframe=$('#iframe-process'),
            $liImg=$('.tab-ul-li[name="process-img"]');

        var flowMoudle = {
            getFlowData: function() {
                $('body').mask();
                dao.getFlowData(params).done(function(data){
                    if(data.length === 0) {
                        var tbodyHtml = '<tr>'
                                      + '<td colspan="7" class="empty-data">'
                                      + '</td></tr>';
                        //$('#flowList').empty();             
                        $('#flowList').html(tbodyHtml);
                    }else {
                        var curHandleOpinion;
                        // 对审批意见进行处理长文字截断
                        for(var i=0,len = data.length; i < len; i++) {
                            curHandleOpinion = data[i].curHandleOpinion;
                            if(curHandleOpinion.length > 10){
                                data[i].newCurHandleOpinion = curHandleOpinion.slice(0, 10) + '...';
                            }else {
                                data[i].newCurHandleOpinion = curHandleOpinion;
                            }
                        }

                        $("#templateId").tmpl(data).appendTo("#flowList");
                    }
                    $('body').mask('remove');
                }).fail(function(){
                    $('body').mask('remove');
                    $.tip({
                        text:message.get('LOAD_ERROR')
                    });
                });
            },
            init: function() {
                flowMoudle.getFlowData();
                if(!processInstID){
                    $liImg.addClass('hide');
                }else{
                    $iframe.attr('src',CONTEXTPATH+'/bsxquery/processGraph.do?processInstID='+processInstID);
                }
            }
        };

        //执行
        (function() {
            flowMoudle.init();
        })();
});