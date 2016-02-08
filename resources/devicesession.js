function DeviceSession(id, socket) {
	this.id = id;
	this.socket = socket;
};

DeviceSession.prototype.start = function() {
	this.socket.emit("data", { message:"Successfully Connected!"});

	this.socket.on("data", function(data) {
		this.data(data);
	}.bind(this));

	this.socket.on("disconnect", function() {
		console.log("Users (" +this.id+ ") has disconnected from mobile");
		this.disconnect();
	}.bind(this));

	console.log("User (" +this.id+ ") has connected on mobile");
}

DeviceSession.prototype.data = function(data) {
	console.log("DeviceSession.data needs to be overridden");
}

DeviceSession.prototype.disconnect = function() {
	console.log("DeviceSession.disconnect needs to be overridden");
}

module.exports = DeviceSession;