var express = require("express");
var bodyparser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var path = require("path");
var io = require("socket.io")(http);

var config = require("./config");

app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static(path.join(config.dirs.root, "client")));

io.on("connection", function(socket) {
	console.log("User connected..");
});

http.listen(config.port, function() { console.log("listening on *:" + config.port); }); 