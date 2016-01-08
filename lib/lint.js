var eslint = require('gulp-eslint');

module.exports = function(gulp) {
  gulp.task('lint', function() {
    return gulp.src([ 'lib/**/*.js', 'test/**/*.js' ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
  });
};