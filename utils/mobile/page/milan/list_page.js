
var Widget = require('com/mobile/lib/widget/widget.js');
var BasePage = require('./base_page.js');
var _ = require('com/mobile/lib/underscore/underscore.js');
var $ = require('$');

$.extend(exports, BasePage);

exports.loadMore = Widget.define({
    events: {
        'tap [data-role="loadMore"]': function() {
            this.loadMore();
        },
        'touchend [data-role="loadMore"]': function(e) {
            e.preventDefault();
        },
    },
    init: function(config) {
        var self = this;
        var windowHeight = window.screen.height;
        this.render = _.template($(config.template).html());
        this.config = config;
        this.offset = 0;
        this.scrollAble = config.scrollAble ? config.scrollAble : false;
        this.listening = false;

        function onScroll() {
            var top = $(window).scrollTop();
            if ($('body').height() - windowHeight - top < 50) {
                self.loadMore();
            }
        }

        this.listenScroll = function() {
            if (self.listening) {
                return;
            }
            self.listening = true;
            $(window).on('scroll', onScroll);
        };

        this.removeScrollListener = function() {
            $(window).off('scroll', onScroll);
            self.listening = false;
        };
        if (config.scrollAble) {
            self.listenScroll();
        }
    },
    loadMore: function() {
        var self = this;
        if (self.loading) {
            return;
        }
        self.removeScrollListener();
        self.loading = true;
        self.getData(++self.offset, function(err, data) {
            if (!err) {
                if (data && data.length !== 0) {
                    self.config.$list.append(
                        self.render({
                            'posts': data
                        })
                    );
                    self.loading = false;
                    self.config.$loadMore.html('查看更多<i></i>');
                    if (self.config.scrollAble) {
                        self.listenScroll();
                    }
                } else {
                    self.config.$loadMore.html('没有更多了');
                }
            } else {
                BasePage.tip(err.message, 1500);
            }
        });
    },
    getData: function(query, callback) {
        var self = this;
        $.ajax({
            url: self.config.ajaxUrl,
            data: {
                offset: query,
                page: query + 1
            },
            beforeSend: function() {
                self.config.$loadMore.html('加载中...');
            },
            dataType: 'json'
        }).done(function(data) {
            callback(null, data);
        }).fail(function() {
            callback(new Error('network error!'));
        });
    }
});

var getURIParams = function(searchStr) {
    if(!searchStr) {
        searchStr = window.location.search;
    }
    var params = {}, URIArr;
    searchStr = searchStr.replace('?', '');

    URIArr = searchStr.split('&');
    $.each(URIArr, function(i, v) {
        var keyArr = v.split('=');
        if(keyArr.length === 2) {
            params[keyArr[0]] = decodeURIComponent(keyArr[1]);
        }
    });
    return params;

};


