const gulp = require('gulp')
const twig = require('gulp-twig')


gulp.task('compile', () => {
    'use strict'
    return gulp.src('./app/templates/index.twig')
        .pipe(twig({
            data: {
              title: 'Gulp and Twig',
              benefits: ['Fast','Flexible','Secure']
            }
        }))
        .pipe(gulp.dest('./'))
});



gulp.task('default', ['compile'])
