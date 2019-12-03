const gulp    = require("gulp");
const sass    = require("gulp-sass");
const uglify  = require('gulp-uglify');
const concat  = require('gulp-concat');
const rename  = require('gulp-rename');
const responsive  = require('gulp-responsive');

/*
  generate the css with sass
*/
gulp.task('css', function() {
  return gulp.src('./src/style/main.scss')
    .pipe(sass({
    	noCache: true, 
      	outputStyle: 'compressed'
    })
    .on( 'error', sass.logError) )
    .pipe( rename('inline.css') )
    .pipe( gulp.dest( './src/_includes/assets/css') );
});

/* 
  generate image renditions
*/

gulp.task('images', function() {
  return gulp.src('./src/static/img/uploads/**/*.{jpg,png}')
    .pipe(responsive({
      // Resize all JPG images to three different sizes: 200, 500, and 630 pixels
      '**/*': [{
        width: 355,
        rename: { suffix: '-355' },
      }, {
        width: 600,
        rename: { suffix: '-640' },
      }, {
        width: 1200,
        rename: { suffix: '-1200' },
      }, {
        width: 2880,
        rename: { suffix: '-2880' },
      }, {
        width: 1440,
        rename: { suffix: '-1440' },
      }],
    }, {
      quality: 80,
      progressive: false,
      withMetadata: false,
      withoutEnlargement: true,
      errorOnUnusedImage: false,
      errorOnEnlargement: false,
      withoutChromaSubsampling: true
    }))
    .pipe(gulp.dest('./src/static/img/processed'));
});

/*
 Uglify our javascript files into one.
 Use pump to expose errors more usefully.
*/

//gulp.task('js', function() {
//  return gulp.src("./src/js/**/*.js")
//    .pipe(concat('hawksworx.js'))
//    .pipe(uglify())
//    .pipe(gulp.dest('./src/site/_includes/js'));
//});


/*
  Watch folders for changess
*/
gulp.task("watch", function() {
  gulp.watch('./src/style/**/*.scss', gulp.parallel('css'));
  gulp.watch('./src/static/img/uploads/**/*.{jpg,png}', gulp.parallel('images'));
});


/*
  Let's build this sucker.
*/
gulp.task('build', gulp.parallel(
  'css','images'//,  'js'
));