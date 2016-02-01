var _ = require("underscore");
var express = require("express");
var bodyparser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var path = require("path");
var io = require("socket.io")(http);
var crypto = require("crypto");

var config = require("./config");
var users = {};

app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static(path.join(config.dirs.root, "bower_components")));

app.get("/:id", function(req, res){
	var id = req.params.id;

	if(typeof id === "undefined" || typeof users[id] === "undefined") {
		res.status("404").send("Invalid identity");
		return;
	}

	res.sendFile(path.join(config.dirs.root, "client","index.html"));
});


io.on("connection", function(socket) {
	var id = "";

	socket.on("start", function(data) {
		if(_.isUndefined(data.apiKey)) {
			socket.emit("error", "Invalid key provided");
			return;
		}

		do {
			id = randomString(5);
		} while(typeof users[id] !== "undefined");

		users[id] = {};

		socket.emit("identify", { id:id });

		console.log("User (" +id+ ") has connected");
	});
	
	socket.on("disconnect", function() {
		console.log("Users (" +id+ ") has disconnected");
		delete users[id];
	});
});

function randomString(length) {
	return Math.random().toString(36).substring(length);
}

http.listen(config.port, function() { console.log("listening on *:" + config.port); }); 