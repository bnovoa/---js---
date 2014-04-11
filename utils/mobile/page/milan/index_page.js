var $ = require('$');
var AutoComplete = require('com/mobile/lib/autocomplete/autocomplete.js');
var Widget = require('com/mobile/lib/widget/widget.js');
var BasePage = require('./base_page');

exports.search = Widget.define({
    events: {
        'tap [data-role="suggestion"] li': function (e) {
            this.search($(e.currentTarget).data('keyword'));
        },
        'touchend [data-role="suggestion"] li': function (e) {
            e.preventDefault();
        },
        'submit form': function (e) {
            if (!this.config.$input.val()) {
                e.preventDefault();
                this.search(this.config.defaultKeyword);
            }
        },
        'tap [data-role="close"]': function () {
            this.config.$input.val('').focus();
            this.config.$close.hide();
        },
        'focus [data-role="input"]': function () {
            if (this.config.$input.val()) {
                this.config.$close.show();
            } else {
                this.config.$close.hide();
            }
        },
        'blur [data-role="input"]': function () {
            this.config.$close.hide();
        },
        'input [data-role="input"]': function () {
            if (this.config.$input.val()) {
                this.config.$close.show();
            } else {
                this.config.$close.hide();
            }
        }
    },
    init: function (config) {
        var self = this;
        this.config = config;
        this.autocomplete = new AutoComplete({
            $input: this.config.$input,
            getData: function (query, callback) {

                if (query) {
                    $.getJSON(config.autocompleteUrl, { keyword: query})
                        .done(function (data) {
                            callback(data);
                        });
                } else {
                    callback(null);
                }
            }
        });

        this.autocomplete
            .on('data', function (data) {
                self.showSuggestion(data);
            })
            .on('empty', function () {
                self.hideSuggestion();
            });

        this.config.$input
            .on('blur', function () {
                self.hideSuggestion();
            });
    },
    showSuggestion: function (data) {
        var html = data.map(function (row) {
            return '<li data-keyword="{{keyword}}">{{keyword}}<span class="fr">约{{count}}条</span></li>'
                        .replace(/\{\{keyword\}\}/g, row.text)
                        .replace(/\{\{count\}\}/g, row.count);
        }).join('');

        if (!html) {
            this.hideSuggestion();
        } else {
            this.config.$suggestion.html(html);

            this.config.$el.addClass('active');
        }
    },
    hideSuggestion: function () {
        this.config.$el.removeClass('active');
    },
    search: function (keyword) {
        this.config.$input.val(keyword);
        this.config.$form.submit();
    }
});

exports.footerSearch = function (config) {
    config.$submit.on('tap', function (e) {
        if (!config.$input.val()) {
            e.preventDefault();
            config.$input.val(config.defaultKeyword);
            config.$el.submit();
        }
    });
};

exports.slideAd = function (config) {
    var index = 0;
    var total = $(config.$item).size();

    if (total <= 1) {
        return;
    }

    setInterval(function () {
        index ++;
        if (index >= total) {
            index = 0;
        }
        config.$item
            .hide()
            .eq(index)
                .show();
    }, config.interval || 5000);
};

exports.showMore = function (config) {
    config.$toggle.on('click', function (e) {
        e.preventDefault();
        setTimeout(function () {
            config.$el.toggleClass('active');
            config.$text.text(config.$el.hasClass('active') ? '收起' : '更多');
        }, 300);
    });
};

exports.cityInfo = function (config) {
    require.async('com/mobile/lib/cookie/cookie.js', function (Cookie) {
        if (!Cookie.get('mCity')) {
            require.async(['com/mobile/lib/geo/geo.js'], function (GEO) {
                var tip = BasePage.tip('正在获取地理信息...');

                GEO
                    .getLocation(function (err, cityInfo) {
                        if (!err) {
                            tip.setMessage('当前城市: ' + cityInfo.cityName);
                            Cookie.set('mCity', cityInfo.cityDomain, {
                                expires: 86400,
                                path: '/',
                                domain: '.ganji.com'
                            });

                            if (cityInfo.cityDomain === config.currentCity) {
                                setTimeout(function () {
                                    tip.remove();
                                }, 1000);
                                return;
                            }

                            setTimeout(function () {
                                tip.setMessage('正在跳转...');
                                window.location.href = '/' + cityInfo.cityDomain;
                            }, 1000);
                        }
                    })
                    .on('getCityInfo', function () {
                        tip.setMessage('正在处理城市信息...');
                    });
            });
        }
    });
};

exports.imMsgCount = function (config) {
    require.async('com/mobile/lib/cookie/cookie.js', function (Cookie) {
        var userInfo = JSON.parse(Cookie.get('GanjiUserInfo') || '{}');
        if (!userInfo.user_id) {
            return;
        }

        $.ajax({
            url: 'http://webim.ganji.com/index.php?op=getnewmsgcount',
            data: {
                userId: userInfo.user_id
            },
            dataType: 'jsonp'
        })
        .done(function (data) {
            if (data.data && data.data.msgTotalNewCount && data.data.msgTotalNewCount !== '0') {
                config.$count.text(data.data.msgTotalNewCount);
                config.$el.show();
                $('body').addClass('show-im-message');
                config.$close.on('touchend', function (e) {
                    e.preventDefault();
                    setTimeout(function () {
                        $('body').removeClass('show-im-message');
                        config.$el.hide();
                    }, 300);
                });
            }
        });
    });
};

exports.bottomSearch = Widget.define({
    events: {
        'tap [data-role="close"]': function () {
            this.config.$input.val('').focus();
            this.config.$close.hide();
        },
        'focus [data-role="input"]': function () {
            if (this.config.$input.val()) {
                this.config.$close.show();
            } else {
                this.config.$close.hide();
            }
        },
        'blur [data-role="input"]': function () {
            this.config.$close.hide();
        },
        'input [data-role="input"]': function () {
            if (this.config.$input.val()) {
                this.config.$close.show();
            } else {
                this.config.$close.hide();
            }
        }
    },
    init: function (config) {
        this.config = config;
    }
});


exports.init = function () {
    BasePage.init();
    BasePage.responseTouchState();
};