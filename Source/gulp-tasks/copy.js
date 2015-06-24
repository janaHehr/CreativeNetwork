'use strict';

module.exports = function(gulp, plugins, config) {

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
};
