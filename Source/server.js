var port = 51104;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var http = require("http").Server(app);
var nano = require('nano')('http://admin:admin@localhost:5984');
var db = nano.use('blog');
var api = require("./api");

app.use("/", express.static(__dirname + "/public"));
app.use("/", bodyParser.urlencoded(
{
    extended: false
}));

app.post('/api/create_blogEntry', api.createBlogEntry);
app.get('/api/blogEntries', api.getAllBlogEntries);

app.get("/*", function(request, response)
{
    response.sendFile(__dirname + "/public/index.html");
});

http.listen(port, function()
{
    console.log("listening on *:" + port);
});