exports.listFilter = Widget.define({
    events: {
        'tap [data-role="filterItem"]' : 'showFilterContent',
        'tap .js-sigle [data-ajax]' : 'showNextCate',
        'tap .js-sigle [data-value]' : 'sigleUpdate',
        'tap [data-role="moreItem"] li': 'showChildFilter', //高级
        'tap [data-role="back"]': 'backParentFilter',  //高级
        'tap .js-more [data-ajax]': 'showNextCate', //高级显示二级类目
        'tap .js-more [data-value]': 'moreUpdate', //高级选中
        'tap [data-role="reset"]' : 'resetFilter',
        'tap [data-role="submit"]' : 'submitFilter'
    },
    init: function(config) {
        var that = this;
        this.config = config;
        this.$el = config.$el;
        this.$container = null;
        this.$mask = $('#maskEl');
        this.curParams = getURIParams();

        this.$mask.on('click', function(e) {
            e.preventDefault();
            that.hideFilterContent();
        });

        this.noScroll = false;

        $('body').on('touchmove', function(e) {
            if(that.noScroll) {
                e.preventDefault();
            }
        });
        window.scrollTo(0, 1);

        //高级筛选默认值构造
        if(this.config.$moreChild && this.config.$moreChild.length) {
            this.config.$moreChild.find('.js-filt-child').each(function() {
                var $childEl = $(this);
                var params = {};

                $childEl.find('[data-key]').each(function() {
                    var key = $(this).data('key');
                    var value = $(this).find('.active').data('value');

                    if(!value) {
                        value = $(this).find('.active').data('ajax');
                    }
                    params[key] = value;
                });

                $childEl.data('params', params);
            });
        }

        //最大高度
        this.maxHeight = $(window).height() - 150;
        config.$el.find('.js-sigle .warpper').css('height', this.maxHeight);
        if(config.$moreItem) {
            config.$moreItem.css('height', this.maxHeight);
            config.$moreItem.find('.warpper').css('height', this.maxHeight - 41 - 46);
            config.$moreChild.find('.warpper').css('height', this.maxHeight - 41);
        }
    },
    initScroll: function(id) {
        var $warpperBox = $('#' + id);
        G.use('com/mobile/lib/iscroll/iscroll.js', function() {
            $warpperBox.find('.warpper').each(function() {
                var curEl = this;
                if(!$(this).data('hasScroll')) {
                    /*jshint nonew: false */
                    new window.IScroll(curEl, {
                        bounceEasing: 'easing',
                        bounceTime: 600,
                        click: true,
                        scrollbars: true,
                        mouseWheel: true,
                        interactiveScrollbars: true,
                        shrinkScrollbars: 'scale'
                    });
                }
                // ios6 隐藏地址栏
                // var curScrollTop = $('body').scrollTop();
                // window.scrollTo(0, curScrollTop + 1);
                $(this).data('hasScroll', true);
            });
        });
    },
    showFilterContent: function(e) {
        e.preventDefault();
        this.noScroll = true;
        var $target = $(e.currentTarget);

        if($target.hasClass('active')) {
            this.hideFilterContent();
            return false;
        }

        var $el = this.$el;
        var id = $target.data('id');

        this.$container = $('#' + id);

        $('body').addClass('body-filt-open');

        this.config.$filterItem.removeClass('active');
        $el.find('.filt-open').removeClass('filt-show');

        $target.addClass('active');

        this.$container.addClass('filt-show');
        this.$mask.show();

        //多选标签不初始化scroll
        if($('#' + id).hasClass('js-more')) {
            var $moreItem = this.config.$moreItem;
            var $warpper = $moreItem.find('.warpper');
            G.use('com/mobile/lib/iscroll/iscroll.js', function() {
                if($warpper.length && !$warpper.data('hasScroll')) {
                    /*jshint nonew: false */
                    new window.IScroll($warpper[0], {
                        bounceEasing: 'easing',
                        bounceTime: 600,
                        click: true,
                        scrollbars: true,
                        mouseWheel: true,
                        interactiveScrollbars: true,
                        shrinkScrollbars: 'scale'
                    });
                    $warpper.data('hasScroll', true);
                }
            });

            return false;
        }

        this.initScroll(id);
    },
    showNextCate: function(e) {
        e.preventDefault();
        var that = this;
        var $target = $(e.currentTarget);
        var $parent = $target.parents('.warpper');

        $parent.find('.active').removeClass('active');
        $target.addClass('active');
        var $nextEl = $parent.next();

        if($nextEl.length) {
            $nextEl.find('.active').removeClass('active');
            var $tmpEl = $nextEl.next();
            //删除下下一级子类目
            while(1) {
                if($tmpEl.length) {
                    $tmpEl.remove();
                    $tmpEl = $nextEl.next();
                } else {
                    break;
                }
            }
        }

        var html = '';
        var url = $parent.parents('.filt-open').data('url');
        var keyword = $target.data('ajax');
        var extra = $target.data('extra');

        if(!extra) {
            extra = {};
        }

        url = url.replace('{keyword}', keyword);

        // 有子类目
        $.getJSON(url, extra, function(jsonData) {
            var curKey = jsonData.key;

            if(jsonData.data.length) {
                $.each(jsonData.data, function(i, v) {
                    var dataExtra = '';
                    if(v.extra) {
                        dataExtra = 'data-extra=\''+ JSON.stringify(v.extra) +'\'';
                    }

                    var dataDefaultName = '';
                    if(v.default_name) {
                        dataDefaultName = 'data-name="' + v.default_name +'"';
                    }
                    if(v.hasChild) {
                        html += '<li '+ dataExtra +' data-ajax="'+ v.id +'" '+ dataDefaultName +'><a>'+ v.name +'</a><i class="filt-arrow"></i></li>';
                    } else {
                        html += '<li '+ dataExtra +' data-value="'+ v.id +'" '+ dataDefaultName +'><a>'+ v.name +'</a></li>';
                    }

                });
            }

            if($nextEl.length) {
                html = '<ul class="bg-gray">' + html + '</ul>';
                $nextEl
                    .html(html)
                    .data('key', curKey)
                    .data('hasScroll', false)
                    .show();
            } else {
                var height = that.maxHeight;

                if($parent.parents('.js-filt-child').length > 0) {
                    height = height - 41;
                }

                var className = 'bg-gray';

                if($parent.closest('.filt-show').find('.warpper').length > 1) {
                    className = 'bg-white';
                }

                html = '<div style="height:'+ height +'px" class="warpper box-flex1" data-key="'+ curKey +'"><ul class="'+ className +'">' + html + '</ul></div>';
                $parent.after(html);
            }

            var id = $parent.parents('.filt-open').attr('id');
            that.initScroll(id);
        });
    },
    sigleUpdate: function(e) {
        e.preventDefault();
        var $target = $(e.currentTarget);

        var $parent = $target.parents('.js-sigle');
        var that = this;

        var $checkEl = $target.find('[type="checkbox"]');

        if($checkEl.length) {
            var isChecked = $checkEl.prop('checked');
            $checkEl.prop('checked', !isChecked);
        }

        //去除子类目的active
        var $warpper = $target.parents('.warpper');
        var $nextEl = $warpper.next();
        //隐藏下一级子类目
        var $tmpEl = $nextEl;
        while(1) {
            if($tmpEl.length) {
                $tmpEl.hide();
                $tmpEl.find('.active').removeClass('active');
                $tmpEl = $tmpEl.next();
            } else {
                break;
            }
        }

        $target.parents('ul').find('.active').removeClass('active');
        $target.addClass('active');

        var paramsObj = {};
        $parent.find('[data-key]').each(function() {
            var key = $(this).data('key');
            var value = $(this).find('.active').data('value');
            var extra =  $(this).find('.active').data('extra');
            if(extra) {
                paramsObj = $.extend(paramsObj, extra);
            }

            if(value === undefined || $.trim(value) === '') {
                value = $(this).find('.active').data('ajax');
            }
            //如果还没有值，删除这个key
            if(value === undefined || $.trim(value) === '') {
                delete that.curParams[key];
            } else {
                paramsObj[key] = value;
            }
        });
        this.goto(paramsObj);
    },
    showChildFilter: function(e) {
        e.preventDefault();
        var $target = $(e.currentTarget);

        var id = $target.data('id');
        this.config.$moreChild.find('.js-filt-child').hide();

        $('#'+id).show();
        this.config.$moreItem.parent().animate({
            left: '-100%'
        }, 300, 'ease-in-out');

        this.initScroll(id);
    },
    moreUpdate: function(e) {
        e.preventDefault();
        var $target = $(e.currentTarget);
        var that = this;
        if($target.hasClass('active')) {
            return false;
        }

        //去除子类目的active
        var $warpper = $target.parents('.warpper');
        var $nextEl = $warpper.next();
        //隐藏下一级子类目
        var $tmpEl = $nextEl;
        while(1) {
            if($tmpEl.length) {
                $tmpEl.hide();
                $tmpEl.find('.active').removeClass('active');
                $tmpEl = $tmpEl.next();
            } else {
                break;
            }
        }

        var text = $target.text();
        if($target.data('name')) {
            text = $target.data('name');
        }
        var $parentsEl = $target.parents('.js-filt-child');

        $target.parents('ul').find('.active').removeClass('active');
        $target.addClass('active');
        var id = $parentsEl.attr('id');
        this.backParnentHandler(id, text);


        var paramsObj = {};
        $parentsEl.find('[data-key]').each(function() {
            var key = $(this).data('key');
            var value = $(this).find('.active').data('value');

            var extra = $(this).find('.active').data('extra');
            if(extra) {
                paramsObj = $.extend(paramsObj, extra);
            }

            if(value === undefined || $.trim(value) === '') {
                value = $(this).find('.active').data('ajax');
            }

            //如果还没有值，删除这个key
            if(value === undefined || $.trim(value) === '') {
                delete that.curParams[key];
            } else {
                paramsObj[key] = value;
            }

            paramsObj[key] = value;
        });

        //更新父节点
        $parentsEl.data('params', paramsObj);
    },
    backParentFilter: function(e) {
        e.preventDefault();
        this.backParnentHandler(null, null);
    },
    backParnentHandler: function(id, text) {
        if(id && text) {
            this.config.$moreItem.find('[data-id="'+ id +'"]').find('.js-span').text(text);
        }
        this.config.$moreItem.parent().animate({
            left: 0
        }, 300, 'ease-in-out');
    },
    hideFilterContent: function() {
        $('body').removeClass('body-filt-open');
        this.config.$filterItem.removeClass('active');
        this.$el.find('.filt-open').removeClass('filt-show');
        this.$mask.hide();
        this.noScroll = false;
    },
    resetFilter: function(e) {
        e.preventDefault();

        this.config.$moreItem.find('.js-span').each(function() {
            $(this).text('不限');
        });

        this.curParams = {};
        this.config.$moreChild.find('.js-filt-child').each(function() {
            var tmpObj = {};

            $(this).find('.warpper').each(function(i) {
                var key = $(this).data('key');
                if($(this).data('defaultValue')) {
                    tmpObj[key] = $(this).data('defaultValue');
                }

                if(i === 0) {
                    $(this).find('.active').removeClass('active');
                } else {
                    $(this).remove();
                }
            });

            $(this).data('params', tmpObj);
        });
    },
    submitFilter: function() {
        var paramsObj = {};

        this.config.$moreChild.find('.js-filt-child').each(function() {
            var params = $(this).data('params');
            params = params || {};

            $.extend(paramsObj, params);
        });
        this.goto(paramsObj);
    },
    goto: function(paramsObj) {
        paramsObj = $.extend({}, this.curParams, paramsObj);
        //页面跳转到第一页
        paramsObj.page = 1;
        delete paramsObj.ingore;
        var url = 'http://3g.ganji.com' + window.location.pathname +'?'+ $.param(paramsObj);
        window.location.href = url;
    }
});

