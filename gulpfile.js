var gulp = require("gulp"); // npm install gulp --save-dev
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
var concat = require('gulp-concat');
  

//css 
function css(done){
    gulp.src("./src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
        errorLogToConsole: true,
        outputStyle: "compressed"
    }))
    .on("error", console.error.bind(console))
    .pipe(autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false
    }))
    // .pipe(concat('style.min.css'))
    .pipe(rename({suffix: ".min"}))
    // .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./public/css/"));
    done();
}

//html
function html(done){
    gulp.src("./src/index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("./public/"));
    done();
}

//js
function js(done){
    gulp.src("./src/js/**/*.js")
    .pipe(concat('main.min.js'))
    // .pipe(terser())
    .pipe(gulp.dest("./public/js/"));
    done();
}
function watch(){
    gulp.watch("./src/scss/**/*", css);
    gulp.watch("./src/js/**/*", js);
    gulp.watch("./src/index.html", html);
}
gulp.task("default", watch)
gulp.task(html);
