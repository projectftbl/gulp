var sequence = require('run-sequence');

var release = function(type) {
  return sequence('test:release', 'check');
};

module.exports = function(gulp, options) {
  gulp.task('check', function() {
    console.error('!!!');
  });

  gulp.task('release', [ 'release:patch' ]);

  gulp.task('release:patch', release.bind(null, 'patch'));
  gulp.task('release:minor', release.bind(null, 'minor'));
  gulp.task('release:major', release.bind(null, 'major'));
};