exports.geoStatus = function(config) {
    var $el = config.$el;
    var url = config.url;
    var arr, baseURL = '';
    if(url) {
        url = url.replace(/#./, '');
        arr = url.split('?');
        baseURL = arr[0];
    }
    var paramsObj = {};

    if(arr && arr.length > 1) {
        var searchStr = arr[1];
        paramsObj  = getURIParams(searchStr);
    }

    if(config.lat && config.lng) {
        var latlng = config.lat + ',' + config.lng;
        $.getJSON('http://3g.ganji.com/latlng/?latlng='+ latlng, function(data) {
            var addressName = data.data.currentLocation;
            $el.find('.tip1').hide();
            config.$agree.show();
            config.$addressName.text(addressName);
        });
    }

    var geoDefer = $.Deferred();

    geoDefer
        .done(function (pos) {
            $el.find('.tip1').hide();
            config.$agree.show();
            paramsObj.lat = pos.coords.latitude;
            paramsObj.lng = pos.coords.longitude;

            window.location.href = baseURL + '?' + $.param(paramsObj);
        })
        .fail(function (err) {
            var text = '';
            if(err.code === err.PERMISSION_DENIED) {
                text = '浏览器定位授权未打开';
            } else if(err.code === err.POSITION_UNAVAILABLE) {
                text = '定位失败';
            } else {
                text = '定位超时';
            }
            $el.find('.tip1').hide();
            config.$tip.text(text);
            config.$reject.show();
        });


    config.$check.on('click', function(e) {
        e.preventDefault();
        $el.find('.tip1').hide();
        config.$checking.show();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                geoDefer.resolve(pos);
            }, function (err) {
                geoDefer.reject(err);
            }, {
                timeout : config.timeout || 10000,
                maximumAge : 600000,
                enableHighAccuracy : true
            });
        } else {
            // 手机不支持定位
            geoDefer.reject();
        }
    });

    config.$refresh.on('click', function() {
        window.location.reload();
    });

};

