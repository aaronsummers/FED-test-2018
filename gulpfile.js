// Initialize modules
var gulp    = require('gulp');
var cssnano = require('gulp-cssnano');
var sass    = require('gulp-sass');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');


var supported = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 10',
    'ff >= 20',
    'ios 6',
    'android 4'
];

/* input files */
input = {
        'sass': 'scss/**/*.scss',
        'javascript': 'js/**/*.js',
        'images': 'images/**/*'
},

/* output files */
output = {
    'sass': 'dist/css',
    'javascript': 'dist/js',
    'images': 'dist/images'
};

// Sass task: compiles the style.scss file into style.css
gulp.task('sass', function(){
    return gulp.src(input.sass)
        .pipe(sass()) // compile SCSS to CSS
        .pipe(cssnano({
            autoprefixer: {
                browsers: supported,
                add: true
            }
        })) // minify CSS
        .pipe(gulp.dest(output.sass)); // put final CSS in dist folder
});

// JS task: concatenates and uglifies JS files to script.js
gulp.task('js', function(){
    return gulp.src(input.javascript)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest(output.javascript));
});

// Watch task: watch SCSS and JS files for changes
gulp.task('watch', function(){
    gulp.watch(input.sass, ['sass']);
    gulp.watch(input.javascript, ['js']);
});

// Default task
gulp.task('default', ['sass', 'js', 'watch']);
