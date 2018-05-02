const gulp = require('gulp')
const twig = require('gulp-twig')
const imagemin = require('gulp-imagemin')


gulp.task('compile', () => {
  'use strict'
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


gulp.task('default', ['compile', 'images'])
