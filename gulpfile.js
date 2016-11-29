'use strict';

var gulp = require('gulp'),
    concatCSS = require('gulp-concat-css'),
    notify = require("gulp-notify"),
    jshint = require('gulp-jshint'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require("gulp-concat"),
    sourcemaps = require('gulp-sourcemaps'),
    imageop = require('gulp-image-optimization'),
    include = require('gulp-html-tag-include');

// paths
//-----------------------------------------------------------------------------------
var paths = {
    templates: "dev/templates/",
    sass: "dev/sass/",
    css: "css/",
    fonts: "css/fonts/",
    js: "js/",
    chunks: "dev/chunks/",
    jsDev: "dev/js/"
};


// connect livereload
//-----------------------------------------------------------------------------------
gulp.task('web-server', function() {
    connect.server({
        livereload: true
    });
});


// Chunks
//-----------------------------------------------------------------------------------
gulp.task('html-include', function() {
    return gulp.src(paths.templates + '*.html')
        .pipe(include())
        .pipe(gulp.dest(''))
        .pipe(connect.reload());
});


// Работа с CSS
//-----------------------------------------------------------------------------------
gulp.task('css', function() {
    return gulp.src(paths.css + 'plugins/*.css')
        .pipe(sourcemaps.init())
          .pipe(concatCSS('libs.css'))
          .pipe(autoprefixer('last 15 versions'))
          .pipe(minifyCSS(''))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.css))
        .pipe(connect.reload());
});


// Работа с SASS
//-----------------------------------------------------------------------------------
gulp.task('sass', function() {
    return gulp.src(paths.sass + 'style.sass')
        .pipe(sourcemaps.init())
          .pipe(sass.sync().on('error', sass.logError))
          .pipe(autoprefixer('last 15 versions'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.css))
        .pipe(connect.reload())
        .pipe(notify({
            title: 'Task Complete',
            message: 'Development task finished running',
            wait: true,
            onLast: true
        }));

});

// Lint Task common.js
gulp.task('lint', function() {
    return gulp.src(paths.js + 'common.js')
        .pipe(sourcemaps.init())
          .pipe(jshint())
        .pipe(sourcemaps.write())
        .pipe(connect.reload());
});

// Работа с JS
//-----------------------------------------------------------------------------------

gulp.task('js-libs', function() {
    return gulp.src([paths.jsDev + 'jquery-1.11.3.min.js', paths.jsDev + 'lib/*.js'])
        .pipe(sourcemaps.init())
          .pipe(concat('libs.js'))
          .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js))
        .pipe(connect.reload());
});

gulp.task('js-core', function() {
    return gulp.src(paths.jsDev + 'core/*.js')
        .pipe(sourcemaps.init())
          .pipe(concat('core.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js))
        .pipe(connect.reload());
});


// Смотрим за изминением
//-----------------------------------------------------------------------------------
gulp.task('watch', function() {
    gulp.watch(paths.templates + '*.html', ['html-include']);
    gulp.watch(paths.chunks + '*.html', ['html-include']);
    gulp.watch(paths.sass + '**/*.sass', ['sass']);
    gulp.watch(paths.jsDev + '**/*.js', ['js-libs', 'js-core']);
    gulp.watch(paths.js + 'common.js', ['lint']);
    gulp.watch(paths.css + 'plugins/*.css', ['css']);
});


// production task
//-----------------------------------------------------------------------------------
gulp.task('copy-css', function() {
    return gulp.src('css/*.css')
        .pipe(autoprefixer('last 15 versions'))
        .pipe(minifyCSS(''))
        .pipe(gulp.dest('production/css'));
});

gulp.task('copy-fonts', function() {
    return gulp.src(paths.fonts + '**/*.{ttf,woff,woff2,eof,svg}')
        .pipe(gulp.dest('production/css/fonts'));
});

gulp.task('copy-js', function() {
    return gulp.src(paths.js + '*.js')
        .pipe(gulp.dest('production/js'));
});

gulp.task('copy-img', function(cb) {
    gulp.src('images/**/*')
    .pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('production/images')).on('end', cb).on('error', cb);
});


gulp.task('copy-html', function() {
    return gulp.src(paths.templates + '*.html')
        .pipe(include())
        .pipe(gulp.dest('production/'));
});


gulp.task('default', ['html-include', 'sass', 'css', 'js-libs', 'js-core', 'web-server', 'watch']);

gulp.task('production', ['copy-css', 'copy-fonts', 'copy-js', 'copy-img', 'copy-html']);
