'use strict';

module.exports = function(gulp, plugins, config) {

  //express node-sserver for serving api
  gulp.task('server', function() {
    plugins.nodemon({
      script: 'server/server.js',
      //, ext: 'js'
      env: {
        'NODE_ENV': 'development'
      }
    });
  });

  //webserver for serving static content
  gulp.task('webserver', function() {
    gulp.src('dist/public')
      .pipe(plugins.webserver({
        livereload: true,
        open: true,
        proxies: [
          { source: '/api', target: 'http://localhost:51104/api' }
        ],
        fallback:'index.html'
      }));
  });
};
