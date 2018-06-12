var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-minify-css'),
    browserSync = require('browser-sync').create();

//语法检查
gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default')) //对代码进行报错提示
        .pipe(concat('main.js')) //合并所有js到main.js
        .pipe(rename({
            suffix: '.min' //rename压缩后的文件名
        }))
        .pipe(uglify()) //压缩
        .pipe(gulp.dest('lastpack/js')); // 输出
});

//语法检查
gulp.task('cssmin', function() {
    return gulp.src('src/css/*.css')
        .pipe(concat('main.css')) //合并所有js到main.js
        .pipe(rename({
            suffix: '.min' //rename压缩后的文件名
        }))
        .pipe(cssmin()) //压缩
        .pipe(gulp.dest('lastpack/css')); //输出
});

//编译less，读取输出到新文件夹中
gulp.task('less', function() {
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(rename({
            suffix: '.min'
        })) //rename压缩后的文件名
        .pipe(gulp.dest('lastpack/less')); //输出文件夹
});

//监听文件并自动刷新
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch(['src/js/*.js', 'src/less/*.less', 'src/css/*.css'], function() {
        gulp.run('lint', 'less', 'cssmin');
        console.log('ok');
        browserSync.reload();
    });
});


//默认行为
gulp.task('default', function() {
    gulp.run('server');
});