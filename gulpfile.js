const gulp = require('gulp')
const twig = require('gulp-twig')
const imagemin = require('gulp-imagemin')
const stylus = require('gulp-stylus')
const minifyjs = require('gulp-js-minify')
const babel = require('gulp-babel')
const handlebars = require('gulp-handlebars')
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const source = require('vinyl-source-stream')
const hbsfy = require('hbsfy')
const iconfont   = require('gulp-iconfont')
const iconfontCss = require('gulp-iconfont-css')

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

gulp.task('script', function () {
  var b = browserify({
    entries: 'app/main.js',
    debug: true
  })
  return b.transform(hbsfy).bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(babel({presets: ['env']}))
    .pipe(minifyjs())
    .pipe(gulp.dest('./dist/js/'))
})

gulp.task('iconfont', function () {
  return gulp.src('./app/images/*.svg')
    .pipe(iconfontCss({
      fontName: 'iconfont',
      targetPath: '../style/iconfont.styl',
      fontPath: '../../app/fonts/',
      cssClass:'icons'
    }))
    .pipe(iconfont({
      fontName: 'iconfont',
      formats: ['ttf', 'eot', 'woff', 'woff2'],
      prependUnicode: false,
      normalize: true,
      fontHeight: 1001,
      centerHorizontally: true
    })).pipe(gulp.dest('./app/fonts'))
})

gulp.task('default', ['compile', 'images', 'css', 'script','iconfont'])
gulp.watch('app/**', ['css', 'compile', 'script'])
