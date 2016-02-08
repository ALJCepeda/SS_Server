function UserSession(id) {
	this.id = id;
	this.browser;
	this.device;
}

UserSession.prototype.start = function(){
	this.sync();

	this.device.start();
	this.browser.start();

	this.device.socket.emit("data", { message:"Browser has been synced with device" });
	this.browser.socket.emit("data", { message:"Device has been synced with browser" });
};

UserSession.prototype.sync = function() {
	this.device.data = function(data) {
		this.browser.socket.emit("data", data);
	}.bind(this);

	this.device.disconnect = function() {
		this.browser.socket.emit("data", { message:"Your iOS device was disconnected from the server" });
	}.bind(this);

	this.browser.data = function(data) {
		this.device.socket.emit("data", data);
	}.bind(this);

	this.browser.disconnect = function() {
		this.device.socket.emit("data", { message:"Your browser was disconnected from the server" });
	}.bind(this);
};

UserSession.prototype.id = function(id) {
	if(typeof id !== "undefined") {
		this.id = id;
	}

	return this.id;
};

module.exports = UserSession;