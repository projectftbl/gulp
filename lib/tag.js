var path = require('path')
  , git = require('gulp-git');

module.exports = function(gulp) {
  var getVersion = function() {
    var pkg = require(path.join(process.cwd(), 'package.json'));
    return pkg.version;
  };

  var commit = function(done) {
    var version = 'v' + getVersion()
      , message = 'Bump to ' + version;

    gulp.src('./package.json')
    .pipe(git.add())
    .pipe(git.commit(message))
    .on('end', done);
  };

  var tag = function() {
    var version  = 'v' + getVersion()
      , message = 'Release ' + version;

    git.tag(version, message, function(err) {
      if (err) throw err;

      git.push('origin', version);
    });
  };

  gulp.task('tag', [ 'tag:patch' ]);

  gulp.task('tag:patch', [ 'bump:patch' ], function() {
    commit(tag.bind(null, 'patch'));
  });

  gulp.task('tag:minor', [ 'bump:minor' ], function() {
    commit(tag.bind(null, 'minor'));
  });

  gulp.task('tag:major', [ 'bump:major' ], function() {
    commit(tag.bind(null, 'major'));
  });
};