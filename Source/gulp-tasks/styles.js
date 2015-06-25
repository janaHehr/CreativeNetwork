'use strict';

module.exports = function(gulp, plugins, config) {
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
};
