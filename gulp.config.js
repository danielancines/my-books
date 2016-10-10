module.exports = function(){
  var build = './build/';
	var index = './app/**/';
	var config = {
		index: index,
		alljs: [
			'./app/**/*.js',
			'./*.js'
		],
    build: build,
		js: [
			'app/controllers/*.js',
			'app/config/config.js',
			'app/services/*.js',
			'app/app.js'
		],
		wiredep: [
			'./app/**/*.module.js',
			'./app/**/*.js',
			'!./app/**/*.spec.js',
			'!./app/data.js',
			'!./app/server.js'

		],
		css:[
			'app/styles/*.css'
		],
		bower: {
			json: require('./bower.json'),
			directory: './bower_components/',
			ignorePath: '../..'
		}
	};

	config.getWiredepDefaultOptions = function (){
		var options = {
			bowerJson: config.bower.json,
			directory: config.bower.directory,
			ignorePath: config.bower.ignorePath
		};
	}

	return config;
};
