var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    prefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel');

    gulp.task('styles', () => {
        return sass('plugin/styles/sass/**/*.scss', {
            style: 'compressed'
        })
                .pipe(prefix({
                  browsers: ['last 2 versions'],
                  cascade: false
                }))
                .pipe(gulp.dest('plugin/styles/css'));
    });

    gulp.task('ecmascript', () => {
        return gulp.src('plugin/scripts/es/**/*.js')
        .pipe(babel({
            presets:['es2015']
        }))
        .pipe(gulp.dest('plugin/scripts/js'))
    })

    gulp.task('watch', () => {
        gulp.watch('plugin/styles/sass/**/*.scss', ['styles']);
        gulp.watch('plugin/scripts/es/**/*.js', ['ecmascript']);
    });

    gulp.task('default', ['ecmascript', 'styles' , 'watch']);
