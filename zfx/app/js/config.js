
seajs.config({
	// Enable plugins
	plugins: ['shim', 'text'],
base:"./js",
	// Configure alias
	alias: {
		'jquery': {
			src: './lib/jquery-1.10.2.min.js',
			exports: 'jQuery'
		},
		'flot': "./lib/jquery.flot.min.js",
		'flot.pie': "./lib/jquery.flot.pie.min.js",
		'flot.time': "./lib/jquery.flot.time.min.js",
		'excanvas': "./lib/excanvas.js",
		/*lib/jquery.flot.min.js*/
		'appConfig':{
			src: 'app-config.js',
			exports: 'AppConfig'
		},
		'handlebars':{
			src: './lib/handlebars/handlebars.js',
			exports: 'Handlebars'
		},
		"domain":"domain.js",
		'events':{
			src:'utils/events.js',
			exports:'Events'
		}
  },
  
  /** 防止缓存的配置 */
  map: /*[
        [ /^(.*\/js\/.*\.(?:css|js))(?:.*)$/i, '$1?'],
        [ /^(.*\/js\/view\/.*\.(?:css|js))(?:.*)$/i,'$1?'],
        [ /^(.*\/js\/page\/.*\.(?:css|js))(?:.*)$/i,'$1?']
      ]*/
	[
	 [ /^(.*\/js\/.*\.(?:css|js))(?:.*)$/i,           '$1?'+new Date().getTime() ],
	 [ /^(.*\/js\/view\/.*\.(?:css|js))(?:.*)$/i,     '$1?'+new Date().getTime() ],
	 [ /^(.*\/js\/page\/.*\.(?:css|js))(?:.*)$/i,     '$1?'+new Date().getTime() ]
	] 
});

