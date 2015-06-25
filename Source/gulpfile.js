'use strict';

var gulp = require('gulp');
var path = require('path');

var plugins = require('gulp-load-plugins')({
    pattern: '*',
    scope: ['dependencies', 'devDependencies', 'peerDependencies']
});

//base variables
var applicationName = 'creativeNetwork';
var publicSrcDir = 'public/';
var destinationPath = 'dist/';
var publicDistPath = destinationPath + 'public/';

var config = {
    applicationName: applicationName,
    publicSrcDir: publicSrcDir,
    destinationPath: destinationPath,
    publicDistPath: publicDistPath,

    jsDistPath: publicDistPath + 'js/',
    cssDistPath: publicDistPath + 'css/',
    serverDistPath: destinationPath + 'server/',

    serverFiles: 'server/**/*.*',

    javaScriptFiles: [publicSrcDir + 'lib/**/*.js', publicSrcDir + 'app/**/*.js', '!' + publicSrcDir + '/bower_components', '!' + publicSrcDir + 'app/**/*.spec.js'],
    templateFiles: [publicSrcDir + 'app/**/*.html'],
    lessFiles: [publicSrcDir + '/**/*.less', '!' + publicSrcDir + '/bower_components/'],
    mainLessFile: publicSrcDir + 'less/main.less',

    jsDistFile: applicationName + '.js',
    allJsFiles: publicSrcDir + 'app/**/*.js',
    vendorDistFile: 'vendor.js',
    templateDistFile: applicationName + '-templates.js',
    combinedJsDistFile: applicationName + '.min.js',
    cssDistFile: 'main.min.css'
};

config.jsDistFiles = [config.jsDistPath + config.vendorDistFile, config.jsDistPath + config.jsDistFile, config.jsDistPath + config.templateDistFile];
config.vendorFiles = plugins.mainBowerFiles().filter(function(file) {
    return file.indexOf('.js') > -1 && file.indexOf('.css') === -1 && file.indexOf('jquery.js') === -1 && file.indexOf('bootstrap.js') === -1;
});

//add all javascript files that are not bower main files (see '.bower.json' in the bower_components folder)
//all javascript from the lib-dir must not be included here (see var javaScriptFile - beware of file order!!)
config.vendorFiles.push(path.resolve(__dirname + '/public/bower_components/codemirror/mode/markdown/markdown.js'));



require('./gulp-tasks/copy.js')(gulp, plugins, config);
require('./gulp-tasks/watchers.js')(gulp, plugins, config);
require('./gulp-tasks/build.js')(gulp, plugins, config);
require('./gulp-tasks/scripts.js')(gulp, plugins, config);
require('./gulp-tasks/styles.js')(gulp, plugins, config);
require('./gulp-tasks/tests.js')(gulp, plugins, config);



// combines all dist script files to single file
gulp.task('combineDistJsFiles', function() {
    return gulp.src(config.jsDistFiles)
        .pipe(plugins.clean())
        .pipe(plugins.concat(config.combinedJsDistFile))
        .pipe(gulp.dest(config.jsDistPath));
});

gulp.task('server', function() {
    plugins.nodemon({
        script: 'server/server.js',
            //, ext: 'js'
        env: {
            'NODE_ENV': 'development'
        }
    });
});


// deploy task: run tests, afterwards build
gulp.task('deploy', function(done) {
    plugins.runSequence('karma', 'build', done);
});

// dev workflow: run tests, build for dev, start all watchers, start local webserver
gulp.task('dev', function(done) {
    plugins.runSequence('build:dev', 'watch:all', 'server', done);
});

// dev workflow without unit tests
// gulp.task('dev:notest', function(done) {
//     plugins.runSequence('build:dev', 'watch:all:notest', 'server', done);
// });
