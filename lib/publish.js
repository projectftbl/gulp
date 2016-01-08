module.exports = function(gulp) {
  gulp.task('publish', function(done) {
    require('child_process')
    .spawn('npm', [ 'publish' ], { stdio: 'inherit' })
    .on('close', done);
  });
};