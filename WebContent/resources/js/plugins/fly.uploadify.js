/* 多行表单 */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define([
			"jquery",
			"fly"
		], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

	fly.ready(function(context) {
	    $('[data-fly-flyupload]', context).each(function() {
	        var opts = $(this).data('flyOptions');
	        if(opts == 'this.text') opts = $(this).text();
	        $(this).flyupload(fly.utils.parseOptions(opts));
	    });
	});
	
	var dao = {
		upload:function(lsh){//上传
			var obj = new fly.utils.ajaxObj(),
            options = $.extend({}, obj.options);

	        options.before();
	
	        fly.utils.ajax.post('/attachment/upload.do', 'text')
	            .done(function(data){
	                data = fly.utils.toObj(data);
	                setTimeout(function(){
	                    options.after();
	                    obj._done && obj._done(data);
	                }, 0);
	            })
	            .fail(function(){
	                setTimeout(function(){
	                    options.after();
	                    obj._fail && obj._fail();
	                }, 0);
	            });
	
	        return obj;
		},
		download:function(id){//下载
			var obj = new fly.utils.ajaxObj(),
            options = $.extend({}, obj.options);

	        options.before();
	
	        fly.utils.ajax.get('/attachment/download.do', {
	        	id: id //办事项的流水号
	        }, 'text')
	            .done(function(data){
	                data = fly.utils.toObj(data);
	                setTimeout(function(){
	                    options.after();
	                    obj._done && obj._done(data);
	                }, 0);
	            })
	            .fail(function(){
	                setTimeout(function(){
	                    options.after();
	                    obj._fail && obj._fail();
	                }, 0);
	            });
	
	        return obj;
		},
		getInfo:function(uuid){//获取详细信息
			var obj = new fly.utils.ajaxObj(),
            options = $.extend({}, obj.options);

	        options.before();
	
	        fly.utils.ajax.post('/fileupload/license/findFileInfoById.do', {
	        	uuid: uuid //办事项的流水号
	        }, 'text')
	            .done(function(data){
	                data = fly.utils.toObj(data);
	                setTimeout(function(){
	                    options.after();
	                    obj._done && obj._done(data);
	                }, 0);
	            })
	            .fail(function(){
	                setTimeout(function(){
	                    options.after();
	                    obj._fail && obj._fail();
	                }, 0);
	            });
	
	        return obj;
		},
		deleteById:function(uuid){// 根据ID删除
			var obj = new fly.utils.ajaxObj(),
            options = $.extend({}, obj.options);

	        options.before();
	
	        fly.utils.ajax.post('/fileupload/license/deleteFileById.do', {
	        	uuid: uuid//办事项的流水号
	        }, 'text')
	            .done(function(data){
	                data = fly.utils.toObj(data);
	                setTimeout(function(){
	                    options.after();
	                    obj._done && obj._done(data);
	                }, 0);
	            })
	            .fail(function(){
	                setTimeout(function(){
	                    options.after();
	                    obj._fail && obj._fail();
	                }, 0);
	            });
	
	        return obj;
		}
	};
	
	return $.widget('fly.flyupload', {
	    defaultElement: 'div',
		options: {
			name:'uploadFile',
	        onUploadSuccess : function(){}
		},
		
		_create: function () {
	        var self = this;
	        
	        this.__id = 'fly_upload_'+ (new Date()).getTime();
	        	
	        this.$uploadCtn = $('<ul/>').addClass('upload-ctn clearfix');
	        
	        this.$uploadWrap = $('<dl/>')
	            .append('<dt class="clearfix"><a class="add" id="'+ this.__id +'" href="javascript:;">添加</a></dt>')
	            .append(this.$uploadCtn);
	        this.$value = $('<input type="hidden"/>')
	        	.attr('name', this.options.name)
	        	.appendTo(this.$uploadWrap);
	        
	        //this.$addBar = this.$uploadWrap.find('.add');
	        
	        this.$uploadWrap.appendTo(this.element);
	        
	        this._initControl();
	        this._initList();
	        this._bindEvent();
		},
		/**
		 * 加载上传控件
		 */
	    _initControl: function () {
	    	var self = this,
	    		ysbbm = (self.options.name || '').toUpperCase();
	    	self.ajaxUpload = new AjaxUpload($('#'+self.__id), {
	    		action: CONTEXTPATH + '/attachment/upload.do?ysbbm=' + ysbbm,
	    		name: self.options.name ,
	    		dataType : "json",
	    		onClick:function(){
	    			
	    		},
	    		onSubmit : function(filename, ext){
	    			$('body').mask({content: '上传附件...'});
	    		},
	    		onComplete: function(filename, data) {
	    			var data = fly.utils.toObj($(data).text());
	    			self._add(res);
	    			/*dao.getInfo(data[0]).done(function(res){
	    				var res = fly.utils.toObj(res);
	    				$('body').mask('remove');
	    				self._add(res);
	    			}).fail(function(){
	    				$('body').mask('remove');
	    				$.dialog({
	                        title: '提示',
	                        content: '获取上传材料信息失败！',
	                        ok: true
	                    });
	    			});*/
	    		}
	    	});
	    },
	    _bindEvent: function () {
	        var self = this;
	        self.$uploadCtn.on('click', function(e){
	        	var $target = $(e.target);
	        	if($target.is('i')){
	        		switch ($target.data('action')) {
	        		case 'delete':
	        			self._remove($target);
	        			break;
	        		case 'download':
	        			self._download($target);
	        			break;
	        		}
	        	}
	        	
	        });
	    },
	    _initList: function() {
	    	var self = this;
	    	self.$uploadCtn.empty();
	        $.each(self.options['data'], function(i, item){
	            self._add(item);
	        });
	    },
	    // 填加到上传列表
	    _add: function (data) {
	        var self = this;
	        
	        var thisItem = $('<a/>')
	            .text(data.fjmc)
	            //.addClass('cred' + (item.cluuid ? ' exist' : ''))
	            .attr('href', 'javascript:;')
	            .data('info', data);
	        
	    	thisItem.appendTo(self.$uploadCtn)
	                .wrap('<li class="clearfix"></li>')
	                .before('<i data-action="delete" class="delete" data-id="'+ data.id +'">删除</i><i data-id="'+ data.id +'" data-action="download" class="download">下载</i>');
	    	
	    	self._update();
	    },
	    // 删除列表的中数据
	    _remove: function ($dom) {
	    	 var self = this;
	    	 var _id = $dom.data('uuid');
	    	 $.dialog({
                title: '提示',
                content: '确认删除该附件？',
                cancel: true,
                ok: function(){
                	$('body').mask();
                	$dom.closest('li').remove();
    	    		self._update();
                	/*dao.deleteById(_id).done(function(){
        	    		$('body').mask('remove');
        	    		$dom.closest('li').remove();
        	    		self._update();
        	    	}).fail(function(){
        	    		$('body').mask('remove');
        	    	});*/
                }
            });
	    },
	    _download: function($dom){
	    	// TODO
	    	var self = this;
	    	var _id = $dom.data('id');
	    	
	    	window.open( CONTEXTPATH+'/attachment/download.do?id='+ _id,'newWindow');
	    },
	    _update: function(){
	    	var arr = [];
	    	this.$uploadCtn.find('li').each(function(){
	    		var _data = $('a', this).data('info');
	    		arr.push(_data.uuid);
	    	});
	    	this.$value.val(arr.join(','));
	    	return arr.join('');
	    },
	    // 获取列表中的数据
	    getData: function(){
	        var self = this,
	        	data = [];
	        self.$uploadCtn.find('a').each(function(i, n){
	        	var _$that = $(this);
	        	data.push(_$that.data('info'));
	        });
	        return data;
	    },
	    
	    // 编辑展示列表
	    setData: function(data){
	    	var self = this;
	    },
	    // 查看时设置禁用上传 和 上传
	    setReadOnly: function(){
	    	var self = this;
	    	self.$uploadCtn.find('i.delete').css('visibility','hidden');
	    	$('#'+self.__id).addClass('disabled');
	    },
	    checkUpload:function(){
	    	if(this.$uploadCtn.find('a').length){
	    		return true;
	    	}else{
	    		return false;
	    	}
	    },
	    _init: function () {
			
		},
		_setOption: function ( key, value ) {
			this._super(key, value);
			if( key == 'data' ){
				this._initList();
			}
		},
		_destroy: function () {}
	});
}));