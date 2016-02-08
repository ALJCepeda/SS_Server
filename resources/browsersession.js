function BrowserSession(id, socket) {
	this.id = id;
	this.socket = socket;
};

BrowserSession.prototype.start = function() {
	this.socket.emit("data", { message:"Successfully Connected!"});
	this.socket.on("data", function(data) {
		this.data(data);
	}.bind(this));

	this.socket.on("disconnect", function() {
		console.log("Users (" +this.id+ ") has disconnected from browser");
		this.disconnect();
	}.bind(this));

	console.log("User (" +this.id+ ") has connected on browser");
};

BrowserSession.prototype.disconnect = function() {
	console.log("BrowserSession.disconnect needs to be overridden");
}

BrowserSession.prototype.data = function(data) {
	console.log("BrowserSession.data needs to be overridden");
}

module.exports = BrowserSession;