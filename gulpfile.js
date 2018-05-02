const gulp = require('gulp')
const twig = require('gulp-twig')
const imagemin = require('gulp-imagemin')
const stylus = require('gulp-stylus')
const minifyjs = require('gulp-js-minify')
const babel = require('gulp-babel')
const handlebars = require('gulp-handlebars')
const browserify = require('browserify')
const buffer      = require('vinyl-buffer')
const gutil       = require('gulp-util')
const source      = require('vinyl-source-stream')
const sourcemaps  = require('gulp-sourcemaps')
const uglify      = require('gulp-uglify')
const hbsfy = require('hbsfy');


gulp.task('compile', () => {
  return gulp.src('./app/templates/index.twig')
    .pipe(twig({
      data: {
        title: 'Gulp and Twig',
        benefits: ['Fast','Flexible','Secure']
      }
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('images', () => {
  return gulp.src('./app/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('./dist/images'))
})

gulp.task('css', function () {
  return gulp.src('./app/style.styl')
    .pipe(stylus({compress:true}))
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('bundle', function () {
  var b = browserify({
    entries: 'app/main.js',
    debug: true
  });

  return b.transform(hbsfy).bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(babel({presets: ['env']}))
    .pipe(minifyjs())
    .pipe(gulp.dest('./dist/js/'))
})

gulp.task('default', ['compile', 'images', 'css', 'bundle'])
gulp.watch('app/**', ['css', 'compile', 'bundle'])
