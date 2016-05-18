module.exports = function(gulp) {
  gulp.task('watch', [ 'webpack:watch', 'files:watch', 'html:watch' ]);
};