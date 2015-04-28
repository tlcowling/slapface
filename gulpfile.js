var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');


var runSequence = require('run-sequence');    // Temporary solution until gulp 4
                                              // https://github.com/gulpjs/gulp/issues/355

var pkg = require('./package.json');
var dirs = pkg['slapface-server'].directories;


gulp.task('clean', function (done) {
    require('del')([
        dirs.dist
    ], done);
});


gulp.task('lint:js', function () {
    return gulp.src([
        'gulpfile.js',
        dirs.src + '/js/*.js',
        dirs.test + '/*.js'
    ])
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jshint.reporter('fail'));
});


// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

gulp.task('test', function () {
    return gulp.src('spec/**/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('build', function (done) {
    runSequence(
        ['clean', 'lint:js'],
    done);
});

gulp.task('default', ['build']);
