/* File: gulpfile.js */

// grab our gulp packages
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    gutil = require('gulp-util'),
    del = require('del'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create();
/*
Original in here:
https://markgoodyear.com/2014/01/getting-started-with-gulp/
*/


// Styles
gulp.task('styles', function() {
  return gulp.src('src/scss/**/*.scss')
  	.pipe(sass())
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/jsx/**/*.jsx')
  	.pipe(babel({
			presets: ['es2015', 'react']
		}))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'));
});

// Clean
gulp.task('clean', function() {
  return del(['dist/css', 'dist/js', 'dist/images']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/scss/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/jsx/**/*.jsx', ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  browserSync.init({
        server: {
            baseDir: "./"
        }
    });

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', browserSync.reload);

});