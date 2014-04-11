var $ = require('$');
var BannerWidget = require('com/mobile/widget/banner.js');

module.exports = BannerWidget.extend({
    events: {
        'click [data-role="close"]': function(e) {
            var self = this;
            e.preventDefault();
            self.config.$el.hide();
            this.showBottom();
        }
    },
    init: function(config) {
        this.super_.init.call(this, config);
        this.config = config;
        this.super_.stop();
        if (config.initIndex) {
            this.slideTo(parseInt(config.initIndex));
        }
        this.config.$bottomPanel = $('.fixed-conn');
        this.hideBottom();
    },
    reopen: function(index) {
        this.config.$el.show();
        this.slideTo(index);
        this.hideBottom();
    },
    showBottom: function() {
        this.config.$bottomPanel.show();
    },
    hideBottom: function() {
        this.config.$bottomPanel.hide();
    },
    loop: function () {
    }
});