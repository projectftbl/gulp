var watch = require('gulp-watch')
  , lr = require('gulp-livereload');

module.exports = function(gulp, options) {
  gulp.task('files', function () {
    return gulp.src(options.publicDirectory)
    .pipe(gulp.dest(options.distDirectory))
    .pipe(lr());
  });

  gulp.task('files:watch', [ 'files' ], function() {
    lr.listen();
    
    watch(options.publicDirectory, function() {
      gulp.start('files');
    });
  });
};