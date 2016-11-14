## @recipher/gulp

Common gulp tasks.

### Usage

In `gulpfile.js`:

```javascript
var gulp = require('gulp');

require('@recipher/gulp')(gulp);

gulp.task('default', [ 'test' ]);
```

### Bump

Bump version number:

```
gulp bump:patch
gulp bump:minor
gulp bump:major
```

### Tag

Tag the release:

```
gulp tag:patch
gulp tag:minor
gulp tag:major
```

### Publish

Publish to npm:

```
gulp publish
```

### Release

Bump the version, then tag and publish the release:

```
gulp release:patch
gulp release:minor
gulp release:major
```

### Test

Tests are assumed to be in the test/unit and test/integration folders.

Run mocha tests:

```
gulp test
gulp test:unit
gulp test:integration
```

To watch tests:

```
gulp test:watch
```

To override options, in your gulpfile.js, provide an options hash as the second parameter in the setup function call.

```javascript
require('@recipher/gulp')(gulp, {
  'test:unit': {
  	setup: require('./test/unit/setup')
  }
, 'test:integration': {
  	setup: require('./test/integration/setup')
  }
});
```

