var port = 51104;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var http = require("http").Server(app);
var path = require("path");

app.use("/", express.static(path.resolve(__dirname + "/../public")));
app.use("/", bodyParser.urlencoded(
{
    extended: false
}));
app.use(bodyParser.json());

require("./routes")(app);

app.get("/*", function(request, response)
{
    response.sendFile(path.resolve(__dirname + "/../public/index.html"));
});


http.listen(port, function()
{
    console.log("listening on *:" + port);
});
