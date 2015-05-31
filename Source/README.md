# How to run

1. npm install
2. gulp dev - this starts the server using nodemon and watches files for changes

## Other important tasks

* gulp build - builds the whole application into the dist folder. Server is kept as is. Client files are combined and minified
* gulp build:dev - same as gulp build but does not combine vendor, template and application file and does not minify - used for debugging when running with gulp dev
