var $ = require('$');
var count = 1;

function Uploader (config) {
    this.config =
    $.extend({
        maxNum : 12, //图片数量
        maxSize : 10, //单位图片的大小，单位是M
        container : 'uppicLists',
        is_new : true,//isnew
        //判断是否是新上传的图，如果是则处理，如果不是，则不处理，主要用于修改帖子
    },config);
    this.$el = $(config.$el);
    this.uploadedFiles = {};
    this.requests = {};
    this.files = {};
}
Uploader.prototype.validate = function(file) {
    //校验提交合法性
    var self = this;
    var fileName = file.name.toLowerCase(), image = /image\/*/;
    var fileInfo = {
        id: count++,
        name: file.name
    };
    if (!file.type) {
        if (fileName.indexOf('jpg') <= -1 && fileName.indexOf('jpeg') <= -1 && fileName.indexOf('png') <= -1 && fileName.indexOf('gif') <= -1 && fileName.indexOf('bmp') <= -1) {
            self.trigger('Upload::error', [fileInfo, '上传的文件格式必须是图片']);
            return false;
        }
    } else if (file.type && !image.test(file.type)) {
        self.trigger('Upload::error', [fileInfo, '上传的文件格式必须是图片']);
        return false;
    } else if (file.size / 1024 / 1024 > self.config.maxSize) {
        self.trigger('Upload::error', [fileInfo, '上传文件的大小必须小于等于' + self.config.maxSize + 'M']);
        return false;
    }
    return true;
};
Uploader.prototype.upload = function (file) {
    var self = this, valid = true, filename = file.name;
    var xhr, fd, params, fileInfo, key;
    if(!self.validate(file)){
        return false;
    }
    fileInfo = {
        id: count++,
        name: file.name
    };
/*
    if (this.config.maxNum && Object.keys(this.files).length >= this.config.maxNum) {
        this.trigger('Upload::error', [fileInfo, '文件数过多']);
        return false;
    }
*/
    if (this.config.type) {
        valid = this.config.type.some(function (type) {
            if (filename.indexOf(type) === filename.length - type.length) {
                return true;
            }
        });
    }

/*
    if (!valid) {
        this.trigger('Upload::error', [fileInfo, '文件类型错误']);
        return false;
    }
*/
    xhr = new XMLHttpRequest();
    fd = new FormData();
    params = this.config.params;

    this.files[fileInfo.id] = fileInfo;

    for(key in params) {
        if (params.hasOwnProperty(key)) {
            fd.append(key, params[key]);
        }
    }

    fd.append('file', file);

    xhr.upload.addEventListener('progress', function (e) {
        self.trigger('Upload::progress', [fileInfo, e.loaded, e.total]);
    }, false);

    xhr.addEventListener('load', function (e) {
        var response, info, key;
        try{
            response = JSON.parse(e.target.responseText);
        } catch (ex) {
            self.trigger('Upload::error', [fileInfo, '服务器返回信息格式错误']);
        }
        if (response.error) {
            self.trigger('Upload::error', [fileInfo, response.text]);
        } else {
            info = response.info[0];

            for (key in info) {
                if (info.hasOwnProperty(key)) {
                    fileInfo[key] = info[key];
                }
            }
            self.uploadedFiles[fileInfo.id] = fileInfo;

            self.trigger('Upload::success', [fileInfo]);
        }
    }, false);
    xhr.addEventListener('error', function () {
        self.trigger('Upload::error', [fileInfo, '网络错误(HTTP '+xhr.status+')']);
    }, false);

    xhr.open('POST', this.config.url, true);
    xhr.send(fd);

    this.requests[fileInfo.id] = xhr;
};
Uploader.prototype.trigger = function () {
    this.$el.trigger.apply(this.$el, arguments);
};
Uploader.prototype.cancel = function (id) {
    var xhr = this.requests[id];
    var fileInfo = this.files[id];
    if (!xhr) {
        return;
    }

    xhr.abort();
    this.trigger('Upload::cancel', [fileInfo]);
};

return Uploader;