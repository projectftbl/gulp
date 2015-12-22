var bump = require('gulp-bump');

module.exports = function(gulp, options) {
  var bumpVersion = function(type) {
    return gulp.src('./package.json')
    .pipe(bump({ type: type }))
    .pipe(gulp.dest('./'));
  };

  gulp.task('bump', [ 'bump:patch' ]);
   
  gulp.task('bump:patch', bumpVersion.bind(null, 'patch'));
  gulp.task('bump:minor', bumpVersion.bind(null, 'minor'));
  gulp.task('bump:major', bumpVersion.bind(null, 'major'));
};