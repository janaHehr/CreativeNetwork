var port = 51104;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var http = require("http").Server(app);
var path = require("path");
var config = require("./config.json")[process.env.NODE_ENV || 'development'];

console.log('using ' + config.publicFilePath + ' to serve public files');

app.use("/", express.static(path.resolve(__dirname + config.publicFilePath)))
app.use("/", bodyParser.urlencoded(
{
    extended: false
}));
app.use(bodyParser.json());

require("./routes")(app);

app.get("/*", function(request, response)
{
    response.sendFile(path.resolve(__dirname + config.publicFilePath + "/index.html"));
});


http.listen(port, function()
{
    console.log("listening on *:" + port);
});
