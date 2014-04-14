var $ = require('$');
var BasePage = require('com/mobile/page/milan/detail_page.js');
var Widget = require('com/mobile/lib/widget/widget.js');
var Uploader = require('com/mobile/lib/uploader/uploader.js');
var PhotoCompress = require('com/mobile/lib/uploader/photoCompress.js');
var remain = 0;
var imgArr = [];

$.extend(exports, BasePage);
module.exports = Widget.define({
    init: function (config) {
        this.config = config;
        this.fileBtn = this.config.fileBtn;
        this.fileBtn.on('change', this.uploadFile);
        this.initAdd = this.config.addBtn;
    },
    events:{
        'tap [data-role = "remove"]':function(){
            this.remove();
        }
    },
    'showImageEle': function(e, fileInfo) {
        //remain = o.max - (imgArr.length + 1);
        //允许剩余
        if (remain <= 0) {
            //imgArr = [];
            this.initAdd.hide();
        }
        if (remain >= 0) {
            imgArr.push(fileInfo);
        }
    },
    'loadAddBtn' : function(e) {
        var self = this;
        self.fileBtn = $(e.target);
        //init
        self.fileBtn.unbind('change', self.uploadFile).remove();
        self.fileBtn = $('<input type="file" accept="image/jpeg,image/png,image/gif,image/bmp" class="fileInput" multiline="multiline">').appendTo(self.initAdd);
        self.fileBtn.on('change', self.uploadFile);
    },
    'progress': function(e,progessInfo,newLi){
        //progessInfo=[fileInfo, e.loaded, e.total]
        //loading状态 存在，且隐藏了，则显示出来
        if(newLi.find('.gj-loading').length >0 && newLi.find('.gj-loading').css('display')==='none'){
            newLi.find('.gj-loading').show();
        }
    },
    /**
     *成功上传服务器之后，在form中标记post值
     */
    'success' : function(e, fileInfo, imagedata,newLi) {
        var self = this;
        try{
            //计数器-1
            remain--;
            //result
            //创建一个img,一边检测在下载完毕之后取消加载状态
            var img = document.createElement('image');
            img.onload = function() {
                $(img).appendTo(newLi);
                img = null;
            };
            img.src = imagedata.base64;
            //+ form 下面
            var formData = $('form[class~=publish-send]');
            //stringfy
            var imageInfoObj = self.getImageInfo(fileInfo) ;
            var input = '<input type=\'hidden\' name="images_Tmp[]" data-valueindex=\'' +
                JSON.stringify(fileInfo.id) +
                '\' class="input_upload_image_TMP" value=\'' +
                JSON.stringify(imageInfoObj) +
                 '\'></input>';
            $(input).insertAfter(formData);
            self.serizeliseUploadInfo();
        }catch(ex){
            self.serizeliseUploadInfo();
            return false;
        }
        return true;
    },
    'error' : function(e, fileInfo) {
        var self = this;
        var str='li[data-id="'+fileInfo.id+'"]';
        var deleteEle = self.config.$el.find(str);
        if(deleteEle){
            deleteEle.remove();
        }
        BasePage.tip('上传失败，请稍后重试！');
    },
    'serizeliseUploadInfo':function(){
        try{
            var indexArray=[],
                imgList=[],
                formData = $('form[class~=publish-send]'),
                serverInpt=$('.input_upload_image');
            if(!serverInpt||serverInpt.length<1){//add
                var input = '<input type=\'hidden\' name="images" data-valueindex=\' '+
                     '\' class="input_upload_image" value=\'' +
                      '\'></input>';
                $(input).appendTo(formData);
                delete serverInpt;
                var serverInpt = $('.input_upload_image');
            }
            imgList[0]=[];
            imgList[1]=[];
            $('.input_upload_image_TMP').each(function(){
                indexArray.push($(this).data('valueindex'));
                imgList[0].push(JSON.parse($(this).val()));
            });
            serverInpt.val(JSON.stringify(imgList));
            serverInpt.data('valueindex',JSON.stringify(indexArray));
        }catch(ex){
            // GJM.log(ex,'serizeliseUploadInfo');
            return false;
        }
        return true;
    },
    /**
     *@param  currentIndex 当前删除el 的游标
     */
    'removePicUnit' : function(currentIndex) {
        $('.input_upload_image_TMP')
            //被删除的el，直接从post_form的删除
            //不提交服务器
            .each(function() {
                if ($(this).data('valueindex') === currentIndex) {
                    $(this).remove();
                }
            });
        this.serizeliseUploadInfo();
    },
    /***
     *展示出，"+"btn按钮 
     */
    'initAddShow':function(){
        var self = this;
        if(remain>0){
            //add 按钮是否出现
            //<max时，保证其出现
            if (self.initAdd.css('display') === 'none') {
                self.initAdd.show();
            }
        }
    },
    uploadFile : function(e) {
        var self = this;
        var dataId = 0;
        try{
            var files = e.target.files;
            if (!files || !files.length) {
                BasePage.tip('无法解析该文件!');
                return false;
            }
            //init transfer
            var configObj = self.config;
            configObj.$el = e.target;
            var uploaderObj = new Uploader(configObj);

            //compross
            for (var i = 0, l = files.length; i < l; i++) {
                /** start 解绑**/
                var file = files[i];
                $(e.target).unbind('change', self.uploadFile).remove();
                $(e.target).removeClass('fileInput');
                delete self.fileBtn;
                self.fileBtn = $('<input type="file" accept="image/jpeg,image/png,image/gif,image/bmp" class="fileInput" multiline="multiline">').appendTo(self.initAdd);
                self.fileBtn.on('change', self.uploadFile);
                /** end 解绑**/
                dataId++;
                file.id = dataId;
                //init loading
                var newLi = $('<li data-id=' + dataId + ' e="e"><i class="gj-loading"></i></li>').prependTo(self.config.$el);
                self.initAdd.hide();

                //开始压缩
                PhotoCompress.getImageData(file, {
                    maxH : 65,
                    maxW : 65
                }, function(err, data) {
                    if (err) {
                        BasePage.tip('无法解析该文件!');
                        return false;
                    }
                    sendImage2Server(data);
                    // loading start
                });
                var sendImage2Server = function(imageParamsData) {
                    // start upload server
                    var fileInfo = uploaderObj.upload(file);
                    // uploading + compress-ing
                    uploaderObj.$el.on('Upload::success', function(e, fileInfo) {
                        // 预览图片btn
                        var successFlag = self.success(e, fileInfo, imageParamsData, newLi);
                        if (successFlag) {
                            self.showImageEle(e, fileInfo);
                            self.loadAddBtn(e);
                            self.initAddShow();
                        }
                    }).on('Upload::error', function(e, fileInfo) {
                        // remain++;
                        self.error(e, fileInfo);
                        delete fileInfo;
                        self.initAddShow();
                    }).on('Upload::progress', function(e, progessInfo) {
                        self.progress(e, progessInfo, newLi);
                    });
                    return fileInfo;
                };
                if (imgArr.length >= self.config.max) {
                    self.initAdd.hide();
                    return false;
                }
            }// end for
            files = null;
        } catch(ex) {
            //logTrack error 
        }
    },
    getImageInfo: function (ajaxImageRespone){
        var imageInfo = {};
        imageInfo.image=ajaxImageRespone.url;
        imageInfo.thumb_image=ajaxImageRespone.thumbUrl;
        imageInfo.width=ajaxImageRespone.image_info[0];
        imageInfo.height=ajaxImageRespone.image_info[1];
    }
});
