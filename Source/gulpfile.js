'use strict';

var gulp = require('gulp');
var del = require('del');
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


var t = new Date();
var banner = ['/**',
    ' * Build Time - <%= time %>',
    ' */',
    'var BUILD = {',
    '   TIME: \"<%= time %>\"',
    '};',
    ''
].join('\n');

// concat js files (excluding spec files and properties.js)
gulp.task('package:js', function() {
    return gulp.src(config.javaScriptFiles)
        .pipe(plugins.concat(config.jsDistFile))
        .pipe(plugins.removeUseStrict())
        .pipe(plugins.header(banner, {
            time: t
        }))
        .pipe(gulp.dest(config.jsDistPath));
});

// lint
gulp.task('lint', function() {
    return gulp.src(config.allJsFiles)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

// uglify js files
gulp.task('uglify:js', ['package:js'], function() {
    return gulp.src(config.jsDistPath + config.jsDistFile)
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.jsDistPath));
});

// concat and uglify vendor files
gulp.task('package:vendor', function() {
    return gulp.src(config.vendorFiles)
        .pipe(plugins.concat(config.vendorDistFile))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.jsDistPath));
});

// package templates to js file
gulp.task('package:templates', function() {
    return gulp.src(config.templateFiles)
        .pipe(plugins.html2js({
            outputModuleName: config.applicationName,
            base: config.publicSrcDir
        }))
        .pipe(plugins.concat(config.templateDistFile))
        .pipe(gulp.dest(config.jsDistPath));
});

gulp.task('uglify:templates', function() {
    return gulp.src(config.templateFiles)
        .pipe(plugins.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(plugins.html2js({
            outputModuleName: config.applicationName,
            base: config.publicSrcDir
        }))
        .pipe(plugins.concat(config.templateDistFile))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.jsDistPath));
});

//TODO: less / sass?
// process less file to css
gulp.task('less', function() {
    return gulp.src(config.mainLessFile)
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer({
            cascade: false
        }))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename(config.cssDistFile))
        .pipe(gulp.dest(config.cssDistPath));
});

// process less file to css without minify
gulp.task('less:dev', function() {
    return gulp.src(config.mainLessFile)
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer({
            cascade: false
        }))
        .pipe(plugins.minifyCss({
            keepSpecialComments: '*',
            keepBreaks: true,
            noAdvanced: true
        }))
        .pipe(plugins.rename(config.cssDistFile))
        .pipe(gulp.dest(config.cssDistPath));
});

// copy content to dist
gulp.task('copy:content', function() {
    return gulp.src(config.publicSrcDir + 'content/**/*.*')
        .pipe(gulp.dest(config.publicDistPath + 'content'));
});

// copy locales to dist
gulp.task('copy:locales', function() {
    return gulp.src(config.publicSrcDir + 'locales/**/*.*')
        .pipe(gulp.dest(config.publicDistPath + 'locales'));
});

// copy fonts from all bower_components to dist
gulp.task('copy:fonts', function() {
    return gulp.src(config.publicSrcDir + 'bower_components/ionicons/fonts/*.*')
        .pipe(gulp.dest(config.publicDistPath + 'fonts'));
});

gulp.task('copy:server', function() {
    return gulp.src(config.serverFiles)
        .pipe(gulp.dest(config.serverDistPath));
});

gulp.task('copy:package.json', function() {
    return gulp.src('package.json')
        .pipe(gulp.dest(config.destinationPath));
});

// copy static files to dist
gulp.task('copy', ['copy:content', 'copy:fonts', 'copy:locales']);

// copy index.html and inject combines js dist file
gulp.task('index', function() {
    return gulp.src(config.publicSrcDir + 'index.html')
        .pipe(plugins.inject(gulp.src([config.jsDistPath + config.combinedJsDistFile, config.cssDistPath + config.cssDistFile], {
            read: false
        }), {
            ignorePath: '/dist/public',
            addRootSlash: false
        }))
        .pipe(gulp.dest(config.publicDistPath));
});

// copy index.html and inject js dist files
gulp.task('index:dev', function() {
    return gulp.src(config.publicSrcDir + 'index.html')
        .pipe(plugins.inject(gulp.src(config.jsDistFiles.concat([config.cssDistPath + config.cssDistFile]), {
            read: false
        }), {
            ignorePath: '/dist/public',
            addRootSlash: false
        }))
        .pipe(gulp.dest(config.publicDistPath));
});

gulp.task('karma', function(done) {
    plugins.karma.server.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

// clean destination path
gulp.task('clean', function() {
    del.sync(config.destinationPath);
    //return gulp.src(destinationPath)
    //    .pipe(plugins.clean());
});

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

// process all scripts
gulp.task('scripts', ['package:vendor', 'uglify:js', 'uglify:templates']);

// process all scripts without uglify (for dev)
gulp.task('scripts:dev', ['package:vendor', 'package:js', 'package:templates']);

// build
gulp.task('build', function(done) {
    plugins.runSequence('clean', ['copy', 'scripts', 'less', 'lint'], 'copy:server', 'copy:package.json', 'combineDistJsFiles', 'index', done);
});


// build (for dev)
gulp.task('build:dev', function(done) {
    plugins.runSequence('karma', 'clean', ['copy', 'scripts:dev', 'less:dev', 'lint'], 'copy:server', 'copy:package.json', 'index:dev', done);
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

require('./gulp.watchers.js')(gulp, config);
