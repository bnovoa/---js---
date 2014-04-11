var Widget = require('com/mobile/lib/widget/widget.js');
var Cookie = require('com/mobile/lib/cookie/cookie.js');
var Storage = require('com/mobile/lib/storage/storage.js');
var $ = require('$');
var BasePage = require('./base_page.js');
var storage = new Storage('favPost');
var _ = require('underscore');
$.extend(exports, BasePage);

exports.showMore = function (config) {
    if (config.$toggle) {
        config.$toggle.on('touchend', function (e) {
            e.preventDefault();
            setTimeout(function () {
                config.$el.toggleClass('active');
                config.$text.text(config.$el.hasClass('active') ? '收起' : '查看更多');
            }, 300);
        });
    }
};

exports.loadMore = Widget.define({
    events: {
        'click [data-role="loadMore"]': 'loadMore'
    },
    init: function (config) {
        this.config = config;
        this.page =  config.page || 1;
        this.pageSize = config.pageSize || 10;
        this.render = _.template($(this.config.template).text());
    },
    loadMore: function () {
        var self = this;
        var $container = this.config.$container;

        this.page ++;
        this.getData(function (err, data) {
            if (!err && (!data || data.length < self.pageSize)) {
                self.config.$loadMore.hide();
            } else {
                $container.append(self.render({
                    err: err,
                    data: data
                }));
            }
        });
    },
    getData: function (callback) {
        $.ajax({
            url: this.config.url,
            data: {
                page: this.page,
                pageSize: this.pageSize
            },
            dataType: this.config.dataType || 'json'
        })
            .done(function (data) {
                callback(null, data);
            })
            .fail(function () {
                callback(new Error('网络错误'));
            });
    }
});

exports.activeWidget = Widget.define({
    events: {
        'click [data-role="toggle"]': function () {
            this.config.$el.toggleClass('active');
        }
    },
    init: function (config) {
        this.config = config;
    }
});

exports.savePost = Widget.define({
    events: {
        'tap': 'toggleSave'
    },
    init: function (config) {
        var postInfo = config.postInfo || {};
        var puid = postInfo.puid || '';
        var savedPosts = storage.get('post') || {};
        this.config = config;
        this.config.doText = this.config.doText || '收藏该帖';
        this.config.undoText = this.config.undoText || '取消收藏';

        postInfo.href = window.location.href;

        if (!puid) {
            return;
        }

        this.puid = puid;

        if (config.$el.hasClass('active')) {
            this.saveToLocalStorage();
            savedPosts[puid] = postInfo;
            storage.set('post', savedPosts);
        } else {
            if (savedPosts[puid]) {
                config.$el.addClass('active');
                config.$text.text(this.config.undoText);
            }
        }
    },
    toggleSave: function () {
        var $el = this.config.$el;
        var $text = this.config.$text;

        if ($el.hasClass('active')) {
            $text.text(this.config.doText);
            this.unfavPost();
            $el.toggleClass('active');
        } else {
            if (this.favPost()) {
                $text.text(this.config.undoText);
                $el.toggleClass('active');
            }
        }
    },
    unfavPost: function () {
        if (Cookie.get('ssid')) { // login
            this.deleteFromServer();
        }

        this.deleteFromLocalStorage();
        BasePage.tip('已取消收藏', 1500);
    },
    favPost: function () {
        var success = this.saveToLocalStorage();

        if (Cookie.get('ssid')) {
            this.saveToServer();
        } else {
            try {
                window.localStorage.setItem('ganji_sync', false);
            } catch (ex) {

            }
        }

        if (!success) {
            BasePage.tip('浏览器当前处于无痕/隐身模式，收藏功能无法正常使用', 1500);
        } else {
            BasePage.tip('收藏成功，可进入"个人中心-我的收藏"进行查看。', 1500);
        }

        return success;
    },
    saveToLocalStorage: function () {
        var savedPosts = storage.get('post') || {};

        if (!this.puid) {
            return;
        }

        savedPosts[this.puid] = this.config.postInfo;
        return storage.set('post', savedPosts);
    },
    deleteFromLocalStorage: function () {
        var savedPosts = storage.get('post') || {};

        if (!this.puid) {
            return;
        }

        delete savedPosts[this.puid];
        storage.set('post', savedPosts);
    },
    saveToServer: function () {
        if (this.puid) {
            $.get('/bj_user/favorite_add/?puid=' + this.puid);
        }
    },
    deleteFromServer: function () {
        if (this.puid) {
            $.get('/bj_user/favorite_del/?puid=' + this.puid);
        }
    }
});

exports.activeListItem = Widget.define({
    events: {
        'click [data-role="item"]': function (e) {
            var $this = $(e.currentTarget);

            if ($this.hasClass('active')) {
                $this.removeClass('active');
            } else {
                $this
                    .addClass('active')
                    .siblings()
                        .removeClass('active');
            }
        }
    },
    init: function (config) {
        this.config = config;
    }
});

exports.getImOnlineStatus = function (config) {
    $.ajax({
        url: 'http://webim.ganji.com/index.php?op=getuserstatuss&callback=?',
        data: {
            userIds: config.userId
        },
        dataType: 'jsonp'
    })
        .done(function (data) {
            if (data && data.data && data.data[config.userId].status) {
                config.$el.addClass('active');
                $(config.$text).text('在线沟通');
            }
        });
};

exports.init = function () {
    BasePage.init();
    BasePage.responseTouchState();
};