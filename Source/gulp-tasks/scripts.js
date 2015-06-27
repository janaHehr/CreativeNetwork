'use strict';

var del = require('del');
var vinylPath = require('vinyl-paths');

module.exports = function(gulp, plugins, config) {
    var bowerVersion = require('../bower.json').version;
    var currentDate = new Date();
    var banner = ['/**',
        ' * Build Time: <%= buildTime %> - Version: <%= version %> ',
        ' */',
        'var BUILD = {',
        '   TIME: \"<%= buildTime %>\",',
        '   VERSION: \"<%= version %>\"',
        '};',
        ''
    ].join('\n');

    // concat js files (excluding spec files and properties.js)
    gulp.task('package:js', function() {
        return gulp.src(config.javaScriptFiles)
            .pipe(plugins.concat(config.jsDistFile))
            .pipe(plugins.removeUseStrict())
            .pipe(plugins.header(banner, {
                buildTime: currentDate,
                version: bowerVersion
            }))
            .pipe(gulp.dest(config.jsDistPath));
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

    // combines all dist script files to single file
    gulp.task('combineDistJsFiles', function() {
        return gulp.src(config.jsDistFiles)
            .pipe(vinylPath(del))
            .pipe(plugins.concat(config.combinedJsDistFile))
            .pipe(gulp.dest(config.jsDistPath));
    });

    // lint
    gulp.task('lint', function() {
        return gulp.src(config.allJsFiles)
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('jshint-stylish'));
    });

    // process all scripts
    gulp.task('scripts', ['package:vendor', 'uglify:js', 'uglify:templates']);

    // process all scripts without uglify (for dev)
    gulp.task('scripts:dev', ['package:vendor', 'package:js', 'package:templates']);
};
