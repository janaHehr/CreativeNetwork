'use strict';

var port = 51104;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var path = require('path');

app.use('/', bodyParser.urlencoded(
{
    extended: false
}));
app.use(bodyParser.json());

require('./routes')(app);

http.listen(process.env.PORT || port, function()
{
    console.log('listening on *:' + (process.env.PORT || port));
});
