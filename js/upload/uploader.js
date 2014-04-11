var $ = require('$');
// var Event = require('com/mobile/lib/event/event.js');
var count = 1;

function Uploader (config) {
    this.config = config;
    this.$el = $(config.$el);
    this.uploadedFiles = {};
    this.requests = {};
    this.files = {};
}
Uploader.prototype.upload = function (file) {
    var self = this, valid = true, filename = file.name;
    var xhr, fd, params, fileInfo, key;

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