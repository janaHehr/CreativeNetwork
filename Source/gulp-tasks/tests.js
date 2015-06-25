'use strict';

module.exports = function(gulp, plugins, config) {
    gulp.task('karma', function(done) {
        plugins.karma.server.start({
            configFile: __dirname + '/karma.conf.js',
            singleRun: true
        }, done);
    });
};
