'use strict';

var gulp = require('gulp'),
    concatCSS = require('gulp-concat-css'),
    notify = require("gulp-notify"),
    jshint = require('gulp-jshint'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require("gulp-concat"),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-image-optimization'),
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

// browser-sync
//-----------------------------------------------------------------------------------
gulp.task('browser-sync', function() {
    browserSync.init({
        notify: false,
        logFileChanges: false,
        port: 8080,
        server: {
            baseDir: ""
        }
    });
});


// Chunks
//-----------------------------------------------------------------------------------
gulp.task('html-include', function() {
    return gulp.src(paths.templates + '*.html')
        .pipe(include())
        .pipe(gulp.dest(''))
        .pipe(browserSync.stream());
});


// Работа с CSS
//-----------------------------------------------------------------------------------
gulp.task('css', function() {
    return gulp.src(paths.css + 'plugins/*.css')
        .pipe(concatCSS('libs.css'))
        .pipe(autoprefixer('last 15 versions'))
        .pipe(minifyCSS(''))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.stream());
});


// Работа с SASS
//-----------------------------------------------------------------------------------
gulp.task('sass', function() {
    return gulp.src(paths.sass + 'style.sass')
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer('last 15 versions'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css))
        // .pipe(connect.reload())
        .pipe(browserSync.stream())
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
        .pipe(jshint())
        .pipe(browserSync.stream());
});

// Работа с JS
//-----------------------------------------------------------------------------------
gulp.task('js-libs', function() {
    return gulp.src([paths.jsDev + 'jquery-1.11.3.min.js', paths.jsDev + 'lib/*.js'])
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js))
        .pipe(browserSync.stream());
});

gulp.task('js-core', function() {
    return gulp.src(paths.jsDev + 'core/*.js')
        .pipe(concat('core.js'))
        .pipe(gulp.dest(paths.js))
        .pipe(browserSync.stream());
});

// Смотрим за изминением
//-----------------------------------------------------------------------------------
gulp.task('watch', function() {
    gulp.watch(paths.templates + '*.html', ['html-include']);
    gulp.watch(paths.chunks + '*.html', ['html-include']);
    gulp.watch(paths.sass + '**/*.sass', ['sass']);
    gulp.watch(paths.jsDev + 'lib/*.js', ['js-libs']);
    gulp.watch(paths.jsDev + 'core/*.js', ['js-core']);
    gulp.watch(paths.js + 'common.js', ['lint']);
    gulp.watch(paths.css + 'plugins/*.css', ['css']);
});


// production task
//-----------------------------------------------------------------------------------
gulp.task('copy-css', function() {
    return gulp.src(paths.css + 'plugins/*.css')
        .pipe(concatCSS('libs.css'))
        .pipe(autoprefixer('last 15 versions'))
        .pipe(minifyCSS(''))
        .pipe(gulp.dest('production/css'));
});

gulp.task('copy-sass', function() {
    return gulp.src(paths.sass + 'style.sass')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer('last 15 versions'))
        .pipe(minifyCSS(''))
        .pipe(gulp.dest('production/css'));
});

gulp.task('copy-fonts', function() {
    gulp.src(paths.fonts + '**/*')
        .pipe(gulp.dest('production/css/fonts'));
});

gulp.task('copy-libs-js', function() {
    return gulp.src([paths.jsDev + 'jquery-1.11.3.min.js', paths.jsDev + 'lib/*.js'])
        .pipe(uglify())
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('production/js'));
});

gulp.task('copy-js', function() {
    return gulp.src([paths.js + 'modernizr.js', paths.js + 'ie-detector.js',paths.js + 'common.js'])
        .pipe(uglify())
        .pipe(gulp.dest('production/js'));
});

gulp.task('copy-core-js', function() {
    return gulp.src(paths.jsDev + 'core/*.js')
        .pipe(uglify())
        .pipe(concat('core.js'))
        .pipe(gulp.dest('production/js'));
});

gulp.task('copy-img', function(cb) {
    gulp.src('images/**/*')
        .pipe(imagemin({
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

// gulp
//-----------------------------------------------------------------------------------
gulp.task('default', ['html-include', 'sass', 'css', 'js-libs', 'js-core', 'browser-sync', 'watch']);

// gulp production
//-----------------------------------------------------------------------------------
gulp.task('production', ['copy-css', 'copy-sass', 'copy-fonts', 'copy-libs-js', 'copy-core-js', 'copy-js', 'copy-img', 'copy-html']);
