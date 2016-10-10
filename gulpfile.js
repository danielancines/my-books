var gulp = require('gulp');
var del = require('del');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy:true});

gulp.task('test', function(){
  console.log('Hello World');
});

gulp.task('clean-build', function(done){
  log('Cleaning');
  clean(config.build, done);
  log('End Cleaning');
});

gulp.task('wiredep', function(){
  var options = config.getWiredepDefaultOptions();
  var wiredep = require('wiredep').stream;

  return gulp.src('./app/index.html')
         .pipe(wiredep(options))
         .pipe($.inject(gulp.src(config.wiredep)))
         .pipe(gulp.dest('./app/'));
});

gulp.task('build', ['clean-build'], function(){
  var jsFilter = $.filter(config.js, {restore: true});
  var cssFilter = $.filter(config.css, {restore: true});
  log('Resolving injections ' + config.build);

  return gulp.src(config.index)
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify().on('error', log))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore)
        .pipe(gulp.dest(config.build));
});

function clean(path, done){
	log('Cleaning: ' + $.util.colors.blue(path));
	del(path).then(done());
}

function log(msg){
	if (typeof(msg) === 'object'){
		for (var item in msg){
			if (msg.hasOwnProperty(item)){
				$.util.log($.util.colors.blue(msg[item]));
			}
		}
	} else {
		$.util.log($.util.colors.blue(msg));
	}
}
