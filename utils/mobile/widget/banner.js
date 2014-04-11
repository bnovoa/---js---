var $ = require('$');
var _ = require('com/mobile/lib/underscore/underscore.js');
var Widget = require('com/mobile/lib/widget/widget.js');
var SlideWidget = require('./slide.js');

module.exports = SlideWidget.extend({
    events: {
        'click [data-role="item"]': function() {
            if ($('#big-img-box').length === 0) {
                this.appendSlideShow();
            } else {
                this.reopenSliceShow();
            }
        },
        'touchstart [data-role="item"]': function (e) {
            this.stop();
            this.startX = e.touches[0].clientX;
        },
        'touchend [data-role="item"]': function () {
            if (this.maxMoveDist > 10) {
                this.maxMoveDist = 0;
                this[this.direction]();
            }
            this.loop();
        },
        'touchmove [data-role="item"]': function (e) {
            var touch = e.touches[0];
            var $list = this.config.$list;
            var dist = touch.clientX - this.startX;

            if (this.maxMoveDist < Math.abs(dist)) {
                this.maxMoveDist = Math.abs(dist);
            }

            if (Math.abs(dist) > this.width || this.maxMoveDist < 10) {
                return;
            } else {
                e.preventDefault();
            }

            $list.css($.fx.cssPrefix + 'transform', 'translate3d('+(this.translateX + dist)+'px, 0, 0)');
            this.direction = dist < 0 ? 'next' : 'prev';
        }
    },
    init: function (config) {
        var $item = config.$item;
        config.interval = config.interval || 1000;
        this.config = config;
        this.index = 0;
        this.total = $(config.$item).length;
        this.loop();
        this.width = this.config.$item.width();
        this.config.$list.width((this.total + 2)*this.width);
        this.translateX = 0;
        this.direction = 'next';
        this.maxMoveDist = 0;
        var $lastClone = $item.eq(this.total - 1).clone();
        var $firstClone = $item.eq(0).clone();
        $lastClone.css({
            'position': 'relative',
            'left': -1 * (this.total + 2) * this.width
        });


        $([
            $item.eq(0).find('img[data-src]'),
            $firstClone.find('img[data-src]'),
            $lastClone.find('img[data-src]')
        ]).each(function () {
            var $this = $(this);
            $this.attr('src', $this.data('src'));
        });

        this.config.$list.append($firstClone).append($lastClone);
    },
    reopenSliceShow: function() {
        var index = parseInt(this.index);

        Widget.ready('#big-img-box', function(widget) {
            widget.reopen(index);
        });
    },
    appendSlideShow: function() {
        var $body = $('body');
        var itemList = this.config.$item;
        var index = this.index;
        var tmpl = '' +
            '<div id="big-img-box" data-init-index="<%= index %>" data-widget="com/mobile/widget/slideshow.js">' +
                '<div class="caption">' +
                    '<span id="bigIndex" data-role="index"><%= index %></span>/<%= srcList.length %>张<i class="close" data-role="close"></i>' +
                '</div>' +
                '<div class="big-img-body">'+
                    '<ul class="slide-area clear" data-role="list">' +
                        '<% _.each(srcList, function(item) { %>' +
                            '<li data-role="item" style="width: <%= fixWidth %>px;">' +
                                '<img src="<%= item %>" style="width: <%= fixWidth %>px;">' +
                            '</li>' +
                        '<% }) %>' +
                    '</ul>' +
                '</div>'+
            '</div>';
        var compiled = _.template(tmpl, {
            fixWidth: $body.width(),
            index: index,
            srcList: (function() {
                var list = [];

                _.each(itemList, function(item) {
                    list.push( $(item).find('img').attr('data-big-image') );
                });

                return list;
            }())
        });
        var $box = $(compiled);

        $body.append($box);
        Widget.initWidget($box);
    },
    slideFn: function (index, direction) {
        var self = this;
        var defer = $.Deferred();
        var delt = index - this.index;
        var $list = this.config.$list;
        var total = this.total;
        var width = this.width;
        // lazy load
        $([
            this.config.$item.eq(index).find('img[data-src]'),
            this.config.$item.eq(index + 1).find('img[data-src]')
        ]).each(function () {
            var $this = $(this);
            if ($this.data('src') && $this.attr('src') !== $this.data('src')) {
                $this.attr('src', $this.data('src'));
            }
        });

        if (direction === 'prev' && delt > 0) {
            delt = delt - total;
        }

        if (direction === 'next' && delt < 0) {
            delt = delt + total;
        }
        this.translateX += -1 * delt * width;
        $list.animate({
            translate3d: this.translateX + 'px, 0, 0'
        }, 300 ,function () {
            if (self.index === 0 && index === total - 1 && direction === 'prev') {
                self.translateX = -1 * (total - 1) * width;
                $list.css($.fx.cssPrefix + 'transform', 'translate3d(' + self.translateX + 'px, 0, 0)');
            } else if (self.index === total - 1 && index === 0 && direction === 'next') {
                self.translateX = 0;
                $list.css($.fx.cssPrefix + 'transform', 'translate3d(' + self.translateX + 'px, 0, 0)');
            }
            defer.resolve();
        });

        this.config.$el.find('[data-slide-to]')
            .removeClass('active')
            .filter('[data-slide-to="' + index + '"]')
                .addClass('active');

        this.config.$el.find('[data-role="index"]').text(index + 1);

        return defer.promise();
    }
});