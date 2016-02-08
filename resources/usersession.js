function UserSession(id) {
	this.id = id;
	this.browser;
	this.device;
}

UserSession.prototype.start = function(){
	this.sync();

	this.device.start();
	this.browser.start();
};

UserSession.prototype.sync = function() {
	this.device.data = function(data) {
		this.browser.socket.emit("data", data);
	};

	this.browser.data = function(data) {
		this.device.socket.emit("data", data);
	};
};

UserSession.prototype.id = function(id) {
	if(typeof id !== "undefined") {
		this.id = id;
	}

	return this.id;
};

module.exports = UserSession;