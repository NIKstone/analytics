var gulp = require('gulp'),
	clean = require('gulp-clean'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename');

	gulp.task("clean", function(){
		return gulp.src(['bin'])
				.pipe(clean());
	});

	gulp.task("script", function(){
		gulp.src(["lib/script/**/*.js"])
			.pipe(jshint())
			.pipe(uglify({
	            mangle: {
	                except: ['require']
	            }
	        }))
			.pipe(rename({ suffix: ".min"}))
			.pipe(gulp.dest("bin"))
	});

	gulp.task("default",['clean'], function(){
		gulp.start("script");
	});