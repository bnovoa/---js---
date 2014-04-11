G.config({
    alias: {
        'zepto': 'com/mobile/lib/zepto/zepto.cmb.js',
        '$': 'com/mobile/lib/zepto/zepto.cmb.js',
        'underscore': 'com/mobile/lib/underscore/underscore.js'
    }
});

if (/\.ganji\.com$/.test(window.location.host)) {
    document.domain = 'ganji.com';
}
