'use strict';

module.exports = function(gulp, config) {

    // start all watchers
    gulp.task('watch:all', ['watch:less', 'watch:js', 'watch:vendor', 'watch:templates', 'watch:index', 'watch:locales']);

    // start all watchers
    // gulp.task('watch:all:notest', ['watch:less', 'watch:js:notest', 'watch:vendor', 'watch:templates', 'watch:index']);

    // on less changes
    gulp.task('watch:less', function() {
        gulp.watch(config.lessFiles, ['less']);
    });

    // on js changes
    gulp.task('watch:js', function() {
        gulp.watch(config.javaScriptFiles, ['lint', 'package:js']);
    });

    // on js changes, no unit tests
    gulp.task('watch:js:notest', function() {
        gulp.watch(config.javaScriptFiles, ['lint', 'package:js']);
    });

    // on vendor changes
    gulp.task('watch:vendor', function() {
        gulp.watch(config.vendorFiles, ['package:vendor']);
    });

    // on template changes
    gulp.task('watch:templates', function() {
        gulp.watch(config.templateFiles, ['package:templates']);
    });

    gulp.task('watch:index', function() {
        gulp.watch(config.publicSrcDir + 'index.html', ['index:dev']);
    });

    gulp.task('watch:locales', function() {
        gulp.watch(config.publicSrcDir + 'locales/**/*.json', ['copy:locales']);
    });

};
