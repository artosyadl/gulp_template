'use strict';

var gulp = require('gulp'),
    concatCSS = require('gulp-concat-css'),
    rename = require('gulp-rename'),
    notify = require("gulp-notify"),
    jshint = require('gulp-jshint'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    uncss = require('gulp-uncss'),
    uglify = require('gulp-uglify'),
    concat = require("gulp-concat"),
    sourcemaps = require('gulp-sourcemaps'),
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
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.css))
        .pipe(notify({
            title: 'Task Complete',
            message: 'Development task finished running',
            wait: true,
            onLast: true
        }))
        .pipe(connect.reload());
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
        .pipe(uglify())
        .pipe(concat('libs.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js))
        .pipe(connect.reload());
});

gulp.task('js-core', function() {
    return gulp.src(paths.jsDev + 'core/*.js')
        .pipe(sourcemaps.init())
        // .pipe(uglify())
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
    gulp.src('css/*.css')
        .pipe(gulp.dest('production/css'));
});

gulp.task('copy-fonts', function() {
    gulp.src(paths.fonts + '**/*.{ttf,woff,woff2,eof,svg}')
        .pipe(gulp.dest('production/css/fonts'));
});

gulp.task('copy-js', function() {
    gulp.src(paths.js + '*.js')
        .pipe(gulp.dest('production/js'));
});

gulp.task('copy-img', function() {
    gulp.src('images/**/*.{png,jpg,bmp,gif,svg}')
        .pipe(gulp.dest('production/images'));
});

gulp.task('copy-html', function() {
    return gulp.src(paths.templates + '*.html')
        .pipe(include())
        .pipe(gulp.dest('production/'));
});


// удалить неиспользуемый CSS
//-----------------------------------------------------------------------------------
gulp.task('uncss', function() {
    return gulp.src('production/css/*.css')
        .pipe(uncss({
            html: ['production/*.html']
        }))
        .pipe(gulp.dest('production/css/'));
});


gulp.task('default', ['html-include', 'sass', 'css', 'js-libs', 'js-core', 'web-server', 'watch']);

gulp.task('production', ['copy-css', 'copy-fonts', 'copy-js', 'copy-img', 'copy-html', 'uncss']);
