'use strict';

var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var changed = require('gulp-changed');
var jsonminify = require('gulp-jsonminify');

var del = require('del');
var glob = require("glob");

var cwd = process.env['PWD'] + '/';
var path_input = cwd + 'source';
var path_output = cwd + 'build';
var path_input_slash = path_input + '/';
var path_output_slash = path_output + '/';

function array_diff(a, b){
  var hash = {};
  b.forEach(function (v) { hash[v] = true });
  return a.filter(function (v) { return !hash.hasOwnProperty(v); });
}

gulp.task('clean', function() {
  var files_output = glob.sync('**/*', {
    dot: true,
    cwd: path_output_slash
  });
  var files_input = glob.sync('**/*', {
    dot: true,
    cwd: path_input_slash
  });

  var to_delete = array_diff(files_output, files_input);

  to_delete = to_delete.map(function(file){
    return path_output_slash + file
  })

  del.sync(to_delete, {
    force: true
  });
});

gulp.task('sync', ['clean'], function() {
  return gulp
    .src([
      path_input_slash + '**'
    ], {
      dot: true
    })
    .pipe(changed(path_output_slash, {
      hasChanged: changed.compareSha1Digest
    }))
    .pipe(gulp.dest(path_output_slash));
});

gulp.task('json', ['sync'], function () {
    return gulp
      .src(path_output_slash + 'public/**/*.json')
      .pipe(jsonminify())
      .pipe(gulp.dest(path_output_slash + 'public/'));
});

gulp.task('html', ['sync'], function() {
  return gulp
    .src([
      path_output_slash + '**/*.html',
      '!' + path_output_slash + 'google1341bc3277bdc766.html'
    ])
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(path_output_slash));
});

gulp.task('build', function(){
  gulp.start('html', 'json');
});

gulp.task('default', function(){
  console.log("try 'npm run build' instead.");
});
