global.ONLINE = (process.argv.indexOf('--online') !== -1) ? true : false;
global.DEV = (process.argv.indexOf('--dev') !== -1) ? true : false;

module.exports = {
	name: 'syncserver',
	port: (global.DEV === true) ? 8804 : 8004,
	apiKey: "09F7gtRWe![~S}1exnrf--gFDI1A44",
	dirs: {
		root: (global.ONLINE === true ) ? '/var/www/syncserver' : '/shared/syncserver'
	}
};