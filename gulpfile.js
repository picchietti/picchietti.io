'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var minify_css = require('gulp-minify-css');
var include_file = require('gulp-file-include');

var del = require('del');
var glob = require("glob");

// var babel = require('gulp-babel');
// var rename = require('gulp-rename');
var path_one_up = process.env['HOME'] + '/Desktop/';
var path_server = path_one_up + 'server';
var path_release = path_one_up + 'release';
var path_server_slash = path_server + '/';
var path_release_slash = path_release + '/';
var sites = 'picchietti.io/';

// consider adding banner to files

function array_diff(a, b){
  var hash = {};
  b.forEach(function (v) { hash[v] = true });
  return a.filter(function (v) { return !hash.hasOwnProperty(v); });
}

gulp.task('clean', function() {
  var files_release = glob.sync('**/*', {
    dot: true,
    cwd: path_release_slash
  });
  var files_server = glob.sync('**/*', {
    dot: true,
    cwd: path_server_slash
  });

  var to_delete = array_diff(files_release, files_server);

  to_delete = to_delete.map(function(file){
    return path_release_slash + file
  })

  del.sync(to_delete, {
    force: true
  });
});

gulp.task('sync', ['clean'], function() {
  return gulp
    .src(path_server_slash + '**', {
      dot: true
    })
    .pipe(changed(path_release_slash, {
      hasChanged: changed.compareSha1Digest
    }))
    .pipe(gulp.dest(path_release_slash));
});

gulp.task('scss', ['sync'], function(){
  return gulp
    .src([
      path_release_slash + sites + '**/*.scss',
    ])
    .pipe(sass())
    .pipe(gulp.dest(path_release_slash + sites));
});

gulp.task('css', ['sync', 'scss'], function() {
  // don't leave scss files
  del.sync(path_release_slash + sites + '**/*.scss', {
    force: true
  });

  return gulp
    .src([
      path_release_slash + sites + '**/*.css',
      '!' + path_release_slash + sites + '**/*.min.css'
    ])
    .pipe(minify_css())
    .pipe(gulp.dest(path_release_slash + sites));
});

gulp.task('js', ['sync'], function() {
  return gulp
    .src([
      path_release_slash + sites + '**/*.js',
      '!' + path_release_slash + sites + '**/*.min.js',
      '!' + path_release_slash + 'picchietti.io/database/**/*.js'
    ])
    .pipe(uglify())
    .pipe(gulp.dest(path_release_slash + sites));
});

gulp.task('html', ['sync'], function() {
  return gulp
    .src([
      path_release_slash + sites + '**/*.html',
      '!' + path_release_slash + sites + 'google1341bc3277bdc766.html'
    ])
    .pipe(include_file())
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(path_release_slash + sites));
});

gulp.task('watch', function(){
  // one giant watch all that checks the extension and the event to determine the action to take for the file.
  gulp.watch([
    path_server_slash + sites + '**/*'
    // '!' + 'server/' + sites + 'google1341bc3277bdc766.html' // not likely to ever be added, renamed, removed, changed
  ], {cwd: path_one_up}, function(event){
    var dest_file = event.path.replace(path_server, path_release);
    var dest_path = dest_file.substring(0, dest_file.lastIndexOf("/"));

    if(event.type == 'deleted'){
      return del.sync(dest_file, {
        force: true
      });
    }

    if(event.type == 'added'){
      gulp
        .src(event.path)
        .pipe(gulp.dest(dest_path));

      return process_file(event.path);
    }

    if(event.type == 'renamed'){
      var dest_old = event.old.replace(path_server, path_release);

      // TODO: get gulp rename to work instead of copy and deleting.
      gulp
        .src(event.path)
        .pipe(gulp.dest(dest_path));

      // in case an ext is added.
      process_file(event.path);

      return del.sync(dest_old, {
        force: true
      });
    }

    if(event.type == 'changed'){
      return process_file(event.path);
    }
  })
});

function process_file(event_path){
  var dest_file = event_path.replace(path_server, path_release);
  var dest_path = dest_file.substring(0, dest_file.lastIndexOf("/"));

  var base_name = event_path.substring(event_path.lastIndexOf('/')+1);
  var exts = base_name.substring(base_name.indexOf('.')+1).split('.');

  // for now, for my needs, don't bother with .min files
  if(exts.indexOf('min') !== -1)
    return;

  while(exts.length != 0){
    var last_ext = exts.pop();
    switch (last_ext) {
      case 'scss':
      // updates css but not scss in release... not exactly a problem. should get rid of scss files in release anyways.
        return gulp
          .src(event_path)
          .pipe(sass())
          .pipe(minify_css())
          .pipe(gulp.dest(dest_path));
      break;
      case 'css':
        return gulp
          .src(event_path)
          .pipe(minify_css())
          .pipe(gulp.dest(dest_path));
      break;
      case 'html':
        return gulp
          .src(event_path)
          .pipe(include_file())
          .pipe(htmlmin({
            collapseWhitespace: true
          }))
          .pipe(gulp.dest(dest_path));
      break;
      case 'js':
        return gulp
          .src(event_path)
          .pipe(uglify())
          .pipe(gulp.dest(dest_path));
      break;
    }
  }
}

gulp.task('build', function(){
  gulp.start('css', 'js', 'html');
});

gulp.task('default', function(){
  console.log("try 'dev build' or 'dev watch' instead.");
});
