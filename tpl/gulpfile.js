const gulp = require('gulp')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const spritesmith=require('gulp.spritesmith')
const px2rem = require('gulp-px3rem')
const runSequence = require('run-sequence')
const rev = require('gulp-rev')  
const revCollector = require('gulp-rev-collector')
const del = require('del')


// sass编译成css
gulp.task('sass', (done) => {
  return gulp.src('./scss/*.scss')
    // 进行Sass文件的编译
    .pipe(sass({
        outputStyle: 'expanded'
      })
      // 定义Sass文件编译过程中发生错误的响应处理(如果没有它，一旦发生错误则直接退出脚本)
      .on('error', (err) => {
        console.error('Error!', err.message);
      })
    )
    // 编译后的css文件保存在css目录下
    .pipe(gulp.dest('./css'))
});
gulp.task('clean:css',["sass"],function (cb) {
 return  del([
    './css/reset.css'
  ], cb);
});

gulp.task('clean:pub',function (cb) {
  return  del([
     './publish/*/*.json'
   ], cb);
 });
// postcss--css加前缀
gulp.task('css',["clean:css"], function () {
  var processors = [autoprefixer({browsers: ['last 2 versions', 'Android >= 4.0'],cascade: true, remove: true }),];
  return gulp.src('./css/*.css').pipe(postcss(processors)).pipe(gulp.dest('./css'));
});
gulp.task('cp_html', (done) => {
    return gulp.src('./html/*.html')
      .pipe(rev())  
      .pipe(gulp.dest('./publish/html'))  
      .pipe(rev.manifest())  
      .pipe(gulp.dest('./publish/html'))
})
gulp.task('cp_img', (done) => {
  return gulp.src('./img/*')
        .pipe(rev())  
        .pipe(gulp.dest('./publish/img'))  
        .pipe(rev.manifest())  
        .pipe(gulp.dest('./publish/img'))
})
gulp.task('cp_css',["css"],(done) => {
  return gulp.src('./css/*.css')
        .pipe(rev())  
        .pipe(gulp.dest('./publish/css'))  
        .pipe(rev.manifest())  
        .pipe(gulp.dest('./publish/css'))
})
gulp.task('cp_js', (done) => {
  return gulp.src('./js/*.js')
        .pipe(rev())                   
        .pipe(gulp.dest('./publish/js'))  
        .pipe(rev.manifest())          
        .pipe(gulp.dest('./publish/js'))  
})
gulp.task('revHtmlCss', function () {  
  return gulp.src(['./publish/css/*.json', './publish/html/*.html'])  
      .pipe(revCollector())             
      .pipe(gulp.dest('./publish/html'));       
});
gulp.task('revCssImg', function () {  
  return gulp.src(['./publish/img/*.json', './publish/css/*.css'])  
      .pipe(revCollector())             
      .pipe(gulp.dest('./publish/css'));       
});  
gulp.task('revHtmlJs', function () {  
  return gulp.src(['./publish/js/*.json', './publish/html/*.html'])
      .pipe(revCollector())  
      .pipe(gulp.dest('./publish/html'));  
});
gulp.task('revHtmlImg', function () {  
  return gulp.src(['./publish/Img/*.json', './publish/html/*.html'])
      .pipe(revCollector())  
      .pipe(gulp.dest('./publish/html'));  
}); 


gulp.task('publish',(done) => { 
    condition = false;  
    //依次顺序执行  
    runSequence(
        ['css'],
        ['cp_css'],  
        ['cp_js'],  
        ['cp_img'],  
        ['cp_html'],
        ['revHtmlCss'],
        ['revCssImg'],
        ['revHtmlImg'],  
        ['revHtmlJs'], 
        ['clean:pub'],
        done);  
});
// 监控sass修改编辑成css
gulp.task('cssWatch', (done) => {
  // 监听文件修改，当文件被修改则执行 images 任务
  gulp.watch('./scss/*.scss', ['sass'])
});


//合并雪碧图
// gulp.task('sprite', function () {
//  return gulp.src('./slice/*.png')
//     .pipe(spritesmith({
//       imgName: 'sprite.png',
//       cssName: './css/sprite.css',
//       padding: 6,
//       algorithm: 'binary-tree'
//     }))
//     .pipe(gulp.dest('./img')) //输出目录
// })
// px转为rem
// const opts = {
//     baseDpr: 2,           
//     threeVersion: false,   
//     remVersion: true,     
//     remUnit: 100,            // rem unit value (default: 75)
//     remPrecision: 6         // rem precision (default: 6)
// }
// gulp.task('rem',["sprite"],function() {
//     gulp.src('./css/*.css')
//         .pipe(px2rem(opts))
//         .pipe(gulp.dest('./css'))
// });




