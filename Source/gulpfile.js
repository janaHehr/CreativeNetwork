'use strict';

var gulp = require('gulp');
var path = require('path');

var plugins = require('gulp-load-plugins')({
    pattern: '*',
    scope: ['dependencies', 'devDependencies']
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
    cssDistFile: 'main.min.css',
    karmaConfigFile: path.resolve('karma.conf.js')
};

config.jsDistFiles = [config.jsDistPath + config.vendorDistFile, config.jsDistPath + config.jsDistFile, config.jsDistPath + config.templateDistFile];
config.vendorFiles = plugins.mainBowerFiles().filter(function(file) {
    return file.indexOf('.js') > -1 && file.indexOf('.css') === -1 && file.indexOf('jquery.js') === -1 && file.indexOf('bootstrap.js') === -1;
});

//import all tasks
require('./gulp-tasks/copy.js')(gulp, plugins, config);
require('./gulp-tasks/watchers.js')(gulp, plugins, config);
require('./gulp-tasks/build.js')(gulp, plugins, config);
require('./gulp-tasks/scripts.js')(gulp, plugins, config);
require('./gulp-tasks/styles.js')(gulp, plugins, config);
require('./gulp-tasks/tests.js')(gulp, plugins, config);
require('./gulp-tasks/run.js')(gulp, plugins, config);
require('./gulp-tasks/profile-dev.js')(gulp, plugins, config);
