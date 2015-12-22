var gulp = require('gulp')
  , requireDir = require('require-dir');

var tasks = requireDir('./lib', { recurse: false });

for(var key in tasks) {
  tasks[key](gulp);
}