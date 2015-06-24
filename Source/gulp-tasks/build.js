'use strict';

module.exports = function(gulp, plugins, config) {


    // build
    gulp.task('build', function(done) {
        plugins.runSequence('clean', ['copy', 'scripts', 'less', 'lint'], 'copy:server', 'copy:package.json', 'combineDistJsFiles', 'index', done);
    });


    // build (for dev)
    gulp.task('build:dev', function(done) {
        plugins.runSequence('karma', 'clean', ['copy', 'scripts:dev', 'less:dev', 'lint'], 'copy:server', 'copy:package.json', 'index:dev', done);
    });

};
