var _ = require("underscore");
var express = require("express");
var bodyparser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var path = require("path");
var io = require("socket.io")(http);
var crypto = require("crypto");

var config = require("./config");
var BrowserSession = require("./resources/browsersession");
var DeviceSession = require("./resources/devicesession");
var Users = require("./resources/users");

app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static(path.join(config.dirs.root, "bower_components")));

var users = new Users();
app.get("/:id", function(req, res){
	var id = req.params.id;

	if(typeof id === "undefined" || users.has(id) === false) {
		res.status("404").send("Invalid identity");
		return;
	}

	res.sendFile(path.join(config.dirs.root, "client","index.html"));
});

io.on("connection", function(socket) {
	socket.on("startBrowser", function(data) {
		var id = data.id;
		if(_.isUndefined(id) || users.has(id) === false) {
			socket.emit("error", "Invalid ID provided");
			return;
		}

		var user = users.get(id);
		user.browser = new BrowserSession(user.id, socket);
		user.start();
	});

	socket.on("startDevice", function(data) {
		var key = data.apiKey;
		if(_.isUndefined(key) || key !== config.apiKey) {
			socket.emit("error", "Invalid key provided");
			return;
		}

		var user = users.spawn();
		user.device = new DeviceSession(user.id, socket);
		socket.emit("identify", { id:user.id });
	});
});

http.listen(config.port, function() { console.log("listening on *:" + config.port); }); 