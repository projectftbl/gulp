## Gulch

Common gulp tasks.

### Usage

In `gulpfile.js`:

```javascript
var gulp = require('gulp');

require('gulch');

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

Run mocha tests:

```
gulp test
```
