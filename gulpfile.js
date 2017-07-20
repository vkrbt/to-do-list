'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var minify = require('gulp-minify');

var src = {
  pug: './src/*.pug',
  scss: {
    styles: './src/scss/styles.scss',
    all: './src/scss/**/*.scss',
  },
  fonts: './src/fonts/**/*.*',
  js: './src/js/**/*.*',
  lib: [
    'node_modules/jquery/dist/jquery.min.js',
  ],
  fonts: './src/fonts/**/*.*',
}

var dist = {
  html: './dist/',
  css: './dist/css/',
  js: './dist/js',
  fonts: './dist/fonts',
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
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist.css));
});

gulp.task('js', function() {
  gulp.src(src.js)
    .pipe(concat('index.js'))
    .pipe(minify({
      ext: {
        src: '-debug.js',
        min: '.js'
      }
    }))
    .pipe(gulp.dest(dist.js));
  src.lib.forEach(function(item) {
    gulp.src(item)
      .pipe(gulp.dest(dist.js))
  })
});

gulp.task('fonts', function() {
  gulp.src(src.fonts)
    .pipe(gulp.dest(dist.fonts))
});

gulp.task('build', ['pug', 'scss', 'js', 'fonts']);

gulp.task('watch', function() {
  gulp.watch(src.pug, ['pug']);
  gulp.watch(src.scss.all, ['scss']);
  gulp.watch(src.js, ['js']);
  gulp.watch(src.fonts, ['fonts']);
});

gulp.task('webserver', function() {
  gulp.src(dist.html)
    .pipe(webserver({
      host: 'localhost',
      port: 8000,
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

function pugLogger(error) {
  console.log(error.toJSON());
}

gulp.task('default', ['watch', 'webserver']);