var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    saveLicense = require('uglify-save-license')

function minifyJS() {

  return gulp.src('./koma-plugins.js')
    .pipe(uglify({
      output: {
        comments: saveLicense
      }
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./'))

}

function watch(done) {
  gulp.watch([
    './koma-plugins.js'
  ], minifyJS)

  done()
}

gulp.task('default', gulp.series(minifyJS, watch))