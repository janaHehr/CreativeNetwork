var port = 51104;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var http = require("http").Server(app);

app.use("/", express.static(__dirname + "/public"));
app.use("/", bodyParser.urlencoded(
{
    extended: false
}));
app.use(bodyParser.json());

require("./routes")(app);

app.get("/*", function(request, response)
{
    response.sendFile(__dirname + "/public/index.html");
});

http.listen(port, function()
{
    console.log("listening on *:" + port);
});

//Test
