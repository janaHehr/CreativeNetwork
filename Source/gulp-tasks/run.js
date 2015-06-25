'use strict';

module.exports = function(gulp, plugins, config) {

  gulp.task('server', function() {
    plugins.nodemon({
      script: 'server/server.js',
      //, ext: 'js'
      env: {
        'NODE_ENV': 'development'
      }
    });
  });

};
