var gulp = require('gulp');
var del = require('del');
var path = require('path');

var plugins = require('gulp-load-plugins')(
{
    pattern: '*',
    scope: ['dependencies', 'devDependencies', 'peerDependencies']
});

var vendorFiles = plugins.mainBowerFiles().filter(function(file)
{
    return file.indexOf('.js') > -1 && file.indexOf('.css') === -1 && file.indexOf('jquery.js') === -1 && file.indexOf('bootstrap.js') === -1;
});

//add all javascript files that are not bower main files (see '.bower.json' in the bower_components folder)
//all javascript from the lib-dir must not be included here (see var javaScriptFile - beware of file order!!)
vendorFiles.push(path.resolve(__dirname + '/public/bower_components/codemirror/mode/markdown/markdown.js'));

var applicationName = 'creativeNetwork';
var publicSrcDir = 'public/';
var destinationPath = 'dist/';

var publicDistPath = destinationPath + 'public/';
var jsDistPath = publicDistPath + 'js/';
var cssDistPath = publicDistPath + 'css/';
var serverDistPath = destinationPath + 'server/';

var serverFiles = 'server/**/*.*';

var javaScriptFiles = [publicSrcDir + 'lib/**/*.js', publicSrcDir + 'app/**/*.js', '!' + publicSrcDir + '/bower_components', '!' + publicSrcDir + 'app/**/*.spec.js'];
var templateFiles = [publicSrcDir + 'app/**/*.html'];
var lessFiles = [publicSrcDir + '/**/*.less', '!' + publicSrcDir + '/bower_components/'];
var mainLessFile = publicSrcDir + 'less/main.less';

var jsDistFile = applicationName + '.js';
var allJsFiles = publicSrcDir + 'app/**/*.js';
var vendorDistFile = 'vendor.js';
var templateDistFile = applicationName + '-templates.js';
var combinedJsDistFile = applicationName + '.min.js';
var cssDistFile = 'main.min.css';
var jsDistFiles = [jsDistPath + vendorDistFile, jsDistPath + jsDistFile, jsDistPath + templateDistFile]

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
gulp.task('package:js', function()
{
    return gulp.src(javaScriptFiles)
        .pipe(plugins.concat(jsDistFile))
        .pipe(plugins.removeUseStrict())
        .pipe(plugins.header(banner,
        {
            time: t
        }))
        .pipe(gulp.dest(jsDistPath));
});

// lint
gulp.task('lint', function()
{
    return gulp.src(allJsFiles)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

// uglify js files
gulp.task('uglify:js', ['package:js'], function()
{
    return gulp.src(jsDistPath + jsDistFile)
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.uglify())
        .pipe(gulp.dest(jsDistPath));
});

// concat and uglify vendor files
gulp.task('package:vendor', function()
{
    return gulp.src(vendorFiles)
        .pipe(plugins.concat(vendorDistFile))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(jsDistPath));
});

// package templates to js file
gulp.task('package:templates', function()
{
    return gulp.src(templateFiles)
        .pipe(plugins.html2js(
        {
            outputModuleName: applicationName,
            base: publicSrcDir
        }))
        .pipe(plugins.concat(templateDistFile))
        .pipe(gulp.dest(jsDistPath));
});

gulp.task('uglify:templates', function()
{
    return gulp.src(templateFiles)
        .pipe(plugins.minifyHtml(
        {
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(plugins.html2js(
        {
            outputModuleName: applicationName,
            base: publicSrcDir
        }))
        .pipe(plugins.concat(templateDistFile))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(jsDistPath));
});

//TODO: less / sass?
// process less file to css
gulp.task('less', function()
{
    return gulp.src(mainLessFile)
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer(
        {
            cascade: false
        }))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename(cssDistFile))
        .pipe(gulp.dest(cssDistPath));
});

// process less file to css without minify
gulp.task('less:dev', function()
{
    return gulp.src(mainLessFile)
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer(
        {
            cascade: false
        }))
        .pipe(plugins.minifyCss(
        {
            keepSpecialComments: '*',
            keepBreaks: true,
            noAdvanced: true
        }))
        .pipe(plugins.rename(cssDistFile))
        .pipe(gulp.dest(cssDistPath));
});

// copy content to dist
gulp.task('copy:content', function()
{
    return gulp.src(publicSrcDir + 'content/**/*.*')
        .pipe(gulp.dest(publicDistPath + 'content'));
});

