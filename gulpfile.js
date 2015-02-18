var gulp = require('gulp');
var browserify = require('browserify');
var concat = require('gulp-concat');
var shell = require('gulp-shell');
var rename = require('gulp-rename');
var bower = require('gulp-bower');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var paths = {
  scripts: ['public/**/*.js'],
  html: ['public/**/*.html'],
  server: ['server/**/*.js'],
  test: ['specs/**/*.js']
};


gulp.task('copy', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest('dist/'));
})

gulp.task('clean', function () {
  return gulp.src(['dist/js', 'dist/index.html'], {read: false})
    .pipe(clean());
});


gulp.task('compile', function(){
  var b = browserify();
  b.transform(reactify); 
  b.add('./public/js/main.js');
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('compress', function() {
  gulp.src('./dist/js/*.js')
    .pipe(uglify('main.min.js'))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('run', shell.task([
  'cd server && nodemon server.js'
]));

// gulp.task('build', ['clean', 'compile', 'copy']);
gulp.task( 'build', function(callback) {
  runSequence('clean', 'compile', 'copy', callback); 
});

// gulp.task('default', ['build', 'watch', 'run']);
gulp.task( 'default', function(callback) {
  runSequence('build', 'watch', 'run', callback);
});

gulp.task('watch', function() {
  gulp.watch('public/**/*.*', ['build']);
});


