'use strict';

var del = require('del');

module.exports = function(gulp, plugins, config) {

    // clean destination path
    gulp.task('clean', function() {
        del.sync(config.destinationPath);
        //return gulp.src(destinationPath)
        //    .pipe(plugins.clean());
    });

    // build
    gulp.task('build', function(done) {
        plugins.runSequence('clean', ['copy', 'scripts', 'less', 'lint'], 'copy:server', 'copy:package.json', 'combineDistJsFiles', 'index', done);
    });


    // build (for dev)
    gulp.task('build:dev', function(done) {
        plugins.runSequence('karma', 'clean', ['copy', 'scripts:dev', 'less:dev', 'lint'], 'copy:server', 'copy:package.json', 'index:dev', done);
    });

};
