module.exports = function(gulp, options) {
  gulp.task('publish', function(done) {
    require('child_process')
    .spawn('npm', [ 'publish' ], { stdio: 'inherit' })
    .on('close', done);
  });
};