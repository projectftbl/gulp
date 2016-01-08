var _ = require('lodash')
  , mocha = require('gulp-mocha')
  , istanbul = require('gulp-istanbul')
  , env = require('gulp-env');

var onError = function(err) {
  log(err);
  process.exit(1);
};

var onEnd = function() {
  process.exit();
};

var noOp = function() {
  // No op
};

var log = function(err) {
  /* eslint no-console: 0 */
  console.log(err);
};

module.exports = function(gulp, options) {
  var opts = _.assign({ globals   : [ ]
                      , reporter  : 'spec'
                      , ui        : 'bdd'
                      , growl     : true
                      , recursive : true
                      , timeout   : 1000
                      , coverage  : 80
                      }, options);

  var test = function(folder, options) {
    env({ vars: { NODE_ENV: process.env.NODE_ENV || 'test' }});

    return gulp.src(folder)
    .pipe(mocha(opts))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: opts.coverage } }))
    .once('error', options && options.watch ? log : onError)
    .once('end', options && (options.watch || options.continue) ? noOp : onEnd);
  };

  gulp.task('test:coverage', function () {
    return gulp.src([ 'lib/**/*.js' ])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
  });

  gulp.task('test:unit', function() {
    return test('./test/unit/**/*.js');
  });

  gulp.task('test:integration', function() {
    return test('./test/integration/**/*.js');
  });

  gulp.task('test', [ 'test:coverage' ], function() {
    return test('./test/**/*.js');
  });

  gulp.task('test:release', [ 'test:coverage' ], function() {
    return test('./test/**/*.js', { continue: true });
  });

  gulp.task('test:watch', [ 'test:coverage' ], function() {
    gulp.watch([ 'lib/**/*.js', 'test/unit/**/*.js', 'test/integration/**/*.js' ], function() {
      test('./test/**/*.js', { watch: true });
    });
  });
};