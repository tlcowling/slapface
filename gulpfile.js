var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglifyjs');
var del = require('del');

var runSequence = require('run-sequence');    // Temporary solution until gulp 4
                                              // https://github.com/gulpjs/gulp/issues/355
var pkg = require('./package.json');
var dirs = pkg['slapface-server'].directories;


gulp.task('clean', function () {
    del ([
        dirs.dist
    ], {force: true});
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

gulp.task('dist', [ 'compress:configs', 'compress:server', 'compress:lib']);

gulp.task('compress:configs', function() {
    return gulp.src(['config.json', 'package.json'])
        .pipe(gulp.dest('dist'));
});

gulp.task('compress:server', function() {
    return gulp.src('server.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('compress:lib', function() {
    return gulp.src('lib/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('test', function () {
    return gulp.src('spec/**/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('build', function (done) {
    runSequence(
        ['clean', 'lint:js', 'dist'],
    done);
});

gulp.task('default', ['build']);

