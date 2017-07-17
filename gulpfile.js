'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');

var src = {
  pug: './src/*.pug',
  scss: {
    styles: './src/scss/styles.scss',
    all: './src/scss/**/*.scss',
  },
  fonts: './src/fonts/**/*.*',
  js: './src/js/**/*.*',
}

var dist = {
  html: './dist/',
  css: './dist/css/',
  js: './dist/js',
}

gulp.task('pug', function() {
  gulp.src(src.pug)
    .pipe(pug().on('error', pugLogger))
    .pipe(gulp.dest(dist.html))
});

gulp.task('scss', function() {
  return gulp.src(src.scss.styles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))    
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist.css));
});

gulp.task('js', function() {
  gulp.src(src.js)
    .pipe(gulp.dest(dist.js))
});


gulp.task('build', ['pug', 'scss', 'js']);

gulp.task('watch', function() {
  gulp.watch(src.pug, ['pug']);
  gulp.watch(src.scss.all, ['scss']);
  gulp.watch(src.js, ['js']);
});

gulp.task('webserver', function() {
  gulp.src(dist.html)
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

function pugLogger(error) {
  console.log(error.toJSON());
}

gulp.task('default', ['watch', 'webserver']);
