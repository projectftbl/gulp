var gulp = require('gulp')
  , requireDir = require('require-dir');

var tasks = requireDir('./lib', { recurse: false });

module.exports = function(gulp, options) {
  var opts = options || {};
  for(var key in tasks) {
    tasks[key](gulp, opts[key]);
  }
};
