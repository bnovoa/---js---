var $ = require('$');
var AutoComplete = require('com/mobile/lib/autocomplete/autocomplete.js');
var Widget = require('com/mobile/lib/widget/widget.js');
var Storage = require('com/mobile/lib/storage/storage.js');

module.exports = Widget.define({
    events: {
        'tap [data-role="key"]': function(e) {
            this.search($(e.currentTarget).parent().data('keyword'));
        },
        'touchend [data-role="key"],[data-role="add"],[data-role="hide"],[data-role="clear"]': function(e) {
            e.preventDefault();
        },
        'submit form': function(e) {
            var keyword = this.config.$input.val();
            if (!keyword) {
                e.preventDefault();
                this.search(this.config.defaultKeyword);
            }

            this.setHistory(this.config.$input.val());
        },
        'tap [data-role="close"]': function() {
            this.config.$input.val('');
            this.hideSuggestion();
        },
        'tap [data-role="add"]': function(e) {
            var $input = this.config.$input;
            var keyword = $(e.currentTarget).parent().data('keyword');
            $input.val(keyword);

            this.autocomplete.trigger('change');
        },
        'tap [data-role="hide"]': function() {
            this.hideSuggestion();
        },
        'tap [data-role="clear"]': function() {
            this.clearHistory();
        },
        'focus [data-role="input"]': function() {
            $('body').removeClass('header-fixed');
            if (this.config.$input.val()) {
                this.config.$close.show();
            } else {
                this.config.$close.hide();
            }
            this.config.$input.attr('placeholder','');
        },
        'blur [data-role="input"]': function() {
            this.config.$close.hide();
            if (this.wasHeaderFixed) {
                $('body').addClass('header-fixed');
            }
            this.config.$input.attr('placeholder',this.config.defaultKeyword);
        },
        'input [data-role="input"]': function() {
            if (this.config.$input.val()) {
                this.config.$close.show();
            } else {
                this.config.$close.hide();
            }
        }
    },
    init: function(config) {
        var self = this;
        this.storage = new Storage('autocomplete');
        this.config = config;
        this.isInList = this.config.isInList || false;
        this.wasHeaderFixed = $('body').hasClass('header-fixed');

        this.autocomplete = new AutoComplete({
            $input: this.config.$input,
            getData: function(query, callback) {
                if (query) {
                    $.getJSON(config.autocompleteUrl, {
                        keyword: query
                    })
                        .done(function(data) {

                            var matchQuery = self.matchLocalData(query, self.storage.get('history') || []);
                            var myData = data;
                            if (matchQuery) {
                                myData = self.filter(matchQuery.text, data);
                                myData.unshift(matchQuery);
                            }
                            callback(myData.slice(0,6));
                        });
                } else {
                    callback(self.storage.get('history') || []);
                }
            }
        });

        this.autocomplete
            .on('data', function (data) {
                self.showSuggestion(self.config.$input.val(), data);
            })
            .on('empty', function () {
                self.hideSuggestion();
            });
    },
    showSuggestion: function(query, data) {
        var self = this;
        if (self.isInList) {
            data = data.slice(0, 5);
        }
        var html = data.map(function(row) {
            return self.formatItem(query, row);
        }).join('');
        if (!html) {
            this.hideSuggestion();
        } else {
            if (self.isInList && query) {
                html += '<li class="js-touch-state" data-keyword="' + query + '"><a href="'+self.config.searchGlobalUrl+'&&?keyword='+query+'" class="fc-gray">在全站中搜索“' + query + '”</a></li>';
            }
            if (!query) {
                this.config.$suggestion.html(html + '<li class="sug-empty js-touch-state"><span data-role="clear" class="fc-50">清除历史记录</span><span data-role="hide" class="sug-close">关闭</span></li>');
            } else {
                this.config.$suggestion.html(html + '<li class="sug-empty js-touch-state"><span data-role="hide" class="sug-close">关闭</span></li>');
            }
            this.config.$el.addClass('active');
        }
    },
    matchLocalData: function(query, localData) {
        var result;
        var regex = new RegExp('^' + query,'i');
        var data = localData.reverse();
        data.forEach(function(item) {
            if (regex.test(item.text)) {
                result = item;
                return;
            }
        });
        return result;
    },
    filter: function(query, arry) {
        var myArr = arry || [];
        var resultData = [];
        myArr.forEach(function(item) {
            if (query !== item.text) {
                resultData.push(item);
            }
        });
        return resultData;
    },
    formatItem: function(query, row) {
        var html = '';
        var tem = row.text;
        var term = tem.replace(new RegExp('^(' + query + ')', 'g'), '');
        if (query && term !== row.text && row._source !== 'localStorage') {
            tem = row.text.replace(new RegExp('(' + term + ')', 'g'), '<b>$1</b>');
        }
        if (row._source === 'localStorage') {
            html = '<li  class="js-touch-state" data-keyword="{{keyword}}"><span data-role="key" class="sug-title fc-green">{{tem}}</span><span data-role="add" class="sug-add">+</span></li>'
                .replace(/\{\{keyword\}\}/g, row.text)
                .replace(/\{\{tem\}\}/g, tem);
        } else {
            html = '<li class="js-touch-state" data-keyword="{{keyword}}"><span data-role="key" class="sug-title">{{tem}}</span><span class="sug-num">约{{count}}条</span><span data-role="add" class="sug-add">+</span></li>'
                .replace(/\{\{keyword\}\}/g, row.text)
                .replace(/\{\{tem\}\}/g, tem)
                .replace(/\{\{count\}\}/g, row.count);
        }
        return html;
    },
    hideSuggestion: function() {
        this.config.$el.removeClass('active');
    },
    search: function(keyword) {
        this.config.$input.val(keyword);
        this.config.$form.submit();
    },
    setHistory: function(keyword) {
        var arr = this.storage.get('history') || [];
        var myArr = [];
        myArr = this.filter(keyword, arr);
        myArr.unshift({
            text: keyword,
            _source: 'localStorage'
        });
        this.storage.set('history', myArr.slice(0, 6));
    },
    clearHistory: function() {
        var self = this;
        self.config.$suggestion.html('');
        self.hideSuggestion();
        self.autocomplete.cache = [];
        self.storage.clear();
    }
});