// copy fonts from all bower_components to dist
gulp.task('copy:fonts', function()
{
    return gulp.src(publicSrcDir + 'bower_components/ionicons/fonts/*.*')
        .pipe(gulp.dest(publicDistPath + 'fonts'));
});

gulp.task('copy:server', function()
{
    return gulp.src(serverFiles)
        .pipe(gulp.dest(serverDistPath));
});

gulp.task('copy:package.json', function()
{
    return gulp.src('package.json')
        .pipe(gulp.dest(destinationPath));
});

// copy static files to dist
gulp.task('copy', ['copy:content', 'copy:fonts']);

// copy index.html and inject combines js dist file
gulp.task('index', function()
{
    return gulp.src(publicSrcDir + 'index.html')
        .pipe(plugins.inject(gulp.src([jsDistPath + combinedJsDistFile, cssDistPath + cssDistFile],
        {
            read: false
        }),
        {
            ignorePath: '/dist/public',
            addRootSlash: false
        }))
        .pipe(gulp.dest(publicDistPath));
});

// copy index.html and inject js dist files
gulp.task('index:dev', function()
{
    return gulp.src(publicSrcDir + 'index.html')
        .pipe(plugins.inject(gulp.src(jsDistFiles.concat([cssDistPath + cssDistFile]),
        {
            read: false
        }),
        {
            ignorePath: '/dist/public',
            addRootSlash: false
        }))
        .pipe(gulp.dest(publicDistPath));
});

gulp.task('karma', function(done)
{
    plugins.karma.server.start(
    {
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
})

// clean destination path
gulp.task('clean', function()
{
    del.sync(destinationPath);
    //return gulp.src(destinationPath)
    //    .pipe(plugins.clean());
});

// combines all dist script files to single file
gulp.task('combineDistJsFiles', function()
{
    return gulp.src(jsDistFiles)
        .pipe(plugins.clean())
        .pipe(plugins.concat(combinedJsDistFile))
        .pipe(gulp.dest(jsDistPath));
});

gulp.task('server', function()
{
    plugins.nodemon(
    {
        script: 'server/server.js'
            //, ext: 'js'
            ,
        env:
        {
            'NODE_ENV': 'development'
        }
    });
});

// process all scripts
gulp.task('scripts', ['package:vendor', 'uglify:js', 'uglify:templates']);

// process all scripts without uglify (for dev)
gulp.task('scripts:dev', ['package:vendor', 'package:js', 'package:templates']);

// build
gulp.task('build', function(done)
{
    plugins.runSequence('clean', ['copy', 'scripts', 'less', 'lint'], 'copy:server', 'copy:package.json', 'combineDistJsFiles', 'index', done);
});


// build (for dev)
gulp.task('build:dev', function(done)
{
    plugins.runSequence('karma', 'clean', ['copy', 'scripts:dev', 'less:dev', 'lint'], 'copy:server', 'copy:package.json', 'index:dev', done);
});

// deploy task: run tests, afterwards build
gulp.task('deploy', function(done)
{
    plugins.runSequence('karma', 'build', done);
});

// dev workflow: run tests, build for dev, start all watchers, start local webserver
gulp.task('dev', function(done)
{
    plugins.runSequence('build:dev', 'watch:all', 'server', done);
});

// dev workflow without unit tests
// gulp.task('dev:notest', function(done) {
//     plugins.runSequence('build:dev', 'watch:all:notest', 'server', done);
// });


// start all watchers
gulp.task('watch:all', ['watch:less', 'watch:js', 'watch:vendor', 'watch:templates', 'watch:index']);

// start all watchers
// gulp.task('watch:all:notest', ['watch:less', 'watch:js:notest', 'watch:vendor', 'watch:templates', 'watch:index']);

// on less changes
gulp.task('watch:less', function()
{
    gulp.watch(lessFiles, ['less']);
});

// on js changes
gulp.task('watch:js', function()
{
    gulp.watch(javaScriptFiles, ['lint', 'package:js']);
});

// on js changes, no unit tests
gulp.task('watch:js:notest', function()
{
    gulp.watch(javaScriptFiles, ['lint', 'package:js']);
});

// on vendor changes
gulp.task('watch:vendor', function()
{
    gulp.watch(vendorFiles, ['package:vendor']);
});

// on template changes
gulp.task('watch:templates', function()
{
    gulp.watch(templateFiles, ['package:templates']);
});

gulp.task('watch:index', function()
{
    gulp.watch(publicSrcDir + 'index.html', ['index:dev']);
});
