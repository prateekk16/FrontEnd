var gulp = require('gulp');
var sass = require('gulp-sass');

var browserSync = require('browser-sync');
var runSeq = require('run-sequence');

var autoPrefixer = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var del = require('del');

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('sass', function() {
    var src = "src/resources/sass/**/*.scss";
    return gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoPrefixer('last 2 versions'))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('src/public/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('images', function() {
    return gulp.src('src/public/images/**/*.+(png|jpg|svg|gif)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/public/images'));
});

gulp.task('useref', function() {
    var src = 'src/**/*.html';
    return gulp.src(src)
        .pipe(useref())
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.html', minifyHtml()))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch("src/resources/sass/**/*.scss", ['sass']);
    gulp.watch('src/**/*.html', browserSync.reload);
    gulp.watch('src/public/js/**/*.js', browserSync.reload);
});

gulp.task('clean:dist', function() {
    return del.sync('dist');
});

gulp.task('build', function(callback) {
    runSeq('clean:dist', 'sass', 'useref', 'images', callback);
});

gulp.task('default', function(callback) {
    runSeq('browserSync', 'sass', 'useref', 'images', 'watch', callback);
});