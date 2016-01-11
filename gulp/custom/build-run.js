'use strict';

var del = require('del');

module.exports = function(gulp, plugins, config) {

    // clean destination path
    gulp.task('clean', function() {
        del.sync(config.destPath);
    });

    // build
    gulp.task('build', function(done) {
        plugins.runSequence('clean', ['copyStatic', 'scripts', 'styles'], 'index', done);
    });

    // build (for dev)
    //'karma',
    gulp.task('build:dev', function(done) {
        plugins.runSequence('clean', ['copyStatic', 'scripts:dev', 'styles:dev'], 'index:dev', done);
    });

    // dev workflow: run tests, build for dev, start all watchers, start local webserver
    gulp.task('dev', function(done) {
        plugins.runSequence('build:dev', 'watch:all', 'webserver', done);
    });

    //production build
    gulp.task('default', ['build']);
};
