var UserSession = require("./usersession");

function Users() {
	this.sessions = {};
}

Users.prototype.spawn = function() {
	var id = "";

	do {
		//id = randomString(5);
		id = "test";
	} while(typeof this.sessions[id] !== "undefined");


	var user = new UserSession(id);
	this.sessions[id] = user;
	return user;
}

Users.prototype.has = function(id) {
	return typeof this.sessions[id] !== "undefined";
}

Users.prototype.get = function(id) {
	return this.sessions[id];
}

function randomString(length) {
	return Math.random().toString(36).substring(length);
}

module.exports = Users;