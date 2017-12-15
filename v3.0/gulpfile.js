var gulp = require('gulp'),
    clean = require('gulp-clean'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');
replace = require('gulp-replace');

gulp.task("clean", function() {
    return gulp.src(['bin'])
        .pipe(clean());
});

gulp.task("script", function() {
    gulp.src(["lib/**/*.js"])
        .pipe(jshint())
        .pipe(uglify({
            mangle: {
                except: ['require']
            }
        }))
        .pipe(replace('51xiyou', '52xiyou'))
        .pipe(replace('xiyouence_test.com', 'xiyouence.com'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("bin"))
});

gulp.task("default", ['clean'], function() {
    gulp.start("script");
});