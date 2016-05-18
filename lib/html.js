var watch = require('gulp-watch')
  , inject = require('gulp-inject')
  , lr = require('gulp-livereload')
  , btoa = require('btoa')

var environment = process.env.NODE_ENV || 'development';

module.exports = function(gulp, options) {
  var html = function() {
    var getAssetFile = function(filename) {
      return [ options.distDirectory, filename ].join('/');
    };

    var processConfig = function(file) {
      var config = JSON.parse(file.contents.toString('utf8'));

      // Remove secrets
      delete config.FACEBOOK.SECRET;
      delete config.TWITTER.SECRET;
      delete config.GOOGLE.SECRET;
      delete config.HTTP.AUTHENTICATE;

      return JSON.stringify(config);
    };

    return gulp.src(options.sourceDirectory + 'index.html')

    // Configuration data
    .pipe(inject(gulp.src('config/' + environment + '.json'), { 
      transform: function(filepath, file) {
        return '<script type="text/javascript">window.config = "' + btoa(processConfig(file)) + '";</script>';
      }
    , name: 'config'
    }))
      
    .pipe(inject(gulp.src([ getAssetFile(options.distFile) ], { read: false }), { ignorePath: 'dist' }))
    
    .pipe(gulp.dest(options.distDirectory))
    .pipe(lr());  
  };

  gulp.task('html', function() {
    return html();
  });

  gulp.task('html:watch', [ 'html' ], function() {
    lr.listen();

    watch([ options.sourceDirectory + 'index.html' ], function() {
      gulp.start('html');
    });
  });
};