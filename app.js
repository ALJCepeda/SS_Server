var express = require("express");
var bodyparser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var path = require("path");

var config = require("./config");

app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static(path.join(config.dirs.root, "client")));

app.get("/", function(req, res){ 
	res.sendFile(path.join(config.dirs.root, "/client/index.html"));
});

http.listen(config.port, function() { console.log("listening on *:" + config.port); });