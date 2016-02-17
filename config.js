global.LIVE = (process.argv.indexOf("--live") !== -1) ? true : false;
global.DEV = (process.argv.indexOf("--dev") !== -1) ? true : false;

var dirs = { root:"/shared/syncserver" };

if(global.LIVE === true) {
	dirs.root = "/var/live/syncserver";
} else if(global.DEV === true) {
	dirs.root = "/var/dev/syncserver";
}
module.exports = {
	name: "Sync Server",
	port: (global.DEV === true) ? 8804 : 8004,
	apiKey: "09F7gtRWe![~S}1exnrf--gFDI1A44",
	dirs: dirs
};