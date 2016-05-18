var webpack = require('webpack-stream')
  , lr = require('gulp-livereload')
  , error = require('./webpack/error')
  , config = require('./webpack/config')

module.exports = function(gulp, options) {
  var build = function(watch) {
    config.watch = watch;
    config.output = { filename: options.distFile };

    return gulp.src(options.sourceDirectory + options.distFile)
    .on('error', error)
    .pipe(webpack(config))
    .pipe(gulp.dest(options.distDirectory))
    .pipe(lr());
  };

  gulp.task('webpack', function() {
    return build(false);
  });

  gulp.task('webpack:watch', function() {
    lr.listen();
    return build(true);
  });
};