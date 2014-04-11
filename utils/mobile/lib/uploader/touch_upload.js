//GJ.add('js/app/mobile/uploader/touch_upload.js', [], function(){});
GJM = GJM || {};
GJM.Uploader = GJM.Uploader || {};

(function($) {

/**
 *form 中的upload插件
 * @see
 * 如何调用：
 * include之后，使用$('.fileInput').upload();调用即可
 * @see 如何提交server数据
 * 同时在form中hidden
 * $('form input[class=input_upload_image]')
 *  
 */
    GJM.Uploader.uploadFn=
        GJM.Uploader.uploadFn || function(opetion) {
                 
            /**
             *config
             */
            var uploaderConfig = function(opetion) {
                var o = $.extend({
                    max : 12, //图片数量
                    maxSize : 10, //单位图片的大小，单位是M
                    container : 'uppicLists',
                    is_new : true,//isnew
                    //判断是否是新上传的图，如果是则处理，如果不是，则不处理，主要用于修改帖子
                }, opetion);
                return o;
            };
    
            var o = uploaderConfig(opetion), imgArr = [], isUpload = false, timer = null, remain = o.max, fileBtn = $(this), opaTip = {}, deletePop = {}, /*newLi,*/ dataId = 0, current, uploadTip = $('#uploadTip'), masker = $('#masker'), deletePopCon = $('#deleteUppic'), remainCount = $('#remain-count'), initAdd = $('#initAdd'), container = $('#' + o.container);
            remainCount.html(remain); 

            /**
             *通过ajax传输来信息，解析到image对象中，其作将提交form
             */
            var imageInfo=function(ajaxImageRespone){
                var createUuid = 
                function(){
                            try{
                            var tm = +new Date(),inner_acc=[],
                                rm = GJM.rand(10000000, 99999999),
                                strSwitch = function(str){
                                    var ret = '', i, len = str.length;
                                    while (len > 0){
                                        len--;
                                        ret += str.substr(len, 1);
                                    }
                                    return ret;
                                },
                                str = strSwitch(tm + '' + GJM.rand(1, 9));
                            str = (str * 1 + rm) + '' + rm;
                            if (inner_acc) {
                                if (inner_acc.length === 2) {
                                    str = str + "-" + (inner_acc[1]*1 + rm) + "" +inner_acc[0];
                                }
                            }
                        }catch(ex){
                            var timestamp=Math.round(new Date().getTime()/1000);
                            var str="wap"+'_'+timestamp+'_'+timestamp;
                            GJM.log(ex,'fail in createUuid');
                            return str;
                        }
                        return str;
                    };
                this.image=ajaxImageRespone.url;
                this.thumb_image=ajaxImageRespone.thumbUrl;
                this.width=ajaxImageRespone.image_info[0];
                this.height=ajaxImageRespone.image_info[1];
                this.id=createUuid();
                this.is_new=o.is_new;
            };

            var uploadBiz = {
                /**
                 *当前上传的图片位置
                 */
                'showImageEle': function(e, fileInfo) {
                        //remain = o.max - (imgArr.length + 1);
                        //允许剩余
                        if (remain <= 0) {
                            //imgArr = [];
                            initAdd.hide();
                        }
                        if (remain >= 0) {
                            imgArr.push(fileInfo);
                            
                            remainCount.html(remain);
                        }
                    },
                'loadAddBtn' : function(e) {
                        //var   initAdd = $('#initAdd'),
                        fileBtn = $(e.target);
                        //init Add
                        //init
                        fileBtn.unbind('change', util['getFile']).remove();
                        fileBtn = $('<input type="file" accept="image/jpeg,image/png,image/gif,image/bmp" class="fileInput" multiline="multiline">').appendTo(initAdd);
                        fileBtn.on('change', util['getFile']);
                    },
                'progress': function(e,progessInfo,newLi){
                    //progessInfo=[fileInfo, e.loaded, e.total]
                    //loading状态 存在，且隐藏了，则显示出来
                    if(newLi.find('.gj-loading').length>0&&newLi.find('.gj-loading').css('display')=='none'){
                        newLi.find('.gj-loading').show();
                    }
                }, 
                /**
                 *成功上传服务器之后，在form中标记post值
                 * @param e
                 * @param fileInfo
                 * @param imagedata  压缩之后的图片数据
                 * @param newLi 预览的el，此函数内部有任何失败，newLi会display
                 * 
                 *@return  true|
                 *        false|如果在函数内部有任何失败，重新序列化一次 
                 */
                'success' : function(e, fileInfo, imagedata,newLi) {
                    var trackId=GJM.rand(1111111,9999999);//guid
                    //回滚id
                        try{
                            //计数器-1
                            remain--;
                            var o = uploaderConfig();
                            //result
                            //创建一个img,一边检测在下载完毕之后取消加载状态
                            var img = document.createElement('image');
                            img.onload = function(e) {
                                newLi.find('.gj-loading').remove();
                                $(img).appendTo(newLi);
                                img = null;
                            };
                            img.src = imagedata.base64;
                            var aitNotice = $('#atiNotice');
                            if (aitNotice.css('display') != 'none') {
                                aitNotice.hide();
                            }
                            
                            //+ form 下面
                            var formData = $('form[class~=publish-send]');
                            var formImage = formData.find('#input_upload_image');
            
                            //stringfy
                            var jsonarray = [];
                            var imageInfoObj =new imageInfo(fileInfo) ;
                            //jsonarray.push(imageInfoObj);
                            var input = "<input type=\"hidden\" name='images_Tmp[]' data-valueindex=\'" +
                                 JSON.stringify(fileInfo.id) + 
                                 "\' class='input_upload_image_TMP' value=\'" + 
                                 JSON.stringify(imageInfoObj) +
                                 "\' data-trackid=\'"+trackId+
                                  "\'></input>";
                            $(input).insertAfter(formData);
                            
                           this.serizeliseUploadInfo();
                       }catch(ex){
                           
                            var trackEl=$("input[type=hidden][data-trackid=\'"+trackId+"\']");
                            if(trackEl){
                                trackEl.each(function(){
                                  $(this).remove();  
                                });
                           }
                           //失败之后，重新序列化一次
                           this.serizeliseUploadInfo();
                           GJM.log(ex,'success.serize.fail');
                           return false;
                       }
                       return true;
                    },
                    /***
                     * 原始图片有旋转度，则调用服务器接口进行一次矫正
                     * 按照矫正返回值，修改form提交值
                     * @param  fileInfo oldfileobject
                     * @param updateRet newFileObject
                     */
                    'rotateUpdate' : function(e, fileInfo, updateRet) {
                            if (fileInfo && typeof fileInfo == 'object' && updateRet && typeof updateRet == 'object') {
                                var id = fileInfo.id,operateFlag=false;
                                if (updateRet.hasOwnProperty('url')) {
                                    fileInfo.url = updateRet.url;
                                }
                                if (updateRet.hasOwnProperty('thumbUrl')) {
                                    fileInfo.thumbUrl = updateRet.thumbUrl;
                                }
            
                                $('input[type=hidden][class=input_upload_image_TMP]').each(function() {
                                    if ($(this).data('valueindex') == id) {
                                        var val_bak=$(this).val();
                                        try{
                                            var imageInfoObj = new imageInfo(fileInfo);
                                            
                                            $(this).val(JSON.stringify(imageInfoObj));
                                            operateFlag=true;
                                        }catch($ex){
                                            //回滚
                                            if($(this).val()!=val_bak && typeof val_bak!='undefined'){
                                                $(this).val(val_bak);
                                            }
                                            operateFlag=false;
                                        }
                                    }
                                });
                            }
                            if(operateFlag==true){
                                 this.serizeliseUploadInfo();
                            }
                    },
                'error' : function(e, fileInfo, msg) {
                    var str='li[data-id="'+fileInfo['id']+'"]';
                    var deleteEle=container.find(str);
                    if(deleteEle){
                        deleteEle.remove();
                    }
                    opaTip.show("上传失败，请稍后重试！");
                },
                'serizeliseUploadInfo':function(){
                    try{
                        var indexArray=[],imgList=[],/*load old data from uploadInput*/
                            formData = $('form[class~=publish-send]'),
                            serverInpt=$('.input_upload_image');
                        if(!serverInpt||serverInpt.length<1){//add
                            var input = "<input type=\"hidden\" name='images' data-valueindex=\'" +
                                 '' + 
                                 "\' class='input_upload_image' value=\'" + 
                                 ''+
                                  "\'></input>";
                            $(input).appendTo(formData);     
                            delete serverInpt;
                            var serverInpt=$('.input_upload_image');
                        } 
                        imgList[0]=[];imgList[1]=[];
                        $('.input_upload_image_TMP').each(function(index){
                            indexArray.push($(this).data('valueindex'));
                            imgList[0].push(JSON.parse($(this).val()));
                        });
                        serverInpt.val(JSON.stringify(imgList));
                        serverInpt.data('valueindex',JSON.stringify(indexArray));
                    }catch(ex){
                        GJM.log(ex,'serizeliseUploadInfo');
                        return false;
                    }
                    return true;
                },
                /***
                 *@param file :file [native code]
                 * @param opaTip tip selector
                 * @param opetion config item,may be mix with uploaderConfig
                 * @return bool
                 */
                'validate' : function(file, opaTip2, opetion) {
                        var o = uploaderConfig(opetion);
                        var fileName = file.name.toLowerCase(), image = /image\/*/;
                        if (!file.type) {
                            if (fileName.indexOf('jpg') <= -1 && fileName.indexOf('jpeg') <= -1 
                               && fileName.indexOf('png') <= -1 && fileName.indexOf('gif') <= -1
                               && fileName.indexOf('bmp') <= -1) {
                                   opaTip.show('上传的文件格式必须是图片!');
                                   return false;
                            }
                        } else if (file.type && !image.test(file.type)) {
                            opaTip.show('上传的文件格式必须是图片!');
                            return false;
                        } else if (file.size / 1024 / 1024 > o.maxSize) {
                            opaTip.show('上传文件的大小必须小于等于' + o.maxSize + 'M');
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
                        .each(function(index) {
                            if ($(this).data('valueindex') == currentIndex) {
                                $(this).remove();
                            }
                        });
                    this.serizeliseUploadInfo();
                },
                /***
                 *展示出，"+"btn按钮 
                 */
                'initAddShow':function(){
                    if(remain>0){
                        //add 按钮是否出现
                        //<max时，保证其出现
                        if ($('#initAdd').css('display') == 'none') {
                            initAdd.show();
                        }
                    }
                },
            };
    
            var util = {
                init : function() {
                    return this;
                },
                getFile : function(e) {
                    try{
                        //validate
                        var files = e.target.files;
                        if (!files || !files.length) {
                            opaTip.show('无法解析该文件!');
                            return false;
                        }
                        //init transfer
                        var configObj = GJM.image.config;
                        configObj.$el = e.target;
                        var uploaderObj = new GJM.image.Uploader(configObj);
        
                        //compross
                        for (var i = 0, l = files.length; i < l; i++) {
                            var file = files[i], fileName = file.name.toLowerCase(), image = /image\/*/;
                            /** start 解绑**/
                            $(e.target).unbind('change', util['getFile']).remove();
                            $(e.target).removeClass('fileInput');
                            delete fileBtn;  
                            fileBtn = $('<input type="file" accept="image/jpeg,image/png,image/gif,image/bmp" class="fileInput" multiline="multiline">').appendTo(initAdd);
                            fileBtn.on('change', util['getFile']);
                            /** end 解绑**/
                            
                            if (!uploadBiz.validate(file, opaTip, opetion)) {
                                return false;
                            }
                            dataId++;
                            file.id = dataId;
                            //init loading
                            var newLi = $('<li data-id=' + dataId + ' e="e"><i class="gj-loading"></i></li>').prependTo(container);
                           
                           initAdd.hide();

                        //开始压缩
                        GJM.lib.ImageCompresser.getImageData(file, {
                            maxH : 65,
                            maxW : 65
                        }, function(err, data) {
                            if (err) {
                                opaTip.show('无法解析该文件!');
                                return false;
                            }
                            var tmp = sendImage2Server(data);
                            // loading start

                        });
                        var sendImage2Server = function(imageParamsData) {
                            // start upload server
                            var fileInfo = uploaderObj.upload(file);
                            // uploading + compress-ing
                            uploaderObj.$el.on('Upload::success', function(e, fileInfo) {
                                if (imageParamsData && imageParamsData.param && imageParamsData.param.orien) {
                                    if (imageParamsData.param.orien > 1) {

                                        uploaderObj.rotate(fileInfo.url, imageParamsData.param.orien);
                                        uploaderObj.$el
                                            .on('Upload::rotateSuccess', function(e, updateFileInfo) {
                                                uploadBiz.rotateUpdate(e,fileInfo,updateFileInfo)
                                            })
                                            .on('Upload::rotateError', function(e, f) {
                                                //rotate失败，后续不处理，直接传送旧imgurl
                                            });
                                    }
                                }

                                // 预览图片btn
                                var successFlag = uploadBiz.success(e, fileInfo, imageParamsData, newLi);
                                if (successFlag) {
                                    uploadBiz.showImageEle(e, fileInfo);
                                    // display add btn
                                    uploadBiz.loadAddBtn(e, util, fileBtn);
                                    uploadBiz.initAddShow();
                                }
                            }).on('Upload::error', function(e, fileInfo, msg) {
                                // remain++;
                                uploadBiz.error(e, fileInfo, msg, opaTip);
                                delete fileInfo;
                                uploadBiz.initAddShow();
                            }).on('Upload::progress', function(e, progessInfo) {
                                uploadBiz.progress(e, progessInfo, newLi);
                            });
                            return fileInfo;
                        }
                        if (imgArr.length >= o.max) {
                            initAdd.hide();
                            return false;
                        }

                    }// end for

                    files = null;

                } catch(ex) {
                    GJM.log(ex, 'getFile fail');
                }
                return this;
            },
        };
            //绑定上传事件
            fileBtn
                .on('change', util['getFile']);
            //管理普通弹窗
            opaTip = {
                show : function(html) {
                    //clearTimeout(timer);
                    uploadTip.show().html(html);
                    opaTip.hide();
                },
                hide : function() {
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        uploadTip.hide().html('');
                    }, 1500);
                },
            };
            //管理删除弹窗
            deletePop = {
                show : function(_img) {
                    masker.css('height', getHeight() + 'px').show();
                    $('#bigPicBox').attr('src', _img);
                    deletePopCon.show();
                },
                hide : function() {
                    masker.css('height', '100%').hide();
                    deletePopCon.hide();
                }
            };
            //绑定删除图片
            container
                .delegate('li', 'click', function() {
                    var _this = $(this);
                    if (_this.attr('id') == 'initAdd'){
                        return;
                    }
                    container.find('li').removeClass('focus');
                    _this.addClass('focus');
                    var image = _this.find('img');
                    var _img = image.attr('src');
                    current = _this.attr('data-id');
                    deletePop.show(_img);
                });
            //取消删除
            $('.cancelBtn')
                .on('click', function() {
                    container.find('li').removeClass('focus');
                    deletePop.hide();
                });
            //确定删除
            $('.okBtn')
                .on('click', function(e) {
                    try{
                        $('li.focus').remove();
                        deletePop.hide();
                        //从图片数组中把相应的图片删除
                        deleteImg(current);
                    
                        remain ++;
    
                        if (remain >= o.max) {
                            remain = o.max;
                        } else {
                            uploadBiz.initAddShow();
                        }
                        remainCount.html(remain);
                        //提交server中删除
                        uploadBiz.removePicUnit(current);
                    }catch(ex){
                        GJM.log(ex,'okBtn');
                    }
                });
            //删除图片数组当中第i个元素
            function deleteImg(index) {
                for (var i = 0, l = imgArr.length; i < l; i++) {
                    if ((imgArr[i].id + 1) - index == 0) {//从0开始，而index从1开始
                        imgArr.splice(i, 1);
                        break;
                    }
                }
            }

    }
    
    $.fn.upload=GJM.Uploader.uploadFn;
    //计算整个屏幕的高度
    function getHeight() {
        var doc = document.documentElement, body = document.body;
        return Math.max(doc.clientHeight, doc.offsetHeight, doc.scrollHeight, body.clientHeight, body.offsetHeight, body.scrollHeight);
    }

})(window.Zepto);
