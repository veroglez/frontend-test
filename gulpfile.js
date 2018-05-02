const gulp = require('gulp')
const twig = require('gulp-twig')
const imagemin = require('gulp-imagemin')
const stylus = require('gulp-stylus')
const minifyjs = require('gulp-js-minify')
const babel = require('gulp-babel')
const browserify = require('gulp-browserify')


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

gulp.task('script', () =>
  gulp.src('app/main.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : !gulp.env.production
    }))
    .pipe(babel({presets: ['env']}))
    .pipe(minifyjs())
    .pipe(gulp.dest('./dist/js'))
)

gulp.task('default', ['compile', 'images', 'css', 'script'])
gulp.watch('app/**', ['css', 'compile', 'script'])
