'use strict';

var del = require('del');

module.exports = function(gulp, plugins, config) {

    // clean destination path
    gulp.task('clean', function() {
        del.sync(config.destinationPath);
    });

    // build
    gulp.task('build', function(done) {
        plugins.runSequence('clean', ['copy', 'scripts', 'less', 'lint'], 'copy:server', 'copy:package.json', 'combineDistJsFiles', 'index', done);
    });


    // build (for dev)
    gulp.task('build:dev', function(done) {
        plugins.runSequence('karma', 'clean', ['copy', 'scripts:dev', 'less:dev', 'lint'], 'copy:server', 'copy:package.json', 'index:dev', done);
    });

    // build (for dev) without tests
    gulp.task('build:dev:notest', function(done) {
        plugins.runSequence('clean', ['copy', 'scripts:dev', 'less:dev', 'lint'], 'copy:server', 'copy:package.json', 'index:dev', done);
    });

    // TODO: deploy task necessary? maybe simple run tests also in 'build'?
    // deploy task: run tests, afterwards build
    gulp.task('deploy', function(done) {
        plugins.runSequence('karma', 'build', done);
    });
};
