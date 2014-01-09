seajs.config({
	// Enable plugins
	plugins: ['shim', 'text'],

	// Configure alias
	alias: {
		'jquery': {
			src: './lib/jquery-1.10.2.min.js',
			exports: 'jQuery'
		}
		,
		'appConfig':{
			src: 'app-config.js',
			exports: 'AppConfig'
		},
		'handlebars':{
			src: './lib/handlebars/handlebars.js',
			exports: 'Handlebars'
		},
		'domain':{
			src: 'domain.js',
			exports: 'Domain'
		}
  },
  
  /** 防止缓存的配置 */
  map: [
        [ /^(.*\/js\/.*\.(?:css|js))(?:.*)$/i, '$1?'],
        [ /^(.*\/js\/view\/.*\.(?:css|js))(?:.*)$/i,'$1?'],
        [ /^(.*\/js\/page\/.*\.(?:css|js))(?:.*)$/i,'$1?']
      ]
//  [ /^(.*\/js\/.*\.(?:css|js))(?:.*)$/i,           '$1?'+new Date().getTime() ],
//  [ /^(.*\/js\/view\/.*\.(?:css|js))(?:.*)$/i,     '$1?'+new Date().getTime() ],
//  [ /^(.*\/js\/page\/.*\.(?:css|js))(?:.*)$/i,     '$1?'+new Date().getTime() ]
});
