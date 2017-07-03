var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
sass = require('gulp-sass'),
cleanCss = require('gulp-clean-css'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
clean = require('gulp-clean'),
plumber = require('gulp-plumber'),
autoPrefixer = require('gulp-autoprefixer'),
sprite = require('gulp.spritesmith'),
browserSync = require('browser-sync').create();


var reload = browserSync.reload;

gulp.task('server',function(){
	browserSync.init({
		server:{
			baseDir: 'dist/'
		}
	});
});
// gulp.tack('sprite',function(){
// 	var cssSrc = 'src/scss/*',
//       cssDst = 'dist/css';
// 	var spriteData = gulp.src('images/*.png').pipe(sprite({
// 			imgName:'sprite.png',
// 			cssName:'sprite.scss',
// 			cssFormat:'scss'
// 		}));
// 	return spriteData.pipe(gulp.dest(cssDst));
// })

//HTML处理
gulp.task('html', function() {
    var htmlSrc = 'src/**/*.html',
        htmlDst = 'dist';

    gulp.src(htmlSrc)
        .pipe(plumber())
        .pipe(gulp.dest('dist'))
        .pipe(reload({ stream: true }));
});
    // 样式处理
gulp.task('sass', function() {
    var cssSrc = 'src/scss/*',
        cssDst = 'dist/css';

    gulp.src(cssSrc)
        .pipe(plumber())
        .pipe(sass({ style: 'expanded' }))
        // .pipe(rename({ suffix: '.min' }))
        .pipe(autoPrefixer())
        .pipe(cleanCss())
        .pipe(gulp.dest(cssDst))
        .pipe(reload({ stream: true }));
});

// 图片处理
gulp.task('images', function() {
    var imgSrc = 'src/images/**',
        imgDst = 'dist/images';
    gulp.src(imgSrc)
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst))
        .pipe(reload({ stream: true }));
})

// js处理
gulp.task('js', function() {
    var jsSrc = 'src/js/**/*.js',
        jsDst = 'dist/js';

    gulp.src(jsSrc)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        // .pipe(concat('main.js'))
        // .pipe(gulp.dest(jsDst))
        // .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst))
        .pipe(reload({ stream: true }));
});

// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['dist/images', 'dist/css', 'dist/js'], { read: false })
        .pipe(clean());
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function() {
    gulp.start('images', 'html', 'sass','js', 'watch','server');
});
// 监听任务 运行语句 gulp watch
gulp.task('watch', function() {
    // 监听images
    gulp.watch('src/images/**', function() {
        gulp.run('images');
    }).on("change", reload);
    // 监听html
    gulp.watch('src/**/*.html', function(event) {
        gulp.run('html');
    }).on("change", reload);
    // 监听css
    gulp.watch('src/scss/*', function() {
        gulp.run('sass');
    }).on("change", reload);
    // 监听js
    gulp.watch('src/js/*.js', function() {
        gulp.run('js');
    }).on("change", reload);

});