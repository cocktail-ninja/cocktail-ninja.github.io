var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    minifyCss = require('gulp-minify-css'), 
    concat = require('gulp-concat'),
    deploy = require('gulp-gh-pages'),
    runSequence = require('run-sequence');


var outputFolder ="./dist";
var DEPLOY_OPTIONS = {
    remoteUrl: 'git@github.com:cocktail-ninja/cocktail-ninja.github.io.git',
    branch: 'master'
};


gulp.task('deploy:gh-pages', function () {
    return gulp.src(outputFolder + '/**/*')
        .pipe(deploy(DEPLOY_OPTIONS));
});

gulp.task('deploy', function(cb) {
    runSequence(['build', 'deploy:gh-pages'], cb);
});
    
gulp.task('css', function () {
    gulp.src('stylesheets/*.css')
        .pipe(plumber(''))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(autoprefixer())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(outputFolder))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(plumber(''))
        .pipe(gulp.dest(outputFolder))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('*.css', ['css']);
  gulp.watch('*.html', ['html']);
});


gulp.task('serve', function() {
  connect.server({
    root: outputFolder,
    livereload: true
  });
});


gulp.task('build', ['html', 'css']);
gulp.task('default', ['serve', 'html', 'css', 'watch']);