exports.initPage = function(config) {
    var curParams = getURIParams();

    var goto = function() {
        window.location.href = window.location.pathname + '?' + $.param(curParams);
    };

    config.$prev.on('click', function(e) {
        e.preventDefault();
        if($(this).hasClass('disable')) {
            return false;
        }
        if(curParams.page) {
            curParams.page -= 1;
        } else {
            curParams.page = 1;
        }

        goto();
    });

    config.$select
        .on('change', function() {
            var val = $(this).val();
            window.location.href = val;
        })
        .on('touchstart touchmove` touchend', function(e) {
            e.stopPropagation();
        });

    config.$next.on('click', function() {
        if($(this).hasClass('disable')) {
            return false;
        }
        if(curParams.page) {
            curParams.page += 1;
        } else {
            curParams.page = 1;
        }
        goto();
    });
};


exports.postList = function(config) {
    var userIds = [];
    config.$imState.each(function() {
        var userId = $(this).data('userId');
        userIds.push(userId);
    });
    userIds.join(',');
    var paramsData = {
        userIds: userIds
    };

    $.getJSON('http://webim.ganji.com/index.php?op=getuserstatuss&callback=?', {data: paramsData},function() {
        //拿到了所有的在线状态
    });


    config.$img.each(function() {
        var offsetTop = $(this).offset().top;
        $(this).data('offsetTop', offsetTop);
    });

    var winHeight = $(window).height();
    var timer = null;
    $(window).on('scroll', function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            var scrollTop = $(window).scrollTop();
            config.$img.each(function() {
                var src = $(this).data('src');
                if(src) {
                    var offsetTop = $(this).data('offsetTop');
                    if(scrollTop + winHeight + 500 > offsetTop) {
                        $(this).attr('src', src);
                        $(this).data('src', '');
                    } else {
                        return false;
                    }
                }
            });
        });
    });

};

exports.init = function () {
    BasePage.init();
    BasePage.responseTouchState();
};
